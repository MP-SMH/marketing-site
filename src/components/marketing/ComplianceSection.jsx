import { Check, ShieldCheck, Lock } from 'lucide-react';
import { useScrollAnimation } from './MarketingAnimations';

const checks = [
  'Automatisk indsamlingsregnskab til Indsamlingsnævnet',
  'Automatisk MitID og CVR-verificering',
  'GDPR-compliant databehandling',
  'Sikre betalinger (PCI DSS Level 1)',
  'Automatisk bogføring og afstemning',
  'Månedlig udbetaling direkte til dansk bankkonto',
];

const badges = [
  { color: '#15803d', bgColor: '#F0FDF4', icon: '🛡️', label: 'KYC Verificering', status: 'Verificeret' },
  { color: '#1D4ED8', bgColor: '#EFF6FF', icon: '🔵', label: 'Indsamlingsnævnet', status: 'Godkendt' },
  { color: '#7C3AED', bgColor: '#F5F3FF', icon: '🔒', label: 'Betalingssikkerhed', status: 'Aktiv' },
  { color: '#15803d', bgColor: '#F0FDF4', icon: '✓', label: 'GDPR', status: 'Compliant' },
];

export default function ComplianceSection() {
  const anim = useScrollAnimation();

  return (
    <section style={{
      padding: '100px 32px', background: '#F9FAFB',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>SIKKERHED OG COMPLIANCE</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            margin: '16px 0 0', letterSpacing: '-0.02em',
          }}>100% lovlig indsamling. Garanteret.</h2>
        </div>

        <div style={{
          display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start',
        }}>
          {/* Left - text */}
          <div style={{ flex: '1 1 400px', minWidth: 280 }}>
            <p style={{
              fontSize: 18, fontWeight: 600, color: '#0F172A', margin: '0 0 28px 0', lineHeight: 1.5,
            }}>
              Vi tager det juridiske, så I kan fokusere på det vigtige.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, background: '#DCFCE7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                  }}>
                    <Check size={14} color="#15803d" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 15, color: '#374151', lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - visual */}
          <div style={{ flex: '1 1 360px', minWidth: 280 }}>
            <div style={{
              background: '#fff', borderRadius: 20, padding: 28,
              border: '1px solid #EBEBEB', boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase',
                letterSpacing: '0.06em', marginBottom: 20,
              }}>
                Compliance Status
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {badges.map((b, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    background: b.bgColor, borderRadius: 12,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', background: b.color,
                      flexShrink: 0, animation: 'mkt-glow 2s ease infinite',
                    }} />
                    <span style={{ fontSize: 14, color: '#374151', flex: 1 }}>{b.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: b.color }}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}