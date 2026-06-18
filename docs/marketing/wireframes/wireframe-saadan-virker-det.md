# Wireframe: `/saadan-virker-det` (Process Explanation)

**Version:** 1.2
**Dato:** 5. maj 2026
**Status:** Klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-11
**Review:** ChatGPT-CMO 5. maj 2026 + Mario brand/icon-correction

---

## Page-formål

(Uændret fra v1.1)

**Strategisk positionering:** Transparenshandbook-side. **"Vi forklarer det ærligt"**, ikke "Vi sælger systemet".

---

## Konverterings-mål

**Primary CTA (B2B):** "Book et gratis møde" → `/book-moede`
**Primary CTA (B2C):** "Find en forening at støtte" → `/hjertesager`
**Secondary CTAs:** "Læs om sikkerhed" → `/sikkerhed`, "Se priser" → `/priser`

---

## Features mappet til siden

(Uændret fra v1.1 - alle 5 Primary features dækket)

---

## Sektion-rækkefølge

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 60 | Dark gradient + orbs |
| 1.5 | Anker-knapper - Vælg dit spor | 30 | Hvid |
| 2 | Kort fortalt | 80 | Hvid |
| 3 | To rejser, ét formål | 100 | Hvid |
| 4 | For foreninger - Fra registrering til afregning | 620 | #F9FAFB |
| 5 | For støtter - Fra opdagelse til løbende støtte | 350 | Hvid |
| 6 | Sådan flyder pengene | 200 | #F9FAFB |
| 7 | Tidslinje - typisk forløb | 180 | Hvid |
| 8 | Soft CTA | 30 | #F9FAFB |
| 9 | Hvad sker der hvis... | 230 | Hvid |
| 10 | Final CTA | 90 | Dark gradient |
| **Total** | | **~1,970 ord** | |

---

# 🎨 BRAND-TOKEN ANVENDELSE

**Reference:** BRAND-TOKENS.md v1.1 (inkl. Icon Library section)

## Side-wide farve-strategi

(Uændret fra v1.1)

## Ikon-konvention (NY i v1.2)

Alle ikoner er fra **lucide-react** (eksklusivt). Brug navne fra etableret pattern:

| Sektion | Ikoner brugt |
|---|---|
| Trust-row Hero | `ShieldCheck`, `Heart`, `Check`, `TrendingUp` |
| B2B Trin 1: Registrering | `Users` |
| B2B Trin 2: Verificering | `ShieldCheck` |
| B2B Trin 3: Profil | `Eye` |
| B2B Trin 4: Kanaler | `Target` |
| B2B Trin 5: Indsamlingsnævn | `FileText` |
| B2B Trin 6: Del + afregning | `Share2` |
| B2C Trin 1: Opdag | `Search` |
| B2C Trin 2: Vælg | `Target` |
| B2C Trin 3: Konto | `Users` |
| B2C Trin 4: Betal | `CreditCard` |
| B2C Trin 5: Følg | `TrendingUp` |
| Kanaler | `Heart` (Hjertesager), `Repeat` (Fast Støtte), `ShoppingBag` (Webshop) |
| FAQ-accordion | `ChevronRight` |
| Final CTAs | `ArrowRight` |

---

## Sektion-detaljer

### **1. Hero** - "Sådan virker StøtMedHjerte™"

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1 - dæmpet)

**Content-spec:**

- **H1:** "Sådan virker StøtMedHjerte™"
- **Subheadline:** "Her får du et klart overblik over, hvordan StøtMedHjerte fungerer - fra foreningens oprettelse og verificering til støtte, betaling, dokumentation og afregning."
- **Trust-row (4 badges med ikoner):**
  - `ShieldCheck` - Gratis for foreninger at starte
  - `Check` - Verificering normalt 1-3 hverdage
  - `Heart` - 80% til foreningen ved donationer og fast støtte
  - `Repeat` - Fast støtte kan stoppes når som helst

**Word count:** ~60 ord

---

### **1.5. Anker-knapper - Vælg dit spor**

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "Vælg dit spor"

**Card 1: Jeg repræsenterer en forening**
- Ikon: `Users`
- Anker-link til sektion 4 (B2B)

