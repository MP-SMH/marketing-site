import { UserPlus, ShieldCheck, Share2, Banknote } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from './MarketingAnimations';

const steps = [
  {
    num: '01', icon: UserPlus,
    title: 'Opret jeres forening',
    desc: '5 minutters registrering. CVR-nummer og kontaktinfo er alt vi behøver.',
  },
  {
    num: '02', icon: ShieldCheck,
    title: 'Vi verificerer jer',
    desc: 'Automatisk MitID og CVR-tjek via Creditro. Ingen papirarbejde.',
  },
  {
    num: '03', icon: Share2,
    title: 'Del jeres side',
    desc: 'Unikke QR-koder, sociale medie-tekster og delingslinks klar med det samme.',
  },
  {
    num: '04', icon: Banknote,
    title: 'Modtag støtte automatisk',
    desc: 'Pengene udbetales automatisk d. 28. hver måned. Direkte til foreningens bankkonto.',
  },
];

function StepCard({ num, icon: Icon, title, desc, delay, isLast }) {
  const anim = useStaggerAnimation(delay);

  return (
    <div ref={anim.ref} style={{
      ...anim.style,
      flex: '1 1 220px', position: 'relative', textAlign: 'center',
      padding: '0 12px',
    }}>
      {/* Connector line (desktop) */}
      {!isLast && (
        <div className="mkt-step-connector" style={{
          position: 'absolute', top: 44, right: -16, width: 32,
          borderTop: '2px dashed #E5E7EB', zIndex: 0,
        }} />
      )}
      <div style={{ position: 'relative', marginBottom: 20, display: 'inline-block' }}>
        <span style={{
          fontSize: 72, fontWeight: 800, color: '#F3F4F6', lineHeight: 1,
          position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
          userSelect: 'none', zIndex: 0,
        }}>{num}</span>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: '#FEF2F2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1, margin: '28px auto 0',
        }}>
          <Icon size={24} color="#E0193F" />
        </div>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0, maxWidth: 240, marginInline: 'auto' }}>{desc}</p>
    </div>
  );
}

export default function HowItWorksSection() {
  const anim = useScrollAnimation();

  return (
    <section id="hvordan" style={{
      padding: '100px 32px', background: '#fff',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 60 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#E0193F',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>KOM I GANG</span>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            margin: '16px 0 12px', letterSpacing: '-0.02em',
          }}>Fra oprettelse til udbetaling på 5 minutter</h2>
          <p style={{ fontSize: 17, color: '#6B7280', margin: 0 }}>
            Vi har gjort det så nemt, at selv den travleste kassér kan sætte det op.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {steps.map((s, i) => (
            <StepCard key={i} {...s} delay={0.1 * (i + 1)} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mkt-step-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}