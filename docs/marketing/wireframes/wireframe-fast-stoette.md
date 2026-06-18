# Wireframe: `/fast-stoette` (Fast Støtte Deep-Dive)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-18
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** Den støtte foreningen kan regne med - direkte løfte til både støtter (forudsigeligt) og forening (forudsigelig indtægt). Skal føles som **bæredygtig støtte**, ikke spontan donation.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Features mappet til siden

(Uændret fra v1.0 - alle 4 Primary features dækket)

---

## Sektion-rækkefølge (uændret fra v1.0)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 70 | Dark gradient + orbs |
| 2 | Hvad er Fast Støtte? | 110 | Hvid |
| 3 | Vælg dit niveau (tier-system) | 200 | #F9FAFB |
| 4 | Sådan virker det (5 trin) | 180 | Hvid |
| 5 | Hvorfor Fast Støtte? | 200 | #F9FAFB |
| 6 | Vigtigt at vide | 160 | Hvid |
| 7 | Soft CTA | 30 | #F9FAFB |
| 8 | Hvad foreningen kan med din støtte | 160 | Hvid |
| 9 | FAQ-snippet | 220 | #F9FAFB |
| 10 | Final CTA | 80 | Dark gradient |
| **Total** | | **~1,410 ord** | |

---

# 🎨 BRAND-TOKEN ANVENDELSE

(Uændret fra v1.0)

**CMO-justering v1.1:** Motion-niveau dæmpet på tier-cards. Ingen glow/pulse på 200-card.

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero** - "Giv fast støtte til en forening, du tror på"

**CMO-rettet i v1.1:**
- H1: "Bliv fast støtter - for foreningen du tror på" → "Giv fast støtte til en forening, du tror på" (mere naturligt dansk)
- Subheadline: 80% nævnt eksplicit
- Trust-row tilføjet "Én fast forening ad gangen" (F43 tidligere op)
- Mockup-fokus ændret (kontrol fremfor streak)

**Brand-tokens:** (uændret fra v1.0)

**Motion (FaaS-tech standard, dæmpet):**
```
T+0.0s: Background orbs fade in
T+0.2s: H1 fade-up
T+0.5s: Subheadline fade-up
T+0.8s: Trust-badges stagger reveal
T+1.0s: SubscriptionCard mockup slides in
        - "200 kr./md." stable display
        - "160 kr. til foreningen" highlighted
        - "Ændr eller stop"-knap visible
T+1.5s: Subtle "Aktiv"-indicator pulse
```

**Continuous:**
- Mockup tilt: ±2deg parallax
- Subtle glow på "Aktiv"-status

**Content-spec (CMO v1.1):**

- **H1:** "Giv fast støtte til en forening, du tror på"
- **Subheadline:** "Vælg et månedligt beløb, der passer dig. 80% går til foreningen, og du kan ændre, pause eller stoppe din støtte når som helst."
- **Primary CTA:** "Find en forening at støtte"
- **Secondary CTA:** "Se hvordan det virker"
- **Trust-row (4 badges):**
  - `Heart` - 80% til foreningen
  - `Check` - Ingen binding
  - `Users` - Gratis konto
  - `Repeat` - Stop når som helst

**Mockup viser (CMO v1.1):**
- Aktiv Fast Støtte
- 200 kr./md.
- 160 kr. til foreningen
- Næste betaling
- Knap "Ændr eller stop"

**Word count:** ~70 ord

---

### **2. Hvad er Fast Støtte?**

**CMO-rettet i v1.1:**
- Body omformuleret med "Den støtte foreningen kan regne med"
- F43 (én forening ad gangen) nævnt tidligere
- "80% direkte" forklaret transparent (ikke "ingen skjulte gebyrer")

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Fast Støtte forklaret enkelt"

**Body:** "Fast Støtte er et fast månedligt beløb du giver til én forening. 80% går direkte til foreningen hver måned. Resten dækker betaling, drift, support og platformen bag. Du kan stoppe når som helst - uden opsigelses-varsel."

**3 key-points med ikoner:**
- `Repeat` **Månedligt automatisk** - Du betaler én gang, derefter trækkes beløbet automatisk hver måned
- `Heart` **80% til foreningen** - Resten dækker betaling, drift, support og platformen bag
- `Check` **Stop når som helst** - Pause eller stop med det samme fra din profil

**Vigtig præcisering (CMO v1.1):** "Fast Støtte gives til én forening ad gangen. Du kan stadig give engangsstøtte eller købe supporterprodukter til andre foreninger."

**Word count:** ~110 ord

---

### **3. Vælg dit niveau (tier-system)** [F11]

