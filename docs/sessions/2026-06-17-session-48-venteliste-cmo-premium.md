# Session 48 — Venteliste-landingsside: CMO master-copy + premium design-tråd

Dato: 17. juni 2026 (nat-session, ca. 00:47–03:45)
Repo: marketing-site
Branch: react-website
Spor: Marketing (venteliste-landingsside)
Status: KOMPLET, deployet til prod, verificeret 200 OK

---

## 1. Formål og resultat

Sessionen forvandlede venteliste.html fra en delvist færdig landingsside til en
komplet, konverteringsdrevet og visuelt premium side. Tre hovedspor blev lukket:

1. SEO-oprydning (dublet-indeksering + webshop-arvegods)
2. Fuld CMO master-copy implementeret og ord-for-ord audit-verificeret (alle sektioner)
3. Premium design-tråd (glas/dybde) på hele siden inkl. interaktivt Platformen-panel,
   dashboard-reveal og lys/mørk-veksling

Alt arbejde er committet (9 commits), pushet til origin/react-website, og deployet
til prod via Netlify CLI. Forsiden verificeret 200 OK på https://stotmedhjerte.dk/.

---

## 2. Commits (kronologisk)

| SHA | Type | Beskrivelse |
|-----|------|-------------|
| ea5ff11 | fix(seo) | Loes dublet-indeksering, ryd webshop-arvegods (301-redirects, 404-regler, ny 404.html) |
| cf36b02 | refactor | Fjern redundant sektion "Samme professionelle standard" |
| 0a38e6a | content | CMO master-copy sektion 1-5 (hero til loesning) |
| 13558b4 | feat | CMO master-copy sektion 6-7 + premium Platformen-panel |
| 1ed7c8d | style | Premium design-tråd paa tvaers af kort-sektioner |
| 3c43c0d | content | Mission CMO-copy + premium-loeft sidste sektioner + moerk hjertesag-card |
| 943c105 | content | Fuld CMO master-copy audit, ret alle afvigelser (18/18 sektioner) |
| 1af5118 | style | Premium-loeft dashboard-preview med staggered reveal |
| 7483870 | refactor | Fjern dublet-sektion + premium Loesningen + lys/moerk-veksling |

---

## 3. SEO-oprydning (ea5ff11)

- 301-redirects i netlify.toml: /venteliste.html → /, /privatlivspolitik.html → /privatlivspolitik
- 404-regler for doede Shopify-prefixes (collections/products/pages/cdn → /404.html)
- Ny public/404.html (Pulse-stil, noindex)
- PENDING: Mario skal trykke "Valider rettelse" i Google Search Console (ikke akut)

---

## 4. CMO master-copy (komplet, audit-verificeret)

CMO leverede komplet loesningsdrevet konverteringscopy for hele siden. Hver sektion
taler direkte TIL foreningen (I/jeres), juridisk sikkert ("bygget til dansk lovgivning",
ikke "vi sikrer lovlighed").

Implementeret OG fuld ord-for-ord audit gennemfoert. Auditten fangede mange afvigelser
der ellers var deployet forkert:

- Vaerdi for jer: 9 afvigelser rettet (broedtekst + fire kort)
- Direkte til foreningen: 7 afvigelser (eyebrow, H2, broedtekst inkl. "roerer ikke
  donorpengene", tre trin, slutlinje)
- Priser: 7 afvigelser (broedtekst, plan-beskrivelser, punkter, prisnote)
- 50.000 (Vigtigt at vide): broedtekst rettet til CMO, animeret flow BEVARET bevidst
- FAQ: tilfoejet manglende spoergsmaal 7 (Kan vi oprette flere hjertesager), opdateret
  svar 6 med indsamlingsregnskab. Nu 12 spoergsmaal (verificeret via grep)
- Footer: footertekst til CMO (kortere, direkte)
- Skriv jer op: form-intro + samtykke-label (loesningen → platformen)
- Takkeside: trust-linje til CMO (bidrag direkte til foreningens egen konto)
- Loesningen, Dashboard-copy, Hero, Mission: verificeret allerede aligned

NGO-NAVNE (Red Barnet/Blaa Kors/UNICEF) FJERNET HELT FRA SIDEN (verificeret grep=0).
Siden taler nu udelukkende direkte til foreningen, ingen sammenligning opad.

Alle broedtekster: <br><br> fjernet, samlet til loebende tekst (Mario-beslutning).

---

## 5. Premium design-tråd (komplet)

Model: system med variation. Rytme: Platformen + Priser + Direkte = "pop" (store
premium-oejeblikke), resten roligt poleret. Faelles tokens: glas-gradient
linear-gradient(150deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)), box-shadow
dybde, farvede ikon-/nummer-rammer.

Premium-loeftede sektioner:
- Platformen (NY): interaktivt glas-panel med fire klikbare faner (Donationer/Fast
  stoette/Hjertesager/Indsamlingsregnskab), backdrop-blur, browser-chrome
- Udfordringen + Lovgivning (problem-card): glas, roed hover-glow
- Vaerdi (value-card): glas, groen hover-glow
- Priser (POP): glas, bundle roed glas-gradient
- Direkte (POP): glas, groent trin fremhaevet
- 50.000 (th-card): glas, animeret flow uroert
- FAQ (faq-item): glas-gradient
- Venteliste (form-card): glas, formular-logik uroert
- Hjertesag demo-card: KONVERTERET fra lyst til moerkt glas-tema (11 farve-vendinger)
- Loesningen (product-card): glas/dybde UDEN hover

