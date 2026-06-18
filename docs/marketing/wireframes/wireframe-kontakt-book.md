# Wireframe: `/kontakt` + `/book-moede` (Contact Pages)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-IDs:** F1-22 (Kontakt), F1-23 (Book møde)
**Review:** ChatGPT-CMO 5. maj 2026 (via Project setup)

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:**

- `/kontakt` = generel kontakt-side
- `/book-moede` = B2B-konvertering med 30-minutters afklaringsmøde (CMO v1.1)

**MVP-ærlighed:** Solo-founder, manuel håndtering, fleksibel SLA.

---

## Konverterings-mål

(Uændret fra v1.0)

---

# 📄 Side 1: `/kontakt`

## Sektion-rækkefølge (CMO-OMSTRUKTURERET v1.1)

**CMO-rettelse:** FAQ-cross-link flyttet fra position 2 til position 4 (efter form). På den måde mister vi ikke varme leads.

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero (utility) | 90 | Subtle gradient |
| 2 | Kontakt-kanaler (3 valg) | 220 | Hvid |
| 3 | Kontaktform | 250 | #F9FAFB |
| 4 | Find svar hurtigere i FAQ | 80 | Hvid |
| 5 | Hvad sker der efter du sender? | 80 | #F9FAFB |
| 6 | Forventninger og åbningstider | 100 | Hvid |
| **Total** | | **~820 ord** | |

---

## Brand-token anvendelse (CMO-rettet v1.1)

**CMO-rettet:** Calendar/HelpCircle erstattet med etablerede ikoner fra BRAND-TOKENS Icon Library.

| Sektion | Ikon |
|---|---|
| Hero | `Mail` |
| Kontakt-kanaler | `Mail`, `Video`, `MessageCircle` (CMO v1.1) |
| Form | `Send` |
| FAQ-card | `MessageCircle` (CMO v1.1) |
| Efter-flow | `Check` |
| CTAs | `ArrowRight` |

---

## Sektion-detaljer

### **1. Hero (utility) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Subheadline: "Vi er en lille operation" → mere routing-stærk service-orienteret formulering

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

- **H1:** "Kontakt StøtMedHjerte"
- **Subheadline:** "Har du spørgsmål til StøtMedHjerte, en forening, støtte, betaling eller et muligt samarbejde? Vælg den vej, der passer bedst - så hjælper vi dig videre."

**Word count:** ~90 ord

---

### **2. Kontakt-kanaler (3 valg)**

**CMO-rettet i v1.1:**
- Card 2 (Book møde) ikon: `Calendar` → `Video`
- Card 1 SLA-tekst: "1-2 hverdage" → "1-3 hverdage"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvilken kanal passer dig?"

**Subheadline:** "Vælg det der passer til din henvendelse."

#### **Card 1: Send en besked** (Ikon: `Mail`)
**Headline:** "Almindelige henvendelser"
**Body:** "Spørgsmål om platformen, support, fakturering, presse, partnerskaber eller andet. Vi svarer som regel inden for 1-3 hverdage."

**CTA:** "Skriv til os" `ArrowRight` → scroll til kontaktform (sektion 3)

#### **Card 2: Book et møde** (Ikon: `Video`)
**Headline:** "Foreningsledere"
**Body:** "Hvis du repræsenterer en forening og overvejer at bruge StøtMedHjerte, kan du booke et gratis 30-minutters afklaringsmøde. Vi gennemgår platformen sammen og besvarer dine spørgsmål."

**CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`

#### **Card 3: Find svar på FAQ** (Ikon: `MessageCircle`)
**Headline:** "Selv-betjening"
**Body:** "Mange spørgsmål er allerede besvaret. Hvis du gerne vil have et hurtigt svar, så tjek FAQ først."

**CTA:** "Se FAQ" `ArrowRight` → `/faq`

**Word count:** ~220 ord

---

### **3. Kontaktform (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Dropdown-valg omformuleret (mere direkte routing)
- Telefon tilføjet som valgfrit felt
- Beskedfelt mikrocopy mere brugervenlig
- Vilkår-checkbox forenklet (kun privatlivspolitik, ikke betingelser)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Send os en besked"

**Subheadline:** "Udfyld nedenstående og vi svarer som regel inden for 1-3 hverdage."

**Form-felter:**

1. **Navn** (required)
   - Placeholder: "Dit fulde navn"

2. **Email** (required)
   - Placeholder: "din@email.dk"
   - Validering: gyldig email-format

3. **Telefonnummer** (NEW v1.1, valgfrit)
   - Placeholder: "+45 12 34 56 78"
   - Hjælpetekst: "Kun hvis du ønsker, at vi må ringe dig op."

4. **Henvendelse om** (dropdown, required) - CMO v1.1
   - Jeg repræsenterer en forening
   - Jeg er støtter eller vil støtte
   - Spørgsmål om betaling eller abonnement
   - Teknisk problem
   - Presse eller partnerskab
   - Generel henvendelse

5. **Forenings-navn** (conditional, vises kun hvis "Jeg repræsenterer en forening" valgt)
   - Optional
   - Placeholder: "Foreningens navn"

6. **Besked** (required, textarea)
   - Placeholder: "Skriv din besked her..."
   - Min 20 tegn, max 2000 tegn
   - **Mikrocopy under feltet (CMO v1.1):** "Skriv gerne et par linjer, så vi kan hjælpe dig bedst muligt."
   - **Validation error (CMO v1.1):** "Din besked er lidt for kort. Skriv gerne lidt mere, så vi kan forstå din henvendelse."

7. **Vilkår** (checkbox, required) - CMO v1.1 forenklet
   - "Jeg accepterer, at StøtMedHjerte må behandle mine oplysninger for at besvare min henvendelse. Læs vores [privatlivspolitik](/privatlivspolitik)."

**Send-knap:** "Send besked" `Send`

**Trust-statement (under form):**
"Dine oplysninger bruges kun til at besvare din henvendelse. Vi sælger eller deler ikke dine data."

**Word count:** ~250 ord

---

### **4. Find svar hurtigere i FAQ (CMO-FLYTTET v1.1)**

**CMO-flyttet i v1.1:** Sektion var tidligere position 2 - flyttet til position 4 efter form. Nu hjælp, ikke afvisning.

**CMO-omformuleret v1.1:**
- Headline: "Måske finder du svaret hurtigere her" → "Vil du bare have et hurtigt svar?"
- Body mere serviceorienteret

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Vil du bare have et hurtigt svar?"

**Body:** "Mange praktiske spørgsmål om priser, betaling, sikkerhed og processer er allerede besvaret i vores FAQ. Hvis dit spørgsmål handler om noget konkret for dig eller din forening, så skriv endelig til os ovenfor."

**CTA:** "Se FAQ" `ArrowRight` → `/faq`

**Word count:** ~80 ord

---

### **5. Hvad sker der efter du sender? (CMO-justeret v1.1)**

**CMO-rettet i v1.1:**
- Trin 2 (læser): mindre Mario-fokus, mere "vi"-fokus

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvad sker der nu?"

**3 trin:**

1. **Du modtager en bekræftelse** (Ikon: `Check`)
   "Vi sender en automatisk bekræftelse til din email kort efter, så du ved beskeden er modtaget."

2. **Vi læser din besked** (Ikon: `Mail`) - CMO v1.1
   "Din besked bliver læst personligt, så vi kan svare ordentligt og sende den videre internt, hvis det er nødvendigt."

3. **Vi vender tilbage** (Ikon: `MessageCircle`)
   "Du modtager svar på email - typisk inden for 1-3 hverdage. Komplekse henvendelser kan tage lidt længere."

**Word count:** ~80 ord

---

### **6. Forventninger og åbningstider (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- "1-2 hverdage" → "1-3 hverdage"
- Datatilsynet-linje gjort mindre alvorlig (flyttet fra advisory til praktisk)
- Mere menneskelig SLA-formulering

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvornår kan du forvente svar?"

**Body:** "StøtMedHjerte er en lille operation. Vi besvarer henvendelser personligt og prioriterer kvalitet over hastighed. Vi svarer som regel inden for 1-3 hverdage. Nogle henvendelser kræver lidt mere afklaring, og så vender vi tilbage så hurtigt vi kan. I weekender og helligdage svarer vi som udgangspunkt ikke."

**Vigtigt:**
- "Hvis din henvendelse handler om en akut sag (fx betalingsproblem), så markér det tydeligt i emnet, så vi kan prioritere."
- "Handler din henvendelse om persondata, så skriv det gerne tydeligt i beskeden, så vi kan behandle den korrekt."

**Word count:** ~100 ord

---

# 📄 Side 2: `/book-moede`

## Sektion-rækkefølge (CMO-justeret v1.1)

**CMO-tilføjet:** Ny sektion "Er du i tvivl om mødet er relevant?" lige før booking-widget.

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero (B2B-fokus) | 90 | Dark gradient + orbs |
| 2 | Hvad får du ud af mødet? | 200 | Hvid |
| 3 | Sådan foregår mødet | 180 | #F9FAFB |
| 3.5 | **Er du i tvivl om mødet er relevant? (NY)** | 80 | Hvid |
| 4 | Booking-widget (kalender) | 100 | #F9FAFB |
| 5 | Du behøver ikke forberede noget (accordion) | 110 | Hvid |
| 6 | FAQ for mødet | 200 | #F9FAFB |
| **Total** | | **~960 ord** | |

---

## Brand-token anvendelse (CMO-rettet v1.1)

| Sektion | Ikon |
|---|---|
| Hero | `Video` (CMO v1.1: erstatter Calendar) |
| Hvad får du ud af | `Eye`, `Check`, `MessageCircle` |
| Sådan foregår | `Video`, `MessageCircle`, `Mail` |
| Booking-widget | (extern: Cal.com / Calendly-style embed) |
| Forberedelse | `FileText` |
| FAQ | `ChevronRight` |

---

## Sektion-detaljer

### **1. Hero (B2B-fokus) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Mødelængde: 30-45 min → **30 minutter** (lavere friktion)
- Trust-row: badge opdateret
- Sekundær link tilføjet under hero

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

- **H1:** "Book et gratis 30-minutters møde - vi gennemgår platformen sammen"

- **Subheadline:** "Hvis du repræsenterer en forening og overvejer StøtMedHjerte, så lad os snakke om jer. Vi gennemgår platformen, besvarer jeres spørgsmål og finder ud af, om det giver mening for jer."

- **Trust-row (3 badges - CMO v1.1):**
  - `Check` - Gratis og uforpligtende
  - `Video` - 30 minutter
  - `MessageCircle` - Online via videoopkald

- **Sekundær link (NY v1.1):** "Vil du læse mere først?" → `/foreninger`

**Word count:** ~90 ord

---

### **2. Hvad får du ud af mødet? (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Card 4 body: "Du forlader mødet uden at have skrevet under på noget" → "Du får overblik og kan tage beslutningen i ro og mag bagefter"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvad får du ud af mødet?"

**Subheadline:** "Mødet er gratis, uforpligtende og lavet til at give dig klarhed."

**4 punkter:**

#### **Card 1: Forstå platformen** (Ikon: `Eye`)
**Headline:** "Vi gennemgår, hvad I får"
**Body:** "Du ser præcis hvad foreningen får adgang til - Hjertesager, Fast Støtte, webshop, dokumentation og afregningsgrundlag. Ingen mystik."

#### **Card 2: Få konkrete svar** (Ikon: `Check`)
**Headline:** "Spørgsmål I har, besvares"
**Body:** "Du har sikkert spørgsmål om priser, fordeling, Indsamlingsnævnet, kontoflow eller andet. Vi tager dem ét for ét."

#### **Card 3: Forstå om det passer til jer** (Ikon: `MessageCircle`)
**Headline:** "Vi finder ud af det sammen"
**Body:** "Måske passer StøtMedHjerte til jeres forening, måske ikke. Mødet hjælper os begge med at finde ud af det - uden pres."

#### **Card 4: Tid til at beslutte (CMO v1.1)** (Ikon: `Check`)
**Headline:** "Du beslutter selv"
**Body:** "Du får overblik og kan tage beslutningen i ro og mag bagefter. Mødet er en uforpligtende gennemgang, hvor vi ser på jeres forening, jeres behov og om StøtMedHjerte giver mening for jer."

**Word count:** ~200 ord

---

### **3. Sådan foregår mødet (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Trin 1 mødelængde: "30-45 minutters" → "30-minutters"
- "Google Meet eller lignende" → "videoopkald" (mere generisk)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sådan foregår mødet"

**3 trin:**

1. **Vælg et tidsslot** (Ikon: `Video`)
   "Du vælger selv et 30-minutters tidsslot der passer dig. Vi tilbyder typiske mødetider på hverdage."

2. **Vi mødes online** (Ikon: `MessageCircle`)
   "Mødet foregår via videoopkald. Du modtager link i email-bekræftelsen."

3. **Vi følger op bagefter** (Ikon: `Mail`)
   "Efter mødet sender vi en kort opsummering med de ting vi gennemgik, og hvad næste skridt eventuelt kunne være."

**Word count:** ~180 ord

---

### **3.5. Er du i tvivl om mødet er relevant? (NY v1.1)**

**CMO-tilføjet - gør målgruppen skarpere og reducerer tvivl.**

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card centreret med brand-red top-accent

**Motion:**
```
T+0.0s: Card scales in (0.95 → 1.0)
T+0.3s: Body text fades up
```

**Content-spec:**

**Headline:** "Er du i tvivl om mødet er relevant?"

**Body:** "Mødet er især for dig, der sidder i eller tæt på en forenings bestyrelse, økonomi, sponsorarbejde eller frivillig drift. Du behøver ikke have besluttet noget på forhånd - det vigtigste er, at du vil undersøge, om StøtMedHjerte kan hjælpe jeres forening."

**Word count:** ~80 ord

---

### **4. Booking-widget (kalender) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Mødelængde: 30-45 min → 30 min

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Vælg et tidspunkt"

**Subheadline:** "Vælg det tidspunkt der passer dig. Du modtager bekræftelse på email kort efter."

**Embed-widget:**
- 30-minutters tidsslots
- Hverdage (mandag-fredag), specifikke tidspunkter (Mario beslutter)
- Tidszone: Europe/Copenhagen
- Felter ved booking:
  - Navn
  - Email
  - Forenings-navn (optional)
  - Forenings-rolle (optional: formand, kasserer, andet)
  - Kort beskrivelse af jeres situation (optional)

**Trust-statement (under widget):**
"Dine oplysninger bruges kun til mødet. Du modtager bekræftelse + kalender-invitation + videoopkalds-link."

**Note:** "Hvis der er behov for mere tid efter de 30 minutter, aftaler vi et opfølgende møde."

**Word count:** ~100 ord

---

### **5. Du behøver ikke forberede noget (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Hvad du skal forberede (valgfrit)" → **"Du behøver ikke forberede noget"** (sænker friktion)
- Lavet til accordion/fold-ud (mindre dominerende)
- Body omformuleret som blød hjælp

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card med accordion-pattern (`ChevronRight`)

**Motion:**
```
On click: smooth height-transition expand/collapse
```

**Content-spec (CMO v1.1):**

**Headline:** "Du behøver ikke forberede noget"

**Body:** "Du er velkommen til bare at møde op med dine spørgsmål. Hvis du vil have mest muligt ud af mødet, kan du have CVR-nummer, jeres vigtigste behov og eventuelle spørgsmål klar."

**Accordion (klik for at åbne):**

"Hvis du vil forberede dig" - *expand:*
- Foreningens CVR-nummer (vi kan tjekke jeres oplysninger live)
- En idé om hvad I gerne vil samle støtte ind til
- Spørgsmål I har om priser, processer eller compliance
- Hvilke betalings-/fundraising-løsninger I bruger i dag

**Word count:** ~110 ord

---

### **6. FAQ for mødet (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Q1 (betaling): "Vi sælger ikke noget på mødet" → mere nuanceret formulering
- Q2 (mødelængde): 30-45 min → 30 min
- Q4 (deltagere): "Mario deltager personligt" → "som udgangspunkt Mario, eller betroet person med besked"

**Brand-tokens:** Accordion-cards med `ChevronRight`

**Content-spec (CMO v1.1):**

**Headline:** "Spørgsmål om mødet"

**5 spørgsmål:**

#### **Q: Skal jeg betale for mødet? (CMO v1.1)**
"Nej. Mødet er gratis og uforpligtende. Formålet er at give jer et klart billede af platformen og svare på de spørgsmål, I har - ikke at presse jer til en beslutning."

#### **Q: Hvor lang tid varer mødet? (CMO v1.1)**
"30 minutter. Hvis vi har brug for mere tid, aftaler vi et opfølgningsmøde."

#### **Q: Skal jeg være forberedt?**
"Nej. Du behøver ikke have CVR, dokumenter eller spørgsmål klar. Det hjælper, men det er ikke et krav."

#### **Q: Hvem deltager fra StøtMedHjerte? (CMO v1.1)**
"Mødet bliver som udgangspunkt holdt af Mario Paunovic, founder af StøtMedHjerte. Hvis en betroet person fra StøtMedHjerte deltager i stedet, får du besked på forhånd."

#### **Q: Kan vi være flere fra foreningen?**
"Ja. Hvis flere fra bestyrelsen vil deltage, så markér det i booking-formen, så ved vi det."

**CTA:** "Se alle FAQ" `ArrowRight` → `/faq`

**Word count:** ~200 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

(Uændret fra v1.0 + nuanceringer)

## Motion-niveau (rolig)

(Uændret fra v1.0)

---

## Inter-page links (UDVIDET v1.1)

**Linker FRA `/kontakt` TIL:**
- `/faq` (cross-link sektion 4 + Card 3)
- `/book-moede` (Card 2)
- `/privatlivspolitik` (form vilkår)

**Linker FRA `/book-moede` TIL:**
- `/faq` (FAQ-sektion CTA)
- `/foreninger` (NY v1.1 - sekundær link under hero)
- `/kontakt` (alternativ hvis møde ikke passer)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** "Videoopkald" generic (ikke Google Meet specifikt)
- ✅ **Policy 2 - Begge målgrupper:** /kontakt for begge, /book-moede primært B2B
- ✅ **Policy 3 - MVP-tal master:** Ikke direkte relevant
- ✅ **Policy 4 - Tone of voice:** Personlig + ærlig, "lille operation" reduceret
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, etablerede lucide-react ikoner (Calendar/HelpCircle erstattet)
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende)

**Solo-founder check (CMO v1.1):**
- ✅ Mario som "udgangspunkt" (ikke fast løfte)
- ✅ Realistiske respons-tider (1-3 hverdage)
- ✅ Datatilsynet-linje fjernet fra advisory placement

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 4 implementeret):**
1. ✅ SLA "1-2 hverdage" → "1-3 hverdage" (4 forekomster)
2. ✅ FAQ-cross-link flyttet fra position 2 → position 4
3. ✅ "Vi sælger ikke noget på mødet" → mere nuanceret formulering
4. ✅ "Mario deltager personligt" → "som udgangspunkt Mario, eller betroet person"

**Stærke anbefalinger (CMO kategori B - alle 6 implementeret):**
1. ✅ Separat /book-moede bekræftet
2. ✅ Mødelængde: 30-45 min → 30 min
3. ✅ Dropdown-valg omformuleret + telefon tilføjet
4. ✅ Beskedfelt mikrocopy mere brugervenlig
5. ✅ "Hvad sker der efter du sender?" bevaret + omformuleret
6. ✅ "Hvad du skal forberede" → "Du behøver ikke forberede noget" + accordion

**Forslag til overvejelse (CMO kategori C - alle 5 implementeret):**
1. ✅ NY sektion 3.5: "Er du i tvivl om mødet er relevant?"
2. ✅ "Ingen forpligtelser" Card 4 omformuleret
3. ✅ Sekundær CTA på /book-moede ("Vil du læse mere først?")
4. ✅ Calendar/HelpCircle erstattet med etablerede ikoner (Video, MessageCircle)
5. ✅ Hero subheadline mere routing-stærk

**Compliance-justeringer (CMO kategori D):**
- ✅ Vilkår-checkbox forenklet (kun privatlivspolitik, ikke betingelser)
- ✅ Datatilsynet-linje gjort mere praktisk
- ✅ "Google Meet eller lignende" → "videoopkald"

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 2 sider (kontakt + book-moede) i én fil |
| 1.1 | 5. maj 2026 | CMO-review (via Project setup): 4 kritiske + 6 stærke + 5 overvejelser. SLA 1-3 hverdage. Mødelængde 30 min. FAQ-cross-link flyttet. "Du behøver ikke forberede noget"-accordion. NY "Er du i tvivl?"-sektion. Calendar/HelpCircle ikoner erstattet. ~820 + ~960 ord. **Klar til implementering.** |
