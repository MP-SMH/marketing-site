# Wireframe: `/faq` (FAQ)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.1
**Page-ID:** F1-21
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

(Uændret fra v1.0)

**Strategisk positionering:** Hub-side, ikke deep-dive. Korte + præcis svar med cross-links.

**MVP-ærlighed:** Pre-launch reality (2 foreninger, 2 hjertesager). Ingen volume-claims.

---

## Konverterings-mål

(Uændret fra v1.0)

---

## FAQ-struktur (CMO v1.1: 31 spørgsmål, 5 kategorier)

| Kategori | Spørgsmål | Audience |
|---|---|---|
| Om StøtMedHjerte | 4 | Begge |
| For foreninger | 8 (+1: kontaktperson) | B2B |
| For støtter | 9 (+2: flere foreninger, betalingsfejl) | B2C |
| Sikkerhed og data | 5 | Begge |
| Priser og fordeling | 6 (+1: webshop-fordeling) | Primært B2B |
| **Total** | **32** | |

---

## Sektion-rækkefølge

(Uændret fra v1.0 - 9 sektioner)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero (kompakt utility) | 60 | Subtle gradient |
| 2 | Søg + kategori-filter (sticky) | 80 | Hvid (sticky) |
| 3 | Vigtige spørgsmål at læse først | 240 | Hvid |
| 4 | Om StøtMedHjerte (4 q) | 240 | #F9FAFB |
| 5 | For foreninger (8 q) | 510 | Hvid |
| 6 | For støtter (9 q) | 540 | #F9FAFB |
| 7 | Sikkerhed og data (5 q) | 320 | Hvid |
| 8 | Priser og fordeling (6 q) | 380 | #F9FAFB |
| 9 | Stadig spørgsmål? | 100 | Dark gradient |
| **Total** | | **~2,470 ord** | |

---

## Brand-token anvendelse (CMO v1.1)

| Sektion | Ikon |
|---|---|
| Hero | (ingen - utility-side) |
| Søg | `Search` |
| Kategori-chips | `Users` (Foreninger), `Heart` (Støtter), `ShieldCheck` (Sikkerhed), `CreditCard` (Priser), `Eye` (Om StøtMedHjerte) |
| Accordion-cards | `ChevronRight` (rotates 90deg) |
| Cross-links | `ArrowRight` |
| CTAs | `ArrowRight` |

**CMO v1.1:** Emojis erstattet med lucide-react ikoner for professionel tone.

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero (kompakt utility)**

(Uændret fra v1.0)

**Word count:** ~60 ord

---

### **2. Søg + kategori-filter (sticky) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Emojis i kategori-chips erstattet med lucide-react ikoner
- Mobile sticky-behavior præciseret

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Mobile-behavior (CMO v1.1):**
- Søg øverst, chips som horisontal scroll
- Ikke permanent sticky efter brugeren begynder at læse
- Re-appears ved scroll-up

**Desktop-behavior:**
- Søg + chips sticky efter Hero

**Content-spec (CMO v1.1):**

**Søgefelt:**
- Placeholder: "Søg i FAQ..."

**Kategori-chips (5 stk, lucide-react ikoner):**
- `Eye` Om StøtMedHjerte
- `Users` For foreninger
- `Heart` For støtter
- `ShieldCheck` Sikkerhed og data
- `CreditCard` Priser og fordeling

**Word count:** ~80 ord

---

### **3. Vigtige spørgsmål at læse først (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Subheadline: "5 spørgsmål de fleste har" → "Start her, hvis du hurtigt vil forstå platformen, prisen og trygheden"
- Q5 (verificering): "KYC-tjek" → almindeligt sprog

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Vigtige spørgsmål at læse først"

**Subheadline:** "Start her, hvis du hurtigt vil forstå platformen, prisen og trygheden."

**5 vigtige spørgsmål:**

#### **Q1: Hvad er StøtMedHjerte?**
"StøtMedHjerte er en dansk fundraising-platform der hjælper foreninger med at modtage støtte og giver støttere en gennemsigtig måde at give på. 80% af donationer og fast støtte går til foreningen. Pre-launch starter vi med få verificerede foreninger og bygger videre sammen med dem."

→ Cross-link: "Læs hele historien" → `/om-os`

#### **Q2: Hvad koster det for foreninger?**
"Det er gratis at oprette og bruge platformen. Der er ingen oprettelsesgebyr og ingen månedlige gebyrer. Når der kommer støtte ind, fordeles beløbet efter en fast model: 80% til foreningen ved donationer og fast støtte. Ved webshop går 32,75% af nettoprofitten til den valgte hjertesag."

