# Wireframe: `/sikkerhed` (Compliance Hub)

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** CMO-godkendt v1.1, klar til implementering
**Reference:** PLATFORM-DEEP-DIVE.md v1.1, FEATURE-MAPPING.md v1.0, BRAND-TOKENS.md v1.0
**Page-ID:** F1-19 (NY side)
**Review:** ChatGPT-CMO 5. maj 2026

---

## Page-formål

**Compliance- og trust-hub.** Den side man peger på når nogen spørger "Hvor sikkert er det egentlig?". Skal:

1. Levere komplet compliance-dokumentation uden tech-stack-leverandører
2. Demonstrere StøtMedHjerte's tekniske + juridiske grundighed med ærlige formuleringer
3. Konvertere skeptiske besøgende (B2B + B2C) til tryghed
4. Være den sikre reference for både foreninger og støtter

**Strategisk positionering:** Trust-deep-dive-siden. Skal føles som **"Vi har styr på det - og vi forklarer det ærligt"**, ikke "Alt er fuldautomatisk og garanteret".

**Primær audience:** Begge målgrupper - B2B (compliance-tjek) + B2C (sikkerhedsbekymringer)
**Sekundær audience:** Investorer, partnere, journalister der vil verificere claims

---

## Konverterings-mål

(Uændret fra v1.0)

---

## Features mappet til siden

(Uændret fra v1.0 - alle 10 Primary features dækket)

---

## Sektion-rækkefølge (uændret fra v1.0)

| # | Sektion | Ord | Background |
|---|---|---|---|
| 1 | Hero | 70 | Dark gradient + orbs |
| 2 | Sikkerhed i tre lag | 130 | Hvid |
| 3 | Verificering af foreninger | 220 | #F9FAFB |
| 4 | Indsamlingsnævnet - overblik og dokumentation | 230 | Hvid |
| 5 | GDPR og databeskyttelse | 230 | #F9FAFB |
| 6 | Sikker betaling | 200 | Hvid |
| 7 | Audit-trail og dokumentation | 170 | #F9FAFB |
| 8 | EU-hosting og infrastruktur | 140 | Hvid |
| 9 | Relevante myndigheder og ansvar | 180 | #F9FAFB |
| 10 | Compliance-FAQ | 240 | Hvid |
| 11 | Final CTA | 80 | Dark gradient |
| **Total** | | **~1,890 ord** | |

---

# 🎨 BRAND-TOKEN ANVENDELSE

(Uændret fra v1.0 - Marketing palette + reduceret motion på compliance-side)

**CMO-justering v1.1:** Motion-niveauet reduceres yderligere. Trust > wow-effekt.

---

## Sektion-detaljer (med CMO-rettelser)

### **1. Hero** - "Sikkerhed bygget ind i fundamentet"

**CMO-rettet i v1.1:**
- Subheadline mere brugerforståelig (mindre "platformsarkitektur")
- Trust-row: PCI DSS Level 1 fjernet (for teknisk for hero); "GDPR-compliant" → "GDPR og databeskyttelse"

**Brand-tokens:** (uændret fra v1.0)

**Motion (REDUCERET v1.1):**
```
T+0.0s: Background orbs fade in (subtle)
T+0.2s: H1 reveals word-by-word
T+0.6s: Subheadline fade-up
T+0.9s: Trust-badges stagger reveal (subtle)
T+1.0s: Compliance-mockup slides in from right (no 3D tilt)
```

**Content-spec (CMO v1.1):**

- **H1:** "Sikkerhed bygget ind i fundamentet"
- **Subheadline:** "Foreninger bliver verificeret, betalinger håndteres sikkert, og data behandles med respekt for GDPR. Her kan du se, hvordan vi arbejder med tillid, dokumentation og ansvarlig drift."
- **Primary CTA:** "Book et gratis møde"
- **Secondary CTA:** "Kontakt os med spørgsmål"
- **Trust-row (4 badges - CMO v1.1):**
  - Verificerede foreninger
  - Sikker betaling
  - GDPR og databeskyttelse
  - Sporbar dokumentation

**Word count:** ~70 ord

---

