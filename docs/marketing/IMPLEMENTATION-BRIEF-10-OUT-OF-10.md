# Implementation Brief: StøtMedHjerte Marketing-site 10/10 UX/UI

**Source:** ChatGPT senior frontend engineer + UX/UI designer brief (modtaget 6. maj 2026)
**Status:** Master implementation reference for P2-MARKETING-BUILD-002a Home page rebuild + Stage B-F continuation
**Owner:** Mario Paunovic
**Last updated:** 6. maj 2026

> **Dette er den autoritative implementation brief for marketing-site 10/10 mål.**
> Alle Stage B-F + 002a sub-tasks skal følge specs i dette dokument.
> Allerede implementeret i Stage A: typografi tokens, Eyebrow glassmorphism, HeroOrbs intensity, CTA shadows, Card hover, Hero max-widths/leadings.

---

## Rolle

Senior frontend engineer og UX/UI designer med erfaring fra premium SaaS, fintech og moderne React-baserede marketing-sites.

Mål: Løfte StøtMedHjerte marketing-sitet fra et godt komponentbibliotek til en visuelt imponerende, indbydende og konverteringsstærk premium SaaS-oplevelse.

Retning:

> **Premium fintech + varm dansk foreningsplatform + visuel wow-effekt.**

Det skal føles moderne, teknisk stærkt, trygt og imponerende - uden at blive larmende, useriøst eller NGO-agtigt.

---

## Vigtigt: Målgrupper

Marketing-sitet skal kun tale til to målgrupper:

### 1. Foreninger
- Danske foreninger, klubber og lokale fællesskaber, der vil modtage støtte
- **Primær CTA:** "Start gratis som forening"
- De køber: mindre administration, verificering, bogføring, udbetaling, gennemsigtighed, ingen binding

### 2. Støttere
- Personer, der vil støtte en verificeret dansk forening
- **Primær CTA:** "Find en forening at støtte"
- De køber: tryghed, enkelhed, gennemsigtighed, hurtig støtteoplevelse

### Eksplicit udelukket
- **Ingen** virksomhedsrolle
- **Ingen** virksomhedspartner-flow
- **Ingen** CTA rettet mod virksomheder

### Kernesætning

> **Foreninger opretter sig. Støttere giver. StøtMedHjerte gør det trygt, gennemsigtigt og administrativt enkelt.**

---

## Brand og visuel retning

Behold StøtMedHjerte branding og farver.

### Låste farver

```css
--brand-red: #E0193F;
--brand-red-light: #FF4D6A;
--bg-dark: #0F172A;
```

### Udvid palette med mere dybde

```css
--smh-navy-950: #070B16;
--smh-navy-900: #0F172A;
--smh-navy-850: #111C33;
--smh-navy-800: #17233D;
--smh-surface-glass: rgba(255,255,255,0.07);
--smh-border-glass: rgba(255,255,255,0.12);
--smh-warm-white: #FFFDFB;
--smh-soft: #F8FAFC;
--smh-line: #E5E7EB;
```

### Brug brand-rød intelligent

**Brug rød til:**
- Primary CTA
- Active states
- Key numbers
- Flow lines
- Badges
- Små ikoner
- Glow bag produktmockup

**Undgå rød til:**
- Store tekstblokke
- For mange card borders
- Sekundære CTA'er
- Store baggrundsflader
- Alle ikoner

> Rød skal være **energi og fokus** - ikke visuel støj.

---

## Overordnet designmål

Målet er ikke bare at gøre sitet flottere.

Målet er at skabe en visuel oplevelse, hvor brugeren straks forstår:

1. Platformen er teknisk stærk
2. Pengestrømmen er gennemsigtig
3. Foreninger bliver verificeret
4. Administrationen bliver lettere
5. Støttere kan støtte trygt
6. SMH er en professionel SaaS-platform - ikke en klassisk NGO-side

### Designinspiration

Designet skal føles som en blanding af:

- **Stripe** - teknisk dybde og gradients
- **Linear** - skarphed og motion
- **Mercury** - finansiel tillid
- **Vercel** - moderne polish
- **Apple** - ro, spacing og produktpræsentation

---

## 1. Redesign hero som visuelt wow-moment

