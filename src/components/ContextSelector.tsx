"use client";

const CONTEXTS = [
  "휴가 중 보고",
  "상사 실수 지적",
  "긴급 요청",
  "거절 메시지",
  "사과 메시지",
  "부탁 메시지",
];

interface Props {
  context: string;
  onContextChange: (value: string) => void;
}

export function ContextSelector({ context, onContextChange }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md">
      <label className="mb-3 block text-sm font-semibold text-zinc-400">상황 맥락</label>
      <div className="flex flex-wrap gap-2">
        {CONTEXTS.map((ctx) => (
          <button
            key={ctx}
            onClick={() => onContextChange(ctx)}
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
  );
}
