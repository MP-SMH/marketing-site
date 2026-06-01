import { useEffect, useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import Button from './Button';
import Container from './Container';

// TopNavigation - sticky marketing navigation with scroll glass.
export default function TopNavigation() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`mkt-nav ${scrolled ? 'scrolled' : ''}`}>
      <Container className="mkt-nav-inner">
        <a href="#/" className="mkt-logo" aria-label="StøtMedHjerte forside"><span className="mkt-logo-mark"><Heart size={18} fill="currentColor" /></span>StøtMedHjerte</a>
        <nav className="mkt-nav-links" aria-label="Primær navigation">
          <a href="#foreninger">For foreninger</a>
          <a href="#pengestroemmen">Sådan virker det</a>
          <a href="#pris">Priser</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="mkt-nav-actions"><Button variant="secondary" size="sm">Log ind</Button><Button size="sm" iconRight={<ArrowRight size={16} />}>Start gratis</Button></div>
      </Container>
    </header>
  );
}
