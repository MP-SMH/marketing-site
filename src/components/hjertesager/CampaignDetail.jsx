import React from 'react';
import { ArrowLeft, ShieldCheck, ExternalLink, Heart, ChevronLeft, ChevronRight, Link as LinkIcon, Facebook, Linkedin, Star, X, ShoppingBag, Share2, Copy } from 'lucide-react';

function useCountUp(target, duration = 1200) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (target <= 0) return;
    const startTime = performance.now();
    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

const CATEGORY_COLORS = {
  'Fodbold': '#16a34a',
  'Gymnastik': '#7c3aed',
  'Håndbold': '#ea580c',
  'Svømmeklub': '#0284c7',
  'Kampsport': '#dc2626',
  'Handicap / Special': '#0891b2',
};

function getCatColor(type) {
  return CATEGORY_COLORS[type] || '#6B7280';
}

function formatDKK(n) {
  return n.toLocaleString('da-DK');
}

const LABEL_STYLE = {
  fontSize: 10,
  fontWeight: 600,
  color: '#9CA3AF',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 10,
};

const VERIFIED_BADGE = (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: 100,
    background: 'linear-gradient(135deg, #E7F0FE 0%, #D4E4FC 100%)',
    border: '1px solid #93B8F5',
    fontSize: 10, fontWeight: 700, color: '#1877F2',
    boxShadow: '0 1px 3px rgba(24,119,242,0.1)',
  }}>
    <ShieldCheck size={9} style={{ strokeWidth: 2.5 }} /> Verificeret
  </span>
);

const DIVIDER = (
  <div style={{ borderTop: '1px solid #F3F4F6', marginTop: 28, marginBottom: 28 }} />
);