→ Cross-link: "Se priser og fordeling" → `/priser`

#### **Q3: Hvor mange procent af min donation går til foreningen?**
"80% af din donation går til foreningen ved engangsdonationer og fast støtte. Resten dækker betaling, drift, support og platformen bag. Ved webshop går 32,75% af nettoprofitten til den valgte hjertesag."

→ Cross-link: "Se hele økonomien" → `/priser`

#### **Q4: Skal jeg oprette en konto for at støtte?**
"Ja. Du skal have en gratis konto, så du kan få kvittering, se din støttehistorik, styre dine oplysninger og følge din støtte ét sted. Det tager under 1 minut."

→ Cross-link: "Læs om støttemuligheder" → `/stotter`

#### **Q5: Er foreningerne på StøtMedHjerte verificerede? (CMO v1.1)**
"Ja. Hver forening bliver kontrolleret, før den kan modtage støtte. Vi tjekker blandt andet CVR-oplysninger, ansvarlig kontaktperson og relevante basisdata. Du kan se godkendelsesstatus på foreningens profil."

→ Cross-link: "Læs om sikkerhed" → `/sikkerhed`

**Word count:** ~240 ord

---

### **4. Om StøtMedHjerte (4 q) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Q2 headline: "Hvad gør jer anderledes fra andre fundraising-platforme?" → "Hvad gør StøtMedHjerte anderledes?"
- Q2 svar: "ingen skjulte gebyrer" → "ingen skjulte platformstillæg"

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Kategori-headline:** "Om StøtMedHjerte"

#### **Q: Er StøtMedHjerte en ny platform?**
"Ja. StøtMedHjerte lancerer 18. juli 2026 som en helt ny dansk fundraising-platform. Vi starter med få verificerede foreninger og bygger videre sammen med dem fra launch og frem."

#### **Q: Hvad gør StøtMedHjerte anderledes? (CMO v1.1)**
"StøtMedHjerte samler støtteformer, verificering, dokumentation og afregningsgrundlag i én dansk platform. Foreninger får en klar fordeling - 80% til foreningen ved donationer og fast støtte, og ingen skjulte platformstillæg. Vi hjælper med Indsamlingsnævnet, GDPR og dokumentation, så foreningen ikke står alene med regler og frister."

→ Cross-link: "Læs vores mission" → `/om-os`

#### **Q: Hvem står bag StøtMedHjerte?**
"StøtMedHjerte er bygget af Mario Paunovic, solo-founder baseret i Hillerød. Han har baggrund i salg, forretningsudvikling, e-commerce, logistik og automatisering. Han bygger platformen, fordi fundraising for danske foreninger ofte er for tungt og uigennemsigtigt."

→ Cross-link: "Mød Mario" → `/om-os`

#### **Q: Er StøtMedHjerte en forening eller en velgørenhedsorganisation?**
"Nej. StøtMedHjerte er en dansk platform, der hjælper verificerede foreninger med at modtage støtte. Vi er ikke selv en forening eller velgørenhedsorganisation."

**Word count:** ~240 ord

---

### **5. For foreninger (8 q) (CMO-rettet + udvidet v1.1)**

**CMO-rettet i v1.1:**
- Q3: "auto-genererer" → "hjælper med struktureret tekstudkast"
- Q4: "print-on-demand" → "produceres efter bestilling"
- Q4: forklaring af Hjertesager vs Fast Støtte tilføjet
- Q5: udbetalingssvar mere præcist
- NY Q8: "Hvem i foreningen skal oprette profilen?"

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Kategori-headline:** "For foreninger"

#### **Q: Hvor lang tid tager det at komme i gang?**
"Typisk kan en forening være klar til at modtage støtte på platformen inden for 1-2 uger. Verificering tager normalt 1-3 hverdage, profiloprettelse 30-60 minutter, og Indsamlingsnævn-anmeldelsen afhænger af myndighedens svartid."

→ Cross-link: "Se hele processen" → `/saadan-virker-det`

#### **Q: Hvilke krav stilles til foreningen?**
"Foreningen skal have et gyldigt CVR-nummer, en ansvarlig kontaktperson der kan verificeres med MitID, og et lovligt formål. Vi kontrollerer CVR-oplysninger og relevante basisdata som en del af godkendelsen."

