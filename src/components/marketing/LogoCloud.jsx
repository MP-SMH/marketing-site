import { useScrollAnimation } from './MarketingAnimations';

const logos = ['MobilePay', 'Mollie', 'Creditro', 'Dinero', 'MitID', 'Frisbii'];

export default function LogoCloud() {
  const anim = useScrollAnimation();

  return (
    <section ref={anim.ref} style={{
      ...anim.style,
      borderTop: '1px solid #F3F4F6',
      borderBottom: '1px solid #F3F4F6',
      padding: '40px 32px',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontSize: 13, color: '#9CA3AF', textTransform: 'uppercase',
          letterSpacing: '0.08em', marginBottom: 24, fontWeight: 500,
        }}>
          Sikker infrastruktur du kan stole på
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 24, flexWrap: 'wrap',
        }}>
          {logos.map(name => (
            <div
              key={name}
              style={{
                padding: '8px 20px', borderRadius: 8,
                border: '1px solid #E5E7EB', background: '#FAFAFA',
                fontSize: 13, fontWeight: 600, color: '#9CA3AF',
                letterSpacing: '0.01em', cursor: 'default',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#6B7280';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}