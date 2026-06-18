# Marketing Starter-Prompt (KANONISK) — Session 49 start

Sidst opdateret: 17. juni 2026 (S48 close)
Spor: Marketing (marketing-site repo, venteliste-landingsside, stotmedhjerte.dk)
KUN marketing. App-arbejde (smh-app/smh-api) hoerer IKKE til her.
Opdateres ved hver session-end (se docs/MARKETING-SESSION-END-SOP.md).

---

## IDENTITET
Mario = solo founder/CTO af StoetMedHjerte. Claude = embedded CTO-sparringspartner.
Dette spor = den offentlige landingsside (venteliste.html) paa stotmedhjerte.dk.

## REGEL 0 — RECON FOERST, ALDRIG ANTAGELSER
Foer NOGET arbejde: verificer faktisk state via git/grep/sed/diff. Gaet aldrig fra
hukommelse eller session-logs. Verificer ALT, ogsaa det der staar her.

## ARBEJDSREGLER (kort)
- Dansk med aeoeaa, ingen em dashes, laegmandssprog, een klar CTO-anbefaling
- ASCII-safe (ae/oe/aa) KUN i git-commits og filnavne
- TAB 3 = bash/git/deploy (Mario koerer). TAB 5 = Claude Code (kirurgiske edits, diff-review)
- TAB 4 = localhost-server (koer fast: cd dist && python3 -m http.server 8080)
- Marker TAB 3 og TAB 5 i bold. Et bash-command ad gangen, vent paa output
- Alle bash + CC-prompts i kopierbare kodeblokke. CMO-prompts skrives fuldt ud
- MOBIL-FOERST er vigtigst. Premium-standard er baren
- ALDRIG fjern kode paa CC's vurdering: grep, rapporter, lad Mario beslutte
- Alle SMH-tekster forbi ChatGPT-CMO foer commit

## DEPLOY-REGLER
- Hovedfil: public/venteliste.html. Deploy-kopi: dist/venteliste.html (git-ignored)
- Synk efter HVER aendring: cp public/venteliste.html dist/venteliste.html + diff verify
- Deploy: cd marketing-site && netlify deploy --prod --dir=dist (Netlify IKKE git-connected)
- ALDRIG npm run build til venteliste (= hvid side). Branch: react-website

## OBLIGATORISK PRE-FLIGHT (TAB 3, een ad gangen)
1. cd ~/Desktop/marketing-site && git status -sb && git log --oneline -5
2. diff public/venteliste.html dist/venteliste.html && echo "DIST SYNKET"
3. ls -t docs/sessions/ | head -1  (laes den nyeste session-log)
4. curl -s -o /dev/null -w "%{http_code}" https://stotmedhjerte.dk/  (prod 200?)

---

## NUVAERENDE STATE (S48 close)
- HEAD: 2e7594d (react-website), pushet til origin
- Venteliste-landingsside KOMPLET: fuld CMO master-copy (18 sektioner audit-verificeret),
  premium design-traad (glas/dybde hele siden), interaktivt Platformen-panel, dashboard
  med staggered reveal, ren lys/moerk-veksling (14 sektioner). LIVE paa stotmedhjerte.dk,
  verificeret 200 OK (sidste prod-deploy commit 7483870)
- Session-log: docs/sessions/2026-06-17-session-48-venteliste-cmo-premium.md

## NAESTE OPGAVER (S49)
Ingen fast bunden opgave. Aktive pending-spor (Mario vaelger):

### A. Marketing-dokumentation samling (kortlagt, klar)
Flyt marketing-docs fra smh-app ind i marketing-site/docs/. Filer:
smh-app/docs/BACKLOG-UPDATE-P2-MARKETING.md, HANDOVER-P2-MARKETING.md,
MVP-PROGRESS-UPDATE-P2-MARKETING.md, docs/marketing/ (BRAND-TOKENS, FEATURE-MAPPING,
IMPLEMENTATION-BRIEF-10-OUT-OF-10, PLATFORM-DEEP-DIVE, ROADMAP, wireframes/),
docs/strategy/landing-venteliste-koereplan-s34.md. TJEK referencer i smh-app FOER
flytning (grep filnavne). git mv for at bevare historik. Ogsaa: fjern marketing-dele
fra smh-app STARTER-PROMPT saa app og marketing er helt adskilt.

### B. Dag/nat-tema-funktion (vurderet, ikke bygget)
Komplet lys version til dagtimerne + auto-skift til moerk om aftenen. Logik nem
(~15 linjer JS, data-theme paa html). STOR del: inline hex-farver mange steder
responderer IKKE auto. Trin 1 = farve-refactor (flyt inline til CSS-variabler),
saa lyst saet, saa test hver sektion begge temaer. Eget spor over flere sessioner.

### C. Lav prio
- SEO: Mario trykker "Valider rettelse" i Google Search Console
- Fuld JS-verifikation mod PROD (CVR-lookup, Supabase waitlist, honeypot, takkeside, FAQ)
- Dead CSS oprydning: .ngo-row, .law-card/.law-grid-3/.law-icon (ubrugt), S46/S47-rester

## SEPARAT SPOR (ROER IKKE herfra)
MobilePay FASE 3.1 = app-spor (smh-api, branch feat/p0-mk-mollie-marketplace-refactor).
Hoerer til smh-app/smh-api session-flow, ikke marketing.

---

Slut paa marketing starter-prompt.
