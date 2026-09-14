"use client";

import { DIFFICULTIES, type Difficulty } from "@/lib/game";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
}

const ORDER: Difficulty[] = ["easy", "medium", "hard"];

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Tingkat kesulitan"
      className="inline-flex rounded-lg border border-slate-700 bg-slate-900/80 p-1"
    >
      {ORDER.map((d) => {
        const cfg = DIFFICULTIES[d];
        const active = value === d;
        return (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(d)}
            className={`min-h-11 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
              active
                ? "bg-amber-300 text-slate-950"
                : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            {cfg.label}
            <span className={`ml-2 hidden text-xs sm:inline ${active ? "text-slate-700" : "text-slate-500"}`}>
              {cfg.cols}x{cfg.rows}
            </span>
          </button>
        );
      })}
    </div>
  );
}
