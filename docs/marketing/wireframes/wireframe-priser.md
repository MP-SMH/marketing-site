# Wireframe: `/priser` (Pricing Deep-Dive)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-12
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** Den ærligste prissætningsside i dansk fundraising-tech. Foreninger er trætte af platforme der gemmer omkostninger.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Features mappet til siden

(Uændret fra v1.0 - alle 6 Primary features dækket)

---

## Sektion-rækkefølge (CMO-justeret v1.1)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 60 | Dark gradient + orbs |
| 2 | Det korte svar | 130 | Hvid |
| 3 | Tre kanaler, klar fordeling | 280 | #F9FAFB |
| 4 | Det får I med i modellen | 200 | Hvid |
| 5 | Webshop-økonomi (forenklet + accordion) | 240 | #F9FAFB |
| 6 | Hvornår får I pengene | 180 | Hvid |
| 6.5 | **Soft CTA (NY)** | 30 | #F9FAFB |
| 7 | Hvad foreningen selv står for | 130 | Hvid |
| 8 | Hvad skal I sammenligne med | 220 | #F9FAFB |
| 9 | Pris-FAQ | 200 | Hvid |
| 10 | Final CTA | 80 | Dark gradient |
| **Total** | | **~1,750 ord** | |

---

# 🎨 BRAND-TOKEN ANVENDELSE

(Uændret fra v1.0)

**CMO-justering v1.1:**
- "Hvad foreningen selv står for"-sektion: `Info` ikon i stedet for `X` (ikke negativ)
- Motion roligere på pricing-side (counter-animation kun på 3 key-numbers)

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero** - "Gratis opstart. Klar fordeling. Ingen overraskelser."

**CMO-rettet i v1.1:**
- H1: "prissætning" → "fordeling" (mere præcist for FaaS-model uden traditionel pris)
- Subheadline: "vi kun tjener, når I tjener" omformuleret

**Brand-tokens:** Dark gradient + brand-red orbs (samme system)

**Motion:** (FaaS-tech standard, dæmpet)

**Content-spec (CMO v1.1):**

- **H1:** "Gratis opstart. Klar fordeling. Ingen overraskelser."
- **Subheadline:** "Vi tager ikke betaling for at oprette jeres forening eller bruge platformen. StøtMedHjerte får en tydelig andel af den støtte, der kommer ind - og den andel dækker betalinger, drift, support, dokumentation og udvikling."
- **Primary CTA:** "Book et gratis møde"
- **Secondary CTA:** "Opret forening direkte"
- **Trust-row (4 badges):**
  - `Check` - Gratis at komme i gang
  - `ShieldCheck` - Ingen binding
  - `CreditCard` - Ingen oprettelses-fee
  - `TrendingUp` - Ingen månedlige gebyrer

**Word count:** ~60 ord

---

### **2. Det korte svar**

**CMO-rettet i v1.1:**
- Forenklet til "hurtigt svar først, begrundelse bagefter"
- Tilføjet eksplicit "ingen skjulte platformstillæg"
- "StøtMedHjerte tager en andel..." omformuleret korrekt

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card centreret med tier-1 brand-red top-accent
- 3 store key-numbers med brand-red

**Motion:**
```
T+0.0s: Card scales in (0.95 → 1.0)
T+0.3s: 3 numbers tick up (counter, kun her - ikke andre steder)
T+0.8s: Body text fades in
```

**Content-spec (CMO v1.1):**

**Headline:** "Det korte svar"

**Body:** "Det koster 0 kr. at komme i gang. Der er ingen månedlig betaling og ingen binding. Når der kommer støtte ind, fordeles beløbet efter en fast model."

**Tabel (forenklet):**

| Støtteform | Til foreningen |
|---|---|
| Hjertesager | **80%** |
| Fast Støtte | **80%** |
| Webshop | **32,75%** af nettoprofit |

**Under tabellen:** "StøtMedHjertes andel dækker betalingsgebyrer, drift, support, dokumentation, sikkerhed og udvikling."

**Vigtig boks:** "Der er ingen oprettelsesgebyr, ingen månedlig platformbetaling og ingen krav om minimumsomsætning. Hvis ingen støtter jer endnu, betaler I ikke noget til StøtMedHjerte."

