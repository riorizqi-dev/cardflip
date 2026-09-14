// Lightweight sound effects via Web Audio API. No audio files needed.
// Each effect is a short synthesized blip so the game stays dependency-light.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freqStart: number,
  freqEnd: number,
  duration: number,
  type: OscillatorType,
  volume: number,
  delay = 0
): void {
  const audio = getCtx();
  if (!audio) return;
  const t0 = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freqStart, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t0 + duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export const sounds = {
  flip(): void {
    tone(320, 520, 0.09, "triangle", 0.12);
  },
  match(): void {
    tone(523, 523, 0.1, "sine", 0.14);
    tone(659, 659, 0.12, "sine", 0.14, 0.08);
    tone(784, 784, 0.16, "sine", 0.14, 0.16);
  },
  noMatch(): void {
    tone(240, 160, 0.18, "sawtooth", 0.05);
  },
  win(): void {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => tone(n, n, 0.18, "triangle", 0.14, i * 0.12));
    tone(1047, 1568, 0.4, "sine", 0.1, 0.5);
  },
};
