// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreIndicator } from "./ScoreIndicator";

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    locale: "ko" as const,
    setLocale: vi.fn(),
    t: (key: string) => {
      const translations: Record<string, string> = {
        "score.title": "쿠션 지수",
        "score.safe": "안전",
        "score.caution": "주의",
        "score.danger": "위험",
        "score.description": "점수 설명",
      };
      return translations[key] ?? key;
    },
  }),
}));

describe("ScoreIndicator", () => {
  it("displays the score number", () => {
    render(<ScoreIndicator score={85} />);
    expect(screen.getByText("85")).toBeDefined();
  });

  it("shows safe message for score > 80", () => {
    render(<ScoreIndicator score={90} />);
    expect(screen.getAllByText("안전").length).toBeGreaterThan(0);
  });

  it("shows caution message for score 50-80", () => {
    render(<ScoreIndicator score={65} />);
    expect(screen.getByText("주의")).toBeDefined();
  });

  it("shows danger message for score < 50", () => {
    render(<ScoreIndicator score={30} />);
    expect(screen.getByText("위험")).toBeDefined();
  });

  it("displays score title", () => {
    render(<ScoreIndicator score={85} />);
    expect(screen.getAllByText("쿠션 지수").length).toBeGreaterThan(0);
  });
});
