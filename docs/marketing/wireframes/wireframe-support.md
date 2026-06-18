# Wireframe: `/support` (Help Index)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-24
**Review:** ChatGPT-CMO 5. maj 2026 (via Project setup)

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** /support = praktisk routing-side mellem /faq (svar) og /kontakt (henvendelse). FAQ besvarer "hvad/hvorfor", support besvarer "hvor skal jeg gå hen med mit problem?"

**MVP-realitet:** Pre-launch kort og praktisk. Guides-bibliotek tones ned indtil der faktisk er guides klar.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Sektion-rækkefølge (CMO-justeret v1.1)

**CMO-rettelse:** NY hjælpe-blok lige under hero ("Vælg den rigtige vej"). Sektion-orden: Hero → Vælg vej → 3 hurtige veje → Almindelige emner → Haster henvendelse? → Final CTA.

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero (utility) | 80 | Subtle gradient |
| 1.5 | **Vælg den rigtige vej (NY)** | 80 | Hvid |
| 2 | Tre hurtige veje (FAQ / Forening / Kontakt) | 220 | #F9FAFB |
| 3 | Almindelige emner (kategorier) | 240 | Hvid |
| 4 | Haster din henvendelse? | 200 | #F9FAFB |
| 5 | Final CTA | 100 | Dark gradient |
| **Total** | | **~920 ord** | |

---

## Brand-token anvendelse (CMO-rettet v1.1)

**CMO-rettet:** Ikoner aligneret med BRAND-TOKENS Icon Library.

| Sektion | Ikon |
|---|---|
| Hero | `MessageCircle` |
| Vælg den rigtige vej | (ingen - pure routing copy) |
| Tre hurtige veje | `MessageCircle`, `Users`, `Mail` (CMO v1.1) |
| Almindelige emner | `Users`, `Heart`, `CreditCard`, `ShieldCheck`, `Settings` (CMO v1.1) |
| Haster henvendelse | `AlertTriangle` (CMO v1.1: erstatter AlertCircle) |
| CTAs | `ArrowRight` |

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero (utility)**

(Uændret fra v1.0)

**Word count:** ~80 ord

---

### **1.5. Vælg den rigtige vej (NY v1.1)**

**CMO-tilføjet - gør routing-formålet eksplicit fra starten.**

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card centreret med 3 linjer
- Pure copy, ingen ikoner

**Motion:**
```
T+0.0s: Card fade-up
T+0.3s: 3 linjer reveal stagger
```

**Content-spec (CMO v1.1):**

**Headline:** "Er du i tvivl om hvor du skal starte?"

**3 linjer:**
- Vælg **FAQ**, hvis du har et generelt spørgsmål.
- Vælg **kontakt**, hvis du har et konkret problem.
- Vælg **book møde**, hvis du repræsenterer en forening og vil se, om StøtMedHjerte passer til jer.

**Word count:** ~80 ord

---

### **2. Tre hurtige veje (FAQ / Forening / Kontakt) (CMO-OMSTRUKTURERET v1.1)**

**CMO-rettet i v1.1:**
- Kort 2 (Guides) → erstattet med "Forening og opstart" (B2B-konvertering)
- Kort 1 (FAQ): "32 spørgsmål" → mere fleksibel formulering
- Hele sektionen mere handlingsorienteret

**Brand-tokens:**
- Background: #F9FAFB (CMO v1.1: skiftet fra hvid)
- 3 cards i 3-kolonner grid (stacked på mobile)
- Tier-2 secondary cards med ikon-accent

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: 3 cards stagger reveal
```

**Content-spec (CMO v1.1):**

**Headline:** "Find hurtig hjælp"

**Subheadline:** "Tre måder at få svar på."

#### **Card 1: Spørgsmål og svar** (Ikon: `MessageCircle`)
**Headline:** "Spørgsmål og svar"
**Body:** "Find svar på de mest almindelige spørgsmål om platformen, priser, betaling, sikkerhed og praktiske processer."

**CTA:** "Se FAQ" `ArrowRight` → `/faq`

#### **Card 2: Forening og opstart (CMO v1.1 - erstatter Guides)** (Ikon: `Users`)
**Headline:** "Forening og opstart"
**Body:** "Repræsenterer du en forening? Få overblik over opstart, verificering, hjertesager, Fast Støtte og webshop."

**CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`

#### **Card 3: Skriv til os** (Ikon: `Mail`)
**Headline:** "Skriv til os"
**Body:** "Har du et konkret problem, eller finder du ikke svaret? Skriv til os, så hjælper vi dig videre. Vi svarer typisk inden for 1-3 hverdage."

**CTA:** "Kontakt os" `ArrowRight` → `/kontakt`