**CMO-rettet i v1.1:**
- "Mest valgte" → "Anbefalet" eller "God balance"
- "Som en café-mukke" fjernet
- Tier-card copy mindre statuspræget
- "Foreningen modtager X kr./år" → "Hvis du støtter i 12 måneder"
- Ingen glow/pulse på 200-card

**Brand-tokens:**
- Background: #F9FAFB
- 4 tier-cards horizontalt
- 200 kr./md. som **Tier 1 PRIMARY** med brand-red border (ingen glow)
- "Anbefalet"-badge på 200-card

**Motion (DÆMPET v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: 4 tier-cards reveal sequentielt (left-to-right, 0.1s stagger)
T+0.7s: Counter animation kun ÉN gang ved scroll-in
        - Subtle, ikke pulserende
T+1.0s: Tal lander på final value
```

**Hover på tier-card:**
- Subtle lift (-4px)
- Border-color shift
- INGEN pulse eller glow

**Content-spec (CMO v1.1):**

**Headline:** "Vælg dit niveau"

**Subheadline:** "Vælg det beløb der passer dig. Du kan altid ændre niveau senere på din profil."

**4 tier-cards (CMO v1.1):**

#### **100 kr./md.** (Tier 2)
**En enkel start**
"En fast støtte, der er nem at passe ind i måneden."
- 80 kr. går til foreningen hver måned
- Hvis du støtter i 12 måneder, går 960 kr. til foreningen

#### **200 kr./md.** ⭐ **Anbefalet** (Tier 1 PRIMARY)
**God balance**
"Et stærkt niveau for dig, der vil give foreningen en stabil støtte hver måned - uden at det bliver for tungt i hverdagen."
- 160 kr. går til foreningen hver måned
- Hvis du støtter i 12 måneder, går 1.920 kr. til foreningen

#### **300 kr./md.** (Tier 2)
**Ekstra opbakning**
"En stærk fast støtte til foreningen."
- 240 kr. går til foreningen hver måned
- Hvis du støtter i 12 måneder, går 2.880 kr. til foreningen

#### **500 kr./md.** (Tier 2)
**Stærk fast støtte**
"For dig der vil give betydeligt."
- 400 kr. går til foreningen hver måned
- Hvis du støtter i 12 måneder, går 4.800 kr. til foreningen

**Insight box:** "Du kan ændre dit niveau når som helst på din profil. Hvis du vil stoppe helt, gør du det også der."

**Word count:** ~200 ord

---

### **4. Sådan virker det (5 trin)** [F37]

**CMO-rettet i v1.1:**
- Trin 3: Konto-krav forklaret som fordel (ikke kun "tager under 1 minut")
- Trin 5: "Foreningen får besked" → "Foreningen kan følge støtten i deres overblik"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sådan kommer du i gang"

**5 trin:**

1. **Find en forening** (Ikon: `Search`)
   "Browse `/hjertesager` eller find direkte fra en forening du kender."

2. **Vælg dit niveau** (Ikon: `Target`)
   "100, 200, 300 eller 500 kr./md. Du kan altid ændre senere."

3. **Opret konto** (Ikon: `Users`)
   "Email + adgangskode. Tager under 1 minut. Kontoen bruges til kvitteringer, betalingsmetode, historik og mulighed for at pause eller stoppe din støtte."

4. **Betal første gang** (Ikon: `CreditCard`)
   "Sikker betaling via certificeret betalingspartner. Du får kvittering på email kort efter."

5. **Auto-trækning fremover** (Ikon: `Repeat`)
   "Hver måned trækkes beløbet automatisk. Foreningen kan følge støtten i deres overblik. Du kan stoppe når som helst."

**Word count:** ~180 ord

---

### **5. Hvorfor Fast Støtte? (CMO-omstruktureret v1.1)**

**CMO-rettet i v1.1:**
- 3 cards → 4 cards (mere balance B2C/forening)
- Mere "for dig"-fokus

**Brand-tokens:**
- Background: #F9FAFB
- 4 cards i 2x2 grid
- Tier-2 secondary cards med brand-red icon-accent

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 4 cards stagger reveal
T+0.7s: Each card-icon performs subtle animation
```

**Content-spec (CMO v1.1):**

**Headline:** "Hvorfor Fast Støtte?"

**Subheadline:** "Sammenlignet med engangs-donationer giver Fast Støtte konkrete fordele - for både dig og foreningen."

**4 fordele (2x2 grid):**

#### **For foreningen: Stabil indtægt** (Ikon: `TrendingUp`)
"Foreningen kan planlægge bedre, fordi støtten kommer fast hver måned."

#### **For dig: Nemt at støtte uden at huske det** (Ikon: `Heart`)
"Du vælger én gang, og så kører støtten automatisk, indtil du ændrer eller stopper den."

#### **Du kan stoppe når som helst** (Ikon: `Check`)
"Ingen binding. Stop med det samme fra din profil - uden opsigelses-varsel."

#### **Du kan følge din støtte** (Ikon: `Eye`)
"Se al din støtte ét sted på din profil. Kvitteringer, historik og overblik."

**Word count:** ~200 ord

---

### **6. Vigtigt at vide** [F43, F44]

**CMO-bevaret men forenklet i v1.1:**
- F43 nævnes nu også tidligere (sektion 2), så her er det reinforcement
- "Instant" → "med det samme"

**Brand-tokens:**
- Background: hvid
- Tier-3 soft cards med `Info`-ikon

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3 cards reveal sequentielt
```

**Content-spec (CMO v1.1):**

**Headline:** "Vigtigt at vide"

**3 præciseringer:**

`Info` **Én Fast Støtte ad gangen [F43]**
"Du kan kun have én aktiv Fast Støtte. Hvis du vil støtte en anden forening, skal du først stoppe den nuværende - eller du kan donere engangs eller købe supporterprodukter til andre foreninger."

`Info` **Stop med det samme [F44]**
"Du kan stoppe din Fast Støtte med det samme på din profil. Ingen opsigelses-varsel, ingen ekstra omkostninger. Den næste auto-trækning sker bare ikke."

`Info` **Skattefradrag afhænger af foreningen**
"Skattefradrag afhænger af, om den enkelte forening er §8A-godkendt af Skattestyrelsen. Det er ikke en standardfunktion ved lancering. Hvis fradrag er muligt, vil det fremgå tydeligt ved foreningen."

**Word count:** ~160 ord

---

### **7. Soft CTA - "Find foreningen først"**

**CMO-rettet i v1.1:**
- "Over 100 foreninger" fjernet (hvis ikke live)
- Generisk formulering

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Klar til at vælge en forening?"
**Body:** "Find en aktiv forening og vælg den, du gerne vil støtte fast."
**CTA:** "Find en forening at støtte" `ArrowRight` → `/hjertesager`

**Word count:** ~30 ord

---

### **8. Hvad foreningen kan med din støtte**

**CMO-rettet i v1.1:**
- Konkrete eksempler ("U13-trøjer", "Deltidstræner", "Renovere klubhus") → vejledende formuleringer
- "Det kan for eksempel hjælpe med..." kolonne

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvad kan foreningen gøre med din støtte?"

**Subheadline:** "Et eksempel: 50 fast-støtter på 200 kr./md. = 8.000 kr./md. til foreningen. Eksemplerne nedenfor er vejledende og afhænger af foreningens behov og lokale priser."

**Eksempel-tabel (CMO v1.1):**

| Antal fast-støtter | Til foreningen pr. måned | Til foreningen pr. år | Det kan for eksempel hjælpe med |
|---|---|---|---|
| 10 | 1.600 kr. | 19.200 kr. | Udstyr, bolde, materialer eller mindre aktiviteter |
| 25 | 4.000 kr. | 48.000 kr. | Træningsudstyr, stævner, ture eller sociale arrangementer |
| 50 | 8.000 kr. | 96.000 kr. | Bedre faciliteter, nye aktiviteter eller ekstra hjælp i hverdagen |
| 100 | 16.000 kr. | 192.000 kr. | Større projekter, renovering eller langsigtet udvikling |

**Insight (CMO v1.1):** "Det er den langsigtede effekt af fast støtte. 50 mennesker der hver giver 200 kr./md. = mere stabil økonomi for foreningen."

**Word count:** ~160 ord

---

### **9. FAQ-snippet (UDVIDET v1.1)**

**CMO-rettet i v1.1:**
- Tilføjet: "Hvornår får foreningen pengene?"
- Mislykket betaling-svar mere forsigtig ("typisk")
- §8A-svar forenklet

**Brand-tokens:** Accordion-cards med `ChevronRight`

**Content-spec (CMO v1.1):**

**Headline:** "Ofte stillede spørgsmål"

**7 spørgsmål (CMO v1.1):**

1. **Hvordan stopper jeg min Fast Støtte?**
   "Du går ind på din profil og klikker 'Stop'. Det sker med det samme - ingen opsigelses-varsel."

2. **Kan jeg pause i en periode?**
   "Ja. Du kan pause din Fast Støtte og genaktivere den senere. Pause-knappen er på din profil."

3. **Kan jeg støtte flere foreninger samtidigt?**
   "Med Fast Støtte: kun én ad gangen. Men du kan donere engangs til mange foreninger eller købe supporterprodukter til andre foreninger samtidig."

4. **Hvad sker der hvis jeg skifter konto eller bank?**
   "Du opdaterer betalingsmetode på din profil. Den næste trækning bruger den nye metode."

5. **Får jeg kvittering hver måned?**
   "Ja. Du får email-kvittering kort efter hver auto-trækning. Du kan også se al din historik på din profil."

6. **Hvad sker der hvis betalingen fejler?**
   "Hvis betalingen fejler, får du besked og mulighed for at opdatere din betalingsmetode. Vi forsøger typisk igen efter et par dage. Foreningen modtager først beløbet, når betalingen er gennemført."

7. **Hvornår får foreningen pengene?**
   "Støtten samles og afregnes efter den relevante periode. Foreningen kan se støtte og afregningsgrundlag i deres overblik."

**CTA:** "Se alle FAQ" `ArrowRight` → `/faq`

**Word count:** ~220 ord

---

### **10. Final CTA**

**Brand-tokens:** (uændret fra v1.0)

**Content-spec:** (uændret fra v1.0)

**Word count:** ~80 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

- B2C-venlig, almindeligt sprog
- "Den støtte foreningen kan regne med" som central værdi
- Vejledende impact-eksempler (ikke absolutte løfter)
- Roligt, ikke aggressivt abonnementssalg

## Motion-niveau ROLIGT v1.1

- Hero: standard FaaS-tech (dæmpet)
- Tier-cards: subtle counter-animation kun én gang
- INGEN glow/pulse på 200-card
- 5-step flow: progressive timeline (uændret)
- Cards: subtle fade + lift på hover

---

## Inter-page links

(Uændret fra v1.0)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Ingen leverandør-mentions
- ✅ **Policy 2 - Begge målgrupper:** B2C primary, foreninger i kontekst
- ✅ **Policy 3 - MVP-tal master:** 80% korrekt; "resten dækker..." transparent
- ✅ **Policy 4 - Tone of voice:** "Instant" → "med det samme", "café-mukke" fjernet, "mest valgte" → "anbefalet", "dedikerede støtter" → "stærk fast støtte"
- ✅ **Policy 5 - Brand-konsistens:** Lucide-react ikoner, "StøtMedHjerte" konsekvent
- ✅ **Policy 6 - §8A:** Forenklet conditional formulering

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 10 implementeret):**
1. ✅ "Mest valgte" → "Anbefalet" (200 kr.-card)
2. ✅ "Café-mukke" sammenligning fjernet
3. ✅ Hero subheadline: 80% nævnt eksplicit
4. ✅ "80% direkte - ingen skjulte gebyrer" → transparent forklaring
5. ✅ F43 (én forening) nævnt tidligere (sektion 2)
6. ✅ "Instant" → "med det samme"
7. ✅ Impact-eksempler vejledende ("Det kan for eksempel hjælpe med...")
8. ✅ Konto-krav forklaret som fordel (trin 3)
9. ✅ "Foreningen får besked" → "Foreningen kan følge støtten i deres overblik"
10. ✅ "Foreningen modtager X kr./år" → "Hvis du støtter i 12 måneder"

**Stærke anbefalinger (CMO kategori B - alle 9 implementeret):**
1. ✅ Hero H1 mere naturligt dansk
2. ✅ Tier-card copy mindre statuspræget
3. ✅ Sektion 5 omstruktureret til 4 cards (mere B2C-balance)
4. ✅ "Stop når som helst" varieret formuleret
5. ✅ "Over 100 foreninger" fjernet
6. ✅ Hero mockup fokus på kontrol (ikke streak)
7. ✅ Glow/pulse på tier-cards fjernet
8. ✅ §8A-svar forenklet
9. ✅ Mislykket betaling-svar forsigtigere

**Forslag til overvejelse (CMO kategori C - implementeret):**
1. ✅ Word count justeret (~1,410 ord)
2. ✅ FAQ udvidet med "Hvornår får foreningen pengene?"
3. ✅ Motion roligere på tier-cards

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 10 sektioner, ~1,350 ord, 4 Primary features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 10 kritiske + 9 stærke + 3 overvejelser. "Mest valgte" → "Anbefalet", café-sammenligning fjernet, F43 nævnt tidligere, impact-eksempler vejledende, motion dæmpet, FAQ udvidet til 7 spørgsmål. ~1,410 ord, 10 sektioner. **Klar til implementering.** |
