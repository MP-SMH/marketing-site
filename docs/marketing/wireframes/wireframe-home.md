# Wireframe: `/` (Home)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-01 (Home)
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** Navigations-hub, ikke deep-dive. Hver sektion teaser indhold på andre sider.

**MVP-ærlighed:** Helt ny platform, lancerer 18. juli 2026. Ingen volume-claims.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Sektion-rækkefølge (CMO-justeret v1.1)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero - Mission + dual CTAs | 100 | Dark gradient + orbs |
| 2 | For hvem? (audience-split) | 220 | Hvid |
| 3 | Sådan virker StøtMedHjerte (3 trin) | 180 | #F9FAFB |
| 4 | Hvorfor StøtMedHjerte er bygget anderledes (4 differentiatorer) | 240 | Hvid |
| 5 | Aktive hjertesager (preview, conditional) | 100 | #F9FAFB |
| 6 | Trust og sikkerhed (kort) | 140 | Hvid |
| 7 | Mød personen bag StøtMedHjerte | 130 | #F9FAFB |
| 8 | Final CTA (routing-orienteret dual) | 110 | Dark gradient |
| **Total** | | **~1,220 ord** | |

---

## Brand-token anvendelse

(Uændret fra v1.0)

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero - Mission + dual CTAs (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- H1: "Støt med hjertet - på en måde der også er ordentlig" → **"Bygget til danske foreninger og dem, der støtter dem"** (mere konkret)
- Subheadline: pakket informationsmængde forenklet, "direkte" fjernet
- "Fee" → "gebyr" (dansk)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Mockup-spec (CMO v1.1):** Split-view der viser begge målgrupper:
- **Venstre side:** foreningsdashboard (aktiv hjertesag, "Verificeret"-badge, "afregningsgrundlag"-text)
- **Højre side:** støtter-view (vælg beløb, "80% til foreningen", kvittering-element)

**Content-spec (CMO v1.1):**

- **H1:** "Bygget til danske foreninger og dem, der støtter dem"

- **Subheadline:** "StøtMedHjerte gør det nemmere for danske foreninger at modtage støtte - og for støttere at give på en tryg og gennemsigtig måde. Ved donationer og fast støtte går 80% til foreningen."

- **Primary CTA (B2B):** "Læs mere for foreninger" `ArrowRight` → `/foreninger`
- **Primary CTA (B2C):** "Find en forening at støtte" `ArrowRight` → `/hjertesager`

- **Trust-row (3 badges - CMO v1.1):**
  - `ShieldCheck` - Verificerede foreninger
  - `Heart` - 80% til foreningen
  - `Eye` - Gratis at oprette, ingen binding

**Pre-launch note (NY i v1.1, diskret under trust-row):**
"StøtMedHjerte lancerer 18. juli 2026 og bygges sammen med de første foreninger fra start."

**Word count:** ~100 ord

---

### **2. For hvem? (audience-split) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- B2B key-point præciseret om Indsamlingsnævnet
- B2C key-point: "80% af din støtte" → "80% til foreningen ved donationer og fast støtte"
- Link til /priser tilføjet i B2B card
- Connector-animation FJERNET (CMO: virker gimmicky)

**Brand-tokens:** (uændret fra v1.0)

**Motion (CMO-justeret v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: 2 cards reveal simultaneously
        - Card 1 (B2B): slides from left
        - Card 2 (B2C): slides from right
INGEN connector-animation (fjernet v1.1)
```

**Content-spec (CMO v1.1):**

**Headline:** "For foreninger og for dem der vil støtte dem"

**Subheadline:** "StøtMedHjerte er bygget til to målgrupper med forskellige behov."

#### **Card 1: For foreninger** (B2B)
**Ikon:** `Users` brand-red

**Headline:** "I vil samle støtte ind - uden tunge processer"

**Body:** "I tilmelder jer, vælger jeres støttekanaler og deler jeres link. Vi hjælper med tekstudkast til Indsamlingsnævnet, betalingsflow, regnskabsgrundlag og dokumentation - så I kan fokusere på foreningen."

**3 key-points (CMO v1.1):**
- ✓ 80% til foreningen ved donationer og fast støtte
- ✓ Hjælp til Indsamlingsnævnet: tekstudkast, frister og regnskabsgrundlag
- ✓ Gratis at oprette, ingen binding

**Primary CTA:** "Læs mere for foreninger" `ArrowRight` → `/foreninger`
**Secondary CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`
**Tertiary link (NY v1.1):** "Se priser og fordeling" → `/priser`

#### **Card 2: For støtter** (B2C)
**Ikon:** `Heart` brand-red

**Headline:** "Du vil støtte en forening - på en gennemsigtig måde"

**Body:** "Find en forening eller hjertesag, vælg hvordan du vil støtte, og giv. Du får kvittering, fuld kontrol og et overblik over al din støtte ét sted."

**3 key-points (CMO v1.1):**
- ✓ 80% til foreningen ved donationer og fast støtte
- ✓ Verificerede foreninger
- ✓ Stop fast støtte når som helst

**Primary CTA:** "Find en forening at støtte" `ArrowRight` → `/hjertesager`
**Secondary CTA:** "Bliv fast støtter" `ArrowRight` → `/fast-stoette`

**Word count:** ~220 ord

---

### **3. Sådan virker StøtMedHjerte (3 trin) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Subheadline: "støtte i banken" → "støtte og afregning"
- Trin 3: "Foreningen modtager pengene" → "Foreningen får afregning og dokumentation"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sådan fungerer det"

**Subheadline:** "Tre enkle skridt - fra oprettelse til støtte og afregning."

**3 trin:**

#### **1. Foreningen tilmelder sig** (Ikon: `Users`)
"Foreningen opretter en profil, bliver verificeret og vælger sine støttekanaler. Vi hjælper med Indsamlingsnævn-anmeldelse og dokumentation."

#### **2. Støtter giver støtte** (Ikon: `Heart`)
"Støttere finder en forening eller hjertesag, vælger hvordan de vil støtte, og betaler sikkert. 80% af donationer og fast støtte går til foreningen."

#### **3. Foreningen får afregning og dokumentation** (Ikon: `CreditCard`)
"Efter den relevante udbetalingsperiode afregnes støtten til foreningen sammen med dokumentation og regnskabsgrundlag."

**CTA:** "Se hele processen trin for trin" `ArrowRight` → `/saadan-virker-det`

**Word count:** ~180 ord

---

### **4. Hvorfor StøtMedHjerte er bygget anderledes (4 differentiatorer) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Hvad gør StøtMedHjerte anderledes?" → **"Hvorfor StøtMedHjerte er bygget anderledes"** (mindre konkurrenttone)
- Differentiator 1 body: "32,75% af nettoprofitten ved webshop" → "til den valgte hjertesag"
- Differentiator 4 body: mere afgrænset om personlig kontakt

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvorfor StøtMedHjerte er bygget anderledes"

**Subheadline:** "Vi har valgt den svære vej fra starten - fordi det er den rigtige måde at bygge tillid på."

**4 differentiatorer:**

#### **Differentiator 1: Klar fordeling** (Ikon: `Heart`)
**Headline:** "Klar fordeling, ingen overraskelser"
**Body (CMO v1.1):** "Ved donationer og fast støtte går 80% til foreningen. Ved webshop går 32,75% af nettoprofitten til den valgte hjertesag. Resten dækker betaling, drift, support og platformen bag."
**Tertiary link (NY v1.1):** "Se priser og fordeling" → `/priser`

#### **Differentiator 2: Compliance som standard** (Ikon: `ShieldCheck`)
**Headline:** "Bygget rigtigt fra starten"
**Body:** "Verificering, GDPR, dokumentation og hjælp til Indsamlingsnævnet er tænkt ind fra dag 1 - ikke noget I selv skal stå alene med."

#### **Differentiator 3: Bygget til dansk foreningsliv** (Ikon: `Users`)
**Headline:** "Lavet til den danske virkelighed"
**Body:** "Danske regler, danske støttevaner, danske foreningstyper. Ikke en udenlandsk platform med dansk oversættelse."

#### **Differentiator 4: Personlig kontakt** (Ikon: `Eye`)
**Headline:** "Du taler med et menneske"
**Body (CMO v1.1):** "I starten holder vi tæt kontakt med de første foreninger, så onboarding, godkendelse og feedback bliver håndteret ordentligt. Det er en del af kvaliteten - ikke en begrænsning."

**Word count:** ~240 ord

---

### **5. Aktive hjertesager (preview, conditional) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Sektion er **conditional**: vises kun hvis 1+ aktive hjertesager
- Hvis 0 sager: skip sektionen helt (ikke tom placeholder)
- Subheadline mere fleksibel afhængigt af antal sager
- CTA-tekst adaptiv (1 sag → "Se hjertesagen", 2+ → "Se alle aktive hjertesager")

**Brand-tokens:**
- Background: #F9FAFB
- 1-2 prominent cards (samme styling som /hjertesager v1.2)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Vises hvis 1+ aktive hjertesager:**

**Headline:** "Aktive hjertesager"

**Subheadline (CMO v1.1, adaptiv):**
- **Hvis 1 sag:** "Her er den hjertesag, der er aktiv lige nu."
- **Hvis 2+ sager:** "Se de hjertesager, der er aktive lige nu."

**Hver card (prominent display):**
- Hero-billede
- Forenings-logo + navn + `ShieldCheck`
- Hjertesag-titel
- Progress-bar
- Indsamlet beløb + mål
- "X dage tilbage" (`Calendar`)
- CTA: "Læs mere og støt" `ArrowRight` → `/hjertesager/{slug}`

**CTA nederst (CMO v1.1, adaptiv):**
- **Hvis 1 sag:** "Se hjertesagen" `ArrowRight` → `/hjertesager`
- **Hvis 2+ sager:** "Se alle aktive hjertesager" `ArrowRight` → `/hjertesager`

**Vises IKKE hvis 0 aktive hjertesager (sektionen skip'es helt - tomt forside er værre end ingen sektion).**

**Word count:** ~100 ord (når sektionen vises)

---

### **6. Trust og sikkerhed (kort) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Trust-card 4: "Alle støttebetalinger dokumenteres" → "Støtte og afregning dokumenteres med bilag og regnskabsgrundlag"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sikkerhed bygget ind i fundamentet"

**Subheadline:** "Foreninger bliver verificeret, betalinger håndteres sikkert, og data behandles med respekt for GDPR."

**4 trust-cards:**

`ShieldCheck` **Verificerede foreninger**
"Hver forening gennemgås, før de kan modtage støtte."

`Lock` **Sikker betaling**
"Sikker betaling via certificeret betalingspartner."

`Eye` **GDPR og databeskyttelse**
"Persondata håndteres med klare formål og tydelige rettigheder."

`Check` **Sporbar dokumentation (CMO v1.1)**
"Støtte og afregning dokumenteres med bilag og regnskabsgrundlag."

**CTA:** "Læs alt om sikkerhed" `ArrowRight` → `/sikkerhed`

**Word count:** ~140 ord

---

### **7. Mød personen bag StøtMedHjerte (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Bygget af én - for mange" → **"Mød personen bag StøtMedHjerte"** (B2B-tillid, ikke "én person"-risiko)
- Body mere konkret og professionel
- Tilføjet baggrund + mission

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Mød personen bag StøtMedHjerte"

**Body:**

"StøtMedHjerte er startet af Mario Paunovic fra Hillerød. Han har arbejdet med salg, forretningsudvikling, e-commerce, logistik og automatisering - og bygger platformen, fordi fundraising for danske foreninger ofte er for tungt, for manuelt og for uigennemsigtigt.

Målet er ikke at bygge den største platform hurtigst muligt. Målet er at bygge den rigtigt fra starten."

**CTA:** "Læs hele historien" `ArrowRight` → `/om-os`

**Word count:** ~130 ord

---

### **8. Final CTA (routing-orienteret dual) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Klar til at komme i gang?" → "Hvad vil du gøre nu?" (routing-fokus)
- Subheadline: "Vælg den vej, der passer til dig"
- Cards-layout med tydelig audience-routing

**Brand-tokens:** Dark gradient + brand-red orbs

**Content-spec (CMO v1.1):**

**Headline:** "Hvad vil du gøre nu?"

**Subheadline:** "Vælg den vej, der passer til dig."

**2 routing-cards (CMO v1.1):**

#### **Card 1: Jeg repræsenterer en forening**
- Primary CTA: "Læs mere for foreninger" `ArrowRight` → `/foreninger`
- Secondary: "Book et gratis møde" `ArrowRight` → `/book-moede`

#### **Card 2: Jeg vil støtte**
- Primary CTA: "Find en forening at støtte" `ArrowRight` → `/hjertesager`
- Secondary: "Læs om støttemuligheder" `ArrowRight` → `/stotter`

**Trust-statement:** "Bygget med respekt for danske foreninger og dem der støtter dem."

**Word count:** ~110 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

(Uændret fra v1.0)

## Motion-niveau (CMO-justeret v1.1)

- Hero: standard FaaS-tech (dæmpet)
- Audience-split cards: mirroring slides - INGEN connector-animation
- 3-trin flow: timeline-style reveals
- Differentiator-cards: stagger reveal
- Trust-cards: subtle stagger
- INGEN aggressive animations
- Forsiden skal føles ELEGANT, ikke som SaaS-demo

---

## Inter-page links (UDVIDET v1.1)

**Linker FRA `/` TIL:**
- `/foreninger` (Hero CTA + Audience-split + Final CTA)
- `/hjertesager` (Hero CTA + Audience-split + Aktive hjertesager + Final CTA)
- `/fast-stoette` (Audience-split + Final CTA)
- `/saadan-virker-det` (Sektion 3 CTA)
- `/sikkerhed` (Sektion 6 CTA)
- `/om-os` (Sektion 7 CTA)
- `/book-moede` (Audience-split + Final CTA)
- `/stotter` (Final CTA)
- `/priser` (NY v1.1 - fra B2B audience-card + Differentiator 1)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Ingen leverandør-mentions
- ✅ **Policy 2 - Begge målgrupper:** Audience-split + Final routing-CTA
- ✅ **Policy 3 - MVP-tal master:** "80% ved donationer og fast støtte" + "32,75% af nettoprofitten" konsekvent
- ✅ **Policy 4 - Tone of voice:** "fee" → "gebyr", "direkte" reduceret, founder-headline professionel
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, lucide-react ikoner
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende for forside)

**MVP-realitets check:**
- ✅ Hero subheadline ingen volume-claims
- ✅ Diskret pre-launch note tilføjet
- ✅ Aktive hjertesager-sektion er conditional (skip hvis 0 sager)
- ✅ Adaptiv mikrocopy (1 sag vs 2+ sager)

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 10 implementeret):**
1. ✅ H1: "Støt med hjertet..." → "Bygget til danske foreninger og dem, der støtter dem"
2. ✅ Subheadline: "direkte" fjernet, mere rolig formulering
3. ✅ "80% af donationer går direkte" → "80% går til foreningen ved donationer og fast støtte"
4. ✅ Sektion 3 subheadline: "støtte i banken" → "støtte og afregning"
5. ✅ Trin 3: "Foreningen modtager pengene" → "Foreningen får afregning og dokumentation"
6. ✅ Hjertesager-sektion: conditional (skip hvis 0)
7. ✅ "Bygget af én - for mange" → "Mød personen bag StøtMedHjerte"
8. ✅ "fee" → "gebyr"

**Stærke anbefalinger (CMO kategori B - alle 9 implementeret):**
1. ✅ Forsiden som navigations-hub bekræftet
2. ✅ Audience-split bekræftet
3. ✅ B2C key-point: "din støtte" → "donationer og fast støtte"
4. ✅ B2B key-point: "Indsamlingsnævn-anmeldelse" → "tekstudkast, frister og regnskabsgrundlag"
5. ✅ Differentiator overskrift: "Hvorfor StøtMedHjerte er bygget anderledes"
6. ✅ Differentiator 1 body: "til den valgte hjertesag"
7. ✅ Trust-card 4: "Støtte og afregning dokumenteres"
8. ✅ Mød Mario mere professionel founder-tone
9. ✅ Final CTA mere routing-orienteret

**Forslag til overvejelse (CMO kategori C - 9/10 implementeret):**
1. ✅ Pre-launch note diskret under Hero trust-row
2. ✅ Hero mockup split-view spec
3. ✅ "Sådan virker det" 3 trin bekræftet
4. ✅ Adaptiv hjertesager-mikrocopy (1 sag vs 2+)
5. ✅ Hjertesager subheadline fleksibel
6. ✅ Differentiator 4 mere afgrænset
7. ✅ Connector-animation FJERNET
8. ✅ Link til /priser (B2B card + Differentiator 1)
9. ❌ Hero text-link til /saadan-virker-det - droppet (sektion 3 har CTA)
10. ✅ "Fee" → "gebyr"

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 8 sektioner, ~1,150 ord |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 10 kritiske + 9 stærke + 9/10 overvejelser. H1 mere konkret, Mød Mario professionel, Final CTA routing-orienteret. Aktive hjertesager conditional. Pre-launch note + /priser-links tilføjet. ~1,220 ord, 8 sektioner. **Klar til implementering.** |