### **2. Sikkerhed i tre lag**

**CMO-rettet i v1.1:**
- Sproget mindre teknisk
- "Tryg støtteoplevelse" som lag 3 (mere menneskeligt)

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sikkerhed i tre lag"

**Subheadline:** "Vi sikrer hele økosystemet - ikke kun ét punkt."

**3 lag-cards:**

🛡️ **Lag 1: Verificerede foreninger**
"Før en forening kan modtage støtte, kontrollerer vi foreningens oplysninger, ansvarlige kontaktperson og relevante registreringer."

🔒 **Lag 2: Sikker platformdrift**
"Data, betalinger og handlinger håndteres med klare processer, adgangskontrol og dokumentation."

❤️ **Lag 3: Tryg støtteoplevelse**
"Støttere får kvittering, overblik og kontrol over deres støtte og personlige oplysninger."

**Word count:** ~130 ord

---

### **3. Verificering af foreninger** [F07]

**CMO-rettet i v1.1:**
- DGI/DBU/Kulturministeriet-tjek fjernet (kan ikke garanteres for alle foreningstyper)
- "1-3 hverdage" → "normalt 1-3 hverdage, afhængigt af om oplysningerne er komplette"
- 4-trins flow omformuleret mere robust

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sådan verificerer vi foreninger"

**Subheadline:** "Før en forening kan modtage støtte, gennemgår de en grundig kontrol. Verificering tager normalt 1-3 hverdage, afhængigt af om oplysningerne er komplette."

**4-trins verifikation (CMO v1.1):**

1. **CVR og basisoplysninger**
   "Vi kontrollerer foreningens registrerede oplysninger og formål."

2. **Ansvarlig kontaktperson**
   "Den ansvarlige person verificeres med MitID, så vi ved, hvem der står bag oprettelsen."

3. **Risiko- og kvalitetstjek**
   "Vi vurderer oplysningerne og kan bede om ekstra dokumentation ved tvivl."

4. **Manuel godkendelse**
   "En forening bliver først aktiv, når den er gennemgået og godkendt."

**Insight box:** "Vi kontrollerer foreningens CVR-oplysninger, kontaktperson, formål og relevante offentligt tilgængelige oplysninger. Ved behov kan vi bede om supplerende dokumentation."

**💡 Hvad betyder det for dig?** *"Du støtter kun foreninger, der er gennemgået og godkendt."*

**Word count:** ~220 ord

---

### **4. Indsamlingsnævnet - overblik og dokumentation** [F01, F03, F04, F24]

**CMO-rettet i v1.1:**
- "StøtMedHjerte automatiserer rapportering" → "StøtMedHjerte samler data, frister og regnskabsgrundlag"
- "Auto-rapportering" → "Eksport af regnskabsgrundlag" / "Rapporteringsklar oversigt"
- "Vi gør det hele automatisk" → "Vi gør arbejdet mere overskueligt"

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0, lidt reduceret)

**Content-spec (CMO v1.1):**

**Headline:** "Indsamlingsnævnet - overblik og dokumentation"

**Body:** "Indsamlingsnævnet kræver dokumentation, frister og regnskab. Vi gør arbejdet mere overskueligt ved at samle tekstudkast, journalnummer, frister, påmindelser og regnskabsdata ét sted - så foreningen kan håndtere anmeldelse og rapportering korrekt."

**Hvad StøtMedHjerte leverer:**
- ✅ Auto-genererede anmeldelses-tekstudkast (foreningen indsender selv)
- ✅ Validering af journalnummer-format
- ✅ Synlig nedtælling til fornyelse (eksempel: "343 dage")
- ✅ 30-dages reminder før regnskab-frist [F03]
- ✅ Rapporteringsklar oversigt ved periode-slut
- ✅ 50.000 kr. revisor-grænse markering [F04]
- ✅ Indsamlings-regnskab eksporterbart [F24]

**Vigtig præcisering:** "Tilladelse til indsamling er per forening - ikke en StøtMedHjerte-blanket. Foreningen er den juridiske aktør. Vi hjælper med at gøre processen nemmere."

