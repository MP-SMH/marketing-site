import Avatar from './Avatar';

// ActivityFeed - transaction/support event list.
export default function ActivityFeed({ items = [] }) {
  return (
    <div className="mkt-card" aria-live="polite">
      <div className="mkt-card-header"><strong>Seneste aktivitet</strong></div>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} className="mkt-transaction-row" style={{ marginTop: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Avatar name={item.name} size="sm" /><div><strong>{item.name}</strong><div className="mkt-helper">{item.meta}</div></div></div>
            <strong>{item.amount}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
