import { Quote } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';

// Testimonials - founder/trust quotes until customer proof is public.
export default function Testimonials() {
  return (
    <Section variant="light" title="Skabt til de mennesker der får foreningslivet til at fungere" subtitle="SMH er bygget med fokus på bestyrelsens hverdag, ikke på mere administration.">
      <div className="mkt-grid-3">{['Overblik før kompleksitet', 'Tryghed før vækst', 'Dokumentation før markedsføring'].map((title) => <Card key={title}><Quote color="var(--mkt-primary)" /><h3>{title}</h3><p className="mkt-helper">En platform skal gøre arbejdet lettere for frivillige - ellers er den bare endnu et system.</p></Card>)}</div>
    </Section>
  );
}
