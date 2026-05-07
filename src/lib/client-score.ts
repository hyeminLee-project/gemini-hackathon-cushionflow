const PENALTY_PATTERNS: { pattern: RegExp; weight: number }[] = [
  { pattern: /왜\s*(아직|안|못)/g, weight: -8 },
  { pattern: /잘못|틀렸|문제있|엉망/g, weight: -6 },
  { pattern: /하라고|해라|하세요[.!]*$/gm, weight: -5 },
  { pattern: /[~ㅋㅎ]{2,}/g, weight: -3 },
  { pattern: /야[,.\s!]|냐[?.\s]|니까[.\s]/g, weight: -5 },
  { pattern: /!{2,}/g, weight: -4 },
  { pattern: /당장|즉시|빨리/g, weight: -5 },
  { pattern: /도대체|대체\s*왜/g, weight: -7 },
  { pattern: /몇\s*번을?\s*(말|얘기)/g, weight: -6 },
];

const BONUS_PATTERNS: { pattern: RegExp; weight: number }[] = [
  { pattern: /주시|드리|드릴|올리/g, weight: 4 },
  { pattern: /혹시|괜찮으시다면|실례지만|바쁘시겠지만/g, weight: 6 },
  { pattern: /감사|고맙|고마워/g, weight: 5 },
  { pattern: /것\s*같습니다|수\s*있을까요|어떨까요|어떠신가요/g, weight: 5 },
  { pattern: /부탁드|요청드|말씀드/g, weight: 4 },
  { pattern: /확인\s*부탁|검토\s*부탁/g, weight: 3 },
  { pattern: /죄송|송구/g, weight: 3 },
];

export function calculateClientScore(message: string): number | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  let score = 70;

  for (const { pattern, weight } of PENALTY_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) score += weight * matches.length;
  }

  for (const { pattern, weight } of BONUS_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) score += weight * matches.length;
  }

  return Math.max(0, Math.min(100, score));
}
