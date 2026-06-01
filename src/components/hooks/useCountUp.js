import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Animates a number from 0 to target. Respects prefers-reduced-motion.
export default function useCountUp(target, options = {}) {
  const { duration = 1600, start = false, decimals = 0 } = options;
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion || duration <= 0) {
      setValue(target);
      return;
    }

    let frameId;
    let startTime;

    const tick = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = target * eased;
      setValue(Number(nextValue.toFixed(decimals)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start, decimals, reducedMotion]);

  return value;
}
