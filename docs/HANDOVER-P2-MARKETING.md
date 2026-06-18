# HANDOVER: P2-MARKETING-BUILD (Marketing Site)

**Created:** 6. maj 2026
**Project:** StøtMedHjerte (SMH) marketing-site
**Repository:** `~/Desktop/marketing-site` (GitHub: `MP-SMH/marketing-site`)
**Domain:** stotmedhjerte.dk (production domain, currently Base44-hosted)
**Status:** Foundation + Visuals + Stage A merged til main. Stage B1 in progress. Stage C deferred. Mario stopper.
**Launch deadline:** 18. juli 2026 (73 dage) - subset af samlet SMH platform launch

---

## Executive Summary

Marketing-site er en separat React/Vite app der erstatter den Base44-hostede `stotmedhjerte.dk` ved launch. Status:

- **Foundation komplet** (tokens, marketing-base, tailwind config) - 1b379fa
- **Layout primitives komplet** (Container, Section, PageShell) - merged
- **Visual primitives komplet** (Hero, CTA, Card, TrustRow, Eyebrow, HeroOrbs) - ceaabd3 -> a28bf10
- **Stage A polish komplet** (10 quick wins fra ChatGPT audit Tier 1) - e715f4a -> b48323e
- **Stage B1 partial** (Inter Tight + Inter installed, sed-fix pending visual approval, ikke committed)
- **Stage C deferred** (audience split, dashboard mockup, trust stack, home rebuild)
- **Other pages deferred** (alle 13 pages udover Home: Foreninger, Hjertesager, Kontakt, etc)

ChatGPT UX/UI audit gav score 7/10 med konkret 10/10 roadmap. Stage A løftede til ~8/10. Stage B-C var planlagt at løfte til 10/10.

Mario stoppede sessionen pga. ineffektiv arbejdsmetode (patch-baseret chat-flow er ikke skalerbart for 14-page site).

---

## Repository structure

```
~/Desktop/marketing-site/
├── src/
│   ├── App.jsx                           # Routing setup
│   ├── pages/
│   │   ├── Home.jsx                      # Eksisterende landing (skal rebuildes til 10/10)
│   │   ├── DevComponents.jsx             # /dev/components showcase route
│   │   └── [13 other pages deferred]
│   ├── components/
│   │   └── marketing/
│   │       ├── Hero.jsx                  # ✅ DONE - centered/split layouts
│   │       ├── CTA.jsx                   # ✅ DONE - 3 variants × 2 tones × 3 sizes
│   │       ├── Card.jsx                  # ✅ DONE - 3 variants × 2 tones
│   │       ├── TrustRow.jsx              # ✅ DONE - light/dark, 3 sizes
│   │       ├── Eyebrow.jsx               # ✅ DONE - glassmorphism pill
│   │       ├── HeroOrbs.jsx              # ✅ DONE - decoration (3 intensities)
│   │       ├── Container.jsx             # ✅ DONE - 3 sizes (1200/768/1536)
│   │       ├── Section.jsx               # ✅ DONE - 3 padding variants
│   │       └── PageShell.jsx             # ✅ DONE - wrapper
│   └── styles/
│       ├── tokens.css                    # ✅ Updated through Stage A + B1
│       ├── marketing-base.css            # ✅ Updated through B1 (h1-h6 fix re-applied via sed)
│       └── [other styles]
├── tailwind.config.js                    # ✅ DONE - extends fontFamily, colors
├── package.json
└── [other config]
```

### Branch state
```
main (b48323e):
  - Foundation 001a
  - Layout primitives 001b
  - Visual primitives 001c (ceaabd3 -> a28bf10)
  - Stage A foundation polish (e715f4a -> b48323e)

feat/p2-marketing-build-002a-home-rebuild:
  - Branched fra main at b48323e
  - Stage B1 typography installed (Inter Tight + Inter via Google Fonts)
  - Sed-fix for h1-h6 color rule pending visual approval
  - Ikke committed
```

