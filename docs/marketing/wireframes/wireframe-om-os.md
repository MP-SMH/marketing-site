# Wireframe: `/om-os` (About + Mission)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-20
**Review:** ChatGPT-CMO 5. maj 2026 (content-injection + struktur-review)

---

## Page-formål

**Trust-side om StøtMedHjerte og personen bag.** Skal:

1. Bygge tillid hos B2B (foreningskasserer der vil vide hvem de står overfor)
2. Bygge engagement hos B2C (støttere der vil forstå "hvorfor")
3. Differentiere fra anonyme platforme via personlig founder-story
4. Etablere mission/værdier der genkendes på tværs af alle wireframes

**Strategisk positionering:** Solo-founder authenticity som **styrke**, ikke begrænsning. "Vi har valgt den svære vej, fordi det er rigtigt." Story-first struktur (CMO v1.1).

**MVP-ærlighed:** StøtMedHjerte er en helt ny platform der lancerer 18. juli 2026. Ingen claims om eksisterende økosystem.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Sektion-rækkefølge (CMO-OMSTRUKTURERET v1.1 - story-first)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero - Mission statement | 90 | Dark gradient + orbs |
| 2 | **Hvorfor StøtMedHjerte?** (origin story) | 370 | #F9FAFB |
| 3 | Hvad vi tror på (5 værdier) | 280 | Hvid |
| 4 | Mød Mario | 200 | #F9FAFB |
| 5 | Hvor vi er nu (status + roadmap) | 180 | Hvid |
| 6 | **Hvad StøtMedHjerte ikke er** (NY) | 50 | #F9FAFB |
| 7 | Tilbage til hvad det handler om | 90 | Hvid |
| 8 | Final CTA (begge audiences) | 100 | Dark gradient |
| **Total** | | **~1,360 ord** | |

---

## Brand-token anvendelse

| Sektion | Ikon |
|---|---|
| Hero trust-row | `Heart`, `ShieldCheck`, `Eye` |
| Værdier-cards | `Eye`, `Heart`, `ShieldCheck`, `Users`, `MapPin` |
| Origin story timeline | `Calendar` |
| Mød Mario | `MapPin`, `Users`, `Heart`, `Calendar` |
| Status-stats | `TrendingUp` |
| Final CTAs | `ArrowRight` |

---

## Sektion-detaljer

### **1. Hero - Mission statement (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- H1: "af én person..." → **"Bygget med respekt for danske foreninger"** (B2B-tillid)
- Subheadline: "30-50%"-claim fjernet, ny formulering fra ChatGPT
- Trust-row: ny formulering ("Gennemsigtig fordeling" osv.)

**Brand-tokens:** (uændret fra v1.0)

**Motion (FaaS-tech standard, dæmpet):**
```
T+0.0s: Background orbs fade in
T+0.2s: H1 fade-up
T+0.5s: Subheadline fade-up
T+0.8s: Trust-badges stagger reveal
T+1.0s: Portrait/illustration slides in (right side, subtle)
```

**Content-spec (CMO v1.1):**

- **H1:** "Bygget med respekt for danske foreninger"

- **Subheadline:** "StøtMedHjerte er en dansk fundraising-platform skabt med ét formål: at gøre det nemmere for foreninger at modtage støtte - med klare fordelinger, sikker betaling og dokumentation bygget ind fra starten."

- **Primary CTA (B2B):** "Læs mere for foreninger"
- **Primary CTA (B2C):** "Find en forening at støtte"
- **Trust-row (3 badges - CMO v1.1):**
  - `Heart` - Bygget til dansk foreningsliv
  - `ShieldCheck` - Sikker betaling og verificering
  - `Eye` - Gennemsigtig fordeling

**Word count:** ~90 ord

---

### **2. Hvorfor StøtMedHjerte? (origin story) - STORY-FIRST v1.1**

**CMO-rettet i v1.1:**
- Flyttet fra plads 3 → plads 2 (story-first)
- Komplet content fra ChatGPT
- Pull-quote i jeg-form tilføjet

**Brand-tokens:**
- Background: #F9FAFB
- Long-form prose layout (max-width 720px)
- Pull-quote box (tier-2 secondary med brand-red border-left)

