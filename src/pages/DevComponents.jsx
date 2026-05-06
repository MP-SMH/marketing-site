import {
  ShieldCheck,
  Heart,
  Eye,
  Lock,
  Check,
  Users,
  Star,
  Flag,
  Sparkles,
} from 'lucide-react';

import Container from '../components/marketing/Container';
import Section from '../components/marketing/Section';
import CTA from '../components/marketing/CTA';
import Card from '../components/marketing/Card';
import TrustRow from '../components/marketing/TrustRow';
import Hero from '../components/marketing/Hero';
import Eyebrow from '../components/marketing/Eyebrow';
import HeroOrbs from '../components/marketing/HeroOrbs';

/**
 * DevComponents - storybook-style demo-route for marketing-primitives.
 *
 * Route: /dev/components (HashRouter -> /#/dev/components)
 *
 * Formål:
 *   - Visual approval-mekanisme for alle marketing-komponenter
 *   - Reference til fremtidige page-implementations
 *   - Kontinuerlig regression-test (visuel) under page-rebuilds
 *
 * Strukturen følger build-faser:
 *   1. 001b layout primitives: Container, Section, PageShell footprint
 *   2. 001c visual primitives: CTA, Card, TrustRow, Hero
 *   3. Premium-Pulse helpers: Eyebrow, HeroOrbs (NEW i fix-patch v2)
 */

