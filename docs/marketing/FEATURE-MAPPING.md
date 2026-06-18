# Feature-to-Page Mapping (Trin 1)

**Version:** 1.0 — udkast til review
**Dato:** 5. maj 2026
**Formål:** Master-tabel der mapper alle MVP-features til marketing-sider. Bruges som checkliste i alle ChatGPT-briefs.

**Ekskluderet fra mapping:** `/opret-stoetter`, `/opret-forening`, `/login-stoetter`, `/login-forening` (handlings-/auth-sider, ikke marketing-content).

---

## Marketing-sider (15+ sider i scope)

### Eksisterende sider
1. `/` — Home
2. `/foreninger` — B2B hub
3. `/hjertesager` — B2C browse
4. `/saadan-virker-det` — Process explanation
5. `/priser` — Pricing
6. `/om-os` — Trust + mission
7. `/blog` — Content marketing (placeholder)
8. `/faq` — Support
9. `/kontakt` — Lead capture
10. `/book-moede` — Sales meeting
11. `/support` — Help
12. `/fast-stoette` — B2C product
13. `/betingelser` — Legal
14. `/privatlivspolitik` — Legal
15. `/cookiepolitik` — Legal

### Nye sider (inkluderet i mapping)
16. `/sikkerhed` — Compliance deep-dive (NY, F1-19)
17. `/stotter` ELLER integreret i Home — B2C foundation (NY, F1-10)
18. `/forening/fodbold` — Sport-vertical (NY)
19. `/forening/haandbold` — Sport-vertical (NY)
20. `/forening/gymnastik` — Sport-vertical (NY)
21. `/forening/svoemmning` — Sport-vertical (NY)
22. `/forening/loeb` — Sport-vertical (NY)

---

## MVP-Features Mapping

Hver feature skal kommunikeres på mindst én **Primary** side. Secondary side er reinforcement.

### B2B Features (forenings-værdi)

| # | Feature | Primary side | Secondary side | Audience | Note |
|---|---|---|---|---|---|
| F01 | **Indsamlingsnævnet auto** (KEY DIFFERENTIATOR) | /foreninger | /sikkerhed, /faq | B2B | Deep-dive section needed |
| F02 | Indsamlings-regnskab auto | /foreninger | /saadan-virker-det | B2B | |
| F03 | 30-dages reminder før frist | /sikkerhed | /foreninger | B2B | Compliance peace-of-mind |
| F04 | 50.000 kr. revisor-grænse auto | /sikkerhed | /faq | B2B | |
| F05 | Synlig nedtælling til fornyelse | /foreninger | /sikkerhed | B2B | |
| F06 | Auto-genereret ansøgningstekst | /saadan-virker-det | /foreninger | B2B | Step 4 i onboarding |
| F07 | KYC + MitID-verificering | /sikkerhed | /foreninger, /saadan-virker-det | B2B | 1-3 dages tidsforventning |
| F08 | CVR + kreditvurdering auto | /saadan-virker-det | /foreninger | B2B | |
| F09 | 3 indkomstkanaler i én platform | /foreninger | / (Home) | B2B | Hjertesager + Fast Støtte + Webshop |
| F10 | Hjertesager (op til 5 aktive) | /foreninger | /hjertesager | begge | Obligatorisk kanal |
| F11 | Fast Støtte tier-system | /foreninger | /fast-stoette | begge | Obligatorisk kanal |
| F12 | Webshop print-on-demand | /foreninger | /faq | B2B | Valgfri kanal |
| F13 | Auto-mails (kvitteringer, taks) | /foreninger | /sikkerhed | B2B | KEY DIFFERENTIATOR |
| F14 | Månedlig newsletter | /foreninger | - | B2B | |
| F15 | Reminder-mails ved abonnement | /foreninger | - | B2B | |
| F16 | Kommunikations-log | /foreninger | - | B2B | |
| F17 | Auto-genererede SoMe-tekster | /foreninger | /saadan-virker-det | B2B | KEY DIFFERENTIATOR |
| F18 | QR-koder per kanal | /foreninger | /saadan-virker-det | B2B | |
| F19 | SMS/Facebook/Email tekster auto | /foreninger | - | B2B | |
| F20 | Profilscore (0-100%) | /saadan-virker-det | /foreninger | B2B | |
| F21 | AdminDashboard m. 4 KPI'er | /foreninger | /saadan-virker-det | B2B | Erstat fake "live feed" |
| F22 | 3 indkomstkanaler trackes separat | /foreninger | - | B2B | |
| F23 | Månedlig regnskabsoversigt | /foreninger | /sikkerhed | B2B | KEY DIFFERENTIATOR (NY framing) |
| F24 | Indsamlings-regnskab eksport | /sikkerhed | /foreninger | B2B | |
| F25 | Afregningsbilag per udbetaling | /priser | /foreninger | begge | Trust |
| F26 | Dokument-arkiv | /foreninger | - | B2B | |
| F27 | Udbetaling efter periode-slut | /priser | /foreninger, /faq | begge | Cycle explanation |
| F28 | 80% donation til forening | /priser | / (Home), /foreninger | begge | Pricing |
| F29 | 80% Fast Støtte til forening | /priser | / (Home), /fast-stoette | begge | Pricing |
| F30 | 32,75% Webshop til forening | /priser | / (Home), /foreninger | begge | Pricing |
| F31 | GDPR-compliance | /sikkerhed | /privatlivspolitik | begge | Trust |
| F32 | PCI DSS Level 1 betalinger | /sikkerhed | /faq | begge | Trust |
| F33 | Audit-trail | /sikkerhed | - | B2B | |
| F34 | Gratis at komme i gang | / (Home) | /priser, /foreninger | B2B | Hovedløfte |
| F35 | Ingen lager / forudkøb | /foreninger | /faq | B2B | Webshop differentiator |
| F36 | Ingen binding (min. 1 udbetaling) | /priser | /faq | B2B | |

