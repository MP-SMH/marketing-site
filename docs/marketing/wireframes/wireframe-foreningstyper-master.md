# Wireframe: Forenings-type pages (Master Template)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt master template - gælder for alle 40+ forenings-type-pages
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-IDs:** F1-30 til F1-69 (40+ sider)
**URL-pattern:** `/foreninger/{slug}` (CMO v1.1: skiftet fra `/foreningstyper/{slug}`)
**Review:** ChatGPT-CMO 5. maj 2026 (via Project)

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** SEO-trafik fra Google ("fundraising fodboldklub", "støtte til håndboldklub", "kor økonomi") lander på relevant side.

**MVP-realitet:** Pre-launch ingen aktive foreninger fra hver type - eksempler er konceptuelle.

---

## CMO v1.1: 3 layout-varianter

**CMO-tilføjet:** Master template har 3 layout-varianter med samme struktur men forskellig vægtning i sektion 2, 3 og FAQ.

| Variant | Forenings-typer | Fokus |
|---|---|---|
| **A - Sport og fritid** | Fodbold, Håndbold, Gymnastik, Svømning, Tennis, Atletik, Cykel, Kampsport, Volleyball, Basketball, Badminton, Løb, Dans, E-sport | Udstyr, ture, ungdomshold, forældre, klubhus |
| **B - Kultur, lokal og fællesskab** | Kor, Teater, Musik, Orkester, Billedkunst, Film/Medie, Kulturforening, Lokal/Borger, Medborgerhus, Havelaug, Alumni, Iværksætter, Brætspil, Politisk ungdom, Børne-/ungdomsorg., Natur/Friluft, Outdoor, Jagt/Fiske | Arrangementer, lokaler, materialer, lokalt fællesskab, synlighed |
| **C - Velgørenhed, sundhed og NGO** | Humanitær, Patient/Sundhed, Handicap/Special, Dyrebeskyttelse, Velgørende, NGO, Organisation | Tillid, dokumentation, compliance, gennemsigtighed, faste støtter |

**Strukturen er identisk** - kun copy-vægtning og eksempler ændres per variant.

---

## Master sektion-rækkefølge (identisk for alle)

| # | Sektion | Ord | Background | Variable per type |
|---|---|---|---|---|
| 1 | Hero - type-specifik (SEO-H1) | 100 | Subtle gradient | H1, subheadline, ikon |
| 2 | Vi forstår jeres hverdag | 200 | Hvid | Type-specifikke pain-points + intro |
| 3 | Hvad jeres forening kan samle ind til | 240 | #F9FAFB | 4 inkluderende eksempler |
| 3.5 | **Mid-page CTA (NY v1.1)** | 60 | Hvid | Generic |
| 4 | Sådan fungerer det | 200 | #F9FAFB | Generic |
| 5 | Hvad får jeres forening? (CMO v1.1: type-specifik body) | 240 | Hvid | Type-specifikke feature-bodies |
| 6 | Almindelige spørgsmål | 280 | #F9FAFB | 4 spørgsmål - 1 generic + 3 type-specifikke |
| 7 | Final CTA | 100 | Dark gradient | Generic |
| **Total per side** | | **~1,420 ord** | | |

---

## Variable-skema (CMO v1.1: udvidet til 28 felter)

**CMO v1.1:** Skema udvidet fra 18 → 28 felter for at undgå tyndt/duplikeret SEO-indhold.

### Identifikation (3 felter)
| Variable | Type | Eksempel |
|---|---|---|
| `forenings_type_slug` | string | `fodboldklub` |
| `forenings_type_label` | string | `Fodboldklub` |
| `forenings_type_plural` | string | `Fodboldklubber` |

### Layout-variant (1 felt - NY v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `layout_variant` | enum | `A` (Sport), `B` (Kultur/Lokal), `C` (Velgørenhed/NGO) |

### SEO (4 felter - udvidet i v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `seo_primary_keyword` | string | `fundraising til fodboldklub` |
| `seo_secondary_keywords` | array | `["klubkasse", "ungdomsfodbold", "støtte til fodbold"]` |
| `meta_description` | string | "Fundraising til fodboldklubber uden lager og frivillig-bøvl. Få donationer, Fast Støtte, webshop og hjælp til dokumentation. Gratis opstart." |
| `html_title` | string | "Fundraising til fodboldklub - gratis opstart \| StøtMedHjerte" |