**Note (under cards):** "Vi bygger løbende korte guides til opsætning, betaling, dokumentation og brug af platformen. Indtil guidebiblioteket er klar, finder du de vigtigste svar i FAQ - eller du kan skrive til os."

**Word count:** ~220 ord

---

### **3. Almindelige emner (kategorier) (CMO-FORENKLET v1.1)**

**CMO-rettet i v1.1:**
- Hvert kort har max 2 links (var 3) - "max 1 primær + 1 sekundær"
- Card 1 omdøbt: "Foreningsdrift" → "For foreninger"
- Card 5 ikon: `Repeat` → `Settings` (Repeat er Fast Støtte-ikon)

**Brand-tokens:**
- Background: hvid (CMO v1.1: skiftet fra #F9FAFB)
- 5 emne-cards i 2-3 kolonner grid
- Tier-3 soft cards med kategori-ikon

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Almindelige emner"

**Subheadline:** "Find hjælp inden for det område der passer dig."

**5 kategori-cards (CMO v1.1 - max 2 links per card):**

#### **Card 1: For foreninger (CMO v1.1)** (Ikon: `Users`)
**Headline:** "For foreninger"
**Body:** "Hjælp til opstart, verificering, hjertesager, Fast Støtte, webshop og foreningsprofil."

**Links:**
- Primær: "Sådan kommer foreningen i gang" → `/saadan-virker-det#forening`
- Sekundær: "Book et møde" → `/book-moede`

#### **Card 2: For støtter** (Ikon: `Heart`)
**Headline:** "For støtter"
**Body:** "Donationer, Fast Støtte, kvitteringer, profil og anonymitet."

**Links:**
- Primær: "Sådan støtter du" → `/saadan-virker-det#stotter`
- Sekundær: "Læs om Fast Støtte" → `/fast-stoette`

#### **Card 3: Betaling og afregning** (Ikon: `CreditCard`)
**Headline:** "Betaling"
**Body:** "Betalingsmetoder, fejlede betalinger, refundering og afregning til foreninger."

**Links:**
- Primær: "FAQ om betaling" → `/faq#priser`
- Sekundær: "Læs om priser og afregning" → `/priser`

#### **Card 4: Sikkerhed og data** (Ikon: `ShieldCheck`)
**Headline:** "Sikkerhed"
**Body:** "Konto-sikkerhed, persondata, GDPR-rettigheder og dokumentation."

**Links:**
- Primær: "Læs om sikkerhed" → `/sikkerhed`
- Sekundær: "Privatlivspolitik" → `/privatlivspolitik`

#### **Card 5: Konto og profil (CMO v1.1)** (Ikon: `Settings`)
**Headline:** "Din konto"
**Body:** "Opret konto, log ind, ændr oplysninger, slet konto."

**Links:**
- Primær: "Skal jeg oprette konto?" → `/faq#konto`
- Sekundær: "GDPR-rettigheder" → `/sikkerhed#gdpr`

**Word count:** ~240 ord

---

### **4. Haster din henvendelse? (CMO-OMDØBT v1.1)**

**CMO-rettet i v1.1:**
- Headline: "Har du brug for akut hjælp?" → **"Haster din henvendelse?"** (mindre operationel forventning)
- Subheadline omformuleret
- NY hastesag: "Mistanke om uautoriseret adgang"
- Note omformuleret (mindre hård)
- Ikon: `AlertCircle` → `AlertTriangle` (etableret i BRAND-TOKENS)

**Brand-tokens:**
- Background: #F9FAFB (CMO v1.1: skiftet fra hvid)
- Tier-2 secondary card med brand-red `AlertTriangle`-accent

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Haster din henvendelse?"

**Subheadline:** "Hvis din henvendelse handler om betaling, login eller mistanke om misbrug, så skriv det tydeligt i emnefeltet. Så kan vi prioritere den korrekt."

**4 hastesager (NY 4. tilføjet i v1.1):**

#### **Betalingsproblem**
"Hvis en betaling er fejlet eller du ser en uventet trækning, kontakt os og marker emnet 'Betalingsproblem'. Vi vender tilbage hurtigst muligt."

#### **Kan ikke logge ind**
"Hvis du ikke kan logge ind på din konto, prøv først 'Glemt password'. Hvis det stadig ikke virker, kontakt os og marker emnet 'Login-problem'."

#### **Mistanke om uautoriseret adgang (NY v1.1)**
"Hvis du tror, at andre har fået adgang til din konto, så kontakt os med det samme og skriv 'Konto-sikkerhed' i emnet. Skift også din adgangskode, hvis du stadig kan logge ind."

#### **Mistanke om fejl eller misbrug**
"Hvis du har mistanke om en fejl, uautoriseret aktivitet eller misbrug, kontakt os hurtigst muligt og marker emnet 'Mistanke om fejl'."

**CTA:** "Kontakt os om hastesag" `ArrowRight` → `/kontakt?subject=hastesag`

**Note (CMO v1.1):** "Vi svarer normalt på hverdage. Haster sagen, prioriterer vi den så snart vi er online igen."

**Word count:** ~200 ord

---

### **5. Final CTA (CMO-justeret v1.1)**

**CMO-rettet i v1.1:**
- Én primary CTA (var to) - "Kontakt os" som primær eskalering
- "Book et møde" som secondary
- "Se FAQ" som tertiary text-link
- Headline: "Får du stadig ikke svar?" → "Fandt du ikke det, du søgte?"

**Brand-tokens:** Dark gradient + brand-red orbs

**Content-spec (CMO v1.1):**

**Headline:** "Fandt du ikke det, du søgte?"

**Subheadline:** "Skriv til os, eller book et møde hvis du repræsenterer en forening."

**Primary CTA:** "Kontakt os" `ArrowRight` → `/kontakt`
**Secondary CTA:** "Book et gratis møde" `ArrowRight` → `/book-moede`
**Tertiary text-link:** "Se FAQ" → `/faq`

**Trust-statement:** "Vi svarer typisk inden for 1-3 hverdage."

**Word count:** ~100 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone (CMO-bekræftet)

- **Praktisk og hjælpsom**, ikke marketing-fluff
- Routing-fokus: hvor skal jeg gå hen med mit problem?
- MVP-ærlig om guides under opbygning
- Akut hjælp tydelig uden at være alarmerende

## Motion-niveau (rolig)

(Uændret fra v1.0)

---

## Inter-page links

**Linker FRA `/support` TIL:**
- `/faq` (3 steder: Card 1, kategori-card 3 + 5, Final CTA tertiary)
- `/kontakt` (Card 3, alle hastesager, Final CTA primary)
- `/book-moede` (Card 2, kategori-card 1, Final CTA secondary)
- `/saadan-virker-det` (kategori-cards 1, 2)
- `/fast-stoette` (kategori-card 2)
- `/priser` (kategori-card 3)
- `/sikkerhed` (kategori-card 4)
- `/privatlivspolitik` (kategori-card 4)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Ingen leverandør-mentions
- ✅ **Policy 2 - Begge målgrupper:** Kategorier dækker B2B + B2C
- ✅ **Policy 3 - MVP-tal master:** "32 spørgsmål" fjernet (vedligeholdelse-friktion)
- ✅ **Policy 4 - Tone of voice:** Praktisk + hjælpsom
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, ikoner aligneret med BRAND-TOKENS
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende)

