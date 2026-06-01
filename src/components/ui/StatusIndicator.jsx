// StatusIndicator - live/success/warning/error state label.
export default function StatusIndicator({ status = 'live', children }) {
  return (
    <span className={`mkt-status mkt-status-${status}`}>
      <span className="mkt-status-dot" aria-hidden="true" />
      <span>{children || status}</span>
    </span>
  );
}
