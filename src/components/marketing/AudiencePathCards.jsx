/**
 * AudiencePathCards.jsx
 *
 * Component: Marketing-site Home page section 2 — dual path
 * Task:      P2-MARKETING-BUILD-002a Mario reset v3
 * Version:   v3
 * Date:      6. maj 2026
 *
 * Innovation:
 *   - INTERACTIVE path selector (not 2 cards, not split zones)
 *   - Single card with segmented control toggle on top
 *   - Click "Forening" or "Støtter" → content morphs with color transition
 *   - Mimics actual onboarding flow ("choose your role")
 *   - Dynamic icon, headline, body, list, CTA all animated
 *   - Default: forening (primary conversion target)
 */

import { useState } from 'react';
import { Users, Heart, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PATHS = {
  forening: {
    icon: Users,
    color: '#E0193F',
    colorLight: '#FF4D6A',
    colorRgb: '224, 25, 63',
    label: 'Jeg repræsenterer en forening',
    title: 'Modtag støtte uden tung administration',
    body: 'Få en gratis profil, bliv verificeret og lad StøtMedHjerte håndtere bogføring, dokumentation og udbetaling.',
    bullets: [
      { text: 'Gratis at oprette og komme i gang', strong: true },
      { text: '80% af donationer og fast støtte til foreningen', strong: false },
      { text: 'Hjælp til Indsamlingsnævn og §8A SKAT', strong: false },
      { text: 'Verificering på 1-3 hverdage', strong: false },
    ],
    cta: 'Start gratis som forening',
    route: '/opret-forening',
  },
  stoetter: {
    icon: Heart,
    color: '#7C3AED',
    colorLight: '#A78BFA',
    colorRgb: '124, 58, 237',
    label: 'Jeg vil støtte en forening',
    title: 'Find en forening og støt trygt',
    body: 'Verificerede danske foreninger. Klar fordeling. Du kan se hvor pengene går hen — og du vælger selv hvordan du vil støtte.',
    bullets: [
      { text: 'Donation, fast støtte eller webshop-køb', strong: true },
      { text: 'Verificerede danske foreninger', strong: false },
      { text: 'Skatteattester ved §8A-godkendelse', strong: false },
      { text: 'Ingen binding — stop når som helst', strong: false },
    ],
    cta: 'Find en forening at støtte',
    route: '/hjertesager',
  },
};

export default function AudiencePathCards() {
  const navigate = useNavigate();
  const [active, setActive] = useState('forening');
  const path = PATHS[active];
  const Icon = path.icon;

  return (
    <section className="mkt-path">
      <div className="mkt-path-inner">
        <header className="mkt-path-header">
          <div className="mkt-path-eyebrow">Kom i gang</div>
          <h2 className="mkt-path-title">Hvor passer du ind?</h2>
          <p className="mkt-path-subtitle">
            Vælg din rolle, og vi viser dig den rette vej.
          </p>
        </header>

        <div className="mkt-path-segments" role="tablist" aria-label="Vælg rolle">
          <button
            role="tab"
            aria-selected={active === 'forening'}
            className={`mkt-path-segment ${active === 'forening' ? 'is-active' : ''}`}
            onClick={() => setActive('forening')}
          >
            <Users size={15} aria-hidden="true" />
            <span>For foreninger</span>
          </button>
          <button
            role="tab"
            aria-selected={active === 'stoetter'}
            className={`mkt-path-segment mkt-path-segment-purple ${active === 'stoetter' ? 'is-active' : ''}`}
            onClick={() => setActive('stoetter')}
          >
            <Heart size={15} aria-hidden="true" />
            <span>For støttere</span>
          </button>
        </div>

        <article
          className={`mkt-path-card mkt-path-card-${active}`}
          style={{
            '--p-color': path.color,
            '--p-color-light': path.colorLight,
            '--p-color-rgb': path.colorRgb,
          }}
        >
          <div className="mkt-path-card-bg" aria-hidden="true" />
          <div className="mkt-path-card-grid">
            <div className="mkt-path-card-visual">
              <div className="mkt-path-card-icon">
                <Icon size={28} color={path.color} aria-hidden="true" />
              </div>
              <div className="mkt-path-card-label">{path.label}</div>
            </div>
            <div className="mkt-path-card-content">
              <h3 className="mkt-path-card-title">{path.title}</h3>
              <p className="mkt-path-card-body">{path.body}</p>
              <ul className="mkt-path-card-list" role="list">
                {path.bullets.map((b, i) => (
                  <li key={i} className={b.strong ? 'is-strong' : ''}>
                    <Check size={14} aria-hidden="true" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mkt-path-card-cta"
                onClick={() => navigate(path.route)}
              >
                {path.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .mkt-path {
          background: #F8FAFC;
          padding: 72px 0;
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
        }

        .mkt-path-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-path-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .mkt-path-eyebrow {
          display: inline-block;
          padding: 6px 13px;
          margin-bottom: 14px;
          border-radius: 100px;
          background: #fff;
          border: 1px solid #E5E7EB;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .mkt-path-title {
          margin: 0 0 12px;
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #0F172A;
        }

        .mkt-path-subtitle {
          margin: 0;
          font-size: 15px;
          color: #475569;
        }

        /* Segmented control */
        .mkt-path-segments {
          display: inline-flex;
          margin: 0 auto 24px;
          padding: 5px;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 100px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          width: 100%;
          max-width: 440px;
        }

        .mkt-path-segments {
          display: flex;
          margin-left: auto;
          margin-right: auto;
        }

        .mkt-path-segment {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 18px;
          background: transparent;
          border: none;
          border-radius: 100px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          color: #64748B;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-path-segment.is-active {
          background: linear-gradient(135deg, #E0193F 0%, #FF4D6A 100%);
          color: #fff;
          box-shadow: 0 4px 14px rgba(224, 25, 63, 0.30);
        }

        .mkt-path-segment-purple.is-active {
          background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%);
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.30);
        }

        .mkt-path-segment:not(.is-active):hover {
          color: #0F172A;
        }

        /* Card */
        .mkt-path-card {
          position: relative;
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(15, 23, 42, 0.06);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .mkt-path-card-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(var(--p-color-rgb), 0.10), transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(var(--p-color-rgb), 0.05), transparent 60%);
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .mkt-path-card-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding: 32px;
        }

        .mkt-path-card-visual {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-bottom: 20px;
          border-bottom: 1px solid #F1F5F9;
        }

        .mkt-path-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: rgba(var(--p-color-rgb), 0.08);
          border: 1px solid rgba(var(--p-color-rgb), 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.4s ease, border-color 0.4s ease;
        }

        .mkt-path-card-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--p-color);
          transition: color 0.4s ease;
        }

        .mkt-path-card-content {
          animation: mkt-path-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes mkt-path-fade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mkt-path-card-title {
          margin: 0 0 12px;
          font-size: 26px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #0F172A;
        }

        .mkt-path-card-body {
          margin: 0 0 22px;
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
        }

        .mkt-path-card-list {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mkt-path-card-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: #475569;
          line-height: 1.55;
        }

        .mkt-path-card-list li.is-strong {
          font-weight: 700;
          color: #0F172A;
        }

        .mkt-path-card-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--p-color);
          transition: color 0.4s ease;
        }

        .mkt-path-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 54px;
          padding: 0 28px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--p-color) 0%, var(--p-color-light) 100%);
          color: #fff;
          border: none;
          font-size: 15px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(var(--p-color-rgb), 0.30);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.4s ease;
        }

        .mkt-path-card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(var(--p-color-rgb), 0.40);
        }

        @media (min-width: 768px) {
          .mkt-path {
            padding: 96px 0;
          }

          .mkt-path-title {
            font-size: 36px;
          }

          .mkt-path-card-grid {
            grid-template-columns: 220px 1fr;
            gap: 40px;
            padding: 44px;
          }

          .mkt-path-card-visual {
            border-bottom: none;
            border-right: 1px solid #F1F5F9;
            padding-bottom: 0;
            padding-right: 24px;
          }

          .mkt-path-card-title {
            font-size: 30px;
          }

          .mkt-path-card-cta {
            width: auto;
          }
        }

        @media (min-width: 1024px) {
          .mkt-path {
            padding: 120px 0;
          }

          .mkt-path-title {
            font-size: 42px;
            letter-spacing: -0.030em;
          }

          .mkt-path-card-grid {
            grid-template-columns: 260px 1fr;
            gap: 56px;
            padding: 56px;
          }

          .mkt-path-card-icon {
            width: 76px;
            height: 76px;
            border-radius: 22px;
          }

          .mkt-path-card-title {
            font-size: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-path-segment,
          .mkt-path-card,
          .mkt-path-card-bg,
          .mkt-path-card-icon,
          .mkt-path-card-label,
          .mkt-path-card-content,
          .mkt-path-card-cta {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
