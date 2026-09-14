"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { formatTime } from "@/lib/game";

interface WinModalProps {
  open: boolean;
  time: number;
  moves: number;
  isRecord: boolean;
  onPlayAgain: () => void;
}

export function WinModal({ open, time, moves, isRecord, onPlayAgain }: WinModalProps) {
  const playAgainRef = useRef<HTMLButtonElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      firedRef.current = false;
      return;
    }
    playAgainRef.current?.focus();
    if (firedRef.current) return;
    firedRef.current = true;

    const defaults = { origin: { y: 0.7 }, zIndex: 60 };
    confetti({ ...defaults, particleCount: 90, spread: 70, colors: ["#FCD34D", "#38BDF8", "#F472B6", "#34D399"] });
    const t1 = setTimeout(() => confetti({ ...defaults, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.8 } }), 250);
    const t2 = setTimeout(() => confetti({ ...defaults, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.8 } }), 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onPlayAgain();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onPlayAgain]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="win-title"
        >
          <motion.div
            className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl"
            initial={{ scale: 0.85, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <p className="text-xs font-medium tracking-widest text-slate-400 uppercase">Semua pasangan ditemukan</p>
            <h2 id="win-title" className="mt-2 text-3xl font-bold text-slate-50">
              Kamu Menang
            </h2>

            {isRecord && (
              <motion.p
                className="mx-auto mt-3 inline-block rounded-md bg-amber-300 px-3 py-1 text-sm font-semibold text-slate-950"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 400, damping: 15 }}
              >
                Rekor Baru!
              </motion.p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-800/80 p-4">
                <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">Waktu</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-slate-50 tabular-nums">{formatTime(time)}</dd>
              </div>
              <div className="rounded-lg bg-slate-800/80 p-4">
                <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">Moves</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-slate-50 tabular-nums">{moves}</dd>
              </div>
            </dl>

            <button
              ref={playAgainRef}
              type="button"
              onClick={onPlayAgain}
              className="mt-8 min-h-11 w-full rounded-lg bg-amber-300 px-6 text-base font-semibold text-slate-950 transition-colors hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              Main Lagi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
