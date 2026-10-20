import LZString from 'lz-string';
import { BouquetConfig } from '../types/bouquet';

export function encodeBouquetToUrl(bouquet: BouquetConfig): string {
  try {
    const jsonString = JSON.stringify(bouquet);
    const compressed = LZString.compressToEncodedURIComponent(jsonString);
    const url = new URL(window.location.href);
    url.hash = `b=${compressed}`;
    return url.toString();
  } catch (error) {
    console.error('Failed to encode bouquet:', error);
    return window.location.href;
  }
}

export function decodeBouquetFromUrl(): BouquetConfig | null {
  try {
    const hash = window.location.hash;
    if (!hash || !hash.includes('b=')) {
      return null;
    }
    const match = hash.match(/b=([^&]+)/);
    if (!match || !match[1]) return null;

    const compressed = match[1];
    const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
    if (!jsonString) return null;

    return JSON.parse(jsonString) as BouquetConfig;
  } catch (error) {
    console.error('Failed to decode bouquet from url:', error);
    return null;
  }
}

// Gentle Web Audio API chime sound effect for unwrapping the bouquet
export function playChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (major arpeggio)

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 1.0);
    });
  } catch (e) {
    console.warn('AudioContext not allowed or not supported yet', e);
  }
}
