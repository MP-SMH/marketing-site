import { useState } from 'react';
import Navbar from '../components/marketing/Navbar';
import Footer from '../components/marketing/Footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Er det gratis for foreninger?', a: 'Ja. Det koster ingenting at oprette sig og bruge platformen. Vi tjener kun når foreningen tjener. Se den præcise fordeling under "Hvor meget går til foreningen?"' },
  { q: 'Hvordan modtager foreningen pengene?', a: 'Afregning sker d. 1. hver måned. Udbetaling overføres 1-3 bankdage efter direkte til foreningens bankkonto.' },
  { q: 'Er det lovligt?', a: 'Ja. Alle foreninger verificeres med MitID og CVR. Vi genererer automatisk indsamlingsregnskab til Indsamlingsnævnet.' },
  { q: 'Hvilke betalingsmetoder understøttes?', a: 'Støtter kan betale med MobilePay, Apple Pay, Google Pay og betalingskort (Visa/Mastercard).' },
  { q: 'Hvor meget går til foreningen?', a: 'Ved donationer og abonnementer går 80% til foreningen og 20% til StøtMedHjerte. Ved merchandise går 32,75% af nettoprofitten til foreningen.' },
  { q: 'Kan støtter være anonyme?', a: 'Ja. Støtter kan vælge at donere anonymt, så deres navn ikke vises offentligt på hjertesagen.' },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #F3F4F6' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 16, fontWeight: 600, color: '#0F172A', textAlign: 'left', fontFamily: 'inherit',
      }}>
        {faq.q}
        <ChevronDown size={18} color="#9CA3AF" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, marginLeft: 16 }} />
      </button>
      {open && (
        <div style={{ paddingBottom: 20, fontSize: 15, color: '#6B7280', lineHeight: 1.7 }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '120px 32px 60px', textAlign: 'center',
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          Ofte stillede spørgsmål
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Alt hvad du har brug for at vide
        </p>
      </div>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px' }}>
        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
      </div>
      <Footer />
    </div>
  );
}