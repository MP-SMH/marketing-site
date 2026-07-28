// Kanonisk prisliste for StoetMedHjerte-abonnementer.
// ENESTE kilde til priser i frontend. Importer herfra, hardkod aldrig.
// Bindingsvalget persisteres i databasen ved signup (Aftaleloven §36).

export const BINDING_12MDR = '12mdr';
export const BINDING_MAANEDLIG = 'maanedlig';

export const PRODUKTER = {
  donationer: {
    navn: 'Donationer',
    priser: { [BINDING_12MDR]: 149, [BINDING_MAANEDLIG]: 179 },
  },
  fastStoette: {
    navn: 'Fast stoette',
    priser: { [BINDING_12MDR]: 199, [BINDING_MAANEDLIG]: 239 },
  },
  samlet: {
    navn: 'Samlet loesning',
    priser: { [BINDING_12MDR]: 278, [BINDING_MAANEDLIG]: 335 },
  },
};

export const BINDING_VALG = [
  {
    key: BINDING_12MDR,
    overskrift: '12 maaneders binding',
    note: 'Foreningen binder sig i 12 maaneder. Lavere maanedspris.',
  },
  {
    key: BINDING_MAANEDLIG,
    overskrift: 'Ingen binding',
    note: 'Foreningen betaler maanedligt og kan opsige frit. Hoejere maanedspris.',
  },
];

export function hentPris(produktNoegle, binding) {
  const produkt = PRODUKTER[produktNoegle];
  if (!produkt) throw new Error(`Ukendt produkt: ${produktNoegle}`);
  const pris = produkt.priser[binding];
  if (pris === undefined) throw new Error(`Ukendt binding: ${binding}`);
  return pris;
}