### Hero (3 felter)
| Variable | Type | Eksempel |
|---|---|---|
| `hero_h1` | string | "Fundraising til fodboldklubber - uden frivillig-bøvl" |
| `hero_subheadline` | string | "StøtMedHjerte hjælper danske fodboldklubber med at tjene penge til klubkassen via donationer, Fast Støtte og webshop - med dokumenteret afregning og hjælp til Indsamlingsnævnet." |
| `hero_ikon` | lucide | `Users` |

### Sektion 2 - Vi forstår (4 felter - udvidet i v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `type_specific_intro` | string | "I fodboldklubber bruger I tid på det vigtige - træning, kampe, fællesskab. Men hverdagen kræver også, at økonomien hænger sammen. Vi kender mønsteret:" |
| `pain_point_1` | string | "Manuelt salg af lodder ved kampe og stævner" |
| `pain_point_2` | string | "Sponsorjagt der tager tid fra trænere og bestyrelse" |
| `pain_point_3` | string | "Forældre-frustration over kageboder og kontant-håndtering" |

### Sektion 3 - Eksempler (5 felter - udvidet i v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `example_intro_sentence` | string | "Det behøver ikke være stort for at give mening. I bestemmer selv beløb, periode og formål." |
| `eksempel_1` | string | "Nye trøjer og træningstøj til holdene" |
| `eksempel_2` | string | "Udstyr til træning og kamp" |
| `eksempel_3` | string | "Stævner, ture og sociale aktiviteter" |
| `eksempel_4` | string | "Klubhus, omklædning og faciliteter" |

### Sektion 5 - Channel-fit (3 felter - NY v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `channel_fit_donation` | string | "Når medlemmer, forældre eller lokale støtter giver en donation eller opretter Fast Støtte, går 80% til jeres fodboldklub." |
| `channel_fit_fast_stoette` | string | "Faste månedlige støtter giver klubben stabil indtægt - ofte fra forældre, gamle medlemmer eller lokale virksomheder." |
| `channel_fit_webshop` | string | "Supporterprodukter produceres først, når de bliver bestilt. Derfor skal klubben ikke købe trøjer, hoodies eller andet ind på forhånd." |

### Sektion 6 - FAQ (6 felter - udvidet i v1.1: 3 type-specifikke spørgsmål)
| Variable | Type | Eksempel |
|---|---|---|
| `faq_specifik_q1` | string | "Hjælper det også for mindre fodboldklubber?" |
| `faq_specifik_a1` | string | "Ja. Modellen virker for alle størrelser klubber..." |
| `faq_specifik_q2` | string | "Kan vi kombinere det med vores eksisterende sponsoraftaler?" |
| `faq_specifik_a2` | string | "Ja. StøtMedHjerte er et supplement..." |
| `faq_specifik_q3` | string | "Kan både ungdoms- og seniorhold få glæde af det?" |
| `faq_specifik_a3` | string | "Ja. I kan opdele hjertesager efter afdeling..." |

### Cross-linking (1 felt - NY v1.1)
| Variable | Type | Eksempel |
|---|---|---|
| `related_types` | array | `["haandboldklub", "gymnastikforening", "svoemmeklub", "tennisklub", "volleyballklub", "atletikforening"]` |

**Total: 27 unique felter** (variable-skema udvidet fra 18 → 27 for mere unikt content per side).

### Drift-felter (CMO v1.1: NY indhold-matrix)

| Felt | Eksempel |
|---|---|
| `priority` | `P1` (pre-launch), `P2` (post-launch), `P3` (later) |
| `status` | `draft`, `reviewed`, `ready`, `live` |
| `last_reviewed` | `2026-05-06` |
| `canonical_url` | `/foreninger/fodboldklub` |
| `noindex_prelaunch` | `true` / `false` |
| `owner` | `Mario` / `ekstern` |

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- H1 brug "fundraising" som SEO-keyword (ikke "tjen penge")
- Subheadline mere handlings-orienteret med kanaler
- "Ingen binding" → "Ingen faste månedlige gebyrer" (mere præcis)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

- **H1:** `{hero_h1}` (eksempel: "Fundraising til fodboldklubber - uden frivillig-bøvl")
- **Subheadline:** `{hero_subheadline}` (mere handlings-orienteret med kanaler)

- **Trust-row (3 badges - CMO v1.1):**
  - `Heart` - 80% til foreningen ved donationer og fast støtte
  - `ShieldCheck` - Verificering og hjælp til Indsamlingsnævnet
  - `Eye` - **Gratis opstart og ingen faste månedlige gebyrer** (CMO v1.1)