**Card 2: Jeg vil støtte en forening**
- Ikon: `Heart`
- Anker-link til sektion 5 (B2C)

**Word count:** ~30 ord

---

### **2. Kort fortalt**

**Brand-tokens:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "Kort fortalt"

**Body:** "Foreninger opretter sig, bliver verificeret og får adgang til støttekanaler. Støttere vælger en forening eller hjertesag, opretter konto og betaler sikkert. StøtMedHjerte håndterer betalingsflow, dokumentation og afregningsgrundlag, så både forening og støtter kan følge med."

**Word count:** ~80 ord

---

### **3. To rejser, ét formål**

**Brand-tokens:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "To rejser, ét formål"

**Subheadline:** "Foreninger og støtter mødes på StøtMedHjerte med forskellige behov. Begge skal have det nemt."

**Card 1: For foreninger** (Ikon: `Users`)
"I tilmelder jer, vælger jeres kanaler og deler jeres link. Vi hjælper med tekstudkast til Indsamlingsnævnet, betalingsflow, regnskabsgrundlag og støtterkommunikation - så I kan fokusere på foreningen."

**Card 2: For støtter** (Ikon: `Heart`)
"Find en forening, vælg hvordan du vil støtte, opret konto. Du får kvittering, fuld kontrol og et overblik over al din støtte ét sted."

**Word count:** ~100 ord

---

### **4. For foreninger - Fra registrering til afregning** [F06, F08, F17, F18, F20]

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "For foreninger - Fra registrering til afregning"

**Subheadline:** "Hele rejsen, trin for trin. Typisk kan I være klar til at modtage støtte på platformen inden for 1-2 uger. Afregning sker efter den relevante periode."

**6 trin (med korrekte ikoner):**

#### **Trin 1: Registrér foreningen** (Ikon: `Users` | typisk 5-10 minutter)
"Foreningens kontaktperson opretter en profil med CVR-nummer, kontaktinfo og bankoplysninger."

**Hvad sker der bag kulissen:**
- CVR-nummer auto-udfylder forenings-info [F08]
- Vi kontrollerer CVR-oplysninger og relevante basisdata som en del af godkendelsen
- Kontaktperson registrerer email + telefon

**Vigtigt:** "Foreningen er ikke aktiv endnu. Den skal verificeres først."

#### **Trin 2: Bliv verificeret** (Ikon: `ShieldCheck` | typisk 1-3 hverdage)
"Vi gennemgår jeres ansøgning grundigt for at sikre kvalitet og lovlighed."

**Verificeringsproces:**
- MitID-verificering af kontaktpersonen [F07]
- Validering af CVR-oplysninger
- Manuel godkendelse af StøtMedHjerte-teamet

**I bliver kontaktet:** "Vi sender besked når verificeringen er gennemført - typisk inden for 1-3 hverdage, hvis oplysningerne er komplette."

#### **Trin 3: Gør foreningsprofilen klar** (Ikon: `Eye` | typisk 30-60 minutter)
"I færdiggør profilen med logo, beskrivelse og kontaktinfo. Det er denne profil støtter ser."

**Hvad I tilføjer:**
- Logo og foreningsnavn
- Profilbeskrivelse
- Sociale medier
- Bestyrelsesmedlemmer (valgfrit)

**Profilscore [F20]:** "I ser en visuel score (0-100%) af hvor komplet jeres profil er."

#### **Trin 4: Vælg støttekanaler** (Ikon: `Target` | typisk 30-60 minutter)
"Som udgangspunkt får alle foreninger adgang til Hjertesager og Fast Støtte. Webshop kan tilvælges, hvis det giver mening for jer."

**3 kanaler:**

`Heart` **Hjertesager** [F10] - standardkanal
- Op til 5 aktive samtidigt
- Indsamlingsnævn-godkendelse kræves før aktivering
- 80% til foreningen [F28]

`Repeat` **Fast Støtte** [F11] - standardkanal
- Tier-system: 100/200/300/500 kr./md
- 80% til foreningen [F29]
- Auto-trækning hver måned

`ShoppingBag` **Webshop** [F12] - valgfri kanal
- I vælger 5 produkter
- Print-on-demand (ingen lager)
- 32,75% af overskuddet til foreningen [F30]

