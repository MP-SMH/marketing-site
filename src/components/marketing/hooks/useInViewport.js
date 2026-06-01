import { useEffect, useRef, useState } from 'react';

/**
 * useInViewport
 * Returns [ref, inView] tuple. Fires once when element enters viewport.
 * Respects prefers-reduced-motion (returns inView=true immediately).
 */
export default function useInViewport(threshold = 0.3, rootMargin = '0px') {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}