- **Primary CTA:** "Læs mere for foreninger" → `/foreninger`
- **Secondary CTA:** "Book et gratis møde" → `/book-moede`

**Word count:** ~100 ord

---

### **2. Vi forstår jeres hverdag (CMO-udvidet v1.1)**

**CMO-rettet i v1.1:**
- Intro variable (`type_specific_intro`) tilføjet - gør sektion mere unik per side
- "Det behøver ikke være stort"-statement tilføjet i closing (afvæbner bekymring tidligt)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Vi forstår jeres hverdag"

**Body (intro):** `{type_specific_intro}`

**3 pain-points:**
- ❌ `{pain_point_1}`
- ❌ `{pain_point_2}`
- ❌ `{pain_point_3}`

**Closing (CMO v1.1):** "StøtMedHjerte er bygget til at lette det her - uden at tage tid fra det, der betyder noget. **Det behøver ikke være stort for at give mening. Mange foreninger kan starte med én konkret hjertesag og bygge videre, når de er klar.**"

**Word count:** ~200 ord

---

### **3. Hvad jeres forening kan samle ind til (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Mere inkluderende formulering (ikke kun ungdomshold)
- Eksempel-intro variable tilføjet

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvad jeres `{forenings_type_label}` kan samle ind til"

**Subheadline:** `{example_intro_sentence}` (eksempel: "Det behøver ikke være stort for at give mening. I bestemmer selv beløb, periode og formål.")

**4 eksempel-cards (CMO v1.1: bredere/mere inkluderende):**

| Card | Indhold |
|---|---|
| 1 | `{eksempel_1}` (eksempel: "Nye trøjer og træningstøj til holdene") |
| 2 | `{eksempel_2}` (eksempel: "Udstyr til træning og kamp") |
| 3 | `{eksempel_3}` (eksempel: "Stævner, ture og sociale aktiviteter") |
| 4 | `{eksempel_4}` (eksempel: "Klubhus, omklædning og faciliteter") |

**Note:** "I kan have op til 5 aktive hjertesager samtidigt. I bestemmer selv beløb, periode og formål."

**Word count:** ~240 ord

---

### **3.5. Mid-page CTA (NY v1.1)**

**CMO-tilføjet - øger konvertering uden at gøre siden tung.**

**Brand-tokens:**
- Background: hvid
- Tier-3 soft card centreret med brand-red border-left

**Motion:**
```
T+0.0s: Card fade-up når den scrolles forbi
```

**Content-spec:**

**Headline:** "Vil du se, hvordan det kan se ud for jeres forening?"

**Body:** "Book et gratis 30-minutters møde, så gennemgår vi mulighederne uden forpligtelse."

**CTA:** "Book et gratis møde" → `/book-moede`

**Word count:** ~60 ord

---

### **4. Sådan fungerer det (GENERIC - uændret fra v1.0)**

(Uændret fra v1.0)

**Word count:** ~200 ord

---

### **5. Hvad får jeres forening? (CMO-RETTET v1.1: type-specifik body)**

**CMO-rettet i v1.1:**
- Body på hver feature er nu type-specifik via channel-fit variabler
- Headlines forbliver generic, men body adapter til type

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Hvad får jeres `{forenings_type}`?"

**4 features (CMO v1.1: type-specifik body):**

#### **80% til foreningen** (Ikon: `Heart`)
**Body:** `{channel_fit_donation}` (eksempel Fodbold: "Når medlemmer, forældre eller lokale støtter giver en donation eller opretter Fast Støtte, går 80% til jeres fodboldklub.")

#### **Compliance og dokumentation** (Ikon: `ShieldCheck`)
**Body:** "I får hjælp til dokumentation, afregningsbilag og Indsamlingsnævnet, så bestyrelsen ikke skal sidde alene med det praktiske."

#### **Ingen lager eller risiko** (Ikon: `ShoppingBag` - CMO v1.1: erstatter Package)
**Body:** `{channel_fit_webshop}` (eksempel Fodbold: "Supporterprodukter produceres først, når de bliver bestilt. Derfor skal klubben ikke købe trøjer, hoodies eller andet ind på forhånd.")

#### **Personlig kontakt** (Ikon: `MessageCircle`)
**Body:** "I opstartsfasen hjælper vi jer tæt gennem opsætning, så `{forenings_type_label}` kan fokusere på det vigtige."

