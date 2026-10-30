// Kanonisk kilde til abonnementspriser paa marketing-site.
// Alle beloeb i danske kroner INKLUSIVE moms, jf. markedsfoeringsloven 12a.
// Begge varianter faktureres MAANEDLIGT. Forskellen er bindingen.
// Produktvalg: 12 maaneder, udtrykkeligt valgt af Mario 27. oktober 2026.
// Juridisk kundeklassifikation og den aktive aftaleskabelon skal afstemmes
// foer publicering. Eksisterende kunders accepterede aftaler omskrives ikke.
import {BINDING_MONTHS} from '../../../shared/association-onboarding.js';
export {BINDING_MONTHS};

export const MOMSSATS = 0.25;

export const BINDING_TEKST = `${BINDING_MONTHS} måneders binding`;

export const PRICING = {
  med_binding: {
    label: "Med binding",
    note: BINDING_TEKST,
    donationer: { inkl: 149, ekskl: "119,20" },
    samlet:     { inkl: 278, ekskl: "222,40" },
  },
  uden_binding: {
    label: "Uden binding",
    note: "Opsig naar som helst",
    donationer: { inkl: 179, ekskl: "143,20" },
    samlet:     { inkl: 334, ekskl: "267,20" },
  },
};

export const MAANEDLIG_BESPARELSE = { donationer: 30, samlet: 56 };

export const FEATURES = {
  donationer: {
    kort: [
      "Regnskabsgrundlaget samles løbende",
      "Bidrag direkte til jeres MobilePay",
      "Op til 5 hjertesager",
    ],
    fuld: [
      "Donationer via MobilePay",
      "Op til 5 aktive hjertesager",
      "CVR-validering",
      "Indsamlingstilladelse for perioden",
      "Bidragsoverblik",
      "Dokumentation samlet ét sted",
    ],
  },
  samlet: {
    kort: [
      "Alt i Donationer",
      "Faste månedlige bidrag",
      "Udvidet regnskabsgrundlag",
    ],
    fuld: [
      "Alt i Donationer",
      "Faste månedlige bidrag via MobilePay",
      "Overblik over støtteaftaler",
      "Støttehistorik",
      "Supporter-overblik",
      "Månedlige rapporter",
      "Udvidet dokumentation",
      "Indsamlingsregnskab pr. periode",
    ],
  },
};
