import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGenerateContentStream = vi.fn();

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: class {
    getGenerativeModel() {
      return { generateContentStream: mockGenerateContentStream };
    }
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
    }),
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

async function readSSE(response: Response): Promise<string[]> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  const events: string[] = [];
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const data = line.replace(/^data: /, "");
      if (data) events.push(data);
    }
  }
  return events;
}

function createMockStream(text: string) {
  return {
    stream: (async function* () {
      yield { text: () => text };
    })(),
  };
}

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
    mockGenerateContentStream.mockReset();
  });

  it("returns 500 when GEMINI_API_KEY is not set", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = (await POST(req)) as unknown as { body: { error: string }; status: number };
    expect(res.status).toBe(500);
    expect(res.body.error).toContain("GEMINI_API_KEY");

    process.env.GEMINI_API_KEY = originalKey;
  });

  it("streams valid response on success", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContentStream.mockResolvedValue(createMockStream(JSON.stringify(validResponse)));

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = await POST(req);
    expect(res.headers.get("Content-Type")).toBe("text/event-stream");

    const events = await readSSE(res as Response);
    const lastEvent = JSON.parse(events[events.length - 1]);
    expect(lastEvent.done).toBe(true);
    expect(lastEvent.result.score).toBe(85);
    expect(lastEvent.result.suggestion).toBe("수정된 메시지");
  });

  it("streams error when Gemini returns non-JSON", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContentStream.mockResolvedValue(createMockStream("not json at all"));

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = await POST(req);
    const events = await readSSE(res as Response);
    const lastEvent = JSON.parse(events[events.length - 1]);
    expect(lastEvent.error).toBeDefined();
  });

  it("streams error on Gemini API failure", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContentStream.mockRejectedValue(new Error("API failure"));

    const { POST } = await import("./route");
    const req = new Request("http://localhost/api/cushion", {
      method: "POST",
      body: JSON.stringify(validBody),
    });

    const res = await POST(req);
    const events = await readSSE(res as Response);
    const lastEvent = JSON.parse(events[events.length - 1]);
    expect(lastEvent.error).toBeDefined();
  });

  it("includes image data when provided", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    mockGenerateContentStream.mockResolvedValue(createMockStream(JSON.stringify(validResponse)));

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

    const callArgs = mockGenerateContentStream.mock.calls[0][0];
    const parts = callArgs.contents[0].parts;
    expect(parts).toHaveLength(2);
    expect(parts[1].inlineData.mimeType).toBe("image/png");
  });
});