**Motion (CMO-rolig v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Body text reveal (subtle scroll-triggered fade)
T+0.5s: Pull-quote slides in når den scrolles forbi (diskret)
```

**Content-spec (ChatGPT-leveret v1.1):**

**Headline:** "Hvorfor StøtMedHjerte?"

**Body:**

"StøtMedHjerte startede ikke som en idé om at bygge 'endnu en platform'. Det startede med en frustration.

Mario havde set, hvor meget frivilligt arbejde der ligger bag danske foreninger - sportsklubber, spejdergrupper, kulturforeninger, lokalforeninger og mange flere. Ikke kun ved aktiviteter, arrangementer og møder, men bag kulissen. Bestyrelsesmedlemmer, kasserere, ledere og frivillige, der bruger aftener og weekender på at få økonomien til at hænge sammen. Salg af lodder, kageboder, sponsorjagt, manuelle betalinger, regneark, kvitteringer og opfølgning.

Det blev særligt tydeligt gennem arbejdet med Heartland United, hvor behovet for støtte var helt konkret, men vejen til at samle penge ind var tung. Der fandtes løsninger, men mange føltes enten for dyre, for smalle, for uigennemsigtige eller for lidt tilpasset den virkelighed, danske foreninger står i. Enten kunne man lave en enkelt indsamling. Eller en webshop. Eller en betalingsløsning. Men det hele hang sjældent sammen.

Mario kom med en baggrund i salg, forretningsudvikling, logistik, e-commerce og automatisering. Han var vant til at bygge processer, hvor data, drift, økonomi og kunderejse skulle hænge sammen. Derfor begyndte han at stille et enkelt spørgsmål: Hvorfor findes der ikke en løsning, der både hjælper foreningen med støtte, synlighed, betaling, dokumentation og drift - uden at gøre det tungere for de frivillige?

Det blev starten på StøtMedHjerte.

Navnet kom af det, platformen skulle gøre: gøre det nemmere at støtte med hjertet - men på en måde, der også er ordentlig, dokumenteret og gennemsigtig. For Mario var det ikke nok, at en platform kunne tage imod penge. Den skulle også være bygget med respekt for reglerne, for foreningernes tid og for støtterne, der gerne vil vide, hvor deres bidrag ender.

StøtMedHjerte er derfor bygget den svære vej fra starten: med verificering, betaling, støtteformer, dokumentation, regnskabsgrundlag og gennemsigtighed tænkt ind i fundamentet.

Ikke fordi det er den hurtigste måde at lancere på.

Men fordi det er den rigtige måde at bygge tillid på."

**Pull-quote (NY v1.1, jeg-form fra Mario):**

> "Jeg ville bygge den løsning, jeg selv manglede: en ordentlig, gennemsigtig og brugbar måde for danske foreninger at modtage støtte på."

**Word count:** ~370 ord

---

### **3. Hvad vi tror på (5 værdier) - CMO-flyttet til plads 3**

**CMO-rettet i v1.1:**
- Flyttet fra plads 2 → plads 3 (efter origin story)
- Værdi 1 Transparens body: mindre konfronterende
- Værdier 2-5 body: ChatGPT-leveret content

**Brand-tokens:**
- Background: hvid
- 5 værdi-cards (tier-2 secondary)
- 2-3 cards per række på desktop

**Motion (CMO-rolig v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Værdi-cards reveal stagger (subtilt)
```

**Content-spec (CMO v1.1):**

**Headline:** "Hvad vi tror på"

**Subheadline:** "StøtMedHjerte er ikke en neutral platform. Vi har valgt en retning, og det former alt vi gør."

**5 værdi-cards:**

#### **Værdi 1: Transparens** (Ikon: `Eye`)
**Headline:** "Du skal kunne se, hvor pengene går hen"

**Body (CMO v1.1 - mindre konfronterende):**
"Vi viser, hvad foreningen får, hvad platformen beholder, og hvad modellen dækker. 80% går til foreningen ved donationer og fast støtte. Ved webshop går 32,75% af nettoprofitten til den valgte hjertesag. Det skal være let at forstå - også når man ikke arbejder med økonomi til daglig."

#### **Værdi 2: Foreningen først** (Ikon: `Heart`)
**Headline:** "Foreningen er det vigtigste - ikke platformen"

**Body (ChatGPT v1.1):**
"Foreninger er ikke et 'segment' for os. De er grunden til, at StøtMedHjerte eksisterer. Platformen er bygget til de frivillige, der får hverdagen til at fungere - kassereren, formanden, lederen, frivillige og alle dem, der tager ansvar, også når ingen ser det."

#### **Værdi 3: Compliance som standard** (Ikon: `ShieldCheck`)
**Headline:** "Det skal være rigtigt - ikke bare let"

**Body (ChatGPT v1.1):**
"Fundraising skal ikke kun være nemt. Det skal også være rigtigt. Derfor er verificering, GDPR, dokumentation, betalingsflow og hjælp til Indsamlingsnævnet tænkt ind fra starten. Foreninger skal ikke stå alene med regler, frister og usikkerhed, når de prøver at gøre noget godt."

#### **Værdi 4: Personlig kontakt** (Ikon: `Users`)
**Headline:** "Du taler med et menneske - ikke et ticket-system"

**Body (ChatGPT v1.1):**
"StøtMedHjerte starter småt og tæt på de første foreninger. Det er en styrke. Hver forening bliver gennemgået ordentligt, og der er et menneske bag, som kan svare, forklare og hjælpe. I begyndelsen er personlig kontakt ikke en begrænsning - det er en del af kvaliteten."

#### **Værdi 5: Bygget i Danmark** (Ikon: `MapPin`)
**Headline:** "Lavet til dansk foreningsliv"

**Body (ChatGPT v1.1):**
"StøtMedHjerte er bygget til dansk foreningsliv, ikke bare oversat til dansk. Det betyder danske regler, danske støttevaner, danske foreningstyper og en hverdag, hvor frivillige ofte løfter mere, end de har tid til. Platformen skal passe til den virkelighed - ikke omvendt."

**Word count:** ~280 ord

---

### **4. Mød Mario (CMO-justeret v1.1)**

**CMO-rettet i v1.1:**
- Body fra ChatGPT (~150 ord)
- Quick-facts: "CEO + CTO" → "Founder og ansvarlig for platformens opbygning"
- Quick-facts: dato-stykker konsolideret
- CTA: "Kontakt Mario direkte" → "Kontakt StøtMedHjerte"
- Portræt: ægte foto (Mario leverer senere), ikke illustration

**Brand-tokens:**
- Background: #F9FAFB
- 2-spalte: portræt venstre, body højre
- Tier-2 secondary card med brand-red top-accent

**Motion (CMO-rolig v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Portrait fade-in
T+0.5s: Body text reveals
T+0.7s: Quick-facts reveal
```

**Content-spec (CMO v1.1):**

**Headline:** "Mød Mario"

**Subheadline:** "Solo-founder, baseret i Hillerød"

**Body (ChatGPT v1.1):**

"Mario Paunovic er solo-founder af StøtMedHjerte og står bag både idé, struktur, forretningsmodel og den tekniske opbygning af platformen.

Han har mange års erfaring med salg, forretningsudvikling, e-commerce, logistik, automatisering og digitale processer. Den erfaring bruger han i StøtMedHjerte til at samle det, der normalt ligger spredt: støtte, betalinger, foreningsdata, kommunikation, dokumentation og drift.

Mario har valgt at bygge meget af platformens fundament selv, fordi detaljerne betyder noget. Når penge, frivillige kræfter og foreningsliv mødes, må løsningen ikke bare se pæn ud på overfladen. Den skal fungere i praksis.

Han bor i Hillerød og bygger StøtMedHjerte med udgangspunkt i dansk foreningsliv, danske regler og de mennesker, der får lokale fællesskaber til at hænge sammen. Tilgangen er enkel: sig tingene ærligt, byg det ordentligt, og vær til at få fat i."

**Quick-facts boks (CMO v1.1):**
- `MapPin` Baseret i Hillerød, Danmark
- `Users` Founder og ansvarlig for platformens opbygning
- `Heart` Arbejder med dansk foreningsliv og fundraising
- `Calendar` Lancerer den nye platform 18. juli 2026

**Portræt-spec (CMO v1.1):**
- Ægte foto af Mario (Mario leverer senere)
- Roligt, neutral baggrund
- Hverken for corporate eller for casual
- Nordisk, realistisk, roligt lys
- INGEN "startup founder pose"

**CTA (CMO v1.1):** "Kontakt StøtMedHjerte" `ArrowRight` → `/kontakt`

**Word count:** ~200 ord

---

### **5. Hvor vi er nu (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Tech-stack-leverandører fjernet (Policy 1)
- Roligere roadmap-formulering
- Mission-statement fra ChatGPT
- Eksplicit MVP-status

**Brand-tokens:**
- Background: hvid
- Tidslinje-illustration

**Motion (CMO-rolig v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Tidslinje "draws itself" langsomt og enkelt
T+0.8s: Markører pop ind sequentielt
```

**Content-spec (CMO v1.1):**

**Headline:** "Hvor vi er nu"

**Subheadline:** "StøtMedHjerte er en helt ny platform - vi lancerer 18. juli 2026. Her er rejsen indtil videre."

**Tidslinje (CMO v1.1 - uden leverandørnavne):**

```
November 2025: Idé og model tager form
   ↓
December 2025: Første prototype og økonomisk fordelingsmodel
   ↓
Q1 2026: Foreningsflow, støtteformer og compliance-struktur bygges
   ↓
April 2026: Platformens tekniske fundament klargøres
   ↓
Maj 2026: Marketing-site, flows og indhold færdiggøres
   ↓
🎯 18. juli 2026: Lancering af den nye platform
   ↓
Sommer 2026 og frem: Bygger videre sammen med de første foreninger
```

**Mission-statement (ChatGPT v1.1):**

"StøtMedHjerte lancerer som en ny platform og skal bygges sammen med de første foreninger. Målet er ikke at vokse hurtigst muligt, men at bygge en løsning, der holder: gennemsigtig støtte, mindre administration og mere ro for de mennesker, der driver dansk foreningsliv fremad."

**Eksplicit MVP-blok (NY v1.1):**

"StøtMedHjerte er en ny platform. Vi starter ikke med at påstå, at alt er bevist. Vi starter med et gennemarbejdet fundament og bygger videre sammen med de første foreninger fra lanceringen."

**Word count:** ~180 ord

---

### **6. Hvad StøtMedHjerte ikke er (NY SEKTION v1.1)**

**CMO-tilføjet - juridisk og brandmæssig klarhed.**

**Brand-tokens:**
- Background: #F9FAFB
- Tier-3 soft card centreret
- `Info` ikon i brand-red

**Motion:**
```
T+0.0s: Card scales in (0.95 → 1.0)
T+0.3s: Body text fades up
```

**Content-spec (ChatGPT v1.1):**

**Headline:** "Hvad StøtMedHjerte ikke er"

**Body:** "Vi er ikke en forening, og vi er ikke en velgørenhedsorganisation. StøtMedHjerte er en dansk platform, der hjælper verificerede foreninger med at modtage støtte på en mere struktureret og gennemsigtig måde."

**Word count:** ~50 ord

---

### **7. Tilbage til hvad det handler om (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Body: "ikke en platform" → korrekt formulering (vi ER faktisk en platform)

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Det handler om foreningerne"

**Body:** "StøtMedHjerte er en platform, men formålet er ikke teknikken. Formålet er at gøre det lettere for danske foreninger at få støtte til det, der betyder noget: medlemmerne, fællesskaberne, frivillige kræfter, materialer, aktiviteter og lokale initiativer."

**Word count:** ~90 ord

---

### **8. Final CTA (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline mere konkret: "Vil du være med?" → "Vil du se hvordan StøtMedHjerte kan bruges?"
- Subheadline justeret

**Brand-tokens:** Dark gradient + brand-red orbs

**Content-spec (CMO v1.1):**

**Headline:** "Vil du se hvordan StøtMedHjerte kan bruges?"

**Subheadline:** "Uanset om du repræsenterer en forening eller gerne vil støtte en, kan du gå videre herfra."

**For foreninger:**
- Primary CTA: "Læs mere for foreninger" `ArrowRight` → `/foreninger`
- Secondary: "Book et gratis møde" `ArrowRight` → `/book-moede`

**For støtter:**
- Primary CTA: "Find en forening at støtte" `ArrowRight` → `/hjertesager`
- Secondary: "Læs om støttemuligheder" `ArrowRight` → `/stotter`

**Trust-statement:** "Bygget med respekt for danske foreninger og dem der støtter dem."

**Word count:** ~100 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

- Personlig + autentisk solo-founder authenticity som **styrke**
- "Vi har valgt den svære vej, fordi det er rigtigt"
- INGEN startup-bullshit
- Konkret, jordnær, dansk
- MVP-ærlig

## Motion-niveau ROLIGT (CMO v1.1)

- Hero: fade-up
- Værdi-cards: subtilt stagger
- Pull-quote: meget diskret slide-in
- Tidslinje: draw-effect, langsom og enkel
- INGEN counters, INGEN flashy transitions

---

## Inter-page links

(Uændret fra v1.0)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Tech-stack-leverandører (Supabase + Hetzner) fjernet
- ✅ **Policy 2 - Begge målgrupper:** Begge har Final CTA, både B2B og B2C addresseret
- ✅ **Policy 3 - MVP-tal master:** "32,75% af nettoprofitten" konsekvent
- ✅ **Policy 4 - Tone of voice:** "CEO + CTO", "af én person", "30-50%" rettet
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, lucide-react ikoner
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende)

**MVP-realitets check (Mario direktiv):**
- ✅ Ingen claims om eksisterende foreninger
- ✅ "Vi starter småt"-blok eksplicit
- ✅ "Sommer 2026 og frem: Bygger videre sammen med de første foreninger"

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 6 implementeret):**
1. ✅ Hero H1: "af én person..." → "Bygget med respekt for danske foreninger"
2. ✅ Hero subheadline: "30-50%"-claim fjernet, ny ChatGPT-formulering
3. ✅ Roadmap: "Supabase + Hetzner" → "Platformens tekniske fundament klargøres"
4. ✅ "CEO + CTO" → "Founder og ansvarlig for platformens opbygning"
5. ✅ Quick-facts dato konsolideret
6. ✅ MVP-status eksplicit blok tilføjet