#### **Q: Hjælper I med Indsamlingsnævn-anmeldelsen? (CMO v1.1)**
"Vi hjælper med et struktureret tekstudkast til anmeldelsen, journalnummer-validering, frister, påmindelser og dokumentation. Foreningen er selv ansvarlig for selve anmeldelsen til Indsamlingsnævnet - vi gør arbejdet mere overskueligt."

→ Cross-link: "Læs deep-dive om Indsamlingsnævnet" → `/sikkerhed#indsamlingsnaevnet`

#### **Q: Hvilke støttekanaler kan vi bruge? (CMO v1.1)**
"Som udgangspunkt får alle godkendte foreninger adgang til Hjertesager og Fast Støtte. Webshop kan tilvælges, hvis det giver mening. Hjertesager bruges til konkrete formål (op til 5 aktive samtidigt), mens Fast Støtte giver løbende månedlig støtte til foreningen. Webshop-produkter produceres efter bestilling, så foreningen ikke skal købe lager ind på forhånd."

→ Cross-link: "Læs om kanaler" → `/foreninger`

#### **Q: Hvornår får vi pengene? (CMO v1.1)**
"Afregning sker efter den relevante udbetalingsperiode, som udgangspunkt pr. kalendermåned. Når afregningen er behandlet, går der typisk 1-3 bankdage, før pengene står på kontoen. I får afregningsbilag ved hver udbetaling."

→ Cross-link: "Se afregningsdetaljer" → `/priser`

#### **Q: Hvad sker der hvis vi vil forlade platformen?**
"I kan stoppe når som helst - dog efter mindst én udbetalingsperiode (så vi kan afregne korrekt for igangværende støtte). I kan få relevante foreningsdata og afregningsgrundlag udleveret i et brugbart format. Persondata og betalingsdata håndteres efter gældende regler."

#### **Q: Hvad hvis Indsamlingsnævnet afviser vores anmeldelse?**
"StøtMedHjerte kan ikke garantere godkendelse, men vi hjælper med struktureret tekstudkast og viser tydeligt, hvad foreningen selv skal sende ind. Hvis der kommer en afvisning, hjælper vi jer med at forstå næste skridt."

#### **Q: Hvem i foreningen skal oprette profilen? (NY v1.1)**
"Det bør være en ansvarlig person i foreningen - fx formand, kasserer eller en anden person med mandat til at oprette foreningen og håndtere oplysningerne. Personen skal kunne verificeres med MitID."

**Word count:** ~510 ord

---

### **6. For støtter (9 q) (CMO-rettet + udvidet v1.1)**

**CMO-rettet i v1.1:**
- Q1: minimum-donation tilføjet validering ("starter også ved 100 kr./md")
- Q2 (måder at støtte): "Bronze 100, Sølv 200..." FJERNET, beløb i klar tekst
- Q3 (anonymitet): "Anonymitet er ikke muligt for Webshop og Fast Støtte" → forklaret
- NY Q4: "Kan jeg støtte flere foreninger?"
- Q5: "Den næste auto-trækning sker bare ikke" → "fremtidige betalinger trækkes ikke"
- NY Q9: "Hvad sker der hvis en betaling fejler?"

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Kategori-headline:** "For støtter"

#### **Q: Hvad er minimum-donation? (CMO v1.1)**
"Minimumsbeløbet for engangsdonationer er 100 kr. Fast Støtte starter også ved 100 kr./md."

#### **Q: Hvilke måder kan jeg støtte på? (CMO v1.1)**
"Tre måder: (1) Engangsdonation til en specifik hjertesag, fra 100 kr. (2) Fast månedlig støtte til én forening - typisk 100, 200, 300 eller 500 kr./md. (3) Køb supporterprodukter fra foreningernes webshops."

→ Cross-link: "Læs om støttemuligheder" → `/stotter`

#### **Q: Kan jeg være anonym? (CMO v1.1)**
"Ved hjertesag-donationer vælger du selv, om navn og beløb må vises offentligt. Som standard vises din støtte anonymt. Ved Fast Støtte og webshop vises dine oplysninger ikke offentligt på samme måde, men de nødvendige oplysninger bruges til betaling, kvittering og dokumentation."

#### **Q: Kan jeg støtte flere foreninger? (NY v1.1)**
"Ja. Du kan give engangsdonationer og købe supporterprodukter til flere foreninger. Fast Støtte kan dog kun være aktiv for én forening ad gangen."

#### **Q: Hvordan får jeg kvittering?**
"Du modtager email-kvittering kort efter hver betaling. Du kan også se al din historik, alle kvitteringer og dine betalinger på dit støtteoverblik (din profil)."

