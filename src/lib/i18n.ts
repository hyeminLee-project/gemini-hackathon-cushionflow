export type Locale = "ko" | "en";

const translations: Record<Locale, Record<string, string>> = {
  ko: {
    "hero.title.1": "사내 갈등 제로,",
    "hero.title.2": "완만한 커뮤니케이션의 시작",
    "hero.subtitle.1": "긴박함과 배려 사이의 간극을 AI가 메워드립니다.",
    "hero.subtitle.2": "MBTI 기반 최적 쿠션어로 자동 변환합니다.",
    "button.convert": "쿠션어로 변환하기",
    "button.loading": "AI 분석 중...",
    "input.label": "전달할 메시지 (또는 이미지 캡처 첨부)",
    "input.placeholder":
      "예: 팀장님... 왜 아직도 안 하셨나요? (이미지를 여기로 드래그 앤 드롭 하셔도 됩니다)",
    "input.dragText": "이미지를 여기에 놓아주세요",
    "input.attachButton": "대화 캡처 이미지 첨부",
    "mbti.label": "수신자 커뮤니케이션 스타일 (MBTI)",
    "mbti.footer": "{mbti} 스타일에 맞춘 비즈니스 언어 최적화",
    "context.label": "상황 맥락",
    "context.vacation": "휴가 중 보고",
    "context.mistake": "상사 실수 지적",
    "context.urgent": "긴급 요청",
    "context.reject": "거절 메시지",
    "context.apology": "사과 메시지",
    "context.request": "부탁 메시지",
    "score.title": "쿠션 지수 (Cushion Index)",
    "score.safe": "안전한 메시지입니다 🟢",
    "score.caution": "조금 주의가 필요합니다 🟡",
    "score.danger": "갈등 유발 가능성이 높습니다 🔴",
    "score.description":
      "입력하신 원본 메시지가 상대방에게 무례하거나 부담을 줄 확률을 100점 만점으로 평가한 수치입니다.",
    "result.suggestion": "쿠션어 제안",
    "result.copied": "복사됨",
    "result.copy": "복사",
    "result.translation": "한국어 번역",
    "analysis.title": "에이전트 분석 (비즈니스/커뮤니케이션 관점)",
    "error.boundary": "오류가 발생했습니다",
    "error.retry": "다시 시도",
    "error.emptyMessage": "전달할 메시지를 입력하거나 캡처한 이미지를 첨부해주세요.",
    "error.generic": "오류가 발생했습니다.",
    "error.imageOnly": "이미지 파일만 업로드 가능합니다.",
    "error.imageSize": "이미지 크기는 {max}MB 이하만 업로드 가능합니다.",
  },
  en: {
    "hero.title.1": "Zero Workplace Conflict,",
    "hero.title.2": "Smooth Communication Starts Here",
    "hero.subtitle.1": "AI bridges the gap between urgency and consideration.",
    "hero.subtitle.2": "Auto-converts to MBTI-optimized cushion language.",
    "button.convert": "Convert to Cushion Language",
    "button.loading": "AI analyzing...",
    "input.label": "Message to deliver (or attach a screenshot)",
    "input.placeholder":
      "e.g., Manager... why haven't you done it yet? (You can also drag & drop an image here)",
    "input.dragText": "Drop your image here",
    "input.attachButton": "Attach chat screenshot",
    "mbti.label": "Recipient's Communication Style (MBTI)",
    "mbti.footer": "Business language optimized for {mbti} style",
    "context.label": "Situational Context",
    "context.vacation": "Report during vacation",
    "context.mistake": "Pointing out superior's mistake",
    "context.urgent": "Urgent request",
    "context.reject": "Rejection message",
    "context.apology": "Apology message",
    "context.request": "Favor request",
    "score.title": "Cushion Index",
    "score.safe": "Safe message 🟢",
    "score.caution": "Needs some caution 🟡",
    "score.danger": "High conflict risk 🔴",
    "score.description":
      "A score out of 100 evaluating how likely the original message is to be perceived as rude or burdensome.",
    "result.suggestion": "Cushion Suggestion",
    "result.copied": "Copied",
    "result.copy": "Copy",
    "result.translation": "Korean Translation",
    "analysis.title": "Agent Analysis (Business & Communication Perspective)",
    "error.boundary": "Something went wrong",
    "error.retry": "Try again",
    "error.emptyMessage": "Please enter a message or attach a screenshot.",
    "error.generic": "An error occurred.",
    "error.imageOnly": "Only image files are allowed.",
    "error.imageSize": "Image size must be {max}MB or less.",
  },
};

export const CONTEXT_KEYS = [
  "context.vacation",
  "context.mistake",
  "context.urgent",
  "context.reject",
  "context.apology",
  "context.request",
] as const;

export function t(locale: Locale, key: string, params?: Record<string, string>): string {
  let value = translations[locale][key] ?? translations.ko[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, v);
    }
  }
  return value;
}

export function getContextValue(key: string): string {
  return translations.ko[key] ?? key;
}
