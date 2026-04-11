export function ResultSkeleton() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mt-12 w-full max-w-3xl space-y-6 duration-700">
      <div className="rounded-3xl bg-linear-to-br from-indigo-500/40 via-purple-500/40 to-rose-500/40 p-1">
        <div className="h-full rounded-[23px] bg-zinc-950 p-8 backdrop-blur-xl">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Score skeleton */}
            <div className="flex w-48 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900 p-6">
              <div className="mb-2 h-4 w-16 animate-pulse rounded bg-zinc-800" />
              <div className="mb-4 h-24 w-24 animate-pulse rounded-full bg-zinc-800" />
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 space-y-6">
              <div>
                <div className="mb-3 h-6 w-32 animate-pulse rounded bg-zinc-800" />
                <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>

              <div>
                <div className="mb-3 h-5 w-24 animate-pulse rounded bg-zinc-800" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
