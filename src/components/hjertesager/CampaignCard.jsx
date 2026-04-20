import React from 'react';
import { ShieldCheck, ArrowRight, MapPin, Heart } from 'lucide-react';

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

export default function CampaignCard({ campaign, onSelect, index, viewMode }) {
  const catColor = getCatColor(campaign.type);
  const initial = campaign.association.charAt(0).toUpperCase();
  const missing = Math.max(0, campaign.goal - campaign.raised);
  const pct = Math.round((campaign.raised / campaign.goal) * 100);
  const animatedRaised = useCountUp(campaign.raised, 1200);
  const animatedGoal = useCountUp(campaign.goal, 1200);
  const animatedPct = useCountUp(pct, 900);
  const animatedMissing = useCountUp(missing, 1200);

  if (viewMode === 'list') {
    return (
      <div
        className={`hjerte-fade-up hjerte-stagger-${Math.min(index + 1, 6)}`}
        onClick={() => onSelect(campaign)}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: '#fff', border: '1px solid #EBEBEB', borderRadius: 16, padding: '12px 16px',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#E0193F20'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#EBEBEB'; }}
      >
        {/* Thumbnail */}
        <div style={{ width: 72, height: 72, borderRadius: 14, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
          {campaign.image ? (
            <img src={campaign.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(135deg, ${catColor}22, ${catColor}44)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 800, color: catColor,
            }}>
              {initial}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 3, lineHeight: 1.3 }} className="hjerte-line-clamp-2">
            {campaign.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#9CA3AF', marginBottom: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              color: catColor, fontWeight: 650, fontSize: 11,
              background: `${catColor}0E`, padding: '2px 7px', borderRadius: 5,
              border: `1px solid ${catColor}1A`,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: catColor }} />
              {campaign.type}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#9CA3AF' }}>
              <MapPin size={10} strokeWidth={2} />
              {campaign.city}
            </span>
          </div>
          {/* Mini momentum bar */}
          <div style={{ height: 4, background: '#F3F4F6', borderRadius: 100, position: 'relative', maxWidth: 180 }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'linear-gradient(90deg, #E0193F, #ff4d6a)',
              borderRadius: 100,
            }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, minWidth: 90 }}>
          <span style={{
            fontSize: 14, fontWeight: 800, color: '#E0193F',
            background: 'rgba(224,25,63,0.06)', padding: '2px 8px', borderRadius: 6,
          }}>{animatedPct}%</span>
          <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{formatDKK(animatedRaised)} kr.</span>
          <span style={{ fontSize: 10, color: '#9CA3AF' }}>af {formatDKK(campaign.goal)} kr.</span>
        </div>

        <ArrowRight size={16} color="#9CA3AF" />
      </div>
    );
  }

  return (
    <div
      className={`hjerte-fade-up hjerte-stagger-${Math.min(index + 1, 6)}`}
      style={{
        background: '#fff',
        border: '1px solid #EBEBEB',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
      onClick={() => onSelect(campaign)}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(224,25,63,0.08)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image with overlay gradient */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        {campaign.image ? (
          <>
            <img src={campaign.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.15))',
            }} />
          </>
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(135deg, ${catColor}18, ${catColor}38)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 56, fontWeight: 800, color: catColor, opacity: 0.5,
          }}>
            {initial}
          </div>
        )}
        {/* Percentage badge on image */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
          borderRadius: 10, padding: '6px 10px',
          fontSize: 13, fontWeight: 800, color: '#E0193F',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <Heart size={12} color="#E0193F" fill="#E0193F" />
          {animatedPct}%
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Association row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${catColor}12 0%, ${catColor}08 100%)`,
            border: `1.5px solid ${catColor}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 750, color: catColor, flexShrink: 0,
          }}>
            {initial}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>{campaign.association}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12, color: '#6B7280', fontWeight: 500, marginTop: 3 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: catColor, fontWeight: 650, opacity: 0.85,
                background: `linear-gradient(135deg, ${catColor}0E 0%, ${catColor}08 100%)`,
                padding: '3px 9px', borderRadius: 6, fontSize: 11.5,
                border: `1px solid ${catColor}1A`,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: catColor, display: 'inline-block', opacity: 0.9 }} />
                {campaign.type}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#9CA3AF' }}>
                <MapPin size={12} strokeWidth={1.8} />
                {campaign.city}
              </span>
            </div>
          </div>
          {campaign.verified && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 10px', borderRadius: 100,
              background: 'linear-gradient(135deg, #E7F0FE 0%, #D4E4FC 100%)',
              border: '1px solid #93B8F5',
              fontSize: 10.5, fontWeight: 700, color: '#1877F2',
              flexShrink: 0, alignSelf: 'flex-start',
            }}>
              <ShieldCheck size={10} style={{ strokeWidth: 2.5 }} /> Verificeret
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 6px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
          {campaign.title}
        </h3>

        {/* Description */}
        <p className="hjerte-line-clamp-3" style={{ fontSize: 13, color: '#475569', lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>
          {campaign.desc}
        </p>

        {/* Progress section */}
        <div style={{ paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ flex: 1, height: 5, background: '#F3F4F6', borderRadius: 100, position: 'relative' }}>
              <div style={{
                height: '100%', width: `${animatedPct}%`,
                background: 'linear-gradient(90deg, #E0193F, #ff4d6a)',
                borderRadius: 100, transition: 'width 0.05s linear',
                position: 'relative',
              }}>
                <div className="hjerte-momentum-dot" style={{
                  position: 'absolute', right: -4, top: -4,
                  width: 13, height: 13,
                  background: '#fff', borderRadius: '50%',
                  border: '3px solid #E0193F',
                  boxShadow: '0 1px 4px rgba(224,25,63,0.3)',
                }} />
              </div>
            </div>
          </div>

          {/* Nudge text */}
          <p style={{ fontSize: 11, fontWeight: 500, color: '#9CA3AF', margin: '0 0 12px 0', fontStyle: 'italic' }}>
            {pct >= 75
              ? 'Næsten i mål. Din støtte kan gøre forskellen!'
              : pct >= 50
              ? 'Halvvejs. Hjælp dem over målstregen'
              : 'Hver støtte tæller. Vær med til at gøre en forskel'}
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Indsamlet</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>DKK {formatDKK(animatedRaised)}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Mål</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>DKK {formatDKK(animatedGoal)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>Mangler</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#B45309', letterSpacing: '-0.02em' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px', borderRadius: 6, background: '#FFFBEB',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#F59E0B', flexShrink: 0, animation: 'mkt-glow 2s ease infinite' }} />
                  DKK {formatDKK(animatedMissing)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '12px 0 18px' }}>
          <button
            type="button"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '12px',
              borderRadius: 12, border: 'none',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(224,25,63,0.25)',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(224,25,63,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(224,25,63,0.25)';
            }}
          >
            <Heart size={15} fill="#fff" /> Støt nu <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}