### Backups på system
- `.backup-pre-fix-v2/` - 001c visuals rollback
- `.backup-stage-a/` - Stage A rollback
- `.backup-b1/` - B1 rollback

---

## Tech stack

- **Framework:** React 18 + Vite + React Router (HashRouter)
- **Styling:** Tailwind CSS v3 + CSS variables (custom design tokens)
- **Components:** Custom component library (NOT shadcn/ui på marketing-site - shadcn er på smh-app)
- **Fonts:** Inter Tight (heading) + Inter (body) via Google Fonts (B1 in progress) + Elza Round Variable (logo)
- **Dev port:** localhost:5175
- **Routes:** HashRouter (`/#/path`) - keeps URL structure flexible for static hosting

### Build & dev
```bash
npm run dev      # Vite dev server localhost:5175
npm run build    # Production build til dist/
npm run preview  # Preview production build
```

### Hosting target
TBD - sandsynligvis Vercel/Netlify static hosting når marketing-site replaces Base44.

---

## Design system: Premium-Pulse

### Filosofi
"Premium fintech precision møder dansk forenings-warmth." Inspiration:
- **Stripe** (typografi + spacing)
- **Linear** (komponent-precision + dark mode)
- **Mercury** (trust som produktlag)
- **Anti-pattern**: Generic SaaS-template feel

### Brand tokens (LÅST - ændres ikke)

```css
/* Primary brand */
--brand-red: #E0193F;        /* Primær brand color, CTA, accent */
--brand-light: #FF4D6A;      /* Hover/light variant */
--brand-tint: #FCE4E9;       /* Subtle red bg (light mode hover) */

/* Dark mode */
--dark-bg: #0F172A;          /* Hero/dark section background */

/* Light mode */
--mk-bg: #FFFFFF;
--mk-secondary: #475569;     /* Body text på light bg */
--text-heading: #0F172A;     /* H1-H6 på light bg */
```

### Typografi system (efter Stage A + B1)

```css
/* Font families (efter B1) */
--font-heading: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-logo:    "Elza Round Variable", "Inter Tight", system-ui, sans-serif;
--font-mono:    "SF Mono", Menlo, Monaco, monospace;

/* Sizes (efter Stage A) */
--text-display: 60px / 38px (mobile);   /* Hero H1 */
--text-h1:      44px;                   /* Section H1 */
--text-h2:      30px;                   /* Section H2 */

/* Tracking (efter Stage A) */
--tracking-display: -0.035em;
--tracking-h1:      -0.025em;
--tracking-body:    -0.005em;
```

### Tone matrix (light/dark) på alle komponenter
Hver komponent har:
- `tone="light"` for white-bg sections
- `tone="dark"` for dark-bg sections (hero, CTAs)

Tokens og classes adapter automatisk.

### Glassmorphism (dark tone only)
```css
bg-white/[0.04 til 0.10]       /* Subtle white overlay */
border-white/[0.12 til 0.28]   /* Subtle border */
backdrop-blur-md eller -xl     /* Blur backdrop */
```

### Hover transitions
- Standard: 250ms (BRAND-TOKENS standard)
- Cubic-bezier: `cubic-bezier(0.16, 1, 0.3, 1)` (premium ease-out)

### Brand-glow shadows (kontrolleret)
```css
/* Primary CTA dark base */
shadow-[0_10px_28px_rgba(224,25,63,0.26)]

/* Primary CTA dark hover */
shadow-[0_14px_34px_rgba(224,25,63,0.30)]

/* Card dark hover */
shadow-[0_20px_60px_rgba(224,25,63,0.20)]
```

Max 0.30 opacity - aldrig over (mister "premium" feel og bliver "kampagneagtigt").

---

## Komponent-bibliotek (alle DONE)

### `<Hero>` - centered/split layouts

```jsx
<Hero
  tone="dark"                    // light | dark
  layout="centered"              // centered | split
  eyebrow={<Eyebrow>...</Eyebrow>}
  heading="Hovedoverskrift"
  subtitle="Underrubrik"
  primaryCta={<CTA>...</CTA>}
  secondaryCta={<CTA>...</CTA>}
  trustRow={<TrustRow>...</TrustRow>}
  mockup={<Mockup />}            // Only for split layout
  orbs="normal"                  // subtle | normal | strong (dark only)
/>
```