#### **Q: Kan jeg stoppe min faste støtte? (CMO v1.1)**
"Ja. Du kan stoppe din Fast Støtte fra din profil. Der er ingen opsigelsesvarsel og ingen ekstra omkostninger. Når du stopper, bliver der ikke trukket flere betalinger fremadrettet."

→ Cross-link: "Læs om Fast Støtte" → `/fast-stoette`

#### **Q: Kan jeg få refunderet en donation?**
"Donationer er som udgangspunkt endelige, fordi pengene er givet som støtte til en forening eller hjertesag. Hvis der er sket en fejl, skal du kontakte os, så vi kan vurdere sagen konkret."

#### **Q: Får jeg skattefradrag for min donation?**
"Skattefradrag afhænger af, om den enkelte forening er §8A-godkendt af Skattestyrelsen. Det er ikke en standardfunktion ved lancering. Hvis fradrag er muligt, vil det fremgå tydeligt ved donationen."

#### **Q: Hvad sker der hvis en betaling fejler? (NY v1.1)**
"Du får besked og mulighed for at opdatere din betalingsmetode. Vi forsøger typisk igen efter et par dage. Foreningen modtager først beløbet, når betalingen er gennemført."

**Word count:** ~540 ord

---

### **7. Sikkerhed og data (5 q) (CMO-rettet v1.1)**

**CMO-rettet i v1.1:**
- Q1: PCI DSS forklaret med almindeligt sprog først, derefter teknisk reference
- Q5 (konkurs): "adskilte" fjernet (juridisk forsigtigere)

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Kategori-headline:** "Sikkerhed og data"

#### **Q: Er det sikkert at betale på StøtMedHjerte? (CMO v1.1)**
"Ja. Betalinger håndteres sikkert via en certificeret betalingspartner, og StøtMedHjerte gemmer ikke dine kortoplysninger. Betalingsflowet følger relevante sikkerhedsstandarder, herunder PCI DSS Level 1 hos betalingspartneren og 3D Secure, hvor det er relevant."

→ Cross-link: "Læs om sikkerhed" → `/sikkerhed`

#### **Q: Hvor opbevares mine data?**
"Persondata opbevares som udgangspunkt i EU/EØS. Hvis der sker overførsel uden for EU/EØS, sker det kun på lovligt overførselsgrundlag og med relevante sikkerhedsforanstaltninger."

#### **Q: Hvor længe gemmer I mine data?**
"Regnskabs- og transaktionsdata opbevares som udgangspunkt i op til 5 år, når det er nødvendigt af hensyn til bogføring, dokumentation og juridiske forpligtelser. Øvrige persondata slettes eller anonymiseres, når der ikke længere er et sagligt formål."

#### **Q: Hvilke GDPR-rettigheder har jeg?**
"Du har ret til indsigt, berigtigelse, sletning, dataportabilitet, indsigelse og klage. Du kan kontakte os om dine rettigheder, eller klage til Datatilsynet hvis sagen handler om persondata."

→ Cross-link: "Læs om GDPR" → `/sikkerhed#gdpr`

#### **Q: Hvad sker der hvis StøtMedHjerte går konkurs? (CMO v1.1)**
"Vi arbejder med betalings- og afregningsflows, hvor støttebeløb kan spores fra betaling til afregning. Hvis der opstår en ekstraordinær situation, vil berørte foreninger og støttere blive informeret direkte, og relevante data og afregningsgrundlag vil blive dokumenteret."

**Word count:** ~320 ord

---

### **8. Priser og fordeling (6 q) (CMO-rettet + udvidet v1.1)**

**CMO-rettet i v1.1:**
- NY Q3: "Hvordan fungerer støtte via webshop?"
- Q5 (priser kan ændre): "90 dage" gjort conditional (kun hvis juridisk besluttet)

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Kategori-headline:** "Priser og fordeling"

#### **Q: Er der oprettelsesgebyr for foreninger?**
"Nej. Det er gratis at oprette og bruge platformen. Der er ingen oprettelsesgebyr og ingen månedlige gebyrer."

#### **Q: Hvordan fordeles pengene præcist?**
"Ved donationer og fast støtte: 80% til foreningen, 20% dækker betaling, drift, support, dokumentation og platformen bag. Ved webshop: 32,75% af nettoprofitten til den valgte hjertesag, resten dækker produktion, betaling, drift, returhåndtering og platformen bag."

→ Cross-link: "Se priser og fordeling" → `/priser`

