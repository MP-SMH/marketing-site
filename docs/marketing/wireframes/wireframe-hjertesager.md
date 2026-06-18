# Wireframe: `/hjertesager` (B2C Browse + Hjertesag Flow)

**Version:** 1.2
**Dato:** 5. maj 2026
**Status:** Klar til implementering (MVP-mode for launch)
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-IDs:** F1-13 (listing), F1-14 (detalje), F1-15 (donations-flow), F1-16 (tak)
**Review:** ChatGPT-CMO 5. maj 2026 + Mario direktiv (100 kr. minimum) + MVP-mode redesign

---

## Page-formål

(Uændret fra v1.0)

**Mario direktiv v1.1:** Minimum-donation er **100 kr.**

**Mario direktiv v1.2 - MVP-realitet:** Pre-launch har vi 2 foreninger og 2 hjertesager. Side 1 (listing) er redesignet til MVP-mode: ingen filter/sort/featured-sektion, men ærlig "vi er nye"-tone og prominent visning af de få aktive sager.

**Strategisk positionering:** Hjertesager er hovedindgangen til hele B2C-flowet. Hele flowet på stotmedhjerte.dk - ingen domain-shifts under konvertering.

**Flow-struktur (CMO-justeret v1.1):**

```
/hjertesager           → Listing (browse)
/hjertesager/{slug}    → Detaljeside
/hjertesager/{slug}/donate → Donations-flow (3 steps, ikke 4)
/hjertesager/{slug}/tak    → Bekræftelse
```

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Features mappet til siden

(Uændret fra v1.0)

---

# 📄 Side 1: `/hjertesager` (Listing - MVP-mode)

## MVP-mode rationale

Pre-launch reality: 2 foreninger, 2 hjertesager. Volume-baserede UI-elementer (filter, sort, featured-sektion, grid) gemmes til v1.3 når vi har 10+ aktive hjertesager. Listing-siden er redesignet for ÆRLIGHED og PRIMÆR-CTA i stedet for browse-flow.

## Sektion-rækkefølge (MVP-mode v1.2)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero - ærlig om ny platform | 100 | Subtle gradient |
| 2 | Aktive hjertesager (prominent) | 60 | Hvid |
| 3 | Sådan virker en hjertesag (forklaring) | 180 | #F9FAFB |
| 4 | Hvorfor StøtMedHjerte? (kort version + cross-link) | 100 | Hvid |
| 5 | Andre måder at støtte på | 120 | #F9FAFB |
| 6 | B2B Final CTA - "Vil din forening være med?" | 80 | Dark gradient |
| **Total** | | **~640 ord** | |

## Brand-token anvendelse

| Sektion | Ikon |
|---|---|
| Hero trust-row | `Heart`, `ShieldCheck`, `MapPin` |
| Hjertesag-cards | `Heart`, `ShieldCheck`, `Calendar` |
| Sådan virker forklaring | `Search`, `CreditCard`, `Mail` |
| Andre måder | `Repeat`, `ShoppingBag` |
| Final CTA | `ArrowRight` |

---

## Sektion-detaljer (MVP-mode v1.2)

### **1. Hero - ærlig om ny platform**