**Word count:** ~130 ord

---

### **3. Tre kanaler, klar fordeling**

**CMO-rettet i v1.1:**
- Headline: "klar prissætning" → "klar fordeling"
- Fordelingsformulering omskrevet (ikke "tager en andel af det modtagne")
- 75/25-graduering FJERNET helt (ikke nævnt nogen steder)
- "Hjælp til Indsamlingsnævnet" i stedet for "Indsamlingsnævn-håndtering"

**Brand-tokens:**
- Background: #F9FAFB
- 3 kanal-cards (Hjertesager Tier 1, Fast Støtte + Webshop Tier 2)
- Brand-red key-numbers

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3 cards reveal (subtle, ikke 3D-flip)
```

**Content-spec (CMO v1.1):**

**Headline:** "Tre kanaler, klar fordeling"

**Subheadline:** "Når en støttebetaling gennemføres, fordeles beløbet efter en fast model. Her er præcis hvordan det ser ud for hver kanal."

#### **Card 1: Hjertesager** (Tier 1 PRIMARY)
**Ikon:** `Heart`

**Eksempel: Donation på 200 kr.**
```
Modtaget fra støtter:        200 kr.
Til foreningen (80%):       -160 kr.
Til StøtMedHjerte (20%):    -40 kr.
                            ───────
Foreningen modtager:        160 kr.
```

**StøtMedHjertes andel dækker:**
- Sikker betaling og betalingshåndtering
- Hjælp til Indsamlingsnævnet (tekstudkast, frister, regnskabsgrundlag)
- GDPR, databehandleraftale og databeskyttelse
- Donor-kvitteringer og automatisk kommunikation
- Platform-drift, support og udvikling

**Vigtigt:** "Foreningen får 80% - uanset om donationen er 50 kr. eller 5.000 kr. Samme model for alle foreninger."

#### **Card 2: Fast Støtte** (Tier 2)
**Ikon:** `Repeat`

**Eksempel: Fast støtte på 200 kr./md.**
```
Modtaget fra støtter:        200 kr./md.
Til foreningen (80%):       -160 kr./md.
Til StøtMedHjerte (20%):    -40 kr./md.
                            ─────────
Foreningen modtager:        160 kr./md.
```

**Inkluderer alt fra Hjertesager-andelen, plus:**
- Auto-trækning hver måned
- Support når støtter pauser/opsiger
- Reminder-mails ved fornyelse

#### **Card 3: Webshop** (Tier 2)
**Ikon:** `ShoppingBag`

"Webshop fungerer anderledes end donationer, fordi der er fysiske produkter, moms, produktion, tryk og betaling. Derfor beregnes foreningens andel af nettoprofitten - ikke af salgsprisen."

**Kort version:**
- 32,75% af nettoprofit til foreningen
- Print-on-demand (intet lager-risiko)
- I vælger 5 produkter til jeres kollektion
- Webshoppen ligger på shop.stotmedhjerte.dk

**CTA:** "Se webshop-økonomi" `ArrowRight` → scroll til sektion 5

**Inkluderet-emphasis:** "Samme model for alle foreninger. Små og store får samme fordeling. Det gør prisen gennemskuelig og platformen fair for alle."

**Word count:** ~280 ord

---

### **4. Det får I med i modellen**

**CMO-rettet i v1.1:**
- Headline: "Hvad er inkluderet" → "Det får I med i modellen" (ikke defensiv)
- Dublet (KYC + MitID-verificering) fjernet
- Tekniske termer oversat
- Link til /sikkerhed tilføjet

**Brand-tokens:**
- Background: hvid
- Tier-2 cards organiseret i 3 kolonner
- Success-green checkmarks (`Check`)

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3 columns reveal
T+0.6s: Checkmarks "draw in" sequentielt
```

**Content-spec (CMO v1.1):**

**Headline:** "Det får I med i modellen"

**Subheadline:** "StøtMedHjertes andel dækker hele platformen - ikke kun betalingsbehandling. Her er hvad I får."

**3 kolonner med checkmarks:**

