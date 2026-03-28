import { describe, it, expect, vi, afterEach } from "vitest";
import { createRateLimit } from "./rate-limit";

describe("createRateLimit", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("allows requests under the limit", () => {
    const limiter = createRateLimit({ windowMs: 60_000, maxRequests: 3 });

    expect(limiter.check("user1").success).toBe(true);
    expect(limiter.check("user1").success).toBe(true);
    expect(limiter.check("user1").success).toBe(true);
  });

  it("blocks requests over the limit", () => {
    const limiter = createRateLimit({ windowMs: 60_000, maxRequests: 2 });

    limiter.check("user1");
    limiter.check("user1");

    const result = limiter.check("user1");
    expect(result.success).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it("tracks different keys independently", () => {
    const limiter = createRateLimit({ windowMs: 60_000, maxRequests: 1 });

    expect(limiter.check("userA").success).toBe(true);
    expect(limiter.check("userB").success).toBe(true);

    expect(limiter.check("userA").success).toBe(false);
    expect(limiter.check("userB").success).toBe(false);
  });

  it("returns correct retryAfter value", () => {
    const limiter = createRateLimit({ windowMs: 10_000, maxRequests: 1 });

    limiter.check("user1");
    const result = limiter.check("user1");

    expect(result.success).toBe(false);
    expect(result.retryAfter).toBeLessThanOrEqual(10_000);
    expect(result.retryAfter).toBeGreaterThan(0);
  });
});
