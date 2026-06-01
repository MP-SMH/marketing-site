import Card from './Card';

// StatTile - compact KPI tile.
export default function StatTile({ label, value, trend, icon, className = '' }) {
  return (
    <Card className={className}>
      <div className="mkt-card-header">
        <div>
          <div className="mkt-kpi-label" style={{ color: 'var(--text-secondary)' }}>{label}</div>
          <div className="mkt-kpi-value">{value}</div>
        </div>
        {icon ? <span className="mkt-icon-box">{icon}</span> : null}
      </div>
      {trend ? <div className="mkt-helper">{trend}</div> : null}
    </Card>
  );
}
