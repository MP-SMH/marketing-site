import Navbar from '../components/marketing/Navbar';
import HeroSection from '../components/marketing/HeroSection';

import ProblemSection from '../components/marketing/ProblemSection';
import ThreeWaysSection from '../components/marketing/ThreeWaysSection';
import HowItWorksSection from '../components/marketing/HowItWorksSection';
import PlatformShowcase from '../components/marketing/PlatformShowcase';
import SocialProofSection from '../components/marketing/SocialProofSection';
import PricingSection from '../components/marketing/PricingSection';
import ComplianceSection from '../components/marketing/ComplianceSection';
import CTASection from '../components/marketing/CTASection';
import Footer from '../components/marketing/Footer';
import MarketingAnimations from '../components/marketing/MarketingAnimations';

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <MarketingAnimations />
      <Navbar />
      <HeroSection />

      <ProblemSection />
      <ThreeWaysSection />
      <HowItWorksSection />
      <PlatformShowcase />
      <SocialProofSection />
      <PricingSection />
      <ComplianceSection />
      <CTASection />
      <Footer />
    </div>
  );
}