#### **Q: Hvordan fungerer støtte via webshop? (NY v1.1)**
"Når du køber supporterprodukter, går 32,75% af nettoprofitten til den valgte hjertesag. Nettoprofit betyder beløbet efter moms og direkte omkostninger som produkt, tryk, betaling og håndtering."

→ Cross-link: "Se webshop-økonomi" → `/priser#webshop`

#### **Q: Er der binding for foreninger?**
"Nej. Foreninger kan stoppe når som helst - dog efter mindst én udbetalingsperiode (så vi kan afregne korrekt). Ingen binding, intet opsigelsesgebyr."

#### **Q: Får vi rabat hvis vi har mange støttere?**
"Nej. Alle foreninger har samme fordelingsmodel. Det sikrer fair behandling og holder regnskabet enkelt for alle."

#### **Q: Kan priserne ændre sig? (CMO v1.1)**
"Hvis priser eller fordelingsmodel ændres i fremtiden, varsler vi det tydeligt og i god tid, så foreningen kan tage stilling, før ændringen træder i kraft."

**Word count:** ~380 ord

---

### **9. Stadig spørgsmål?**

(Uændret fra v1.0)

**Word count:** ~100 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

(Uændret fra v1.0 + emojis erstattet med ikoner)

---

## Inter-page links

(Uændret fra v1.0)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** "Hvad gør StøtMedHjerte anderledes" (uden konkurrent-reference)
- ✅ **Policy 2 - Begge målgrupper:** Separate kategorier
- ✅ **Policy 3 - MVP-tal master:** "80% ved donationer og fast støtte" + "32,75% af nettoprofitten" konsekvent
- ✅ **Policy 4 - Tone of voice:** "KYC", "auto-genererer", "print-on-demand", "auto-trækning" oversat
- ✅ **Policy 5 - Brand-konsistens:** "StøtMedHjerte" konsekvent, lucide-react ikoner (emojis fjernet)
- ✅ **Policy 6 - §8A:** Korrekt conditional formulering

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 7 implementeret):**
1. ✅ Bronze/Sølv/Guld/Platin fjernet fra Fast Støtte-svar
2. ✅ "KYC-tjek" → "kontrolleret/tjekker"
3. ✅ "Auto-genererer" → "hjælper med struktureret tekstudkast"
4. ✅ "Print-on-demand" → "produceres efter bestilling"
5. ✅ Udbetalingssvar mere præcist
6. ✅ Konkurs-svar juridisk forsigtigere ("adskilte" fjernet)
7. ✅ "90 dage" gjort conditional

**Stærke anbefalinger (CMO kategori B - alle 11 implementeret):**
1. ✅ Hub-strategi bekræftet
2. ✅ Vigtige spørgsmål-subheadline omformuleret
3. ✅ Webshop-kategori spørgsmål tilføjet (Priser Q3)
4. ✅ For foreninger Q4 forklarer Hjertesager vs Fast Støtte
5. ✅ Minimum-donation valideret
6. ✅ Anonymitet-svar forklarende
7. ✅ "Auto-trækning" → "fremtidige betalinger"
8. ✅ PCI DSS forklaret med almindeligt sprog først
9. ✅ NY Q: "Kan jeg støtte flere foreninger?"
10. ✅ NY Q: "Hvad sker der hvis betaling fejler?"
11. ✅ NY Q: "Hvem i foreningen skal oprette profilen?"

**Forslag til overvejelse (CMO kategori C - implementeret):**
1. ✅ Søg + chips bekræftet
2. ✅ Mobile sticky-behavior præciseret
3. ✅ Cross-links: max 1 pr. svar
4. ✅ "Andre fundraising-platforme" → "Hvad gør StøtMedHjerte anderledes"
5. ✅ "Ingen skjulte gebyrer" → "ingen skjulte platformstillæg"
6. ✅ "Hurtigst muligt" final CTA bekræftet
7. ✅ Word count justeret (~2,470 ord, 32 spørgsmål)

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 9 sektioner, ~2,260 ord, 28 spørgsmål i 5 kategorier |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 7 kritiske + 11 stærke + 7 overvejelser. 4 nye spørgsmål tilføjet (webshop-fordeling, flere foreninger, betalingsfejl, kontaktperson). Tekniske termer oversat (KYC, auto-genererer, print-on-demand). Bronze/Sølv/Guld/Platin fjernet. Emojis → ikoner. ~2,470 ord, 32 spørgsmål. **Klar til implementering.** |
