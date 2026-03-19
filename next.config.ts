import type { NextConfig } from "next";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