Hero skal være **split layout på desktop**:
- **Venstre:** value proposition, CTA'er og trust row
- **Højre:** levende dashboard mockup med glassmorphism, dybde og floating activity cards

På **mobile** stackes indholdet:
1. Eyebrow
2. H1
3. Subtitle
4. CTA'er
5. Trust row
6. Dashboard mockup

### Hero content

```
Eyebrow:
  Verificeret fundraising for danske foreninger

H1:
  Modtag støtte.
  Uden tung administration.

Subtitle:
  StøtMedHjerte samler donationer, fast støtte, webshop, verificering,
  bogføring og udbetaling i én moderne platform for danske foreninger.

Primary CTA:
  Start gratis som forening

Secondary CTA:
  Find en forening at støtte

Trust row:
  80% til foreningen · Verificerede foreninger · Ingen binding
```

**Vigtigt om økonomisk transparens:**
- 80% gælder donationer og fast støtte
- Webshop skal omtales separat med 32,75% af net profit til foreningen
- Undgå at antyde, at 80% gælder webshop

### Hero visual concept

Hero skal føles som et levende produktunivers:
- Mørk navy baggrund
- Rød/pink glow i flere lag
- Subtil animated grid
- Aurora glow bag dashboard mockup
- Glass cards med dybde
- Dashboard mockup i 3D-ish perspective på desktop
- Floating activity cards
- Små live metrics
- Rolig motion

### Animated gradient mesh

Erstat eller udvid de statiske orbs med en rolig animated gradient mesh.

```css
background:
  radial-gradient(circle at 80% 20%, rgba(224,25,63,0.30), transparent 32%),
  radial-gradient(circle at 20% 80%, rgba(255,77,106,0.18), transparent 28%),
  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 40%),
  #0F172A;
```

```css
@keyframes gradientDrift {
  0%, 100% {
    transform: translate3d(0,0,0) scale(1);
  }
  50% {
    transform: translate3d(-18px, 12px, 0) scale(1.04);
  }
}
```

Brug meget rolig timing:
```css
animation: gradientDrift 14s ease-in-out infinite;
```

Respektér reduced motion.

### Aurora glow bag mockup

Tilføj glow bag dashboardet - **ikke bag teksten**.

```jsx
<div className="absolute -inset-24 bg-[radial-gradient(circle,rgba(224,25,63,0.32),transparent_62%)] blur-3xl opacity-80" />
```

### Glassmorphism dashboard

Dashboard mockup skal **ikke være placeholder**. Byg det som rigtig HTML/CSS.

**Wrapper:**
```jsx
className="
  relative
  bg-white/[0.07]
  border border-white/[0.12]
  backdrop-blur-2xl
  shadow-[0_24px_80px_rgba(0,0,0,0.35)]
  rounded-[28px]
  p-6
"
```

**Desktop perspective:**
```css
.mockup-perspective {
  transform: perspective(1200px) rotateY(-8deg) rotateX(4deg);
  transform-style: preserve-3d;
}
```

**Mobile:**
```css
@media (max-width: 768px) {
  .mockup-perspective {
    transform: none;
  }
}
```

### Dashboard content

Brug eksempeldata som føles realistisk:

```
Nordsjællands Svømmeklub

Aktiv støtte denne måned
18.450 kr.

Faste støtter
127

Donationer
42

Webshop-overskud
6.280 kr.

Næste udbetaling
28. juli

Status
Verificeret
```

Vis gerne en lille fordeling:

```
Donationer:    8.700 kr.
Fast støtte:   3.470 kr.
Webshop:       6.280 kr.
```

**Bemærk:**
- Webshop skal formuleres som "webshop-overskud" eller "webshop-bidrag", ikke donation
- Undgå forvirring mellem 80% og 32,75% webshopmodellen

### Floating activity cards

Tilføj 3-4 små cards omkring dashboardet på desktop.

**Eksempler:**
```
+200 kr. fast støtte
Donation modtaget
Forening verificeret
Udbetaling planlagt
```

**Styling:**
```jsx
className="
  bg-white/[0.08]
  border border-white/[0.14]
  backdrop-blur-xl
  rounded-2xl
  shadow-[0_16px_48px_rgba(0,0,0,0.28)]
  px-4 py-3
"
```

