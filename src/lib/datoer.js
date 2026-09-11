// Dato-formatering til de offentlige indsamlingsregnskaber. Samlet ét sted,
// saa liste- og detaljesiden viser datoer og perioder ens.

const MND = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

// Formaterer en dato som fx "11. sep 2026". Tom vaerdi -> tom streng. En streng
// der ikke kan parses som dato returneres uaendret, saa allerede formaterede
// vaerdier ikke oedelaegges.
export function fmtDato(v) {
  if (!v) return '';
  // Rene datoer (periode_start/slut) er kalenderdatoer uden tidszone og maa
  // ikke forskydes af browserens zone; timestamps (offentliggjort_dato) vises
  // i lokal tid.
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v));
  const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(v);
  if (isNaN(d.getTime())) return String(v);
  return `${d.getDate()}. ${MND[d.getMonth()]} ${d.getFullYear()}`;
}

// Perioden som EEN streng, fx "12. aug 2026 - 12. aug 2027". Mangler den ene
// ende, vises kun den anden. Mangler begge, returneres tom streng.
export function periodeVis(startRaw, slutRaw) {
  const start = fmtDato(startRaw);
  const slut = fmtDato(slutRaw);
  if (start && slut) return `${start} - ${slut}`;
  return start || slut;
}
