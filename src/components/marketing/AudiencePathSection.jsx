/**
 * AudiencePathSection.jsx (v7)
 *
 * Per wireframe-home v1.1 sektion 2: For hvem? (audience-split)
 *
 * v7 changes:
 *   - SCROLL-TRIGGERED reveals (IntersectionObserver)
 *   - Mirroring slide-in (left card from left, right card from right)
 *   - Stagger på bullets list
 *   - Standardiseret padding
 */

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, ArrowRight, Check } from 'lucide-react';

const PATHS = [
  {
    icon: Users,
    audience: 'For foreninger',
    title: 'I vil samle støtte ind, uden tunge processer',
    body: 'I tilmelder jer, vælger jeres støttekanaler og deler jeres link. Vi hjælper med tekstudkast til Indsamlingsnævnet, betalingsflow, regnskabsgrundlag og dokumentation, så I kan fokusere på foreningen.',
    bullets: [
      '80% til foreningen ved donationer og fast støtte',
      'Hjælp til Indsamlingsnævnet: tekstudkast, frister og regnskabsgrundlag',
      'Gratis at oprette, ingen binding',
    ],
    primaryCta: 'Læs mere for foreninger',
    primaryRoute: '/foreninger',
    secondaryCta: 'Book et gratis møde',
    secondaryRoute: '/book-moede',
    tertiaryCta: 'Se priser og fordeling',
    tertiaryRoute: '/priser',
    side: 'left',
  },
  {
    icon: Heart,
    audience: 'For støttere',
    title: 'Du vil støtte en forening, gennemsigtigt',
    body: 'Find en forening eller hjertesag, vælg hvordan du vil støtte, og giv. Du får kvittering, fuld kontrol og et overblik over al din støtte ét sted.',
    bullets: [
      '80% til foreningen ved donationer og fast støtte',
      'Verificerede danske foreninger',
      'Stop fast støtte når som helst',
    ],
    primaryCta: 'Find en forening at støtte',
    primaryRoute: '/hjertesager',
    secondaryCta: 'Bliv fast støtter',
    secondaryRoute: '/fast-stoette',
    tertiaryCta: null,
    tertiaryRoute: null,
    side: 'right',
  },
];

