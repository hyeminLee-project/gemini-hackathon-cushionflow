// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    locale: "ko" as const,
    setLocale: vi.fn(),
    t: (key: string) => key,
  }),
}));

vi.mock("@/lib/i18n", () => ({
  LOCALE_LABELS: { ko: "한국어", en: "English" },
}));

describe("Header", () => {
  it("renders CushionFlow branding", () => {
    render(<Header />);
    expect(screen.getByText("CushionFlow")).toBeDefined();
  });

  it("renders language selector button with current locale", () => {
    render(<Header />);
    expect(screen.getAllByText("한국어").length).toBeGreaterThan(0);
  });
});
