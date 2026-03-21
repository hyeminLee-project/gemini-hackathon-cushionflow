interface Props {
  score: number;
}

export function ScoreIndicator({ score }: Props) {
  const colorClass =
    score > 80 ? "text-emerald-500" : score > 49 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="flex w-48 flex-shrink-0 flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900 p-6 text-center">
      <span className="mb-2 text-sm font-medium text-zinc-400">쿠션 지수 (Cushion Index)</span>
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
            strokeDashoffset={251.2 - (251.2 * score) / 100}
            className={`${colorClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className="absolute bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-2xl font-bold text-transparent">
          {score}
        </span>
      </div>
      <div className="space-y-1 text-xs">
        {score > 80 ? (
          <p className="font-medium text-emerald-400">안전한 메시지입니다 🟢</p>
        ) : score > 49 ? (
          <p className="font-medium text-amber-400">조금 주의가 필요합니다 🟡</p>
        ) : (
          <p className="font-medium text-rose-400">갈등 유발 가능성이 높습니다 🔴</p>
        )}
        <p className="mt-2 text-zinc-500">
          입력하신 원본 메시지가 상대방에게 무례하거나 부담을 줄 확률을 100점 만점으로 평가한
          수치입니다.
        </p>
      </div>
    </div>
  );
}
