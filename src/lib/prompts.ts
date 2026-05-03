import { CushionRequestPayload } from "./types";
import { MBTI_GUIDELINES } from "./mbti-guidelines";
import { CONTEXT_TONE_INSTRUCTIONS } from "./context-tones";
import { getCombinationAdvice } from "./mbti-combinations";

const LOCALE_NAMES: Record<string, string> = {
  ko: "Korean",
  en: "English",
  ja: "Japanese",
  zh: "Chinese",
  fr: "French",
  de: "German",
};

export function buildCushionPrompt({
  originalMessage,
  mbti,
  senderMbti = "UNKNOWN",
  context,
  locale = "ko",
}: CushionRequestPayload): string {
  const messagePromptText = originalMessage
    ? `\n    - 원본 메시지 텍스트: "${originalMessage}"`
    : `\n    - 원본 메시지 텍스트: (제공되지 않음. 첨부된 이미지 내용을 원본 메시지로 간주하고 분석해주세요.)`;

  const senderGuideline = MBTI_GUIDELINES[senderMbti] ?? MBTI_GUIDELINES["UNKNOWN"];
  const senderLabel = senderMbti === "UNKNOWN" ? "알 수 없음" : senderMbti;
  const senderLine = `- 발신자 업무 성향 (MBTI): ${senderLabel}
    - 이 유형의 커뮤니케이션 특성: ${senderGuideline.preferred}`;

  const mbtiGuideline = MBTI_GUIDELINES[mbti] ?? MBTI_GUIDELINES["UNKNOWN"];
  const mbtiLabel = mbti === "UNKNOWN" ? "알 수 없음" : mbti;
  const mbtiLine = `- 수신자 업무 성향 (MBTI): ${mbtiLabel}
    - 선호하는 메시지 구조: ${mbtiGuideline.preferred}
    - 피해야 할 표현: ${mbtiGuideline.avoid}
    - 효과적인 설득 패턴: ${mbtiGuideline.persuasion}`;

  const combinationAdvice = getCombinationAdvice(senderMbti, mbti);
  const combinationLine = combinationAdvice
    ? `\n    - 발신자-수신자 조합 조언: ${combinationAdvice}`
    : "";

  const toneInstruction = CONTEXT_TONE_INSTRUCTIONS[context] ?? "";
  const contextLine = toneInstruction
    ? `- 상황 맥락: ${context}\n    - 톤 가이드: ${toneInstruction}`
    : `- 상황 맥락: ${context}`;

  const insightsLang = LOCALE_NAMES[locale] ?? "Korean";
  const needsTranslation = locale !== "ko";

  return `
    당신은 직장 내 원활한 협업을 돕는 비즈니스 커뮤니케이션 에이전트 'CushionFlow'입니다.
    사용자가 작성한 메시지(또는 첨부된 스크린샷 이미지)를 분석하고, 수신자의 업무 성향(MBTI)과 상황 맥락을 고려하여 사내 갈등을 예방하는 건설적이고 정중한 '쿠션어'로 변환해 주세요.

    [입력 데이터]${messagePromptText}
    ${senderLine}
    ${mbtiLine}${combinationLine}
    ${contextLine}

    [요청 사항]
    1. 원본 메시지의 '쿠션 지수(0~100점)'를 다음 기준으로 평가하세요 (100점이 가장 갈등 요소 없고 정중함):
       - 90~100점: 갈등 요소 없음, 충분한 배려 표현
       - 70~89점: 소폭 개선 가능하나 수용 가능한 수준
       - 50~69점: 오해 소지 있음, 어조 조정 필요
       - 30~49점: 갈등 유발 가능성 높음
       - 0~29점: 즉시 수정 필요
    2. 수신자의 업무 스타일과 주어진 상황 맥락, 커뮤니케이션 가이드와 톤 가이드를 반영하여 원본 메시지를 수정하세요. 비즈니스 생산성을 높일 수 있는 1차 제안을 작성합니다.
    3. 왜 이렇게 수정했는지 비즈니스/커뮤니케이션적 근거를 3~4개의 핵심 포인트로 나누어 에이전트 분석을 제공하세요.

    [다국어 처리 특별 규칙]
    - 제안하는 쿠션어 메시지(suggestion)는 **반드시 사용자가 입력한 메시지 또는 이미지 내 텍스트 언어와 완벽히 동일한 언어**로 작성하세요.
    - 에이전트 분석(insights) 항목은 **반드시 ${insightsLang}**로 작성하세요.
    - ${needsTranslation ? `제안하는 메시지(suggestion)가 한국어가 아닌 경우, 한국어 번역(koreanTranslation)을 함께 제공하세요.` : `입력이 한국어라면 koreanTranslation은 null로 둡니다. 한국어가 아닌 외국어라면 한국어 번역을 제공하세요.`}

    [출력 형식] (반드시 JSON 포맷으로 응답할 것)
    {
      "score": 85,
      "suggestion": "수정된 쿠션어 메시지",
      "koreanTranslation": "한국어 번역 (한국어 원문일 경우 null)",
      "insights": [
        "분석 포인트 1 (${insightsLang}로 작성)",
        "분석 포인트 2 (${insightsLang}로 작성)"
      ]
    }
  `;
}
