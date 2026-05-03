interface PromptExample {
  group: string;
  types: string[];
  before: string;
  after: string;
}

const EXAMPLES: PromptExample[] = [
  {
    group: "분석가 (NT)",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
    before: "이 방식은 비효율적입니다. 바꿔야 합니다.",
    after:
      "현재 방식에서 개선 가능한 부분이 보여서 대안을 정리해봤습니다. 검토 후 의견 주시면 반영하겠습니다.",
  },
  {
    group: "외교관 (NF)",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
    before: "이 업무는 제가 하기 싫습니다.",
    after:
      "이 업무에 대해 솔직히 말씀드리면, 제 강점을 살리기 어려운 부분이 있어서요. 다른 방식으로 기여할 수 있는 방법을 함께 고민해볼 수 있을까요?",
  },
  {
    group: "관리자 (SJ)",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    before: "왜 보고서를 아직 안 보냈어요?",
    after:
      "보고서 진행 상황이 궁금합니다. 혹시 어려운 부분이 있으시면 말씀해주세요. 마감일을 고려해 오늘 내로 공유해주시면 감사하겠습니다.",
  },
  {
    group: "탐험가 (SP)",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
    before: "회의가 너무 길어요. 시간 낭비입니다.",
    after: "회의 효율을 높이기 위해, 핵심 안건을 미리 공유하고 30분 내로 마무리하는 건 어떨까요?",
  },
];

export function getExampleForMbti(mbti: string): PromptExample | null {
  if (mbti === "UNKNOWN") return null;
  return EXAMPLES.find((ex) => ex.types.includes(mbti)) ?? null;
}
