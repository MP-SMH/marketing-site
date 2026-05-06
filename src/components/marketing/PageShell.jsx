import { forwardRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * PageShell - outer wrapper for marketing-pages.
 *
 * Anvendelse: Roden af alle marketing-pages. Renderer Navbar (top),
 * main-content (children), og Footer (bund) i en flex-column layout
 * der sikrer footer altid er ved bunden af viewport.
 *
 * Inkluderer:
 *   - Skip-to-content link (WCAG 2.1 AA tilgaengelighed for keyboard-users)
 *   - main-content med id="main-content" som skip-link target
 *   - min-height: 100vh for at fylde viewport
 *   - flex-column for sticky footer pattern
 *   - bg-mk-bg som default page-baggrund (light theme)
 *
 * Slot-pattern: navbar og footer kan overrides via props for at
 * supportere edge-cases (auth-pages uden navbar, dev-routes, etc.).
 * Default: bruger eksisterende Navbar + Footer fra Pulse-aera
 * (rebuilds i P2-MARKETING-BUILD-001d).
 *
 * Props:
 *   - navbar: ReactNode (default: <Navbar />) - pass null for at skjule
 *   - footer: ReactNode (default: <Footer />) - pass null for at skjule
 *   - className: ekstra Tailwind classes paa root-div
 *   - children: page-content (typisk en raekke Sections)
 *
 * Eksempel:
 *   <PageShell>
 *     <Section variant="dark" padding="generous">
 *       <Container>{HeroContent}</Container>
 *     </Section>
 *     <Section variant="light">
 *       <Container>{MainContent}</Container>
 *     </Section>
 *   </PageShell>
 *
 * Hide navbar/footer (eks. for landing-pages eller auth):
 *   <PageShell navbar={null} footer={null}>
 *     {content}
 *   </PageShell>
 */

const PageShell = forwardRef(function PageShell(
  {
    navbar,
    footer,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  // Default-fallback hvis navbar/footer ikke er eksplicit sat
  // (undefined vs null - null skjuler, undefined giver default)
  const navbarSlot = navbar === undefined ? <Navbar /> : navbar;
  const footerSlot = footer === undefined ? <Footer /> : footer;

  return (
    <div
      ref={ref}
      className={`min-h-screen flex flex-col bg-mk-bg ${className}`.trim()}
      {...rest}
    >
      {/* Skip-to-content link for keyboard-users (WCAG 2.1 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-mk-md focus:shadow-brand-md focus:font-medium"
      >
        Spring til hovedindhold
      </a>

      {navbarSlot}

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      {footerSlot}
    </div>
  );
});

export default PageShell;
