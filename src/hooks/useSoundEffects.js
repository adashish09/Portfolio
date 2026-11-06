import { useState, useEffect, useCallback, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * High-End Synthetic Audio Micro-Interactions
 * Generates delicate, cinematic UI acoustic feedback via Web Audio API.
 * 0 byte asset weight, muted by default, persistent user preference.
 */
export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Load sound preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_sound_enabled');
    if (saved === 'true') {
      setSoundEnabled(true);
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_sound_enabled', String(next));
      if (next) {
        // Play gentle confirmation chime
        playChime(660, 880);
      }
      return next;
    });
  };

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Subtle tap click
  const playClick = useCallback(() => {
    if (!soundEnabled || prefersReducedMotion) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  }, [soundEnabled, prefersReducedMotion]);

  // Gentle confirmation chime
  const playChime = useCallback((freq1 = 523.25, freq2 = 659.25) => {
    if (prefersReducedMotion) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [freq1, freq2].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.05, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch (e) {}
  }, [prefersReducedMotion]);

  return {
    soundEnabled,
    toggleSound,
    playClick,
    playChime,
  };
}

export default useSoundEffects;