**Cross-link:** "Læs deep-dive om Indsamlingsnævn-flow" → `/foreninger#indsamlingsnaevnet`

**💡 Hvad betyder det for dig?** *"Foreningen får hjælp til at holde alt overblik og frister - uden at miste det juridiske ansvar."*

**Word count:** ~230 ord

---

### **5. GDPR og databeskyttelse** [F31]

**CMO-rettet i v1.1:**
- Headline: "GDPR - fuld compliance" → "GDPR og databeskyttelse"
- Subheadline mere ærlig
- "Eksportér alle dine data via din profil" nedtonet

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0, reduceret)

**Content-spec (CMO v1.1):**

**Headline:** "GDPR og databeskyttelse"

**Subheadline:** "Vi behandler persondata med klare formål, begrænset adgang og tydelige rettigheder for både støtter og foreninger."

**6 GDPR-rettigheder (omformuleret):**

📥 **Ret til indsigt**
"Du kan anmode om indsigt i de oplysninger, vi behandler om dig. Hvor det er muligt, stiller vi også data til rådighed via din profil."

✏️ **Ret til berigtigelse**
"Ret personlige oplysninger når som helst i din profil eller ved henvendelse til os."

🗑️ **Ret til sletning**
"Slet din konto når som helst. Vi anonymiserer eller sletter persondata efter sletningsanmodning, dog under hensyn til lovkrav (fx bogføring)."

📤 **Ret til dataportabilitet**
"Få dine data udleveret i standardformat på anmodning."

🚫 **Ret til indsigelse**
"Sig fra over for marketing-mails eller specifikke databehandlinger."

⚖️ **Ret til klage**
"Kontakt os først - derefter Datatilsynet hvis nødvendigt."

**Vigtig info-box:**
"📋 Persondata-aftale (databehandleraftale) er tilgængelig for alle foreninger. Privatlivspolitik er offentligt tilgængelig."

**CTAs:** "Læs også: [Privatlivspolitik](/privatlivspolitik), [cookiepolitik](/cookiepolitik) og [betingelser](/betingelser)."

**💡 Hvad betyder det for dig?** *"Du kan se, rette og anmode om sletning af dine oplysninger."*

**Word count:** ~230 ord

---

### **6. Sikker betaling** [F32, F45, F52]

**CMO-rettet i v1.1:**
- Headline mere brugerforståelig
- Tekniske termer flyttet til sub-section under hovedforklaring
- MobilePay fjernet specifikt

**Brand-tokens:** (uændret fra v1.0)

**Motion:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Sikker betaling - uden at vi gemmer dine kortoplysninger"

**Body:** "Kortbetalinger håndteres af en certificeret betalingspartner. Det betyder, at StøtMedHjerte ikke gemmer dine kortoplysninger på egne systemer. Ved fast støtte gemmes kun en sikker betalingsreference, så fremtidige betalinger kan gennemføres."

**Sikkerhedslag (CMO v1.1):**

- **PCI DSS Level 1 via certificeret betalingspartner** - Højeste niveau af betalingssikkerhed
- **3D Secure / stærk kundeautentifikation** - Beskyttelse mod uautoriseret brug
- **Kvittering kort efter betaling** [F45] - Modtagelseskvittering med transaktionsdetaljer
- **Sikker betalingsreference ved fast støtte** - Ingen kortoplysninger gemmes hos os

**Subsection: Betalingsmetoder**

"De tilgængelige betalingsmetoder vises altid ved checkout og kan variere efter støtteform."

**💡 Hvad betyder det for dig?** *"Du betaler sikkert, og vi gemmer ikke dine kortoplysninger."*

**Word count:** ~200 ord

---

### **7. Audit-trail og dokumentation** [F33]

**CMO-rettet i v1.1:**
- "Immutable" fjernet
- "Logs opbevares 5 år for støtter (donor-rettigheder)" → mere GDPR-korrekt formulering
- "Top 10% af alle støtter" fjernet (hører ikke hjemme her)

**Brand-tokens:** (uændret fra v1.0)

