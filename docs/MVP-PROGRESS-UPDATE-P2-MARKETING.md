# MVP-PROGRESS.md - Update sections (6. maj 2026)

> **Indsæt disse sektioner i `~/Desktop/smh-app/docs/MVP-PROGRESS.md`**. Update header dato, add ny session-section, justere progress.

---

## Header update

**Sidst opdateret:** 6. maj 2026 ~ 11:00

**Launch deadline:** 18. juli 2026 (73 dage)

**Marketing-site progress:** ~25% af samlet marketing-site scope (foundation + visuals komplet, 14 pages venter)

---

## Session entry: 2026-05-06 - P2-MARKETING-BUILD 001c + Stage A + B1

**Tidsperiode:** 03:53 - 11:00+ (7+ timer)
**Repository:** marketing-site
**Outcome:** Foundation komplet, score løftet 7/10 -> ~8/10, projekt stoppet pga. ineffektiv arbejdsmetode

### Deliverables (denne session)

**✅ DONE:**
- P2-MARKETING-BUILD-001c (Premium-Pulse visual primitives) - merged til main
- P2-MARKETING-STAGE-A (Foundation polish, ChatGPT audit Tier 1, 10 quick wins) - merged til main
- ChatGPT UX/UI audit modtaget med score 7/10 + komplet 10/10 roadmap

**⏸️ IN PROGRESS:**
- P2-MARKETING-STAGE-B1 (Inter Tight + Inter typography) - filer skrevet, sed-fix pending, ikke committed

**⏸️ DEFERRED:**
- Stage B2 (Hero reveal animation)
- Stage C1 (Section primitives: AudiencePathCards, TrustStack, ProductChannels, FAQ, FinalCTA, PreLaunchProof)
- Stage C2 (DashboardMockup)
- Stage C3 (Home.jsx rebuild)
- Stage D-F
- 001d Navbar + Footer
- 002b-002n (13 other pages)

### Commits

| Commit | Description | PR | Merge |
|--------|-------------|----|----|
| `ceaabd3` | feat(marketing): premium-Pulse visual primitives + dev showcase route | #6 | `a28bf10` |
| `e715f4a` | refactor(marketing): Stage A foundation polish (ChatGPT audit Tier 1) | #6 (genbrugt) | `b48323e` |

### Score impact (per ChatGPT UX/UI audit)

- **Pre-session:** N/A (foundation only)
- **Efter 001c:** 7/10 (per audit)
- **Efter Stage A:** ~8/10 (per audit roadmap)
- **Goal:** 10/10 (deferred via Stage B-F)

### Bugs fundet og fixed

| # | Phase | Bug | Fix |
|---|-------|-----|-----|
| 1 | 1 | ASCII-safe content i jsx (working rule violation) | Replaced med direct æ/ø/å |
| 2 | 1 | CTA primary hover bg kontrast | Refined hover bg color |
| 3 | 1 | Button color:inherit override | Removed color:inherit |
| 4 | 1 | h1-h6 color override (1st occurrence) | Removed color line via sed |
| 5 | 1 | Em-dashes i prose (working rule violation) | Global sed replace |
| 6 | 1 | Browser cache med Downloads-mellemstation | Adopted base64-embedded scripts |
| 7 | 2 | Subtitle usynlig | Direct color class på `<p>` |
| 8 | 5 | isSplit is not defined linje 134 (Stage A) | Single sed command |
| 9 | 6 | h1-h6 color override (2nd occurrence) (B1) | Sed-fix givet (pending kørt) |

### Key decision
**Mario stoppede projektet** efter B1 bug fordi patch-baseret tilgang via Downloads-mellemstation er ikke skalerbart for 14-page site. Same bug (h1-h6 color) skete 2 gange pga. working-dir drift.

**Anbefaling for fortsættelse:**
- Option A: Direct git workflow + visual editor (Cursor/VS Code)
- Option B: Storybook-first development
- Option C: Continue patches med strenger constraints (mindre patches, working-dir sync, visual approval required)