**Mobile:**
- Vis maks 1-2 floating cards
- Eller integrér dem som små badges under dashboardet
- Ingen 3D perspective på mobile

---

## 2. Dual-path section direkte under hero

Efter hero skal brugeren straks kunne vælge retning.

Lav en section lige under hero med to cards:
1. For foreninger
2. For støttere

**Ingen virksomhedskort.**

### Content

**For foreninger**
> Få en gratis profil, modtag støtte og lad StøtMedHjerte håndtere verificering, bogføring og udbetaling.

CTA: **Start gratis**

**For støttere**
> Find en verificeret dansk forening og se tydeligt, hvor støtten går hen.

CTA: **Find en forening**

### Layout

```jsx
<section className="relative -mt-12 z-20">
  <Container>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
      ...
    </div>
  </Container>
</section>
```

**Cards:**
```jsx
<Card
  variant="secondary"
  tone="dark"
  padding="lg"
  className="h-full flex flex-col"
>
```

**CTA wrapper:**
```jsx
<div className="mt-auto pt-5">
```

---

## 3. Signature section: Pengestrømmen

Byg en visuelt imponerende flow-section, der forklarer pengenes vej.

**Denne section skal være en af sidens mest mindeværdige dele.**

### Formål

Brugeren skal forstå:
- Støtter giver
- SMH håndterer betaling, verificering og bogføring
- Foreningen får udbetaling
- Alt sker gennemsigtigt

### Flow

```
Støtter
   ↓
Donation / Fast støtte / Webshop
   ↓
SMH verificering + bogføring
   ↓
Foreningen modtager støtte
```

### Visuel idé

- 4 glass cards
- Forbundet med animated red line
- Små dots bevæger sig gennem flowet
- Badge ved donation/fast støtte: **80% til foreningen**
- Badge ved webshop: **32,75% af net profit**
- Brug brand-rød som flow-line
- Brug rolig animation

### Content

**Headline:** Fra støtte til udbetaling - uden manuelt kaos

**Subtitle:** StøtMedHjerte samler betalinger, dokumentation og udbetaling i ét kontrolleret flow.

**Steps:**

1. **Støtteren vælger en forening**
   Donation, fast støtte eller webshop-køb.

2. **Betalingen registreres**
   Alle bidrag bliver knyttet til den valgte forening.

3. **SMH håndterer administrationen**
   Verificering, bogføring og dokumentation samles ét sted.

4. **Foreningen får udbetaling**
   Foreningen kan følge støtte og kommende udbetalinger.

---

## 4. Signature section: Trust stack

Trust skal være en **central produktoplevelse** - ikke bare badges.

### Content

**Headline:** Bygget til tillid fra første betaling

**4 pillars:**

1. **80% går til foreningen**
   Ved donationer og fast støtte går 80% direkte til den valgte forening.

2. **Alle foreninger verificeres**
   Vi verificerer foreninger, ansvarlige personer og udbetalingsoplysninger.

3. **Automatisk bogføring og udbetaling**
   Donationer, fast støtte og webshop-indtægter samles i en kontrolleret model.

4. **Dansk platform. Dansk compliance.**
   Bygget til danske foreninger, betalingsflows og dokumentationskrav.

### Visuel retning

Må gerne være dark section:

```jsx
className="bg-slate-950"
```

**Cards:**
```jsx
className="
  bg-white/[0.06]
  border border-white/[0.10]
  backdrop-blur-xl
  rounded-[24px]
"
```

**Ikoner:**
```jsx
className="
  text-brand
  bg-white/[0.06]
  border border-white/[0.10]
"
```

---

## 5. Signature section: Live support dashboard

Lav en stor produktsektion med dashboardet i brug.

**Ikke screenshot.** Byg som rigtig HTML/CSS, så det er skarpt på alle skærme.

### Content

**Headline:** Overblik uden regneark

**Subtitle:** Foreningen kan følge støtte, faste bidrag, webshop-overskud og kommende udbetalinger ét sted.

**Dashboard-data:**

```
Denne måned
18.450 kr.

Fordeling:
Donationer:    8.700 kr.
Fast støtte:   3.470 kr.
Webshop:       6.280 kr.

Næste udbetaling:
28. juli

Status:
Klar til udbetaling
```

---

## 6. Tre indtægtskanaler