**Stage A specs:**
- H1 max-width: 920px (centered) / 620px (split)
- H1 leading: 1.04
- Subtitle max-width: 720px (centered) / 560px (split)
- Subtitle leading: 1.55
- Subtitle dark: text-slate-300

### `<CTA>` - polymorphic button/link

```jsx
<CTA
  variant="primary"              // primary | secondary | ghost
  tone="dark"                    // light | dark
  size="lg"                      // sm | md | lg
  href="/start"                  // Optional - renders <a> if provided
  onClick={handler}              // Optional - renders <button>
>
  Start gratis
</CTA>
```

**Stage A specs:**
- Primary dark base shadow: `[0_10px_28px_rgba(224,25,63,0.26)]`
- Primary dark hover glow: `0.30`
- Secondary light: `border border-brand/35` + hover `bg-brand-tint`
- Secondary dark: `bg-white/[0.04] border-white/[0.16]` + backdrop-blur-md
- Active scale: `0.99`

### `<Card>` - 3 variants × 2 tones

```jsx
<Card
  variant="primary"              // primary | secondary | ghost
  tone="light"                   // light | dark
  hover                          // optional - enables hover effect
>
  {children}
</Card>
```

**Stage A specs:**
- Hover: `translate-y-1`
- Primary dark hover brand-glow: `0.20`

### `<TrustRow>` - logo strip

```jsx
<TrustRow
  tone="dark"                    // light | dark
  size="md"                      // sm | md | lg
  items={[
    { name: "...", logo: <Logo /> },
    ...
  ]}
/>
```

A11y: `role="list"` på row.

### `<Eyebrow>` - glassmorphism pill

```jsx
<Eyebrow tone="dark">
  TILMELD DIN FORENING
</Eyebrow>
```

**Stage A specs:**
- Dark: `bg-white/[0.07] border-white/[0.12] backdrop-blur-xl`

### `<HeroOrbs>` - decoration

```jsx
<HeroOrbs intensity="normal" />  // subtle | normal | strong
```

3 brand-red radial gradients absolut positioneret. **Stage A specs:**
- Normal: `0.20 / 0.12 / 0.025`
- Strong: `0.32 / 0.20 / 0.035`
- Subtle: `0.12 / 0.08 / 0.018`

### `<Container>`
3 sizes: `narrow` (768) | `default` (1200) | `wide` (1536)

### `<Section>`
3 padding variants: `compact` | `normal` | `spacious`

### `<PageShell>`
Wrapper for entire pages. TBD: senere udvidet med navbar + footer slots.

---

## ChatGPT audit-feedback summary

### Audit kontekst
- Uploaded SMH-CHATGPT-AUDIT.md (80KB) til ChatGPT
- 12 kildefiler embedded
- Rolle: "Head of UX/UI Design" (Stripe/Linear/Mercury kaliber)
- Krav: Honest brutal feedback + konkret roadmap

### Score 7/10 - hvad fungerer
- Premium-Pulse design system intakt
- Glassmorphism well-executed
- Tone matrix korrekt designet
- Component-library struktur solid

### Score 7/10 - hvorfor ikke 10/10
1. **"Demo component library" feel**, ikke "commercial landing page precision"
2. **Hero** taler kun til B2B, mangler B2C-warmth
3. **Trust** elementer feel som decoration, ikke produktlag
4. **Mangler ægte dashboard mockup** (kun placeholder)
5. **Typografi for "app-agtigt"** (SF Pro Rounded), ikke premium SaaS
6. **Mangler conversion architecture** (single-CTA, ingen audience split)

### 10/10 plan: 5 store løft

#### 1. Hero som conversion-machine
- **Ny copy:** "Modtag støtte. Uden tung administration."
- **Subtitle:** Conversion-fokuseret (ikke generic)
- **Single primary CTA** (ikke dual)
- **Trust-anchor under CTA** (ikke logo-row decoration)