#### **Trin 5: Klargør Indsamlingsnævn-anmeldelse** (Ikon: `FileText` | afhænger af myndighedens svartid)
"Før Hjertesager-kanalen kan aktiveres, skal foreningen anmeldes til Indsamlingsnævnet."

**Sådan hjælper StøtMedHjerte:**
- Vi auto-genererer anmeldelses-tekstudkast [F06]
- I sender selv anmeldelsen til Indsamlingsnævnet
- I modtager journalnummer (ÅÅÅÅ-XXX-XXXX)
- I indtaster journalnummer i StøtMedHjerte
- Vi validerer formatet og låser kanalen op

**Vigtigt:** "Foreningen er selv ansvarlig for anmeldelsen til Indsamlingsnævnet. StøtMedHjerte hjælper med tekstudkast, struktur, journalnummer og dokumentation, men myndighedsprocessen ligger hos foreningen."

**Cross-link:** "Læs deep-dive om Indsamlingsnævnet" → `/sikkerhed#indsamlingsnaevnet`

#### **Trin 6: Del, modtag støtte og følg afregning** (Ikon: `Share2` | løbende)
"I deler jeres link i jeres netværk. Pengene begynder at komme ind."

**Værktøjer StøtMedHjerte leverer:**
- Unikt delings-link per kanal
- QR-koder klar til print [F18]
- Auto-genererede tekster til SMS, Facebook, email [F17]
- Tilpasset jeres foreningsnavn + valgte hjertesag

**Afregning:** "Når støtte begynder at komme ind, kan I følge udviklingen i jeres dashboard. Afregning sker efter den relevante periode, og I får dokumentation og afregningsgrundlag, så kassereren kan følge med."

**Efter udbetaling:** "Foreningen får et afregningsgrundlag, så beløbet kan dokumenteres internt."

**Word count:** ~620 ord

---

### **5. For støtter - Fra opdagelse til løbende støtte**

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "For støtter - Fra opdagelse til løbende støtte"

**Subheadline:** "Hele rejsen, trin for trin. Når du har valgt en forening, kan du normalt gennemføre din første støtte på få minutter."

**5 trin (med korrekte ikoner):**

#### **Trin 1: Opdag en forening eller hjertesag** (Ikon: `Search`)
"Du finder en forening på flere måder:"
- SoMe-opslag fra venner/forening
- Direkte link fra foreningen
- QR-kode på flyer eller medlemsblad
- Browse på `/hjertesager` for aktive kampagner

#### **Trin 2: Vælg hvordan du vil støtte** (Ikon: `Target`)

`Heart` **Engangs-donation** til en specifik hjertesag

`Repeat` **Fast månedlig støtte** (én forening ad gangen)

`ShoppingBag` **Køb supporterprodukter** fra webshop

**Cross-link:** "Læs mere om de 3 måder" → `/stotter`

#### **Trin 3: Opret din konto** (Ikon: `Users` | under 1 minut)
"For at sikre dokumentation og kontrol skal du oprette en gratis konto."

**Du indtaster:**
- Email + adgangskode
- Navn + adresse
- Anonymitets-præference

**Hvad kontoen giver dig:**
"Kontoen gør det muligt at gemme dine kvitteringer, styre fast støtte, se din historik og håndtere dine datarettigheder."

#### **Trin 4: Betal sikkert** (Ikon: `CreditCard`)
"Betalingen sker via certificeret betalingspartner."

**Sikkerhed:**
- "Vi gemmer ikke dine kortoplysninger, og du får kvittering på email kort efter din støtte."
- "De tilgængelige betalingsmetoder vises ved checkout og afhænger af, hvordan du vælger at støtte."

#### **Trin 5: Følg din støtte** (Ikon: `TrendingUp`)
"Du har nu en profil hvor du ser al din støtte ét sted."

**Din profil viser:**
- Din støttehistorik
- Aktive faste støtteaftaler
- Webshop-ordrer
- Kvitteringer
- Små markeringer for din støtte over tid

**Cross-link:** "Læs om profil og engagement" → `/stotter`

