import { describe, it, expect } from "vitest";
import { buildCushionPrompt } from "./prompts";

describe("buildCushionPrompt", () => {
  const baseInput = {
    originalMessage: "내일까지 보고서 보내주세요",
    mbti: "ENTJ" as const,
    context: "긴급 요청",
    locale: "ko" as const,
  };

  it("returns prompt containing the original message", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("내일까지 보고서 보내주세요");
  });

  it("returns prompt containing the MBTI type", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("ENTJ");
  });

  it("returns prompt containing the context", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("긴급 요청");
  });

  it("uses fallback text when originalMessage is empty", () => {
    const result = buildCushionPrompt({ ...baseInput, originalMessage: "" });
    expect(result).toContain("제공되지 않음");
    expect(result).not.toContain('원본 메시지 텍스트: ""');
  });

  it("does not use fallback text when originalMessage is provided", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).not.toContain("제공되지 않음");
  });

  it("uses English for insights when locale is en", () => {
    const result = buildCushionPrompt({ ...baseInput, locale: "en" });
    expect(result).toContain("English");
  });

  it("uses Korean for insights when locale is ko", () => {
    const result = buildCushionPrompt({ ...baseInput, locale: "ko" });
    expect(result).toContain("Korean");
  });

  it("contains MBTI communication guideline for known type", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("커뮤니케이션 가이드");
    expect(result).toContain("간결하게 요점을 전달");
  });

  it("contains MBTI guideline fallback for UNKNOWN", () => {
    const result = buildCushionPrompt({ ...baseInput, mbti: "UNKNOWN" });
    expect(result).toContain("일반적인 비즈니스 예절");
  });

  it("contains tone instruction for known context", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("톤 가이드");
    expect(result).toContain("긴급 사유를 먼저 설명");
  });

  it("handles unknown context without tone instruction line", () => {
    const result = buildCushionPrompt({ ...baseInput, context: "기타 상황" });
    expect(result).toContain("기타 상황");
    expect(result).not.toContain("톤 가이드: ");
  });

  it("contains scoring criteria bands", () => {
    const result = buildCushionPrompt(baseInput);
    expect(result).toContain("90~100점");
    expect(result).toContain("0~29점");
  });
});
