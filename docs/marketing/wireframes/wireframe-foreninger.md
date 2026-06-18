# Wireframe: `/foreninger` (B2B Hub)

**Version:** 1.3
**Dato:** 5. maj 2026
**Status:** Klar til implementering (Brand-tokens korrigeret)
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.0
**Page-ID:** F1-9
**Review:** ChatGPT-CMO 5. maj 2026 + Mario motion-direktiv + Mario brand-correction

---

## Page-formål

**Den vigtigste B2B-konverterings-side.** Fanger forenings-bestyrelse, kasserer, eller frivillig der overvejer StøtMedHjerte som fundraising-løsning. Skal:

1. Bekræfte at StøtMedHjerte forstår foreningens problemer
2. Vise konkret hvordan StøtMedHjerte løser dem
3. Bevise at det er sikkert (compliance + tryghed)
4. Konvertere til "Book et gratis møde" eller "Opret forening"

**Strategisk positionering:** StøtMedHjerte er en **FaaS-tech leader** (Fundraising-as-a-Service). Visuel kvalitet matcher enterprise-tech-products (Linear, Vercel, Stripe, Notion-niveau).

**Primær audience:** B2B (forenings-beslutningstagere)
**Sekundær audience:** Støttere nævnes i relevant kontekst.

---

## Konverterings-mål

**Primary CTA:** "Book et gratis møde" → `/book-moede`
**Secondary CTA:** "Opret forening" → `/opret-forening`
**Soft CTAs:** 2 mid-page CTAs efter sektion 4 og 7
**Tertiary action:** Naviger til `/sikkerhed` / `/priser` / `/kontakt`

---

## Features mappet til siden

(Identisk med v1.1/v1.2 - 17 Primary features fra FEATURE-MAPPING.md)

---

# 🎨 BRAND-TOKEN ANVENDELSE (NY i v1.3)

**Reference:** BRAND-TOKENS.md v1.0 (Marketing palette)

## Side-wide farve-strategi

Hele siden følger **Marketing palette** (ikke platform-palette):

```
PRIMARY:    #E0193F (brand-red) - alle CTAs, accents, headlines pop
NEUTRAL:    Hvid + #F9FAFB alternation for sections
TEXT:       #0F172A heading, #111827 body, #6B7280 secondary
BORDERS:    #EBEBEB subtle, #E0193F primary card highlight
SHADOWS:    Brand-shadow på primary CTAs, neutral på secondary cards
```

