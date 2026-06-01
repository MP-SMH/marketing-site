// PageHeader - app page header with optional actions/tabs.
export default function PageHeader({ eyebrow, title, subtitle, actions, tabs }) {
  return (
    <div className="mkt-card-header" style={{ alignItems: 'flex-end', marginBottom: 24 }}>
      <div>
        {eyebrow ? <div className="mkt-eyebrow">{eyebrow}</div> : null}
        <h1 style={{ margin: 0, letterSpacing: '-0.04em' }}>{title}</h1>
        {subtitle ? <p className="mkt-helper">{subtitle}</p> : null}
        {tabs}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
