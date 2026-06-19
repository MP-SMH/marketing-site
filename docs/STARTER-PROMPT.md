# Marketing Starter-Prompt (KANONISK) — Session 50 start

Sidst opdateret: 18. juni 2026 (S49 close). Seneste session-log: docs/sessions/2026-06-18-session-49-dag-nat-tema-fundament.md. HEAD: 156ae09.
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
STATUS S49: 23 docs ER kopieret til marketing-site/docs/ (commit 78d6c0c). MANGLER:
fjernelse fra smh-app (intet slettet endnu). Goeres paa separat branch fra smh-app MAIN
(ikke feat-branchen). Strategy-filen findes KUN paa feat-branchen. Migration 20260608
peger paa strategy-filen - checksum-laast, roeres IKKE. Fjern stadig marketing-dele fra
smh-app STARTER-PROMPT.

### B. Dag/nat-tema-funktion (FASE 0-2 faerdig, mangler finish)
STATUS S49: FASE 0-2 FAERDIG (commit 156ae09). Alle farver refactoreret til CSS-variabler
i :root (glas/kanter/tekst/flader + accent-kanal-variabler --c-roed/--c-groen). Moerkt tema
bevist PIXEL-IDENTISK hele vejen (Playwright i ~/Desktop/smh-visual-baseline). Lyst
tema-fundament bygget: [data-theme=light] blok med --base #FBFCFE, moerkeblaa tekst,
sort-alpha glas, accenter #15A04A/#C1122E. IKKE aktiveret endnu (ingen toggle, intet deployet).
MANGLER FINISH (se session-49-log for fuld liste): 1) bloede skygger (sort-alpha ikke
tema-bar endnu - vigtigst), 2) bloedere sektionsovergange (systematisk), 3) kontrast-tjek
hele siden, 4) parkerede elementer (badge/avatar/dropdown-pil/lyse accent-hex), 5) html-bg
+ meta theme-color via JS, 6) premium toggle + auto-skift (FASE 3), 7) dashboard bevares urort.

### C. Lav prio
- SEO: Mario trykker "Valider rettelse" i Google Search Console
- Fuld JS-verifikation mod PROD (CVR-lookup, Supabase waitlist, honeypot, takkeside, FAQ)
- Dead CSS oprydning: .ngo-row, .law-card/.law-grid-3/.law-icon (ubrugt), S46/S47-rester

## SEPARAT SPOR (ROER IKKE herfra)
MobilePay FASE 3.1 = app-spor (smh-api, branch feat/p0-mk-mollie-marketplace-refactor).
Hoerer til smh-app/smh-api session-flow, ikke marketing.

---

Slut paa marketing starter-prompt.