#### 2. Dual path under hero (audience split)
- **2 cards med negative-margin overlap** hero (kommer "ind i" hero)
- **For foreninger** (B2B): Bestyrelses/kasserer 30-65, køber konkrete tal + verificerbare claims + lav risiko. Goal: "Start gratis"
- **For støttere** (B2C): 25-65, MobilePay-bruger, køber 80%-synlighed + trust + lokal forankring. Goal: "Find en forening at støtte"
- Each card med icon + headline + subline + CTA

#### 3. Trust som produktlag (ikke decoration)
- **4 pillars** på dedikeret hvid bg sektion (Mercury-style):
  1. **80% til foreningen** - "På Fast Støtte og Donationer går 80% direkte til foreningen"
  2. **Verificerede foreninger** - "Alle foreninger Creditro KYC-verificeret før godkendelse"
  3. **Automatisk bogføring** - "Donationer og udbetalinger bogføres automatisk i Dinero"
  4. **Dansk compliance** - "GDPR + dansk indsamlingsregulering by default"
- Specific tal (ikke generic claims)
- Iconography matchet til brand

#### 4. Ægte dashboard-mockup
- **Forening:** Nordsjællands Svømmeklub (fictive data)
- **Aktiv støtte:** 18.450 kr.
- **Faste støttere:** 127
- **Donationer:** 42
- **Webshop overskud:** 6.280 kr.
- **Næste udbetaling:** 28. juli
- **Status:** Verificeret (med checkmark)
- Premium fintech-design (Mercury/Linear-niveau)

#### 5. Premium typografi
- **Inter Tight** (heading) + **Inter** (body) via Google Fonts
- Replace SF Pro Rounded
- Større x-height + tighter geometric feel = mere SaaS, mindre app
- B1 START IMPLEMENTERET (Stage B1 in progress)

### 5 faser
1. **Foundation polish (Stage A)** - 7/10 -> 8/10 ✅ DONE
2. **Conversion architecture (Stage B+C)** - 8/10 -> 9/10 ⏸️ DEFERRED
3. **Premium product storytelling (Stage D)** - 9/10 -> 9.5/10 ⏸️ DEFERRED
4. **Social proof (Stage E)** - 9.5/10 -> 9.8/10 ⏸️ DEFERRED
5. **Motion (Stage F)** - 9.8/10 -> 10/10 ⏸️ DEFERRED

---

## Defererede tasks (struktureret)

### Stage B - Typography + animation foundation

#### B1: Inter Tight + Inter font integration ⏸️ IN PROGRESS
**Status:** Filer skrevet til feat-branch, sed-fix pending visual approval, ikke committed.

**Pending action:**
```bash
cd ~/Desktop/marketing-site && \
sed -i '' '/^  color: var(--text-heading);$/d' src/styles/marketing-base.css && \
grep -c "color: var(--text-heading)" src/styles/marketing-base.css
# Forventet: 0
```

Derefter visual verify Inter Tight rendering + H1 hvid på dark hero. Hvis OK: commit B1 til branch.

**Commit message draft:**
```
refactor(marketing): premium typografi (Inter Tight + Inter)

- Google Fonts @import for Inter Tight 400/500/600/700 + Inter 400/500/600
- font-display: swap (no FOIT)
- tokens.css font-families opdateret
- Re-apply h1-h6 color removal fix (samme som Phase 1 sed-fix)

2 filer (eller 3 hvis sed-fix counted)
```

#### B2: Hero reveal animation system ⏸️ DEFERRED

```css
@keyframes heroReveal {
  from {
    opacity: 0;
    transform: translateY(12px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.hero-reveal {
  animation: heroReveal 700ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
```

Stagger delays:
- Eyebrow: 0ms
- H1: 80ms
- Subtitle: 160ms
- CTA: 240ms
- TrustRow: 320ms
- Mockup: 400ms

### Stage C - Section primitives + Home rebuild

