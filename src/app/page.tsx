"use client";

import { Header } from "@/components/Header";
import { CushionForm } from "@/components/CushionForm";
import { CushionResult } from "@/components/CushionResult";
import { useCushionAI } from "@/hooks/useCushionAI";

export default function Home() {
  const { result, isLoading, error, submitToAI } = useCushionAI();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans selection:bg-indigo-500/30 pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-32 flex flex-col items-center px-4">
        {/* Title Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
            사내 갈등 제로,<br />완만한 커뮤니케이션의 시작
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-medium">
            긴박함과 배려 사이의 간극을 AI가 메워드립니다.<br />
            MBTI 기반 최적 쿠션어로 자동 변환합니다.
          </p>
        </section>

        <CushionForm onSubmit={submitToAI} isLoading={isLoading} error={error} />

        {result && <CushionResult result={result} />}
      </main>
    </div>
  );
}
