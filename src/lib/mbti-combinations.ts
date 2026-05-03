type DimensionPair = [string, string];

const CONFLICT_PATTERNS: { match: DimensionPair; advice: string }[] = [
  {
    match: ["TJ", "FP"],
    advice:
      "TJ 발신자는 직접적/효율 중심, FP 수신자는 감정/자율 중심입니다. 결론을 전달하되 부드러운 어조와 선택지를 함께 제시하세요.",
  },
  {
    match: ["FP", "TJ"],
    advice:
      "FP 발신자의 감성적 표현이 TJ 수신자에게 모호하게 느껴질 수 있습니다. 핵심 요청을 명확히 하고 논리적 근거를 보강하세요.",
  },
  {
    match: ["EJ", "IP"],
    advice:
      "EJ 발신자의 주도적 어조가 IP 수신자에게 압박으로 느껴질 수 있습니다. 요청의 여지를 남기고 충분한 검토 시간을 언급하세요.",
  },
  {
    match: ["IP", "EJ"],
    advice:
      "IP 발신자의 신중한 표현이 EJ 수신자에게 결단력 부족으로 보일 수 있습니다. 의견을 보다 명확히 전달하세요.",
  },
  {
    match: ["SJ", "NP"],
    advice:
      "SJ 발신자의 절차 중심 접근이 NP 수신자에게 경직되게 느껴질 수 있습니다. 규칙 대신 목표와 가능성을 강조하세요.",
  },
  {
    match: ["NP", "SJ"],
    advice:
      "NP 발신자의 추상적 아이디어가 SJ 수신자에게 비현실적으로 보일 수 있습니다. 구체적 일정과 실행 계획을 함께 제시하세요.",
  },
];

function getDimensions(mbti: string): string {
  if (mbti === "UNKNOWN" || mbti.length !== 4) return "";
  return mbti;
}

function matchesPair(mbtiDimensions: string, pattern: string): boolean {
  if (!mbtiDimensions) return false;
  return pattern.split("").every((ch) => mbtiDimensions.includes(ch));
}

export function getCombinationAdvice(sender: string, receiver: string): string | null {
  if (sender === "UNKNOWN" || receiver === "UNKNOWN") return null;

  const senderDim = getDimensions(sender);
  const receiverDim = getDimensions(receiver);
  if (!senderDim || !receiverDim) return null;

  if (sender === receiver) {
    return "동일 MBTI 조합입니다. 공감대가 높지만 같은 약점이 증폭될 수 있으니, 상호 보완적 관점을 의식적으로 포함하세요.";
  }

  for (const { match, advice } of CONFLICT_PATTERNS) {
    if (matchesPair(senderDim, match[0]) && matchesPair(receiverDim, match[1])) {
      return advice;
    }
  }

  return null;
}
