import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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

        const { originalMessage, mbti, context, imageBase64, imageMimeType } = await req.json();

        // 만약 이미지가 제공되었다면 이미지 분석을 우선시하도록 문맥을 조금 수정합니다.
        const messagePromptText = originalMessage
            ? `\n    - 원본 메시지 텍스트: "${originalMessage}"`
            : `\n    - 원본 메시지 텍스트: (제공되지 않음. 첨부된 이미지 내용을 원본 메시지로 간주하고 분석해주세요.)`;

        const prompt = `
    당신은 직장 내 원활한 협업을 돕는 비즈니스 커뮤니케이션 에이전트 'CushionFlow'입니다.
    사용자가 작성한 메시지(또는 첨부된 스크린샷 이미지)를 분석하고, 수신자의 업무 성향(MBTI)과 상황 맥락을 고려하여 사내 갈등을 예방하는 건설적이고 정중한 '쿠션어'로 변환해 주세요.

    [입력 데이터]${messagePromptText}
    - 수신자 업무 성향 (MBTI): ${mbti}
    - 상황 맥락: ${context}

    [요청 사항]
    1. 원본 메시지가 그대로 전송될 경우 갈등이 발생할 리스크를 반대로 환산하여 '쿠션 지수(0~100점)'로 평가하세요 (100점이 가장 갈등 요소 없고 정중함).
    2. 수신자의 업무 스타일과 주어진 상황 맥락을 배려하여 원본 메시지를 수정하세요. 비즈니스 생산성을 높일 수 있는 1차 제안을 작성합니다.
    3. 왜 이렇게 수정했는지 비즈니스/커뮤니케이션적 근거를 3~4개의 핵심 포인트로 나누어 에이전트 분석을 제공하세요.
    
    [다국어 처리 특별 규칙]
    - 제안하는 쿠션어 메시지(suggestion)는 **반드시 사용자가 입력한 메시지 또는 이미지 내 텍스트 언어 (영어, 일본어, 중국어, 한국어 등)와 완벽히 동일한 언어**로 작성하세요.
    - 단, 에이전트 분석(insights) 항목은 한국인 사용자를 위해 **무조건 한국어**로 작성하세요.
    - 만약 제안하는 메시지(suggestion)가 한국어가 아닌 외국어라면 한국인 사용자가 뜻을 알 수 있도록 **한국어 번역(koreanTranslation)을 함께 제공**하세요. 입력이 한국어라면 koreanTranslation은 null로 둡니다.
    
    [출력 형식] (반드시 JSON 포맷으로 응답할 것)
    {
      "score": 85, // 원본 메시지의 상태에 따라 0에서 100 사이의 점수로 매번 다르게 평가할 것
      "suggestion": "수정된 쿠션어 메시지",
      "koreanTranslation": "한국어 번역 (한국어 원문일 경우 null)",
      "insights": [
        "ENTJ는 효율성을 중시하므로 결론부터 짚어 명확성을 높였습니다.",
        "휴가 중이라는 특수성을 고려하여 수신자의 통제권을 존중하는 비즈니스 매너를 적용했습니다."
      ]
    }
    `;

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
