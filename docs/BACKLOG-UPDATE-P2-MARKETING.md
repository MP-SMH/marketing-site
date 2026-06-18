# BACKLOG.md - Update sections (6. maj 2026)

> **Indsæt disse sektioner i `~/Desktop/smh-app/docs/BACKLOG.md`** under den relevante P2-MARKETING-BUILD sektion. Erstat eksisterende 001c sektion (DONE) og add Stage A/B/C samt 002a sub-tasks.

---

## P2-MARKETING-BUILD-001c: Premium-Pulse Visual Primitives

**Status:** ✅ DONE (6/5 2026)
**Commit:** `ceaabd3` -> merged til main som `a28bf10` (PR #6)
**Branch:** `feat/p2-marketing-build-001c-visuals` (deleted)

### Hvad blev leveret
- Hero, CTA, Card, TrustRow, Eyebrow, HeroOrbs komponenter
- Tone matrix (light/dark) på alle komponenter
- Glassmorphism + brand-red radial orbs
- DevComponents.jsx showcase ved /dev/components
- Tailwind config extends for fontFamily og custom colors

### Files changed
9 filer, +1072/-174 lines

---

## P2-MARKETING-STAGE-A: Foundation Polish (ChatGPT audit Tier 1)

**Status:** ✅ DONE (6/5 2026)
**Commit:** `e715f4a` -> merged til main som `b48323e` (PR #6 genbrugt)
**Branch:** `feat/p2-marketing-build-001c-visuals` (deleted)

### Score impact
7/10 -> ~8/10 via 10 quick wins

### 10 quick wins implementeret
- **Text sizes:** display 60/38, h1 44, h2 30 (var 56/36/40/28)
- **Tracking refineret:** -0.035/-0.025/-0.005em (var -0.05/-0.03/-0.01)
- **Eyebrow dark glassmorphism:** bg-white/[0.07] border-white/[0.12] backdrop-blur-xl
- **HeroOrbs reduceret intensity:** normal 0.20/0.12/0.025 (var 0.30/0.20/0.03)
- **CTA primary dark base shadow:** [0_10px_28px_rgba(224,25,63,0.26)]
- **CTA primary dark hover glow:** 0.30 (var 0.45)
- **CTA secondary light:** border border-brand/35 + hover bg-brand-tint
- **CTA secondary dark:** bg-white/[0.04] border-white/[0.16] backdrop-blur-md
- **CTA active scale:** 0.99 (var 0.97)
- **Card hover:** translate-y-1 (var -2)
- **Card brand-glow:** 0.20 (var 0.25)
- **Hero H1 max-width:** centered 920px / split 620px
- **Hero H1 leading:** 1.04 (var 1.1)
- **Hero subtitle max-width:** centered 720px / split 560px
- **Hero subtitle leading:** 1.55 (var 1.625)
- **Hero subtitle dark:** text-slate-300 (var white/80)

### Files changed
6 filer, +50/-51 lines

### Bug fixed: isSplit reference (linje 134 Hero.jsx)
Sed-replacement missede én forekomst. Fixed via single sed-command.

---

## P2-MARKETING-BUILD-001d: Navbar + Footer

**Status:** ⏸️ DEFERRED (open task)
**Estimat:** 2-3 timer
**Prioritet:** Høj (kræves før launch)

### Scope
- Navbar med logo, nav links, login CTA
- Footer med columns: Produkt, Foreninger, Selskab, Legal
- Sticky-on-scroll navbar
- Mobile hamburger menu
- Tone-aware (dark navbar over hero, light over content)

---

## P2-MARKETING-BUILD-001e: Dev showcase route

**Status:** ✅ DONE (6/5 2026)
**Inkluderet i:** Commit `ceaabd3` (samme PR som 001c)

DevComponents.jsx ved `/dev/components` viser alle visual primitives i alle tones.

---

## P2-MARKETING-STAGE-B: Typography + Animation Foundation

### B1: Inter Tight + Inter font integration

**Status:** ⏸️ IN PROGRESS (6/5 2026)
**Branch:** `feat/p2-marketing-build-002a-home-rebuild`
**Estimat:** 15-30 min remaining (sed-fix + commit + push)

#### Status
- Filer skrevet til feat-branch
- `marketing-base.css` har Google Fonts @import
- `tokens.css` har Inter Tight / Inter font-families
- **Bug fundet:** marketing-base.css overskrev tidligere h1-h6 color rule fix
- **Sed-fix kommando givet** men ikke confirmed kørt
- Ikke committed

#### Pending action
```bash
cd ~/Desktop/marketing-site && \
sed -i '' '/^  color: var(--text-heading);$/d' src/styles/marketing-base.css && \
grep -c "color: var(--text-heading)" src/styles/marketing-base.css
# Forventet: 0
```

#### B1 deliverables
- Google Fonts @import for Inter Tight 400/500/600/700 + Inter 400/500/600
- font-display: swap (no FOIT)
- tokens.css font-families opdateret
- SF Pro Rounded reference fjernet

### B2: Hero reveal animation system

**Status:** ⏸️ DEFERRED
**Estimat:** ~30 min

#### Scope
CSS keyframes + utility class:
```css
@keyframes heroReveal {
  from { opacity: 0; transform: translateY(12px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
```

Stagger delays:
- Eyebrow: 0ms
- H1: 80ms
- Subtitle: 160ms
- CTA: 240ms
- TrustRow: 320ms
- Mockup: 400ms

Duration: 700ms cubic-bezier(0.16, 1, 0.3, 1)

---

## P2-MARKETING-BUILD-002a: Home Page Rebuild (10/10 architecture)

**Status:** ⏸️ DEFERRED
**Branch:** `feat/p2-marketing-build-002a-home-rebuild` (B1 already started)
**Estimat:** ~3-4 timer total (alle sub-tasks)
**Goal:** Score 8/10 -> 10/10 per ChatGPT 10/10 plan

### Sub-tasks

#### 002a-001: Hero med ny conversion-fokuseret copy
**Estimat:** 15 min
- **Ny H1:** "Modtag støtte. Uden tung administration."
- **Subtitle:** Conversion-fokuseret, ikke generic
- **Single primary CTA:** "Start gratis"
- **Trust-anchor under CTA** (ikke logo-row decoration)

#### 002a-002: AudiencePathCards komponent
**Estimat:** 45 min
- 2 cards: "For foreninger" / "For støttere"
- Negative-margin overlap med hero (`-mt-24` eller similar)
- Each card: icon + headline + subline + CTA
- Tone-aware (kommer ud af dark hero ind i light section)
- B2B card: "Bestyrelse, kasserer? Start gratis i dag."
- B2C card: "Find en forening og støt direkte."

#### 002a-003: TrustStack komponent (4 pillars)
**Estimat:** 45 min
- Mercury-style hvid bg sektion
- 4 pillars:
  1. **80% til foreningen** - "På Fast Støtte og Donationer går 80% direkte til foreningen"
  2. **Verificerede foreninger** - "Alle foreninger Creditro KYC-verificeret"
  3. **Automatisk bogføring** - "Donationer og udbetalinger bogføres automatisk i Dinero"
  4. **Dansk compliance** - "GDPR + dansk indsamlingsregulering by default"
- Iconography matchet til brand
- Specific tal (ikke generic claims)

#### 002a-004: DashboardMockup komponent
**Estimat:** 60 min
- Premium fintech-design (Mercury/Linear-niveau)
- Forening: Nordsjællands Svømmeklub (fictive data)
- Mock data:
  - Aktiv støtte: 18.450 kr.
  - Faste støttere: 127
  - Donationer: 42
  - Webshop overskud: 6.280 kr.
  - Næste udbetaling: 28. juli
  - Status: Verificeret (med checkmark)
- Multiple cards/charts
- Premium typography (Inter Tight)
- Subtle shadows + glassmorphism

#### 002a-005: ProductChannels komponent
**Estimat:** 30 min
- 3 channels: Donationer 80%, Fast støtte 80%, Webshop 32,75%
- Visual representation af pricing-model
- Fee/split breakdown
- Transparent ADAM 2.0 model

#### 002a-006: PreLaunchProof komponent
**Estimat:** 20 min
- "Åbner 18. juli 2026"
- Pre-launch trust signals
- Newsletter signup (TBD)

#### 002a-007: FAQ komponent
**Estimat:** 30 min
- Accordion eller similar
- 6-10 mest stillede spørgsmål
- Tone-aware
- Spørgsmål til at adressere:
  - Hvad koster det?
  - Hvor hurtigt får vi udbetalingen?
  - Hvad sker med data?
  - Skal vi være registeret?
  - Kan vi cancel?
  - Hvor mange foreninger er på platformen?

#### 002a-008: FinalCTA komponent
**Estimat:** 20 min
- Conversion-machine sektion bunden af page
- Strong primary CTA + secondary
- Backed by trust elements
- Maybe: "73 dage til launch" countdown

#### 002a-009: Home.jsx rebuild
**Estimat:** 30 min
Replace `src/pages/Home.jsx` med 10 sektioner:
1. Hero (002a-001)
2. AudiencePathCards (002a-002)
3. TrustStack (002a-003)
4. Hvordan det virker (3-step flow - bygges som del af denne)
5. DashboardMockup (002a-004)
6. ProductChannels (002a-005)
7. Social proof (002a-006 PreLaunchProof eller real testimonials)
8. Pricing/fordeling (transparency, ADAM 2.0)
9. FAQ (002a-007)
10. FinalCTA (002a-008)

---

## P2-MARKETING-STAGE-D: Premium Product Storytelling

**Status:** ⏸️ DEFERRED
**Estimat:** ~2 timer
**Goal:** Score 9/10 -> 9.5/10

### Scope
- Mid-page narrative sections
- Customer journey visualizations
- Feature deep-dives med screenshots
- Use case demonstrationer

---

## P2-MARKETING-STAGE-E: Social Proof

**Status:** ⏸️ DEFERRED
**Estimat:** Variable (kræver real customer data ved launch)
**Goal:** Score 9.5/10 -> 9.8/10

### Scope
- Real customer testimonials (TBD efter onboarding)
- Logo wall af early adopters
- Case studies (TBD)
- Press mentions (TBD)

### Pre-launch fallback
- "Åbner 18. juli 2026" pre-launch signals
- Founder story
- Vision statement
- Roadmap teaser

---

## P2-MARKETING-STAGE-F: Motion

**Status:** ⏸️ DEFERRED
**Estimat:** ~1 time
**Goal:** Score 9.8/10 -> 10/10

### Scope
- Hero reveal animation (B2 already scoped)
- Scroll-triggered reveals på sections
- Subtle hover micro-interactions
- Smooth scroll til anchors
- Optional: Lottie animations for hero illustrations

---

## P2-MARKETING-BUILD-002b til 002n: Other Pages

**Status:** ⏸️ DEFERRED (alle 13 pages)
**Estimat:** ~30-90 min per page (afhængig af compleksitet)

### Pages at bygge

| ID | Path | Beskrivelse | Estimat |
|----|------|-------------|---------|
| 002b | `/foreninger` | For foreninger landing | 60 min |
| 002c | `/foreninger/start` | Onboarding flow start | 90 min |
| 002d | `/stoetter` | For støttere landing | 60 min |
| 002e | `/hjertesager` | Cause directory | 90 min |
| 002f | `/hjertesager/[slug]` | Cause detail page | 60 min |
| 002g | `/foreninger/[slug]` | Forening profile page | 60 min |
| 002h | `/webshop` | Webshop information | 45 min |
| 002i | `/fast-stoette` | Fast Støtte information | 45 min |
| 002j | `/donationer` | Donationer information | 45 min |
| 002k | `/om` | Om SMH | 45 min |
| 002l | `/kontakt` | Kontakt | 30 min |
| 002m | `/blog` | Blog landing (TBD) | 60 min |
| 002n | `/legal` | Persondatapolitik, Vilkår, Cookies | 30 min |

### Per-page deliverables
- Wireframe (use existing wireframe-home.md som template)
- Content (Mario forfatter)
- Component composition (use established primitives)
- SEO metadata
- A11y review

---

## Methodology decisions

### ✅ DONE
- Premium-Pulse design system established
- Component library skaleret (8 visual primitives)
- Tone matrix pattern established
- ChatGPT UX/UI audit gennemført med konkret 10/10 roadmap

### 🚨 BLOCKED / NEEDS DECISION
- **Workflow continuation:** Patch-baseret chat-flow er ineffektivt for stort site rebuild. Mario skal beslutte:
  - **Option A:** Direct git workflow med visual editor (Cursor/VS Code)
  - **Option B:** Storybook-first development
  - **Option C:** Continue patches med strenger constraints

### 📋 OPEN
- Alle Stage B-F items
- Alle 002a sub-tasks
- 001d Navbar + Footer
- 002b-002n other pages

---

## Quick reference

### Branch state
- **main:** `b48323e` (Stage A merged)
- **feat/p2-marketing-build-002a-home-rebuild:** B1 installed, sed-fix pending

### Key commits (i kronologisk rækkefølge)
- `1b379fa` Foundation 001a
- `ceaabd3` Visual primitives 001c
- `a28bf10` 001c merge til main
- `e715f4a` Stage A foundation polish
- `b48323e` Stage A merge til main

### Documents
- `~/Desktop/smh-app/docs/sessions/2026-05-06-p2-marketing-stage-a-b1-session.md`
- `~/Desktop/smh-app/docs/HANDOVER-P2-MARKETING.md`
- `~/Desktop/smh-app/docs/marketing/BRAND-TOKENS.md` (existing)
- `~/Desktop/smh-app/docs/marketing/wireframes/wireframe-home.md` (existing)

---

## Last updated
6. maj 2026 ~ 11:00 - efter Stage A merge og B1 partial install. Mario stoppede session pga. ineffektiv arbejdsmetode. Alle deferred tasks er fully scoped og ready for whoever fortsætter.
