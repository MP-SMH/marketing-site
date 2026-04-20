import { useState, useEffect } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import AssociationCard from './AssociationCard';

export default function AssociationList({ orgs, allCategories, clearFilters }) {
  const [modalOrg, setModalOrg] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    if (modalOrg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOrg]);

  if (orgs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9CA3AF' }}>
        <Search size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
        <p style={{ fontSize: 16, fontWeight: 500, color: '#6B7280', margin: '0 0 6px' }}>
          Ingen foreninger fundet
        </p>
        <button onClick={clearFilters} style={{ marginTop: 12, padding: '8px 20px', borderRadius: 8, border: '1.5px solid #E5E7EB', background: '#fff', fontSize: 13, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
          Vis alle
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Results header with view toggle */}
      <div className="desktop-filter-only" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500, margin: 0 }}>
          {orgs.length} forening{orgs.length !== 1 ? 'er' : ''}
        </p>
        <div style={{
          display: 'flex', gap: 2, padding: 3,
          background: '#F3F4F6', borderRadius: 10,
        }}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 30, borderRadius: 7,
              border: 'none', cursor: 'pointer',
              background: viewMode === 'grid' ? '#fff' : 'transparent',
              boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              color: viewMode === 'grid' ? '#111827' : '#9CA3AF',
              transition: 'all 0.15s ease',
            }}
            title="Gitter"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 30, borderRadius: 7,
              border: 'none', cursor: 'pointer',
              background: viewMode === 'list' ? '#fff' : 'transparent',
              boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              color: viewMode === 'list' ? '#111827' : '#9CA3AF',
              transition: 'all 0.15s ease',
            }}
            title="Liste"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={viewMode === 'grid' ? 'cards-grid' : 'cards-list'} style={{
        display: viewMode === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(2, 1fr)' : undefined,
        flexDirection: viewMode === 'list' ? 'column' : undefined,
        gap: viewMode === 'grid' ? 16 : 12,
        paddingBottom: 24,
      }}>
        {orgs.map((org, index) => (
          <AssociationCard
            key={org.id}
            org={org}
            index={index}
            allCategories={allCategories}
            onReadMore={(o) => setModalOrg(o)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Full-screen mobile modal */}
      {modalOrg && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: '#fff',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>



          {/* Content - fills remaining space, no scroll */}
          <div style={{
            flex: 1, padding: '24px 20px 0',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-start',
            maxWidth: 520, margin: '0 auto', width: '100%',
            boxSizing: 'border-box',
          }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: (allCategories.find(c => c.name === modalOrg.type)?.color || '#6B7280') + '10',
                border: '1.5px solid ' + (allCategories.find(c => c.name === modalOrg.type)?.color || '#6B7280') + '1E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700,
                color: allCategories.find(c => c.name === modalOrg.type)?.color || '#6B7280',
                flexShrink: 0,
              }}>
                {modalOrg.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>{modalOrg.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 13, color: '#9CA3AF' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    color: allCategories.find(c => c.name === modalOrg.type)?.color || '#6B7280',
                    fontWeight: 600,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: allCategories.find(c => c.name === modalOrg.type)?.color || '#6B7280' }} />
                    {modalOrg.type}
                  </span>
                  <span>·</span>
                  <span>{modalOrg.zip} {modalOrg.city}</span>
                </div>
              </div>
            </div>

            {/* Verified */}
            {modalOrg.verified && (
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 100, background: '#F0FDF4', color: '#15803d', border: '1px solid #BBF7D0', fontSize: 12, fontWeight: 600 }}>
                  Verificeret forening
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px', borderRadius: 100, background: '#EFF6FF', color: '#2563eb', border: '1px solid #BFDBFE', fontSize: 12, fontWeight: 600 }}>
                  MitID + CVR
                </span>
              </div>
            )}

            {/* Divider */}
            <div style={{ height: 1, background: '#F3F4F6', marginBottom: 16 }} />

            {/* Label */}
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 8 }}>
              Din støtte går til
            </p>

            {/* Description */}
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#374151', margin: 0 }}>
              {modalOrg.desc}
            </p>

          </div>

          {/* Fixed bottom: price + CTA */}
          <div style={{
            flexShrink: 0,
            padding: '16px 20px',
            paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
            borderTop: '1px solid #F3F4F6',
            background: '#fff',
          }}>
            <div style={{ maxWidth: 520, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', display: 'block', marginBottom: 2 }}>Fra</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.03em' }}>
                    100,00 <span style={{ fontSize: 13, fontWeight: 500, color: '#9CA3AF' }}>kr. / md.</span>
                  </span>
                </div>
              </div>
              {modalOrg.verified && (
                <button
                  type="button"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', padding: '16px',
                    borderRadius: 12, border: 'none',
                    fontSize: 16, fontWeight: 650,
                    background: 'linear-gradient(135deg, #E0193F 0%, #c8112e 100%)',
                    color: '#fff', cursor: 'pointer',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: '0 4px 16px rgba(224,25,63,0.25)',
                  }}
                >
                  Vælg denne forening →
                </button>
              )}
              <button
                type="button"
                onClick={() => setModalOrg(null)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: 8,
                  borderRadius: 10,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                Luk
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}