Forklar de tre kanaler tydeligt.

### Content

**Headline:** Tre måder at modtage støtte på

**1. Donationer**
> Modtag engangsdonationer fra medlemmer, familie og lokale støttere. Ved donationer går 80% til foreningen.

**2. Fast støtte**
> Gør det nemt for støttere at bidrage fast hver måned. Ved fast støtte går 80% til foreningen.

**3. Webshop**
> Foreningen kan få supporterprodukter uden lager og drift. Ved webshop-salg går 32,75% af net profit til foreningen.

**Vigtigt:**
- Webshop skal **ikke** beskrives som 80%
- Hold sproget konkret
- Undgå sentimentalitet

---

## 7. CTA design

Primary CTA skal føles som et premium object.

### Primary CTA

```jsx
className="
  h-14 px-7 rounded-2xl
  bg-brand text-white
  shadow-[0_16px_40px_rgba(224,25,63,0.28)]
  hover:shadow-[0_20px_52px_rgba(224,25,63,0.34)]
  hover:-translate-y-0.5
  active:translate-y-0
  active:scale-[0.99]
  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
"
```

### Secondary CTA dark

```jsx
className="
  h-14 px-7 rounded-2xl
  bg-white/[0.06]
  border border-white/[0.14]
  text-white
  backdrop-blur-xl
  hover:bg-white/[0.10]
  hover:border-white/[0.22]
  active:scale-[0.99]
  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
"
```

### Secondary CTA light

```jsx
className="
  h-14 px-7 rounded-2xl
  bg-white
  border border-brand/35
  text-brand
  hover:bg-brand-tint
  hover:border-brand
  active:scale-[0.99]
  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
"
```

### Mobile CTA

Hero CTA'er skal være full-width på mobile:

```jsx
className="w-full sm:w-auto min-h-[48px]"
```

---

## 8. Motion og microinteractions

Brug moderne motion, men kontrolleret.

**Ingen voldsomme scroll effects. Ingen gimmicks.**

### Hero reveal

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
```

```css
animation: heroReveal 700ms cubic-bezier(0.16,1,0.3,1) both;
```

**Stagger:**
- Eyebrow: 0ms
- H1: 80ms
- Subtitle: 160ms
- CTA: 240ms
- Trust row: 320ms
- Mockup: 400ms

### Scroll reveal

Brug **kun** på centrale elementer:
- Section headlines
- Cards
- Dashboard modules
- Trust blocks

**Animation:**
- Opacity 0 -> 1
- TranslateY 16px -> 0
- Blur 8px -> 0
- Duration 600-800ms
- Easing cubic-bezier(0.16,1,0.3,1)

### Hover effects

**CTA:**
```jsx
hover:-translate-y-0.5
active:scale-[0.99]
```

**Cards:**
```jsx
hover:-translate-y-1
```

Ikke `hover:-translate-y-2`.

### Reduced motion

Alt animation skal respektere:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Typografi

Opgrader typografi til en mere moderne premium SaaS-retning.

### Anbefalet

```css
--font-heading: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
```

> **STATUS:** Stage B1 implementerer denne (in progress 6/5 2026)

Hvis Inter ikke er sat op, implementér den korrekt eller brug fallback uden at bryde layout.

### Type scale

```css
--text-display: 60px;
--text-display-mobile: 38px;
--text-h1: 44px;
--text-h2: 30px;
--text-h3: 20px;
--tracking-tight: -0.035em;
--tracking-display: -0.025em;
--tracking-default: -0.005em;
```

> **STATUS:** Implementeret i Stage A (6/5 2026)

### Hero H1

```jsx
className="
  text-[38px]
  sm:text-[46px]
  md:text-[60px]
  leading-[1.04]
  tracking-[-0.035em]
  font-semibold
  max-w-[920px]
"
```

### Split hero H1

Kan være lidt større, hvis mockup stadig har plads:

```jsx
className="
  text-[40px]
  md:text-[64px]
  lg:text-[72px]
  leading-[0.98]
  tracking-[-0.045em]
  font-semibold
