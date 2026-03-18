"use client";

import { useState, useRef } from "react";
import { ShieldCheck, Sparkles, CheckCircle2, Loader2, ChevronDown, AlertCircle, ImagePlus, X } from "lucide-react";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
];

const CONTEXTS = [
  "휴가 중 보고", "상사 실수 지적", "긴급 요청",
  "거절 메시지", "사과 메시지", "부탁 메시지"
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

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    suggestion: string;
    koreanTranslation?: string | null;
    insights: string[]
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let file: File | undefined;

    if ('dataTransfer' in e) {
      file = e.dataTransfer.files?.[0];
    } else {
      file = e.target.files?.[0];
    }

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      const base64String = (reader.result as string).split(',')[1];
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
          imageMimeType
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
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-50 font-sans selection:bg-indigo-500/30 pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white/90">CushionFlow</span>
          </div>
        </div>
      </header>

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

        {/* Input Card Container */}
        <div className="w-full max-w-3xl space-y-4">

          {/* Top: Message Input */}
          <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
            <label className="block text-sm font-semibold text-zinc-400 mb-3">
              전달할 메시지 (또는 이미지 캡처 첨부)
            </label>
            <div
              className={`relative p-1 rounded-xl transition-all duration-300 ${isDragging ? "bg-indigo-500/20 border-2 border-dashed border-indigo-400" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragging && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-xl">
                  <p className="text-indigo-400 font-bold flex items-center gap-2">
                    <ImagePlus className="w-5 h-5 animate-bounce" />
                    이미지를 여기에 놓아주세요
                  </p>
                </div>
              )}
              <textarea
                className="w-full h-32 bg-transparent border-none text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-0 resize-none text-lg"
                placeholder="예: 팀장님... 왜 아직도 안 하셨나요? (이미지를 여기로 드래그 앤 드롭 하셔도 됩니다)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* 이미지 미리보기 구역 */}
              {imagePreview ? (
                <div className="mt-4 relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Uploaded" className="max-h-32 rounded-lg border border-white/10 opacity-80" />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                  >
                    <ImagePlus className="w-4 h-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MBTI Selection */}
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md relative">
              <label className="block text-sm font-semibold text-zinc-400 mb-3">수신자 커뮤니케이션 스타일 (MBTI)</label>
              <div className="relative">
                <button
                  onClick={() => setIsMbtiOpen(!isMbtiOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors text-left"
                >
                  <span className="font-semibold text-zinc-200">{mbti}</span>
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                </button>

                {isMbtiOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 max-h-64 overflow-y-auto bg-zinc-800 border border-white/10 rounded-xl shadow-2xl z-50 py-2 custom-scrollbar">
                    {MBTI_TYPES.map((type) => (
                      <button
                        key={type}
                        className={`w-full text-left px-4 py-2 hover:bg-white/5 transition-colors ${mbti === type ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-zinc-300'}`}
                        onClick={() => {
                          setMbti(type);
                          setIsMbtiOpen(false);
                        }}
                      >
                        {mbti === type && <CheckCircle2 className="w-4 h-4 inline-block mr-2" />}
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {mbti} 스타일에 맞춘 비즈니스 언어 최적화
              </p>
            </div>

            {/* Context Selection */}
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
              <label className="block text-sm font-semibold text-zinc-400 mb-3">상황 맥락</label>
              <div className="flex flex-wrap gap-2">
                {CONTEXTS.map((ctx) => (
                  <button
                    key={ctx}
                    onClick={() => setContext(ctx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${context === ctx
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'bg-black/40 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                  >
                    {ctx}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 w-64 shadow-[0_0_40px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                  쿠션어로 변환하기
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="w-full max-w-3xl mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-rose-500/40 opacity-100 transition-opacity">
              <div className="p-8 rounded-[23px] bg-zinc-950 h-full backdrop-blur-xl">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                  {/* Score */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-zinc-900 rounded-2xl border border-white/5 w-48 text-center">
                    <span className="text-sm text-zinc-400 font-medium mb-2">쿠션 지수 (Cushion Index)</span>
                    <div className="relative flex items-center justify-center mb-4">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
                        <circle
                          cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                          className={`${result.score > 80 ? 'text-emerald-500' : result.score > 49 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                        {result.score}
                      </span>
                    </div>

                    {/* Score Explanation */}
                    <div className="text-xs space-y-1">
                      {result.score > 80 ? (
                        <p className="text-emerald-400 font-medium">안전한 메시지입니다 🟢</p>
                      ) : result.score > 49 ? (
                        <p className="text-amber-400 font-medium">조금 주의가 필요합니다 🟡</p>
                      ) : (
                        <p className="text-rose-400 font-medium">갈등 유발 가능성이 높습니다 🔴</p>
                      )}
                      <p className="text-zinc-500 mt-2">입력하신 원본 메시지가 상대방에게 무례하거나 부담을 줄 확률을 100점 만점으로 평가한 수치입니다.</p>
                    </div>
                  </div>

                  {/* Suggestion & Insight */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        쿠션어 제안
                      </h3>
                      <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                        <p className="text-zinc-200 text-lg leading-relaxed whitespace-pre-wrap">
                          {result.suggestion}
                        </p>
                      </div>

                      {/* Korean Translation (only shown if provided and different) */}
                      {result.koreanTranslation && (
                        <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                          <h4 className="text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-wider">한국어 번역</h4>
                          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
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
  const data = Array.isArray(insights) ? insights : typeof insights === 'string' ? [insights] : [];

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        에이전트 분석 (비즈니스/커뮤니케이션 관점)
      </h3>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur-md">
        <ul className="space-y-4">
          {data.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap flex-1">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
