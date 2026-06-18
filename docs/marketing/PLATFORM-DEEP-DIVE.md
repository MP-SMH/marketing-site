# StøtMedHjerte Platform Deep-Dive
## Master Reference Document for Marketing, Content & Product Decisions

**Version:** 1.1
**Dato:** 5. maj 2026
**Status:** Foundation document — opdateres når platformen udvikles
**Anvendelse:** Master reference for ChatGPT-CMO content, marketing-design, sales pitches, investor decks

---

## Hvordan dette dokument bruges

Dette er **master sandheds-kilde** for hvad StøtMedHjerte er, hvad platformen kan, og hvordan værdien skal kommunikeres. Alt content der produceres (af ChatGPT, Mario, eller en fremtidig CMO) skal være i overensstemmelse med dette dokument.

**5 sektioner:**
- **A.** Foreningens rejse (B2B) — Hvordan en forening bruger SMH
- **B.** Støtterens rejse (B2C) — Hvordan en støtter bruger SMH
- **C.** Værdiløfter — Konkrete, kvantificerede løfter til begge målgrupper
- **D.** Tekniske kapabiliteter — Hvad er bygget, hvad er differentiator
- **E.** Differentiatorer — Hvorfor SMH vs. alternativer

**Tværgående policy:** Konkurrent-beskyttelse — kommuniker værdi, aldrig tech-stack-leverandører.

---

# SECTION A: Foreningens Rejse (B2B)

En komplet end-to-end rejse fra første kontakt til bæredygtig løbende indtægt.

## A1. Discovery — Foreningen hører om SMH

### Touchpoints
- Meta Ads kampagne ("Booking — Gratis opstartsmøde")
- LinkedIn / Facebook organisk content
- Henvisning fra anden forening
- Søgning på Google (sport-vertical pages, blog)
- Direkte trafik

### Foreningens mindset
- "Vi har for lidt kassebeholdning"
- "Vores kasserer brænder ud"
- "Vi forstår ikke Indsamlingsnævnet's regler"
- "Vi vil have stabile månedlige indtægter, ikke bare lotterier"
- "Vi har lille netværk men trofaste medlemmer/forældre"

### Hvad foreningen skal opdage
1. Det er gratis at komme i gang
2. Der er 3 indkomstkanaler (ikke 1)
3. SMH håndterer det juridiske (Indsamlingsnævnet)
4. Pengene kommer automatisk
5. Der er en seriøs verificerings-proces (et kvalitetsstempel, ikke en hindring)

---

## A2. Onboarding — Fra interesse til aktiv platform

### Step 1: Registrering (på app.stotmedhjerte.dk/onboarding)

Foreningen indtaster:
- CVR-nummer (auto-udfylder forenings-info)
- Kontaktperson + email + telefon
- Adresse + bankoplysninger
- Foreningstype (40+ kategorier)

**To verificeringsprocesser bag kulissen:**
1. **MitID-verificering** (af kontaktperson via specialiseret KYC-platform)
2. **CVR + kreditvurdering** (validering mod offentligt register + risk-scoring)

**Tidsforventning:** Verificering kan tage **op til et par hverdage**. Foreningen får besked når godkendelsen er på plads.

**Kommunikation til foreningen:** "Vi behandler jeres ansøgning. Du modtager besked når verificeringen er gennemført — typisk indenfor 1-3 hverdage."

**Resultat:** Foreningens profil er oprettet og verificeret.

### Step 2: Foreningsprofil (`/admin/profil`)

Foreningen tilføjer:
- Logo
- Profiltekst (hvem er vi?)
- Sociale medier
- Bestyrelsesmedlemmer (valgfrit)

**Profilscore:** Visuel indikator (0-100%) af hvor komplet profilen er. Påvirker konverteringsrate når støttere møder profilen.

### Step 3: Aktivering af kanaler (`/admin/...`)

Foreningen får adgang til 3 kanaler — **2 obligatoriske + 1 valgfri**:

#### Kanal 1: **Hjertesager** (`/admin/hjertesag`) — OBLIGATORISK
- Op til 5 aktive hjertesager samtidigt
- Hver hjertesag: kampagnenavn, beskrivelse, målbeløb, billede, slut-dato
- Kræver Indsamlingsnævn-godkendelse FØR aktivering (se A3)
- Foreningen får 80% af modtagne donationer