**Word count:** ~240 ord

---

### **6. Almindelige spørgsmål (CMO-udvidet v1.1: 1 generic + 3 type-specifikke)**

**CMO-rettet i v1.1:**
- 3 type-specifikke spørgsmål (var 2)
- Kun Q1 forbliver generic (om priser)

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Almindelige spørgsmål fra `{forenings_type_plural}`"

**4 spørgsmål:**

#### **Q1 (GENERIC): Hvad koster det?**
"Det er gratis at oprette og bruge platformen. Der er ingen oprettelsesgebyr og ingen månedlige gebyrer. Når der kommer støtte ind, fordeles beløbet efter en fast model: 80% til foreningen ved donationer og fast støtte."

→ Cross-link: "Se priser og fordeling" → `/priser`

#### **Q2 (TYPE-SPECIFIKT): `{faq_specifik_q1}`**
"`{faq_specifik_a1}`"

#### **Q3 (TYPE-SPECIFIKT): `{faq_specifik_q2}`**
"`{faq_specifik_a2}`"

#### **Q4 (TYPE-SPECIFIKT): `{faq_specifik_q3}`** *(NY v1.1)*
"`{faq_specifik_a3}`"

**CTA:** "Se alle FAQ" → `/faq`

**Word count:** ~280 ord

---

### **7. Final CTA (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Trust-statement: "uanset type, størrelse eller formål" → "på tværs af typer, størrelser og lokale fællesskaber"

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Klar til at gøre det nemmere for jeres forening?"

**Subheadline:** "I tilmelder jer gratis. Vi hjælper med opsætning, verificering og dokumentation."

**Primary CTA:** "Læs mere for foreninger" → `/foreninger`
**Secondary CTA:** "Book et gratis møde" → `/book-moede`

**Trust-statement (CMO v1.1):** "Bygget til danske foreninger på tværs af typer, størrelser og lokale fællesskaber."

**Word count:** ~100 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

(Uændret fra v1.0)

---

## SEO-specifikation (CMO-rettet v1.1)

**For hver forenings-type page:**

| Element | Format | Eksempel (Fodboldklub) |
|---|---|---|
| **URL** | `/foreninger/{slug}` (CMO v1.1) | `/foreninger/fodboldklub` |
| **HTML title** | "Fundraising til {type} - gratis opstart \| StøtMedHjerte" (CMO v1.1) | "Fundraising til fodboldklub - gratis opstart \| StøtMedHjerte" |
| **Meta description** | 150-160 chars, handlings-orienteret (CMO v1.1) | "Fundraising til fodboldklubber uden lager og frivillig-bøvl. Få donationer, Fast Støtte, webshop og hjælp til dokumentation. Gratis opstart." |
| **H1** | `{hero_h1}` med "fundraising"-keyword | "Fundraising til fodboldklubber - uden frivillig-bøvl" |
| **OG image** | 1200x628 | (foreningens-type illustration) |

**Schema.org (CMO-rettet v1.1):**
- ❌ ~~LocalBusiness~~ (var i v1.0 - fjernet)
- ✅ **WebPage** (selve landingssiden)
- ✅ **Service** (StøtMedHjertes løsning)
- ✅ **FAQPage** (de 4 FAQ-spørgsmål)
- ✅ **BreadcrumbList** (`/foreninger` → `/foreninger/fodboldklub`)

**Cross-typer linking (CMO v1.1):**
- Brug `{related_types}` array (kurateret per side)
- Fallback: kategori-baseret automatisk linking
- Footer: link til `/foreninger` oversigt

---

## Inter-page links (CMO v1.1: opdateret URL-pattern)

**Linker FRA `/foreninger/{slug}` TIL:**
- `/foreninger` (Hero CTA + Final CTA - primary B2B-konvertering)
- `/book-moede` (Hero CTA + Mid-page CTA + Final CTA)
- `/saadan-virker-det` (Sektion 4 CTA)
- `/priser` (FAQ Q1 cross-link)
- `/faq` (Sektion 6 CTA)