const SHARE_ICONS = [
  { bg: '#6B7280', icon: <LinkIcon size={18} color="#fff" /> },
  { bg: '#1877F2', icon: <Facebook size={20} color="#fff" /> },
  {
    bg: '#25D366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  { bg: '#0A66C2', icon: <Linkedin size={20} color="#fff" /> },
];

function nudgeText(pct) {
  if (pct >= 75) return 'Næsten i mål - din støtte kan gøre forskellen!';
  if (pct >= 50) return 'Halvvejs - hjælp dem over målstregen';
  return 'Hver støtte tæller - vær med til at gøre en forskel';
}

export default function CampaignDetail({ campaign, onBack, onDonate }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showSupportersModal, setShowSupportersModal] = React.useState(false);
  const [modalTab, setModalTab] = React.useState('newest');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let el = document.querySelector('.hjerte-detail-right');
    if (el) {
      let parent = el.parentElement;
      while (parent && parent !== document.body && parent !== document.documentElement) {
        parent.style.setProperty('overflow', 'visible', 'important');
        parent.style.setProperty('overflow-x', 'visible', 'important');
        parent.style.setProperty('overflow-y', 'visible', 'important');
        parent = parent.parentElement;
      }
    }
    return () => {
      let el2 = document.querySelector('.hjerte-detail-right');
      if (el2) {
        let parent = el2.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
          parent.style.removeProperty('overflow');
          parent.style.removeProperty('overflow-x');
          parent.style.removeProperty('overflow-y');
          parent = parent.parentElement;
        }
      }
    };
  }, []);

  const catColor = getCatColor(campaign.type);
  const initial = campaign.association.charAt(0).toUpperCase();
  const pct = Math.round((campaign.raised / campaign.goal) * 100);
  const animatedRaised = useCountUp(campaign.raised, 1400);
  const animatedGoal = useCountUp(campaign.goal, 1400);
  const animatedPct = useCountUp(pct, 1000);

  const images = campaign.images && campaign.images.length > 0
    ? campaign.images
    : [campaign.image].filter(Boolean);
  const hasMultipleImages = images.length > 1;

  const comments = [
    { name: "Mette J.", amount: 100, time: "12 min.", comment: "Fantastisk initiativ! Vi hepper på jer hele vejen." },
    { name: "Lars K.", amount: 100, time: "3 timer", comment: "Godt gået - det her fortjener I!" },
    { name: "Sofie M.", amount: 500, time: "1 dag", comment: "Kender foreningen godt. De gør et kæmpe arbejde for børnene." },
    { name: "Thomas B.", amount: 100, time: "2 dage", comment: "Lille bidrag herfra. Held og lykke!" },
  ];

  const supporters = [
    { name: "Mette J.", amount: 100, time: "12 min. siden", type: "recent", source: "merchandise" },
    { name: "Anonym", amount: 200, time: "1 time siden", type: "top", source: "donation" },
    { name: "Lars K.", amount: 100, time: "3 timer siden", type: "recent", source: "merchandise" },
    { name: "Sofie M.", amount: 500, time: "1 dag siden", type: "top", source: "donation" },
  ];

  const allSupporters = [
    { name: "Mette J.", amount: 100, time: "12 min. siden", type: "recent", source: "merchandise" },
    { name: "Anonym", amount: 200, time: "1 time siden", type: "top", source: "donation" },
    { name: "Lars K.", amount: 100, time: "3 timer siden", type: "recent", source: "merchandise" },
    { name: "Sofie M.", amount: 500, time: "1 dag siden", type: "top", source: "donation" },
    { name: "Thomas B.", amount: 100, time: "2 dage siden", type: "recent", source: "merchandise" },
    { name: "Anne H.", amount: 300, time: "3 dage siden", type: "top", source: "donation" },
    { name: "Anonym", amount: 150, time: "4 dage siden", type: "recent", source: "merchandise" },
    { name: "Peter S.", amount: 100, time: "5 dage siden", type: "recent", source: "merchandise" },
    { name: "Camilla R.", amount: 250, time: "6 dage siden", type: "top", source: "donation" },
    { name: "Jesper M.", amount: 100, time: "1 uge siden", type: "recent", source: "merchandise" },
    { name: "Anonym", amount: 100, time: "1 uge siden", type: "recent", source: "donation" },
    { name: "Karen L.", amount: 400, time: "2 uger siden", type: "top", source: "merchandise" },
  ];

  const modalSupporters = modalTab === 'top'
    ? [...allSupporters].sort((a, b) => b.amount - a.amount)
    : allSupporters;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const circumference = 2 * Math.PI * 33;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(navigator.userAgent);

  const PaymentIcons = ({ size = 'normal' }) => {
    const h = size === 'small' ? 16 : 20;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: size === 'small' ? 6 : 8, marginLeft: size === 'small' ? 4 : 8 }}>
        <span style={{ height: h, display: 'inline-flex', alignItems: 'center', opacity: 0.9 }}>
          <svg height={h} viewBox="0 0 60 38" fill="none">
            <rect width="60" height="38" rx="6" fill="#5A78FF"/>
            <text x="30" y="23" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="system-ui">MobilePay</text>
          </svg>
        </span>
        {isIOS && (
          <span style={{ height: h, display: 'inline-flex', alignItems: 'center', opacity: 0.9 }}>
            <svg height={h} viewBox="0 0 50 38" fill="none">
              <rect width="50" height="38" rx="6" fill="#000"/>
              <text x="25" y="23" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600" fontFamily="system-ui"> Pay</text>
            </svg>
          </span>
        )}
        {isAndroid && (
          <span style={{ height: h, display: 'inline-flex', alignItems: 'center', opacity: 0.9 }}>
            <svg height={h} viewBox="0 0 50 38" fill="none">
              <rect width="50" height="38" rx="6" fill="#fff" stroke="#DADCE0"/>
              <text x="25" y="23" textAnchor="middle" fill="#3C4043" fontSize="10" fontWeight="600" fontFamily="system-ui">G Pay</text>
            </svg>
          </span>
        )}
        {!isIOS && !isAndroid && (
          <span style={{ height: h, display: 'inline-flex', alignItems: 'center', opacity: 0.9 }}>
            <svg height={h} viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="6" fill="#F3F4F6"/>
              <rect x="9" y="10" width="20" height="14" rx="2.5" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
              <rect x="9" y="14" width="20" height="3" fill="#6B7280"/>
            </svg>
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      className="hjerte-fade-in"
      style={{
        minHeight: '100vh',
        background: '#FAFAFA',
        fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif",
      }}
    >
      {/* Tilbage-knap */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 20px 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', color: '#6B7280',
            fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '8px 0',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E0193F'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; }}
        >
          <ArrowLeft size={16} /> Tilbage til hjertesager
        </button>
      </div>

      {/* To-kolonne layout */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 40,
        }}
        className="hjerte-detail-columns"
      >
        {/* Venstre kolonne */}
        <div className="hjerte-detail-left hjerte-scale-in">

          {/* Kampagne-heading */}
          <h2 style={{
            fontSize: 32, fontWeight: 800, color: '#0F172A',
            lineHeight: 1.15, margin: '16px 0 12px', letterSpacing: '-0.03em',
          }}>
            {campaign.title}
          </h2>

          {/* Kategori + lokation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: catColor, fontWeight: 650, opacity: 0.85,
              background: `linear-gradient(135deg, ${catColor}0E 0%, ${catColor}08 100%)`,
              padding: '4px 12px', borderRadius: 6,
              fontSize: 13,
              border: `1px solid ${catColor}1A`,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: catColor, display: 'inline-block', opacity: 0.9, flexShrink: 0 }} />
              {campaign.type}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 13, color: '#9CA3AF',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {campaign.city}
            </span>
          </div>

          {/* Billedgalleri */}
          <div className="hjerte-clip" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', background: '#F3F4F6' }}>
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={campaign.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {hasMultipleImages && (
                  <>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); prevImage(); }}
                      style={{
                        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.85)', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'background 0.15s', zIndex: 10,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                    >
                      <ChevronLeft size={20} color="#111827" />
                    </button>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); nextImage(); }}
                      style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.85)', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'background 0.15s', zIndex: 10,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                    >
                      <ChevronRight size={20} color="#111827" />
                    </button>
                    <div style={{
                      position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                      display: 'flex', gap: 8, zIndex: 10,
                    }}>
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onMouseDown={(e) => { e.preventDefault(); setCurrentImageIndex(idx); }}
                          style={{
                            width: 8, height: 8, borderRadius: '50%', padding: 0,
                            border: idx === currentImageIndex ? 'none' : '2px solid #fff',
                            background: idx === currentImageIndex ? '#fff' : 'transparent',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{
                width: '100%', height: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 80, fontWeight: 800, color: catColor, opacity: 0.3,
              }}>
                {initial}
              </div>
            )}
          </div>

          {/* Beskrivelse */}
          <div style={{ marginTop: 28 }}>
            <div style={LABEL_STYLE}>BESKRIVELSE</div>
            <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.7, margin: 0 }}>
              {campaign.desc}
            </p>
          </div>

          {DIVIDER}

          {/* Delingskort */}
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Deling gør en forskel</div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: '0 0 16px' }}>
              <strong style={{ fontWeight: 700 }}>Hvert delt link</strong> kan inspirere nye støtter og bringe foreningen tættere på målet.
            </p>
            <div className="hjerte-clip" style={{
              background: '#FFFFFF', border: '1px solid #EBEBEB',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{ width: '100%', height: 280 }}>
                {images.length > 0 ? (
                  <img src={images[0]} alt={campaign.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(135deg, ${catColor}18, ${catColor}38)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48, fontWeight: 800, color: catColor,
                  }}>{initial}</div>
                )}
              </div>
              <div style={{ padding: '24px 24px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{campaign.title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Organiseret af {campaign.association}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 40, height: 40 }}>
                      <svg width="40" height="40" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="20" cy="20" r="17" stroke="#F3F4F6" strokeWidth="4" fill="none" />
                        <circle
                          cx="20" cy="20" r="17"
                          stroke="#E0193F" strokeWidth="4" fill="none"
                          strokeDasharray={`${2 * Math.PI * 17}`}
                          strokeDashoffset={`${2 * Math.PI * 17 * (1 - animatedPct / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 10, fontWeight: 700, color: '#E0193F', whiteSpace: 'nowrap',
                      }}>{animatedPct}%</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', textAlign: 'center', marginTop: 4 }}>
                      {formatDKK(animatedRaised)} kr.
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #F3F4F6', marginTop: 20 }} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, padding: '16px 0 4px' }}>
                  {SHARE_ICONS.map((item, i) => (
                    <div key={i} style={{
                      width: 44, height: 44, borderRadius: '50%', background: item.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {DIVIDER}

          {/* Hjertesagsholder */}
          <div>
            <div style={LABEL_STYLE}>HJERTESAGSHOLDER</div>
            <div style={{ border: '1px solid #EBEBEB', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: catColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {initial}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{campaign.association}</span>
                    {campaign.verified && VERIFIED_BADGE}
                  </div>
                  <div style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>{campaign.city}, {campaign.zip}</div>
                </div>
              </div>
            </div>
          </div>

          {DIVIDER}

          {/* Opbakning */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Opbakning</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 20, height: 20, padding: '0 6px', borderRadius: 100,
                background: '#F3F4F6', fontSize: 12, fontWeight: 600, color: '#6B7280',
              }}>
                {comments.length}
              </span>
            </div>
            <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Vis din støtte med en kommentar</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {comments.map((c, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 600, color: '#6B7280', flexShrink: 0,
                  }}>
                    {c.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                      {c.name} <span style={{ fontWeight: 500, color: '#6B7280' }}>DKK {c.amount}</span>{' '}
                      <span style={{ color: '#9CA3AF' }}>·</span>{' '}
                      <span style={{ color: '#9CA3AF', fontSize: 13 }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, marginTop: 6 }}>{c.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Oprettelsesdato */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #F3F4F6', fontSize: 13, color: '#9CA3AF' }}>
            Oprettet 15. marts 2026 <span style={{ color: '#9CA3AF' }}>·</span>{' '}
            <span style={{ color: '#9CA3AF', textDecoration: 'underline', cursor: 'pointer' }}>{campaign.type}</span>
          </div>
        </div>

        {/* Højre sidebar - Pulse design */}
        <div className="hjerte-detail-right hjerte-fade-up hjerte-stagger-2" style={{
          position: 'sticky',
          top: 24,
          alignSelf: 'flex-start',
          zIndex: 10,
          paddingTop: 8,
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid #EBEBEB',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
          }}>

            {/* Dark header med momentum bar */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A, #1E293B)',
              padding: '22px 20px 20px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px 20px 0 0',
            }}>
              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 3 }}>
                  {formatDKK(animatedRaised)} kr.
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
                  indsamlet af {formatDKK(animatedGoal)} kr.
                </div>
                {/* Momentum bar */}
                <div style={{ position: 'relative', height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 100 }}>
                  <div className="hjerte-momentum-bar" style={{
                    width: `${animatedPct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #E0193F, #ff4d6a)',
                    borderRadius: 100,
                    position: 'relative',
                    transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}>
                    <div className="hjerte-momentum-dot" style={{
                      position: 'absolute', right: -4, top: -4,
                      width: 13, height: 13,
                      background: '#fff', borderRadius: '50%',
                      border: '3px solid #E0193F',
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>0 kr.</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#E0193F' }}>{animatedPct}%</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{formatDKK(campaign.goal)} kr.</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', marginTop: 6 }}>
                  {nudgeText(pct)}
                </div>
              </div>
            </div>

            {/* Tre støttemuligheder */}
            <div style={{ padding: '16px 16px 12px' }}>

              {/* 1. Støt nu - primær CTA */}
              <button
                onClick={() => onDonate && onDonate(campaign)}
                style={{
                  width: '100%', height: 44, border: 'none', borderRadius: 12,
                  background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
                  color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 16px rgba(224,25,63,0.3)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  marginBottom: 12,
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(224,25,63,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(224,25,63,0.3)'; }}
              >
                <Heart size={16} fill="#fff" /> Støt nu
              </button>

              <div style={{
                fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '1.2px', color: '#9CA3AF', marginBottom: 8,
              }}>
                Eller køb supportertøj
              </div>

              {/* 2. Foreningens supporterkollektion */}
              <button
                className="hjerte-support-option"
                style={{
                  width: '100%', border: '1px solid #EBEBEB', borderRadius: 12,
                  padding: '10px 14px', marginBottom: 6, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: '#fff', transition: 'all 0.2s', textAlign: 'left',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E0193F'; e.currentTarget.style.background = 'rgba(224,25,63,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #16a34a, #22C55E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Heart size={16} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{campaign.association} kollektion</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Vis din støtte med foreningens tøj</div>
                </div>
                <ExternalLink size={13} color="#9CA3AF" />
              </button>

              {/* 3. StøtMedHjerte kollektion */}
              <button
                className="hjerte-support-option"
                style={{
                  width: '100%', border: '1px solid #EBEBEB', borderRadius: 12,
                  padding: '10px 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: '#fff', transition: 'all 0.2s', textAlign: 'left',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E0193F'; e.currentTarget.style.background = 'rgba(224,25,63,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.background = '#fff'; }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #111827, #374151)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShoppingBag size={16} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>StøtMedHjerte kollektion</div>
                  <div style={{ fontSize: 11, color: '#6B7280' }}>Rep vores branding</div>
                </div>
                <ExternalLink size={13} color="#9CA3AF" />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#F3F4F6', margin: '0 16px' }} />

            {/* Live supporters feed */}
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="hjerte-live-dot" style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#22C55E',
                  }} />
                  <span style={{
                    fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '1.2px', color: '#9CA3AF',
                  }}>
                    Seneste støtter
                  </span>
                </div>
                {/* Stacked avatars */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {supporters.slice(0, 4).map((s, idx) => (
                    <div key={idx} style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: s.name === 'Anonym' ? '#E0193F' : ['#7c3aed', '#0284c7', '#ea580c', '#16a34a'][idx % 4],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 600, color: '#fff',
                      border: '2px solid #fff',
                      marginLeft: idx === 0 ? 0 : -8,
                      position: 'relative', zIndex: 4 - idx,
                    }}>
                      {s.name === 'Anonym'
                        ? <Heart size={10} fill="#fff" color="#fff" />
                        : s.name.charAt(0)
                      }
                    </div>
                  ))}
                  <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 6 }}>+{allSupporters.length - 4}</span>
                </div>
              </div>

              {/* Supporter entries */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {supporters.map((s, idx) => {
                  const avatarColors = ['#7c3aed', '#E0193F', '#0284c7', '#ea580c'];
                  const avatarColor = s.name === 'Anonym' ? '#E0193F' : avatarColors[idx % 4];
                  const timeShort = s.time.replace(' siden', '');
                  return (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 10px', background: '#FAFAFA', borderRadius: 10,
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: avatarColor, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 600, color: '#fff',
                      }}>
                        {s.name === 'Anonym'
                          ? <Heart size={14} fill="#fff" color="#fff" />
                          : s.name.charAt(0)
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{s.name}</span>
                          {s.type === 'top' && (
                            <span style={{
                              display: 'inline-block', padding: '1px 5px', borderRadius: 100,
                              background: 'rgba(224,25,63,0.1)', color: '#E0193F',
                              fontSize: 9, fontWeight: 600,
                            }}>Top</span>
                          )}
                          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{timeShort}</span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>{formatDKK(s.amount)} kr.</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => { setModalTab('newest'); setShowSupportersModal(true); }}
                style={{
                  width: '100%', marginTop: 12, padding: 10,
                  border: '1px solid #EBEBEB', borderRadius: 12,
                  background: '#fff', fontSize: 13, fontWeight: 500,
                  color: '#6B7280', cursor: 'pointer', transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FAFAFA'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
              >
                Se alle {allSupporters.length} støtter
              </button>
            </div>

            {/* Del/Kopiér strip */}
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  flex: 1, padding: 10, border: '1px solid #EBEBEB', borderRadius: 12,
                  background: '#fff', fontSize: 12, fontWeight: 500, color: '#6B7280',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                >
                  <Share2 size={14} /> Del
                </button>
                <button style={{
                  flex: 1, padding: 10, border: '1px solid #EBEBEB', borderRadius: 12,
                  background: '#fff', fontSize: 12, fontWeight: 500, color: '#6B7280',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FAFAFA'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                >
                  <Copy size={14} /> Kopiér link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tillidssektion */}
      <div style={{
        background: '#1E293B',
        padding: '72px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 36, letterSpacing: '-0.02em' }}>
            Din støtte gør en forskel
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }} className="hjerte-trust-columns">
            {[
              {
                label: 'Nemt',
                desc: 'Køb merchandise og støt automatisk',
                iconBg: 'rgba(255,255,255,0.08)',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>,
              },
              {
                label: 'Sikkert',
                desc: 'Alle transaktioner er krypterede og sikre',
                iconBg: 'rgba(255,255,255,0.08)',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              },
              {
                label: 'Verificeret',
                desc: 'Alle foreninger er MitID og CVR-validerede',
                iconBg: 'rgba(255,255,255,0.08)',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
              },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48, margin: '0 auto 12px', borderRadius: 12,
                  background: item.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', maxWidth: 200, margin: '0 auto' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporters Modal */}
      {showSupportersModal && (
        <div
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowSupportersModal(false); }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
            fontFamily: "system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', sans-serif",
          }}
        >
          <div className="hjerte-clip" style={{
            background: '#fff', borderRadius: 24, width: '100%', maxWidth: 520,
            maxHeight: '80vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
            animation: 'hjerte-modal-in 0.25s ease',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '24px 24px 16px', flexShrink: 0, borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>Støtter</span>
                  <span style={{
                    padding: '2px 10px', borderRadius: 8, background: '#F3F4F6',
                    fontSize: 14, fontWeight: 700, color: '#6B7280',
                  }}>{allSupporters.length}</span>
                </div>
                <button
                  onClick={() => setShowSupportersModal(false)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: '#F3F4F6', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E5E7EB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; }}
                >
                  <X size={18} color="#6B7280" />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ key: 'newest', label: 'Nyeste' }, { key: 'top', label: 'Top' }].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setModalTab(tab.key)}
                    style={{
                      flex: 1, height: 40, borderRadius: 10, border: 'none',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      background: modalTab === tab.key
                        ? 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)'
                        : '#F3F4F6',
                      color: modalTab === tab.key ? '#fff' : '#6B7280',
                      transition: 'all 0.15s',
                      boxShadow: modalTab === tab.key ? '0 2px 8px rgba(224,25,63,0.22)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {modalTab === 'top' && (
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 12 }}>
                  Bliv top-støtter for {campaign.association} med DKK {formatDKK(Math.min(...allSupporters.filter(s => s.type === 'top').map(s => s.amount)))} eller mere.
                </div>
              )}
            </div>

            <div className="hjerte-modal-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '0 24px' }}>
              {modalSupporters.map((s, idx) => (
                <React.Fragment key={idx}>
                  <div style={{
                    padding: '14px 0',
                    display: 'flex', alignItems: 'center', gap: 14,
                    borderTop: idx === 0 ? 'none' : '1px solid #F3F4F6',
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 600, color: '#6B7280', flexShrink: 0,
                    }}>
                      {s.name === 'Anonym' ? <Heart size={18} fill="#9CA3AF" color="#9CA3AF" /> : s.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{s.name}</span>
                        {s.source === 'merchandise' && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            background: '#F0FDF4', color: '#15803d',
                            fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100,
                            border: '1px solid #BBF7D0', textTransform: 'uppercase', letterSpacing: '0.03em',
                          }}>Merchandise</span>
                        )}
                        {s.source === 'donation' && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            background: '#EFF6FF', color: '#2563EB',
                            fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100,
                            border: '1px solid #BFDBFE', textTransform: 'uppercase', letterSpacing: '0.03em',
                          }}>Donation</span>
                        )}
                      </div>
                      <div style={{ fontSize: 14, color: '#111827', marginTop: 2 }}>
                        <span style={{ fontWeight: 700 }}>DKK {formatDKK(s.amount)}</span>
                        {s.type === 'top' && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center',
                            background: '#FEF3C7', color: '#B45309',
                            fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 100, marginLeft: 6,
                          }}>Top</span>
                        )}
                        <span style={{ color: '#9CA3AF' }}> · </span>
                        <span style={{ color: '#9CA3AF' }}>{s.time}</span>
                      </div>
                    </div>
                  </div>
                  {idx === 3 && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px', borderRadius: 14,
                      background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%)',
                      border: '1px solid #FECDD3',
                      margin: '8px 0',
                    }}>
                      {images.length > 0 && (
                        <img src={images[0]} alt="" className="hjerte-clip" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, color: '#111827', lineHeight: 1.5 }}>
                        Hver støtte bringer<br />foreningen tættere på målet
                      </div>
                      <button
                        onClick={() => { setShowSupportersModal(false); onDonate && onDonate(campaign); }}
                        style={{
                          padding: '7px 14px', borderRadius: 8, border: 'none',
                          background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
                          color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          boxShadow: '0 1px 4px rgba(224,25,63,0.2)',
                          whiteSpace: 'nowrap', flexShrink: 0,
                        }}>
                        Støt nu <Heart size={11} />
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{ padding: '12px 24px 16px', borderTop: '1px solid #F3F4F6', flexShrink: 0, display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setShowSupportersModal(false); onDonate && onDonate(campaign); }}
                style={{
                  flex: 1, height: 44, border: 'none', borderRadius: 12,
                  background: 'linear-gradient(135deg, #E0193F, #ff4d6a)',
                  color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: '0 2px 8px rgba(224,25,63,0.22)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(224,25,63,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(224,25,63,0.22)'; }}
              >
                <Heart size={14} fill="#fff" /> Støt nu
              </button>
              <button style={{
                flex: 1, height: 44, borderRadius: 12,
                background: '#fff', color: '#0F172A', border: '1px solid #EBEBEB',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FAFAFA'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
              >
                <ShoppingBag size={14} /> Kollektioner <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes hjerte-modal-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hjerte-momentum-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(224,25,63,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(224,25,63,0); }
        }
        @keyframes hjerte-live-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .hjerte-momentum-dot {
          animation: hjerte-momentum-glow 2s ease infinite;
        }
        .hjerte-live-dot {
          animation: hjerte-live-pulse 2s ease infinite;
        }
        #root,
        #root > *,
        #root > * > *,
        #root > * > * > *,
        #root > * > * > * > *,
        #root > * > * > * > * > *,
        #root > * > * > * > * > * > * {
          overflow: visible !important;
          overflow-x: visible !important;
          overflow-y: visible !important;
        }
        .hjerte-clip,
        #root .hjerte-clip,
        #root > * .hjerte-clip,
        #root > * > * .hjerte-clip,
        #root > * > * > * .hjerte-clip,
        #root > * > * > * > * .hjerte-clip,
        #root > * > * > * > * > * .hjerte-clip {
          overflow: hidden !important;
        }
        .hjerte-modal-scroll,
        #root .hjerte-modal-scroll,
        #root > * .hjerte-modal-scroll,
        #root > * > * .hjerte-modal-scroll,
        #root > * > * > * .hjerte-modal-scroll,
        #root > * > * > * > * .hjerte-modal-scroll,
        #root > * > * > * > * > * .hjerte-modal-scroll {
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }
        .hjerte-modal-scroll::-webkit-scrollbar { width: 4px; }
        .hjerte-modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .hjerte-modal-scroll::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 4px; }
        .hjerte-detail-columns {
          display: flex;
          align-items: flex-start !important;
          gap: 40px;
        }
        .hjerte-detail-left { flex: 1; min-width: 0; }
        .hjerte-detail-right {
          width: 380px;
          flex-shrink: 0;
          align-self: flex-start !important;
          position: sticky !important;
          top: 24px !important;
        }
        @media (max-width: 768px) {
          .hjerte-detail-columns { flex-direction: column !important; gap: 20px !important; }
          .hjerte-detail-right { width: 100% !important; position: static !important; }
          .hjerte-trust-columns { flex-direction: column !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}