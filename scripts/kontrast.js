#!/usr/bin/env node
// Kontrastmaaler for StoetMedHjerte. WCAG 2.1 relativ luminans.
// Kilde paa formlen: WCAG 2.1, definition af contrast ratio.
//
// SMH-tegrsklen (laast S87):
//   tekst 14px og derover .... 4,5:1
//   tekst under 14px ......... 5,5:1
//   grafik uden tekst ........ 3,0:1
//
// Brug:
//   node scripts/kontrast.js                      koer den faste liste
//   node scripts/kontrast.js "#E0193F" "#FFFFFF" 13.5   koer eet par

function kanal(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminans(hex) {
  const h = hex.replace('#', '').trim();
  if (!/^[0-9A-Fa-f]{6}$/.test(h)) throw new Error('Ugyldig hex: ' + hex);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
}

function forhold(a, b) {
  const la = luminans(a);
  const lb = luminans(b);
  const lys = Math.max(la, lb);
  const moerk = Math.min(la, lb);
  return (lys + 0.05) / (moerk + 0.05);
}

function krav(px) {
  if (px === 'grafik') return 3.0;
  return px < 14 ? 5.5 : 4.5;
}

function komma(n) {
  return n.toFixed(2).replace('.', ',');
}

function linje(navn, fg, bg, px, sted) {
  const r = forhold(fg, bg);
  const k = krav(px);
  const ok = r >= k;
  const stoerrelse = px === 'grafik' ? 'grafik' : px + 'px';
  console.log(
    (ok ? '  OK   ' : '  BRUD ') +
      navn.padEnd(30) +
      fg + ' paa ' + bg + '  ' +
      stoerrelse.padStart(7) + '  ' +
      komma(r).padStart(6) + ':1  krav ' + komma(k) + ':1' +
      (sted ? '   ' + sted : '')
  );
  return ok;
}

const args = process.argv.slice(2);

if (args.length >= 2) {
  const px = args[2] ? (args[2] === 'grafik' ? 'grafik' : parseFloat(args[2])) : 14;
  console.log('');
  linje('enkelt par', args[0].toUpperCase(), args[1].toUpperCase(), px, '');
  console.log('');
  process.exit(0);
}

// Maalt i src/pages/HjertesagPage.jsx. Opdateret S92 natten til 6. august 2026.
// Hver raekke har linjenummeret den er maalt paa. Linjenumre kan drive;
// grep efter indholdet hvis en raekke ikke passer.
const PAR = [
  ['overLabel fire labels', '#C8112F', '#FFFFFF', 13, 'linje 53-60'],
  ['avatar par 1 roed', '#A00C24', '#FFE4E8', 13.5, 'linje 132'],
  ['avatar par 2 navy', '#2A3B57', '#E7ECF5', 13.5, 'linje 133'],
  ['avatar par 3 groen', '#166534', '#ECFDF3', 13.5, 'linje 134'],
  ['avatar par 4 rav', '#8A3D06', '#FFF7EC', 13.5, 'linje 135'],
  ['tidsangivelse nyeste', '#166534', '#FFFFFF', 12, 'linje 875'],
  ['etiket AKTIV', '#166534', '#ECFDF3', 10.5, 'linje 948'],
  ['etiket journalnummer', '#4B5565', '#F3F5F8', 11, 'linje 967'],
  ['etiket UDLOEBET', '#8A3D06', '#FFF7EC', 10.5, 'linje 989'],
  ['etiket IKKE OPRETTET', '#4B5565', '#F3F5F8', 10.5, 'linje 999'],
];

// AFVIGELSER: kendte, maalte brud der er fravalgt bevidst.
// Koeres separat, saa de ikke faar den samlede maaling til at fejle.
const AFVIGELSER = [
  ['bjaelke venstre ende', '#16A34A', '#F3F5F8', 'grafik', 'linje 566'],
  ['bjaelke hoejre ende', '#22C55E', '#F3F5F8', 'grafik', 'linje 566'],
];

console.log('');
console.log('KONTRASTMAALING - HjertesagPage.jsx');
console.log('WCAG 2.1. Traerskel: under 14px = 5,5:1, ellers 4,5:1, grafik 3,0:1');
console.log('');

let brud = 0;
for (const p of PAR) {
  if (!linje(p[0], p[1], p[2], p[3], p[4])) brud++;
}

console.log('');
console.log('  ' + PAR.length + ' par maalt. ' + brud + ' brud.');
console.log('');
console.log('BEVIDSTE AFVIGELSER - besluttet af Mario (CTO) 5. august 2026.');
console.log('Taeller IKKE med i brud-tallet. Se BACKLOG S92-BJAELKE-KONTRAST.');
console.log('');
for (const p of AFVIGELSER) {
  linje(p[0], p[1], p[2], p[3], p[4]);
}
console.log('');
process.exit(brud > 0 ? 1 : 0);
