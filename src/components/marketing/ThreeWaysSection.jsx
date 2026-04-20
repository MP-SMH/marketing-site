import { Heart, RefreshCw, ShoppingBag, Check } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from './MarketingAnimations';

const cards = [
  {
    icon: Heart,
    title: 'Direkte donation',
    desc: 'Støtter donerer via MobilePay, Apple Pay eller Google Pay. Ét swipe, pengene er der.',
    features: ['MobilePay integration', 'Apple Pay og Google Pay', 'Automatisk kvittering', '80% til forening'],
    accent: '#3B82F6',
    visual: 'mobilepay',
  },
  {
    icon: RefreshCw,
    title: 'Fast Støtte',
    desc: 'Månedligt abonnement fra 100 kr. Forudsigeligt, stabilt, automatisk.',
    features: ['Abonnement fra 100 kr./md.', 'Automatisk trækning', 'Supporter kan pause/opsige', '80% til forening'],
    accent: '#8B5CF6',
    visual: 'subscription',
  },
  {
    icon: ShoppingBag,
    title: 'Fanshop merchandise',
    desc: 'Foreningen får deres helt egen webshop. Ingen lageromkostninger, ingen risiko.',
    features: ['Professionelt tøj og merchandise', 'Print-on-demand', 'Ingen lager nødvendigt', '32,75% til forening'],
    accent: '#E0193F',
    visual: 'merch',
  },
];

function MiniVisual({ type }) {
  if (type === 'mobilepay') {
    return (
      <div style={{
        background: '#F0F4FF', borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#5A78FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>MP</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Betal med MobilePay</span>
      </div>
    );
  }
  if (type === 'subscription') {
    return (
      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        {[100, 200, 300, 500].map((v, i) => (
          <div key={v} style={{
            flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 10,
            background: i === 1 ? '#E0193F' : '#F9FAFB',
            color: i === 1 ? '#fff' : '#0F172A',
            fontSize: 14, fontWeight: 700, border: i === 1 ? 'none' : '1px solid #EBEBEB',
          }}>
            {v} kr.
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{
      background: '#F9FAFB', borderRadius: 12, padding: 16, marginTop: 20,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: '#FEF2F2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Heart size={20} color="#E0193F" fill="#E0193F" />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Forenings-merchandise</div>
        <div style={{ fontSize: 12, color: '#9CA3AF' }}>Vis din støtte med stil</div>
      </div>
    </div>
  );
}

function WayCard({ icon: Icon, title, desc, features, accent, visual, delay }) {
  const anim = useStaggerAnimation(delay);

  return (
    <div ref={anim.ref} style={{
      ...anim.style,
      flex: '1 1 300px', background: '#fff', borderRadius: 20, padding: 36,
      border: '1px solid #EBEBEB', borderLeft: `3px solid ${accent}`,
      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `${accent}08`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <Icon size={22} color={accent}
          />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>{title}</h3>
      <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.6, margin: '0 0 20px 0' }}>{desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Check size={16} color="#15803d" />
            <span style={{ fontSize: 14, color: '#374151' }}>{f}</span>
          </div>
        ))}
      </div>
      <MiniVisual type={visual} />
    </div>
  );
}

export default function ThreeWaysSection() {
  const anim = useScrollAnimation();

  return (
    <section id="foreninger" style={{
      padding: '100px 32px', background: '#F9FAFB',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>TRE VEJE TIL STØTTE</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            margin: '16px 0 12px', letterSpacing: '-0.02em',
          }}>Én platform. Tre måder at støtte på.</h2>
          <p style={{ fontSize: 17, color: '#6B7280', margin: 0 }}>
            Hver forening vælger selv deres mix. Alt er automatisk.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {cards.map((c, i) => (
            <WayCard key={i} {...c} delay={0.1 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}