### B2C Features (støtter-værdi)

| # | Feature | Primary side | Secondary side | Audience | Note |
|---|---|---|---|---|---|
| F37 | Bruger-konto kræves | /stotter ELLER Home-section | /faq | B2C | Vigtig forudsætning |
| F38 | Tier-system (Bronze→Diamant) | /stotter | / (Home) | B2C | KEY ENGAGEMENT |
| F39 | Streak-tracking (måneder i træk) | /stotter | - | B2C | |
| F40 | Milestone-badges | /stotter | - | B2C | |
| F41 | Aktivitetsfeed | /stotter | - | B2C | |
| F42 | Multi-engagement (mange foreninger) | /stotter | /hjertesager | B2C | Obs: Fast Støtte = 1 ad gangen |
| F43 | Fast Støtte = 1 forening ad gangen | /fast-stoette | /stotter, /faq | B2C | Vigtig præcisering |
| F44 | Pause/opsig instant | /fast-stoette | /stotter, /faq | B2C | Trust |
| F45 | Email-kvittering indenfor 1 min | /sikkerhed | /faq | B2C | Trust |
| F46 | Anonymitets-præferencer | /privatlivspolitik | /faq | B2C | GDPR |
| F47 | Sektor-farvekoder | /stotter | - | B2C | Visual feature |
| F48 | Vælg hjertesag ved webshop checkout | /hjertesager | /fast-stoette | B2C | |
| F49 | MobilePay (kræver MSN-aftale) | /faq | /priser | begge | Conditional |
| F50 | Apple Pay + Google Pay | /faq | /priser | begge | |
| F51 | Visa + Mastercard + Shop Pay | /faq | /priser | begge | |
| F52 | 3D Secure / SCA | /sikkerhed | - | B2C | Trust |

### Tværgående Features

| # | Feature | Primary side | Secondary side | Audience | Note |
|---|---|---|---|---|---|
| F53 | Mario stifter-historie | /om-os | / (Home) | begge | Trust + autenticitet |
| F54 | EU-hosting (Tyskland) | /sikkerhed | /privatlivspolitik | begge | Trust |
| F55 | Verificerede foreninger | /stotter | /sikkerhed, /hjertesager | B2C | Trust |
| F56 | 40+ foreningstyper | /foreninger | / (Home) | B2B | Bred dækning |
| F57 | Mario som direct-contact | /kontakt | /book-moede | B2B | Sales |