"
```

Men undgå at dansk tekst bliver klemt eller får dårlige linjebrud.

---

## 10. Pixel polish

### H1

**Centered:** `max-w-[920px]`
**Split:** `max-w-[620px]`

> **STATUS:** Implementeret i Stage A (6/5 2026)

### Subtitle

**Centered:** `max-w-[720px] leading-[1.55]`
**Split:** `max-w-[560px] leading-[1.55]`

> **STATUS:** Implementeret i Stage A (6/5 2026)

### Trust row

**Mobile:** `gap-x-5 gap-y-2`
**Desktop:** `gap-x-7 gap-y-3`

### Cards

Cards i grids:
```jsx
className="h-full flex flex-col"
```

CTA nederst:
```jsx
className="mt-auto pt-5"
```

---

## 11. Mobile-first krav

På mobile skal sitet stadig føles imponerende, men ikke tungt.

### Mobile regler

- Ingen 3D perspective
- Mindre orbs
- Dashboard mockup under hero
- Floating cards maks 1-2 stk
- CTA full-width
- Trust row må wrappe til 2 linjer
- Hero H1 max ca. 40-42px
- Ingen tung parallax

### Mobile hero H1

```jsx
className="
  text-[40px]
  leading-[1.02]
  tracking-[-0.04em]
"
```

### Mobile mockup

```jsx
className="
  mt-10
  rounded-[24px]
  bg-white/[0.07]
  border border-white/[0.12]
