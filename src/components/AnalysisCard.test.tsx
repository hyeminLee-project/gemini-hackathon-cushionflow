// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnalysisCard } from "./AnalysisCard";

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    locale: "ko" as const,
    setLocale: vi.fn(),
    t: (key: string) => {
      if (key === "analysis.title") return "에이전트 분석";
      return key;
    },
  }),
}));

describe("AnalysisCard", () => {
  it("renders analysis title", () => {
    render(<AnalysisCard insights={["분석 1"]} />);
    expect(screen.getByText("에이전트 분석")).toBeDefined();
  });

  it("renders all insight items", () => {
    render(<AnalysisCard insights={["첫 번째 분석", "두 번째 분석", "세 번째 분석"]} />);
    expect(screen.getByText("첫 번째 분석")).toBeDefined();
    expect(screen.getByText("두 번째 분석")).toBeDefined();
    expect(screen.getByText("세 번째 분석")).toBeDefined();
  });

  it("renders correct number of items", () => {
    const { container } = render(<AnalysisCard insights={["분석 1", "분석 2"]} />);
    const items = container.querySelectorAll("li");
    expect(items.length).toBe(2);
  });

  it("handles empty insights array", () => {
    const { container } = render(<AnalysisCard insights={[]} />);
    const items = container.querySelectorAll("li");
    expect(items.length).toBe(0);
  });
});
