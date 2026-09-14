"use client";

import { formatTime, type BestScore } from "@/lib/game";

interface StatsBarProps {
  moves: number;
  time: number;
  best: BestScore | null;
  onReset: () => void;
}

export function StatsBar({ moves, time, best, onReset }: StatsBarProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">Moves</span>
        <span className="font-mono text-xl font-semibold text-slate-100 tabular-nums">{moves}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">Waktu</span>
        <span className="font-mono text-xl font-semibold text-slate-100 tabular-nums">{formatTime(time)}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">Terbaik</span>
        <span className="font-mono text-xl font-semibold text-amber-300 tabular-nums">
          {best ? `${formatTime(best.time)} / ${best.moves}` : "--:--"}
        </span>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="min-h-11 rounded-lg border border-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors hover:border-amber-300/70 hover:text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
      >
        Acak Ulang
      </button>
    </div>
  );
}