#### Kanal 2: **Fast Støtte** (`/admin/fast-stoette`) — OBLIGATORISK
- Tier-system: 100, 200, 300, 500 kr./md.
- Foreningen kan tilføje tilpasset beskrivelse
- Auto-trækning hver måned
- Foreningen får 80% af alle abonnementer
- Ikke omfattet af Indsamlingsnævn-regler (driftsstøtte, ikke formålsbestemt)

#### Kanal 3: **Webshop** (`/admin/webshop`) — VALGFRI / TILVALG
- Foreningen vælger 5 produkter til "supporter-kollektion"
- Print-on-demand (intet lager, ingen risiko)
- Foreningen får 32,75% af nettoprofitten
- Webshoppen ligger på shop.stotmedhjerte.dk (separat subdomain)

### Step 4: Indsamlingsnævn-anmeldelse (`/admin/indsamlingsnaevnet`)

For at aktivere donations- og hjertesag-kanalen:

1. SMH **auto-genererer** anmeldelsesteksten baseret på foreningens profil
2. Foreningen kopierer teksten og sender til Indsamlingsnævnet
3. Foreningen modtager journalnummer (ÅÅÅÅ-XXX-XXXX)
4. Foreningen indtaster journalnummer i SMH
5. SMH validerer formatet og **låser kanalen op**

**Status-flow:** `Ikke anmeldt` → `Anmeldt` → `Godkendt` → `Afsluttet`

**Paraply-koncept:** Én tilladelse = ubegrænsede hjertesager i hele perioden, så længe de holder sig inden for det formål, der er anmeldt. Derfor anbefaler SMH bredt formål.

### Step 5: Del og aktiver (`/admin/deling`)

Foreningen får for hver kanal:
- **Unikt delings-link**
- **QR-kode** (downloadable, print-klar)
- **Auto-genererede tekster** til:
  - SMS
  - Facebook-post
  - Email/newsletter
- Alle tekster tilpasses automatisk efter foreningens navn + valgte hjertesag

**Foreningens job:** Dele i deres netværk (medlemmer, forældre, sponsorer, lokal-presse).

---

## A3. Drift — Foreningen modtager løbende støtte

### Aktivitet i Dashboard (`/dashboard` eller `/admin/dashboard`)

**4 KPI-kort:**
- Total indsamlet (akkumuleret over alt tid)
- Aktive støtter (antal personer)
- Denne måned (rolling 30 dage)
- Næste afregning (dato + estimeret beløb)

**3 indkomstkanaler (separat tracket):**
- Webshop (rød accent)
- Fast Støtte (lilla accent)
- Donationer (blå accent)

Hver med eget tal + procentvis vækst.

### Månedlig rapport (`/admin/rapporter`)

Hver måned auto-genereres:
- Indtægtsoversigt pr. kanal
- Liste over donationer og abonnementer
- Indsamlings-regnskab (til Indsamlingsnævn-rapportering)
- Eksporterbart format som **regnskabsoversigt** til foreningens eget brug

### Beskeder (`/admin/kommunikation`)

Auto-mails til støttere:
- Donation-kvittering (sendes automatisk)
- "Tak for din støtte" til nye faste støttere
- Månedlig newsletter med foreningens highlights
- Reminder-mails ved abonnement-fornyelse

Foreningen kan se alle udsendte mails i kommunikations-loggen.

### Dokumenter (`/admin/dokumenter`)

Centralt arkiv for:
- Samarbejdsaftale med SMH (digital signature)
- Indsamlingsnævn-tilladelser
- Indsamlings-regnskaber (auto-genererede)
- Persondata-aftaler
- Månedlige afregningsbilag

---

## A4. Udbetaling — Pengene lander i banken

### Cyklus
- **Afregningsperiode:** 1.-30./31. hver måned (kalender-måned)
- **Afsendelse:** Lige efter periodens afslutning (ikke en fast dato)
- **Bankdage:** 1-3 bankdage efter afsendelse

### Eksempel
> Periode: 1.-31. august
> Afsendelse: 1.-2. september (når periode-data er afsluttet)
> Penge i bank: 2.-5. september

### Hvad foreningen modtager
**Per kanal:**
- 80% af alle modtagne donationer
- 80% af alle aktive abonnementer (efter betalingsudbyder-gebyrer)
- 32,75% af nettoprofit fra webshop-salg

**Formel for webshop (legally binding ADAM 2.0):**
```
Nettoprofit = (Salgspris ÷ 1.25) - varekostpris - betalingsgebyr
Forenings-andel = Nettoprofit × 0.3275
```

### Dokumentation
Hver udbetaling ledsages af:
- Detaljeret afregningsbilag
- Liste over alle bidragsydere (anonymiseret hvis ønsket)
- Regnskabsoversigt til foreningens eget brug
- Indsamlings-regnskabsdata til Indsamlingsnævn-rapportering

