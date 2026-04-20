import { Clock, AlertTriangle, TrendingDown } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from './MarketingAnimations';

const problems = [
  {
    icon: Clock,
    title: 'Tidskrævende bogføring',
    desc: 'Regneark, bankoverførsler og manuelle afstemninger hver måned.',
  },
  {
    icon: AlertTriangle,
    title: 'Lovgivningsjunglen',
    desc: 'Indsamlingsnævnet, GDPR, CVR-regler. Hvem har overblikket?',
  },
  {
    icon: TrendingDown,
    title: 'Tabte donationer',
    desc: 'Kontanter ved kampen, glemte MobilePay-links og ingen opfølgning.',
  },
];

function ProblemCard({ icon: Icon, title, desc, delay }) {
  const anim = useStaggerAnimation(delay);

  return (
    <div ref={anim.ref} style={{
      ...anim.style,
      flex: '1 1 280px', background: '#fff', borderRadius: 16,
      border: '1px solid #EBEBEB', padding: 32, cursor: 'default',
      transition: 'box-shadow 0.3s, transform 0.3s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: '#FEF2F2',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <Icon size={24} color="#E0193F" />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>{title}</h3>
      <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{desc}</p>
    </div>
  );
}

export default function ProblemSection() {
  const anim = useScrollAnimation();

  return (
    <section id="hjertesager" style={{
      padding: '100px 32px', background: '#fff',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>UDFORDRINGEN</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            maxWidth: 700, margin: '16px auto 16px', letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Du blev frivillig for at gøre en forskel. Ikke for at drukne i administration.
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Kasséreren bruger 10+ timer om måneden. Lovgivningen ændrer sig. Og pengene forsvinder i kontanter og Swipp.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {problems.map((p, i) => (
            <ProblemCard key={i} {...p} delay={0.1 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}