# Pre-Launch Marketing Roadmap (Trackable)

**Target launch:** 18. juli 2026 (74 dage fra 5. maj 2026)
**Master reference:** `PLATFORM-DEEP-DIVE.md` (v1.1)
**Sidste opdatering:** 5. maj 2026 (v1.1 — §8A backlog tilføjet)

---

## Hvordan denne fil bruges

- Hver opgave har en **checkbox** `[ ]`
- Når en opgave er færdig, ændres til `[x]` (committes til main)
- Hver opgave har **ID** for reference og **estimat**
- Faserne har dependencies — gå ikke videre til næste fase før den nuværende er ~80% færdig
- Hver fase afsluttes med en session-log entry

**Sådan markeres en opgave som færdig:**
1. Implementér opgaven (kode, content, infra, etc.)
2. Verificér med Mario
3. Commit som normalt
4. Opdater denne fil: `[ ]` → `[x]` + committes
5. Tilføj note hvis relevant ("done 5 maj, PR #20")

---

## Tværgående Policies (gælder ALLE opgaver)

- [ ] **Policy 1:** Konkurrent-beskyttelse (kommuniker værdi, ikke tech-stack)
- [ ] **Policy 2:** Begge målgrupper (foreninger + støttere) i hver beslutning
- [ ] **Policy 3:** MVP-tal er master (80%/80%/32,75%)
- [ ] **Policy 4:** Tone of voice — autentisk Mario-stemme + B2C almindeligt sprog
- [ ] **Policy 5:** Pulse design system + brand-konsistens
- [ ] **Policy 6:** §8A-fradrag nævnes IKKE i marketing før Stage 2/3 er færdig (kun "kommende feature" i FAQ)

---

# FASE 0: Forarbejde (KOMPLET ✅)

- [x] Platform deep-dive dokumentation (`PLATFORM-DEEP-DIVE.md` v1.1) — done 5 maj 2026
- [x] Roadmap struktureret med checkbokse — denne fil
- [x] §8A-strategi besluttet — Stage 1 (pre-launch), Stage 2 (post-launch fase 1), Stage 3 (post-launch fase 2 — just-in-time)

---

# FASE 1: Sitemap + ChatGPT/CMO-briefs

**Mål:** Definer alle sider + content-spec FØR vi koder noget.
**Estimat:** 4-7t
**Dependencies:** Fase 0 komplet
**Output:** Komplet sitemap + brief-dokument per side, klar til ChatGPT

### Sitemap-design

- [ ] **F1-1:** Definer top-level navigation (max 5-6 menu-items)
- [ ] **F1-2:** Definer footer-struktur (Information, Webshop, Kontakt)
- [ ] **F1-3:** Map hvilke sider er primært B2B vs B2C vs delt
- [ ] **F1-4:** Definer konverterings-stier (B2B → opret-forening, B2C → opret-stoetter)
- [ ] **F1-5:** Identifiser SEO-landing pages (sport-vertical, kategori-pages)
- [ ] **F1-6:** Beslut: skal de 40+ kategori-sider migreres fra Shopify til marketing-site, eller bevares på shop.stotmedhjerte.dk?
- [ ] **F1-7:** Beslut: skal hjertesag-detaljesider være på marketing-site eller app.stotmedhjerte.dk?

### Page-by-page wireframes (struktur + indhold)

For hver side specificeres: Formål, målgruppe, sektioner, CTA, visuelle elementer.

- [ ] **F1-8:** Home (`/`) — wireframe + content-spec
- [ ] **F1-9:** ForeningerPage (`/foreninger`) — wireframe + content-spec (B2B-fokus)
- [ ] **F1-10:** StøtterPage (`/stotter` eller integreret i Home) — wireframe + content-spec (B2C-fokus)
- [ ] **F1-11:** SaadanVirkerDetPage — wireframe + content-spec
- [ ] **F1-12:** PriserPage — wireframe + content-spec
- [ ] **F1-13:** OmOsPage — wireframe + content-spec
- [ ] **F1-14:** FAQPage — wireframe + content-spec (15-20 spørgsmål)
- [ ] **F1-15:** KontaktPage — wireframe + content-spec
- [ ] **F1-16:** BookModePage — wireframe + content-spec (med video-placeholder)
- [ ] **F1-17:** Hjertesager (overview) — wireframe + content-spec
- [ ] **F1-18:** FastStoettePage — wireframe + content-spec (B2C)
- [ ] **F1-19:** SikkerhedPage (NY) — wireframe + content-spec
- [ ] **F1-20:** Indsamlingsnaevnet-section design (KEY DIFFERENTIATOR — afgør om egen side eller del af /foreninger)
- [ ] **F1-21:** BlogPage — wireframe + content-pipeline-spec
- [ ] **F1-22:** Sport-vertical pages (5 stk: fodbold, håndbold, gymnastik, svømning, løb) — template-spec