#### C1: Section primitives ⏸️ DEFERRED (~60 min)

Nye komponenter at bygge:

**`<AudiencePathCards>`**
- 2 cards: For foreninger / For støttere
- Negative-margin overlap med hero (`-mt-24` eller similar)
- Each card: icon + headline + subline + CTA
- Tone-aware (kommer ud af dark hero ind i light section)

**`<TrustStack>`**
- 4 pillars: 80% til foreningen, Verificerede foreninger, Automatisk bogføring, Dansk compliance
- Mercury-style hvid bg sektion
- Iconography matchet til brand
- Specific tal (ikke generic claims)

**`<ProductChannels>`**
- 3 channels: Donationer 80%, Fast støtte 80%, Webshop 32,75%
- Visual representation af pricing-model
- Fee/split breakdown

**`<PreLaunchProof>`**
- "Åbner 18. juli 2026"
- Pre-launch trust signals
- Maybe newsletter signup

**`<FAQ>`**
- Accordion eller similar
- 6-10 mest stillede spørgsmål
- Tone-aware

**`<FinalCTA>`**
- Conversion-machine sektion bunden af page
- Strong primary CTA + secondary
- Backed by trust elements

#### C2: Real dashboard mockup ⏸️ DEFERRED (~60 min)

**`<DashboardMockup>`**
- Premium fintech-design
- Nordsjællands Svømmeklub fictive data
- Mock data:
  - Aktiv støtte: 18.450 kr.
  - Faste støttere: 127
  - Donationer: 42
  - Webshop overskud: 6.280 kr.
  - Næste udbetaling: 28. juli
  - Status: Verificeret
- Multiple cards/charts
- Premium typography (Inter Tight)
- Subtle shadows + glassmorphism

#### C3: Home page rebuild ⏸️ DEFERRED (~30 min)

**`src/pages/Home.jsx`** - Replace existing med 10 sektioner:

1. **Hero** (centered, dark, ny copy: "Modtag støtte. Uden tung administration.")
2. **Dual path** (AudiencePathCards med negative-margin overlap)
3. **Trust stack** (TrustStack med 4 pillars)
4. **Hvordan det virker** (3-step flow)
5. **Dashboard mockup** (DashboardMockup section)
6. **3 indtægtskanaler** (ProductChannels)
7. **Social proof** (Testimonials eller pre-launch signals)
8. **Pricing/fordeling** (ADAM 2.0 transparency)
9. **FAQ** (FAQ component)
10. **Final CTA** (FinalCTA component)

### Other deferred tasks

#### P2-MARKETING-BUILD-001d: Navbar + Footer ⏸️ DEFERRED
- Navbar med logo, nav links, login CTA
- Footer med columns: Produkt, Foreninger, Selskab, Legal
- Sticky-on-scroll navbar
- Mobile hamburger menu

#### P2-MARKETING-BUILD-002b til 002n: Other pages ⏸️ DEFERRED

13 pages udover Home:
- `/foreninger` - For foreninger landing
- `/foreninger/start` - Onboarding flow start
- `/stoetter` - For støttere landing
- `/hjertesager` - Cause directory
- `/hjertesager/[slug]` - Cause detail page
- `/foreninger/[slug]` - Forening profile page
- `/webshop` - Webshop information
- `/fast-stoette` - Fast Støtte information
- `/donationer` - Donationer information
- `/om` - Om SMH
- `/kontakt` - Kontakt
- `/blog` - Blog landing (TBD)
- `/legal` - Persondatapolitik, Vilkår, Cookies

Each page kræver:
- Wireframe (use existing wireframe-home.md som template)
- Content (Mario forfatter)
- Component composition
- SEO metadata
- A11y review

---

## Workflow lessons learned

### Hvad fungerede IKKE i denne session
1. **`~/Downloads` som mellemstation**
   - Browser cache invalidation issues
   - Filenames blev `(1).jsx`, `(2).jsx`
   - Manual `cp` step bryder atomicity

2. **Working-dir drift**
   - Min `/home/claude/v3/` mirror var ikke synced med main efter `sed`-fixes
   - Samme h1-h6 color bug skete 2 gange

