import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

function CategoryChip({ cat, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '7px 14px', borderRadius: 100,
        border: '1.5px solid',
        borderColor: selected ? `${cat.color}50` : '#EBEBEB',
        background: selected ? `${cat.color}0E` : '#fff',
        fontSize: 13, fontWeight: selected ? 650 : 500,
        color: selected ? cat.color : '#6B7280',
        cursor: 'pointer', whiteSpace: 'nowrap',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: 38, transition: 'all 0.15s ease',
      }}
    >
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: cat.color,
        flexShrink: 0, opacity: selected ? 1 : 0.5, transition: 'opacity 0.15s',
      }} />
      {cat.name}
    </button>
  );
}

export default function SearchFilter({
  search, setSearch,
  selectedCategories, toggleCategory, clearFilters,
  showAllCategories, setShowAllCategories,
  popularCategories, allCategories,
}) {
  const hasFilters = selectedCategories.length > 0 || search.length > 0;
  const [focused, setFocused] = useState(false);

  return (
    <div className="search-container" style={{
      background: '#fff',
      border: '1px solid #EBEBEB',
      borderRadius: 20,
      padding: '22px 22px 18px',
      marginBottom: 32,
      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.01em' }}>
          Find din forening
        </p>
        {hasFilters && (
          <button onClick={clearFilters} style={{
            fontSize: 12, fontWeight: 600, color: '#E0193F', background: 'none',
            border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Ryd filtre
          </button>
        )}
      </div>

      <div style={{
        position: 'relative', marginBottom: 16,
        borderRadius: 12,
        transition: 'all 0.2s ease',
      }}>
        <Search size={16} style={{
          position: 'absolute', left: 14, top: '50%',
          transform: 'translateY(-50%)', color: focused ? '#E0193F' : '#9CA3AF',
          pointerEvents: 'none', transition: 'color 0.2s',
        }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Søg efter forening, by eller sport..."
          style={{
            width: '100%', padding: '12px 40px 12px 40px',
            fontSize: 14,
            border: focused ? '1.5px solid rgba(224,25,63,0.3)' : '1.5px solid #EBEBEB',
            borderRadius: 12, outline: 'none',
            background: focused ? '#fff' : '#FAFAFA',
            color: '#0F172A',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
          }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)', background: '#F3F4F6', border: 'none',
            cursor: 'pointer', padding: 4, display: 'flex', color: '#9CA3AF',
            borderRadius: '50%', width: 22, height: 22,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={12} />
          </button>
        )}
      </div>

      {selectedCategories.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {selectedCategories.map(catName => {
            const cat = allCategories.find(c => c.name === catName);
            return (
              <button key={catName} onClick={() => toggleCategory(catName)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '4px 10px', borderRadius: 8,
                border: `1px solid ${cat?.color || '#6B7280'}25`,
                background: `${cat?.color || '#6B7280'}0A`,
                fontSize: 12, fontWeight: 600, color: cat?.color || '#6B7280',
                cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {catName} <X size={10} />
              </button>
            );
          })}
        </div>
      )}

      <div className="desktop-filter-only" style={{ height: 1, background: '#F3F4F6', margin: '0 0 14px' }} />

      <div className="mobile-filter-only" style={{ display: 'none', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {popularCategories.map(cat => {
            const selected = selectedCategories.includes(cat.name);
            return (
              <button key={cat.name} type="button" onClick={() => toggleCategory(cat.name)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                padding: '8px 6px', borderRadius: 8,
                border: selected ? '1.5px solid ' + cat.color + '40' : '1.5px solid #EBEBEB',
                background: selected ? cat.color + '0D' : '#fff',
                fontSize: 11, fontWeight: selected ? 600 : 450,
                color: selected ? cat.color : '#6B7280',
                cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'all 0.15s',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: cat.color, opacity: selected ? 1 : 0.4 }} />
                {cat.name}
              </button>
            );
          })}
          <button type="button" onClick={() => setShowAllCategories(!showAllCategories)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            padding: '8px 6px', borderRadius: 8,
            border: '1.5px dashed #EBEBEB',
            background: showAllCategories ? '#F3F4F6' : '#fff',
            fontSize: 11, fontWeight: 500, color: '#9CA3AF',
            cursor: 'pointer', fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Alle 30
          </button>
        </div>
      </div>

      <div className="chips-scroll desktop-filter-only" style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4,
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
        alignItems: 'center', flexWrap: 'nowrap',
      }}>
        {popularCategories.map(cat => (
          <CategoryChip key={cat.name} cat={cat} selected={selectedCategories.includes(cat.name)} onClick={() => toggleCategory(cat.name)} />
        ))}
        <button onClick={() => setShowAllCategories(!showAllCategories)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', borderRadius: 100,
          border: '1.5px solid #EBEBEB',
          background: showAllCategories ? '#F3F4F6' : '#fff',
          fontSize: 13, fontWeight: 550, color: '#6B7280',
          cursor: 'pointer', whiteSpace: 'nowrap',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: 38, transition: 'all 0.15s',
        }}>
          <SlidersHorizontal size={14} />
          Alle 30
        </button>
      </div>

      {showAllCategories && (
        <div className="category-expand-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(145px, 1fr))',
          gap: 6, marginTop: 14, padding: 14,
          background: '#FAFAFA', borderRadius: 14, border: '1px solid #F3F4F6',
        }}>
          {allCategories.map(cat => {
            const selected = selectedCategories.includes(cat.name);
            return (
              <button key={cat.name} onClick={() => toggleCategory(cat.name)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 10,
                border: selected ? `1.5px solid ${cat.color}30` : '1.5px solid transparent',
                background: selected ? `${cat.color}0A` : '#fff',
                fontSize: 12, fontWeight: selected ? 650 : 500,
                color: selected ? cat.color : '#0F172A',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: 36, transition: 'all 0.15s',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}