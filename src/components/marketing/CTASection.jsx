import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from './MarketingAnimations';

export default function CTASection() {
  const anim = useScrollAnimation();

  return (
    <section style={{
      padding: '100px 32px',
      background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      textAlign: 'center',
    }}>
      <div ref={anim.ref} style={{
        ...anim.style, maxWidth: 640, margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#fff',
          margin: '0 0 18px', letterSpacing: '-0.02em', lineHeight: 1.2,
        }}>
          Klar til at automatisere jeres fundraising?
        </h2>
        <p style={{
          fontSize: 18, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6,
          margin: '0 0 36px', maxWidth: 500, marginInline: 'auto',
        }}>
          Book et gratis 15-min. møde. Vi viser jer præcis hvordan det virker for jeres forening.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <button style={{
            background: '#fff', border: 'none', color: '#E0193F', borderRadius: 14,
            height: 56, padding: '0 36px', fontSize: 17, fontWeight: 600, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s', fontFamily: 'inherit',
          }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            Book gratis møde <ArrowRight size={18} />
          </button>
          <button style={{
            background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)',
            color: '#fff', borderRadius: 14, height: 56, padding: '0 28px',
            fontSize: 16, fontWeight: 500, cursor: 'pointer',
            transition: 'border-color 0.2s', fontFamily: 'inherit',
          }}
            onMouseEnter={e => e.target.style.borderColor = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
          >
            Eller start selv →
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Ingen binding. Ingen kreditkort. Bare et møde.
        </p>
      </div>
    </section>
  );
}