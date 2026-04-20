import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cols = [
  {
    title: 'Platform',
    links: [
      { label: 'Hjertesager', href: '/hjertesager' },
      { label: 'Foreninger', href: '/foreninger' },
      { label: 'Priser', href: '/priser' },
      { label: 'Sådan virker det', href: '/saadan-virker-det' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'For foreninger',
    links: [
      { label: 'Start gratis', href: '/book-moede' },
      { label: 'Book et møde', href: '/book-moede' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Support', href: '/support' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  {
    title: 'Juridisk',
    links: [
      { label: 'Betingelser', href: '/betingelser' },
      { label: 'Privatlivspolitik', href: '/privatlivspolitik' },
      { label: 'Cookiepolitik', href: '/cookiepolitik' },
    ],
  },
];

function SocialIcon({ label, path }) {
  return (
    <a href="#" aria-label={label} style={{
      width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </a>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{
      background: '#0F172A', padding: '64px 32px 0',
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', gap: 48, flexWrap: 'wrap', paddingBottom: 48,
      }}>
        <div style={{ flex: '1 1 260px', minWidth: 200 }}>
          <div
            onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, cursor: 'pointer' }}
          >
            <Heart size={20} color="#E0193F" fill="#E0193F" />
            <span style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>StøtMedHjerte</span>
          </div>
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: '0 0 20px 0', maxWidth: 240,
          }}>
            Fremtidens fundraising for danske foreninger
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <SocialIcon label="Facebook" path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            <SocialIcon label="LinkedIn" path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            <SocialIcon label="Instagram" path="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z M18.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </div>
        </div>

        {cols.map((col, i) => (
          <div key={i} style={{ flex: '1 1 140px', minWidth: 120 }}>
            <h4 style={{
              fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
              margin: '0 0 16px 0', letterSpacing: '0.01em',
            }}>{col.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((l, j) => (
                <a key={j} href={l.href} onClick={(e) => { e.preventDefault(); navigate(l.href); window.scrollTo(0, 0); }} style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                  transition: 'color 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >{l.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 1200, margin: '0 auto',
        padding: '24px 0',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        fontSize: 13, color: 'rgba(255,255,255,0.35)',
      }}>
        <span>© 2026 Heartland Collective ApS</span>
        <span>Bygget med ❤️ i Hillerød, Danmark</span>
      </div>
    </footer>
  );
}