**Linker TIL `/foreninger/{slug}` FRA:**
- `/foreninger` (relaterede forenings-typer i sidebar/footer)
- Cross-typer linking fra andre forenings-type-pages

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Ingen leverandør-mentions
- ✅ **Policy 2 - Begge målgrupper:** Primært B2B (forenings-type-pages er B2B-konvertering)
- ✅ **Policy 3 - MVP-tal master:** "80% ved donationer og fast støtte" + "32,75% af nettoprofitten" konsekvent
- ✅ **Policy 4 - Tone of voice:** Konkret og inkluderende
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, lucide-react ikoner (ShoppingBag → Package erstatning)
- ✅ **Policy 6 - §8A:** Ikke nævnt (passende)

**MVP-realitets check:**
- ✅ "Det behøver ikke være stort"-statement tidlig
- ✅ "Mange foreninger kan starte med én konkret hjertesag"
- ✅ "Ingen binding" → "Ingen faste månedlige gebyrer" (præcis)

---

## Roll-out strategi (CMO-rettet v1.1: 8 sider - ikke 10+)

**CMO v1.1:** Pre-launch fokus på 8 stærke sider, ikke 20 halvflade.

### Pre-launch (P1 - 8 sider)
1. **Fodboldklub** (Variant A - Sport)
2. **Håndboldklub** (Variant A - Sport)
3. **Gymnastikforening** (Variant A - Sport)
4. **Svømmeklub** (Variant A - Sport)
5. **Børne- og ungdomsorganisation / Spejder** (Variant B - Kultur/Lokal)
6. **Kor / Sangforening** (Variant B - Kultur/Lokal)
7. **Lokal / Borgerforening** (Variant B - Kultur/Lokal)
8. **Velgørende organisation** (Variant C - Velgørenhed)

**Dækker:** Sport (4), Kultur (2), Lokal (1), Velgørenhed (1) - bred dækning af variant A/B/C.

### Post-launch (P2 - 30+ sider)
- Resterende typer udfyldes løbende (1-2/dag)
- Performance-tracking på Search Console - prioriter typer med høj impressions

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 4 implementeret):**
1. ✅ URL: `/foreningstyper/{slug}` → `/foreninger/{slug}` (B2B-hub kobling)
2. ✅ Schema.org: LocalBusiness fjernet - WebPage + Service + FAQPage + BreadcrumbList
3. ✅ Variable-skema udvidet 18 → 27 felter (mere unikt content per side)
4. ✅ H1 SEO-keyword: "Tjen penge" → "Fundraising" (mere SEO-direkte)

**Stærke anbefalinger (CMO kategori B - alle 5 implementeret):**
1. ✅ 3 layout-varianter (A: Sport, B: Kultur/Lokal, C: Velgørenhed/NGO)
2. ✅ Sektion 5 type-specifik body (channel-fit variabler)
3. ✅ NY mid-page CTA (sektion 3.5) efter eksempler
4. ✅ Cross-typer linking kurateret via `related_types` array
5. ✅ Eksempler mere inkluderende (ikke kun ungdomshold)

**Forslag til overvejelse (CMO kategori C - alle 6 implementeret):**
1. ✅ "Det behøver ikke være stort"-statement tidlig (sektion 2 closing)
2. ✅ HTML title-formel: "Fundraising til {type} - gratis opstart"
3. ✅ Meta description mere handlings-orienteret
4. ✅ Roll-out: 8 sider pre-launch (var 5-10)
5. ✅ Drift-felter tilføjet til content-matrix (priority, status, owner, etc.)
6. ✅ FAQ udvidet 2 → 3 type-specifikke spørgsmål

**Compliance-justeringer (CMO kategori D):**
- ✅ "Package" → "ShoppingBag" (matcher BRAND-TOKENS webshop-kontekst)
- ✅ "Ingen binding" → "Ingen faste månedlige gebyrer" (præcis)
- ✅ "Uanset type, størrelse eller formål" → "på tværs af typer, størrelser og lokale fællesskaber" (mindre absolut)

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial master template - 7 sektioner, ~1,300 ord per side. Variable-skema med 18 felter |
| 1.1 | 5. maj 2026 | CMO-review (via Project): 4 kritiske + 5 stærke + 6 overvejelser + 3 compliance. URL `/foreningstyper/` → `/foreninger/`. Schema.org: WebPage + Service + FAQPage + BreadcrumbList. Variable-skema 18 → 27 felter. H1 SEO-keyword: "fundraising". 3 layout-varianter (A/B/C). NY mid-page CTA. Sektion 5 type-specifik body. Eksempler mere inkluderende. Roll-out: 8 sider pre-launch. ~1,420 ord per side. **Klar til implementering.** |