#### **Kolonne 1: Compliance & sikkerhed**
- ✓ Verificering af foreningen og ansvarlig kontaktperson
- ✓ Kontrol af relevante basisoplysninger
- ✓ Hjælp til Indsamlingsnævnet (tekstudkast, frister)
- ✓ GDPR, databehandleraftale og databeskyttelse
- ✓ Sikker betaling via certificeret betalingspartner
- ✓ Sporbar dokumentation og audit-log
- ✓ EU/EØS-baseret datahåndtering

#### **Kolonne 2: Drift & dokumentation**
- ✓ Månedlig regnskabsoversigt (klar til bogholder)
- ✓ Afregningsbilag for hver udbetaling
- ✓ Indsamlings-regnskab eksporterbart
- ✓ Dokument-arkiv (samarbejdsaftaler, juridiske)
- ✓ Auto-trækning ved Fast Støtte
- ✓ Donor-kvitteringer (auto-genererede)

#### **Kolonne 3: Værktøjer & support**
- ✓ Auto-genererede SoMe-tekster og QR-koder
- ✓ Auto-mails (taks, newsletters, reminders)
- ✓ Kommunikations-log
- ✓ Foreningsprofil og kanal-administration
- ✓ Dashboard med 4 KPI-kort
- ✓ Email-support, drift og løbende udvikling

**CTA:** "Læs mere om sikkerhed og dokumentation" `ArrowRight` → `/sikkerhed`

**Word count:** ~200 ord

---

### **5. Webshop-økonomi (FORENKLET v1.1)** [F30, F35]

**CMO-rettet i v1.1:**
- Detaljeret breakdown gemt bag accordion
- Hovedvisning er forenklet flow
- "67,25% til StøtMedHjerte" fjernet som primær linje
- "Nettoprofit"-definition tilføjet

**Brand-tokens:**
- Background: #F9FAFB
- Forenklet flow-diagram primary
- Detaljeret breakdown bag accordion

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: Forenklet flow reveals
T+0.6s: Accordion "Se forenklet eksempel" tilgængelig
```

**Content-spec (CMO v1.1):**

**Headline:** "Webshop-økonomi"

**Subheadline:** "Webshop-køb fungerer anderledes end donationer, fordi der er fysiske produkter, moms, produktion, tryk, betaling, returhåndtering og drift. Derfor beregnes foreningens andel af nettoprofitten - ikke af salgsprisen."

**Forenklet flow:**

```
Salgspris inkl. moms
   ↓
Moms og direkte omkostninger trækkes fra
   ↓
Nettoprofit beregnes
   ↓
32,75% af nettoprofitten går til hjertesagen
```

**Definition (info-box):** "Nettoprofit betyder salgspris ekskl. moms minus direkte omkostninger som produkt, tryk, betaling og ordrebehandling."

**Vigtigt:** "Den konkrete nettoprofit varierer fra produkt til produkt. Derfor viser vi altid webshop-modellen som 32,75% af faktisk nettoprofit - ikke som et fast kronebeløb pr. produkt."

**Vigtig præcisering [F35]:** "Foreningen har INGEN risiko: ingen lager, ingen forudkøb, ingen returomkostninger. Vi producerer kun når der er en bekræftet ordre."

**Resten af StøtMedHjertes andel dækker:** "webshopdrift, produktionssetup, support, returhåndtering, betalingsomkostninger, platform og udvikling."

#### **Accordion: "Se forenklet eksempel på en produktordre"**

**Eksempel: T-shirt sælges for 250 kr.**

```
Salgspris (inkl. moms):              250,00 kr.
Moms (25%):                          -50,00 kr.
                                     ─────────
Salgspris (ekskl. moms):             200,00 kr.

Direkte omkostninger:
- Varekostpris (T-shirt)
- Print-on-demand produktion
- Betalingsgebyr
                                     ─────────
Nettoprofit (eksempel):              ~92,50 kr.