Dashboard premium-loeft (1af5118):
- Glas/dybde paa dash-ramme, stat-kort, graf, transaktions-boks
- Staggered reveal: header, fire stat-kort, graf, tx glider ind eet efter eet
- KPI-taeller starter EFTER kortene er glidet ind (koordineret, countUp delay 900ms)
- Integreret i eksisterende IntersectionObserver, ingen ny observer
- Fail-safe: start-tilstand via JS-klasse, saa uden JS er dashboard synligt
- Reduced-motion: ingen reveal, taeller straks
- Reveal-hastighed saenket paa Marios oenske (transition 0.7s, delays spredt)

---

## 6. Lys/moerk-veksling (komplet)

Baggrunds-system: .section = body --base #080E1A (moerk), .section.alt =
--surface-section #0B1424 (lysere) + hairlines.

Tre skift for perfekt alternering: Platformen → alt, Skriv jer op → section (fjern alt),
FAQ → alt. Resultat: L,M,L,M,L,M,L,M,L,M,L,M,L hele vejen ned. Ingen to ens baggrunde
stoeder op. 14 sektioner total efter dublet-fjernelse.

---

## 7. Fjernede sektioner

- "Samme professionelle standard" (cf36b02): dublerede Mission/Loesningen
- "Regler og dokumentation" (law-card, 7483870): ikke i CMO master, dublerede Dansk
  lovgivnings tre-trins-struktur

---

## 8. Workflow og konventioner (bekraeftet i denne session)

- TAB 3 = bash/git/deploy (Mario koerer). TAB 5 = Claude Code, kirurgiske edits, diff-review.
- Synk efter HVER aendring: cp public/venteliste.html dist/venteliste.html + diff verify
- Deploy: cd marketing-site && netlify deploy --prod --dir=dist (Netlify IKKE git-connected)
- ALDRIG npm run build til venteliste (bygger React = hvid side)
- Commits filbaseret (COMMIT_MSG_TMP.txt → git commit -F → rm), ASCII-safe
- Alle SMH-tekster forbi ChatGPT-CMO foer commit
- REGEL 0: verificer ALT via grep/sed foer edit, aldrig antag
- Mobil-foerst er vigtigst

---

## 9. PENDING (til S49)

### A. Marketing-dokumentation samling (kortlagt, klar til udfoersel)
Flyt al marketing-relateret dokumentation fra smh-app ind i marketing-site/docs/.
Filer der skal flyttes (fra smh-app):
- docs/BACKLOG-UPDATE-P2-MARKETING.md
- docs/HANDOVER-P2-MARKETING.md
- docs/MVP-PROGRESS-UPDATE-P2-MARKETING.md
- docs/marketing/ (hele mappen: BRAND-TOKENS, FEATURE-MAPPING,
  IMPLEMENTATION-BRIEF-10-OUT-OF-10, PLATFORM-DEEP-DIVE, ROADMAP, wireframes/)
- docs/strategy/landing-venteliste-koereplan-s34.md
VIGTIGT: tjek for referencer i smh-app FOER flytning (grep efter filnavne). Brug git mv
hvis muligt for at bevare historik. Udfoeres med friske oejne, ikke nat.

### B. Dag/nat-tema-funktion (vurderet, ikke bygget)
Mario oensker komplet lys version til dagtimerne + auto-skift til moerk om aftenen.
Teknisk muligt. Logik (JS tjekker klokkeslaet → data-theme paa <html>) er nem (~15 linjer).
STOR del: siden har farver TO steder — CSS-variabler (lette: lav [data-theme="light"]-saet)
OG inline hex i markup (mange: dashboard, demo-card, Platformen, 50.000, ikon-baggrunde —
responderer IKKE auto). Komplet lys version kraever foerst farve-refactor (flyt inline til
variabler), saa lyst saet, saa test hver sektion i begge temaer. Eget spor over flere
sessioner. Anbefaling: trin 1 = farve-refactor (forbedrer ogsaa koden).

### C. Mindre / lav prio
- SEO: Mario trykker "Valider rettelse" i Search Console
- Fuld JS-verifikation mod PROD (CVR-lookup 36909722, Supabase waitlist-insert, honeypot,
  takkeside, FAQ-accordion) — kun paa rigtigt domaene pga CORS
- Dead CSS oprydning: .ngo-row, .law-card/.law-grid-3/.law-icon (nu ubrugt), S46/S47-rester
- Mario hard-refresh prod (Cmd+Shift+R) desktop + mobil for endelig visuel bekraeftelse

---

## 10. Filer og deploy-state

- Hovedfil: marketing-site/public/venteliste.html
- Deploy-kopi: marketing-site/dist/venteliste.html (git-ignored)
- Backups (ROER IKKE): venteliste.html.backup-0448, venteliste.html.backup-s45
- Prod: https://stotmedhjerte.dk/ (Netlify, manuel CLI-deploy)
- Sidste deploy: commit 7483870, verificeret 200 OK

---

## 11. CSS-konvention (Pulse)

Variabler: --base #080E1A, --surface-section #0B1424, --surface-card #101B2D,
--surface-card-2 #132238, --red #E0193F, --red-light #FCA5B5, --green #22C55E,
--green-light #5DCAA5, --text #F8FAFC, --text-2 rgba(248,250,252,0.78),
--text-3 rgba(248,250,252,0.50), --hairline rgba(255,255,255,0.08).
Premium-ikonfarver: Donationer #A78BFA, Fast stoette #E0193F, Hjertesager #5DCAA5,
Indsamlingsregnskab #85B7EB. Fonts: --display 'Inter Tight', --body 'Inter', --mono
'IBM Plex Mono'.

---

Slut paa Session 48-log.
