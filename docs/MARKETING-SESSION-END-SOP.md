# Marketing Session-End SOP (KANONISK)

Gaelder KUN marketing-sporet (marketing-site repo: venteliste-landingsside,
stotmedhjerte.dk). Holdes 100% adskilt fra smh-app/smh-api (app-platformen har
sin egen SESSION-END-SOP med MVP-PROGRESS, compute-script og BACKLOG-rotation,
som IKKE gaelder her).

Formaal: hver marketing-session lukkes rent og efterlader naeste session et
komplet, verificeret udgangspunkt. Sidste step genererer ALTID en komplet
starter-prompt i kopierbar blok.

---

## REGEL 0 — RECON FOERST, ALDRIG ANTAGELSER
Foer NOGET arbejde og foer hvert step i denne SOP: verificer faktisk state via
git/grep/sed/diff. Gaet aldrig fra hukommelse eller session-logs. Verificer ALT,
ogsaa det der staar her.

---

## ARBEJDSREGLER (ufravigelige, marketing-spor)
- Dansk med aeoeaa i chat og HTML-indhold, ingen em dashes, laegmandssprog
- ASCII-safe (ae/oe/aa) KUN i git-commits og filnavne
- Een klar CTO-anbefaling med argument, ikke en menu af valgmuligheder
- TAB 3 = bash/git/deploy (Mario koerer). TAB 5 = Claude Code (kirurgiske edits,
  diff-review hunk-for-hunk). TAB 4 = localhost-server (koerer fast hele sessionen)
- Marker ALTID TAB 3 og TAB 5 tydeligt i bold. Et bash-command ad gangen, vent paa output
- Alle bash-commands OG CC-prompts ALTID i kopierbare kodeblokke
- Alle SMH-tekster forbi ChatGPT-CMO foer commit (CMO-prompts skrives fuldt ud)
- MOBIL-FOERST er vigtigst: design mobil korrekt fra start, ikke ret bagefter
- ALDRIG fjern kode paa CC's vurdering: grep, rapporter, lad Mario beslutte
- Premium-standard ("flot og premium") er baren

---

## DEPLOY-REGLER (marketing-spor)
- Hovedfil: public/venteliste.html. Deploy-kopi: dist/venteliste.html (git-ignored)
- Synk efter HVER aendring: cp public/venteliste.html dist/venteliste.html + diff verify IDENTISK
- Deploy: cd marketing-site && netlify deploy --prod --dir=dist
- Netlify er IKKE git-connected: deploy er SEPARAT fra git-push (begge skal koeres)
- ALDRIG npm run build til venteliste (bygger React = hvid side)
- Commits filbaseret: COMMIT_MSG_TMP.txt → git commit -F → rm. Atomic Conventional Commits, ASCII-safe
- Branch: react-website. Repo: github.com/MP-SMH/marketing-site

---

## SESSION-END PROCEDURE (7 steps)

### Step 0 — Recon af state
TAB 3:
  cd ~/Desktop/marketing-site && git status -sb && git log --oneline -5 && diff public/venteliste.html dist/venteliste.html && echo "DIST SYNKET"
Bekraeft: hvilke commits er lavet, er der uncommitteret arbejde, er dist synket.

### Step 1 — Verificer alt kode-arbejde er committet
Intet maa ligge uncommitteret. Hvis der er aendringer: stage, commit (filbaseret
besked), push FOER vi gaar videre. Hver commit = atomic, Conventional, ASCII-safe.

### Step 2 — Verificer deploy
TAB 3:
  cd ~/Desktop/marketing-site && diff public/venteliste.html dist/venteliste.html && echo "SYNKET" && curl -s -o /dev/null -w "%{http_code}" https://stotmedhjerte.dk/ && echo " - prod OK"
Forventet: SYNKET + 200. Hvis ikke deployet i denne session og der er aendringer:
koer netlify deploy --prod --dir=dist foerst.

### Step 3 — Skriv session-log
Opret docs/sessions/AAAA-MM-DD-session-NN-kort-titel.md. Foelg strukturen fra
seneste log (se docs/sessions/, tag den nyeste som skabelon). Skal indeholde:
formaal/resultat, commit-tabel (SHA + type + beskrivelse), hver arbejdsblok
detaljeret, beslutninger med begrundelse, PENDING-spor til naeste session, fil/
deploy-state, CSS-konvention. 100% komplet (solo-founder backup + CTO-overdragelse).

### Step 4 — Opdater pending/backlog
Opdater docs/BACKLOG.md (hvis den findes) med pending-spor fra sessionen. Hvis
en pending-opgave er lukket, marker den. Saa pending lever eet fast sted, ikke
kun i session-logs.

### Step 5 — Opdater kanonisk STARTER-PROMPT
Opdater docs/STARTER-PROMPT.md (marketing-version) saa den afspejler nyeste state:
HEAD-SHA, hvad der er live, naeste opgave(r), aktive pending-spor. Denne fil er
KUN marketing (aldrig app-arbejde blandet ind).

### Step 6 — Atomic commit + push af dokumentation
TAB 3 (filbaseret besked):
  cd ~/Desktop/marketing-site && cat > COMMIT_MSG_TMP.txt << EOF_MSG
  docs: session NN session-end (log + starter-prompt + backlog)
  EOF_MSG
  git add docs/ && git commit -F COMMIT_MSG_TMP.txt && rm COMMIT_MSG_TMP.txt && git push origin react-website

### Step 7 — GENERER KOMPLET STARTER-PROMPT I BLOK (ALTID, hver gang)
Dette er det obligatoriske sidste step. Output en komplet, kopierbar prompt-blok
som Mario kan paste direkte ind i naeste session. Den SKAL indeholde:
1. Identitet + spor (marketing, venteliste, stotmedhjerte.dk)
2. REGEL 0 + arbejdsregler (kort)
3. Deploy-regler (kort)
4. Obligatorisk pre-flight (git state + laes nyeste session-log)
5. Naeste opgave(r) konkret
6. Aktive pending-spor
7. HEAD-SHA + live-state
Blokken skrives ALTID fuldt ud i kodeblok, aldrig en reference til "se filen".

---

## VERIFY (session-end komplet naar alle PASS)
- [ ] Git status rent (intet uncommitteret)
- [ ] Alle session-commits pushet til origin/react-website
- [ ] dist synket med public (diff IDENTISK)
- [ ] Prod svarer 200 (hvis deployet i sessionen)
- [ ] Session-log skrevet i docs/sessions/
- [ ] STARTER-PROMPT.md opdateret (marketing-only)
- [ ] Dokumentation committet + pushet
- [ ] Komplet starter-prompt genereret i blok (Step 7)

---

Slut paa Marketing Session-End SOP.
