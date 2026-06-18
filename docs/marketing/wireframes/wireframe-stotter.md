# Wireframe: `/stotter` (B2C Foundation)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.0
**Page-ID:** F1-10
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

**Den primære B2C-konverterings-side.** Fanger besøgende der overvejer at støtte en forening via StøtMedHjerte. Skal:

1. Bygge tryghed ÆR features (B2C trust-først)
2. Vise de 3 måder man kan støtte (engangs, fast, merch)
3. Afdramatisere konto-kravet positivt og tidligt
4. Konvertere til oprettelse af bruger-konto + første støtte

**Strategisk positionering:** B2C-siden er **trust-først, menneskelig, ikke loyalty-program**. Støtteren skal føle: "Det her er trygt, nemt, og går reelt til foreningen" - før vi viser tier, streak og profil.

**Primær audience:** B2C (privatpersoner - forældre, familie, lokal-fans, alumni)
**Sekundær audience:** Foreninger nævnes i kontekst

---

## Konverterings-mål

**Primary CTA:** "Find en forening at støtte" → `/hjertesager`
**Secondary CTA:** "Se hvordan fast støtte virker" → `/fast-stoette`
**Tertiary action:** "Opret konto" → `/opret-stoetter`

---

## Features mappet til siden (8 features)

(Identisk med v1.0 - alle 8 Primary features dækket)

---

## Sektion-rækkefølge (CMO-justeret v1.1)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 60 | Dark gradient + orbs |
| 2 | Hvorfor det er trygt at støtte her | 140 | Hvid |
| 3 | 3 måder at støtte på | 220 | #F9FAFB |
| 4 | **Gratis konto - derfor skal du oprette dig (NY placering)** | 100 | Hvid |
| 5 | Soft CTA - "Find en sag du brænder for" | 30 | #F9FAFB |
| 6 | Følg din støtte over tid (omdøbt fra "Tier-system") | 200 | Hvid |
| 7 | Små markeringer for din støtte (omdøbt fra "Streak + Milestones") | 140 | #F9FAFB |
| 8 | Profil-overblik (mockup) | 160 | Hvid |
| 9 | Sådan kommer du i gang (4 trin) | 140 | #F9FAFB |
| 10 | Sikkerhed + verificerede foreninger | 130 | Hvid |
| 11 | FAQ-snippet | 170 | #F9FAFB |
| 12 | Final CTA | 70 | Dark gradient |
| **Total** | | **~1,560 ord** | |

---

# 🎨 BRAND-TOKEN ANVENDELSE

(Samme som v1.0 - Marketing palette: brand-red + neutrals)

**Sektor-farver:** KUN i profil-mockup (sektion 8) - ikke noget andet sted.

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero** - "Støt en forening, du gerne vil se vokse"

**CMO-rettet i v1.1:**
- Headline mere menneskelig (følelsesbåret, ikke teknisk)
- Subheadline omskrevet - "ikke til mellemmænd" fjernet
- Trust-row inkluderer "Gratis konto" som positivt løfte