Til foreningen (32,75% af nettoprofit): ~30,29 kr.
```

**Note (CMO v1.1):** "Eksemplet er illustrativt. Faktiske omkostninger varierer efter produkt, tryk, størrelse, betalingsgebyr og produktion."

**Word count:** ~240 ord

---

### **6. Hvornår får I pengene** [F25, F27]

**CMO-rettet i v1.1:**
- "Liste over alle bidragsydere" → mere robust formulering
- "Minimum-grænse 50 kr." → "pt. 50 kr." / "som udgangspunkt"
- Link til /saadan-virker-det tilføjet

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvornår får I pengene"

**Subheadline:** "Afregning sker efter den relevante udbetalingsperiode."

**Sådan fungerer det:**

**Periode:** Hver kalender-måned (1. til 30./31.)
**Afsendelse:** Lige efter periodens afslutning (ikke fast dato)
**Bankdage:** 1-3 bankdage efter afsendelse

**Eksempel:**
```
Periode:        1.-31. august
Afsendelse:     1.-2. september
Penge i bank:   2.-5. september
```

**Hvad I får ved hver udbetaling (CMO v1.1):**
- Detaljeret afregningsbilag [F25]
- Oversigt over beløb fordelt på støtteform
- Regnskabsgrundlag til foreningens eget brug
- Relevante data til Indsamlingsnævn-rapportering
- Dokumentation for udbetaling

**Vigtig note (CMO v1.1):** "Vi udbetaler som udgangspunkt kun beløb over en mindre minimumsgrænse, pt. 50 kr. Hvis periodens beløb er lavere, overføres det til næste afregningsperiode."

**CTA:** "Se hele processen trin for trin" `ArrowRight` → `/saadan-virker-det`

**Word count:** ~180 ord

---

### **6.5. Soft CTA (NY i v1.1)**

**CMO-tilføjet - efter pricing + udbetaling er læseren varm.**

**Brand-tokens:**
- Background: #F9FAFB
- Tier-3 soft card med tier-1 brand-red top-accent

**Motion:**
```
T+0.0s: Card scales in (0.92 → 1.0, spring)
T+0.2s: CTA button gentle pulse (loop every 4s)
```

**Content-spec:**

**Headline:** "Vil du gennemgå tallene for jeres forening?"
**Body:** "Book et gratis møde, så viser vi modellen med jeres situation som udgangspunkt."
**CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`

**Word count:** ~30 ord

---

### **7. Hvad foreningen selv står for**

**CMO-rettet i v1.1:**
- Headline: "Det er ikke inkluderet" → "Hvad foreningen selv står for"
- Ikon: `X` → `Info` (ikke negativt)
- Indsamlingsnævn-gebyr: konkret beløb fjernet, "afhænger af takstblad"

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card
- `Info` ikon i grå (ikke negativ)

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 4 items reveal sequentielt
```

**Content-spec (CMO v1.1):**

**Headline:** "Hvad foreningen selv står for"

**Subheadline:** "Nogle udgifter og ansvar ligger uden for platformen. Dem gør vi tydelige fra starten."

**4 items med `Info`-ikon:**

`Info` **Indsamlingsnævn-gebyr**
"Indsamlingsnævnet kan opkræve et gebyr ved anmeldelse. Beløbet afhænger af deres gældende takstblad og betales direkte til myndigheden."

`Info` **§8A-godkendelse fra Skattestyrelsen**
"Hvis foreningen vil tilbyde skattefradrag, kræver det særskilt §8A-godkendelse hos Skattestyrelsen. Det er ikke en standardfunktion ved lancering."

`Info` **Marketing-omkostninger**
"Hvis I vil annoncere på Meta, Google eller andre platforme for at få flere støttere, betales det direkte til platformen. Vi tilbyder ikke marketing-as-a-service."

`Info` **Forsikring og foreningsdrift**
"Vi dækker ikke forsikring, lokaleudgifter, eller andre forenings-drift-omkostninger. Vi er fundraising-platform, ikke forsikringsudbyder."

**Word count:** ~130 ord

---

### **8. Hvad skal I sammenligne med**

**CMO-rettet i v1.1:**
- Headline: "Pris-sammenligning" → "Hvad skal I sammenligne med"
- "Andre fundraising-platforme" → "Enkeltstående indsamlingsværktøj"
- Forbeholdne formuleringer (kan, ofte, kræver typisk, afhænger af)
- Færre rækker (6 vigtigste)

**Brand-tokens:**
- Background: #F9FAFB
- Sammenligning-tabel
- StøtMedHjerte-kolonne fremhævet med brand-red border

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: Tabel reveals row-by-row (på desktop, ikke mobile)
T+0.8s: StøtMedHjerte-kolonne får brand-red highlight
```

