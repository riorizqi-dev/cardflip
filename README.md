# CardFlip

Game memory matching klasik dengan tema logo teknologi. Hafalkan posisi ikon saat semua kartu terbuka di awal, lalu temukan semua pasangan dengan moves dan waktu sesedikit mungkin.

## Demo

[https://cardflip-plum.vercel.app](https://cardflip-plum.vercel.app)

## Fitur

- Preview phase: semua kartu terbuka 3 detik untuk dihafal, lalu menutup serentak
- Animasi flip 3D (rotateY) yang smooth dengan Framer Motion
- Animasi pop + glow saat menemukan pasangan, kartu matched meredup
- 3 tingkat kesulitan: Easy (4x3, 6 pasang), Medium (4x4, 8 pasang), Hard (6x4, 12 pasang)
- Stopwatch dan counter moves
- Best score per difficulty tersimpan di localStorage, dengan badge "Rekor Baru!"
- Confetti celebration saat menang (canvas-confetti)
- Sound effect flip, match, dan win via Web Audio API (tanpa file audio)
- Panel samping di desktop: progres sesi, rekor per difficulty, cara main
- Fully responsive: mobile, tablet, desktop
- Aksesibel: keyboard navigable, focus state jelas, aria-label pada kartu

## Tech Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Framer Motion (animasi flip 3D dan micro-interaction)
- canvas-confetti (win celebration)
- Web Audio API (sound effect)
- TypeScript

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Build Produksi

```bash
npm run build
npm run start
```

## Struktur

```
src/
  app/            page, layout, global styles
  components/     Card, GameBoard, WinModal, DifficultySelector, StatsBar, SidePanel, TechIcon
  lib/            game.ts (deck, shuffle, best score), sound.ts (Web Audio)
```