---

## A5. Compliance — Det juridiske kører automatisk

### Indsamlingsnævnet
- **Auto-rapportering** ved periodens slutning
- **30-dages reminder** før regnskab-frist (6 måneder efter slut-dato)
- **50.000 kr. revisor-grænse** auto-markeret når overskredet
- **Gennemsigtighedslink** auto-genereret til offentlig deling
- **Periode-fornyelse** med 1 års gyldighed
- **Synlig nedtælling** til fornyelse (eks. "343 dage til fornyelse af indsamlingstilladelse")

### GDPR
- Auto-anonymisering af donor-data efter ønske
- Auto-sletning af persondata efter 5 år
- Eksport-rettigheder til donorer
- Cookie- og privatlivspolitik håndteret

### Skattefradrag (§8A)

**Vigtigt:** §8A er en godkendelse FORENINGEN skal have, ikke SMH.

**SMH's rolle:**
- Hjælper foreningen ansøge §8A med auto-genereret ansøgningstekst
- Auto-rapporterer donor-data til SKAT på vegne af §8A-godkendte foreninger
- Auto-genererer årligt fradragsbilag til donor

**Forudsætninger for §8A (verificeres med Mario før marketing-claim aktiveres):**
- Foreningen er almennyttig eller velgørende
- Foreningen har minimum 100 gavegivere/år med donationer over 200 kr.
- Donor's CPR-nummer indsamles ved donation (skal være implementeret i checkout-flow)
- Foreningen indberetter årligt til SKAT (auto-håndteret af SMH)

**Marketing-status:**
- Skal verificeres som færdigt feature før marketing-claim aktiveres
- Indtil verificering: ikke nævn §8A-fradrag i marketing-content
- I FAQ: kan nævnes som "kommende feature" eller "afhænger af foreningens §8A-status"

### Bogføring (intern SMH-kapabilitet — IKKE forenings-feature)

