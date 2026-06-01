/**
 * LiveDashboardSection.jsx
 *
 * Pixel-spec per BRIEF section 5:
 *   - "Overblik uden regneram" headline
 *   - Real HTML/CSS dashboard (NOT screenshot)
 *   - Light section (white)
 *   - Realistic data: 18.450 kr, fordeling, næste udbetaling 28. juli
 */

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, ArrowUpRight, CheckCircle, Calendar, Heart } from 'lucide-react';

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

export default function LiveDashboardSection() {
  const [ref, inView] = useInView();
  const total = useCountUp(18450, inView);
  const donations = useCountUp(8700, inView);
  const fastStoette = useCountUp(3470, inView);
  const webshop = useCountUp(6280, inView);

  const fmt = (n) => n.toLocaleString('da-DK');

  return (
    <section className="mkt-live" ref={ref}>
      <div className="mkt-live-inner">
        <header className="mkt-live-head">
          <div className="mkt-live-eyebrow">Live dashboard</div>
          <h2 className="mkt-live-title">Overblik uden regneark</h2>
          <p className="mkt-live-subtitle">
            Foreningen kan følge støtte, faste bidrag, webshop-overskud og kommende udbetalinger ét sted.
          </p>
        </header>

        <div className="mkt-live-card">
          <div className="mkt-live-card-head">
            <div>
              <div className="mkt-live-card-eyebrow">Denne måned</div>
              <div className="mkt-live-card-stat">
                {fmt(total)} <em>kr.</em>
              </div>
              <div className="mkt-live-card-trend">
                <TrendingUp size={13} aria-hidden="true" />
                <span>+24% vs. sidste måned</span>
              </div>
            </div>
            <div className="mkt-live-card-pill">
              <span className="mkt-live-card-pill-dot" />
              Live
            </div>
          </div>

          <div className="mkt-live-card-body">
            <div className="mkt-live-card-section">
              <div className="mkt-live-card-section-label">Fordeling</div>
              <div className="mkt-live-card-rows">
                <div className="mkt-live-row">
                  <span className="mkt-live-row-dot" style={{ background: '#E0193F' }} />
                  <div className="mkt-live-row-info">
                    <span className="mkt-live-row-label">Donationer</span>
                    <span className="mkt-live-row-bar-wrap">
                      <span
                        className="mkt-live-row-bar"
                        style={{
                          width: inView ? '47%' : '0%',
                          background: '#E0193F',
                          transitionDelay: '0.2s',
                        }}
                      />
                    </span>
                  </div>
                  <strong>{fmt(donations)} kr.</strong>
                </div>
                <div className="mkt-live-row">
                  <span className="mkt-live-row-dot" style={{ background: '#FF4D6A' }} />
                  <div className="mkt-live-row-info">
                    <span className="mkt-live-row-label">Fast støtte</span>
                    <span className="mkt-live-row-bar-wrap">
                      <span
                        className="mkt-live-row-bar"
                        style={{
                          width: inView ? '19%' : '0%',
                          background: '#FF4D6A',
                          transitionDelay: '0.4s',
                        }}
                      />
                    </span>
                  </div>
                  <strong>{fmt(fastStoette)} kr.</strong>
                </div>
                <div className="mkt-live-row">
                  <span className="mkt-live-row-dot" style={{ background: '#7C3AED' }} />
                  <div className="mkt-live-row-info">
                    <span className="mkt-live-row-label">Webshop</span>
                    <span className="mkt-live-row-bar-wrap">
                      <span
                        className="mkt-live-row-bar"
                        style={{
                          width: inView ? '34%' : '0%',
                          background: '#7C3AED',
                          transitionDelay: '0.6s',
                        }}
                      />
                    </span>
                  </div>
                  <strong>{fmt(webshop)} kr.</strong>
                </div>
              </div>
            </div>

            <div className="mkt-live-card-side">
              <div className="mkt-live-card-side-block">
                <div className="mkt-live-card-side-icon">
                  <Calendar size={16} color="#0891B2" aria-hidden="true" />
                </div>
                <div className="mkt-live-card-side-label">Næste udbetaling</div>
                <div className="mkt-live-card-side-val">28. juli</div>
                <div className="mkt-live-card-side-sub">14.580 kr. klar</div>
              </div>
              <div className="mkt-live-card-side-block">
                <div className="mkt-live-card-side-icon mkt-live-card-side-icon-success">
                  <CheckCircle size={16} color="#16A34A" aria-hidden="true" />
                </div>
                <div className="mkt-live-card-side-label">Status</div>
                <div className="mkt-live-card-side-val">Klar til udbetaling</div>
                <div className="mkt-live-card-side-sub">Verificeret</div>
              </div>
              <div className="mkt-live-card-side-block">
                <div className="mkt-live-card-side-icon mkt-live-card-side-icon-pink">
                  <Heart size={16} color="#E0193F" aria-hidden="true" />
                </div>
                <div className="mkt-live-card-side-label">Faste støtter</div>
                <div className="mkt-live-card-side-val">127</div>
                <div className="mkt-live-card-side-sub">+12 denne måned</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mkt-live {
          background: #F9FAFB;
          padding: 80px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-live-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-live-head {
          text-align: center;
          margin-bottom: 48px;
        }

        .mkt-live-eyebrow {
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

        .mkt-live-title {
          margin: 0 auto 16px;
          max-width: 760px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-live-subtitle {
          margin: 0 auto;
          max-width: 580px;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-live-card {
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 24px;
          box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.04);
          overflow: hidden;
        }

        .mkt-live-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 28px;
          border-bottom: 1px solid #F1F5F9;
        }

        .mkt-live-card-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 8px;
        }

        .mkt-live-card-stat {
          font-size: 40px;
          font-weight: 700;
          letter-spacing: -0.035em;
          color: #0F172A;
          line-height: 1;
          margin-bottom: 6px;
        }

        .mkt-live-card-stat em {
          font-style: normal;
          font-size: 18px;
          font-weight: 500;
          color: #94A3B8;
          margin-left: 4px;
        }

        .mkt-live-card-trend {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: #16A34A;
          letter-spacing: -0.005em;
        }

        .mkt-live-card-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #FEF2F2;
          border: 1px solid rgba(224, 25, 63, 0.20);
          border-radius: 999px;
          color: #E0193F;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: -0.005em;
        }

        .mkt-live-card-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E0193F;
          animation: mkt-live-pulse 2s ease infinite;
        }

        @keyframes mkt-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .mkt-live-card-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }

        .mkt-live-card-section {
          padding: 28px;
          border-bottom: 1px solid #F1F5F9;
        }

        .mkt-live-card-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 18px;
        }

        .mkt-live-card-rows {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mkt-live-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mkt-live-row-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .mkt-live-row-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mkt-live-row-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          letter-spacing: -0.005em;
        }

        .mkt-live-row-bar-wrap {
          width: 100%;
          height: 5px;
          background: #F1F5F9;
          border-radius: 999px;
          overflow: hidden;
        }

        .mkt-live-row-bar {
          display: block;
          height: 100%;
          border-radius: 999px;
          transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-live-row strong {
          font-size: 14.5px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.020em;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
          text-align: right;
          min-width: 88px;
        }

        .mkt-live-card-side {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }

        .mkt-live-card-side-block {
          padding: 24px 28px;
          border-bottom: 1px solid #F1F5F9;
        }

        .mkt-live-card-side-block:last-child {
          border-bottom: none;
        }

        .mkt-live-card-side-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(8, 145, 178, 0.10);
          border: 1px solid rgba(8, 145, 178, 0.20);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .mkt-live-card-side-icon-success {
          background: rgba(22, 163, 74, 0.10);
          border-color: rgba(22, 163, 74, 0.20);
        }

        .mkt-live-card-side-icon-pink {
          background: #FEF2F2;
          border-color: rgba(224, 25, 63, 0.20);
        }

        .mkt-live-card-side-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 4px;
        }

        .mkt-live-card-side-val {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.020em;
          margin-bottom: 2px;
        }

        .mkt-live-card-side-sub {
          font-size: 12.5px;
          color: #64748B;
          letter-spacing: -0.005em;
        }

        @media (min-width: 768px) {
          .mkt-live { padding: 112px 0; }
          .mkt-live-title { font-size: 40px; letter-spacing: -0.035em; }

          .mkt-live-card-body {
            grid-template-columns: 2fr 1fr;
          }

          .mkt-live-card-section {
            border-bottom: none;
            border-right: 1px solid #F1F5F9;
          }

          .mkt-live-card-side {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 1024px) {
          .mkt-live { padding: 128px 0; }
          .mkt-live-title { font-size: 48px; }
          .mkt-live-card-stat { font-size: 56px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-live-row-bar,
          .mkt-live-card-pill-dot {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
