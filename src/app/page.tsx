"use client";

import { useState, useRef, useEffect } from "react";
import { CushionResponsePayload } from "@/lib/types";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
  ChevronDown,
  AlertCircle,
  ImagePlus,
  X,
  Copy,
  Check,
} from "lucide-react";

const MBTI_TYPES = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

const CONTEXTS = [
  "휴가 중 보고",
  "상사 실수 지적",
  "긴급 요청",
  "거절 메시지",
  "사과 메시지",
  "부탁 메시지",
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [mbti, setMbti] = useState("INFP");
  const [context, setContext] = useState("휴가 중 보고");
  const [isMbtiOpen, setIsMbtiOpen] = useState(false);

  // 멀티모달 이미지 업로드 관련 State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CushionResponsePayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let file: File | undefined;

    if ("dataTransfer" in e) {
      file = e.dataTransfer.files?.[0];
    } else {
      file = e.target.files?.[0];
    }

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`이미지 크기는 ${MAX_SIZE_MB}MB 이하만 업로드 가능합니다.`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      const base64String = (reader.result as string).split(",")[1];
      setImageBase64(base64String);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setIsCopied(true);
      copyTimeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setError("클립보드 복사에 실패했습니다.");
    }
  };

  const handleConvert = async () => {
    if (!message.trim() && !imageBase64) {
      setError("전달할 메시지를 입력하거나 캡처한 이미지를 첨부해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/cushion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalMessage: message,
          mbti,
          context,
          imageBase64,
          imageMimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "오류가 발생했습니다.");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-24 font-sans text-zinc-50 selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] h-[40%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white/90">CushionFlow</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-32">
        {/* Title Section */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            사내 갈등 제로,
            <br />
            완만한 커뮤니케이션의 시작
          </h1>
          <p className="text-lg font-medium text-zinc-400 md:text-xl">
            긴박함과 배려 사이의 간극을 AI가 메워드립니다.
            <br />
            MBTI 기반 최적 쿠션어로 자동 변환합니다.
          </p>
        </section>

        {/* Input Card Container */}
        <div className="w-full max-w-3xl space-y-4">
          {/* Top: Message Input */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
            <label className="mb-3 block text-sm font-semibold text-zinc-400">
              전달할 메시지 (또는 이미지 캡처 첨부)
            </label>
            <div
              className={`relative rounded-xl p-1 transition-all duration-300 ${isDragging ? "border-2 border-dashed border-indigo-400 bg-indigo-500/20" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragging && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-zinc-900/80 backdrop-blur-sm">
                  <p className="flex items-center gap-2 font-bold text-indigo-400">
                    <ImagePlus className="h-5 w-5 animate-bounce" />
                    이미지를 여기에 놓아주세요
                  </p>
                </div>
              )}
              <textarea
                className="h-32 w-full resize-none border-none bg-transparent text-lg text-zinc-200 placeholder:text-zinc-600 focus:ring-0 focus:outline-none"
                placeholder="예: 팀장님... 왜 아직도 안 하셨나요? (이미지를 여기로 드래그 앤 드롭 하셔도 됩니다)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* 이미지 미리보기 구역 */}
              {imagePreview ? (
                <div className="relative mt-4 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="max-h-32 rounded-lg border border-white/10 opacity-80"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
                  >
                    <ImagePlus className="h-4 w-4" />
                    대화 캡처 이미지 첨부
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Bottom Grid: MBTI & Context */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* MBTI Selection */}
            <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
              <label className="mb-3 block text-sm font-semibold text-zinc-400">
                수신자 커뮤니케이션 스타일 (MBTI)
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsMbtiOpen(!isMbtiOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-left transition-colors hover:bg-black/60"
                >
                  <span className="font-semibold text-zinc-200">{mbti}</span>
                  <ChevronDown className="h-5 w-5 text-zinc-500" />
                </button>

                {isMbtiOpen && (
                  <div className="custom-scrollbar absolute top-full left-0 z-50 mt-2 max-h-64 w-48 overflow-y-auto rounded-xl border border-white/10 bg-zinc-800 py-2 shadow-2xl">
                    {MBTI_TYPES.map((type) => (
                      <button
                        key={type}
                        className={`w-full px-4 py-2 text-left transition-colors hover:bg-white/5 ${mbti === type ? "bg-indigo-500/10 font-bold text-indigo-400" : "text-zinc-300"}`}
                        onClick={() => {
                          setMbti(type);
                          setIsMbtiOpen(false);
                        }}
                      >
                        {mbti === type && <CheckCircle2 className="mr-2 inline-block h-4 w-4" />}
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-zinc-500">
                <ShieldCheck className="h-3 w-3" /> {mbti} 스타일에 맞춘 비즈니스 언어 최적화
              </p>
            </div>

            {/* Context Selection */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
              <label className="mb-3 block text-sm font-semibold text-zinc-400">상황 맥락</label>
              <div className="flex flex-wrap gap-2">
                {CONTEXTS.map((ctx) => (
                  <button
                    key={ctx}
                    onClick={() => setContext(ctx)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      context === ctx
                        ? "border-indigo-500 bg-indigo-600/30 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                        : "border-white/5 bg-black/40 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    }`}
                  >
                    {ctx}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="group font-pj relative inline-flex w-64 items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all duration-200 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-5 w-5 group-hover:animate-pulse" />
                  쿠션어로 변환하기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 mt-12 w-full max-w-3xl space-y-6 duration-700">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-rose-500/40 p-1 opacity-100 transition-opacity">
              <div className="h-full rounded-[23px] bg-zinc-950 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-start gap-8 md:flex-row">
                  {/* Score */}
                  <div className="flex w-48 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900 p-6 text-center">
                    <span className="mb-2 text-sm font-medium text-zinc-400">
                      쿠션 지수 (Cushion Index)
                    </span>
                    <div className="relative mb-4 flex items-center justify-center">
                      <svg className="h-24 w-24 -rotate-90 transform">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-zinc-800"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                          className={`${result.score > 80 ? "text-emerald-500" : result.score > 49 ? "text-amber-500" : "text-rose-500"} transition-all duration-1000 ease-out`}
                        />
                      </svg>
                      <span className="absolute bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-2xl font-bold text-transparent">
                        {result.score}
                      </span>
                    </div>

                    {/* Score Explanation */}
                    <div className="space-y-1 text-xs">
                      {result.score > 80 ? (
                        <p className="font-medium text-emerald-400">안전한 메시지입니다 🟢</p>
                      ) : result.score > 49 ? (
                        <p className="font-medium text-amber-400">조금 주의가 필요합니다 🟡</p>
                      ) : (
                        <p className="font-medium text-rose-400">갈등 유발 가능성이 높습니다 🔴</p>
                      )}
                      <p className="mt-2 text-zinc-500">
                        입력하신 원본 메시지가 상대방에게 무례하거나 부담을 줄 확률을 100점 만점으로
                        평가한 수치입니다.
                      </p>
                    </div>
                  </div>

                  {/* Suggestion & Insight */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-indigo-300">
                          <Sparkles className="h-5 w-5" />
                          쿠션어 제안
                        </h3>
                        <button
                          onClick={() => handleCopy(result.suggestion)}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-400 transition-all hover:border-indigo-500/30 hover:text-indigo-400"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-400" />
                              <span className="text-emerald-400">복사됨</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              복사
                            </>
                          )}
                        </button>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-lg leading-relaxed whitespace-pre-wrap text-zinc-200">
                          {result.suggestion}
                        </p>
                      </div>

                      {/* Korean Translation (only shown if provided and different) */}
                      {result.koreanTranslation && (
                        <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
                          <h4 className="mb-2 text-xs font-semibold tracking-wider text-indigo-400 uppercase">
                            한국어 번역
                          </h4>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                            {result.koreanTranslation}
                          </p>
                        </div>
                      )}
                    </div>

                    <AnalysisCard insights={result.insights} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function AnalysisCard({ insights }: { insights: string[] }) {
  // If fallback text comes in as single string, wrap it manually safely.
  const data = Array.isArray(insights) ? insights : typeof insights === "string" ? [insights] : [];

  return (
    <div className="mt-6">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-400">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
        에이전트 분석 (비즈니스/커뮤니케이션 관점)
      </h3>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur-md">
        <ul className="space-y-4">
          {data.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-400">
                {idx + 1}
              </span>
              <p className="flex-1 text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