**Vigtig præcisering:**
- SMH bogfører kun for **sig selv** (StøtMedHjerte's egen drift)
- SMH bogfører **IKKE** i foreningens eget økonomi-system
- Foreningen får i stedet:
  - **Regnskabsoversigt** (PDF/Excel) som de selv bogfører efter
  - **Indsamlings-regnskab** til Indsamlingsnævn-rapportering
  - **Afregningsbilag** ved hver udbetaling

**For marketing:** "Foreningen får komplet regnskabsoversigt og dokumenteret afregning" (ikke "auto-bogføring i jeres system")

---

## A6. Vedvarende vækst — Hvordan SMH hjælper foreningen vokse

### Beskeder & engagement
- Auto-tak til nye støttere (engagement)
- Månedlig newsletter (retention)
- Reminder ved manglende månedlig betaling (revenue protection)

### Social media tools
- Auto-genererede SoMe-poster når nye støttere tilkommer
- Milepæl-billeder ("Vi har nået 50 faste støttere!")
- Hjertesag-update-poster

### Anmelding & analytics
- Indsamlingsnævn-status (always-on indicator)
- Performance-trends (ugentlig email-summary)
- "Hvad virker bedst" indsigt (kanal-sammenligning)

---

# SECTION B: Støtterens Rejse (B2C)

En komplet end-to-end rejse fra opdagelse af forening til bæredygtigt loyalt støtteforhold.

**Vigtigt:** For at kunne støtte skal støtteren oprette sig som bruger på stotmedhjerte.dk. Ingen anonyme transaktioner — alle støtter har en konto.

## B1. Discovery — Støtteren opdager en forening

### Touchpoints
- SoMe-post fra forening (Facebook/Instagram delt af venner)
- Direkte fra forening (email, SMS, ved kamp/event)
- QR-kode på fysisk materiale (kampagne-flyers)
- Søgning på "støt [foreningsnavn]" på Google
- Browse på stotmedhjerte.dk → /hjertesager

### Støtterens mindset
- "Jeg vil støtte min søns klub men har ikke tid til alt det praktiske"
- "Jeg betaler gerne 100 kr./md. hvis det går direkte til klubben"
- "Jeg vil have nogen merch så jeg kan vise min støtte"
- "Jeg vil vide hvor pengene går hen"

### Hvad støtteren skal opdage
1. Det er hurtigt og trygt
2. 80%+ går direkte til foreningen
3. Foreningen er verificeret (kan ikke fuske)
4. Man kan stoppe abonnement når som helst
5. Man får dokumenteret kvittering

---

## B2. Beslutning — Støtteren vælger HVORDAN at støtte

Støtteren har 3 muligheder (alle kræver bruger-oprettelse på stotmedhjerte.dk):

### Mulighed 1: Engangs-donation (donation til hjertesag)
- Vælger en specifik hjertesag fra foreningen
- Vælger beløb (frit eller forudindstillede tiers)
- Betaler engang
- 80% går til foreningen

### Mulighed 2: Fast Støtte (månedligt abonnement)
- Vælger **én forening ad gangen** (kun én aktiv Fast Støtte)
- Vælger tier: 100, 200, 300, 500 kr./md.
- Betaler første gang, derefter auto-trækning hver måned
- 80% går til foreningen
- Kan stoppe når som helst (men kun én forening kan modtage Fast Støtte ad gangen)

### Mulighed 3: Køb af supporter-merch (webshop)
- Vælger produkt fra foreningens kollektion
- Vælger størrelse + farve
- Vælger ved checkout: hvilken hjertesag støtten skal gå til
- 32,75% af overskuddet går til foreningen

---

## B3. Bruger-oprettelse + betaling

### Bruger-oprettelse (KRÆVET)

For at gennemføre nogen form for støtte SKAL støtteren oprette sig som bruger:
- Email + adgangskode (eller MitID-login når tilgængelig)
- Navn + adresse (til kvittering og evt. fysisk levering)
- Anonymitets-præferencer (skal navn vises offentligt på hjertesag?)
- Marketing-tilladelse (newsletter ja/nej)

**Begrundelse for bruger-krav:**
- Mulighed for at administrere abonnement (pause/opsig)
- Modtage kvittering og evt. fradragsbilag
- Følge sin støtte over tid (tier-progression)
- GDPR-compliance (vi ved hvem vi har data om)

### Betalingsmetoder
- **Kort:** Visa, Mastercard
- **Wallets:** Apple Pay, Google Pay
- **Shop Pay** (webshop)
- **MobilePay** (kun hvis foreningen har egen MSN-konto-aftale)

### Sikkerhed
- PCI DSS Level 1 compliance via certificeret betalingsudbyder
- 3D Secure / SCA på alle korttransaktioner
- Ingen kortdata gemmes på SMH's egne systemer

### Bekræftelse
- Email-kvittering indenfor 1 minut
- Profil tilgængelig på `/profil` straks efter

---

## B4. Engagement — Løbende relation til SMH og foreningen

Når støtteren er aktiv (har donation, abonnement eller ordre), får de adgang til **deres egen profil-side** (`/profil`).

### `/profil/oversigt` — Hovedside

**Hero-section:**
- Personligt avatar
- Streak-counter (måneder i træk med donationer)
- Animated count-up til total impact (kr.)

**Tier-system (Bronze → Sølv → Guld → Platin → Diamant):**
- Progress-bar til næste tier
- Konkret beløb til næste tier vises
- Milestone-badges (visuelle badges for fremskridt)

**Indkomstkanal-oversigt:**
- Webshop-ordrer (rød)
- Fast Støtte (lilla)
- Donationer (blå)
- Aktivitet sorteret efter dato

**Velkomst-onboarding (kun nye brugere):**
- "Velkommen til StøtMedHjerte!"
- "Sådan virker det" mini-tutorial (3 trin)

**Nudges:**
- "Du kan øge din støtte til [forening]"
- "Sæt en hjertesag på dit næste køb"
- Personaliserede tips

**Aktivitetsfeed:** Seneste 10 transaktioner (donation, abonnement, ordre).

### `/profil/donationer`
Komplet donation-historik. Filtrer per forening, dato, beløb.

### `/profil/abonnementer`
**SubscriptionCard for den aktive Fast Støtte (én ad gangen):**
- Foreningsnavn + sektor (med farve-kode)
- Månedligt beløb
- Total betalt over tid
- Antal måneder aktiv
- "Støtter siden [måned år]"
- 80% til forening (transparent)
- **Pause/Play-knap** (instant)

Sektor-farver:
- Fodbold: grøn
- Gymnastik: lilla
- Håndbold: orange
- Svømning: blå
- Kampsport: rød
- Handicap: cyan
- Kultur: lilla
- Velgørenhed: grøn

### `/profil/ordrer`
Webshop-ordre-historik med tracking-numre.

### `/profil/indstillinger`
- Profil-info
- Anonymitets-præferencer
- Notifikations-præferencer
- Sletning af konto (GDPR)

---

## B5. Loyalty — Den langsigtede relation

### Tier-progression
Jo mere støtteren bidrager (over alt tid), jo højere tier:
- Bronze (0-499 kr.)
- Sølv (500-1.999 kr.)
- Guld (2.000-4.999 kr.)
- Platin (5.000-9.999 kr.)
- Diamant (10.000+ kr.)

Hver tier har visuel identitet og milestone-badges.

### Multi-foreningsstøtte (med begrænsninger)

En støtter kan kombinere flere typer støtte til flere foreninger:
- **Fast Støtte:** Kun ÉN aktiv ad gangen
- **Engangs-donationer:** Til så mange foreninger man vil
- **Webshop-køb:** Forskellige foreninger pr. køb (vælges ved checkout)

Konsolideret oversigt på samme profil. Hver forening tracker individuelt.

### Streak-system
- Antal måneder i træk hvor støtteren har bidraget
- Visuel streak-counter
- Milestones ved 3, 6, 12, 24 måneder

### Skattefradrag (kun for §8A-godkendte foreninger)

**Forudsætning:** Foreningen skal selv have §8A-godkendelse fra Skattestyrelsen.

Når foreningen er §8A-godkendt:
- Donor's CPR-nummer indsamles ved donation
- SMH auto-rapporterer årligt til SKAT
- Donor får årligt fradragsbilag direkte i sin profil

Hvis foreningen IKKE har §8A: ingen fradragsmulighed for donor (kommunikeres tydeligt ved donation).

---

# SECTION C: Værdiløfter — Kvantificeret

## C1. For Foreninger (B2B)

### Tids-besparelse (kvantificeret)

| Aktivitet | Uden SMH | Med SMH | Sparet |
|---|---|---|---|
| Indsamlingsregnskab pr. periode | 8-15 timer | 0 timer | 8-15t |
| Donor-tracking + bilag | 4-8t/md. | 0t/md. | 50-100t/år |
| Social media-content til kampagner | 2-4t/uge | 30 min/uge | 80-180t/år |
| Donor-kommunikation (taks, kvitteringer) | 1-2t/uge | 0t (automatisk) | 50-100t/år |
| Indsamlingsnævn-anmeldelse | 4-8 timer | 15 min | 4-8t |

**Total:** ~200-400 timer sparet per år for en mellemstor forening.

### Indtægts-potentiale (kvantificeret)

**Eksempel: Fodboldklub med 200 medlemmer + 200 forældre/familie:**

| Kanal | Konverteringsrate (forventet) | Aktive støttere | Månedlig værdi |
|---|---|---|---|
| Fast Støtte (100 kr./md. tier) | 5-10% | 20-40 personer | 1.600-3.200 kr./md. (80%) |
| Webshop | 15-25% køb 1-2 gange/år | 60-100 personer | 1.500-3.000 kr./år |
| Donationer (kampagner) | 10-20% per kampagne | 40-80 personer | 4.000-8.000 kr./kampagne |

**Total per år:** 30.000-60.000 kr. for ovenstående eksempel-forening.

### Risiko-elimination

- **Ingen lager** (print-on-demand)
- **Ingen forudkøb** (alle produkter laves når bestilt)
- **Ingen binding** (foreningen kan stoppe når som helst — dog min. 1 udbetalingsperiode)
- **Ingen oprettelses-fee** (gratis at komme i gang)
- **Ingen månedlige gebyrer** (vi tjener kun når forening tjener)

### Compliance-tryghed
- 100% lovlig indsamling (Indsamlingsnævn-tilladelse håndteret)
- GDPR-compliant af design
- Audit-trail for alle transaktioner
- Auto-rapportering når deadlines nærmer sig

---

## C2. For Støttere (B2C)

**Vigtigt for content-tone:** Brug almindeligt sprog, ikke tekniske termer der får app'en til at virke kompleks. "Konto", ikke "user account". "Kvittering", ikke "transaction confirmation". Mario-stil.

### Tryghed (forklaret simpelt)

- **Verificerede foreninger:** Vi tjekker alle foreninger grundigt — så du ved at din støtte går til ægte foreninger
- **Klar fordeling:** 80% af din støtte går direkte til foreningen (32,75% ved merchandise)
- **Email-kvittering med det samme:** Når du har støttet, får du kvittering på email indenfor et minut
- **Foreningen får dokumenteret afregning hver måned:** Du kan altid spørge dem om udbetalingsbilag
- **Sikker betaling:** Standard sikkerhed på alle betalinger (samme niveau som banker bruger)
- **Du har kontrol:** Du kan se, ændre eller stoppe din støtte når som helst

### Fleksibilitet

- **Stop når som helst:** Fast støtte kan pauses eller opsiges instant
- **Vælg din tier:** 100/200/300/500 kr./md.
- **Multi-engagement:** Kun én Fast Støtte ad gangen, men du kan donere engangs eller købe merch til mange foreninger
- **Engangs eller fast:** Du vælger niveau af forpligtelse

### Engagement

- **Personlig profil:** Følg din samlede impact over tid
- **Tier-system:** Synligt fremskridt fra Bronze til Diamant
- **Milestone-badges:** Visuelle markeringer af din rejse
- **Streak-tracking:** Måneder i træk med support
- **Aktivitetsfeed:** Se al din støtte ét sted

### Skattefordel
- Skattefradrag på donationer (når foreningen har §8A-godkendelse)
- Auto-genereret årligt fradragsbilag direkte i din profil
- Direkte eksporterbar til SKAT

**Vigtigt:** Ikke alle foreninger har §8A-godkendelse. Det vises tydeligt ved donation.

---

# SECTION D: Tekniske Kapabiliteter

Dette er CTO-perspektivet — hvad er bygget, hvad er differentiator. **Bruges KUN internt eller til investorer/partnere — ikke til marketing.**

## D1. Built features (MVP-state, januar 2026)

### Backend (super admin SMH)
**25 sider** for SMH-teamet (Mario, Kristoffer):
- Forening-håndtering (oprettelse, godkendelse, suspension)
- Pipeline/CRM (lead-tracking, sales-funnel)
- Webshop-opsætning (produkter, kollektioner)
- Hjertesag-håndtering (godkendelse, suspension)
- Webordre-håndtering (refunderinger, manuel intervention)
- Abonnement-håndtering
- Donation-håndtering
- Finansiel oversigt (alle foreninger samlet)
- Rapporter (intern + investor-rapportering)
- Statistik / data
- Audit-log
- Kommunikations-log
- Aktivitetslog
- Dokumenter (samarbejdsaftaler, juridiske)
- Indstillinger
- Samarbejdsaftale-templates

### Admin (B2B forening)
**16 sider** organiseret i 6 grupper (sidebar):
- Overblik (Dashboard)
- Forening (Foreningsprofil)
- Kanaler (Hjertesager, Fast Støtte, Webshop)
- Indkomst (Rapporter, Støtteoversigt)
- Værktøjer (Del og promover, Beskeder, Dokumenter, Indsamlingsnævnet)
- System (Support, Indstillinger)

### Supporter (B2C)
**6 sider:**
- Profil (Oversigt med tier-system, streak, badges)
- Donationer-historik
- Abonnementer (med pause/play)
- Ordrer (webshop-historik)
- Indstillinger
- Login

### Marketing-site (under udvikling)
**19 sider:**
- Home + Hero
- Hjertesager (B2C entry)
- Foreninger (B2B entry)
- Sådan virker det
- Priser
- Om os
- Blog (placeholder)
- FAQ
- Kontakt
- Book møde
- Betingelser, Privatlivspolitik, Cookiepolitik
- Support
- Fast Støtte
- Login (B2C + B2B)
- Opret støtter (B2C signup)
- Opret forening (B2B signup)

---

## D2. Differentiatorer (uden tech-stack-mention)

### Differentiator 1: Auto-Indsamlingsnævnet

**Hvad konkurrenter gør:** Sender brugeren til Indsamlingsnævn.dk og siger "find ud af det selv"

**Hvad SMH gør:**
- Auto-genererer komplet anmeldelses-tekst baseret på foreningens profil
- Validerer journalnummer-format
- Auto-rapporterer regnskab ved periode-slut
- 30-dages reminder før frist
- Auto-detekterer 50.000 kr. revisor-grænse
- Auto-genererer offentliggørelses-link
- Synlig nedtælling til fornyelse

### Differentiator 2: Tre indkomstkanaler i én platform

**Hvad konkurrenter gør:** Specialisering — donationsplatform ELLER abonnement ELLER webshop

**Hvad SMH gør:** Alle 3 kanaler i samme profil med konsolideret rapportering, samme udbetaling, samme regnskabsoversigt.

### Differentiator 3: Tier-baseret B2C engagement

**Hvad konkurrenter gør:** Donation = transaktion, slut. Donor får måske email-takskvittering.

**Hvad SMH gør:** Donor får sin egen profil med tier-progression, streak-tracking, milestone-badges, aktivitets-historik. Bygger langsigtet relation, ikke éngangs-transaktion.

### Differentiator 4: Auto-genereret marketing-materiale

**Hvad konkurrenter gør:** Foreningen får et link, klarer resten selv.

**Hvad SMH gør:** Auto-genererede SMS-, Facebook-, og email-tekster per kanal og per hjertesag. QR-koder klar til print. Foreningen kopierer og deler.

### Differentiator 5: Compliance baked-in (ikke add-on)

**Hvad konkurrenter gør:** Sælger "fundraising-platform" og lader foreningen håndtere det juridiske.

**Hvad SMH gør:** GDPR, Indsamlingsnævnet, KYC, og regnskabsoversigt er alle byggebrikker — ikke valgfrie tilføjelser.

### Differentiator 6: Print-on-demand uden risiko

**Hvad konkurrenter gør:** Forening køber lager først, sælger derefter.

**Hvad SMH gør:** Print kun når købt. Foreningen har 0 lager, 0 forudkøb, 0 risiko.

---

# SECTION E: Differentiatorer vs. Alternativer

Hvad er alternativerne foreningen overvejer? Hvad er SMH's specifikke fordele?

## E1. vs. Kageboder + Lotterier (status quo)

| Aspekt | Status quo | StøtMedHjerte |
|---|---|---|
| Frivillig-tid | 5-10 timer per event | 30 min initial setup |
| Indtægt-skala | 1.000-5.000 kr. per event | Løbende, månedlig |
| Geografisk rækkevidde | Lokalt (kommer fysisk) | Hele Danmark (digitalt) |
| Lovlighed | Tilladelse fra kommunen, måske | Indsamlingsnævnet håndteret |
| Sporbarhed | Ofte ingen | Komplet audit-trail |

## E2. vs. Indsamling.dk (kommerciel platform)

| Aspekt | Indsamling.dk | StøtMedHjerte |
|---|---|---|
| Forening-fee | 9% pr. donation | 20% (men inkluderer alt) |
| Antal kanaler | 1 (donationer) | 3 (donation + abonnement + merch) |
| Indsamlingsnævn-håndtering | Dokumentation, foreningen klarer resten | Auto-anmeldelse + auto-regnskab |
| B2C profil/loyalty | Nej | Ja (tier, streak, badges) |
| Webshop | Nej | Ja (print-on-demand) |
| Auto-marketing-materiale | Nej | Ja (SoMe-tekster, QR-koder) |

## E3. vs. BetterNow (international platform)

| Aspekt | BetterNow | StøtMedHjerte |
|---|---|---|
| Dansk forening-fokus | Generel/international | 100% dansk |
| Indsamlingsnævnet-integration | Nej | Ja, automatisk |
| Sprog | Engelsk-domineret | 100% dansk |
| Lokal compliance | Begrænset | 100% (GDPR, Indsamlingsnævn, SKAT) |
| Print-on-demand merch | Nej | Ja |
| Pris-model | 5% + payment fees | 20% (alt inklusivt) |

## E4. vs. Eget Shopify + manuel håndtering

| Aspekt | Egen Shopify | StøtMedHjerte |
|---|---|---|
| Setup-tid | 20-40 timer | Initial registrering + 1-3 dage verificering |
| Månedlig vedligehold | 5-10 timer | 0 timer |
| Lager-håndtering | Foreningen | SMH (ingen lager) |
| Regnskab | Foreningen | SMH (regnskabsoversigt) |
| Indsamlingsnævn | Foreningen | SMH (auto) |
| Multi-foreningsstøtte til samme støtter | Nej | Ja |
| Tier-system | Skal bygges | Inkluderet |

---

# Tværgående Policies

## Policy 1: Konkurrent-beskyttelse

**Aldrig nævn følgende leverandører i marketing:**
- Mollie (sig "specialiseret betalingsudbyder" eller "PCI DSS Level 1-certificeret betalingspartner")
- Frisbii (sig "abonnement-platform" eller "auto-trækning")
- Creditro (sig "specialiseret KYC-platform med MitID")
- Hetzner (sig "EU-hosting (Tyskland)" eller "GDPR-compliant infrastruktur")
- Resend (sig "auto-mails" eller "kommunikationsplatform")
- Dinero/e-conomic (sig "regnskabseksport")
- Shopify (på shop.stotmedhjerte.dk er det OK at nævne; men ikke fortæl at marketing-site er Shopify)
- Supabase (sig "real-time database")

**Udfases ved launch — behøver IKKE skjules længere:**
- ~~Make.com~~ — udfases ved launch
- ~~AirTable~~ — udfases ved launch

**Princippet:** Kommuniker værdi (hvad), aldrig leverandør (hvordan).

## Policy 2: Begge målgrupper i hver beslutning

Hver page, hver section, hver content-stykke skal svare:
1. **Foreningen:** Hvilken værdi får de?
2. **Støtteren:** Hvorfor støtte via SMH?

Hvis kun én er addresseret → revision nødvendig.

## Policy 3: MVP-tal er master

| Kanal | Til forening | Til SMH |
|---|---|---|
| Direkte donation | 80% | 20% |
| Fast Støtte | 80% | 20% (graduates 75/25 ved 30k aktive abos) |
| Webshop merchandise | 32,75% af nettoprofit | 67,25% |
| MOMS_FACTOR | 1,25 (legally binding ADAM 2.0) | |

Live shop's "66%" er deprecated. Skal opdateres.

## Policy 4: Tone of voice

**Match Mario's autentiske stifter-stemme** (fra live shop):
- Direkte, konkret, ærlig
- Ingen oversalgs-overskrifter
- Ingen "game-changing", "revolutionerende", "best-in-class"
- Ja: "Aldrig mere indsamlingsregnskab", "Tjen penge til foreningen — vi klarer det praktiske"
- Førstepersons-perspektiv hvor passende ("Jeg kender frivillig-bøvlet indefra")
- **Almindeligt sprog for B2C** — undgå tekniske termer der får app'en til at virke kompleks

## Policy 5: Visuel identitet (Pulse design system)

**Etablerede patterns:**
- Hero: orbs + grid overlay + scroll-fade
- Cards: stagger-animations
- KPI-tal: counter-roll on scroll-in
- Buttons: hover-lift + shadow-grow
- Backgrounds: subtle parallax på key images
- Brand-farve: #E0193F (rød)
- Sekundære: #7C3AED (Backend lilla), #0891B2 (Admin teal), #E0193F (Supporter rød)
- Font: Elza Round Variable, weight 500, letter-spacing -0.05em, ™ superscript

---

# Hvordan dette dokument bruges af ChatGPT-CMO

**Hver page kræver sin egen dedikerede prompt.** Generic content-requests fungerer ikke — hver side har unikt formål, målgruppe og struktur.

### Per-page prompt-skabelon

For hver page skal der laves en dedikeret prompt der inkluderer:

1. **Page-formål:** Hvad er sidens job? (informere, konvertere, retainere?)
2. **Målgruppe:** B2B forening / B2C støtter / begge?
3. **Reference til deep-dive:** Hvilken section i dette dokument?
4. **Konkurrent-policy:** Konkrete do/don't liste for denne page
5. **Tone of voice:** Match Policy 4 — autentisk Mario-stemme
6. **Sektion-struktur:** Hero → Problem → Solution → CTA, eller anden specifik flow
7. **Word count guidance:** Per sektion
8. **Visuel reference:** Pulse-pattern + brand-policies

### Eksisterende sider (skal opdateres)

For hver eksisterende side skal der laves UNIK prompt der:
- Forklarer den nuværende state (hvad er der nu?)
- Identificerer hvad der skal beholdes vs. ændres
- Specificerer den nye struktur og content

### Nye sider (skal oprettes)

For hver ny side skal der laves UNIK prompt der:
- Forklarer hvorfor siden eksisterer (gap i nuværende site)
- Beskriver komplet wireframe (sektion for sektion)
- Inkluderer konkrete content-eksempler hvor relevant

### Workflow

1. Roadmap identificerer hvilken side der skal arbejdes på (Fase 1)
2. Mario + Claude designer page-wireframe (struktur + content-spec)
3. Claude skriver dedikeret ChatGPT-prompt baseret på wireframe + dette dokument
4. ChatGPT producerer content
5. Mario reviewer + tilretter
6. Claude implementerer i kode

---

# Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial document baseret på platform-recon |
| 1.1 | 5. maj 2026 | Mario's rettelser: onboarding-tid (1-3 dage), kanaler obligatorisk/valgfri, udbetaling-cyklus (efter periode-slut, ikke d. 28), §8A-præcisering, bogføring-præcisering (kun SMH), B2C bruger-oprettelse-krav, Fast Støtte 1 forening ad gangen, B2C tone (almindeligt sprog), Make.com udfases ved launch, ChatGPT-prompts per page |

---

**Næste opdatering forventes:** Når P2-EMAIL-001 (email templates), §8A-skattefradrag, eller MitID-login implementering er live, skal dette dokument opdateres med korrekte details.
