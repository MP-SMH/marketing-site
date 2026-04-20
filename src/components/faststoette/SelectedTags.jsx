import { X } from 'lucide-react';

export default function SelectedTags({ selectedCategories, toggleCategory, allCategories, clearFilters, hasFilters }) {
  if (selectedCategories.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
      alignItems: 'center',
    }}>
      {selectedCategories.map(catName => {
        const cat = allCategories.find(c => c.name === catName);
        return (
          <button
            key={catName}
            onClick={() => toggleCategory(catName)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              borderRadius: 8,
              border: 'none',
              background: `${cat?.color || '#6B7280'}12`,
              fontSize: 12,
              fontWeight: 500,
              color: cat?.color || '#6B7280',
              cursor: 'pointer',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {catName}
            <X size={12} />
          </button>
        );
      })}
      {hasFilters && (
        <button
          onClick={clearFilters}
          style={{
            padding: '6px 10px',
            borderRadius: 8,
            border: 'none',
            background: 'none',
            fontSize: 12,
            fontWeight: 500,
            color: '#9CA3AF',
            cursor: 'pointer',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Ryd
        </button>
      )}
    </div>
  );
}