3. **Patches uden visual review før commit**
   - Stage A `isSplit` bug var ikke caught før install (whiteboard fejl)

4. **Multi-file embedded scripts**
   - Stage A var 6 filer i én patch - hard at debug
   - Når én fil fejler, breaker hele patchen

5. **Terminal markdown auto-link**
   - `install-b1.py` blev til `[install-b1.py](http://install-b1.py)` i terminal output

6. **Async screenshot validation**
   - Mario skal sende screenshots, jeg kan ikke teste browser
   - Round-trip latency på minutter per validation

### Hvad fungerede I denne session
1. **All-in-one base64-embedded scripts**
   - Single fil at downloade
   - Alle changes atomic
   - Idempotent

2. **Pre-flight rollback detection**
   - CTA.jsx 4230 bytes detect fanger reverted state

3. **Atomic backup pattern**
   - `.backup-pre-fix-v2`, `.backup-stage-a`, `.backup-b1`
   - Single command rollback

4. **Assertions per patch**
   - 50+ assertions catches bugs tidligt
   - Critical guards (forbidden-list checks)

5. **Python heredoc for multi-line edits**
   - zsh-safe på macOS

6. **`git commit -F file` + `gh pr create + merge --merge --delete-branch` chain**
   - Single command flow
   - Markdown auto-link avoided i commits

---

## Anbefalinger til ny tilgang

### Option A: Direct git workflow med visual editor (anbefalet for denne use case)

**Setup:**
- Mario bruger Cursor/VS Code med Claude/Copilot integration
- Direkte file-edits i editor
- Live browser preview (Vite hot-reload)
- Visual review under typing
- Commit via git CLI

**Fordele:**
- Ingen Downloads-mellemstation
- Ingen working-dir sync issues
- Browser preview real-time
- Mario har full control

**Ulemper:**
- Mario skal være comfortable i editor
- Mister CTO-strategy guidance fra dedicated AI partner

### Option B: Storybook-first development

**Setup:**
- Storybook for component library
- Iterér komponenter isoleret
- Page composition kun efter components are stable

**Fordele:**
- Component-iteration uden page-refresh
- Better design system testing
- Visual regression testing möjligt

**Ulemper:**
- Setup overhead
- Endnu et tool to maintain

### Option C: Continue patch-based med strenger constraints

**Hvis fortsætte patch-based:**
1. **Mindre patches** - max 2-3 filer
2. **Visual approval REQUIRED** før commit (no exceptions)
3. **Working-dir sync** før hver patch (read main-branch first)
4. **Test mentalt** - syntax + imports + Tailwind classes
5. **Idempotency check** - patch detect if already applied
6. **Rollback path** - backup before write

---

## Næste konkrete skridt for fortsættelse

### Fase 1: Resolve B1 typography (15-30 min)

```bash
# 1. Verify B1 sed-fix kørt
cd ~/Desktop/marketing-site
grep -c "color: var(--text-heading)" src/styles/marketing-base.css
# Forventet: 0 (hvis ikke 0, kør sed-kommandoen)

# 2. Vite restart + visual verify
# Tab 1: Ctrl+C, npm run dev
# Browser: hard reload localhost:5175/#/dev/components
# Verify Inter Tight rendering + H1 hvid på dark hero

# 3. Commit hvis OK
git add -A
git status --short
# Forventet: M src/styles/marketing-base.css, M src/styles/tokens.css
git commit -m "refactor(marketing): premium typografi (Inter Tight + Inter)"

# 4. Push + PR + merge
git push origin feat/p2-marketing-build-002a-home-rebuild
gh pr create --base main --head feat/p2-marketing-build-002a-home-rebuild \
  --title "feat(marketing): Stage B1 - Inter Tight + Inter typography" \
  --body "Premium typografi via Google Fonts. Replace SF Pro Rounded med Inter Tight."
gh pr merge --merge --delete-branch
git checkout main && git pull origin main
```

