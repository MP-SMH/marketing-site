import { CreditCard, Heart, Home, ShieldCheck, TrendingUp, Users, Wallet } from 'lucide-react';
import Pill from './Pill';
import DistributionChart from './DistributionChart';
import StatTile from './StatTile';
import useInViewport from '../hooks/useInViewport';
import useCountUp from '../hooks/useCountUp';

// DashboardMockup - realistic product preview for hero and live sections.
export default function DashboardMockup({ variant = 'hero' }) {
  if (variant === 'preview') return <PreviewDashboard />;
  return <HeroDashboard />;
}

function HeroDashboard() {
  return (
    <div className="mkt-browser" aria-label="Dashboard preview">
      <div className="mkt-browser-chrome"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-url">app.stotmedhjerte.dk/admin</span></div>
      <div className="mkt-dashboard">
        <aside className="mkt-dashboard-sidebar"><span className="mkt-side-icon active"><Home size={17} /></span><span className="mkt-side-icon"><Heart size={17} /></span><span className="mkt-side-icon"><Users size={17} /></span><span className="mkt-side-icon"><Wallet size={17} /></span></aside>
        <main className="mkt-dashboard-main">
          <div className="mkt-dashboard-top"><div><div className="mkt-eyebrow" style={{ marginBottom: 6 }}>Overblik</div><h3 style={{ margin: 0, fontSize: 24 }}>Hillerød Sportsklub</h3></div><Pill icon={<span style={{ width: 7, height: 7, borderRadius: 99, background: 'currentColor' }} />}>Live</Pill></div>
          <div className="mkt-dashboard-kpis"><div className="mkt-kpi"><div className="mkt-kpi-label">Total indsamlet</div><div className="mkt-kpi-value">148.920 kr.</div></div><div className="mkt-kpi"><div className="mkt-kpi-label">Aktive støtter</div><div className="mkt-kpi-value">127</div></div></div>
          <div className="mkt-chart-card"><svg viewBox="0 0 520 170" width="100%" height="170" role="img" aria-label="Indsamling over tid"><path d="M8 142 C 64 118, 88 122, 130 92 S 210 44, 270 72 S 342 126, 410 62 S 480 38, 512 32" fill="none" stroke="var(--brand-red)" strokeWidth="5" strokeLinecap="round" className="mkt-chart-line" /><path d="M8 150 C 76 138, 112 108, 160 116 S 250 134, 306 96 S 394 68, 512 82" fill="none" stroke="var(--brand-purple-light)" strokeWidth="4" strokeLinecap="round" className="mkt-chart-line" style={{ animationDelay: '180ms' }} /></svg></div>
          <div className="mkt-transaction-row"><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><span className="mkt-icon-box" style={{ width: 36, height: 36 }}><CreditCard size={16} /></span><div><strong>Ny fast støtte</strong><div className="mkt-kpi-label">Maria Jensen</div></div></div><strong>+200 kr.</strong></div>
        </main>
      </div>
      <div className="mkt-floating-card mkt-float-1"><TrendingUp size={18} color="var(--brand-red)" />+500 kr.</div>
      <div className="mkt-floating-card mkt-float-2"><ShieldCheck size={18} color="var(--status-success)" />Verificeret</div>
      <div className="mkt-floating-card mkt-float-3"><Users size={18} color="var(--brand-purple)" />127 støtter</div>
    </div>
  );
}

function PreviewDashboard() {
  const [ref, inView] = useInViewport(0.25);
  const amount = useCountUp(18450, { start: inView, duration: 1600 });
  return (
    <div ref={ref} className="mkt-browser light" aria-label="Live dashboard preview">
      <div className="mkt-browser-chrome"><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-dot" /><span className="mkt-url">Live dashboard</span></div>
      <div style={{ padding: 26 }}>
        <div className="mkt-card-header"><div><h3 style={{ margin: 0, fontSize: 24 }}>Hillerød Sportsklub</h3><div className="mkt-helper">Aktiv støtte denne måned</div></div><Pill variant="success" icon={<ShieldCheck size={16} />}>Verificeret</Pill></div>
        <div style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', letterSpacing: '-0.05em', fontWeight: 900, marginBottom: 24 }}>{amount.toLocaleString('da-DK')} kr.</div>
        <DistributionChart rows={[{ label: 'Fast støtte', value: '11.200 kr.', percent: 61, color: 'var(--brand-red)' }, { label: 'Donationer', value: '4.800 kr.', percent: 26, color: 'var(--brand-purple)' }, { label: 'Webshop', value: '2.450 kr.', percent: 13, color: 'var(--brand-teal)' }]} />
        <div className="mkt-grid-3" style={{ marginTop: 24 }}><StatTile label="Faste støtter" value="86" /><StatTile label="Donationer" value="42" /><StatTile label="Næste udbetaling" value="28/06" /></div>
        <div className="mkt-transaction-row"><span style={{ color: 'var(--status-success)', fontWeight: 850 }}>Klar til udbetaling</span><strong>18.450 kr.</strong></div>
      </div>
    </div>
  );
}
