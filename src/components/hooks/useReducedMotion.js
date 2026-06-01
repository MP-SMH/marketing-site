import { useEffect, useState } from 'react';

// Returns true when the user has requested reduced motion.
export default function useReducedMotion(defaultValue = false) {
  const [reduced, setReduced] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  return reduced;
}