### Fase 2: Stage B2 - Hero reveal animation (~30 min)

Single fil ændring i `marketing-base.css` + en utility class. Lav patch eller editor-edit.

### Fase 3: Stage C1 - Section primitives (~60 min)

6 nye komponenter. **Anbefaling: Brug visual editor (Option A) eller Storybook (Option B), ikke patches.**

### Fase 4: Stage C2 - Dashboard mockup (~60 min)

1 kompleks komponent. **Anbefaling: Visual editor + iterate live.**

### Fase 5: Stage C3 - Home page rebuild (~30 min)

Replace `src/pages/Home.jsx`. Sammensætning af eksisterende komponenter.

### Fase 6: Stage D-F (deferred)

Premium product storytelling, social proof, motion - alle deferred.

### Fase 7: Other pages (P2-MARKETING-BUILD-002b through 002n)

13 pages. Hver kræver wireframe + content + composition.

---

## Critical context: Working rules (MUST be respected)

Disse rules er ALWAYS active når man arbejder på SMH:

1. **Dansk fil-content** med æ/ø/å direkte (NEVER ASCII-substitution som ae/oe/aa)
2. **ASCII-safe i git commit messages** - bruges ae/oe/aa der
3. **Ingen em-dashes** (kun ASCII bindestreger '-')
4. **Premium-Pulse design** - ingen generic SaaS-template feel
5. **One thing at a time** - no long discussions
6. **Single CTO recommendation** - ikke A/B/C valgmuligheder medmindre eksplicit bedt
7. **Never assume answers** - ask if information missing
8. **NEVER remove code based on "unused" assessment** - always grep manually først, lade Mario beslutte
9. **NEVER commit without Mario's visual approval**
10. **No em-dashes; inline HEX; Danish chars via Python UTF-8 for file generation**
11. **Session end: opdater MVP-PROGRESS.md + BACKLOG.md 100% komplet, write session log, commit til main**
12. **Never overwrite existing files via patch** - always check working-dir is synced first

---

## Dependencies

### Already configured i marketing-site
- React 18
- Vite
- Tailwind CSS v3
- React Router (HashRouter)
- PostCSS + autoprefixer
- @tailwindcss/typography (TBD if used)

### External
- **Google Fonts CDN** (Inter Tight + Inter) - B1 dependency
- **Elza Round Variable** (logo font) - probably bundled or CDN
- **GitHub** (`MP-SMH/marketing-site` repo)
- **GitHub CLI** (`gh`) - PR workflow

### Other SMH dependencies (out of scope for marketing-site)
- Supabase (auth, db)
- smh-app (admin platform)
- smh-api (backend)
- Frisbii (subscription payments)
- Mollie (donation payments)
- Creditro (KYC)
- Resend (email)
- Simply.com (DNS)

---

## Contacts & ownership

- **Mario Paunovic** - Solo founder, CEO, CTO, sole technical builder
- **Kristoffer (KME Consulting)** - Backend/Frisbii checkout tasks, IKKE marketing-site

For marketing-site fortsættelse er Mario eneste contact.

---

## Files in this handover

Dokumenter genereret 6/5 2026 (placer i `~/Desktop/smh-app/docs/`):

1. **`sessions/2026-05-06-p2-marketing-stage-a-b1-session.md`** - Komplet session log
2. **`HANDOVER-P2-MARKETING.md`** - Denne fil (NEW)
3. **`BACKLOG.md`** - Updated (se BACKLOG-UPDATE-P2-MARKETING.md for sektioner at indsætte)
4. **`MVP-PROGRESS.md`** - Updated (se MVP-PROGRESS-UPDATE-P2-MARKETING.md for sektioner at indsætte)

---

## Final note

Mario har ret i at chat-baseret patch-workflow ikke er effektivt for site-rebuild. For fortsættelse anbefales **Option A** (direct git workflow + visual editor som Cursor/VS Code med Claude integration) eller **Option B** (Storybook-first).

Stage A er solid. Score 8/10. Foundation er ready for whoever fortsætter.

**God arbejdslyst.**
