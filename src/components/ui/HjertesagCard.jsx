import { ArrowRight, Heart, MapPin } from 'lucide-react';
import Button from './Button';
import Card from './Card';
import Pill from './Pill';

// HjertesagCard - card for association/cause grid.
export default function HjertesagCard({ title, location, amount, image, category = 'Forening' }) {
  return (
    <Card interactive>
      <div style={{ height: 150, borderRadius: 18, background: image ? `url(${image}) center/cover` : 'linear-gradient(135deg, var(--brand-red-soft), var(--surface-soft))', marginBottom: 18 }} />
      <Pill icon={<Heart size={15} />}>{category}</Pill>
      <h3 style={{ margin: '14px 0 8px' }}>{title}</h3>
      <div className="mkt-helper" style={{ display: 'flex', gap: 7, alignItems: 'center' }}><MapPin size={15} />{location}</div>
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><strong>{amount}</strong><Button variant="tertiary" iconRight={<ArrowRight size={16} />}>Se hjertesag</Button></div>
    </Card>
  );
}
