import { describe, it, expect } from "vitest";
import { t, getContextValue, LOCALE_LABELS, CONTEXT_KEYS, type Locale } from "./i18n";

describe("t()", () => {
  it("returns Korean translation for ko locale", () => {
    expect(t("ko", "button.convert")).toBe("쿠션어로 변환하기");
  });

  it("returns English translation for en locale", () => {
    expect(t("en", "button.convert")).toBe("Convert to Cushion Language");
  });

  it("returns Japanese translation for ja locale", () => {
    expect(t("ja", "button.convert")).toBe("クッション言葉に変換");
  });

  it("returns Chinese translation for zh locale", () => {
    expect(t("zh", "button.convert")).toBe("转换为缓冲语言");
  });

  it("returns French translation for fr locale", () => {
    expect(t("fr", "button.convert")).toBe("Convertir en langage coussin");
  });

  it("returns German translation for de locale", () => {
    expect(t("de", "button.convert")).toBe("In Polstersprache umwandeln");
  });

  it("falls back to Korean when key is missing in locale", () => {
    const result = t("en", "nonexistent.key");
    expect(result).toBe("nonexistent.key");
  });

  it("substitutes parameters correctly", () => {
    const result = t("en", "mbti.footer", { mbti: "ENTJ" });
    expect(result).toBe("Business language optimized for ENTJ style");
  });

  it("substitutes parameters in Korean", () => {
    const result = t("ko", "mbti.footer", { mbti: "INFP" });
    expect(result).toBe("INFP 스타일에 맞춘 비즈니스 언어 최적화");
  });

  it("handles missing params gracefully", () => {
    const result = t("en", "mbti.footer");
    expect(result).toBe("Business language optimized for {mbti} style");
  });
});

describe("getContextValue()", () => {
  it("returns Korean value for context key", () => {
    expect(getContextValue("context.vacation")).toBe("휴가 중 보고");
  });

  it("returns key itself for unknown key", () => {
    expect(getContextValue("unknown.key")).toBe("unknown.key");
  });
});

describe("LOCALE_LABELS", () => {
  it("has labels for all 6 locales", () => {
    const locales: Locale[] = ["ko", "en", "ja", "zh", "fr", "de"];
    for (const locale of locales) {
      expect(LOCALE_LABELS[locale]).toBeDefined();
    }
  });
});

describe("CONTEXT_KEYS", () => {
  it("has 6 context options", () => {
    expect(CONTEXT_KEYS).toHaveLength(6);
  });
});