### Documents leveret
1. **Session log:** `docs/sessions/2026-05-06-p2-marketing-stage-a-b1-session.md`
2. **HANDOVER:** `docs/HANDOVER-P2-MARKETING.md` (NEW comprehensive)
3. **BACKLOG update:** Sektioner at indsætte i `docs/BACKLOG.md`
4. **MVP-PROGRESS update:** Denne fil

---

## Marketing-site progress oversigt (efter denne session)

### Foundation
- [x] **001a:** Foundation (tokens, marketing-base, tailwind config) - `1b379fa` ✅
- [x] **001b:** Layout primitives (Container, Section, PageShell) - merged ✅
- [x] **001c:** Visual primitives (Hero, CTA, Card, TrustRow, Eyebrow, HeroOrbs) - `ceaabd3 -> a28bf10` ✅
- [x] **001e:** Dev showcase route - inkluderet i 001c ✅
- [ ] **001d:** Navbar + Footer - DEFERRED

### Polish & enhancement
- [x] **Stage A:** Foundation polish (10 quick wins, 7/10 -> 8/10) - `e715f4a -> b48323e` ✅
- [~] **Stage B1:** Typography (Inter Tight + Inter) - IN PROGRESS (sed-fix pending)
- [ ] **Stage B2:** Hero reveal animation - DEFERRED
- [ ] **Stage C1:** Section primitives - DEFERRED
- [ ] **Stage C2:** DashboardMockup - DEFERRED
- [ ] **Stage C3:** Home.jsx rebuild - DEFERRED
- [ ] **Stage D:** Premium product storytelling - DEFERRED
- [ ] **Stage E:** Social proof - DEFERRED
- [ ] **Stage F:** Motion - DEFERRED

### Pages (14 total)
- [~] **Home** (`/`) - existing, skal rebuildes via Stage C3
- [ ] **DevComponents** (`/dev/components`) - showcase only, ikke production
- [ ] 13 andre pages - DEFERRED (002b-002n)

### Overall marketing-site progress
**Foundation + Visuals + Stage A:** 100% komplet
**Stage B-F:** ~5% (B1 partial)
**Pages:** ~7% (kun Home eksisterer, 13 andre pages venter)

**Total marketing-site:** ~25% af scope komplet ift. launch readiness

---

## Samlet SMH MVP progress (hele platformen)

> **Note:** Marketing-site er én del af samlet SMH MVP. Andre dele (smh-app, smh-api, GDPR, integrationer) er separate progress-tracks.

### Marketing-site
~25% komplet (denne session)

### smh-app (Backend admin platform)
[Se eksisterende sektion - status uændret denne session]

### smh-api (Backend API)
[Se eksisterende sektion - status uændret denne session]

### GDPR/Compliance
Fase 4 dokumenter komplette (forrige sessioner)

### Integrationer
- Mollie OAuth: P1-001a komplet (forrige sessioner)
- Causes table: P1-001b in progress (forrige sessioner)
- Andre: pending

---

## Critical blockers / decisions needed

### 🚨 Workflow decision (Mario)
Marketing-site continuation kræver beslutning om arbejdsmetode:
- Patch-baseret chat-flow er ineffektivt
- Anbefaling: Direct git workflow + visual editor (Cursor/VS Code)
- Eller: Storybook-first development for component library

### 🚨 Time pressure
- 73 dage til launch (18. juli 2026)
- Marketing-site mangler 75% af scope
- Kritisk: Mario skal beslutte workflow approach + execute hurtigt

### 📋 Resource decision
- Solo founder builder (Mario alene tekniske)
- Kristoffer (KME) ikke marketing-site
- Andre options: Hire freelance, scope down, defer pages til post-launch

---

## Updated 6. maj 2026 ~ 11:00

Marketing-site har solid foundation. Score 8/10. Klar til Stage B-C continuation når Mario har valgt arbejdsmetode.

Alle deferred tasks fuldt scopet og dokumenteret i BACKLOG.md + HANDOVER-P2-MARKETING.md.
