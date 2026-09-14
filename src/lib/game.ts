export type Difficulty = "easy" | "medium" | "hard";

export interface DifficultyConfig {
  label: string;
  pairs: number;
  cols: number;
  rows: number;
}

export const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: { label: "Easy", pairs: 6, cols: 4, rows: 3 },
  medium: { label: "Medium", pairs: 8, cols: 4, rows: 4 },
  hard: { label: "Hard", pairs: 12, cols: 6, rows: 4 },
};

export interface CardData {
  id: number;
  pairId: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BestScore {
  time: number;
  moves: number;
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Ordered deck: identical on server and client, safe for SSR first paint.
export function buildOrderedDeck(pairs: number): CardData[] {
  const deck: CardData[] = [];
  for (let p = 0; p < pairs; p++) {
    deck.push(
      { id: p * 2, pairId: p, iconIndex: p, isFlipped: false, isMatched: false },
      { id: p * 2 + 1, pairId: p, iconIndex: p, isFlipped: false, isMatched: false }
    );
  }
  return deck;
}

// Shuffled deck: call only on the client (start of each game).
export function buildDeck(pairs: number): CardData[] {
  return shuffle(buildOrderedDeck(pairs));
}

const BEST_KEY = (d: Difficulty) => `cardflip-best-${d}`;

export function loadBest(difficulty: Difficulty): BestScore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(BEST_KEY(difficulty));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BestScore;
    if (typeof parsed.time !== "number" || typeof parsed.moves !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBest(difficulty: Difficulty, score: BestScore): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BEST_KEY(difficulty), JSON.stringify(score));
  } catch {
    // storage unavailable, ignore
  }
}

export function isNewBest(candidate: BestScore, current: BestScore | null): boolean {
  if (!current) return true;
  if (candidate.time !== current.time) return candidate.time < current.time;
  return candidate.moves < current.moves;
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
