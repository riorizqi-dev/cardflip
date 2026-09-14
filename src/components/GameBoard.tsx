"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildDeck,
  buildOrderedDeck,
  DIFFICULTIES,
  isNewBest,
  loadBest,
  saveBest,
  type BestScore,
  type CardData,
  type Difficulty,
} from "@/lib/game";
import { sounds } from "@/lib/sound";
import { Card } from "./Card";
import { StatsBar } from "./StatsBar";
import { WinModal } from "./WinModal";
import { DifficultySelector } from "./DifficultySelector";
import { SidePanel } from "./SidePanel";

const MISMATCH_DELAY_MS = 800;
const PREVIEW_SECONDS = 3;

type Phase = "idle" | "preview" | "playing";

function loadAllBest(): Record<Difficulty, BestScore | null> {
  return {
    easy: loadBest("easy"),
    medium: loadBest("medium"),
    hard: loadBest("hard"),
  };
}

export function GameBoard() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  // Ordered deck: identical between server and client, no hydration mismatch.
  const [deck, setDeck] = useState<CardData[]>(() =>
    buildOrderedDeck(DIFFICULTIES.medium.pairs)
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [previewLeft, setPreviewLeft] = useState(PREVIEW_SECONDS);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);
  const [bestScores, setBestScores] = useState<Record<Difficulty, BestScore | null>>({
    easy: null,
    medium: null,
    hard: null,
  });
  const [isRecord, setIsRecord] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (previewRef.current) clearInterval(previewRef.current);
  }, []);

  // Start a fresh game: shuffle on the client, show all cards for a few
  // seconds (preview), then close them all and let the player guess.
  const startGame = useCallback(
    (d: Difficulty) => {
      clearTimers();
      setDeck(buildDeck(DIFFICULTIES[d].pairs).map((c) => ({ ...c, isFlipped: true })));
      setPhase("preview");
      setPreviewLeft(PREVIEW_SECONDS);
      setFlippedIds([]);
      setMoves(0);
      setTime(0);
      setStarted(false);
      setWon(false);
      setLocked(true);
      setIsRecord(false);

      previewRef.current = setInterval(() => {
        setPreviewLeft((left) => {
          if (left <= 1) {
            if (previewRef.current) clearInterval(previewRef.current);
            setDeck((prev) => prev.map((c) => ({ ...c, isFlipped: false })));
            setPhase("playing");
            setLocked(false);
            return 0;
          }
          return left - 1;
        });
      }, 1000);
    },
    [clearTimers]
  );

  // Kick off the first game after mount (client only), and load best scores.
  // No mount-guard ref: StrictMode re-runs this effect, and startGame must
  // run again so its preview interval survives the simulated remount.
  // Deferred to a macrotask so state updates stay out of the effect body.
  useEffect(() => {
    const boot = setTimeout(() => {
      setBestScores(loadAllBest());
      startGame("medium");
    }, 0);
    return () => {
      clearTimeout(boot);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stopwatch: runs from first guess until win.
  useEffect(() => {
    if (!started || won) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, won]);

  const handleDifficulty = useCallback(
    (d: Difficulty) => {
      setDifficulty(d);
      startGame(d);
    },
    [startGame]
  );

  const handleFlip = useCallback(
    (id: number) => {
      if (phase !== "playing" || locked || won) return;
      const card = deck.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;
      if (flippedIds.length >= 2) return;

      sounds.flip();
      if (!started) setStarted(true);

      const nextDeck = deck.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
      setDeck(nextDeck);
      const nextFlipped = [...flippedIds, id];
      setFlippedIds(nextFlipped);

      if (nextFlipped.length < 2) return;

      // Second card opened: one move spent, lock the board while checking.
      setMoves((m) => m + 1);
      setLocked(true);

      const [aId, bId] = nextFlipped;
      const a = nextDeck.find((c) => c.id === aId)!;
      const b = nextDeck.find((c) => c.id === bId)!;

      if (a.pairId === b.pairId) {
        timeoutRef.current = setTimeout(() => {
          sounds.match();
          const matchedDeck = nextDeck.map((c) =>
            c.pairId === a.pairId ? { ...c, isMatched: true } : c
          );
          setDeck(matchedDeck);
          setFlippedIds([]);
          setLocked(false);

          if (matchedDeck.every((c) => c.isMatched)) {
            setWon(true);
            sounds.win();
            const candidate = { time, moves: moves + 1 };
            const current = loadBest(difficulty);
            const record = isNewBest(candidate, current);
            setIsRecord(record);
            if (record) {
              saveBest(difficulty, candidate);
              setBestScores(loadAllBest());
            }
          }
        }, 350);
      } else {
        timeoutRef.current = setTimeout(() => {
          sounds.noMatch();
          setDeck((prev) =>
            prev.map((c) => (c.id === aId || c.id === bId ? { ...c, isFlipped: false } : c))
          );
          setFlippedIds([]);
          setLocked(false);
        }, MISMATCH_DELAY_MS);
      }
    },
    [phase, deck, flippedIds, locked, won, started, difficulty, moves, time]
  );

  const cfg = DIFFICULTIES[difficulty];
  const matchedPairs = deck.filter((c) => c.isMatched).length / 2;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-between">
        <DifficultySelector value={difficulty} onChange={handleDifficulty} />
        <StatsBar moves={moves} time={time} best={bestScores[difficulty]} onReset={() => startGame(difficulty)} />
      </div>

      {phase === "preview" && (
        <p
          className="self-center rounded-lg border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200"
          role="status"
        >
          Hafalkan posisi kartu... menutup dalam {previewLeft}
        </p>
      )}

      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center xl:gap-12">
        <div
          className="grid w-full gap-2.5 sm:gap-3 lg:gap-4"
          style={{
            gridTemplateColumns: `repeat(${cfg.cols}, minmax(0, 1fr))`,
            maxWidth:
              cfg.cols >= 6
                ? "min(100%, 56rem)"
                : cfg.cols === 4
                  ? "min(100%, 38rem)"
                  : "min(100%, 30rem)",
          }}
          role="group"
          aria-label="Papan kartu"
        >
          {deck.map((card) => (
            <Card
              key={card.id}
              card={card}
              onFlip={handleFlip}
              disabled={locked || won || phase !== "playing"}
            />
          ))}
        </div>

        <div className="hidden w-full max-w-sm lg:block">
          <SidePanel
            bestScores={bestScores}
            activeDifficulty={difficulty}
            moves={moves}
            matchedPairs={matchedPairs}
            totalPairs={cfg.pairs}
          />
        </div>
      </div>

      <WinModal
        open={won}
        time={time}
        moves={moves}
        isRecord={isRecord}
        onPlayAgain={() => startGame(difficulty)}
      />
    </div>
  );
}
