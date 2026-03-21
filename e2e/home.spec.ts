import { test, expect } from "@playwright/test";

test.describe("CushionFlow Home", () => {
  test("renders the main page with title and input", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("사내 갈등 제로");
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("shows error when submitting empty message", async ({ page }) => {
    await page.goto("/");

    await page.click("button:has-text('쿠션어로 변환하기')");

    await expect(page.locator("text=전달할 메시지를 입력하거나")).toBeVisible();
  });

  test("can select MBTI type", async ({ page }) => {
    await page.goto("/");

    await page.click("button:has-text('INFP')");
    await page.click("button:has-text('ENTJ')");

    await expect(page.locator("button:has-text('ENTJ')")).toBeVisible();
  });

  test("can select context", async ({ page }) => {
    await page.goto("/");

    await page.click("button:has-text('긴급 요청')");

    const button = page.locator("button:has-text('긴급 요청')");
    await expect(button).toHaveClass(/border-indigo-500/);
  });

  test("header displays CushionFlow branding", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("header")).toContainText("CushionFlow");
  });
});