export default function AudiencePathSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -80px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`mkt-aud ${isVisible ? 'is-visible' : ''}`}>
      <div className="mkt-aud-inner">
        <header className="mkt-aud-head">
          <div className="mkt-aud-eyebrow">For hvem?</div>
          <h2 className="mkt-aud-title">
            For foreninger og for dem der vil støtte dem
          </h2>
          <p className="mkt-aud-subtitle">
            StøtMedHjerte er bygget til to målgrupper med forskellige behov.
          </p>
        </header>

        <div className="mkt-aud-grid">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={i}
                className={`mkt-aud-card mkt-aud-card-${p.side}`}
              >
                <div className="mkt-aud-card-icon">
                  <Icon size={22} color="#E0193F" aria-hidden="true" />
                </div>
                <div className="mkt-aud-card-eyebrow">{p.audience}</div>
                <h3 className="mkt-aud-card-title">{p.title}</h3>
                <p className="mkt-aud-card-body">{p.body}</p>
                <ul className="mkt-aud-card-list" role="list">
                  {p.bullets.map((b, bi) => (
                    <li key={bi} style={{ '--bullet-delay': `${300 + bi * 80}ms` }}>
                      <div className="mkt-aud-card-list-icon">
                        <Check size={12} color="#16A34A" aria-hidden="true" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mkt-aud-card-ctas">
                  <button
                    className="mkt-aud-card-cta-primary"
                    onClick={() => navigate(p.primaryRoute)}
                    type="button"
                  >
                    <span>{p.primaryCta}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <button
                    className="mkt-aud-card-cta-secondary"
                    onClick={() => navigate(p.secondaryRoute)}
                    type="button"
                  >
                    {p.secondaryCta}
                  </button>
                  {p.tertiaryCta && (
                    <button
                      className="mkt-aud-card-cta-tertiary"
                      onClick={() => navigate(p.tertiaryRoute)}
                      type="button"
                    >
                      {p.tertiaryCta}
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .mkt-aud {
          position: relative;
          background: #fff;
          padding: 96px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-aud-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-aud-head {
          text-align: center;
          margin-bottom: 56px;
        }

        .mkt-aud-eyebrow {
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

        .mkt-aud-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-aud-subtitle {
          margin: 0 auto;
          max-width: 580px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-aud-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .mkt-aud-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          padding: 32px;
          opacity: 0;
          transition:
            opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 800ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        }

        .mkt-aud-card-left {
          transform: translateX(-40px);
        }

        .mkt-aud-card-right {
          transform: translateX(40px);
        }

        .mkt-aud.is-visible .mkt-aud-card {
          opacity: 1;
          transform: translateX(0);
        }

        .mkt-aud-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 56px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04);
          border-color: rgba(224, 25, 63, 0.20);
        }

        .mkt-aud-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-aud-card:hover .mkt-aud-card-icon {
          transform: rotate(-6deg) scale(1.06);
        }

        .mkt-aud-card-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #E0193F;
          margin-bottom: 12px;
        }

        .mkt-aud-card-title {
          margin: 0 0 14px;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-aud-card-body {
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-aud-card-list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mkt-aud-card-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #334155;
          line-height: 1.5;
          letter-spacing: -0.005em;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--bullet-delay, 0ms),
            transform 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--bullet-delay, 0ms);
        }

        .mkt-aud.is-visible .mkt-aud-card-list li {
          opacity: 1;
          transform: translateY(0);
        }

        .mkt-aud-card-list-icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(22, 163, 74, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .mkt-aud-card-ctas {
          margin-top: auto;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mkt-aud-card-cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 52px;
          padding: 0 24px;
          background: linear-gradient(135deg, #E0193F 0%, #C8112F 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.20);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .mkt-aud-card-cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.20), transparent);
          transition: left 600ms ease;
        }

        .mkt-aud-card-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(224, 25, 63, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }

        .mkt-aud-card-cta-primary:hover::before {
          left: 100%;
        }

        .mkt-aud-card-cta-primary:hover svg {
          transform: translateX(4px);
        }

        .mkt-aud-card-cta-primary svg {
          transition: transform 300ms ease;
        }

        .mkt-aud-card-cta-primary:active {
          transform: scale(0.99);
        }

        .mkt-aud-card-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 48px;
          padding: 0 24px;
          background: #fff;
          color: #E0193F;
          border: 1.5px solid rgba(224, 25, 63, 0.30);
          border-radius: 14px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-aud-card-cta-secondary:hover {
          background: #FEF2F2;
          border-color: #E0193F;
          transform: translateY(-2px);
        }

        .mkt-aud-card-cta-secondary:active {
          transform: scale(0.99);
        }

        .mkt-aud-card-cta-tertiary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 0;
          background: transparent;
          color: #64748B;
          border: none;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: color 200ms ease, gap 200ms ease;
        }

        .mkt-aud-card-cta-tertiary:hover {
          color: #E0193F;
          gap: 10px;
        }

        @media (min-width: 768px) {
          .mkt-aud { padding: 112px 0; }
          .mkt-aud-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-aud-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .mkt-aud-card { padding: 40px; }
          .mkt-aud-card-title { font-size: 26px; }
        }

        @media (min-width: 1024px) {
          .mkt-aud { padding: 128px 0; }
          .mkt-aud-title { font-size: 48px; }
          .mkt-aud-card-title { font-size: 28px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-aud-card,
          .mkt-aud-card-list li,
          .mkt-aud-card-cta-primary,
          .mkt-aud-card-cta-secondary,
          .mkt-aud-card-cta-tertiary {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
