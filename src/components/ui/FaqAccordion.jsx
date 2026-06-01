import { useState } from 'react';
import { Plus } from 'lucide-react';

// FaqAccordion - smooth grid-template-rows accordion without scroll jump.
export default function FaqAccordion({ items = [], allowMultiple = false }) {
  const [open, setOpen] = useState([0]);
  const toggle = (index) => setOpen((current) => current.includes(index) ? current.filter((item) => item !== index) : allowMultiple ? [...current, index] : [index]);
  return (
    <div className="mkt-faq">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        return (
          <article key={item.question} className={`mkt-faq-item ${isOpen ? 'open' : ''}`}>
            <button type="button" className="mkt-faq-button" aria-expanded={isOpen} onClick={() => toggle(index)}>
              <span>{item.question}</span><span className="mkt-faq-plus"><Plus size={18} /></span>
            </button>
            <div className="mkt-faq-panel"><div className="mkt-faq-content"><div className="mkt-faq-content-inner">{item.answer}</div></div></div>
          </article>
        );
      })}
    </div>
  );
}
