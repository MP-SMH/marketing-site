import { ShieldCheck, Heart, CreditCard, ArrowRight } from 'lucide-react';

export default function InfoSection({ sectionRef, onScrollToList }) {
  return (
    <div ref={sectionRef} id="how-it-works" style={{ padding: '80px 0 60px' }}>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 100,
          background: 'rgba(224,25,63,0.06)',
          border: '1px solid rgba(224,25,63,0.1)',
          fontSize: 11.5, fontWeight: 650, color: '#E0193F',
          marginBottom: 20, letterSpacing: '0.03em',
        }}>
          <Heart size={12} fill="#E0193F" color="#E0193F" />
          Sådan fungerer det
        </div>
        <h2 style={{
          fontSize: 32, fontWeight: 800, color: '#0F172A',
          letterSpacing: '-0.03em', margin: '0 0 12px',
        }}>
          Tre enkle trin
        </h2>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 480, margin: '0 auto' }}>
          Det tager under 2 minutter at blive fast støtter
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        marginBottom: 56,
      }}>
        {[
          {
            step: '01',
            icon: <Heart size={22} color="#E0193F" />,
            title: 'Vælg forening',
            desc: 'Find den forening du vil støtte. Alle foreninger er MitID-verificerede og CVR-godkendte.',
          },
          {
            step: '02',
            icon: <CreditCard size={22} color="#E0193F" />,
            title: 'Vælg beløb',
            desc: 'Fra 100 kr./md. Vælg det beløb der passer dig. 80% går direkte til foreningen.',
          },
          {
            step: '03',
            icon: <ShieldCheck size={22} color="#15803d" />,
            title: 'Færdig',
            desc: 'Din støtte trækkes automatisk hver måned. Ingen binding. Opsig når som helst.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: '#fff', border: '1px solid #EBEBEB',
            borderRadius: 20, padding: '28px 24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: i === 2 ? '#F0FDF4' : 'rgba(224,25,63,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 32, fontWeight: 800, color: '#F3F4F6',
                letterSpacing: '-0.03em',
              }}>{item.step}</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onScrollToList}
          style={{
            padding: '14px 32px',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(224,25,63,0.25)',
            transition: 'all 0.2s',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(224,25,63,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,25,63,0.25)'; }}
        >
          <Heart size={16} fill="#fff" /> Vælg forening <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        @media(max-width: 768px) {
          #how-it-works > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}