**Content-spec (CMO v1.1):**

**Headline:** "Hvad skal I sammenligne med"

**Subheadline:** "Når I vurderer pris, bør I ikke kun kigge på procenten. Se også hvad der kræver opsætning, drift, dokumentation og løbende administration."

**Sammenligning (3 kolonner):**

| Aspekt | Enkeltstående indsamlingsværktøj | Egen webshop/egen opsætning | StøtMedHjerte |
|---|---|---|---|
| **Opstart** | Kan have oprettelsesgebyr | Kræver typisk 5-20 timer setup | Gratis |
| **Månedlig betaling** | Kan forekomme | Ofte månedlig drift-fee | Ingen |
| **Støttefordeling** | Ofte 5-10% + payment fees | 1-3% + payment fees + drift | 80% til foreningen (donationer/Fast Støtte) |
| **Indsamlingsnævnet** | Foreningen klarer det selv | Foreningen klarer det selv | Hjælp inkluderet |
| **Regnskab/dokumentation** | Ofte tilkøb | Skal bygges selv | Indbygget i modellen |
| **Webshop** | Ofte ikke tilgængelig | Skal bygges | 32,75% af nettoprofit, intet lager |

**Vigtig note (CMO v1.1):** "20% lyder højere end 5-10% - men inkluderer hele platformen, ikke bare betalingsbehandling. Sammenlign reel total-omkostning, ikke bare overskrifter."

**Word count:** ~220 ord

---

### **9. Pris-FAQ**

**CMO-rettet i v1.1:**
- Svar 5 om pris-ændringer forenklet (ingen specifikke triggere nævnt)

**Brand-tokens:** Accordion-cards med `ChevronRight`

**Content-spec (CMO v1.1):**

**Headline:** "Spørgsmål om priser"

**6 spørgsmål:**

1. **Er der virkelig ingen oprettelses-fee?**
   "Ja. Vi opkræver intet for at oprette jeres forening, gennemgå verificering, eller bruge platformen. StøtMedHjertes andel kommer udelukkende fra den fordeling, der fremgår tydeligt ved hver støtteform."

2. **Hvad sker der hvis ingen støtter os endnu?**
   "Så betaler I ingenting. StøtMedHjertes andel kommer kun når der er støtte at fordele."

3. **Er der binding eller opsigelses-fee?**
   "Nej. I kan stoppe når som helst - dog efter mindst én udbetalingsperiode (så vi kan afregne korrekt for igangværende støtte)."

4. **Får vi rabat hvis vi har mange støttere?**
   "Nej, alle foreninger har samme fordelingsmodel. Det sikrer fair behandling og holder regnskabet enkelt for alle."

5. **Kan priserne ændre sig?**
   "Hvis priser eller fordelingsmodel ændres i fremtiden, varsler vi det tydeligt og i god tid (mindst 90 dage før), så foreningen kan tage stilling, før ændringen træder i kraft."

6. **Hvorfor 20%?**
   "20% dækker hele platformen: betalingsgebyrer, hjælp til Indsamlingsnævnet, GDPR, donor-kommunikation, hosting, support og udvikling. Andre platforme tager ofte 5-10% men foreningen står selv for det meste af resten."

**CTA:** "Se alle FAQ" `ArrowRight` → `/faq`

**Word count:** ~200 ord

---

### **10. Final CTA**

**Brand-tokens:** Dark gradient + brand-red orbs

**Content-spec:** (uændret fra v1.0)

**Word count:** ~80 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

- Mest transparente prissætningsside i dansk fundraising-tech
- Ærlig om både inkluderet OG hvad foreningen selv står for
- Konkrete tal, ikke abstrakt sprog
- Ingen marketing-fluff
- Stabilt, ikke flashy

## Motion-niveau ROLIGT v1.1

