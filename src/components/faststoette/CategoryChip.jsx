export default function CategoryChip({ cat, selected, onToggle }) {
  const isSelected = selected;
  return (
    <button
      type="button"
      onClick={() => onToggle(cat.name)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '7px 14px', borderRadius: 100,
        border: '1.5px solid',
        borderColor: isSelected ? cat.color : '#EBEBEB',
        background: isSelected ? `${cat.color}10` : '#fff',
        color: isSelected ? cat.color : '#6B7280',
        fontSize: 13, fontWeight: 600, cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: isSelected ? cat.color : '#D1D5DB',
        transition: 'background 0.15s',
        flexShrink: 0,
      }} />
      {cat.name}
    </button>
  );
}