// Helper: section divider med headline/sub
function DemoSection({ title, description, children, variant = 'light' }) {
  return (
    <Section variant={variant} padding="default">
      <Container>
        <div className="mb-10 border-b border-mk-border-subtle pb-4">
          <p className="text-mk-xs uppercase text-mk-muted tracking-mk-loose font-semibold">
            DevComponents
          </p>
          <h2 className="text-mk-h1 text-mk-heading mt-2 font-semibold">
            {title}
          </h2>
          {description && (
            <p className="text-mk-body text-mk-secondary mt-3 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {children}
      </Container>
    </Section>
  );
}

// Helper: variant label
function VariantLabel({ children, light }) {
  return (
    <span className={
      'block text-mk-xs uppercase tracking-mk-loose font-semibold mb-3 ' +
      (light ? 'text-white/60' : 'text-mk-muted')
    }>
      {children}
    </span>
  );
}

// Mockup-placeholder med premium-Pulse styling
function MockupPlaceholder() {
  return (
    <div className="w-full max-w-md aspect-[4/3] rounded-mk-xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-3 p-8">
      <div className="w-12 h-12 rounded-mk-md bg-white/10 flex items-center justify-center">
        <Sparkles className="text-brand-light" size={24} strokeWidth={2} />
      </div>
      <span className="text-mk-body-sm text-white/60 text-center">
        [Dashboard-mockup placeholder]
      </span>
    </div>
  );
}

export default function DevComponents() {
  return (
    <div className="min-h-screen bg-mk-bg">
      {/* ====================================================
          TOP HEADER (premium-Pulse med subtle decoration)
          ==================================================== */}
      <div className="relative bg-mk-bg-dark text-mk-inverse py-12 overflow-hidden">
        {/* Subtle orb-decoration på top-banner */}
        <HeroOrbs intensity="subtle" showGrid={true} />

        <Container>
          <div className="flex flex-col gap-3 relative z-10">
            <p className="text-mk-xs uppercase text-brand-light tracking-mk-loose font-semibold">
              StøtMedHjerte / Marketing primitives
            </p>
            <h1 className="text-mk-display-mobile md:text-mk-h1 font-semibold tracking-mk-tight leading-[1.1]">
              Component library
            </h1>
            <p className="text-mk-body text-white/80 max-w-2xl leading-relaxed">
              Visual approval-route for marketing-primitives. Tilføjes nye
              komponenter her ved hver atomic patch så visuelt review forbliver
              konsistent på tværs af build-faser.
            </p>
          </div>
        </Container>
      </div>

      {/* ====================================================
          HERO PRIMITIVE (premium-Pulse)
          ==================================================== */}
      <DemoSection
        variant="soft"
        title="Hero - composed pattern"
        description={
          'Outermost element på hver page. Slot-baseret API: eyebrow / title / ' +
          'subtitle / actions / trustRow / mockup / decoration. To layouts: ' +
          'centered (default) og split. Premium-Pulse: pass HeroOrbs som decoration.'
        }
      >
        <div className="flex flex-col gap-12">
          {/* Centered + dark + HeroOrbs (PREMIUM-PULSE Home pattern) */}
          <div>
            <VariantLabel>
              Centered + dark + HeroOrbs (premium-Pulse Home pattern)
            </VariantLabel>
            <div className="rounded-mk-xl overflow-hidden border border-mk-border-subtle">
              <Hero
                variant="dark"
                layout="centered"
                decoration={<HeroOrbs intensity="normal" />}
                eyebrow={
                  <Eyebrow tone="dark" icon={Flag}>
                    Bygget til danske foreninger
                  </Eyebrow>
                }
                title="Bygget til danske foreninger og dem, der støtter dem"
                subtitle="StøtMedHjerte gør det nemmere for danske foreninger at modtage støtte - og for støttere at give på en tryg og gennemsigtig måde. Ved donationer og fast støtte går 80% til foreningen."
                actions={
                  <>
                    <CTA variant="primary" tone="dark" size="lg" href="#foreninger">
                      Læs mere for foreninger
                    </CTA>
                    <CTA variant="secondary" tone="dark" size="lg" href="#hjertesager">
                      Find en forening at støtte
                    </CTA>
                  </>
                }
                trustRow={
                  <TrustRow
                    variant="dark"
                    size="md"
                    items={[
                      { icon: ShieldCheck, label: 'Verificerede foreninger' },
                      { icon: Heart, label: '80% til foreningen' },
                      { icon: Eye, label: 'Gratis at oprette, ingen binding' },
                    ]}
                  />
                }
              />
            </div>
          </div>

          {/* Split + dark + HeroOrbs (Foreninger pattern) */}
          <div>
            <VariantLabel>
              Split + dark + HeroOrbs (Foreninger pattern)
            </VariantLabel>
            <div className="rounded-mk-xl overflow-hidden border border-mk-border-subtle">
              <Hero
                variant="dark"
                layout="split"
                decoration={<HeroOrbs intensity="normal" />}
                eyebrow={
                  <Eyebrow tone="dark">For foreninger</Eyebrow>
                }
                title="Saml støtte ind - uden tunge processer"
                subtitle="Tilmeld jeres forening, vælg støttekanaler, og del jeres link. Vi håndterer det administrative."
                actions={
                  <>
                    <CTA variant="primary" tone="dark" size="md" href="#start">
                      Start gratis
                    </CTA>
                    <CTA variant="tertiary" tone="dark" size="md" href="#priser">
                      Se priser og fordeling
                    </CTA>
                  </>
                }
                mockup={<MockupPlaceholder />}
              />
            </div>
          </div>

          {/* Centered + light (B2C-orienteret) */}
          <div>
            <VariantLabel>Centered + light (B2C-orienteret, ingen decoration)</VariantLabel>
            <div className="rounded-mk-xl overflow-hidden border border-mk-border-subtle">
              <Hero
                variant="light"
                layout="centered"
                eyebrow={<Eyebrow tone="light">Find en forening</Eyebrow>}
                title="Find en forening at støtte"
                subtitle="Verificerede danske foreninger - se hvem der har en aktiv hjertesag lige nu."
                actions={
                  <CTA variant="primary" size="md" href="#hjertesager">
                    Se aktive hjertesager
                  </CTA>
                }
              />
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          EYEBROW PRIMITIVE (NEW)
          ==================================================== */}
      <DemoSection
        variant="light"
        title="Eyebrow - pre-headline pill"
        description={
          'Glassmorphism pill-component over hero H1. Premium-Pulse design ' +
          'med backdrop-blur på dark tone. Optional ikon foran tekst.'
        }
      >
        <div className="flex flex-col gap-8">
          {/* Light tone */}
          <div>
            <VariantLabel>Tone = "light" (på lys baggrund)</VariantLabel>
            <div className="bg-mk-bg p-8 rounded-mk-xl border border-mk-border-subtle flex flex-wrap gap-3">
              <Eyebrow tone="light">Uden ikon</Eyebrow>
              <Eyebrow tone="light" icon={Flag}>
                Med ikon
              </Eyebrow>
              <Eyebrow tone="light" icon={Sparkles}>
                Pre-launch 18. juli 2026
              </Eyebrow>
            </div>
          </div>

          {/* Dark tone */}
          <div>
            <VariantLabel>Tone = "dark" (på mørk baggrund - glassmorphism)</VariantLabel>
            <div className="bg-mk-bg-dark p-8 rounded-mk-xl flex flex-wrap gap-3 relative overflow-hidden">
              <HeroOrbs intensity="subtle" showGrid={false} />
              <div className="relative z-10 flex flex-wrap gap-3">
                <Eyebrow tone="dark">Uden ikon</Eyebrow>
                <Eyebrow tone="dark" icon={Flag}>
                  Bygget til danske foreninger
                </Eyebrow>
                <Eyebrow tone="dark" icon={Sparkles}>
                  Premium-Pulse glassmorphism
                </Eyebrow>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          CTA PRIMITIVE
          ==================================================== */}
      <DemoSection
        variant="soft"
        title="CTA - buttons & links"
        description={
          'Polymorphic: <a> hvis href, ellers <button>. 3 variants × 2 tones × ' +
          '3 sizes. Default ArrowRight icon (lucide-react). Brug tone="dark" på ' +
          'mørke baggrunde for premium-Pulse styling.'
        }
      >
        {/* TONE = LIGHT */}
        <div className="mb-12">
          <VariantLabel>Tone = "light" (default - på lys baggrund)</VariantLabel>

          <div className="bg-mk-bg p-8 rounded-mk-xl border border-mk-border-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="text-mk-body-sm font-semibold text-mk-heading mb-3">Primary</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="primary" size="lg" href="#">Large CTA</CTA>
                  <CTA variant="primary" size="md" href="#">Medium CTA</CTA>
                  <CTA variant="primary" size="sm" href="#">Small CTA</CTA>
                  <CTA variant="primary" size="md" icon={null} href="#">Uden ikon</CTA>
                  <CTA variant="primary" size="md" icon={Heart} iconPosition="left" href="#">
                    Ikon til venstre
                  </CTA>
                </div>
              </div>

              <div>
                <p className="text-mk-body-sm font-semibold text-mk-heading mb-3">Secondary</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="secondary" size="lg" href="#">Large CTA</CTA>
                  <CTA variant="secondary" size="md" href="#">Medium CTA</CTA>
                  <CTA variant="secondary" size="sm" href="#">Small CTA</CTA>
                  <CTA variant="secondary" size="md" icon={null}>Som button</CTA>
                </div>
              </div>

              <div>
                <p className="text-mk-body-sm font-semibold text-mk-heading mb-3">Tertiary (text-link)</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="tertiary" size="lg" href="#">Large text-link</CTA>
                  <CTA variant="tertiary" size="md" href="#">Se priser og fordeling</CTA>
                  <CTA variant="tertiary" size="sm" href="#">Small link</CTA>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TONE = DARK (premium-Pulse) */}
        <div>
          <VariantLabel>Tone = "dark" (på mørk baggrund - premium-Pulse)</VariantLabel>

          <div className="rounded-mk-xl bg-mk-bg-dark p-10 relative overflow-hidden">
            <HeroOrbs intensity="subtle" showGrid={true} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div>
                <p className="text-mk-body-sm font-semibold text-white mb-3">Primary</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="primary" tone="dark" size="lg" href="#">Large CTA</CTA>
                  <CTA variant="primary" tone="dark" size="md" href="#">Medium CTA</CTA>
                  <CTA variant="primary" tone="dark" size="sm" href="#">Small CTA</CTA>
                </div>
              </div>

              <div>
                <p className="text-mk-body-sm font-semibold text-white mb-3">Secondary</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="secondary" tone="dark" size="lg" href="#">Large CTA</CTA>
                  <CTA variant="secondary" tone="dark" size="md" href="#">Medium CTA</CTA>
                  <CTA variant="secondary" tone="dark" size="sm" href="#">Small CTA</CTA>
                </div>
              </div>

              <div>
                <p className="text-mk-body-sm font-semibold text-white mb-3">Tertiary</p>
                <div className="flex flex-col gap-4 items-start">
                  <CTA variant="tertiary" tone="dark" size="lg" href="#">Large text-link</CTA>
                  <CTA variant="tertiary" tone="dark" size="md" href="#">Se priser og fordeling</CTA>
                  <CTA variant="tertiary" tone="dark" size="sm" href="#">Small link</CTA>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          CARD PRIMITIVE (med tone glassmorphism)
          ==================================================== */}
      <DemoSection
        variant="light"
        title="Card - variants × tones"
        description={
          'BRAND-TOKENS Visual Hierarchy + premium-Pulse glassmorphism på dark tone. ' +
          'Hover: 250ms translate + shadow-loft (auto-disabled på soft).'
        }
      >
        {/* TONE = LIGHT */}
        <div className="mb-12">
          <VariantLabel>Tone = "light" (på lys baggrund)</VariantLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="primary" padding="lg" className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-mk-md bg-brand-tint flex items-center justify-center">
                <Star className="text-brand" size={24} strokeWidth={2} />
              </div>
              <h3 className="text-mk-h3 text-mk-heading font-semibold">
                Primary (highlighted)
              </h3>
              <p className="text-mk-body text-mk-secondary">
                Brug primary card til KEY-feature highlight og prominent
                content. Brand-red border 1.5px + shadow-md.
              </p>
              <CTA variant="primary" size="md">Støt nu</CTA>
            </Card>

            <Card variant="secondary" padding="lg" className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-mk-md bg-brand-tint flex items-center justify-center">
                <Users className="text-brand" size={24} strokeWidth={2} />
              </div>
              <h3 className="text-mk-h3 text-mk-heading font-semibold">
                Secondary (regular)
              </h3>
              <p className="text-mk-body text-mk-secondary">
                Brug secondary til regular feature cards, audience-split,
                differentiator-grids, trust-cards. Neutral border + shadow-sm.
              </p>
              <ul className="flex flex-col gap-2 text-mk-body-sm text-mk-body">
                <li className="flex gap-2">
                  <Check className="text-brand flex-shrink-0" size={18} />
                  <span>80% til foreningen ved donationer</span>
                </li>
                <li className="flex gap-2">
                  <Check className="text-brand flex-shrink-0" size={18} />
                  <span>Gratis at oprette, ingen binding</span>
                </li>
              </ul>
              <CTA variant="secondary" size="md">Læs mere</CTA>
            </Card>

            <Card variant="soft" padding="lg" className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Eye className="text-mk-secondary" size={18} strokeWidth={2} />
                <span className="text-mk-body-sm font-semibold text-mk-heading">
                  Soft (informational)
                </span>
              </div>
              <p className="text-mk-body-sm text-mk-secondary leading-relaxed">
                Brug soft card til insight-boxes, mini-tips og lavprioritets-
                informational sections. Ingen border, ingen shadow, ingen
                hover-state - lavprofil-design.
              </p>
            </Card>
          </div>
        </div>

        {/* TONE = DARK (PREMIUM-PULSE GLASSMORPHISM) */}
        <div>
          <VariantLabel>Tone = "dark" (premium-Pulse glassmorphism)</VariantLabel>
          <div className="rounded-mk-xl bg-mk-bg-dark p-10 relative overflow-hidden">
            <HeroOrbs intensity="normal" showGrid={true} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <Card variant="primary" tone="dark" padding="lg" className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-mk-md bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Heart className="text-brand-light" size={24} strokeWidth={2} />
                </div>
                <h3 className="text-mk-h3 text-white font-semibold">
                  Primary (glow)
                </h3>
                <p className="text-mk-body text-white/80">
                  Glassmorphism + subtle brand-glow shadow.
                  Til hero-cards og prominent dark-bg content.
                </p>
                <CTA variant="primary" tone="dark" size="md">Støt nu</CTA>
              </Card>

              <Card variant="secondary" tone="dark" padding="lg" className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-mk-md bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Users className="text-brand-light" size={24} strokeWidth={2} />
                </div>
                <h3 className="text-mk-h3 text-white font-semibold">
                  Secondary (subtle)
                </h3>
                <p className="text-mk-body text-white/80">
                  Mere subtle glassmorphism uden brand-glow. Til regular
                  features på dark sections.
                </p>
                <CTA variant="secondary" tone="dark" size="md">Læs mere</CTA>
              </Card>

              <Card variant="soft" tone="dark" padding="lg" className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Eye className="text-white/60" size={18} strokeWidth={2} />
                  <span className="text-mk-body-sm font-semibold text-white">
                    Soft (lavprofil)
                  </span>
                </div>
                <p className="text-mk-body-sm text-white/70 leading-relaxed">
                  Næsten transparent (white/3) til lavprioritets-info
                  på dark sections. Ingen border, ingen hover.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Padding sizes */}
        <div className="mt-12">
          <VariantLabel>Padding sizes (sm 16px / md 24px / lg 32px)</VariantLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="secondary" padding="sm" hover={false}>
              <p className="text-mk-body-sm text-mk-body">
                <strong>sm</strong> - 16px. Til kompakte cards i tightere grids.
              </p>
            </Card>
            <Card variant="secondary" padding="md" hover={false}>
              <p className="text-mk-body-sm text-mk-body">
                <strong>md</strong> - 24px (default). Til standard-feature cards.
              </p>
            </Card>
            <Card variant="secondary" padding="lg" hover={false}>
              <p className="text-mk-body-sm text-mk-body">
                <strong>lg</strong> - 32px. Til prominent cards med rigt content.
              </p>
            </Card>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          TRUSTROW PRIMITIVE
          ==================================================== */}
      <DemoSection
        variant="soft"
        title="TrustRow - trust-badges"
        description={
          'Horisontal liste af icon + label. To variants (light/dark) og tre ' +
          'sizes (sm/md/lg). Renderet som <ul role="list"> for a11y-konsistens.'
        }
      >
        <div className="flex flex-col gap-10">
          <div>
            <VariantLabel>Light variant (md)</VariantLabel>
            <div className="bg-mk-bg p-8 rounded-mk-xl border border-mk-border-subtle">
              <TrustRow
                variant="light"
                size="md"
                items={[
                  { icon: ShieldCheck, label: 'Verificerede foreninger' },
                  { icon: Heart, label: '80% til foreningen' },
                  { icon: Lock, label: 'GDPR-compliant' },
                  { icon: Check, label: 'Sporbar dokumentation' },
                ]}
              />
            </div>
          </div>

          <div>
            <VariantLabel>Dark variant (md) på premium-Pulse bg</VariantLabel>
            <div className="bg-mk-bg-dark p-8 rounded-mk-xl relative overflow-hidden">
              <HeroOrbs intensity="subtle" showGrid={false} />
              <div className="relative z-10">
                <TrustRow
                  variant="dark"
                  size="md"
                  items={[
                    { icon: ShieldCheck, label: 'Verificerede foreninger' },
                    { icon: Heart, label: '80% til foreningen' },
                    { icon: Eye, label: 'Gratis at oprette, ingen binding' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div>
            <VariantLabel>Sizes (sm / md / lg) - light bg</VariantLabel>
            <div className="bg-mk-bg p-8 rounded-mk-xl border border-mk-border-subtle flex flex-col gap-6">
              <TrustRow
                variant="light"
                size="sm"
                items={[
                  { icon: ShieldCheck, label: 'Small størrelse' },
                  { icon: Heart, label: 'Kompakt' },
                  { icon: Eye, label: 'Tight grids' },
                ]}
              />
              <TrustRow
                variant="light"
                size="md"
                items={[
                  { icon: ShieldCheck, label: 'Medium størrelse' },
                  { icon: Heart, label: 'Default' },
                  { icon: Eye, label: 'De fleste kontekster' },
                ]}
              />
              <TrustRow
                variant="light"
                size="lg"
                items={[
                  { icon: ShieldCheck, label: 'Large størrelse' },
                  { icon: Heart, label: 'Hero placement' },
                  { icon: Eye, label: 'Prominent display' },
                ]}
              />
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          LAYOUT PRIMITIVES (001b)
          ==================================================== */}
      <DemoSection
        variant="light"
        title="Layout primitives (001b)"
        description={
          'Container (max-width wrapper) + Section (bg + vertical padding). ' +
          'Section variants vises som baggrunde i denne page (light / soft / dark). ' +
          'Container styrer indre bredde.'
        }
      >
        <div className="flex flex-col gap-6">
          <div>
            <VariantLabel>Container - default (1200px)</VariantLabel>
            <div className="bg-mk-bg-soft border border-mk-border-subtle rounded-mk-xl py-6">
              <Container>
                <div className="bg-brand-tint text-brand text-center py-3 rounded-mk-md text-mk-body-sm">
                  Container size="default" → max-w-[1200px]
                </div>
              </Container>
            </div>
          </div>

          <div>
            <VariantLabel>Container - narrow (768px)</VariantLabel>
            <div className="bg-mk-bg-soft border border-mk-border-subtle rounded-mk-xl py-6">
              <Container size="narrow">
                <div className="bg-brand-tint text-brand text-center py-3 rounded-mk-md text-mk-body-sm">
                  Container size="narrow" → max-w-[768px] (legal/focused)
                </div>
              </Container>
            </div>
          </div>

          <div>
            <VariantLabel>Container - wide (1536px)</VariantLabel>
            <div className="bg-mk-bg-soft border border-mk-border-subtle rounded-mk-xl py-6">
              <Container size="wide">
                <div className="bg-brand-tint text-brand text-center py-3 rounded-mk-md text-mk-body-sm">
                  Container size="wide" → max-w-[1536px] (full-bleed hero)
                </div>
              </Container>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* ====================================================
          FOOTER (premium-Pulse status)
          ==================================================== */}
      <Section variant="dark" padding="default" className="relative overflow-hidden">
        <HeroOrbs intensity="subtle" showGrid={true} />
        <Container>
          <div className="flex flex-col gap-3 relative z-10 text-mk-inverse">
            <h2 className="text-mk-h2 font-semibold text-white">End of components</h2>
            <p className="text-mk-body text-white/80 max-w-2xl">
              Når nye komponenter tilføjes (P2-MARKETING-BUILD-001d
              Navbar/Footer, samt page-rebuilds), tilføjes de her som nye
              DemoSections.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Eyebrow tone="dark" icon={Check}>001a foundation</Eyebrow>
              <Eyebrow tone="dark" icon={Check}>001b layout</Eyebrow>
              <Eyebrow tone="dark" icon={Check}>001c visuals</Eyebrow>
              <Eyebrow tone="dark">001d navbar+footer pending</Eyebrow>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