**Brand-tokens:**
- Background: subtle gradient (#F9FAFB → hvid)
- Hero kompakt (~40vh) - ikke fullscreen, indholdet er hovedfokus
- Tier-3 soft elements

**Motion (rolig):**
```
T+0.0s: H1 fade-up
T+0.3s: Subheadline fade-up
T+0.5s: Trust-badges stagger reveal
```

**Content-spec:**

- **H1:** "Find en forening at støtte"
- **Subheadline:** "StøtMedHjerte er en helt ny dansk platform. Vi starter med få verificerede foreninger og bygger videre sammen med dem. Du kan støtte de første hjertesager nedenfor."
- **Trust-row (3 badges):**
  - `ShieldCheck` - Verificerede foreninger
  - `Heart` - 80% af din donation går til foreningen
  - `MapPin` - Bygget til dansk foreningsliv

**Word count:** ~100 ord

---

### **2. Aktive hjertesager (prominent)**

**MVP-mode rationale:** Med 2 sager total, vis dem prominent - ikke i et grid der ser tomt ud. Stort layout, fuld bredde per card.

**Brand-tokens:**
- Background: hvid
- 1-2 store cards (full-width per card på mobile, 2-kolonner på desktop hvis 2 sager)
- Tier-1 styling (mere prominent end normal grid)

**Motion (rolig):**
```
T+0.0s: Header fade-up
T+0.3s: Cards fade-up sequentielt
```

**Content-spec:**

**Headline:** "Aktive hjertesager"

**Hvert card (full prominent display):**
- Hero-billede (16:9 eller 4:3)
- Forenings-logo + navn + `ShieldCheck` Verificeret
- Hjertesag-titel (H3, prominent)
- Kort beskrivelse (3-4 linjer, ikke truncated)
- Progress-bar (stor)
- Indsamlet beløb + mål (large numbers)
- "X dage tilbage" (`Calendar`)
- Lokation (`MapPin` + by)
- Primary CTA: "Læs mere og støt" `ArrowRight` → `/hjertesager/{slug}`

**Empty state (når 0 sager):** "Der er pt. ingen aktive hjertesager. Du kan stadig støtte fast hver måned eller købe supporterprodukter - se mulighederne nedenfor."

**Hvis 1-2 sager:** Vis dem prominent.
**Hvis 3+ sager:** Skift til grid-layout (eller behold prominent display).

**Word count:** ~60 ord

---

### **3. Sådan virker en hjertesag (forklaring)**

**MVP-mode rationale:** Få mennesker kender konceptet "hjertesag" som dansk fundraising-format. Vi bruger pladsen til at uddanne nye besøgende.

**Brand-tokens:**
- Background: #F9FAFB
- Tier-2 secondary card med 3 trin
- Brand-red step-numbers

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3-step flow reveals timeline-style
```

**Content-spec:**

**Headline:** "Sådan virker en hjertesag"

**Subheadline:** "En hjertesag er en konkret indsamling fra en forening - fx til nye materialer, et bestemt projekt, en specifik aktivitet eller nye faciliteter. Sådan fungerer det:"

**3 trin:**

1. **Vælg en hjertesag du gerne vil støtte** (Ikon: `Search`)
   "Hver hjertesag har et formål, et mål-beløb og en tidsperiode. Du kan se alt, før du beslutter dig."

2. **Donér det beløb du vil give** (Ikon: `CreditCard`)
   "Minimum 100 kr. Sikker betaling via certificeret betalingspartner. 80% af din donation går direkte til foreningen."

3. **Følg med i indsamlingen** (Ikon: `Mail`)
   "Du modtager kvittering på email kort efter. Du kan også følge med på hjertesagen og se den blive realiseret."

**Word count:** ~180 ord

---

### **4. Hvorfor StøtMedHjerte? (kort version)**

**MVP-mode rationale:** Brugere der lander her uden at kende SMH skal hurtigt forstå "hvem og hvorfor". Cross-link til /om-os for fulde story.

**Brand-tokens:**
- Background: hvid
- 3 mini-cards med ikoner

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3 cards reveal stagger
```

**Content-spec:**

**Headline:** "Hvorfor StøtMedHjerte?"

**3 mini-cards:**

`ShieldCheck` **Verificerede foreninger**
"Hver forening gennemgås, før de kan modtage støtte."

`Heart` **80% til foreningen**
"Klar fordeling - ved donationer og fast støtte. Resten dækker betaling, drift og platformen bag."

`MapPin` **Bygget til dansk foreningsliv**
"Danske regler, danske støttevaner, dokumentation tænkt ind fra starten."

**CTA:** "Læs hele historien om StøtMedHjerte" `ArrowRight` → `/om-os`

**Word count:** ~100 ord

---

### **5. Andre måder at støtte på**

(Stort set uændret fra v1.1, men fjernet "100+ foreninger"-implicitter)

**Brand-tokens:**
- Background: #F9FAFB
- 2 cards side-by-side

**Motion:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "Andre måder at støtte på"

**Subheadline:** "Hvis ingen aktiv hjertesag passer lige nu, kan du stadig støtte foreninger på andre måder."

**Card 1: Fast Støtte** (Ikon: `Repeat`)
"Bliv fast støtter af én forening og giv et månedligt beløb. Den mest stabile støtteform."
**CTA:** "Læs om Fast Støtte" `ArrowRight` → `/fast-stoette`

**Card 2: Supporterprodukter** (Ikon: `ShoppingBag`)
"Køb supporterprodukter fra foreningernes webshops. 32,75% af nettoprofitten går til hjertesagen."
**CTA:** "Se webshops" `ArrowRight` → shop.stotmedhjerte.dk

**Word count:** ~120 ord

---

### **6. B2B Final CTA - "Vil din forening være med?"**

**MVP-mode rationale:** Listing-siden er ofte landingspunkt for både B2C og B2B. Med få sager, brug Final CTA til at recruite flere foreninger.

**Brand-tokens:** Dark gradient + brand-red orbs

**Content-spec:**

**Headline:** "Vil din forening være med?"

**Subheadline:** "Vi er en helt ny platform og bygger videre sammen med de første foreninger. Hvis I vil oprette hjertesager og modtage støtte, kan I komme i gang gratis."

**Primary CTA:** "Læs mere for foreninger" `ArrowRight` → `/foreninger`
**Secondary CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`

**Word count:** ~80 ord

---

# 📄 Side 2: `/hjertesager/{slug}` (Detaljeside)

## Sektion-rækkefølge (CMO-omstruktureret v1.1)

**CMO-rettelse:** Indsamling-status integreres i Hero (ikke separat sektion).

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero (med integreret progress) | 130 | Hvid |
| 2 | Sticky CTA-bar | 30 | Hvid |
| 3 | Om denne hjertesag (forenings-content) | 200-400 | Hvid |
| 4 | Om foreningen | 80 | #F9FAFB |
| 5 | Del denne hjertesag | 60 | Hvid |
| 6 | Seneste støtteaktivitet | 80 | #F9FAFB |
| 7 | Flere fra samme forening | 80 | Hvid |
| 8 | Final CTA | 60 | Dark gradient |

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero (med integreret progress)**

**CMO-rettet i v1.1:**
- Indsamling-status integreret direkte i Hero
- Ingen separat "Indsamling-status" sektion senere

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Højre side:**
- Forenings-logo (small) + navn + `ShieldCheck`
- Hjertesag-titel (H1)
- Kort beskrivelse (2-3 linjer)
- **Indsamling-block (prominent):**
  - Stor progress-bar
  - Big number: "23.450 kr. indsamlet" + "af 50.000 kr. mål"
  - "47 støtter • 12 dage tilbage" (`Calendar`)
- Primary CTA: "Støt denne sag" → `/hjertesager/{slug}/donate`
- Secondary CTA: "Del" `Share2`

**Word count:** ~130 ord

---

### **2. Sticky CTA-bar (CMO-forenklet v1.1)**

**CMO-rettet i v1.1:**
- Mobile: fixed bottom (uændret)
- Desktop: sticky side card eller diskret top - IKKE forstyrrende fixed top

**Content-spec (CMO v1.1):**

**Mobile (fixed bottom):**
- Forenings-navn (small)
- Progress-status (fx "47%")
- Primary CTA: "Støt denne sag" `ArrowRight`

**Desktop (sticky side card i højre kolonne):**
- Mini progress-bar
- "X.XXX kr. indsamlet af X.XXX kr."
- CTA: "Støt denne hjertesag"

**Word count:** ~30 ord

---

### **3. Om denne hjertesag (forenings-content)**

(Uændret fra v1.0)

---

### **4. Om foreningen (CMO-justeret v1.1)**

**CMO-rettet i v1.1:**
- "Se forenings-profil" som sekundær link (ikke fremhævet)
- Foreningsinfo som accordion/modul, så brugeren ikke trækkes væk fra donation

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Om foreningen"

**Indhold:**
- Forenings-logo + navn
- Kort forenings-beskrivelse (2-3 linjer)
- `ShieldCheck` Verificeret
- "X aktive hjertesager fra denne forening"
- Diskret link: "Se alle foreningens hjertesager" (ikke prominent CTA)

**Word count:** ~80 ord

---

### **5. Del denne hjertesag (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Auto-tekst mere personlig

**Content-spec (CMO v1.1):**

**Headline:** "Del denne hjertesag"

**Body:** "Hjælp foreningen ved at dele med dit netværk."

**Share-buttons:**
- Facebook (`Facebook`)
- LinkedIn (`Linkedin`)
- Email (`Mail`)
- SMS (`MessageCircle`)
- Kopier link (`Copy`)
- QR-kode (`QrCode`)

**Auto-genereret tekst (CMO v1.1):** "Jeg har lige støttet [hjertesag] hos [foreningsnavn]. Hvis du også vil bakke op, kan du gøre det her: [link]"

**Word count:** ~60 ord

---

### **6. Seneste støtteaktivitet (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Seneste støtter" → "Seneste støtteaktivitet"
- Privacy-first display
- "Se alle støtter" link FJERNET i v1
- Note om støtters synlighedsvalg

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Seneste støtteaktivitet"

**Liste (10 seneste):**
- Hvis støtter har valgt synligt navn: "[Navn] støttede for X siden"
- Hvis støtter har valgt anonymitet: "Anonym støttede for X siden"
- Beløb vises kun hvis støtter har valgt synligt
- Besked vises kun hvis støtter aktivt har valgt

**Note:** "Støttere vælger selv, om navn, beløb og besked må vises."

**(IKKE inkluderet i v1):** "Se alle støtter"-link (privacy-kompleksitet, drop til v2)

**Word count:** ~80 ord

---

### **7-8. Flere fra samme forening + Final CTA**

(Uændret fra v1.0)

---

# 📄 Side 3: `/hjertesager/{slug}/donate` (Donations-flow)

## Flow-struktur (CMO-REDUCERET fra 4 → 3 steps v1.1)

```
Step 1: Beløb
   ↓
Step 2: Konto + synlighed (merged step 2+3 fra v1.0)
   ↓
Step 3: Betaling
   ↓
Bekræftelse-redirect til /tak
```

## Sektion-detaljer

### **Header (sticky) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- "Tilbage" → "Tilbage til hjertesagen"

**Content-spec:**
- Forenings-logo + hjertesag-titel (small)
- Progress-indikator: "Trin X af 3" (CMO v1.1)
- "Tilbage til hjertesagen" link (`ArrowLeft`)

---

### **Step 1: Beløb (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Preset-beløb: 100/200/500/1.000 + Andet (2.000 fjernet)
- Minimum 100 kr. nævnt eksplicit (Mario direktiv)
- "Direkte" fjernet fra display

**Content-spec (CMO v1.1):**

**Headline:** "Hvor meget vil du støtte med?"

**Preset-knapper:** 100, 200, 500, 1.000, "Andet beløb"

**Custom input:** Hvis "Andet beløb" valgt
- Input field
- Note: "Mindstebeløb: 100 kr."
- Validering: hvis < 100 kr., disable "Fortsæt"-knap

**Visuel feedback (CMO v1.1):**
- "Ved en donation på [X kr.] går [80% af X] kr. til [foreningsnavn]. Resten dækker betaling, drift og platformen bag."

**CTA:** "Fortsæt" `ArrowRight`

---

### **Step 2: Konto + synlighed (CMO-merged + rewritten v1.1)**

**CMO-rettet i v1.1:**
- Step 2 (konto) og step 3 (info+præferencer) merged
- Konto forklaret som fordel, ikke compliance
- Adresse fjernet (eller conditional)
- Anonymitets-default: privacy-first (nej)
- Newsletter splittet i to opt-ins

**Content-spec (CMO v1.1):**

**Headline:** "Din konto og synlighed"

**Sub-section A: Log ind eller opret konto**

**Hvorfor framing (CMO v1.1):**
"Du skal have en gratis konto, så du kan få kvittering, se din støttehistorik, styre dine oplysninger og følge din støtte ét sted. Det tager under 1 minut, og du kan fortsætte direkte til betaling bagefter."

**2 valg:**

**Eksisterende konto:**
- Email
- Adgangskode
- "Glemt adgangskode" link

**Ny konto:**
- Email
- Adgangskode (med strength-indicator)
- Navn (fornavn + efternavn)

**(Adresse VISES IKKE som standard - CMO v1.1):** Hvis foreningen har §8A-godkendelse og donor vil have skattefradrag, vises adresse-felt conditional med note: "Adresse er nødvendig for §8A-skattefradrag."

**Sub-section B: Synlighed (CMO privacy-first defaults v1.1):**

"Du bestemmer selv, om dit navn eller beløb må vises offentligt. Hvis du ikke vælger noget, vises din støtte anonymt."

- ☐ Vis mit navn på hjertesag-siden (default: nej)
- ☐ Vis mit beløb (default: nej)
- ☐ Tilføj en besked til foreningen (åbner textarea)

**Sub-section C: Newsletter (CMO splittet v1.1):**

- ☐ Ja tak, send mig opdateringer om denne hjertesag (default: nej)
- ☐ Ja tak, send mig nyt fra StøtMedHjerte (default: nej)

**Sub-section D: Vilkår:**
"Ved at fortsætte accepterer du vores [betingelser](/betingelser) og [privatlivspolitik](/privatlivspolitik)."

**CTA:** "Fortsæt til betaling" `ArrowRight`

---

### **Step 3: Betaling (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- MobilePay conditional fjernet (vises automatisk hvis tilgængelig)
- 80/20 sammenfatning konsekvent formuleret

**Content-spec (CMO v1.1):**

**Headline:** "Betal sikkert"

**Betalingsmetoder:**
"De tilgængelige betalingsmetoder vises automatisk."

(Ingen conditional copy om MobilePay specifikt)

**Card-input:**
- Kortnummer
- Udløb + CVV
- Navn på kort
- 3D Secure handling

**Trust-row:**
- `ShieldCheck` "Sikker betaling via certificeret betalingspartner"
- `Lock` "Vi gemmer ikke dine kortoplysninger"
- `Check` "3D Secure beskytter mod uautoriseret brug"

**Sammenfatning (CMO v1.1):**
- Du betaler: [X kr.]
- Til [foreningsnavn]: [80% af X] kr.
- Resten dækker betaling, drift og platformen bag.

**CTA:** "Gennemfør betaling - [X kr.]" `Lock`

---

# 📄 Side 4: `/hjertesager/{slug}/tak` (Bekræftelse)

## Sektion-rækkefølge (CMO-OMPRIORITERET v1.1)

**CMO-rettelse:** Tak først, retention bagefter, cross-sell sidst og diskret.

| # | Sektion | Indhold |
|---|---|---|
| 1 | Hero - "Tak!" | Bekræftelse |
| 2 | Donations-detaljer + kvittering | Hvad sker der nu |
| 3 | Del hjertesagen | Primær handling efter donation |
| 4 | Følg din støtte | Sekundær - link til støtteoverblik |
| 5 | Bliv fast støtter? | Tertiær - diskret cross-sell |

**Drop fra v1.0:**
- "Andre hjertesager du måske kan lide" (drop i v1 - for meget cross-sell)

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero - "Tak!"**

**CMO-rettet i v1.1:**
- Confetti diskret (1 sekund, lav intensitet, respekterer prefers-reduced-motion)
- "Direkte" fjernet fra subheadline

**Brand-tokens:** (uændret fra v1.0)

**Motion (DÆMPET v1.1):**
```
T+0.0s: Heart-ikon scales in (spring, subtle)
T+0.3s: Headline fade-up
T+0.5s: Subheadline fade-up
T+0.7s: Confetti DISKRETE (1 sekund, lav intensitet)
        - Disabled hvis prefers-reduced-motion
        - Ingen lyd
```

**Content-spec (CMO v1.1):**

- **H1:** "Tak for din støtte!"
- **Subheadline:** "Din donation på [X kr.] er modtaget. [80% af X] kr. går til [foreningsnavn]."

---

### **2. Donations-detaljer + kvittering (CMO-merged v1.1)**

**CMO-rettet i v1.1:**
- "Hvad sker der nu" merged med donations-detaljer (færre sektioner)
- "Foreningen får besked og kan se din donation" → præcist GDPR

**Tier-3 card med:**
- Beløb: X kr.
- Til foreningen: [80% af X] kr.
- Hjertesag: [titel]
- Forening: [navn] `ShieldCheck`
- Transaktions-ID

**Hvad sker der nu:**
- ✓ Du modtager kvittering på email kort efter
- ✓ Foreningen kan se, at hjertesagen har modtaget støtte. Dine synlige oplysninger afhænger af dine valg om anonymitet.
- ✓ Du kan følge din støtte på dit støtteoverblik

---

### **3. Del hjertesagen (PRIMÆR HANDLING v1.1)**

**CMO-rettet i v1.1:**
- Promoted til primær handling efter donation

**Brand-tokens:**
- Background: hvid
- Tier-1 PRIMARY card med brand-red border
- Stort `Share2`-ikon

**Content-spec (CMO v1.1):**

**Headline:** "Hjælp foreningen endnu mere"

**Body:** "Hjertesager spreder sig bedst gennem dit netværk. Del med folk du tror vil bakke op."

**Share-buttons:** Samme som detaljeside (sektion 5)

**Auto-tekst:** "Jeg har lige støttet [hjertesag] hos [foreningsnavn]. Hvis du også vil bakke op, kan du gøre det her: [link]"

---

### **4. Følg din støtte (SEKUNDÆR v1.1)**

**CMO-rettet i v1.1:**
- "Profil" → "støtteoverblik" (mere B2C-venligt + matcher faktisk routing)

**Brand-tokens:** Tier-2 secondary card

**Content-spec (CMO v1.1):**

**Headline:** "Følg din støtte"
**Body:** "På dit støtteoverblik kan du se al din støtte, kvitteringer og historik."
**CTA:** "Gå til mit støtteoverblik" `ArrowRight`

---

### **5. Bliv fast støtter? (TERTIÆR - diskret v1.1)**

**CMO-rettet i v1.1:**
- Lavet diskret (ikke dominerende cross-sell)
- Mindre card, sekundær placering

**Brand-tokens:** Tier-3 soft card (diskret)

**Content-spec (CMO v1.1):**

**Headline:** "Vil du støtte fast hver måned?"
**Body:** "Fast Støtte er den mest stabile støtteform. Foreningen kan regne med din støtte hver måned."
**CTA:** "Læs om Fast Støtte" `ArrowRight` → `/fast-stoette`

---

# 🎯 Flow-overordnet visuel-spec (v1.1)

## Tone (CMO-bekræftet)

(Uændret fra v1.0)

## Motion-niveau (CMO-justeret v1.1)

- Listing: subtle scroll-reveal
- Detalje: standard
- Donation-flow: minimal (focus på indtastning)
- Tak: diskret confetti (1 sek, prefers-reduced-motion respekteret)

---

## Inter-page links

(Uændret fra v1.0)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Generic betalingsformulering
- ✅ **Policy 2 - Begge målgrupper:** B2C primary
- ✅ **Policy 3 - MVP-tal master:** 80% korrekt; "direkte" reduceret
- ✅ **Policy 4 - Tone of voice:** Konto som fordel, "støtteaktivitet" ikke "støtter"
- ✅ **Policy 5 - Brand-konsistens:** Lucide-react ikoner, "StøtMedHjerte" konsekvent
- ✅ **Policy 6 - §8A:** Ikke nævnt på flow (passende). Conditional adresse-felt hvis fradrag relevant.

**B2C-flow specifikke checks (CMO v1.1):**
- ✅ Konto-krav som fordel (ikke compliance)
- ✅ Anonymitets-default: privacy-first (nej)
- ✅ Newsletter splittet (hjertesag + platform)
- ✅ Adresse ikke krav som standard
- ✅ Minimum 100 kr. håndteret (Mario direktiv)
- ✅ "Tilbage til hjertesagen" (ikke bare "Tilbage")
- ✅ "Støtteoverblik" (ikke "profil")

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 10 implementeret):**
1. ✅ Konto-krav forklaret som fordel ("Du skal have en gratis konto, så du kan...")
2. ✅ Adresse fjernet fra standard-flow (conditional ved §8A)
3. ✅ Donations-flow reduceret 4 → 3 steps (step 2+3 merged)
4. ✅ Anonymitets-default: privacy-first (nej, ikke ja)
5. ✅ "Foreningen kan se din donation" → præcist GDPR
6. ✅ "Direkte" reduceret, "Resten dækker betaling, drift og platformen bag" konsekvent
7. ✅ MobilePay-conditional fjernet ("vises automatisk")
8. ✅ Tak-side ompri oriteret (Del = primær, cross-sell sidst og diskret)
9. ✅ Mobile cards forenklet (færre felter)
10. ✅ "Se alle støtter" droppet i v1

**Stærke anbefalinger (CMO kategori B - alle 10 implementeret):**
1. ✅ Flow-struktur bevaret
2. ✅ Listing-filter forenklet (beløbsfilter til V2)
3. ✅ "Featured" copy mere ærlig
4. ✅ Mobile cards forenklet
5. ✅ Detaljeside: progress integreret i Hero
6. ✅ Sticky CTA: mobile bottom + desktop side card (ikke fixed top)
7. ✅ "Seneste støtter" → "Seneste støtteaktivitet" + privacy-note
8. ✅ Auto-tekst mere personlig
9. ✅ 2.000 kr. preset fjernet (100/200/500/1.000 + Andet)
10. ✅ Newsletter splittet (hjertesag + platform opt-ins)

**Mario direktiv:**
- ✅ Minimum donation: 100 kr. tilføjet i custom input

**Forslag til overvejelse (CMO kategori C - implementeret hvor relevant):**
1. V2: Kommune/by-filter
2. ✅ "Tæt på mål" → "Næsten i mål"
3. V2: Status-badges
4. ✅ Foreningsprofil ikke trække væk
5. ✅ "Se alle støtter" droppet
6. ✅ Minimum 100 kr. eksplicit
7. ✅ "Tilbage til hjertesagen"
8. ✅ Tak-side: én primær handling (Del)
9. ✅ Confetti diskret
10. ✅ /profil → "støtteoverblik"

---

## v1.1 → v1.2 ændringslog (MVP-mode)

**Mario direktiv:** Pre-launch har vi 2 foreninger og 2 hjertesager. Volume-UI er meningsløst.

**Side 1 (listing) - komplet redesign:**

**FJERNET fra v1.1:**
- ❌ Søg + filter (sticky bar med Sport / Region / Status)
- ❌ Sort-dropdown (Nyeste / Slutter snart / Mest indsamlet / Næsten i mål)
- ❌ Featured hjertesager-sektion (3 cards)
- ❌ "Alle hjertesager"-grid layout
- ❌ "Vis flere"-pagination

**TILFØJET i v1.2:**
- ✅ Ærlig hero-tone: "StøtMedHjerte er en helt ny dansk platform"
- ✅ Prominent visning af aktive hjertesager (1-2 store cards i stedet for grid)
- ✅ NY sektion: "Sådan virker en hjertesag" (3-trins forklaring for nye besøgende)
- ✅ NY sektion: "Hvorfor StøtMedHjerte?" (3 mini-cards med cross-link til /om-os)
- ✅ Empty state-håndtering ("Der er pt. ingen aktive hjertesager")
- ✅ Adaptive layout (1-2 sager: prominent; 3+ sager: grid eller behold prominent)

**BEVARET fra v1.1:**
- ✅ "Andre måder at støtte på" (Fast Støtte + Webshop cross-sell)
- ✅ B2B Final CTA omformuleret: "Vil din forening være med?"

**Side 2 (detaljeside), Side 3 (donate), Side 4 (tak): UÆNDRET**
- Disse sider virker fint med 1+ hjertesager - ingen redesign nødvendig.

**v1.3 roadmap (når 10+ aktive hjertesager):**
- Reintroducer filter/sort/featured-sektion/grid
- Aktiver pagination
- Stage 2: Kommune/by-filter, status-badges, "Næsten i mål"-sortering

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 4 page-IDs, komplet B2C-flow på marketing-domæne |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 10 kritiske + 10 stærke + Mario direktiv (100 kr. minimum). Donations-flow 4→3 steps. Privacy-first defaults. Tak-side ompri oriteret (Del = primær, cross-sell diskret). Mobile cards forenklet. |
| 1.2 | 5. maj 2026 | **MVP-mode redesign af Side 1 (listing).** Pre-launch reality: 2 foreninger + 2 hjertesager. Volume-baserede UI fjernet (filter, sort, featured-sektion, grid). Erstattet med ærlig "vi er nye"-tone, prominent visning af aktive sager, "Sådan virker en hjertesag"-forklaring, mini-værdier-cards med cross-link til /om-os, B2B Final CTA "Vil din forening være med?". Side 2-4 (detalje, donate, tak) uændret - virker fint med 1+ hjertesager. Listing word count: 360 → 640 ord. **Klar til launch-implementering.** |
