import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  webServer: {
    command: "bun run dev",
    port: 3000,
    reuseExistingServer: true,
    env: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? "test-key-for-e2e",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
