# Marketing Session 49 - Dag/nat-tema: farve-refactor + lyst tema-fundament

Dato: 18. juni 2026
Spor: Marketing (marketing-site, react-website, public/venteliste.html)
HEAD ved slut: 156ae09 (pushet til origin)
Sidste prod-deploy: UAENDRET (intet deployet - moerkt tema er live som foer)

## RESUME
1. Marketing-docs samling (A) - 23 docs kopieret smh-app -> marketing-site/docs/. Commit 78d6c0c.
2. Dag/nat-tema FASE 0-2 (B) - fuld farve-refactor til tema-bar CSS-variabler + lyst
   tema-fundament. Commit 156ae09. Moerkt tema PIXEL-IDENTISK gennem hele forloebet (Playwright).

## OPGAVE A - MARKETING-DOCS (halvt faerdig)
GJORT: 23 filer kopieret (3 P2-MARKETING, docs/marketing/ 5+14 wireframes, strategy-fil).
Byte-identisk. Commit 78d6c0c.
MANGLER: fjernelse fra smh-app (kopi-foerst, intet slettet). Goeres paa separat branch fra MAIN.
Strategy-filen findes KUN paa feat-branchen. Migration 20260608 peger paa den - checksum-laast,
roeres IKKE. Opdater smh-app STARTER-PROMPT.

## OPGAVE B - DAG/NAT-TEMA

### Arkitektur (FAERDIG + bevist)
Alle farver -> CSS-variabler i :root:
- glas: --glas-flade, --glas-001..010, --glas-003b
- kanter: --hairline, --hairline-soft, --kant-10/12/14/16/20
- tekst: --text, --text-2/3, --text-40/45/50/60/70, --tekst-tm/staerk, --markoer
- grid: --grid-linje ; moerke flader: --flade-hcard/takke/float1/float2
- ACCENTER som kanal-variabler: --c-roed: 224,25,63 og --c-groen: 34,197,94
  (alle roede/groenne rgba bruger rgba(var(--c-roed),X) - tema-bart fra eet sted)

### Lyst tema-fundament (BYGGET, ikke faerdigt)
[data-theme="light"] blok efter :root:
- --base: #FBFCFE (rettet fra #F4F6FA - for graalig)
- tekst: rgba(15,27,46,X) ; glas/kanter: sort-alpha rgba(8,14,26,X)
- accenter lyst: --c-groen: 21,160,74 (#15A04A valgt), --c-roed: 193,18,46 (#C1122E)

### MANGLER FINISH (lyst tema IKKE aktiveret)
1. BLOEDE SKYGGER (vigtigst). Sort-alpha rgba(0,0,0,X) ikke tema-bar. Goer til kanal-variabel
   + kort til bloed DOBBELT-skygge i lyst tema. Uden dette ser kort flade/"beskidte" ud.
2. BLOEDERE SEKTIONSOVERGANGE - haard kant .section/.section.alt. Saet op systematisk.
3. KONTRAST-TJEK hele siden. Svage: groen pille, nummer-bokse 01/02/03, mission-citat,
   "direkte til jer" groent kort.
4. PARKEREDE: .hcard-badge (#F8FAFC+#15406B), .hcard-avatar (#E6F1FB+#15406B),
   dropdown-pil (%23ffffff80), lyse accent-hex (#FCA5B5/#5DCAA5/#A78BFA),
   opake --green/--green-light i light-blok (boer matche #15A04A).
5. html inline-bg + meta theme-color (#080E1A linje 2/6) - JS ved tema-skift.
6. PREMIUM TOGGLE dag/nat + auto-skift + husk valg + flash. FASE 3.
7. DASHBOARD (animeret hero) - bevar "som normalen", roer ikke.

### VERIFIKATIONS-VAERKTOEJ
Playwright i ~/Desktop/smh-visual-baseline (udenfor repo):
- capture.mjs <label> = mobil+desktop fuldside fra localhost
- diff.mjs baseline <label> = pixel-diff. "PIXEL-IDENTISK" = moerkt tema uroert.
- Preview lyst: dist/preview-lys.html via sed (data-theme=light + bg #FBFCFE),
  localhost:8080/preview-lys.html. IKKE i git, slet foer deploy.

### DEPLOY-STATUS
INTET deployet. Moerkt tema fortsat live og uaendret.

## NAESTE SESSION
1. Bloede skygger  2. Sektionsovergange  3. Parkerede + lyse accent-hex
4. Kontrast-tjek  5. FASE 3 toggle+JS  6. FASE 4 test+deploy
(Sideopgave: faerdiggoer A - fjern marketing-docs fra smh-app)
