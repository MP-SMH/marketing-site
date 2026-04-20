import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    style: {
      opacity: 0,
      transform: 'translateY(28px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    },
  };
}

export function useStaggerAnimation(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    style: {
      opacity: 0,
      transform: 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  };
}

const globalCSS = `
@keyframes mkt-heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
@keyframes mkt-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 20px) scale(1.1); }
}
@keyframes mkt-ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes mkt-feed-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes mkt-glow {
  0%, 100% { box-shadow: 0 0 4px rgba(21,128,61,0.3); }
  50% { box-shadow: 0 0 12px rgba(21,128,61,0.6); }
}
@keyframes mkt-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
html { scroll-behavior: smooth; }
`;

export default function MarketingAnimations() {
  useEffect(() => {
    const id = 'mkt-global-styles';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return null;
}