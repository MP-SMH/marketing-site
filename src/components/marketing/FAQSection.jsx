/**
 * FAQSection.jsx
 *
 * Pixel-spec per BRIEF section 9:
 *   - Light section
 *   - 6-8 questions
 *   - grid-template-rows trick for smooth expand (no scroll jump)
 *   - max-w-768 reading width for FAQ items
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: 'Hvor meget får foreningen ud af donationer?',
    a: 'Ved donationer går 80% direkte til foreningen. Resten dækker betalingsomkostninger (Mollie), platformen, support og automatiseret bogføring. Ved fast støtte gælder samme 80%/20% fordeling. Webshop afregnes som 32,75% af net profit.',
  },
  {
    q: 'Hvad koster det at starte en forening på StøtMedHjerte?',
    a: 'Det er gratis at oprette en forening og gratis at være på platformen. Der er ingen månedlige gebyrer og ingen binding. Vi tjener kun penge når foreningen modtager støtte (via vores andel af de 80%/20%).',
  },
  {
    q: 'Hvor hurtigt bliver foreningen verificeret?',
    a: 'Verificering tager typisk 1-3 hverdage. Foreningen verificeres via CVR-opslag, MitID-bekræftelse af ansvarlige personer og kontrol af udbetalingsoplysninger. Ved spørgsmål eller manglende oplysninger får I direkte besked.',
  },
  {
    q: 'Hjælper I med Indsamlingsnævnet?',
    a: 'Ja. Vi hjælper med tekstudkast til ansøgningen, holder styr på frister (1.300 kr/år og 12.300 kr/3 år grænserne), og leverer regnskabsgrundlag der opfylder Indsamlingsnævnets krav. Foreningen står stadig som ansvarlig overfor nævnet, men vi gør processen let.',
  },
  {
    q: 'Hvornår får foreningen pengene udbetalt?',
    a: 'Direkte donationer (Mollie) går direkte til foreningens dedikerede indsamlingskonto. Fast støtte og webshop afregnes månedligt via Spar Nord ERH356-betaling den 1. i hver måned, sammen med bogføringsbilag og dokumentation til foreningens revisor.',
  },
  {
    q: 'Hvad sker der hvis foreningen vil stoppe?',
    a: 'I kan til enhver tid stoppe modtagelsen af nye bidrag. Eksisterende fast støtte annulleres automatisk efter 30 dage. Foreningen får alle data og dokumentation eksporteret. Ingen binding, ingen opsigelsesgebyrer.',
  },
  {
    q: 'Er det sikkert at give via StøtMedHjerte?',
    a: 'Ja. Alle betalinger håndteres af Mollie (PCI DSS Level 1 certificeret). Alle foreninger verificeres med MitID + KYC inden de kan modtage støtte. Persondata behandles efter GDPR med klare formål og rettigheder. Hele platformen er bygget i EU (Frankfurt).',
  },
  {
    q: 'Kan støtter være anonyme?',
    a: 'Ved direkte donationer kan støtter vælge at være anonyme overfor foreningen (deres navn vises ikke). Mollie og StøtMedHjerte har stadig identifikation til bogføring og compliance. Ved fast støtte og webshop er anonymitet ikke muligt af regnskabsmæssige grunde.',
  },
];

export default function FAQSection() {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="mkt-faq">
      <div className="mkt-faq-inner">
        <header className="mkt-faq-head">
          <div className="mkt-faq-eyebrow">FAQ</div>
          <h2 className="mkt-faq-title">Spørgsmål I sikkert har</h2>
          <p className="mkt-faq-subtitle">
            De vigtigste afklaringer om økonomi, verificering og udbetaling.
          </p>
        </header>

        <div className="mkt-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`mkt-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="mkt-faq-q"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span>{f.q}</span>
                  <span className="mkt-faq-q-icon">
                    <Plus size={18} aria-hidden="true" />
                  </span>
                </button>
                <div className="mkt-faq-a-wrap">
                  <div className="mkt-faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mkt-faq-foot">
          <p>Flere spørgsmål? Vi svarer gerne.</p>
          <div className="mkt-faq-foot-ctas">
            <button
              className="mkt-faq-foot-cta-primary"
              onClick={() => navigate('/book-moede')}
              type="button"
            >
              Book et gratis møde
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              className="mkt-faq-foot-cta-secondary"
              onClick={() => navigate('/faq')}
              type="button"
            >
              Se hele FAQ
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .mkt-faq {
          background: #F9FAFB;
          padding: 80px 0;
          font-family: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .mkt-faq-inner {
          max-width: 768px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .mkt-faq-head {
          text-align: center;
          margin-bottom: 48px;
        }

        .mkt-faq-eyebrow {
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

        .mkt-faq-title {
          margin: 0 auto 16px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.030em;
          color: #0F172A;
        }

        .mkt-faq-subtitle {
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.55;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 48px;
        }

        .mkt-faq-item {
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 200ms ease, box-shadow 200ms ease;
        }

        .mkt-faq-item.is-open {
          border-color: rgba(224, 25, 63, 0.30);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        }

        .mkt-faq-q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          padding: 20px 22px;
          background: transparent;
          border: none;
          font-family: inherit;
          font-size: 15.5px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: #0F172A;
          text-align: left;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .mkt-faq-q:hover {
          color: #E0193F;
        }

        .mkt-faq-q-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEF2F2;
          color: #E0193F;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-faq-item.is-open .mkt-faq-q-icon {
          transform: rotate(45deg);
        }

        /* grid-template-rows trick: no scroll jump on expand/collapse */
        .mkt-faq-a-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-faq-item.is-open .mkt-faq-a-wrap {
          grid-template-rows: 1fr;
        }

        .mkt-faq-a {
          overflow: hidden;
        }

        .mkt-faq-a p {
          margin: 0;
          padding: 0 22px 22px;
          font-size: 14.5px;
          line-height: 1.65;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-faq-foot {
          text-align: center;
        }

        .mkt-faq-foot p {
          margin: 0 0 20px;
          font-size: 15px;
          color: #475569;
          letter-spacing: -0.005em;
        }

        .mkt-faq-foot-ctas {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .mkt-faq-foot-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 52px;
          padding: 0 24px;
          background: #E0193F;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(224, 25, 63, 0.22);
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mkt-faq-foot-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(224, 25, 63, 0.30);
        }

        .mkt-faq-foot-cta-primary:active {
          transform: scale(0.99);
        }

        .mkt-faq-foot-cta-secondary {
          background: transparent;
          border: none;
          color: #E0193F;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.005em;
          cursor: pointer;
          padding: 8px 16px;
        }

        .mkt-faq-foot-cta-secondary:hover {
          text-decoration: underline;
        }

        @media (min-width: 768px) {
          .mkt-faq { padding: 112px 0; }
          .mkt-faq-title { font-size: 40px; letter-spacing: -0.035em; }
          .mkt-faq-q { padding: 24px 28px; font-size: 16.5px; }
          .mkt-faq-a p { padding: 0 28px 26px; font-size: 15px; }
          .mkt-faq-foot-ctas { flex-direction: row; }
        }

        @media (min-width: 1024px) {
          .mkt-faq { padding: 128px 0; }
          .mkt-faq-title { font-size: 48px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mkt-faq-item,
          .mkt-faq-q-icon,
          .mkt-faq-a-wrap,
          .mkt-faq-foot-cta-primary {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
