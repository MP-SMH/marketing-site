import { Heart, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from './MarketingAnimations';

const rows = [
  { icon: Heart, type: 'Donation', left: '80% til forening', right: '20% til StøtMedHjerte' },
  { icon: RefreshCw, type: 'Fast Støtte', left: '80% til forening', right: '20% til StøtMedHjerte' },
  { icon: ShoppingBag, type: 'Merchandise', left: '32,75% af overskud til forening', right: '67,25% til StøtMedHjerte' },
];

export default function PricingSection() {
  const anim = useScrollAnimation();
  const navigate = useNavigate();

  return (
    <section id="priser" style={{
      padding: '100px 32px', background: '#fff',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>PRISER</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            margin: '16px 0 12px', letterSpacing: '-0.02em',
          }}>Gennemsigtigt. Ingen skjulte gebyrer.</h2>
          <p style={{ fontSize: 17, color: '#6B7280', margin: 0 }}>
            Vi tjener kun når I tjener. Og vi fortæller jer præcis hvad det koster.
          </p>
        </div>

        {/* Pricing card */}
        <div style={{
          maxWidth: 800, margin: '0 auto', borderRadius: 20,
          border: '1px solid #EBEBEB', overflow: 'hidden',
        }}>
          <div style={{ padding: 40 }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>
              Gratis for foreninger
            </h3>
            <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>
              Ingen oprettelse. Ingen binding. Ingen månedlige gebyrer.
            </p>
          </div>

          <div style={{ padding: '0 40px' }}>
            {rows.map((r, i) => {
              const RowIcon = r.icon;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', padding: '20px 0',
                  borderTop: '1px solid #F3F4F6', gap: 16, flexWrap: 'wrap',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: '#FEF2F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <RowIcon size={18} color="#E0193F" />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', flex: '1 1 120px', minWidth: 100 }}>
                    {r.type}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#15803d', flex: '1 1 150px', minWidth: 120 }}>
                    {r.left}
                  </span>
                  <span style={{ fontSize: 14, color: '#9CA3AF', flex: '1 1 150px', minWidth: 120, textAlign: 'right' }}>
                    {r.right}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{
            background: '#F9FAFB', padding: '20px 40px',
            borderTop: '1px solid #F3F4F6',
          }}>
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, lineHeight: 1.6 }}>
              Lave betalingsgebyrer. Ingen skjulte omkostninger. Se alle detaljer under Priser.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button style={{
            background: '#E0193F', border: 'none', color: '#fff', borderRadius: 14,
            height: 52, padding: '0 36px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 20px rgba(224,25,63,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s', fontFamily: 'inherit',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; }}
            onClick={() => navigate('/opret-forening')}
          >
            Start gratis <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}