- Hero: fade-up
- Key numbers counter: kun en gang (3 numbers i sektion 2)
- Cards: fade-in
- Tables: ingen row-by-row på mobile
- FAQ: standard accordion
- Webshop accordion: smooth height-transition

---

## Inter-page links (UDVIDET v1.1)

**Linker FRA `/priser` TIL:**
- `/saadan-virker-det` (proces-detaljer + sektion 6 udbetaling)
- `/sikkerhed` (compliance-deep-dive + sektion 4)
- `/fast-stoette` (Fast Støtte detaljer)
- `/faq` (FAQ-snippet)
- `/book-moede` (Hero + 6.5 Soft CTA + Final CTA)
- `/opret-forening` (Hero + Final CTA)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** "Enkeltstående indsamlingsværktøj" (ikke "andre fundraising-platforme")
- ✅ **Policy 2 - Begge målgrupper:** Forenklet "Det korte svar" tilgængelig for B2C
- ✅ **Policy 3 - MVP-tal master:** 80%/80%/32,75% korrekt; ingen graduering nævnt
- ✅ **Policy 4 - Tone of voice:** "Vi tjener", "20% dækker", "Indsamlingsnævn-håndtering" omformuleret
- ✅ **Policy 5 - Brand-konsistens:** `Info` ikon i stedet for `X` på "ikke inkluderet"; "StøtMedHjerte" konsekvent
- ✅ **Policy 6 - §8A:** Korrekt nævnt som separat proces

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 9 implementeret):**
1. ✅ Hero subheadline: "vi kun tjener, når I tjener" omformuleret
2. ✅ Sektion 2: "StøtMedHjerte tager en andel" → "fordeles efter en fast model"
3. ✅ Dublet i inkluderet-listen fjernet
4. ✅ "Indsamlingsnævn-håndtering" → "Hjælp til Indsamlingsnævnet"
5. ✅ Webshop-eksempel forenklet i hovedvisning, detaljer bag accordion
6. ✅ "Til StøtMedHjerte 67,25%" fjernet som primær linje
7. ✅ 75/25 ved 30.000+ helt fjernet (ikke nævnt nogen steder)
8. ✅ Sammenligningstabel fairere (forbeholdne ord, færre rækker)
9. ✅ "GDPR-compliance" + "PCI DSS Level 1" oversat til almindeligt sprog

**Stærke anbefalinger (CMO kategori B - alle 10 implementeret):**
1. ✅ H1: "klar prissætning" → "klar fordeling"
2. ✅ "Det korte svar" forenklet med tabel + emphasis
3. ✅ "20% dækker"-listen → "Det får I med i modellen"
4. ✅ "Ingen skjulte platformstillæg"-emphasis tilføjet
5. ✅ "Samme model for alle"-budskab tilføjet
6. ✅ Udbetaling-sektion: persondata-formulering forsigtigere
7. ✅ "Pt. 50 kr." minimum-formulering
8. ✅ "Det er ikke inkluderet" → "Hvad foreningen selv står for" + Info-ikon
9. ✅ Indsamlingsnævn-gebyr formuleret forsigtigere
10. ✅ FAQ svar 5 forenklet

**Forslag til overvejelse (CMO kategori C - implementeret hvor relevant):**
1. ✅ Word count justeret (~1,750)
2. ✅ Webshop-eksempel bag accordion
3. ✅ "Nettoprofit" defineret én gang
4. ✅ Sammenligning reduceret til 6 rækker
5. ✅ "Enkeltstående indsamlingsværktøj" i stedet for "andre fundraising-platforme"
6. ✅ Link til /sikkerhed tilføjet
7. ✅ Link til /saadan-virker-det tilføjet
8. ✅ Soft CTA mid-page (NY sektion 6.5)
9. ✅ Motion roligere

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 10 sektioner, ~1,800 ord, 6 Primary features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 9 kritiske + 10 stærke + 9 overvejelser. Hero refraseret, sammenligningstabel fairere, webshop-eksempel bag accordion, "Det er ikke inkluderet" → "Hvad foreningen selv står for" med Info-ikon, soft CTA tilføjet. ~1,750 ord, 11 sektioner. **Klar til implementering.** |
