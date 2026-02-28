import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { CushionRequestPayload } from "@/lib/types";
import { buildCushionPrompt } from "@/lib/prompts";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요." },
                { status: 500 }
            );
        }

        const body: CushionRequestPayload = await req.json();
        const { originalMessage, mbti, context, imageBase64, imageMimeType } = body;

        const prompt = buildCushionPrompt({ originalMessage, mbti, context });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const parts: any[] = [{ text: prompt }];

        if (imageBase64 && imageMimeType) {
            parts.push({
                inlineData: {
                    data: imageBase64,
                    mimeType: imageMimeType
                }
            });
        }

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
        });

        const response = await result.response;
        const text = response.text();

        // JSON 파싱 (마크다운 코드 블록 제거)
        const jsonString = text.replace(/```json\n?|```/g, "").trim();
        const data = JSON.parse(jsonString);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "메시지 변환 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
            { status: 500 }
        );
    }
}
