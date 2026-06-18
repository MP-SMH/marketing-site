# Landing + venteliste koereplan (Shopify-exit + pre-launch venteliste)

Oprettet: Session 34, 8. juni 2026
Status: FASE A+B GENNEMFOERT S35 (med afvigelser, se noter). FASE C (domaene-skifte) + B1b (env-vars) udestaar.
Relateret: marketing-site repo (Netlify, Vite + React + shadcn/ui, HashRouter).

## Formaal
Erstat Shopify-siden paa stotmedhjerte.dk med den faerdige marketing-site, og
indsaml forenings-opskrivninger (venteliste) indtil platformen er klar. Shopify
fjernes helt (ren model: kan ikke have webshop uden at roere pengene).
Nul dodt vindue: byg og test ALT foer Shopify/DNS roeres.

## Strategi (besluttet S34)
Vis HELE den faerdige site (19 sider, inkl. 5 SEO-sportssider). "Opret forening"
-> venteliste-formular (ikke det tunge live-onboarding, som afhaenger af MobilePay).
Naar platform klar: skift venteliste -> rigtig onboarding. Data ejes af SMH i
Supabase (waitlist-tabel), ses i admin.

## Arkitektur (afgjort via recon S34)
- PROJEKT-KORTLAEGNING (verificeret S34): Sandbox (vyorvmnjfhoelcakbmtq) = KUN
  platform-demoer, roeres ikke. smh-staging (ekxscdhdjcbfbpardhhj) = brugt som
  RLS-testbed. Produktion (mqehrwipzfypnniqnldt) = marketing-site/beta bruger
  DENNE. waitlist hoerer derfor i Produktion, ikke staging/sandbox.
- marketing-site har direkte Supabase-klient (anon-key, RLS-beskyttet) i
  src/lib/supabaseClient.js -> venteliste-side skriver direkte til waitlist-tabel.
  INGEN nyt smh-api-endpoint noedvendigt.
- waitlist RLS (kritisk, omvendt af consent_versions): anon INSERT TILLADT,
  anon SELECT/UPDATE/DELETE NAEGTET (persondata: CVR+email+kontakt). Kun
  service_role laeser (admin via Hetzner).
- OpretForeningPage.jsx (2176 l) roeres IKKE - bundet til live-onboarding-flow,
  ligger uroert til platform klar.

## FASE A - BYG (roerer ikke Shopify/DNS - nul risiko)
[DONE] A1 waitlist-tabel oprettet i PRODUKTION (mqehrwipzfypnniqnldt) S34.
       RLS empirisk bevist: anon INSERT lykkes, anon SELECT = 0 raekker (fail-closed).
       2 policies (anon INSERT, service_role ALL). Index paa (status, created_at).
       Migration versioneret: supabase/migrations/20260608090000_add_waitlist_table.sql.
       NB: testet foerst paa smh-staging (samme SQL bevist groen) foer prod.
       SQL Editor kraever auto-commit-version (uden BEGIN/COMMIT) - filen beholder
       BEGIN/COMMIT til fremtidig supabase db push. Felter: kontaktperson,
       forening_navn, cvr, sportsgren, antal_medlemmer, email, marketing_consent,
       created_at. RLS: anon INSERT only, service_role full. Verificer RLS empirisk.
[DONE-AFVIGELSE] A2 (S35): Bygget IKKE som VentelistePage.jsx React-komponent.
       I stedet selvstaendig statisk side public/venteliste.html i marketing-site,
       baseret paa Shopify password-sidens stil (Mario-godkendt retning). Fuld
       tragt: hero+dashboard-mockup (2 kanaler, ingen webshop), problem, platform
       (4 kort inkl. Donationer), pris, lovgivning (indsamlingstilladelse naevnt),
       tryghed, formular, footer. CMO-tekst v2 indsat (go-to-positionering,
       foreninger+klubber, Jytte-sikkert sprog). Formular skriver til waitlist via
       supabase-js CDN-klient (ikke FormField/ConsentModal). Commit 613ee89
       (HeroSection webshop-rens + netlify.toml). venteliste.html IKKE committet
       endnu (anon-key indlejret - flyttes til config.js S36 foer commit).
[DONE-AFVIGELSE] A3 (S35): Loest IKKE via App.jsx React-rute. I stedet
       netlify.toml force-redirect: rod + /index.html -> /venteliste.html.
       Beta-roden viser nu venteliste-siden. OpretForeningPage urort.
[DONE] A4 (S35): Testet lokalt + verificeret ende-til-ende. Test-opskrivning
       landede i Produktion-waitlist (alle felter korrekt, CVR 8-cifret godkendt,
       status pending). Test-data slettet bagefter (COUNT=0 verificeret).

## FASE B - DEPLOY + VERIFICER (paa Netlify-URL, Shopify urort)
[DONE] B1 waitlist findes allerede i Produktion (gjort i A1 S34).
[OMGAAET-S35] B1b: Netlify env-vars IKKE sat. Anon-key lagt direkte i
       venteliste.html i stedet (pragmatisk). TEKNISK GAELD: flyt til config.js
       eller Netlify-env S36 foer venteliste.html committes. Set ellers env:
       -> Produktion (mqehrwipzfypnniqnldt). UDEN disse crasher beta (Supabase config
       missing). Netlify har i dag KUN NODE_VERSION sat. .env* er gitignored = ikke i build.
[DONE] B2 (S35): Deployet til beta via netlify CLI (netlify deploy --prod
       --dir=dist). 3 deploys: foerste (manglende redirect), anden (force-redirect),
       tredje (CMO-tekst v2). Beta linket til smh-beta projekt.
[DONE] B3 (S35): Verificeret paa beta.stotmedhjerte.dk i inkognito. Side vises
       korrekt som forside. (Opskrivning bevist E2E i A4 mod samme Produktion-DB.)

## FASE C - DOMAENE-SKIFTE (eneste der roerer Shopify/DNS - KUN naar B bevist)
[TODO] C1 HashRouter -> BrowserRouter (rene URLs). Verificer alle ruter virker.
[TODO] C2 Peg stotmedhjerte.dk DNS (Simply.com) -> Netlify.
[TODO] C3 Verificer live paa stotmedhjerte.dk, derefter luk Shopify ned helt.

## FASE D - SENERE (naar platform klar)
[TODO] D1 Skift venteliste -> rigtig onboarding (genaktiver OpretForeningPage-flow).
[TODO] D2 Migrer venteliste-foreninger til faktisk onboarding.

## KENDTE SMAATING
- marketing-site har mange .backup + .v4-v12 dubletter (HeroSection v9-12, Pricing
  v5-8). Cleanup-debt, ikke dagens opgave. Rediger ALTID filen uden suffix.
- HashRouter-kommentar i App.jsx bekraefter Shopify-migration allerede paataenkt.