"
```

---

## 12. Sidearkitektur

Byg forsiden i denne rækkefølge:

1. **Hero** med levende dashboard mockup
2. **Dual path:** For foreninger / For støttere
3. **Pengestrømmen**
4. **Trust stack**
5. **Live support dashboard**
6. **Tre indtægtskanaler**
7. **Hvordan det virker**
8. **Pricing / fordeling**
9. **FAQ**
10. **Final CTA**

**Vigtigt:**
- Ingen virksomhedsspor
- Ingen virksomhedspartner CTA
- Ingen "Jeg er virksomhed"
- Kun foreninger og støttere

---

## 13. Content-regler

### Tone

- Professionel
- Varm
- Konkret
- Tryg
- Gennemsigtig
- **Ikke** sentimental
- **Ikke** NGO-agtig
- **Ikke** hype

### Brug ord som

- tryg
- gennemsigtig
- verificeret
- automatisk
- samlet
- uden tung administration
- gratis at starte
- ingen binding

### Undgå

- drøm
- passion
- red verden
- impact
- revolutionerende
- magisk
- hjertevarm som hovedbudskab
- virksomheder
- CSR
- partnerprogram

---

## 14. Økonomisk transparens

**Dette er vigtigt for trust.**

Brug konsekvent:

> Ved donationer og fast støtte går **80%** til foreningen.
> Ved webshop-salg går **32,75%** af net profit til foreningen.

Undgå formuleringer, der får det til at lyde som om 80% gælder alt.

---

## 15. Implementeringsprioritet

### Fase 1 - Visuelt fundament

1. Opgrader hero til split layout
2. Tilføj animated gradient mesh
3. Tilføj aurora glow
4. Byg ægte dashboard mockup
5. Tilføj floating activity cards
6. Reducér rød støj og kontroller glow

### Fase 2 - Conversion architecture

1. Tilføj dual-path section
2. Gør CTA-hierarki tydeligere
3. Sikr mobile full-width CTA'er
4. Placér trust row tæt på CTA'er

### Fase 3 - Signature sections

1. Byg Pengestrømmen
2. Byg Trust stack
3. Byg Live support dashboard
4. Byg Tre indtægtskanaler

### Fase 4 - Premium polish

1. Opgrader typografi
2. Tilføj hero reveal
3. Tilføj scroll reveal
4. Justér hover states
5. Gennemgå mobile experience

---

## 16. Konkret designmål

Når brugeren lander på siden, skal de tænke:

> Det her ser professionelt ud.
> Det her virker trygt.
> Jeg forstår hvor pengene går hen.
> Jeg kan se, at systemet håndterer administrationen.
> Jeg kan vælge min vej med det samme.

**Foreningen skal tænke:**
> Det her kan spare os tid og gøre støtte mere professionelt.

**Støtteren skal tænke:**
> Jeg kan trygt støtte en verificeret forening her.

---

## 17. Slutresultat

Løft Premium-Pulse fra statiske dark sections til en visuelt imponerende, moderne fintech/SaaS-oplevelse.

**Brug:**
- Animated gradient mesh
- Aurora glow
- Glassmorphism dashboard
- 3D perspective mockup desktop only
- Floating live activity cards
- Animated flow-lines i pengestrømssektion
- Scroll reveal med opacity/translate/blur
- Premium CTA shadows
- Roligere secondary buttons
- Klar dual-path for foreninger og støttere

> Målet er ikke mere pynt.
>
> Målet er: **Wow gennem produkt, teknologi og tillid.**

---

## Cross-reference til Stage A (allerede DONE 6/5 2026)

Følgende fra denne brief er **ALLEREDE implementeret** i Stage A merge til main (commit `b48323e`):

- ✅ Tracking: -0.035/-0.025/-0.005em
- ✅ Text scale: display 60/38, h1 44, h2 30
- ✅ Eyebrow dark glassmorphism: bg-white/[0.07] border-white/[0.12] backdrop-blur-xl
- ✅ HeroOrbs reduceret intensity (mindre kampagneagtigt)
- ✅ CTA primary dark base shadow
- ✅ CTA primary dark hover glow 0.30
- ✅ CTA secondary light: border + tint hover
- ✅ CTA secondary dark: glassmorphism
- ✅ CTA active scale 0.99
- ✅ Card hover translate-y-1
- ✅ Hero H1 max-width 920/620 + leading 1.04
- ✅ Hero subtitle max-width 720/560 + leading 1.55

## Cross-reference til Stage B1 (in progress 6/5 2026)

- 🔄 Inter Tight + Inter Google Fonts integration (filer skrevet, sed-fix pending visual approval)

## Resterende implementation (DEFERRED til fortsættelse)

### Stage B2 - Hero reveal animation
- Hero reveal keyframes + stagger delays

### Stage C1 - Section primitives
- AudiencePathCards (dual-path under hero)
- TrustStack (4 pillars)
- ProductChannels (3 indtægtskanaler)
- PreLaunchProof
- FAQ
- FinalCTA

### Stage C2 - Dashboard mockup
- DashboardMockup component med Nordsjællands Svømmeklub data
- Glassmorphism wrapper
- 3D perspective desktop only
- Floating activity cards (3-4 på desktop, 1-2 mobile)

### Stage C3 - Home page rebuild
- Replace src/pages/Home.jsx med 10 sektioner per sidearkitektur
- Hero med ny conversion-fokuseret copy
- Animated gradient mesh
- Aurora glow

### Stage D - Pengestrømmen flow section
- 4 glass cards forbundet med animated red line
- Små dots bevæger sig gennem flowet
- Badges ved 80% og 32,75%

### Stage E - Live support dashboard section
- Dashboard i brug (ikke screenshot)
- Realistic data

### Stage F - Motion polish
- Scroll reveals
- Hover micro-interactions
- Reduced motion respect

### Other pages (002b-002n)
13 pages udover Home - ikke covered i denne brief, separat scope.

---

## Critical content rules

### Tone-of-voice anchors

| Brug | Undgå |
|------|-------|
| tryg | drøm |
| gennemsigtig | passion |
| verificeret | red verden |
| automatisk | impact |
| samlet | revolutionerende |
| uden tung administration | magisk |
| gratis at starte | hjertevarm |
| ingen binding | virksomheder/CSR/partner |

### Økonomi-formuleringer (LÅST)

```
Donationer:     "80% til foreningen"
Fast støtte:    "80% til foreningen"
Webshop:        "32,75% af net profit"
```

**Aldrig** generic "80% til foreningen" uden context.

---

## Filers placering på system

```
~/Desktop/smh-app/docs/marketing/
├── BRAND-TOKENS.md                              [existing]
├── IMPLEMENTATION-BRIEF-10-OUT-OF-10.md         [DENNE FIL - placer her]
└── wireframes/
    └── wireframe-home.md                        [existing]
```

---

## Last updated

6. maj 2026 - modtaget fra ChatGPT senior frontend engineer + UX/UI designer brief. Cross-referenced til Stage A done items og deferred Stage B-F items.

> Denne brief er den **autoritative reference** for alle Stage B-F + 002a-002n implementations. Alle pull requests skal valideres mod specs i dette dokument.
