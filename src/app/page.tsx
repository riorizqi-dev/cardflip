import { GameBoard } from "@/components/GameBoard";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-clip">
      {/* Decorative background: amber brand blobs + dot lattice.
          Purpose: fill dead space on wide screens so the dark stage
          feels intentional, not empty. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full text-slate-700/25">
          <defs>
            <pattern id="bg-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-dots)" />
        </svg>
        {/* soften the dots toward the center so the board stays the focal point */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.75)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
        <header className="mb-8 flex flex-col items-center gap-3 text-center lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
              Card<span className="text-amber-300">Flip</span>
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
              Hafalkan, tutup, lalu temukan semua pasangan logo teknologi.
              Moves dan waktu menentukan rekormu.
            </p>
          </div>
          <p className="hidden text-xs text-slate-500 lg:block lg:max-w-[16rem] lg:text-right">
            Skor terbaik tersimpan otomatis di browser untuk setiap tingkat kesulitan.
          </p>
        </header>

        <GameBoard />

        <footer className="mt-auto pt-10 text-center text-xs text-slate-600 lg:hidden">
          Skor terbaik tersimpan otomatis di browser per tingkat kesulitan.
        </footer>
      </div>
    </main>
  );
}