**Word count:** ~350 ord

---

### **6. Sådan flyder pengene** [F25, F27, F28, F29, F30]

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1 - dæmpet)

**Content-spec:**

**Headline:** "Sådan flyder pengene"

**Subheadline:** "Fuld transparens. Her ser du hvordan en typisk støtte fordeles."

**3 flow-diagrammer:**

#### **Donation til hjertesag (engangs)**
```
Du donerer 200 kr.
   ↓
Til foreningen: 160 kr. (80%) [F28]
Til drift, betalingsgebyrer og platform: 40 kr. (20%)
```

#### **Fast månedlig støtte**
```
Du betaler 200 kr./md.
   ↓
Til foreningen: 160 kr./md. (80%) [F29]
Til drift, betalingsgebyrer og platform: 40 kr./md. (20%)
```

#### **Webshop-køb**
```
Du køber et supporterprodukt
   ↓
Direkte omkostninger trækkes fra
   (moms, produktion, betalingsgebyr)
   ↓
Overskud beregnes
   ↓
32,75% af overskuddet går til hjertesagen [F30]
```

**Vigtig præcisering:** "StøtMedHjerte har ingen oprettelsesgebyrer eller faste månedsgebyrer for foreninger. Platformens drift dækkes af den andel, der fremgår tydeligt ved hver støtteform."

**CTA:** "Vil du se økonomien mere detaljeret? Se priser og fordeling" → `/priser`

**Word count:** ~200 ord

---

### **7. Tidslinje - typisk forløb**

**Brand-tokens:** (uændret fra v1.1)

**Motion:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "Typisk tidslinje"

**Subheadline:** "Fra første kontakt til løbende støtte - så lang tid tager det normalt."

**B2B tidslinje:**
```
Dag 0:    Forening registrerer sig
Dag 1-3:  Verificering + godkendelse
Dag 3-4:  Profil færdiggøres
Dag 4-?:  Indsamlingsnævn-anmeldelse (afhænger af myndighedens svartid)
Dag ?:    Hjertesager-kanal aktiv
Dag ?+:   Foreningen deler i netværk
Efter periode-slut: Første afregning
```

**B2C tidslinje:**
```
Min 0:    Støtter opdager forening
Min 0-3:  Vælger støttetype + opretter konto
Min 3-4:  Gennemfører betaling
Min 4:    Modtager email-kvittering
Løbende:  Følger støtte i profil
```

**Vigtig note:** "Tidslinjer er typiske. Verificering kan tage længere ved manglende info. Indsamlingsnævnet sætter selv tempoet for godkendelse."

**Word count:** ~180 ord

---

### **8. Soft CTA**

**Content-spec:**

**Headline:** "Klar til at komme i gang?"

**2 CTAs side-by-side:**
- **B2B:** "Book et gratis møde" `ArrowRight` → `/book-moede`
- **B2C:** "Find en forening at støtte" `ArrowRight` → `/hjertesager`

**Word count:** ~30 ord

---

### **9. Hvad sker der hvis... (FAQ-snippet)**

**Brand-tokens:** Accordion-cards med `ChevronRight` (rotates 90deg ved expand)

**Content-spec:**

**Headline:** "Hvad sker der hvis..."

**6 edge case-spørgsmål:**

1. **... vores forening ikke godkendes?**
   "Vi forklarer hvad der mangler. Som regel kan det rettes med ekstra dokumentation. Hvis foreningen ikke matcher vores standarder, refunderer vi naturligvis ingen oprettelses-fee - for der er ingen."

2. **... Indsamlingsnævnet afviser vores anmeldelse?**
   "StøtMedHjerte kan ikke garantere godkendelse, men vi hjælper med et struktureret tekstudkast og viser tydeligt, hvad foreningen selv skal sende ind. Hvis der kommer en afvisning, hjælper vi jer med at forstå næste skridt."

3. **... en støtter vil have refunderet en donation?**
   "Donationer er som udgangspunkt endelige, fordi pengene er givet som støtte til en forening eller hjertesag. Hvis der er sket en fejl, skal støtteren kontakte os, så vi kan vurdere sagen konkret."

