import { describe, it, expect } from "vitest";
import { cushionRequestSchema, cushionResponseSchema } from "./types";

describe("cushionRequestSchema", () => {
  const validInput = {
    originalMessage: "테스트 메시지",
    mbti: "INFP",
    context: "긴급 요청",
  };

  it("accepts valid input", () => {
    const result = cushionRequestSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("rejects invalid MBTI type", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      mbti: "XXXX",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty context", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      context: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message over 2000 chars", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      originalMessage: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects when both message and image are empty", () => {
    const result = cushionRequestSchema.safeParse({
      originalMessage: "",
      mbti: "INFP",
      context: "긴급 요청",
    });
    expect(result.success).toBe(false);
  });

  it("accepts when message is empty but image is provided", () => {
    const result = cushionRequestSchema.safeParse({
      originalMessage: "",
      mbti: "INFP",
      context: "긴급 요청",
      imageBase64: "base64data",
      imageMimeType: "image/png",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid image MIME type", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      imageMimeType: "text/plain",
    });
    expect(result.success).toBe(false);
  });

  it("defaults locale to ko", () => {
    const result = cushionRequestSchema.safeParse(validInput);
    if (result.success) {
      expect(result.data.locale).toBe("ko");
    }
  });

  it("accepts valid locale", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      locale: "ja",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid locale", () => {
    const result = cushionRequestSchema.safeParse({
      ...validInput,
      locale: "xx",
    });
    expect(result.success).toBe(false);
  });
});

describe("cushionResponseSchema", () => {
  it("accepts valid response", () => {
    const result = cushionResponseSchema.safeParse({
      score: 85,
      suggestion: "수정된 메시지",
      insights: ["분석 1", "분석 2"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects score over 100", () => {
    const result = cushionResponseSchema.safeParse({
      score: 101,
      suggestion: "메시지",
      insights: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects score under 0", () => {
    const result = cushionResponseSchema.safeParse({
      score: -1,
      suggestion: "메시지",
      insights: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty suggestion", () => {
    const result = cushionResponseSchema.safeParse({
      score: 85,
      suggestion: "",
      insights: [],
    });
    expect(result.success).toBe(false);
  });

  it("accepts null koreanTranslation", () => {
    const result = cushionResponseSchema.safeParse({
      score: 85,
      suggestion: "메시지",
      koreanTranslation: null,
      insights: ["분석"],
    });
    expect(result.success).toBe(true);
  });
});
