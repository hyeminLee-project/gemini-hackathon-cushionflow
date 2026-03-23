import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { cushionRequestSchema, CushionResponsePayload } from "@/lib/types";
import { buildCushionPrompt } from "@/lib/prompts";
import { createRateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const limiter = createRateLimit({ windowMs: 60_000, maxRequests: 10 });

export async function POST(req: Request) {
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
      { error: "GEMINI_API_KEY 환경 변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const parsed = cushionRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { originalMessage, mbti, context, imageBase64, imageMimeType, locale } = parsed.data;

  const prompt = buildCushionPrompt({ originalMessage, mbti, context, locale });
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const parts: Part[] = [{ text: prompt }];
  if (imageBase64 && imageMimeType) {
    parts.push({ inlineData: { data: imageBase64, mimeType: imageMimeType } });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = await model.generateContentStream({
          contents: [{ role: "user", parts }],
        });

        let fullText = "";

        for await (const chunk of result.stream) {
          const text = chunk.text();
          fullText += text;
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk: text })}\n\n`));
        }

        const jsonString = fullText.replace(/```json\n?|```/g, "").trim();

        let data: CushionResponsePayload;
        try {
          data = JSON.parse(jsonString);
        } catch {
          console.error("Failed to parse Gemini response:", jsonString);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "AI 응답을 파싱하는 데 실패했습니다." })}\n\n`
            )
          );
          controller.close();
          return;
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true, result: data })}\n\n`)
        );
        controller.close();

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
      } catch (error) {
        console.error("Gemini API Error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "메시지 변환 중 오류가 발생했습니다." })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
