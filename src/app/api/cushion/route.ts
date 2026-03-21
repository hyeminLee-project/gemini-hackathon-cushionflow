import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { cushionRequestSchema, CushionResponsePayload } from "@/lib/types";
import { buildCushionPrompt } from "@/lib/prompts";
import { createRateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const TIMEOUT_MS = 30_000;
const limiter = createRateLimit({ windowMs: 60_000, maxRequests: 10 });

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success, retryAfter } = limiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfter / 1000)) } }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.",
        },
        { status: 500 }
      );
    }

    const parsed = cushionRequestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const { originalMessage, mbti, context, imageBase64, imageMimeType } = parsed.data;

    const prompt = buildCushionPrompt({ originalMessage, mbti, context });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const parts: Part[] = [{ text: prompt }];

    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: imageMimeType,
        },
      });
    }

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Gemini API request timed out")), TIMEOUT_MS)
    );

    const result = await Promise.race([
      model.generateContent({ contents: [{ role: "user", parts }] }),
      timeoutPromise,
    ]);

    const text = result.response.text();
    const jsonString = text.replace(/```json\n?|```/g, "").trim();

    let data: CushionResponsePayload;
    try {
      data = JSON.parse(jsonString);
    } catch {
      console.error("Failed to parse Gemini response:", jsonString);
      return NextResponse.json(
        { error: "AI 응답을 파싱하는 데 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    supabase
      .from("cushion_history")
      .insert({
        original_message: originalMessage,
        mbti,
        context,
        score: data.score,
        suggestion: data.suggestion,
        korean_translation: data.koreanTranslation ?? null,
        insights: data.insights,
      })
      .then(({ error: dbError }) => {
        if (dbError) console.error("Failed to save history:", dbError);
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "메시지 변환 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
