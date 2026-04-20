import { Star } from 'lucide-react';
import { useScrollAnimation } from './MarketingAnimations';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: 'Vi gik fra 0 til 84 faste støtter på 3 måneder. StøtMedHjerte kører det hele automatisk.',
    name: 'Steen H.',
    title: 'Formand',
    club: 'Big Rock Academy',
  },
  {
    quote: 'Endelig en platform der forstår danske foreninger. Og den er gratis at bruge!',
    name: 'Lars K.',
    title: 'Kassér',
    club: 'Hillerød Svømmeklub',
  },
  {
    quote: 'Vi har aldrig haft så nemt ved at samle penge ind. MobilePay-donationer er en game changer.',
    name: 'Mette J.',
    title: 'Bestyrelsesmedlem',
    club: 'Ålholm Fodbold',
  },
  {
    quote: 'Det tog 5 minutter at komme i gang. Nu har vi faste indtægter hver måned.',
    name: 'Anne L.',
    title: 'Formand',
    club: 'Helsingør Håndbold',
  },
  {
    quote: 'Bogføringen klarer sig selv. Jeg bruger tiden på det vigtige i stedet.',
    name: 'Mikkel T.',
    title: 'Kassér',
    club: 'Roskilde Tennis',
  },
  {
    quote: 'Merchandise-shoppen gav os ekstra indtægt uden besvær. Fantastisk!',
    name: 'Camilla R.',
    title: 'Næstformand',
    club: 'Køge Gymnastik',
  },
];

const donationFeed = [
  { text: 'Sofie M. donerede 500 kr. til Hillerød Svømmeklub', time: '3 min. siden' },
  { text: 'Thomas B. blev fast støtter hos Big Rock Academy', time: '12 min. siden' },
  { text: 'Anne H. købte merchandise for Ålholm Fodbold', time: '28 min. siden' },
];

function TestimonialCard({ quote, name, title, club }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24, minWidth: 320, maxWidth: 360,
      border: '1px solid #EBEBEB', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
        ))}
      </div>
      <p style={{
        fontSize: 15, color: '#374151', lineHeight: 1.65, fontStyle: 'italic',
        margin: '0 0 18px 0',
      }}>"{quote}"</p>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{name}</div>
        <div style={{ fontSize: 13, color: '#9CA3AF' }}>{title}, {club}</div>
      </div>
    </div>
  );
}

function DonationFeedItem({ text, time, delay }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
      borderBottom: '1px solid #F3F4F6', animation: `mkt-feed-in 0.5s ease ${delay}s both`,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0,
        animation: 'mkt-glow 2s ease infinite',
      }} />
      <span style={{ fontSize: 14, color: '#374151', flex: 1 }}>{text}</span>
      <span style={{ fontSize: 12, color: '#9CA3AF', flexShrink: 0 }}>{time}</span>
    </div>
  );
}

export default function SocialProofSection() {
  const anim = useScrollAnimation();
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section style={{
      padding: '100px 0', background: '#F9FAFB',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div ref={anim.ref} style={{ ...anim.style, textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 700, color: '#0F172A',
            margin: '0 0 12px', letterSpacing: '-0.02em',
          }}>Foreninger der allerede er med</h2>
          <p style={{ fontSize: 17, color: '#6B7280', margin: 0 }}>
            Fra lokale fodboldklubber til nationale svømmeklubber
          </p>
        </div>
      </div>

      {/* Auto-scrolling ticker */}
      <div
        style={{ overflow: 'hidden', marginBottom: 56 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{
          display: 'flex', gap: 20,
          animation: 'mkt-ticker 30s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          width: 'max-content',
        }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      {/* Donation feed */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
          Live donationer
        </div>
        {donationFeed.map((d, i) => (
          <DonationFeedItem key={i} {...d} delay={0.2 * i} />
        ))}
      </div>
    </section>
  );
}