**Stærke anbefalinger (CMO kategori B - alle 8 implementeret):**
1. ✅ Sektion-rækkefølge ændret til story-first (Origin → Værdier)
2. ✅ Solo-founder authenticity som styrke (formuleringer i værdier)
3. ✅ Hero trust-row: ny formulering ("Gennemsigtig fordeling" osv.)
4. ✅ Værdi 1 Transparens body: mindre konfronterende
5. ✅ Mød Mario portræt: ægte foto-spec (du leverer senere)
6. ✅ CTA: "Kontakt Mario direkte" → "Kontakt StøtMedHjerte"
7. ✅ Roadmap: roligere ChatGPT-version
8. ✅ "Tilbage til formålet" body: "ikke en platform" → korrekt

**Forslag til overvejelse (CMO kategori C - 4 ud af 6 implementeret):**
1. ✅ Pull-quote i jeg-form i origin story
2. ❌ "Hvorfor ikke bare bruge eksisterende?" - droppet (defensivt)
3. ✅ "Hvad StøtMedHjerte ikke er" sektion (NY plads 6)
4. ✅ Final CTA mere konkret
5. ✅ Word count ~1.360 (inden for 1.200-1.400)
6. ✅ Motion roligt

**Content-injection (ChatGPT v1.1):**
- ✅ Origin story (~370 ord) - direkte indsat
- ✅ Mød Mario body (~150 ord) - direkte indsat
- ✅ Værdier-bodies (4 cards) - direkte indsat
- ✅ Mission-statement - direkte indsat

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 7 sektioner, ~1,220 ord struktur med ChatGPT-content placeholders |
| 1.1 | 5. maj 2026 | CMO-review + content-injection: 6 kritiske + 8 stærke + 4/6 overvejelser. Story-first sektion-rækkefølge. NY sektion "Hvad StøtMedHjerte ikke er". Pull-quote tilføjet. Tech-stack fjernet (Policy 1). MVP-realitet eksplicit. ChatGPT-content (origin story, Mød Mario, værdier, mission) direkte indsat. ~1,360 ord, 8 sektioner. **Klar til implementering.** |