**IKKE brugt på denne side:**
- ❌ Platform-rolle-farver (#7C3AED Backend, #0891B2 Admin)
- ❌ Sektor-farver (#16A34A grøn, #EA580C orange, etc.) - kun på hjertesager-cards på `/hjertesager`

## Card-hierarki (sektion 3 og overalt)

**Tier 1 - Primary card (KEY-highlight):**
- Background: hvid
- Border: `1.5px solid #E0193F`
- Shadow: brand-shadow medium
- Bruges til: Hjertesager-card (vigtigst kanal), Final CTA-zone

**Tier 2 - Secondary card (regular):**
- Background: hvid
- Border: `1px solid #EBEBEB`
- Shadow: neutral medium
- Bruges til: Fast Støtte-card, Webshop-card, feature-cards generelt

**Tier 3 - Soft card (informational):**
- Background: `#F9FAFB`
- Border: none
- Bruges til: Insight-boxes, mini-tips, eksempel-bokse

---

## Sektion-rækkefølge

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 60 | Dark gradient + orbs |
| 2 | Problem | 120 | Hvid |
| 3 | 3 indkomstkanaler | 200 | #F9FAFB |
| 3.5 | Differentiering vs. alternativer | 80 | Hvid |
| 4 | Indsamlingsnævnet (KEY) | 280 | #F9FAFB |
| 4.5 | Soft CTA | 30 | Hvid |
| 5 | Auto-kommunikation | 180 | Hvid |
| 6 | Social media + QR | 150 | #F9FAFB |
| 7 | Regnskabsoversigt | 200 | Hvid |
| 7.5 | Soft CTA | 30 | #F9FAFB |
| 8 | Sådan kommer I i gang | 180 | Hvid |
| 8.5 | For hvem passer det? | 80 | #F9FAFB |
| 9 | Pris | 120 | Hvid |
| 10 | Quote-themes | 100 | #F9FAFB |
| 11 | Trust + Sikkerhed | 120 | Hvid |
| 12 | Final CTA | 80 | Dark gradient |
| **Total** | | **~2,010 ord** | |

---

## Sektion-detaljer (med korrekt brand-tokens + motion)

### **1. Hero** - "Mere støtte til jeres forening - uden mere administration"

**Brand-tokens anvendt:**
- Background: dark gradient (#0F172A base) med floating orbs (red-tinted: rgba(224,25,63,0.15))
- H1 farve: hvid (#FFFFFF) med rød accent på key-ord
- Subheadline: rgba(255,255,255,0.75)
- Primary CTA: brand-red (#E0193F) med brand-shadow
- Secondary CTA: outlined hvid med 1.5px border rgba(255,255,255,0.35)
- Trust-badges: rgba(255,255,255,0.15) bg, hvid text, rød ikon-accent
- Mockup: hvid card med brand-red border-accent

**Motion choreography (GSAP timeline):**
```
T+0.0s: Background orbs fade in (opacity 0 → 0.4) + scale (0.8 → 1.0)
T+0.2s: H1 reveals word-by-word (left-to-right, ease-out-expo, 0.06s stagger)
T+0.6s: Subheadline fade-up (y: 20 → 0, ease-out-quart)
T+0.9s: Trust-badges stagger reveal (y: 10 → 0, 0.08s stagger)
T+1.2s: CTA buttons scale-in (0.95 → 1.0, spring-easing)
T+1.0s: Mockup slides in from right (x: 60 → 0, scale 0.96 → 1.0)
T+1.5s: Mockup interior elements stagger reveal
```

**Continuous:**
- Floating orbs: 8s+ drift loops
- Mockup tilt: ±3deg parallax tied to mouse
- "343 dage til fornyelse" pulses every 3s
- "Anmeldelse klargjort" badge subtle glow

**Content-spec:** (uændret fra v1.1)
- **H1:** "Mere støtte til jeres forening - uden mere administration"
- **Subheadline:** "StøtMedHjerte samler hjertesager, fast månedlig støtte og supporterprodukter i én platform. I får verificering, delingsværktøjer, støtterkommunikation og regnskabsoversigt bygget ind fra starten."
- **Primary CTA:** "Book et gratis møde"
- **Secondary CTA:** "Se hvordan det virker"
- **Trust-row (4 badges):** Gratis opstart / MitID + CVR / Hjælp til Indsamlingsnævnet / 80%

**Word count:** ~60 ord

---

### **2. Problem-section**

**Brand-tokens:**
- Background: hvid
- Cards: secondary-tier (hvid + #EBEBEB border + shadow-sm)
- Card icons: brand-red (#E0193F) i red-tint container (#FEF2F2)
- Headlines på cards: text-heading (#0F172A)
- Body: text-secondary (#6B7280)

**Motion choreography:**
```
On scroll into view (30% visible):
T+0.0s: Section header fade-up
T+0.3s: 3 problem cards stagger reveal (y: 40 → 0, 0.15s stagger)
T+0.4s: Card icons rotate-in (rotation -180 → 0, spring-easing)
```

**Hover på card:**
- Lift -8px y + shadow-lg
- Icon container scale 1.0 → 1.1
- Icon wiggle (rotation -3 → 3 → 0)

**Content-spec:** (uændret fra v1.1)

**Word count:** ~120 ord

---

### **3. Solution-overblik - 3 indkomstkanaler (CARD-HIERARKI v1.3)**

**Brand-tokens (CORRECTED v1.3):**

**Card 1: Hjertesager** - **TIER 1 PRIMARY CARD**
- Background: hvid
- Border: `1.5px solid #E0193F` (brand-red)
- Shadow: `--shadow-brand-md`
- Icon container: brand-red bg (#E0193F) + hvid heart-icon
- Headline: text-heading + brand-red accent
- Stats (80%): brand-red, large display
- CTA-arrow: brand-red

**Card 2: Fast Støtte** - **TIER 2 SECONDARY**
- Background: hvid
- Border: `1px solid #EBEBEB`
- Shadow: `--shadow-sm`
- Icon container: red-tint bg (#FEF2F2) + brand-red icon
- Headline: text-heading
- Stats (80%): brand-red accent only
- CTA-arrow: brand-red

**Card 3: Webshop (valgfri)** - **TIER 2 SECONDARY**
- Background: hvid
- Border: `1px solid #EBEBEB`
- Shadow: `--shadow-sm`
- Icon container: red-tint bg (#FEF2F2) + brand-red icon
- "Valgfri"-badge: text-muted (#9CA3AF) lille label
- Stats (32,75%): brand-red accent
- CTA-arrow: brand-red

**Visuel effekt:** Hjertesager står ud som dominerende kanal. Fast Støtte og Webshop ser ens ud (begge "regular" kanaler) men Webshop markeres som valgfri via "valgfri"-tag.

**Motion choreography:**
```
On scroll into view:
T+0.0s: Header fades up
T+0.3s: 3 cards reveal in 3D-flip motion
        - Hjertesager (Tier 1): rotateY -90 → 0 (ease-out-expo, 0.8s)
        - Fast Støtte: rotateY -90 → 0 (delay 0.1s)
        - Webshop: rotateY -90 → 0 (delay 0.2s)
T+1.2s: Mini-visuals inside each card stagger
        - Hjertesager: progress-bar fills (0% → 65%) i brand-red gradient
        - Fast Støtte: tier-options stagger appear
        - Webshop: t-shirt mockup with print-effect
```

**Hover på Tier 1 card (Hjertesager):**
- Lift -12px + brand-shadow-lg amplifies
- Border glows (#E0193F → #FF4D6A pulse)
- Progress-bar fills further (65% → 80%)

**Hover på Tier 2 cards:**
- Lift -8px + neutral shadow
- Border-color shifts (#EBEBEB → #E0193F30 hint)
- Mini-visual subtle activation

**Content-spec:** (uændret fra v1.1)

**Word count:** ~200 ord

---

### **3.5. Differentiering vs. alternativer**

**Brand-tokens:**
- Background: hvid med subtle red-tinted gradient overlay (5% opacity)
- Headline: text-heading med brand-red accent på "ÉN platform"
- Body: text-body
- Subtle dot-pattern bagground i red-tint

**Motion:**
```
T+0.0s: Background gradient sweeps in (subtle red glow)
T+0.2s: Headline fade-up
T+0.5s: Body fades in word-by-word (0.02s stagger)
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~80 ord

---

### **4. KEY DIFFERENTIATOR - Indsamlingsnævnet (PINNED)**

**Brand-tokens:**
- Background: #F9FAFB (bg-soft)
- Headline: text-heading (#0F172A) med brand-red accent på key-word
- 5 trin numbers: brand-red bg + hvid text, scale based på active state
- Active step: brand-shadow-md glow
- Mockup: hvid card med #EBEBEB border, brand-red status-indicators
- Insight box: tier-3 soft card (#F9FAFB darker variant) med brand-red text-accent
- CTA: secondary-style (outlined brand-red)

**Motion choreography (PINNED - uændret fra v1.2):**
```
ScrollTrigger pins for 2.5x viewport scroll.

Phase 1 (T+0% to 30%):
- Headline + subheadline fade-up
- Mockup slides in from right with 3D-perspective

Phase 2 (T+30% to 80%):
- 5 trin reveal sequentially as user scrolls
  - Each step: number-badge scales in + content fades up
  - Active step highlighted (brand-red glow on number-badge)
  - Mockup interior updates to match active step

Phase 3 (T+80% to 100%):
- Insight box slides up from bottom
- "8-15 timers manuelt arbejde sparet" - counter animates
- CTA fade-in
- Section unpins
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~280 ord

---

### **4.5. Soft CTA**

**Brand-tokens:**
- Card: tier-3 soft card (bg-soft) på hvid bg-section
- Border: 1px solid #EBEBEB med subtle brand-red gradient på top edge
- Headline: text-heading
- CTA-button: primary brand-red

**Motion:**
```
T+0.0s: Card scales in (0.92 → 1.0, spring)
T+0.2s: CTA button gentle pulse (loop every 4s)
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~30 ord

---

### **5. Auto-kommunikation**

**Brand-tokens:**
- Background: hvid
- 4 mail-cards: secondary-tier (hvid + #EBEBEB border)
- Each card-icon: brand-red i red-tint container
- Email-content preview-text: text-body
- Insight box: tier-3 soft card med brand-red number accent

**Motion (uændret fra v1.2):**
```
T+0.0s: Header fade-up
T+0.3s: 4 mail-cards animate in as if "sending"
T+1.0s: Trust-statement fades in
T+1.3s: Insight box appears with counter animation (50 timer/år)
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~180 ord

---

### **6. Social media + QR**

**Brand-tokens:**
- Background: #F9FAFB
- Mockup-cards: secondary-tier hvid cards
- QR-code: sort på hvid (standard)
- Sample-text bobler: brand-red accent
- Eksempel-box: tier-3 soft card

**Motion (uændret fra v1.2):**
```
T+0.0s: Header fade-up
T+0.2s: Side-by-side comparison reveals
T+0.8s: QR-code "draws itself" (SVG path animation)
T+1.0s: Sample-text typewriter-effect
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~150 ord

---

### **7. Regnskabsoversigt (PINNED)**

**Brand-tokens:**
- Background: hvid
- Mockup: hvid card med #EBEBEB border, brand-red accents på key-numbers
- Bar charts: brand-red gradient (linear-gradient 90deg, #E0193F → #FF4D6A)
- Bullet checkmarks: success-green (#16A34A) når "checked"
- Insight: tier-3 soft card

**Motion (uændret fra v1.2):**
```
PINNED for 2x viewport scroll.

Phase 1: Headline reveals, mockup slides in
Phase 2: Bullet-list reveals one-by-one with green checkmarks
         Mockup updates synchronously (bar chart fills, numbers tick up)
Phase 3: Final insight emphasized, section unpins
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~200 ord

---

### **7.5. Soft CTA**

(samme som 4.5 - bg-soft variant da section bg er hvid)

**Word count:** ~30 ord

---

### **8. Sådan kommer I i gang**

**Brand-tokens:**
- Background: hvid
- 4 step-circles: brand-red bg + hvid number, ring animation på active
- Connector-lines: brand-red gradient (left-to-right flow)
- Step icons: brand-red i red-tint container
- Active step ring: brand-shadow pulse

**Motion (uændret fra v1.2):**
```
T+0.0s: 4-step flow reveals as connected timeline
        - Step 1 number-circle scales in (spring)
        - Connector-line draws (left-to-right, 0.8s)
        - Step 2 scales in
        - ... (continues)
        Total: ~2.5s
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~180 ord

---

### **8.5. For hvem passer det?**

**Brand-tokens:**
- Background: #F9FAFB
- Headline: text-heading
- Foreningstype-icons: brand-red i 30% opacity (subtle), full opacity på hover
- Body: text-body

**Motion (uændret fra v1.2):**
```
T+0.0s: Headline fade-up
T+0.3s: Foreningstype-icons cascade in (chaotic but pleasing)
T+1.0s: Body fade-up

Continuous: Icons gentle float
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~80 ord

---

### **9. Pris - gratis opstart**

**Brand-tokens:**
- Background: hvid
- Pricing table: bordered with #EBEBEB, header-row brand-red bg
- Numbers (80% / 80% / 32,75%): brand-red large display
- Checkmark-bullets: success-green (#16A34A)
- "Gratis at komme i gang" emphasis: brand-red badge

**Motion (uændret fra v1.2):**
```
T+0.0s: Headline fade-up
T+0.3s: Pricing table animates row-by-row
        - Percentage numbers counter from 0 → final value
T+1.2s: 4 checkmark-bullets stagger reveal (SVG path draw)
T+1.5s: CTA fade-in
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~120 ord

---

### **10. Anonyme quote-themes**

**Brand-tokens:**
- Background: #F9FAFB
- Quote-cards: secondary-tier hvid cards
- Quote-marks: brand-red large display
- Quote-text: text-heading (display weight)

**Motion (uændret fra v1.2):**
```
T+0.0s: Header fade-up
T+0.3s: 3 quote-cards arrange in (slides left/center/right)
T+0.8s: Quote-marks "draw in" (SVG path)
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~100 ord

---

### **11. Trust + Sikkerhed**

**Brand-tokens:**
- Background: hvid
- 4 trust-badges: secondary-tier cards
- Badge icons: brand-red i red-tint container
- Verification-checkmarks: success-green
- Optional: subtle red-tint background pattern

**Motion (uændret fra v1.2):**
```
T+0.0s: Header fade-up
T+0.3s: 4 trust-badges arrange in 2x2 grid (slides from corners)
T+0.7s: Each icon performs "verification animation"
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~120 ord

---

### **12. Final CTA section**

**Brand-tokens:**
- Background: dark gradient (#0F172A) med brand-red orbs (matching Hero)
- Headline: hvid display
- Subheadline: rgba(255,255,255,0.75)
- Primary CTA: brand-red bg + brand-shadow-lg
- Secondary CTA: outlined hvid
- Trust-statement: rgba(255,255,255,0.6)
- Kontakt-link: brand-red underlined

**Motion (uændret fra v1.2):**
```
T+0.0s: Background hero-pattern intensifies
T+0.3s: Headline reveals with dramatic fade-up + scale
T+0.6s: Subheadline fades in
T+0.9s: 2 CTAs scale-in (spring) with subtle bounce
T+1.2s: Trust-statement fade-in
T+1.4s: Kontakt-link subtle reveal
```

**Content-spec:** (uændret fra v1.1)

**Word count:** ~80 ord

---

# 🎯 Visuel-spec opsummering (v1.3)

## Brand-konsistens regler

1. **ÉN brand-farve dominerer:** #E0193F bruges på CTAs, accents, borders, key-numbers, icons
2. **Hjertesager-card er Tier 1:** brand-red border + brand-shadow markerer den som primær
3. **Fast Støtte og Webshop er Tier 2:** neutral cards med brand-red icon-accents
4. **Ingen platform-rolle-farver:** purple/teal undgås helt på marketing-site
5. **Sektor-farver kun på `/hjertesager`:** ikke på `/foreninger` (verificeret)
6. **Mørke sections (Hero + Final CTA):** brand-red orbs på dark gradient, ikke andre farver

## Performance + accessibility

(Uændret fra v1.2)
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- prefers-reduced-motion → fade-only fallback
- Mobile motion-intensitet -40%
- Keyboard equivalents

---

## Inter-page links

(Uændret fra v1.1)

---

## Compliance check

(Uændret fra v1.1 - alle policies opfyldt)

---

## v1.2 → v1.3 ændringslog

**Brand-tokens corrections:**
- ❌ Fjernet: Lilla (#7C3AED) for Fast Støtte kanal - var fejl
- ❌ Fjernet: Blå (#3B82F6) for Hjertesager kanal - var fejl
- ✅ Tilføjet: Card-tier-system (Tier 1 primary, Tier 2 secondary, Tier 3 soft)
- ✅ Hjertesager nu Tier 1 (brand-red border) - matcher strategisk fokus
- ✅ Fast Støtte + Webshop Tier 2 (neutral + red accents)
- ✅ "Valgfri" badge på Webshop tilføjet
- ✅ BRAND-TOKENS.md reference tilføjet
- ✅ Per-sektion brand-token spec dokumenteret
- ✅ Backgrounds-alternation specificeret per sektion (hvid / #F9FAFB / dark)
- ✅ Hero + Final CTA bruger dark gradient (matchende ikke-eksisterende kanal-farver)

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 12 sektioner, ~1880 ord, 17+ features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 6 kritiske + 8 stærke + 6 overvejelser |
| 1.2 | 5. maj 2026 | Motion & Animation skruet op til FaaS-tech leader-niveau (GSAP + ScrollTrigger, pinned scrollytelling, 3D card-flips) |
| 1.3 | 5. maj 2026 | Brand-tokens korrigeret baseret på faktisk kode-audit. Card-hierarki (Tier 1/2/3) etableret. Hjertesager fremhævet med brand-red border. **Klar til implementering.** |
