import { useEffect, useState } from 'react';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function getReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * useCountUp
 * Animates a number from 0 to target. Respects prefers-reduced-motion.
 *
 * @param {number} target - Final value
 * @param {object} options - { start: bool, duration: ms, decimals: number }
 * @returns {number}
 */
export default function useCountUp(target, options = {}) {
  const { start = false, duration = 1600, decimals = 0 } = options;
  const reducedMotion = getReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion || duration <= 0) {
      setValue(target);
      return;
    }

    let frameId;
    let startTime;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const next = target * eased;
      setValue(Number(next.toFixed(decimals)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start, decimals, reducedMotion]);

  return value;
}
