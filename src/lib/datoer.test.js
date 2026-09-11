// Tidszonen laases til dansk tid FOER modulet importeres, saa datoer med
// klokkeslaet forskydes korrekt (UTM -> CEST/CET). Uden dette ville testen
// afhaenge af maskinens lokale zone.
process.env.TZ = 'Europe/Copenhagen';

import { describe, it, expect } from 'vitest';
import { fmtDato, periodeVis } from './datoer';

describe('fmtDato', () => {
  it('formaterer ISO med klokkeslaet i dansk tid', () => {
    expect(fmtDato('2026-09-11T01:56:31.681+00:00')).toBe('11. sep 2026');
  });

  it('bruger dansk lokaldato, ikke UTC-dato', () => {
    // UTC-datoen er den 10., men i dansk tid (UTC+2) er det den 11.
    expect(fmtDato('2026-09-10T22:30:00+00:00')).toBe('11. sep 2026');
  });

  it('formaterer ren dato uden klokkeslaet', () => {
    expect(fmtDato('2026-09-11')).toBe('11. sep 2026');
  });

  it('giver tom streng for tomme vaerdier', () => {
    expect(fmtDato(null)).toBe('');
    expect(fmtDato(undefined)).toBe('');
    expect(fmtDato('')).toBe('');
  });

  it('returnerer ugyldig streng uaendret', () => {
    expect(fmtDato('ikke en dato')).toBe('ikke en dato');
  });
});

describe('periodeVis', () => {
  it('giver een streng for start og slut', () => {
    expect(periodeVis('2026-08-12', '2027-08-12')).toBe('12. aug 2026 - 12. aug 2027');
  });

  it('viser kun start naar slut mangler', () => {
    expect(periodeVis('2026-08-12', '')).toBe('12. aug 2026');
  });

  it('viser kun slut naar start mangler', () => {
    expect(periodeVis('', '2027-08-12')).toBe('12. aug 2027');
  });

  it('giver tom streng naar begge mangler', () => {
    expect(periodeVis('', '')).toBe('');
  });
});
