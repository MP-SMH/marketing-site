import { Heart } from 'lucide-react';
import useInViewport from '../hooks/useInViewport';

// DistributionChart - animated horizontal bar distribution chart.
export default function DistributionChart({ rows = [], totalLabel, totalValue }) {
  const [ref, inView] = useInViewport(0.25);
  return (
    <div ref={ref} className="mkt-distribution">
      {rows.map((row, index) => (
        <div className="mkt-bar-row" key={row.label} style={{ '--bar-color': row.color || 'var(--mkt-primary)' }}>
          <div className="mkt-bar-label">{row.icon || <Heart size={17} />}{row.label}</div>
          <div className="mkt-bar-track"><div className="mkt-bar-fill" style={{ width: inView ? `${row.percent}%` : '0%', transitionDelay: `${index * 100}ms` }} /></div>
          <div className="mkt-bar-value">{row.value}</div>
        </div>
      ))}
      {totalLabel ? <div className="mkt-distribution-total"><span>{totalLabel}</span><span>{totalValue}</span></div> : null}
    </div>
  );
}
