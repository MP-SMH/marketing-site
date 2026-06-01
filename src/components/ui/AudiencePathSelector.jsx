import { useState } from 'react';
import { ArrowRight, CheckCircle, Heart, Users } from 'lucide-react';
import Button from './Button';
import Tabs from './Tabs';

const views = {
  forening: {
    surface: 'teal',
    icon: <Users size={28} />,
    title: 'For foreninger der vil samle støtte uden tung administration',
    body: 'Opret jeres forening gratis, bliv verificeret og modtag støtte fra medlemmer, familie og lokalområdet - samlet ét sted.',
    bullets: ['80% går til foreningen ved donationer og fast støtte', 'Dokumentation, udbetaling og overblik samlet', 'Gratis at starte og ingen binding'],
    cta: 'Start gratis som forening'
  },
  stoetter: {
    surface: 'purple',
    icon: <Heart size={28} />,
    title: 'For støttere der vil give trygt og gennemsigtigt',
    body: 'Find verificerede foreninger, vælg hvordan du vil støtte og følg dine bidrag direkte i din profil.',
    bullets: ['Støt med engangsbeløb, fast støtte eller webshop', 'Se kvitteringer og historik samlet', 'Vælg en forening du allerede tror på'],
    cta: 'Find en forening at støtte'
  }
};

// AudiencePathSelector - interactive dual audience selector.
export default function AudiencePathSelector() {
  const [active, setActive] = useState('forening');
  const view = views[active];
  return (
    <div className={`mkt-audience mkt-surface-${view.surface}`}>
      <Tabs variant="segmented" value={active} onChange={setActive} items={[{ value: 'forening', label: 'For foreninger' }, { value: 'stoetter', label: 'For støttere' }]} />
      <div className="mkt-audience-body">
        <div className="mkt-audience-panel" key={active}>
          <span className="mkt-icon-box">{view.icon}</span>
          <h3>{view.title}</h3>
          <p>{view.body}</p>
          <ul className="mkt-bullet-list">{view.bullets.map((bullet) => <li key={bullet}><CheckCircle size={18} />{bullet}</li>)}</ul>
          <Button iconRight={<ArrowRight size={18} />}>{view.cta}</Button>
        </div>
        <div className="mkt-visual-box"><DashboardMini active={active} /></div>
      </div>
    </div>
  );
}

function DashboardMini({ active }) {
  return (
    <div className="mkt-card" style={{ width: '100%', maxWidth: 420 }}>
      <div className="mkt-card-header"><strong>{active === 'forening' ? 'Forenings-overblik' : 'Min støtte'}</strong><span className="mkt-pill">Live</span></div>
      <div className="mkt-distribution"><div className="mkt-bar-row" style={{ gridTemplateColumns: '1fr 2fr auto' }}><span className="mkt-bar-label">Denne måned</span><span className="mkt-bar-track"><span className="mkt-bar-fill" style={{ width: active === 'forening' ? '78%' : '48%' }} /></span><strong>{active === 'forening' ? '18.450 kr.' : '300 kr.'}</strong></div></div>
    </div>
  );
}
