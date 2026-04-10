import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LocaleProvider } from "@/components/LocaleProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CushionFlow",
  description: "MBTI 기반 AI 직장 커뮤니케이션 최적화 도구. 갈등 없는 메시지로 자동 변환합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" translate="no" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TooltipProvider>
          <LocaleProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </LocaleProvider>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
