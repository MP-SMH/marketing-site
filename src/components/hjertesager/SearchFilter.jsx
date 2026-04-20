import { Search, X, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'Alle', 'Fodbold', 'Gymnastik', 'Håndbold', 'Svømmeklub',
  'Kampsport', 'Handicap / Special',
];

const CATEGORY_COLORS = {
  'Fodbold': '#16a34a',
  'Gymnastik': '#7c3aed',
  'Håndbold': '#ea580c',
  'Svømmeklub': '#0284c7',
  'Kampsport': '#dc2626',
  'Handicap / Special': '#0891b2',
};

export default function SearchFilter({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto 32px', padding: '0 20px' }}>
      <div style={{
        background: '#fff',
        border: '1px solid #EBEBEB',
        borderRadius: 20,
        padding: '20px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)',
      }}>
        {/* Search bar */}
        <div style={{
          position: 'relative',
          marginBottom: 16,
        }}>
          <div style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, rgba(224,25,63,0.08) 0%, rgba(224,25,63,0.03) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Search size={16} color="#E0193F" />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Søg efter hjertesag, forening eller by..."
            style={{
              width: '100%',
              padding: '14px 44px 14px 56px',
              border: '1.5px solid #E5E7EB',
              borderRadius: 14,
              fontSize: 15,
              color: '#111827',
              background: '#F9FAFB',
              outline: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#E0193F'; e.target.style.boxShadow = '0 0 0 3px rgba(224,25,63,0.08)'; }}
            onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: '#F3F4F6', border: 'none', borderRadius: 999,
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E5E7EB'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F3F4F6'; }}
            >
              <X size={14} color="#6B7280" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <SlidersHorizontal size={14} color="#9CA3AF" style={{ marginRight: 4 }} />
          {CATEGORIES.map(cat => {
            const active = category === cat;
            const isAlle = cat === 'Alle';
            const catColor = CATEGORY_COLORS[cat] || '#6B7280';

            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 100,
                  border: active
                    ? isAlle ? '1.5px solid #E0193F' : `1.5px solid ${catColor}60`
                    : '1.5px solid #E5E7EB',
                  background: active
                    ? isAlle ? '#E0193F' : `${catColor}0D`
                    : '#fff',
                  color: active
                    ? isAlle ? '#fff' : catColor
                    : '#6B7280',
                  fontSize: 13,
                  fontWeight: active ? 650 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = isAlle ? '#E0193F40' : `${catColor}40`;
                    e.currentTarget.style.background = isAlle ? '#FEF2F2' : `${catColor}08`;
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.background = '#fff';
                  }
                }}
              >
                {!isAlle && (
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: active ? catColor : '#D1D5DB',
                    transition: 'background 0.15s',
                  }} />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}