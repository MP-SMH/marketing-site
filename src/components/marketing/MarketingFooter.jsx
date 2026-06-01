/**
 * MarketingFooter.jsx (v6)
 *
 * Per Mario feedback: footer for mørk i v5.
 * v6: light footer (#F8FAFC) for mindre kontrast med dark final CTA.
 * Logo: ren tekst Elza Round + ™ uden heart-icon.
 */

import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Platform',
    links: [
      { label: 'For foreninger', route: '/foreninger' },
      { label: 'For støttere', route: '/hjertesager' },
      { label: 'Sådan virker det', route: '/saadan-virker-det' },
      { label: 'Priser', route: '/priser' },
      { label: 'Sikkerhed', route: '/sikkerhed' },
    ],
  },
  {
    label: 'Foreninger',
    links: [
      { label: 'Opret forening', route: '/opret-forening' },
      { label: 'Log ind', route: '/login-forening' },
      { label: 'Book et møde', route: '/book-moede' },
      { label: 'Support', route: '/support' },
    ],
  },
  {
    label: 'Støttere',
    links: [
      { label: 'Find forening', route: '/hjertesager' },
      { label: 'Bliv fast støtter', route: '/fast-stoette' },
      { label: 'Opret konto', route: '/opret-stoetter' },
      { label: 'Log ind', route: '/login-stoetter' },
    ],
  },
  {
    label: 'Virksomhed',
    links: [
      { label: 'Om os', route: '/om-os' },
      { label: 'Blog', route: '/blog' },
      { label: 'FAQ', route: '/faq' },
      { label: 'Kontakt', route: '/kontakt' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Betingelser', route: '/betingelser' },
  { label: 'Privatlivspolitik', route: '/privatlivspolitik' },
  { label: 'Cookiepolitik', route: '/cookiepolitik' },
];

export default function MarketingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="mkt-foot">
      <div className="mkt-foot-inner">
        <div className="mkt-foot-grid">
          <div className="mkt-foot-brand">
            <button
              className="mkt-foot-logo"
              onClick={() => navigate('/')}
              type="button"
              aria-label="StøtMedHjerte forside"
            >
              <span className="mkt-foot-logo-text">
                StøtMedHjerte<sup className="mkt-foot-logo-tm">™</sup>
              </span>
            </button>
            <p className="mkt-foot-blurb">
              Verificeret fundraising for danske foreninger.
              80% til foreningen ved donationer og fast støtte.
            </p>
            <div className="mkt-foot-meta">
              <a href="mailto:hej@stotmedhjerte.dk" className="mkt-foot-meta-link">
                <Mail size={14} aria-hidden="true" />
                <span>hej@stotmedhjerte.dk</span>
              </a>
              <span className="mkt-foot-meta-link">
                <MapPin size={14} aria-hidden="true" />
                <span>Hillerød, Danmark</span>
              </span>
            </div>
          </div>

          {NAV_GROUPS.map((group) => (
            <nav key={group.label} className="mkt-foot-nav" aria-label={group.label}>
              <div className="mkt-foot-nav-label">{group.label}</div>
              <ul className="mkt-foot-nav-list" role="list">
                {group.links.map((link) => (
                  <li key={link.route}>
                    <button
                      onClick={() => navigate(link.route)}
                      type="button"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mkt-foot-bottom">
          <p className="mkt-foot-copy">
            &copy; 2026 Heartland Collective ApS &middot; CVR 36909722
          </p>
          <ul className="mkt-foot-legal" role="list">
            {LEGAL_LINKS.map((link) => (
              <li key={link.route}>
                <button
                  onClick={() => navigate(link.route)}
                  type="button"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .mkt-foot {
          background: #F8FAFC;
          color: #475569;
          padding: 64px 0 32px;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          border-top: 1px solid #E5E7EB;
        }

        .mkt-foot-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-foot-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 28px;
        }

        .mkt-foot-brand {
          max-width: 360px;
        }

        .mkt-foot-logo {
          display: inline-flex;
          align-items: center;
          background: transparent;
          border: none;
          padding: 0;
          margin-bottom: 16px;
          cursor: pointer;
        }

        .mkt-foot-logo-text {
          font-family: 'Elza Round Variable', 'Elza Round', system-ui, -apple-system, 'Segoe UI', sans-serif;
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: #0F172A;
          white-space: nowrap;
          position: relative;
        }

        .mkt-foot-logo-tm {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0;
          margin-left: 2px;
          color: #94A3B8;
          vertical-align: super;
          line-height: 0;
        }

        .mkt-foot-blurb {
          margin: 0 0 20px;
          font-size: 14px;
          line-height: 1.6;
          color: #64748B;
          letter-spacing: -0.005em;
        }

        .mkt-foot-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mkt-foot-meta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #64748B;
          letter-spacing: -0.005em;
          text-decoration: none;
        }

        a.mkt-foot-meta-link:hover {
          color: #E0193F;
        }

        .mkt-foot-nav-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 16px;
        }

        .mkt-foot-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mkt-foot-nav-list button {
          background: transparent;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: 13.5px;
          color: #475569;
          letter-spacing: -0.005em;
          text-align: left;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .mkt-foot-nav-list button:hover {
          color: #E0193F;
        }

        .mkt-foot-bottom {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-start;
        }

        .mkt-foot-copy {
          margin: 0;
          font-size: 12.5px;
          color: #94A3B8;
          letter-spacing: -0.005em;
        }

        .mkt-foot-legal {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
        }

        .mkt-foot-legal button {
          background: transparent;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: 12.5px;
          color: #64748B;
          letter-spacing: -0.005em;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .mkt-foot-legal button:hover {
          color: #E0193F;
        }

        @media (min-width: 640px) {
          .mkt-foot-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .mkt-foot {
            padding: 80px 0 40px;
          }

          .mkt-foot-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
            gap: 48px;
          }

          .mkt-foot-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
