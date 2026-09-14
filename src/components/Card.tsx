"use client";

import { motion } from "framer-motion";
import type { CardData } from "@/lib/game";
import { TechIcon, TECH_ICONS } from "./TechIcon";

interface CardProps {
  card: CardData;
  onFlip: (id: number) => void;
  disabled: boolean;
}

export function Card({ card, onFlip, disabled }: CardProps) {
  const icon = TECH_ICONS[card.iconIndex % TECH_ICONS.length];
  const isOpen = card.isFlipped || card.isMatched;

  return (
    <motion.button
      type="button"
      onClick={() => onFlip(card.id)}
      disabled={disabled || isOpen}
      aria-label={isOpen ? `Kartu ${icon.name}` : "Kartu tertutup"}
      aria-pressed={isOpen}
      className="group relative aspect-[3/4] w-full cursor-pointer select-none rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-default"
      style={{ perspective: 1000 }}
      whileHover={!isOpen && !disabled ? { scale: 1.03 } : undefined}
      whileTap={!isOpen && !disabled ? { scale: 0.96 } : undefined}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {/* Card back: amber gradient, CF monogram, diamond pattern */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-amber-200/40 bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.35)] transition-shadow group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_14px_rgba(251,191,36,0.35)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* subtle diamond lattice */}
          <svg
            className="absolute inset-0 h-full w-full text-slate-950/10"
            aria-hidden="true"
          >
            <defs>
              <pattern id="cf-diamonds" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="18" height="18" fill="none" />
                <rect x="7" y="7" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cf-diamonds)" />
          </svg>
          {/* CF monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-1/2 aspect-square items-center justify-center rounded-lg bg-slate-950/85 font-mono text-[clamp(0.9rem,2.5vw,1.4rem)] font-bold tracking-tight text-amber-300 shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              CF
            </span>
          </div>
        </div>

        {/* Card face: tech icon with its brand accent.
            Static wrapper owns the 180deg rotation so SSR always prints it;
            the motion child handles visibility (SSR-safe first paint) and
            the match pop, without fighting over the transform property. */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-center rounded-xl border-2 bg-slate-900"
            initial={{ visibility: "hidden", scale: 1 }}
            animate={{
              visibility: isOpen ? "visible" : ("hidden" as const),
              scale: card.isMatched ? [1, 1.12, 1] : 1,
            }}
            transition={{
              visibility: { delay: isOpen ? 0 : 0.22 },
              scale: { duration: 0.4, ease: "easeOut" },
            }}
            style={{
              borderColor: card.isMatched ? "#34D399" : icon.color,
              boxShadow: card.isMatched
                ? "0 0 20px rgba(52,211,153,0.45), inset 0 0 14px rgba(52,211,153,0.15)"
                : `0 0 14px ${icon.color}44, inset 0 1px 0 rgba(255,255,255,0.06)`,
              opacity: card.isMatched ? 0.55 : 1,
            }}
          >
            <TechIcon index={card.iconIndex} className="h-1/2 w-1/2" />
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
}