**Brand-tokens:**
- Background: dark gradient (#0F172A) + brand-red orbs
- H1: hvid med brand-red accent på "vokse"
- Subheadline: rgba(255,255,255,0.75)
- Primary CTA: brand-red bg + brand-shadow-lg
- Secondary CTA: outlined hvid
- Trust-row: rgba(255,255,255,0.15) bg, hvid text, brand-red icon
- Mockup: hvid card

**Motion:** (uændret fra v1.0 - FaaS-tech niveau)

**Content-spec (CMO v1.1):**

- **H1:** "Støt en forening, du gerne vil se vokse"
- **Subheadline:** "Vælg en hjertesag, giv fast månedlig støtte eller køb supporterprodukter. Du kan følge din støtte, få kvittering og se, hvordan du hjælper over tid."
- **Primary CTA:** "Find en forening at støtte"
- **Secondary CTA:** "Se hvordan fast støtte virker"
- **Trust-row (4 badges):**
  - Verificerede foreninger
  - Gratis konto
  - Stop fast støtte når som helst
  - 80% til foreningen ved donationer og fast støtte

**Word count:** ~60 ord

---

### **2. Hvorfor det er trygt at støtte her**

**CMO-rettet i v1.1:**
- "80% direkte" omformuleret transparent
- "Email-kvittering inden for 1 minut" → "kort efter"
- Tekniske termer (PCI DSS) fjernet - flyttes til /sikkerhed

**Brand-tokens:**
- Background: hvid
- 4 trust-cards i 2x2 grid (tier-2 secondary)
- Icons: brand-red i red-tint container

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvorfor det er trygt at støtte her"

**4 trust-points:**

🛡️ **Vi tjekker alle foreninger grundigt**
"Alle foreninger bliver kontrolleret, før de kan modtage støtte. Vi tjekker blandt andet, at foreningen er reel, og at oplysningerne stemmer."

❤️ **Klar fordeling - ingen skjulte gebyrer**
"Ved donationer og fast støtte går 80% til foreningen. Resten dækker betalingsgebyrer, drift og udvikling af platformen. Ved webshop-køb går 32,75% af overskuddet til den valgte hjertesag."

🔒 **Sikker betaling**
"Betaling foregår med høj sikkerhed, og vi gemmer aldrig dine kortoplysninger."

✅ **Du har fuld kontrol**
"Stop fast støtte når som helst. Se al din støtte ét sted. Få kvittering på email kort efter."

**Word count:** ~140 ord

---

### **3. 3 måder at støtte på**

**CMO-rettet i v1.1:**
- "Mest populær"-badge → "Mest stabil støtte"
- Multi-engagement omformuleret tydeligere
- Webshop-CTA: "Se webshop" → "Se supporterprodukter"

**Brand-tokens (Card-tier system uændret):**

**Card 1: Engangs-donation til hjertesag** - TIER 2
- Border: 1px solid #EBEBEB
- CTA: brand-red link "Se aktive hjertesager →"

**Card 2: Fast månedlig støtte** - TIER 1 PRIMARY
- Border: 1.5px solid #E0193F + brand-shadow-md
- "Mest stabil støtte"-badge: brand-red bg
- Tier-options: 100/200/300/500 visible som chips
- CTA: brand-red bg button

**Card 3: Køb supporterprodukter** - TIER 2
- Border: 1px solid #EBEBEB
- CTA: brand-red link "Se supporterprodukter →"

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Tre måder at støtte på"

**Card 1: Engangs-donation til hjertesag**
- 80% direkte til foreningen
- Vælg en konkret kampagne der betyder noget for dig
- Få kvittering på email
- Ingen forpligtelse efterfølgende

**Card 2: Fast månedlig støtte (Mest stabil støtte)**
"Giv et fast beløb hver måned til én forening. Du kan ændre, pause eller stoppe det når som helst."
- 80% direkte til foreningen - hver måned
- Vælg dit niveau: 100, 200, 300 eller 500 kr./md.
- Stop når som helst

**Card 3: Køb supporterprodukter**
- 32,75% af overskuddet til foreningen
- Vis din støtte med t-shirts, hættetrøjer, accessories
- Vælg ved checkout: hvilken hjertesag støtter du?
- Print-on-demand - bæredygtig produktion

**Multi-engagement note (under cards):**
"Du kan støtte flere foreninger på forskellige måder. Fast månedlig støtte er til én forening ad gangen, men du kan altid give engangsstøtte eller købe supporterprodukter til andre foreninger."

**Word count:** ~220 ord

---

### **4. Gratis konto - derfor skal du oprette dig (NY i v1.1)**

**CMO-tilføjet - afdramatiserer konto-kravet positivt og tidligt.**

**Brand-tokens:**
- Background: hvid
- Card: tier-3 soft (#F9FAFB) centreret med tier-1 border-accent
- Icon: brand-red i red-tint container
- "Det tager under 1 minut"-emphasis: brand-red badge

**Motion:**
```
T+0.0s: Card scales in (0.92 → 1.0, spring)
T+0.3s: "Under 1 minut"-badge bounces in
T+0.5s: 4 benefits stagger reveal
```

**Content-spec:**

**Headline:** "Gratis konto - det tager under 1 minut"

**Body:** "Du bruger din konto til kvitteringer, fast støtte, historik og overblik. Det er gratis, og du kan altid slette den igen."

**4 benefits (kort liste):**
- Få kvittering på email
- Administrer fast støtte (pause/stop)
- Se al din støtte ét sted
- Følg din støtte over tid

**CTA:** "Opret konto nu" → `/opret-stoetter`

**Word count:** ~100 ord

---

### **5. Soft CTA**

(Uændret fra v1.0)

**Content-spec:**
**Headline:** "Find en sag du brænder for"
**Body:** "Se aktive hjertesager og find en forening du kan støtte."
**CTA:** "Se aktive hjertesager" → `/hjertesager`

**Word count:** ~30 ord

---

### **6. Følg din støtte over tid (omdøbt fra "Tier-system")**

**CMO-rettet i v1.1:**
- Sektion-titel ændret fra "Bliv en del af noget større"
- Tier-systemet omframet som "tak", ikke status
- "Rejse fra Bronze til Diamant" fjernet
- Metallic gradients NEDTONET kraftigt
- Beløbsgrænser flyttet ned i sekundær position

**Brand-tokens (CMO-rettet):**
- Background: hvid
- 5 tier-cards: NEUTRALE cards med små badges (IKKE store metallic kort)
- Cards bruger neutral palette (hvid + #EBEBEB border)
- Tier-badges: små subtile distinct elements
  - Bronze: neutral grey badge
  - Sølv: neutral light badge
  - Guld: warm subtle accent (gold tint)
  - Platin: light cool accent
  - Diamant: simple premium accent (ikke flashy)
- Brand-red bruges som CTA accent

**Motion (FORENKLET - ikke længere PINNED):**
```
T+0.0s: Headline + body fade-up
T+0.3s: 5 tier-cards arrange horizontally (cascade-in 0.1s stagger)
T+0.8s: Each tier-badge subtle activation (NO sparkle effects)
T+1.0s: Beløbs-info reveals as secondary text
```

**Content-spec (CMO v1.1):**

**Headline:** "Følg din støtte over tid"

**Subheadline:** "Din profil viser, hvor længe du har støttet, hvilke foreninger du har hjulpet, og hvordan din støtte vokser over tid. Tier og milestones er små markeringer - ikke en konkurrence."

**Lead text:** "Alt du støtter med, samles på din profil."

**5 tiers (forenklet):**

| Tier | Bidrag | Beskrivelse |
|---|---|---|
| Bronze | 0–499 kr. | Velkommen ombord |
| Sølv | 500–1.999 kr. | Du gør allerede en forskel |
| Guld | 2.000–4.999 kr. | Engageret støtter |
| Platin | 5.000–9.999 kr. | Top 10% af alle støtter |
| Diamant | 10.000+ kr. | Mest dedikerede støtter |

**Inkluderende statement:** "Alle beløb tæller. Uanset om du støtter med 25 kr., 100 kr. eller køber en T-shirt, bliver din støtte samlet på din profil."

**Insight box:** "Tier tæller alt - donationer, fast støtte og webshop-køb summeres."

**Word count:** ~200 ord

---

### **7. Små markeringer for din støtte (omdøbt fra "Streak + Milestones")**

**CMO-rettet i v1.1:**
- Sektion-titel ændret
- "Unlock badges", "Level up", "Boost impact" sprog UNDGÅS
- Tone er "varm og menneskelig", ikke fitness-app

**Brand-tokens:**
- Background: #F9FAFB
- 2-spalte: Streak (venstre) + Milestones (højre)
- Streak-visual: brand-red accent (subtil)
- Milestones: små brand-red badges

**Motion:**
```
T+0.0s: Header fade-up
T+0.3s: Streak-section reveals
        - Counter animates 0 → 12 (eksempel)
T+0.6s: Milestones reveals
        - Badges cascade in (subtle)
```

**Content-spec (CMO v1.1):**

**Headline:** "Små markeringer for din støtte"

**Subheadline:** "Når du støtter over tid, får du små badges på din profil. Det er ikke en konkurrence - det er bare en måde at gøre din støtte synlig for dig selv."

**Venstre: Måneder i træk**
"Vi tæller hvor mange måneder i træk du har støttet. 3 måneder, 6 måneder, 1 år - små markeringer der viser at du bliver ved med at bakke op."

**Højre: Milepæle, der viser din støtte over tid**
- Første støtte
- 3 måneder i træk
- 6 måneder i træk
- 1 år som støtter
- 2 år som støtter

**Word count:** ~140 ord

---

### **8. Profil-overblik (mockup)**

**CMO-rettet i v1.1:**
- PINNED scrollytelling FJERNET (for tung for B2C)
- Erstattet med almindelig stacked mockup på mobile
- Subtil 3D-effect på desktop, ingen pin

**Brand-tokens:**
- Background: hvid
- Mockup: hvid card med subtil brand-red accent (ikke glow)
- Sektor-farver vises i mockup-kontekst (donations-listen)

**Motion (FORENKLET v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Mockup slides in from below (NO pin)
        - Subtle 3D-perspective desktop
        - Stacked layout mobile
T+0.6s: Mockup interior elements stagger:
        - Avatar appears
        - Tier-badge fades in
        - Streak counter ticks up
        - Donation-list cascades
```

**Content-spec (CMO v1.1):**

**Headline:** "Alt samlet på din profil"

**Body:** "Din profil viser hele din støtte ét sted. Donationer, fast støtte, webshop-køb - alt sammen i overskuelig oversigt."

**Mockup eksempel-data:**
- Avatar med initialer
- "Sølv • 8 måneder i træk"
- Streak: 🔥 8
- Total givet: 1.450 kr.
- Aktivitetsfeed:
  - "Hjertesag: Renovering af klubhus" - 200 kr.
  - "Fast støtte til Hillerød BK" - 100 kr./md.
  - "Webshop: Hættetrøje med foreningens logo" - 250 kr.
- Progress til Guld: 550 kr. tilbage

**Word count:** ~160 ord

---

### **9. Sådan kommer du i gang (4 trin)**

**CMO-rettet i v1.1:**
- Konto-kravet er nu håndteret tidligere (sektion 4) - så her er det bare en del af flowet
- Tone: enkel, almindeligt sprog

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sådan kommer du i gang"

**4 trin:**

1. **Find en forening eller hjertesag**
   Browse på /hjertesager eller find direkte fra en forening du kender.

2. **Vælg hvordan du vil støtte**
   Engangs-donation, fast månedlig støtte, eller køb supporterprodukter.

3. **Opret din konto**
   Email + adgangskode. Tager under et minut.

4. **Du er i gang**
   Modtag kvittering, følg din støtte, øg din støtte over tid.

**Word count:** ~140 ord

---

### **10. Sikkerhed + verificerede foreninger**

**CMO-rettet i v1.1:**
- "PCI DSS Level 1" fjernet - flyttet til /sikkerhed
- "Ingen tvivlsomme aktører" omformuleret blødere

**Brand-tokens:**
- Background: hvid
- 4 trust-badges i 2x2 grid (tier-2 secondary)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Din sikkerhed er vores prioritet"

**4 trust-badges:**

🔒 **Sikker betaling**
"Betaling foregår med høj sikkerhed. Vi gemmer aldrig dine kortoplysninger."

✅ **Du har fuld kontrol**
"Eksportér eller slet din konto når som helst. Stop fast støtte instant."

🛡️ **Verificerede foreninger**
"Alle foreninger bliver kontrolleret, før de kan modtage støtte. Vi tjekker at foreningen er reel, og at oplysningerne stemmer."

📧 **Dokumenteret støtte**
"Kvittering på email kort efter. Komplet historik på din profil."

**CTA:** "Læs mere om sikkerhed" → `/sikkerhed`

**Word count:** ~130 ord

---

### **11. FAQ-snippet**

**CMO-rettet i v1.1:**
- FAQ 3 (hvor meget) omskrevet mere transparent
- FAQ 4 (§8A) omskrevet mere præcist
- FAQ 5 (betalingsmetoder) gjort generisk - MobilePay fjernet specifikt

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Ofte stillede spørgsmål"

**5 spørgsmål:**

1. **Hvad sker der, hvis jeg vil stoppe min faste støtte?**
   "Du kan stoppe med det samme på din profil. Ingen opsigelses-varsel."

2. **Kan jeg støtte flere foreninger samtidigt?**
   "Ja. Du kan donere engangs eller købe supporterprodukter til mange foreninger. Fast månedlig støtte er dog kun til én forening ad gangen."

3. **Hvor meget går til foreningen?**
   "Ved donationer og fast støtte går 80% til foreningen. Ved webshop-køb går 32,75% af overskuddet til den valgte hjertesag. Resten dækker drift, betalingsgebyrer og platformen bag."

4. **Får jeg skattefradrag?**
   "Det afhænger af, om foreningen selv er godkendt til §8A-fradrag. Det er ikke en standardfunktion ved lancering, men vil blive vist tydeligt, når det bliver relevant."

5. **Hvilke betalingsmetoder kan jeg bruge?**
   "Du kan betale med de betalingsmetoder, der vises ved checkout. De kan variere afhængigt af, hvordan du vælger at støtte."

**CTA:** "Se alle FAQ" → `/faq`

**Word count:** ~170 ord

---

### **12. Final CTA**

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Klar til at gøre en forskel?"
**Subheadline:** "Find en hjertesag eller giv fast månedlig støtte - og start din støtte til en forening, du tror på."
**Primary CTA:** "Find en forening at støtte" → `/hjertesager`
**Secondary CTA:** "Se hvordan fast støtte virker" → `/fast-stoette`
**Trust-statement:** "Gratis at oprette konto. 80% går direkte til foreningen ved donationer og fast støtte."

**Word count:** ~70 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Card-hierarki (uændret fra v1.0)

| Sektion | Tier | Note |
|---|---|---|
| 3.1 Engangs-donation | Tier 2 | Regular |
| 3.2 Fast månedlig støtte | **Tier 1** | "Mest stabil støtte" |
| 3.3 Webshop | Tier 2 | Regular |
| 4. Gratis konto | Tier 3 soft + Tier 1 accent | Showcase |
| 6. Tier-system | Neutral cards med små badges | Nedtonet metallic |
| 8. Profil-mockup | Showcase (ikke pinned) | Subtle 3D desktop only |
| 10. Trust-badges | Tier 2 | 2x2 grid |
| 11. FAQ | Tier 2 accordion | - |

## Motion-niveau JUSTERET v1.1

- Tier-system PINNED scrollytelling **FJERNET** (for tung for B2C)
- Profil-mockup PINNED **FJERNET** - erstattet med subtil 3D
- Metallic sparkle effects **FJERNET** fra Diamant-tier
- B2C skal være hurtigt og let - animations defer'es på mobil

## B2C-tone gennemgående

- Almindeligt sprog (ikke teknisk)
- "Lille" og "varm" framing for tier/milestones
- "Mest stabil støtte" i stedet for "Mest populær"
- Konto-kravet positivt (ikke som krav)

---

## Inter-page links (UDVIDET v1.1)

**Linker FRA `/stotter` TIL:**
- `/hjertesager` (Primary CTA + Soft CTA + Final CTA)
- `/fast-stoette` (Card 2 + Final CTA)
- `shop.stotmedhjerte.dk` (Card 3 - external)
- `/opret-stoetter` (Section 4 + Section 9)
- `/sikkerhed` (Section 10)
- `/faq` (Section 11)
- **`/saadan-virker-det`** (NY i v1.1 - for brugere der vil forstå modellen)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Ingen leverandør-mentions; MobilePay fjernet specifikt fra FAQ
- ✅ **Policy 2 - Begge målgrupper:** B2C-fokus; foreninger nævnt i kontekst
- ✅ **Policy 3 - MVP-tal master:** 80%/80%/32,75% korrekt; "32,75% af overskuddet" eksplicit
- ✅ **Policy 4 - Tone of voice:** Almindeligt sprog gennemgående; tekniske termer (PCI, "tier showcase", "impact") fjernet
- ✅ **Policy 5 - Visuel identitet:** Marketing palette + sektor-farver kun i mockup
- ✅ **Policy 6 - §8A:** "Kommer som mulighed senere" - korrekt formuleret

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 7 implementeret):**
1. ✅ Hero subheadline: "ikke til mellemmænd" fjernet, omformuleret menneskeligt
2. ✅ "80% direkte" forklaret med konkret transparens
3. ✅ Konto-krav flyttet op (sektion 4 - NY) som positiv besked
4. ✅ Tier-systemet nedtonet - ikke "peak visual moment"
5. ✅ Metallic gradients fjernet - neutrale cards med små badges
6. ✅ "Email-kvittering inden for 1 minut" → "kort efter"
7. ✅ MobilePay fjernet specifikt - generic FAQ-svar

**Stærke anbefalinger (CMO kategori B - alle 9 implementeret):**
1. ✅ Hero mere menneskelig (følelsesbåret headline)
2. ✅ Trust-først-struktur bekræftet
3. ✅ Sektion-rækkefølge justeret (konto-krav op)
4. ✅ "Mest populær" → "Mest stabil støtte"
5. ✅ Multi-engagement forklaret tydeligere
6. ✅ Tier som "tak" ikke status
7. ✅ Beløbsgrænser flyttet til sekundær position
8. ✅ PINNED scrollytelling fjernet
9. ✅ FAQ-svar omformuleret

**Forslag til overvejelse (CMO kategori C - implementeret hvor relevant):**
1. ✅ Word count justeret (~1,560 ord)
2. ✅ Hero på 60 ord bevaret
3. ✅ "Rejse" → "Følg din støtte over tid"
4. ✅ "Det tager under 1 minut" tilføjet (sektion 4)
5. ✅ "PCI DSS" sprog fjernet
6. ✅ "Se webshop" → "Se supporterprodukter"
7. ✅ Link til /saadan-virker-det tilføjet
8. ✅ Sektor-farver kun i mockup-kontekst
9. ✅ Milestones som "små og varme"

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 11 sektioner, ~1,590 ord, 8 Primary features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 7 kritiske + 9 stærke + 9 overvejelser. Mere menneskelig, mindre "loyalty-program". Konto-krav rykket op, tier-system nedtonet, metallic gradients fjernet, PINNED scrollytelling fjernet (for tung for B2C), FAQ-svar omformuleret. ~1,560 ord, 12 sektioner. **Klar til implementering.** |