---

## Per-Page Coverage Check

Hver side skal have **mindst 3-5 features** at kommunikere. Hvis færre → siden er unødvendig eller features mangler.

| Side | Antal features (Primary) | Status |
|---|---|---|
| `/` Home | F09, F28, F29, F30, F34, F38, F53 | ✅ 7 — solid |
| `/foreninger` | F01, F02, F09, F10, F11, F12, F13–F19, F21, F22, F23, F26, F27, F35, F56 | ✅ 17+ — primary B2B hub |
| `/hjertesager` | F10, F48, F55 | 🟡 3 — kan være fint hvis det er listing-side |
| `/saadan-virker-det` | F06, F08, F17, F18, F20 | ✅ 5 — proces-fokus |
| `/priser` | F25, F27, F28, F29, F30, F36 | ✅ 6 — pricing-fokus |
| `/om-os` | F53 + Mario story content | 🟡 Skal udvides — kun 1 mapped feature |
| `/blog` | (content-pipeline) | N/A — ikke feature-fokuseret |
| `/faq` | F03, F04, F36, F43, F44, F45, F49, F50, F51 | ✅ 9 — solid |
| `/kontakt` | F57 | 🟡 1 — udvid med form-spec |
| `/book-moede` | F57 + sales-pitch content | 🟡 Skal udvides |
| `/support` | (helpdesk-content) | N/A |
| `/fast-stoette` | F11, F29, F43, F44 | ✅ 4 — Fast Støtte deep-dive |
| `/sikkerhed` (NY) | F03, F04, F07, F24, F31, F32, F33, F45, F52, F54 | ✅ 10 — compliance hub |
| `/stotter` (NY) | F37, F38, F39, F40, F41, F42, F47, F55 | ✅ 8 — B2C foundation |
| `/forening/[sport]` (5 NY) | F09, F10, F11 + sport-specifik content | ✅ Per side: 3 + custom |

**Røde flag:**
- `/om-os` har kun F53 mapped → skal have content udvidet med values, mission, vision (ikke features per se)
- `/hjertesager` har kun 3 mapped → fint hvis det er listing/browse-side med dynamisk content

---

## KEY DIFFERENTIATORS — under-marketed (audit-fund)

Disse skal have ekstra **emphasis** i marketing:

| Feature | Hvorfor |
|---|---|
| F01 Indsamlingsnævnet auto | Største pain point for danske foreninger |
| F13 Auto-mails | Reducerer foreningens kommunikations-arbejde |
| F17 Auto-SoMe-tekster | Reducerer marketing-arbejde |
| F23 Månedlig regnskabsoversigt | Kommunikeres ikke nok |
| F38 Tier-system (B2C) | Engagement-driver |

---

## Cross-cutting Compliance Check

Følgende SKAL være på hver side hvor de er relevante:

- ✅ **Konkurrent-beskyttelse:** Ingen leverandør-mentions
- ✅ **MVP-tal master:** 80% / 80% / 32,75% (live shop's 66% er forkert)
- ✅ **Begge audiences:** Hver page skal adressere relevant audience
- ✅ **Tone of voice:** Mario-autentisk, almindeligt sprog (ikke teknisk)
- ✅ **Content-policy:** §8A IKKE marketed som aktiv feature pre-launch

---

## Mapping-completion check

**57 features mapped.** Hver feature har:
- ✅ Primary side
- ✅ Audience (B2B / B2C / begge)
- ✅ Note hvor relevant

**Næste step (Trin 2):** Per-page wireframes baseret på denne mapping.

---

## Versionshistorik

| Version | Dato | Ændringer |
|---|---|---|
| 1.0 | 5. maj 2026 | Initial udkast — 57 features mapped på tværs af 22 sider |