**MVP-realitets check:**
- ✅ Guides-card erstattet med Forening-card (ingen forventning om manglende guides)
- ✅ Guides nævnt som "kommer løbende" i note
- ✅ Realistisk SLA (1-3 hverdage)

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 3 implementeret):**
1. ✅ /support/guides aktiv placeholder fjernet - Guides-card erstattet med "Forening og opstart"
2. ✅ "Akut hjælp" → "Haster din henvendelse?" (mindre operationel forventning)
3. ✅ NY hastesag: "Mistanke om uautoriseret adgang"

**Stærke anbefalinger (CMO kategori B - alle 5 implementeret):**
1. ✅ /support beholdt (ingen redirect til /faq)
2. ✅ Ressource-cards: "FAQ / Guides / Kontakt" → "FAQ / Forening / Kontakt"
3. ✅ Kategori-cards: max 2 links per card (var 3)
4. ✅ "32 spørgsmål" → fleksibel formulering
5. ✅ Ikoner aligneret: AlertCircle → AlertTriangle, Repeat → Settings

**Forslag til overvejelse (CMO kategori C - 4/5 implementeret):**
1. ✅ NY sektion 1.5: "Vælg den rigtige vej" lige under hero
2. ✅ "Foreningsdrift" → "For foreninger"
3. ✅ Konto-card: Repeat → Settings
4. ✅ Final CTA: én primary (var to), secondary + tertiary
5. ❌ "Driftsstatus" - droppet (skal ikke vises uden faktisk vedligeholdelse)

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 5 sektioner, ~840 ord. Hjælp-indeks med 3 ressource-cards (FAQ, Guides, Kontakt), 5 kategori-cards, Akut hjælp-sektion, Final CTA |
| 1.1 | 5. maj 2026 | CMO-review (via Project): 3 kritiske + 5 stærke + 4/5 overvejelser. Guides-card erstattet med Forening-card. NY sektion 1.5 "Vælg den rigtige vej". "Akut hjælp" → "Haster din henvendelse?" + ny hastesag (uautoriseret adgang). Kategori-cards: max 2 links. "Foreningsdrift" → "For foreninger". Ikoner aligneret med BRAND-TOKENS (AlertTriangle, Settings). Final CTA: én primary. ~920 ord, 6 sektioner. **Klar til implementering.** |
