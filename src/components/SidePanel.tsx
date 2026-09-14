"use client";

import { DIFFICULTIES, formatTime, type BestScore, type Difficulty } from "@/lib/game";

interface SidePanelProps {
  bestScores: Record<Difficulty, BestScore | null>;
  activeDifficulty: Difficulty;
  moves: number;
  matchedPairs: number;
  totalPairs: number;
}

const ORDER: Difficulty[] = ["easy", "medium", "hard"];

export function SidePanel({
  bestScores,
  activeDifficulty,
  moves,
  matchedPairs,
  totalPairs,
}: SidePanelProps) {
  const efficiency = moves > 0 ? Math.round((matchedPairs / moves) * 100) : 0;

  return (
    <aside className="flex w-full flex-col gap-6 lg:w-72 lg:shrink-0 xl:w-80">
      {/* Live session progress */}
      <section className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-5" aria-label="Progres sesi">
        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Sesi Ini</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-slate-400">Pasangan ditemukan</span>
            <span className="font-mono text-lg font-semibold text-slate-100 tabular-nums">
              {matchedPairs}/{totalPairs}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-300 transition-all duration-500"
              style={{ width: `${totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0}%` }}
            />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-sm text-slate-400">Akurasi tebakan</span>
            <span className="font-mono text-lg font-semibold text-amber-300 tabular-nums">
              {moves > 0 ? `${efficiency}%` : "--"}
            </span>
          </div>
        </div>
      </section>

      {/* Best score per difficulty */}
      <section className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-5" aria-label="Rekor per tingkat kesulitan">
        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Rekor Terbaik</h2>
        <ul className="mt-4 space-y-3">
          {ORDER.map((d) => {
            const cfg = DIFFICULTIES[d];
            const best = bestScores[d];
            const active = d === activeDifficulty;
            return (
              <li
                key={d}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
                  active
                    ? "border-amber-300/50 bg-amber-300/10"
                    : "border-slate-800 bg-slate-800/40"
                }`}
              >
                <div>
                  <p className={`text-sm font-medium ${active ? "text-amber-200" : "text-slate-300"}`}>
                    {cfg.label}
                  </p>
                  <p className="text-xs text-slate-500">
                    {cfg.cols}x{cfg.rows} · {cfg.pairs} pasang
                  </p>
                </div>
                <div className="text-right font-mono text-sm tabular-nums">
                  {best ? (
                    <>
                      <p className={active ? "text-amber-300" : "text-slate-200"}>{formatTime(best.time)}</p>
                      <p className="text-xs text-slate-500">{best.moves} moves</p>
                    </>
                  ) : (
                    <p className="text-slate-600">belum ada</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* How to play */}
      <section className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-5" aria-label="Cara bermain">
        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Cara Main</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-4 text-sm leading-relaxed text-slate-400">
          <li>Hafalkan posisi ikon saat semua kartu terbuka di awal.</li>
          <li>Setelah tertutup, buka dua kartu untuk mencari pasangannya.</li>
          <li>Dua kartu terbuka dihitung satu move. Selesaikan dengan moves dan waktu sesedikit mungkin.</li>
        </ol>
      </section>
    </aside>
  );
}
