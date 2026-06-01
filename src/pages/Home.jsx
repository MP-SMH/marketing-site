/**
 * Home.jsx (v6)
 *
 * Marketing-site homepage composer.
 * Sektioner per wireframe-home.md v1.1 (CMO-godkendt 5/5 2026):
 *   1. Hero (dark) - solid floating + dashboard, animated mesh, aurora glow, 3D perspective
 *   2. Audience-split (light) - 2 cards med headline + intro
 *   3. Sådan virker det (3 trin) - light premium polish
 *   4. Hvorfor anderledes (4 differentiatorer)
 *   5. Trust og sikkerhed (light, 4 cards)
 *   6. Mød personen bag StøtMedHjerte
 *   7. Final CTA (dark, dual routing)
 */

import TopNavigation from '../components/marketing/TopNavigation';
import HeroSection from '../components/marketing/HeroSection';
import AudiencePathSection from '../components/marketing/AudiencePathSection';
import SaadanVirkerDetSection from '../components/marketing/SaadanVirkerDetSection';
import HvorforAnderledesSection from '../components/marketing/HvorforAnderledesSection';
import TrustSikkerhedSection from '../components/marketing/TrustSikkerhedSection';
import MoedMarioSection from '../components/marketing/MoedMarioSection';
import FinalCTASection from '../components/marketing/FinalCTASection';
import MarketingFooter from '../components/marketing/MarketingFooter';

export default function Home() {
  return (
    <div className="mkt-home">
      <TopNavigation />
      <main>
        <HeroSection />
        <AudiencePathSection />
        <SaadanVirkerDetSection />
        <HvorforAnderledesSection />
        <TrustSikkerhedSection />
        <MoedMarioSection />
        <FinalCTASection />
      </main>
      <MarketingFooter />

      <style>{`
        .mkt-home {
          min-height: 100vh;
          background: #fff;
        }
      `}</style>
    </div>
  );
}
