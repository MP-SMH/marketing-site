import Button from './Button';

// EmptyState - structured empty state with optional action.
export default function EmptyState({ icon, title, body, actionLabel, onAction }) {
  return (
    <div className="mkt-card" style={{ textAlign: 'center', padding: 42 }}>
      {icon ? <div className="mkt-icon-box" style={{ margin: '0 auto 18px' }}>{icon}</div> : null}
      <h3 style={{ margin: 0 }}>{title}</h3>
      {body ? <p className="mkt-subtitle" style={{ fontSize: 'var(--text-md)' }}>{body}</p> : null}
      {actionLabel ? <div style={{ marginTop: 22 }}><Button onClick={onAction}>{actionLabel}</Button></div> : null}
    </div>
  );
}
