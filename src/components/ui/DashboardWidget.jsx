import Card from './Card';

// DashboardWidget - generic dashboard surface card.
export default function DashboardWidget({ title, children, action }) {
  return <Card><div className="mkt-card-header"><strong>{title}</strong>{action}</div>{children}</Card>;
}
