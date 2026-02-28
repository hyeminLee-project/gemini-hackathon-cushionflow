import { ShieldCheck, Sparkles } from "lucide-react";
import { CushionResponsePayload } from "@/lib/types";

export function CushionResult({ result }: { result: CushionResponsePayload }) {
    return (
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
                        <div className="flex-1 space-y-6 flex flex-col w-full overflow-hidden">
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

                                {/* Korean Translation */}
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
    );
}

function AnalysisCard({ insights }: { insights: string[] }) {
    const data = Array.isArray(insights) ? insights : typeof insights === 'string' ? [insights] : [];

    return (
        <div className="mt-6">
            <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                에이전트 분석 (비즈니스/커뮤니케이션 관점)
            </h3>
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 p-5 backdrop-blur-md w-full">
                <ul className="space-y-4">
                    {data.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 flex-1 overflow-hidden">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                {idx + 1}
                            </span>
                            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap flex-1 break-words">
                                {item}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
