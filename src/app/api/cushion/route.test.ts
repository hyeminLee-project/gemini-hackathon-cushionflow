import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGenerateContent = vi.fn();

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return { generateContent: mockGenerateContent };
    }
  },
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    }),
  },
}));

describe("POST /api/cushion", () => {
  const validBody = {
    originalMessage: "보고서 보내주세요",
    mbti: "ENTJ",
    context: "긴급 요청",
  };

  const validResponse = {
    score: 85,
    suggestion: "수정된 메시지",
    koreanTranslation: null,
    insights: ["분석 1", "분석 2"],
  };

  beforeEach(() => {
    vi.resetModules();
    mockGenerateContent.mockReset();
  });

  it("returns 500 when GEMINI_API_KEY is not set", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = (await POST(req)) as { body: { error: string }; status: number };
    expect(res.status).toBe(500);
    expect(res.body.error).toContain("GEMINI_API_KEY");

    process.env.GEMINI_API_KEY = originalKey;
  });

  it("returns valid response on success", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContent.mockResolvedValue({
      response: { text: () => JSON.stringify(validResponse) },
    });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = (await POST(req)) as { body: typeof validResponse; status: number };
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(85);
    expect(res.body.suggestion).toBe("수정된 메시지");
    expect(res.body.insights).toHaveLength(2);
  });

  it("returns 502 when Gemini returns non-JSON", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContent.mockResolvedValue({
      response: { text: () => "not json at all" },
    });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = (await POST(req)) as { body: { error: string }; status: number };
    expect(res.status).toBe(502);
  });

  it("returns 500 on Gemini API error", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContent.mockRejectedValue(new Error("API failure"));

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = (await POST(req)) as { body: { error: string }; status: number };
    expect(res.status).toBe(500);
  });

  it("includes image data when provided", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContent.mockResolvedValue({
      response: { text: () => JSON.stringify(validResponse) },
    });

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify({
        ...validBody,
        imageBase64: "base64data",
        imageMimeType: "image/png",
      }),
    });

    await POST(req);

    const callArgs = mockGenerateContent.mock.calls[0][0];
    const parts = callArgs.contents[0].parts;
    expect(parts).toHaveLength(2);
    expect(parts[1].inlineData.mimeType).toBe("image/png");
  });
});
