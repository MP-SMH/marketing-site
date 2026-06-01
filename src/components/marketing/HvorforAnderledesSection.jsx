/**
 * HvorforAnderledesSection.jsx (v9)
 *
 * Changes from v7/v8:
 *   - Supporting cards: KLIKBARE med routes til relevante sider
 *   - Slide-in retninger varieret: card 1 fra top-right, card 2 fra LEFT (other side), card 3 fra right
 *   - Hero card slide-in fra LEFT (modsat side end før)
 *   - Orb mere SUBTLE (mindre amplitude, langsommere)
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ShieldCheck, Users, Eye, ArrowRight, ArrowUpRight,
} from 'lucide-react';

const HERO_DIFF = {
  icon: Heart,
  title: 'Klar fordeling, ingen overraskelser',
  body: 'Ved donationer og fast støtte går 80% til foreningen. Ved webshop går 32,75% af nettoprofitten til den valgte hjertesag. Resten dækker betaling, drift, support og platformen bag.',
  link: { label: 'Se priser og fordeling', route: '/priser' },
  stats: [
    { value: '80%', label: 'Donationer' },
    { value: '80%', label: 'Fast støtte' },
    { value: '32,75%', label: 'Webshop' },
  ],
};

const SUPPORTING_DIFFS = [
  {
    icon: ShieldCheck,
    title: 'Bygget rigtigt fra starten',
    body: 'Verificering, GDPR, dokumentation og hjælp til Indsamlingsnævnet er tænkt ind fra dag 1, ikke noget I selv skal stå alene med.',
    route: '/sikkerhed',
    direction: 'right',
  },
  {
    icon: Users,
    title: 'Lavet til den danske virkelighed',
    body: 'Danske regler, danske støttevaner, danske foreningstyper. Ikke en udenlandsk platform med dansk oversættelse.',
    route: '/om-os',
    direction: 'center',
  },
  {
    icon: Eye,
    title: 'Du taler med et menneske',
    body: 'I starten holder vi tæt kontakt med de første foreninger, så onboarding bliver håndteret ordentligt. Det er en del af kvaliteten.',
    route: '/book-moede',
    direction: 'right',
  },
];

export default function HvorforAnderledesSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const HeroIcon = HERO_DIFF.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -100px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mkt-diff ${isVisible ? 'is-visible' : ''}`}>
      <div className="mkt-diff-inner">
        <header className="mkt-diff-head">
          <div className="mkt-diff-eyebrow">Vores tilgang</div>
          <h2 className="mkt-diff-title">
            Hvorfor StøtMedHjerte er bygget anderledes
          </h2>
          <p className="mkt-diff-subtitle">
            Vi har valgt den svære vej fra starten, fordi det er den rigtige måde at bygge tillid på.
          </p>
        </header>

        <div className="mkt-diff-bento">
          <article className="mkt-diff-hero">
            <div className="mkt-diff-hero-mesh" aria-hidden="true" />
            <div className="mkt-diff-hero-orb" aria-hidden="true" />
            <div className="mkt-diff-hero-grid-bg" aria-hidden="true" />

            <div className="mkt-diff-hero-content">
              <div className="mkt-diff-hero-badge">
                <span className="mkt-diff-hero-badge-dot" />
                Vores DNA
              </div>

              <div className="mkt-diff-hero-icon-wrap">
                <div className="mkt-diff-hero-icon">
                  <HeroIcon size={28} color="#FF4D6A" aria-hidden="true" fill="rgba(255, 77, 106, 0.20)" />
                </div>
              </div>

              <h3 className="mkt-diff-hero-title">{HERO_DIFF.title}</h3>
              <p className="mkt-diff-hero-body">{HERO_DIFF.body}</p>

              <div className="mkt-diff-hero-stats">
                {HERO_DIFF.stats.map((s, i) => (
                  <div key={i} className="mkt-diff-hero-stat" style={{ '--stat-delay': `${400 + i * 120}ms` }}>
                    <div className="mkt-diff-hero-stat-val">{s.value}</div>
                    <div className="mkt-diff-hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <button
                className="mkt-diff-hero-cta"
                onClick={() => navigate(HERO_DIFF.link.route)}
                type="button"
              >
                {HERO_DIFF.link.label}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </article>

          <div className="mkt-diff-supporting">
            {SUPPORTING_DIFFS.map((d, i) => {
              const Icon = d.icon;
              return (
                <button
                  key={i}
                  className={`mkt-diff-card mkt-diff-card-from-${d.direction}`}
                  style={{ '--card-delay': `${(i + 1) * 120}ms` }}
                  onClick={() => navigate(d.route)}
                  type="button"
                  aria-label={`Læs mere: ${d.title}`}
                >
                  <div className="mkt-diff-card-icon">
                    <Icon size={18} color="#E0193F" aria-hidden="true" />
                  </div>
                  <div className="mkt-diff-card-content">
                    <h3 className="mkt-diff-card-title">{d.title}</h3>
                    <p className="mkt-diff-card-body">{d.body}</p>
                  </div>
                  <div className="mkt-diff-card-arrow">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .mkt-diff {
          background: #fff;
          padding: 96px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-diff-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-diff-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-diff-eyebrow {
          display: inline-block;
          padding: 6px 14px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          color: #E0193F;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mkt-diff-title {
          margin: 0 auto 16px;
          max-width: 800px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-diff-subtitle {
          margin: 0 auto;
          max-width: 600px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-diff-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* HERO card */
        .mkt-diff-hero {
          position: relative;
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 40px 32px;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-40px);
          transition:
            opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1);
          color: #fff;
          box-shadow:
            0 32px 80px rgba(15, 23, 42, 0.40),
            0 8px 24px rgba(224, 25, 63, 0.16);
          min-height: 480px;
          display: flex;
          align-items: stretch;
        }

        .mkt-diff.is-visible .mkt-diff-hero {
          opacity: 1;
          transform: translateX(0);
        }

        .mkt-diff-hero:hover {
          transform: translateY(-4px);
          box-shadow:
            0 40px 96px rgba(15, 23, 42, 0.50),
            0 12px 32px rgba(224, 25, 63, 0.24);
        }

        .mkt-diff-hero-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(224,25,63,0.22), transparent 38%),
            radial-gradient(circle at 20% 80%, rgba(255,77,106,0.14), transparent 30%);
          pointer-events: none;
          animation: mkt-diff-mesh-drift 24s ease-in-out infinite;
        }

        @keyframes mkt-diff-mesh-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-6px, 4px, 0) scale(1.02); }
        }

        /* SUBTLE orb - slower, smaller amplitude */
        .mkt-diff-hero-orb {
          position: absolute;
          top: -120px;
          right: -120px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 77, 106, 0.22), transparent 70%);
          filter: blur(56px);
          pointer-events: none;
          animation: mkt-diff-orb 28s ease-in-out infinite;
        }

        @keyframes mkt-diff-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 8px) scale(1.04); }
        }

        .mkt-diff-hero-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .mkt-diff-hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .mkt-diff-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          padding: 6px 12px;
          margin-bottom: 28px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: -0.005em;
        }

        .mkt-diff-hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF4D6A;
          box-shadow: 0 0 10px rgba(255, 77, 106, 0.80);
          animation: mkt-diff-pulse 2s ease infinite;
        }

        @keyframes mkt-diff-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .mkt-diff-hero-icon-wrap { margin-bottom: 24px; }

        .mkt-diff-hero-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: rgba(224, 25, 63, 0.14);
          border: 1px solid rgba(255, 77, 106, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.20);
        }

        .mkt-diff-hero-title {
          margin: 0 0 16px;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #fff;
        }

        .mkt-diff-hero-body {
          margin: 0 0 32px;
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          letter-spacing: -0.005em;
          max-width: 540px;
        }

        .mkt-diff-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
        }

        .mkt-diff-hero-stat {
          text-align: center;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--stat-delay, 0ms),
            transform 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--stat-delay, 0ms);
        }

        .mkt-diff.is-visible .mkt-diff-hero-stat {
          opacity: 1;
          transform: translateY(0);
        }

        .mkt-diff-hero-stat-val {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.035em;
          color: #fff;
          background: linear-gradient(135deg, #fff 30%, #FCA5B5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums;
        }

        .mkt-diff-hero-stat-label {
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .mkt-diff-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          margin-top: auto;
          padding: 0 22px;
          height: 48px;
          background: rgba(255, 255, 255, 0.10);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 14px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-diff-hero-cta:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.32);
          gap: 10px;
        }

        /* SUPPORTING cards - now buttons (clickable) */
        .mkt-diff-supporting {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .mkt-diff-card {
          position: relative;
          display: flex;
          gap: 18px;
          padding: 24px;
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 20px;
          opacity: 0;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0ms),
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1) var(--card-delay, 0ms),
            background 300ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        /* Different slide-in directions per card */
        .mkt-diff-card-from-right {
          transform: translateX(40px);
        }

        .mkt-diff-card-from-left {
          transform: translateX(-40px);
        }

        .mkt-diff-card-from-center {
          transform: translateY(30px) scale(0.96);
        }

        .mkt-diff.is-visible .mkt-diff-card {
          opacity: 1;
          transform: translateX(0) translateY(0) scale(1);
        }

        .mkt-diff-card:hover {
          background: #fff;
          transform: translateY(-3px);
          border-color: rgba(224, 25, 63, 0.30);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04);
        }

        .mkt-diff-card:hover .mkt-diff-card-icon {
          transform: rotate(-6deg) scale(1.06);
          background: #FECDD3;
        }

        .mkt-diff-card:hover .mkt-diff-card-arrow {
          opacity: 1;
          transform: translate(2px, -2px);
        }

        .mkt-diff-card-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms ease;
        }

        .mkt-diff-card-content {
          flex: 1;
          min-width: 0;
        }

        .mkt-diff-card-title {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.020em;
          color: #0F172A;
        }

        .mkt-diff-card-body {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-diff-card-arrow {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(224, 25, 63, 0.10);
          color: #E0193F;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
          .mkt-diff { padding: 112px 0; }
          .mkt-diff-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-diff-hero { padding: 48px 40px; min-height: 520px; }
          .mkt-diff-hero-title { font-size: 32px; }
          .mkt-diff-card { padding: 28px; }
        }

        @media (min-width: 1024px) {
          .mkt-diff { padding: 128px 0; }
          .mkt-diff-title { font-size: 48px; }

          .mkt-diff-bento {
            grid-template-columns: 1.4fr 1fr;
            gap: 20px;
          }

          .mkt-diff-hero {
            padding: 56px 48px;
            min-height: 600px;
          }

          .mkt-diff-hero-title { font-size: 36px; }
          .mkt-diff-hero-stat-val { font-size: 28px; }
          .mkt-diff-hero-stats { padding: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-diff-hero,
          .mkt-diff-card,
          .mkt-diff-hero-cta,
          .mkt-diff-hero-mesh,
          .mkt-diff-hero-orb,
          .mkt-diff-hero-stat,
          .mkt-diff-hero-badge-dot {
            animation: none;
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
