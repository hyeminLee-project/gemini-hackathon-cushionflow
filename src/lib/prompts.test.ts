import { describe, it, expect } from "vitest";
import { buildCushionPrompt } from "./prompts";

describe("buildCushionPrompt", () => {
  const baseInput = {
    originalMessage: "내일까지 보고서 보내주세요",
    mbti: "ENTJ",
    context: "긴급 요청",
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
});
