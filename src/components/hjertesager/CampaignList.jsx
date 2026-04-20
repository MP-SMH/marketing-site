import { LayoutGrid, List } from 'lucide-react';
import CampaignCard from './CampaignCard';

export default function CampaignList({ campaigns, onSelect, viewMode, onViewModeChange }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Header + view toggle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 14, color: '#6B7280' }}>
          <strong style={{ color: '#0F172A' }}>{campaigns.length}</strong> hjertesager fundet
        </div>

        {/* Toggle — desktop only */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: '#F3F4F6',
            borderRadius: 8,
            padding: 3,
          }}
          className="hjerte-view-toggle"
        >
          {[
            { mode: 'grid', Icon: LayoutGrid },
            { mode: 'list', Icon: List },
          ].map(({ mode, Icon }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              style={{
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                border: 'none',
                background: viewMode === mode ? '#fff' : 'transparent',
                boxShadow: viewMode === mode ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={16} color={viewMode === mode ? '#0F172A' : '#9CA3AF'} />
            </button>
          ))}
        </div>
      </div>

      {/* Grid / List */}
      {campaigns.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#9CA3AF',
          fontSize: 15,
        }}>
          Ingen hjertesager matcher din søgning.
        </div>
      ) : viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340, 1fr))',
            gap: 24,
          }}
          className="hjerte-grid"
        >
          {campaigns.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} onSelect={onSelect} index={i} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {campaigns.map((c, i) => (
            <CampaignCard key={c.id} campaign={c} onSelect={onSelect} index={i} viewMode="list" />
          ))}
        </div>
      )}

      <style>{`
        .hjerte-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        @media (max-width: 700px) {
          .hjerte-grid {
            grid-template-columns: 1fr !important;
          }
          .hjerte-view-toggle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}