import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, MapPin, Heart, Users } from 'lucide-react';

export default function AssociationCard({ org, index, allCategories, onReadMore, viewMode = 'grid' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cat = allCategories.find(c => c.name === org.type);
  const catColor = cat?.color || '#6B7280';
  const initial = org.name.charAt(0).toUpperCase();

  // List view
  if (viewMode === 'list') {
    return (
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity 0.4s ease ${index * 50}ms, transform 0.4s ease ${index * 50}ms`,
        }}
      >
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: '#fff', border: '1px solid #EBEBEB', borderRadius: 16,
            padding: '12px 16px',
            cursor: org.verified ? 'pointer' : 'default',
            transition: 'all 0.2s',
            opacity: org.verified ? 1 : 0.5,
          }}
          onMouseEnter={e => { if (org.verified) { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#E0193F20'; } }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#EBEBEB'; }}
        >
          {/* Initial avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: `linear-gradient(135deg, ${catColor}12, ${catColor}08)`,
            border: `1.5px solid ${catColor}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 750, color: catColor,
          }}>
            {initial}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{org.name}</span>
              {org.verified && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  padding: '2px 7px', borderRadius: 100,
                  background: 'linear-gradient(135deg, #E7F0FE 0%, #D4E4FC 100%)', color: '#1877F2', border: '1px solid #93B8F5',
                  fontSize: 9, fontWeight: 700,
                }}>
                  <ShieldCheck size={8} strokeWidth={2.5} /> Verificeret
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: catColor, fontWeight: 650,
                background: `${catColor}0E`, padding: '2px 7px', borderRadius: 5,
                border: `1px solid ${catColor}1A`,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: catColor }} />
                {org.type}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#9CA3AF' }}>
                <MapPin size={10} strokeWidth={2} />
                {org.city}
              </span>
              {org.supporters > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#9CA3AF' }}>
                  <Users size={10} strokeWidth={2} />
                  {org.supporters}
                </span>
              )}
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF', display: 'block', marginBottom: 2 }}>Fra</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>
                100 <span style={{ fontSize: 10, fontWeight: 500, color: '#9CA3AF' }}>kr./md.</span>
              </span>
            </div>
            {org.verified ? (
              <button type="button" style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '8px 16px', borderRadius: 10, border: 'none',
                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                background: 'linear-gradient(135deg, #E0193F, #c8112e)',
                color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(224,25,63,0.22)',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(224,25,63,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(224,25,63,0.22)'; }}
              >
                <Heart size={12} fill="#fff" /> Støt
              </button>
            ) : (
              <span style={{ fontSize: 10, color: '#D1D5DB' }}>Afventer</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.45s ease ${index * 55}ms, transform 0.45s ease ${index * 55}ms`,
      }}
    >
      <div style={{
        background: '#fff',
        border: '1px solid #EBEBEB',
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.25s',
        display: 'flex', flexDirection: 'column',
        opacity: org.verified ? 1 : 0.5,
        cursor: org.verified ? 'pointer' : 'default',
      }}
        onMouseEnter={e => {
          if (org.verified) {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(224,25,63,0.08)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Content */}
        <div style={{ padding: '20px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Header: initial + name + verified */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${catColor}12, ${catColor}08)`,
              border: `1.5px solid ${catColor}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 750, color: catColor,
            }}>
              {initial}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {org.name}
                </span>
                {org.verified ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 8px', borderRadius: 100,
                    background: 'linear-gradient(135deg, #E7F0FE 0%, #D4E4FC 100%)', border: '1px solid #93B8F5',
                    fontSize: 10, fontWeight: 700, color: '#1877F2',
                  }}>
                    <ShieldCheck size={9} strokeWidth={2.5} /> Verificeret
                  </span>
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 8px', borderRadius: 100,
                    background: '#FFFBEB', border: '1px solid #FDE68A',
                    fontSize: 10, fontWeight: 650, color: '#D97706',
                  }}>
                    Afventer
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: '#6B7280' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  color: catColor, fontWeight: 650, opacity: 0.85,
                  background: `${catColor}0E`, padding: '2px 8px', borderRadius: 5,
                  border: `1px solid ${catColor}1A`,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: catColor }} />
                  {org.type}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: '#9CA3AF' }}>
                  <MapPin size={11} strokeWidth={1.8} />
                  {org.city}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 13, lineHeight: 1.6, color: '#475569',
            margin: '0 0 14px', flex: 1,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {org.desc}
          </p>

          {/* Supporters count */}
          {org.supporters > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 14, fontSize: 12, color: '#6B7280',
            }}>
              <Users size={13} strokeWidth={1.8} color="#9CA3AF" />
              <span><strong style={{ fontWeight: 700, color: '#0F172A' }}>{org.supporters}</strong> faste støtter</span>
            </div>
          )}

          {/* Footer: price + CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: 14, borderTop: '1px solid #F3F4F6',
          }}>
            <div>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', display: 'block', marginBottom: 3 }}>Fra</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
                100 <span style={{ fontSize: 12, fontWeight: 500, color: '#6B7280' }}>kr./md.</span>
              </span>
            </div>
            {org.verified ? (
              <button type="button" style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '10px 20px', borderRadius: 12, border: 'none',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: 'linear-gradient(135deg, #E0193F, #c8112e)',
                color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 4px 16px rgba(224,25,63,0.25)',
                transition: 'all 0.15s', letterSpacing: '-0.01em',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(224,25,63,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(224,25,63,0.25)'; }}
              >
                <Heart size={14} fill="#fff" /> Bliv støtter <ArrowRight size={14} />
              </button>
            ) : (
              <span style={{ fontSize: 11, color: '#D1D5DB', fontWeight: 550 }}>Ikke tilgængelig</span>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}