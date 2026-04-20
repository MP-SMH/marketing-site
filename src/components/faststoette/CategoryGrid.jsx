export default function CategoryGrid({ allCategories, selectedCategories, toggleCategory }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: 8,
      marginTop: 12,
      padding: 16,
      background: '#FAFAFA',
      borderRadius: 16,
      border: '1px solid #F3F4F6',
    }}>
      {allCategories.map(cat => {
        const selected = selectedCategories.includes(cat.name);
        return (
          <button
            key={cat.name}
            onClick={() => toggleCategory(cat.name)}
            className="chip-transition"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 12px',
              borderRadius: 10,
              border: selected ? `1.5px solid ${cat.color}30` : '1.5px solid transparent',
              background: selected ? `${cat.color}0A` : '#fff',
              fontSize: 13,
              fontWeight: 500,
              color: selected ? cat.color : '#374151',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              minHeight: 44,
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: cat.color,
              flexShrink: 0,
            }} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}