**Motion (REDUCERET v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: Statisk mockup af audit-log fader ind (NO cascade)
T+0.6s: Document-types reveal som 4 cards (subtil)
```

**Content-spec (CMO v1.1):**

**Headline:** "Audit-trail og dokumentation"

**Subheadline:** "Sikkerhedsrelevante handlinger og ændringer logges, så der er sporbarhed i systemet."

**Hvad logges:**

📊 **Foreninger ser:**
- Alle modtagne donationer (med donor-info hvis ikke anonym)
- Alle abonnement-betalinger
- Alle webshop-ordrer med valgt hjertesag
- Alle udsendte mails (kommunikations-log)
- Alle admin-handlinger på platformen

❤️ **Støtter ser:**
- Alle deres donationer
- Alle abonnement-træk
- Alle webshop-ordrer
- Alle ændringer i deres profil

🔒 **Internt logger StøtMedHjerte:**
- Sikkerhedsrelevante system-handlinger
- Data-ændringer relevant for compliance
- Logdata beskyttes mod uautoriseret adgang og bruges til dokumentation, fejlfinding og kontrol

**Insight box (CMO v1.1):** "Regnskabs- og transaktionsdata opbevares som udgangspunkt i op til 5 år, når det er nødvendigt af hensyn til bogføring, dokumentation og juridiske forpligtelser. Øvrige persondata slettes eller anonymiseres, når der ikke længere er et sagligt formål."

**Word count:** ~170 ord

---

### **8. EU-hosting og infrastruktur** [F54]

**CMO-rettet i v1.1:**
- "End-to-end kryptering" fjernet (teknisk forkert)
- "Ingen data overføres til tredjelande" omskrevet (for absolut)
- Public forklaring om hvorfor leverandører ikke nævnes fjernet

**Brand-tokens:** (uændret fra v1.0)

**Motion (REDUCERET v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: 3 columns reveal stagger
T+0.7s: Statisk EU-illustration (ikke "tech startup map animation")
```

**Content-spec (CMO v1.1):**

**Headline:** "EU-hosting og infrastruktur"

**Subheadline:** "Vores infrastruktur er bygget til pålidelighed og databeskyttelse."

**3 søjler (CMO v1.1):**

🇪🇺 **EU-hosting**
"Persondata opbevares som udgangspunkt i EU/EØS. Hvis der sker overførsel uden for EU/EØS, sker det kun på lovligt overførselsgrundlag og med relevante sikkerhedsforanstaltninger."

⚡ **Høj tilgængelighed**
"Redundant infrastruktur med automatisk failover. Daglig backup med point-in-time recovery."

🔐 **Kryptering og sikker lagring**
"Forbindelser beskyttes med moderne TLS-kryptering, og data lagres med stærke tekniske sikkerhedsforanstaltninger."

**Note (CMO v1.1):** "Vi arbejder med certificerede og professionelle underleverandører, hvor det er nødvendigt. Relevante sikkerheds- og databehandlerforhold er dokumenteret og kan gennemgås ved behov."

**Word count:** ~140 ord

---

### **9. Relevante myndigheder og ansvar**

**CMO-rettet i v1.1:**
- Headline: "Vi rapporterer til..." → "Relevante myndigheder og ansvar"
- Finanstilsynet fjernet (uklart juridisk ansvar)
- Hvert kort omformuleret med ansvars-klarhed

**Brand-tokens:** (uændret fra v1.0)

**Motion (REDUCERET v1.1):**
```
T+0.0s: Header fade-up
T+0.3s: 4 myndigheds-cards reveal (subtil)
```

**Content-spec (CMO v1.1):**

**Headline:** "Relevante myndigheder og ansvar"

**Subheadline:** "StøtMedHjerte, foreninger og betalingspartnere kan være omfattet af forskellige regler og tilsyn. Her er de vigtigste områder."

**4 områder (CMO v1.1):**

⚖️ **Indsamlingsnævnet**
"Foreningen er den juridiske aktør. StøtMedHjerte hjælper med overblik, frister og regnskabsgrundlag."

🛡️ **Datatilsynet**
"Datatilsynet fører tilsyn med persondatabeskyttelse. Du kan klage til Datatilsynet, hvis sagen handler om persondata."

💰 **Skattestyrelsen**
"§8A afhænger af foreningens egen godkendelse. Det er ikke en standardfunktion ved lancering."

💳 **Betalingssikkerhed**
"Kortbetalinger håndteres via certificeret betalingspartner med relevante sikkerhedsstandarder."

**Word count:** ~180 ord

---

### **10. Compliance-FAQ**

**CMO-rettet i v1.1:**
- FAQ 1: "ingen tredjelande" → mere robust formulering
- FAQ 3 (konkurs): juridisk forsigtigere
- FAQ 4 (klage): "24 timer" → "1-2 hverdage"
- FAQ 5 (data-opbevaring): mere GDPR-korrekt
- FAQ 6 (§8A): "automatisk indberetning" fjernet

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Compliance-spørgsmål"

**6 spørgsmål:**

1. **Hvor opbevares mine data?**
   "Persondata opbevares som udgangspunkt i EU/EØS. Hvis der sker overførsel uden for EU/EØS, sker det kun på lovligt overførselsgrundlag og med relevante sikkerhedsforanstaltninger."

2. **Hvordan ved jeg, at en forening er ægte?**
   "Hver forening gennemgår KYC-tjek (CVR, MitID, manuel godkendelse) før de kan modtage støtte. Du kan se godkendelsesstatus på foreningens profil."

3. **Hvad sker der, hvis StøtMedHjerte går konkurs?**
   "Vi arbejder med adskilte betalings- og afregningsflows, så støttebeløb kan spores fra betaling til afregning. Hvis der opstår en ekstraordinær situation, vil berørte foreninger og støtter blive informeret direkte, og relevante data og afregningsgrundlag vil blive dokumenteret."

4. **Kan jeg klage hvis jeg ikke får svar?**
   "Kontakt os først, så vender vi tilbage hurtigst muligt - normalt inden for 1-2 hverdage. Hvis sagen handler om persondata, kan du også kontakte Datatilsynet."

5. **Hvor længe gemmer I mine data?**
   "Regnskabs- og transaktionsdata opbevares som udgangspunkt i op til 5 år, når det er nødvendigt af hensyn til bogføring, dokumentation og juridiske forpligtelser. Øvrige persondata slettes eller anonymiseres, når der ikke længere er et sagligt formål."

6. **Hvordan håndteres §8A-fradrag?**
   "§8A-fradrag afhænger af, om den enkelte forening selv er godkendt af Skattestyrelsen. Det er ikke en standardfunktion ved lancering. Når det bliver relevant, vil det fremgå tydeligt ved den enkelte forening eller støtteform."

**CTA:** "Se alle FAQ" → `/faq`

**Word count:** ~240 ord

---

### **11. Final CTA**

**CMO-rettet i v1.1:**
- "Alt det tekniske" → mere bredt formuleret

**Brand-tokens:** (uændret fra v1.0)

**Content-spec (CMO v1.1):**

**Headline:** "Vil du have sikkerheden gennemgået?"
**Subheadline:** "Vi viser gerne, hvordan verificering, betalinger, data og dokumentation fungerer i praksis."
**Primary CTA:** "Book et gratis møde" → `/book-moede`
**Secondary CTA:** "Kontakt os med spørgsmål" → `/kontakt`
**Trust-statement:** "Compliance-dokumentation tilgængelig for foreninger, partnere og myndigheder."

**Word count:** ~80 ord

---

# 🎯 Visuel-spec opsummering (v1.1)

## Tone - vigtig for compliance-side

(Uændret fra v1.0 - mere seriøs end /foreninger og /stotter)

## Motion-niveau JUSTERET v1.1 (CMO-anbefaling)

- Hero: ja, let fade og mockup
- 3 lag-cards: ja, diskret
- GDPR cards: enkel fade
- Audit-log: **ingen cascade**, statisk mockup eller meget subtil reveal
- EU-illustration: **statisk**, ikke "tech startup map animation"
- Trust > wow-effekt

## "Hvad betyder det for dig?"-bokse (NY i v1.1)

CMO-anbefaling: tilføjet i 4 sektioner for at gøre siden bedre for B2C:
- Section 3: Verificering
- Section 4: Indsamlingsnævnet
- Section 5: GDPR
- Section 6: Sikker betaling

---

## Inter-page links (UDVIDET v1.1)

**Linker FRA `/sikkerhed` TIL:**
- `/foreninger` (Indsamlingsnævn deep-dive)
- `/privatlivspolitik` (GDPR)
- `/cookiepolitik` (NY i v1.1)
- `/betingelser` (NY i v1.1)
- `/book-moede` (Hero + Final CTA)
- `/kontakt` (Hero + Final CTA)
- `/faq` (Compliance-FAQ)

---

## Compliance check (CMO-verificeret v1.1)

- ✅ **Policy 1 - Konkurrent-beskyttelse:** Public forklaring om leverandør-skjul fjernet; erstattet med neutral formulering
- ✅ **Policy 2 - Begge målgrupper:** "Hvad betyder det for dig?"-bokse tilføjet for B2C
- ✅ **Policy 3 - MVP-tal master:** Ikke fokus her, ingen modsigelser
- ✅ **Policy 4 - Tone of voice:** Tekniske/absolutte termer ("end-to-end", "immutable", "fuld compliance", "automatiserer") omformuleret
- ✅ **Policy 5 - Visuel identitet:** Marketing palette + nedtonet motion
- ✅ **Policy 6 - §8A:** "Automatisk indberetning" fjernet; korrekt som "kommer senere"

---

## v1.0 → v1.1 ændringslog

**Kritiske rettelser (CMO kategori A - alle 8 implementeret):**
1. ✅ "Ingen data overføres til tredjelande" → robust EU/EØS-formulering
2. ✅ "End-to-end kryptering" fjernet → "TLS-kryptering og sikker lagring"
3. ✅ "Auto-rapportering til Indsamlingsnævnet" → "Rapporteringsklar oversigt"
4. ✅ "Vi gør det hele automatisk" → "Vi gør arbejdet mere overskueligt"
5. ✅ Konkurs-FAQ juridisk forsigtigere
6. ✅ "24 timer" klage-respons → "1-2 hverdage"
7. ✅ "5 år for støtter (donor-rettigheder)" → GDPR-korrekt formulering
8. ✅ "Top 10%" + public leverandør-rationale fjernet

**Stærke anbefalinger (CMO kategori B - alle 9 implementeret):**
1. ✅ Hero subheadline mere brugerforståelig
2. ✅ "Sikkerhed i tre lag" sproget mindre teknisk
3. ✅ Verificering: DGI/DBU specifikke claims fjernet
4. ✅ "1-3 hverdage" → "normalt 1-3 hverdage"
5. ✅ "GDPR - fuld compliance" → "GDPR og databeskyttelse"
6. ✅ Sikker betaling oversat til B2C-sprog
7. ✅ MobilePay fjernet specifikt
8. ✅ "Immutable" → "sporbar og beskyttet logning"
9. ✅ "Vi rapporterer til myndigheder" → "Relevante myndigheder og ansvar"

**Forslag til overvejelse (CMO kategori C - implementeret hvor relevant):**
1. ✅ Sektion-rækkefølge bevaret
2. ✅ Word count ~1,890 ord (passende for compliance-hub)
3. ✅ "Hvad betyder det for dig?"-bokse tilføjet (4 sektioner)
4. ✅ Link til /betingelser tilføjet
5. ✅ Link til /cookiepolitik tilføjet
6. ✅ "GDPR-compliant" trust-row → "GDPR og databeskyttelse"
7. ✅ "PCI DSS Level 1" fjernet fra Hero trust-row
8. ✅ Motion-niveau yderligere reduceret

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial wireframe - 11 sektioner, ~1,800 ord, 10 Primary features dækket |
| 1.1 | 5. maj 2026 | CMO-review implementeret: 8 kritiske + 9 stærke + 8 overvejelser. Juridisk robust formuleringer (GDPR, kryptering, Indsamlingsnævn-rapportering, konkurs, opbevaring). "Hvad betyder det for dig?"-bokse tilføjet for B2C. Motion reduceret yderligere. ~1,890 ord. **Klar til implementering.** |