4. **... en støtter vil stoppe sin faste støtte?**
   "Det kan ske med det samme på støtterens profil. Ingen opsigelses-varsel."

5. **... vores forening vil forlade StøtMedHjerte?**
   "I kan stoppe når som helst - dog efter mindst én udbetalingsperiode. I kan få relevante foreningsdata og afregningsgrundlag udleveret i et brugbart format, så I kan dokumentere jeres aktivitet og komme videre. Persondata og betalingsdata håndteres efter gældende regler."

6. **... der opstår en teknisk fejl?**
   "Vi logger centrale handlinger og transaktioner, så vi kan undersøge fejl, dokumentere forløbet og rette op, hvis noget ikke er gået som forventet."

**CTA:** "Se alle FAQ" `ArrowRight` → `/faq`

**Word count:** ~230 ord

---

### **10. Final CTA**

**Brand-tokens:** (uændret fra v1.1)

**Content-spec:**

**Headline:** "Klar til at starte?"

**Subheadline:** "Uanset om du repræsenterer en forening eller vil støtte en, er vi klar."

**For foreninger:** (Ikon: `Users`)
- Primary CTA: "Book et gratis møde" `ArrowRight` → `/book-moede`
- Secondary: "Læs mere for foreninger" `ArrowRight` → `/foreninger`
- Tertiary: "Opret forening direkte" `ArrowRight` → `/opret-forening`

**For støtter:** (Ikon: `Heart`)
- Primary CTA: "Find en forening at støtte" `ArrowRight` → `/hjertesager`
- Secondary: "Bliv fast støtter" `ArrowRight` → `/fast-stoette`

**Trust-statement:** "Gratis at starte. Ingen oprettelses-fee. 80% til foreningen ved donationer og fast støtte."

**Word count:** ~90 ord

---

# 🎯 Visuel-spec opsummering (v1.2)

(Uændret fra v1.1 plus ikon-konvention etableret)

---

## Inter-page links

(Uændret fra v1.1)

---

## Compliance check (v1.2)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Konkrete betalingsmetoder generiske
- ✅ **Policy 2 - Begge målgrupper:** Anker-knapper for spor-valg
- ✅ **Policy 3 - MVP-tal master:** "32,75% af overskuddet" konsekvent
- ✅ **Policy 4 - Tone of voice:** Almindeligt sprog
- ✅ **Policy 5 - Visuel identitet:** Ikoner fra lucide-react eksklusivt
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende)

**Brand-konsistens (NY i v1.2):**
- ✅ "StøtMedHjerte" konsekvent (ingen "SMH"-forkortelser i UI-copy)
- ✅ Ikoner fra etableret pattern (lucide-react: ShieldCheck, Heart, Users, etc.)

---

## v1.1 → v1.2 ændringslog

**Brand-konsistens (Mario-rettelser):**
- ✅ Alle "SMH"-references i UI-copy ændret til "StøtMedHjerte"
  - 8 forekomster opdateret på tværs af sektioner
  - Kun internt brand-token-document beholder "SMH" som dokumentations-kort
- ✅ Ikon-mapping etableret per sektion baseret på faktisk kode
  - Trin 2: `Lock` → `ShieldCheck` (matchende etableret pattern, 12 brug)
  - Alle andre trin: ikoner valgt fra etablerede 30 ikoner i marketing-site
- ✅ BRAND-TOKENS.md v1.1: Icon Library section tilføjet (master reference)

**Påvirker andre wireframes:**
SMH/StøtMedHjerte-rettelse skal også gøres i:
- wireframe-foreninger.md v1.3
- wireframe-stotter.md v1.1
- wireframe-sikkerhed.md v1.1

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 9 sektioner, ~1,900 ord, 5 Primary features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 9 kritiske + 10 stærke + 9 overvejelser. Anker-knapper + "Kort fortalt"-blok tilføjet. Pengeflow forenklet. ~1,970 ord, 11 sektioner. |
| 1.2 | 5. maj 2026 | Brand-konsistens: "SMH" → "StøtMedHjerte" overalt i UI-copy. Ikoner mapped til lucide-react etablerede pattern. BRAND-TOKENS.md udvidet med Icon Library section. **Klar til implementering.** |