### ChatGPT/CMO-briefs

For hver page-type laves komplet brief til ChatGPT med:
- Tone of voice (Mario-autentisk)
- Konkurrent-beskyttelse (do/don't liste)
- Word count guidance
- Konkrete sektion-instruktioner

- [ ] **F1-23:** Master ChatGPT-brief template oprettet
- [ ] **F1-24:** Per-page briefs genereret (én per page fra F1-8 til F1-22)
- [ ] **F1-25:** Brief reviewed med Mario
- [ ] **F1-26:** ChatGPT producerer første batch content (alle pages)
- [ ] **F1-27:** Content reviewed og placeret i `/marketing-content/` folder

---

# FASE 2: P0 Compliance Fixes (KRITISK)

**Mål:** Eliminer juridisk risiko + opdater alle procent-tal til MVP-standarder.
**Estimat:** 5-9t
**Dependencies:** Fase 1 komplet
**Output:** Marketing-site er juridisk sikker og konsistent

### Compliance fixes

- [ ] **F2-1:** D5 — Procent-konsistens audit (alle "66%", "80%" findes og verificeres)
- [ ] **F2-2:** D5 — Update "66%" fast støtte → "80%" på alle steder
- [ ] **F2-3:** D3 — Refraser betalingsmetoder ("Apple Pay, Google Pay, Visa, Mastercard, Shop Pay" + "MobilePay (kræver egen MSN-konto-aftale)")
- [ ] **F2-4:** D4 — Refraser "100% lovlig... Garanteret" → "Lovlig indsamling — vi tager ansvaret for det juridiske"
- [ ] **F2-5:** D4 — Refraser "Indsamlingsnævnet Godkendt" badge → præciser at det er per forening, ikke SMH-blanket
- [ ] **F2-6:** D4 — Verificer "PCI DSS Level 1" claim er præcis (passthrough OK)
- [ ] **F2-7:** D4 — Refraser "KYC Verificering Verificeret" → "MitID + CVR-tjek aktiv"
- [ ] **F2-8:** D1 — Erstat 6 fake testimonials med 4-6 anonyme quote-themes (live shop-stil)
- [ ] **F2-9:** D2 — Erstat fake "Live donationer" feed med AdminDashboard-screenshot eller stat-counter
- [ ] **F2-10:** G1 — Konkurrent-beskyttelse audit (grep efter "Mollie", "Frisbii", "Creditro", "Hetzner", "Resend", "Dinero", "Shopify", "Supabase")
- [ ] **F2-11:** G1 — Refraser alle leverandør-mentions
- [ ] **F2-12:** §8A audit — bekræft at INGEN steder lover skattefradrag som aktiv feature

---

# FASE 3: Content Migration fra Live Shop

**Mål:** Brug eksisterende first-class copy fra stotmedhjerte.dk (live Shopify) som baseline.
**Estimat:** 15-26t
**Dependencies:** Fase 2 komplet
**Output:** Ny marketing-site har autentisk Mario-tone, ikke placeholder-tekst

### Migration tasks

- [ ] **F3-1:** Migrér "Hvad er StøtMedHjerte?" → Home/About sections
- [ ] **F3-2:** Migrér "Sådan fungerer det" (3-trins) → SaadanVirkerDetPage
- [ ] **F3-3:** Migrér "Foreninger: Indtægt uden ekstra frivillig-arbejde" → ForeningerPage
- [ ] **F3-4:** Migrér "Til dig der vil støtte" → ny B2C-side eller integration i Home
- [ ] **F3-5:** Migrér "De tre krav vi hører fra foreninger" → SocialProofSection replacement
- [ ] **F3-6:** Migrér Mario's stifter-historie → OmOsPage (3-trins narrativ)
- [ ] **F3-7:** Migrér "3 grunde til at overveje et samarbejde" → ForeningerPage
- [ ] **F3-8:** Migrér 6+6 FAQ → FAQPage (udvid til 15-20 senere)
- [ ] **F3-9:** Migrér 40+ kategori-pages → /forening/[type] eller bevares på shop.stotmedhjerte.dk (afhænger af F1-6 beslutning)
- [ ] **F3-10:** Asset-pipeline opsætning: /cdn/shop/files/ → ny CDN eller direkte-reference

---

# FASE 4: B2B Feature Amplification

**Mål:** Komplet feature-marketing der konverterer foreninger.
**Estimat:** 9-15t
**Dependencies:** Fase 3 komplet
**Output:** Foreninger forstår fuld værdi, ikke kun overflade

### B2B sections (på ForeningerPage og/eller egne sider)

- [ ] **F4-1:** Indsamlingsnævnet-section (KEY DIFFERENTIATOR — egen side eller hovedsection)
- [ ] **F4-2:** Auto-mails / Kommunikations section ("Vi taler med jeres støtter automatisk")
- [ ] **F4-3:** Social media tools section (auto-genererede tekster + QR-koder)
- [ ] **F4-4:** Regnskabsoversigt feature ("Komplet oversigt — klar til jeres bogholder")
- [ ] **F4-5:** Hjertesag-styring section ("Skab jeres egen hjertesag")
- [ ] **F4-6:** AdminDashboard showcase (erstatter fake "Live feed")
- [ ] **F4-7:** Webshop-section udvidelse (print-on-demand uden lager)

---

# FASE 5: B2C Supporter Focus

**Mål:** Tydelig B2C-vinkel der engagerer støttere.
**Estimat:** 6-10t
**Dependencies:** Fase 3 komplet
**Output:** Støttere forstår tier-system, multi-foreningsstøtte, fleksibilitet

### B2C sections

- [ ] **F5-1:** Dedikeret "Til dig der støtter"-section eller egen page
- [ ] **F5-2:** Tier-system showcase (Bronze → Diamant)
- [ ] **F5-3:** Streak-system + milestone-badges showcase
- [ ] **F5-4:** "Stop når som helst" pause/opsig messaging
- [ ] **F5-5:** "Bruger-oprettelse kræves" — ærlig kommunikation om dette
- [ ] **F5-6:** "Fast Støtte: én forening ad gangen" — tydelig kommunikation
- [ ] **F5-7:** SupporterDashboard preview screenshot
- [ ] **F5-8:** "Hvor går pengene hen" transparens-section
- [ ] **F5-9:** Multi-engagement messaging (engangs til mange + Fast Støtte til én)

---

# FASE 6: Konverterings-sider

**Mål:** Optimer de specifikke sider hvor konvertering sker.
**Estimat:** 9-14t
**Dependencies:** Fase 4 + 5 komplet
**Output:** Optimeret B2B og B2C sign-up flow

### Konverterings-tasks

- [ ] **F6-1:** BookModePage — video integration (kommer til allersidst, jf. brugerønske)
- [ ] **F6-2:** BookModePage — udvidelse af content + Calendly integration
- [ ] **F6-3:** PriserPage — mere dybde (fee-explanation + sammenligning)
- [ ] **F6-4:** FAQPage — udvid fra 6 til 15-20 spørgsmål (inkl. §8A som "kommende feature")
- [ ] **F6-5:** OmOsPage — Mario story integration (fra F3-6)
- [ ] **F6-6:** KontaktPage — improved lead capture (form + Calendly)

---

# FASE 7: SEO + Sport-Vertical Pages

**Mål:** SEO-positionering + sport-segmenteret indtag.
**Estimat:** 18-28t pre-launch
**Dependencies:** Fase 4-6 komplet
**Output:** Google-synlig + sport-niche-positioneret

### SEO foundation

- [ ] **F7-1:** SEO-meta (title, description, OG) på alle sider
- [ ] **F7-2:** Hreflang/lang-attributter (DK only) + structured data
- [ ] **F7-3:** Sitemap.xml + robots.txt
- [ ] **F7-4:** Google Search Console verificeret + submitted

### Sport-vertical pages (top 5)

- [ ] **F7-5:** /forening/fodbold (100-150 ord unik tekst + h1 + CTA)
- [ ] **F7-6:** /forening/haandbold
- [ ] **F7-7:** /forening/gymnastik
- [ ] **F7-8:** /forening/svoemmning
- [ ] **F7-9:** /forening/loeb

### Blog kickstart

- [ ] **F7-10:** Blog-template oprettet (post-listing + post-detail)
- [ ] **F7-11:** Blog-artikel 1: "Sådan starter I jeres første indsamling"
- [ ] **F7-12:** Blog-artikel 2: "Indsamlingsnævnet for dummies"
- [ ] **F7-13:** Blog-artikel 3: "5 fejl danske foreninger laver med fundraising"
- [ ] **F7-14:** Blog-artikel 4: "MobilePay vs bankoverførsel: hvad foretrækker støtter?"
- [ ] **F7-15:** Blog-artikel 5: "Sådan får jeres svømmeklub 50 faste støtter"

---

# FASE 8: Motion + Visual Polish

**Mål:** Enterprise-grade visual experience.
**Estimat:** 5-9t
**Dependencies:** Fase 7 komplet
**Output:** First-class enterprise-grade marketing-site

### Motion + visual

- [ ] **F8-1:** Pulse Hero pattern (orbs + grid + scroll-fade) standardiseret på alle Hero-sektioner
- [ ] **F8-2:** Stagger-animations på alle cards (useStaggerAnimation expand)
- [ ] **F8-3:** Micro-interactions (hover-lift, glow-pulse) standardiseret
- [ ] **F8-4:** Number animations (counter-roll på KPI-tal når scrolled-in)
- [ ] **F8-5:** Parallax på hero-billeder
- [ ] **F8-6:** Asset-leverage fra /cdn/shop/files (de 40+ produktfotos)
- [ ] **F8-7:** Loading states + skeleton screens
- [ ] **F8-8:** 404 + error pages design

---

# FASE 9: Infrastruktur (DNS + Shopify Omkonfig)

**Mål:** Domain-migration klar til launch-dag.
**Estimat:** 11-17t
**Dependencies:** Fase 8 komplet
**Output:** Cutover-klar (kan launches uden downtime)

### DNS / Domain

- [ ] **F9-1:** Beslut hosting: Vercel / Netlify / egen Hetzner
- [ ] **F9-2:** Deploy ny marketing-site til staging-URL
- [ ] **F9-3:** Konfigurer SSL/TLS (Let's Encrypt)
- [ ] **F9-4:** Forbered DNS-skift (stotmedhjerte.dk → ny site)
- [ ] **F9-5:** Konfigurer shop.stotmedhjerte.dk subdomain på Shopify
- [ ] **F9-6:** Konfigurer 301-redirects (gamle stotmedhjerte.dk URLs → shop.stotmedhjerte.dk)
- [ ] **F9-7:** Sitemap.xml opdatering + Google Search Console submit

### Shopify omkonfig

- [ ] **F9-8:** Domain-skift på Shopify (stotmedhjerte.dk → shop.stotmedhjerte.dk)
- [ ] **F9-9:** Header/Navbar på Shopify opdatering (link tilbage til marketing-site)
- [ ] **F9-10:** Reduktion af info-content på Shopify (ikke længere primær storefront)
- [ ] **F9-11:** Migration/redirect af /pages/* på Shopify
- [ ] **F9-12:** Tjek + fix alle interne links på Shopify
- [ ] **F9-13:** Email/footer/branding opdatering (Shopify-mails referer ny domain-struktur)

---

# FASE 10: Pre-Launch Polish (Logo, Email, PDF)

**Mål:** Final touches og resterende launch blockers.
**Estimat:** 14-20t
**Dependencies:** Fase 9 komplet, smh-app sandbox tilgængelig
**Output:** Launch-ready

### Final polish

- [ ] **F10-1:** Visual verify smh-app logo (kræver sandbox login restored)
- [ ] **F10-2:** Email templates med Logo (P2-EMAIL-001)
- [ ] **F10-3:** PDF templates med Logo (donation receipts, month reports)
- [ ] **F10-4:** Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] **F10-5:** Mobile responsive verification (iPhone, Android)
- [ ] **F10-6:** Lighthouse audit (target: 90+ på alle 4 metrics)
- [ ] **F10-7:** Accessibility audit (WCAG AA basisniveau)

### Launch blockers (fra HANDOFF)

- [x] **L1** Creditro KYC — DONE 5 maj 2026
- [ ] **F10-8 / L2** Mollie verification (Apple Pay/Google Pay enabled)
- [ ] **F10-9 / L3** MobilePay verification
- [ ] **F10-10 / L4** Resend email verification
- [ ] **F10-11 / L5** DNS/SSL setup (overlap med F9-1 til F9-4)
- [ ] **F10-12 / L6** Shopify setup (overlap med F9-8 til F9-13)
- [ ] **F10-13 / L7** Frisbii integration
- [ ] **F10-14 / L8** Dinero integration

---

# FASE 11: LAUNCH (~18. juli 2026)

**Mål:** DNS-cutover + soft-launch.
**Estimat:** 1 dag (active monitoring)

### Launch-day tasks

- [ ] **F11-1:** Pre-launch sanity check (alle systems green)
- [ ] **F11-2:** DNS-cutover (stotmedhjerte.dk → ny marketing-site)
- [ ] **F11-3:** Verify ny site loader korrekt fra alle test-locations
- [ ] **F11-4:** Verify shop.stotmedhjerte.dk loader Shopify
- [ ] **F11-5:** Verify alle 301-redirects virker
- [ ] **F11-6:** Monitor traffic + errors første 24t
- [ ] **F11-7:** Communications: announcement på LinkedIn, Facebook, email til Phase 1 leads
- [ ] **F11-8:** Hotfix-ready (bash scripts standby)

---

# FASE 12: POST-LAUNCH (kontinuerligt)

**Mål:** Vækst, content, gated features, case studies.
**Estimat:** ~50-100t første 3 måneder
**Status:** Ongoing

### Resterende kategori-pages (35 stk)

- [ ] **F12-1:** Plan + execute resterende 35 kategori-pages (gradvist)

### Blog cadence

- [ ] **F12-2:** Etabler blog-cadens (1-2 artikler/måned)
- [ ] **F12-3:** Pipeline af 10+ blog-artikler

### Gated features (P3 — kræver indsats fra brugeren)

- [ ] **F12-4:** ROI calculator (bag email-form)
- [ ] **F12-5:** Sammenligning-side (kort registration)
- [ ] **F12-6:** Sikkerhed/compliance deep-dive (uden leverandør-mentions)
- [ ] **F12-7:** Demo video (allersidst)
- [ ] **F12-8:** Case studies (kræver customers — start ved 5+ aktive foreninger)

### Continuous improvements

- [ ] **F12-9:** A/B test af hovedside hero
- [ ] **F12-10:** A/B test af pricing-page
- [ ] **F12-11:** Heatmap-analyse (Hotjar eller lign.)
- [ ] **F12-12:** Konverterings-rate optimization (basis 5-10% → target 15%+)

---

# BACKLOG: §8A Skattefradrag (Stage 2 + Stage 3)

**Status:** Parkeret post-launch. IKKE marketed indtil Stage 2/3 er færdig.

**Strategi:**
- Stage 1 (pre-launch): Ingen marketing-claims. FAQ kan nævne "kommende feature".
- Stage 2 (post-launch fase 1, måned 1-3): Bygge foundation for §8A
- Stage 3 (post-launch fase 2, just-in-time inden januar 2027): Implementér årlig SKAT-rapportering

## Stage 2: §8A Foundation (post-launch måned 1-3)

**Estimat:** ~10-14t
**Trigger:** Når 1+ forening udtrykker konkret interesse i §8A
**Marketing-impact:** Aktivér FAQ-svar om §8A-ansøgning

- [ ] **B-001:** CPR-DATA til SKAT — implementer optional CPR-felt ved donation-checkout (~4-6t)
  - UI: "Vil du have skattefradrag?" toggle
  - Modulus-11 validering
  - Krypteret storage (GDPR-compliance for sensitive data)
  - Kun synligt hvis foreningen har §8A-status

- [ ] **B-002:** §8A-ansøgning til Skattestyrelsen — auto-generator i AdminIndsamlingsnaevnet (~3-4t)
  - Auto-genereret ansøgningstekst til SKAT (separat fra Indsamlingsnævn-ansøgning)
  - Inkluder formålsparagraf, vedtægter-reference, anslået antal gavegivere
  - Foreningen indsender selv (kan ikke gøres af tredjepart)
  - UI sektion med status-tracking

- [ ] **B-003:** §8A-status felt på organisation — datamodel + UI (~1-2t)
  - Track hvilke foreninger der er §8A-godkendt
  - Toggle CPR-feltet ved checkout dynamisk
  - Vis badge på forenings-profil

## Stage 3: Årlig SKAT-rapportering (just-in-time inden jan 2027)

**Estimat:** ~16-23t
**Trigger:** November/december 2026 (deadline 20. januar 2027 for første indberetning)
**Marketing-impact:** Fuld §8A-feature kan markedsføres som differentiator

- [ ] **B-004:** Årlig SKAT-rapportering scoped som P-task i smh-api (~10-15t)
  - Backend: Årlig batch-job der samler donor-CPR + beløb
  - SKAT TastSelv Erhverv integration (XML-fil-upload eller direkte API)
  - Audit-trail for alle indberetninger
  - Failsafe: Manuel review-mulighed før indberetning

- [ ] **B-005:** Donor-fradragsbilag auto-genereret i `/profil` (~3-4t)
  - PDF-template med foreningens §8A-nummer
  - Total donations året
  - Direkte download-link til SKAT-formidling
  - Email-notifikation når bilaget er klar (~januar)

- [ ] **B-006:** Audit-trail for SKAT-indberetninger (~3-4t)
  - Log over alle indberetninger (hvem, hvornår, hvilket beløb)
  - Eksporterbar til foreningens egen revision
  - Audit-side i AdminIndsamlingsnaevnet eller AdminReports

---

# Tids-oversigt (Pre-launch)

| Fase | Estimat | Cumulativt | Status |
|---|---|---|---|
| Fase 0 (Forarbejde) | done | 0t | ✅ |
| Fase 1 (Sitemap + briefs) | 4-7t | 4-7t | Pending |
| Fase 2 (P0 compliance) | 5-9t | 9-16t | Pending |
| Fase 3 (Content migration) | 15-26t | 24-42t | Pending |
| Fase 4 (B2B amplification) | 9-15t | 33-57t | Pending |
| Fase 5 (B2C focus) | 6-10t | 39-67t | Pending |
| Fase 6 (Konvertering) | 9-14t | 48-81t | Pending |
| Fase 7 (SEO + sport) | 18-28t | 66-109t | Pending |
| Fase 8 (Motion polish) | 5-9t | 71-118t | Pending |
| Fase 9 (Infrastruktur) | 11-17t | 82-135t | Pending |
| Fase 10 (Final polish) | 14-20t | 96-155t | Pending |
| Fase 11 (Launch) | 1 dag | — | Pending |
| Fase 12 (Post-launch) | 50-100t | — | Ongoing |

**Total pre-launch:** ~96-155t arbejde over ~50 dage. **Buffer:** 20-25 dage før launch hvis vi følger ovenstående tempo.

# Tids-oversigt (Post-launch §8A)

| Stage | Estimat | Trigger |
|---|---|---|
| Stage 2 (§8A Foundation) | 10-14t | 1+ forening udtrykker interesse |
| Stage 3 (Årlig SKAT-rapportering) | 16-23t | Nov-dec 2026 (just-in-time) |
| **Total §8A backlog** | **26-37t** | Spread over 6+ måneder post-launch |

---

# Åbne spørgsmål (skal afklares)

- [x] **Q1:** §8A skattefradrag — afklaret 5 maj 2026, parkeret som backlog (B-001 til B-006)
- [x] **Q2:** Indsamlingsnævnet badge — afklaret 5 maj 2026 (per forening, ikke SMH-blanket)
- [x] **Q3:** MobilePay setup — afklaret 5 maj 2026 (forening skal have egen MSN-aftale først)
- [x] **Q4:** Phase 1 testimonials — afklaret 5 maj 2026 (ingen leads, brug anonyme quote-themes)
- [ ] **Q5:** Shopify kategori-pages migration — beslut i F1-6
- [ ] **Q6:** Hjertesag-detaljesider placering — beslut i F1-7
- [ ] **Q7:** Hosting til ny marketing-site — beslut i F9-1

---

# Hvordan vi navigerer

**Lige nu:** Fase 1 (Sitemap + briefs)

**Næste konkrete handling:**
- F1-1 til F1-7 (sitemap-design, ~30 min sammen med Mario)
- Derefter F1-8 til F1-22 (page wireframes, gradvist)
- Derefter F1-23 til F1-27 (ChatGPT-briefs)

**Når Fase 1 er ~80% færdig** → start Fase 2 (P0 compliance fixes parallelt med ChatGPT producerer content).

**Hvert task:**
1. Mario bekræfter task-ramme
2. Claude produserer artifact (kode, content, dokumentation)
3. Mario reviewer
4. Commit + opdatér checkbox `[ ]` → `[x]`

---

**Versionshistorik:**

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial roadmap baseret på platform deep-dive |
| 1.1 | 5. maj 2026 | §8A backlog tilføjet (B-001 til B-006), policy 6 tilføjet, Q1-Q4 markeret afklaret, F2-12 §8A audit tilføjet, F4-4 omformuleret (regnskabsoversigt ikke auto-bogføring), F5 udvidet med bruger-oprettelse + Fast Støtte 1-forening messaging |
