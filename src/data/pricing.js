// Kanonisk kilde til abonnementspriser paa marketing-site.
// Alle beloeb i danske kroner INKLUSIVE moms, jf. markedsfoeringsloven 12a.
// Begge varianter faktureres MAANEDLIGT. Forskellen er bindingen.
// Bindingen er 5 maaneder uopsigelig plus 1 maaneds varsel til udgangen
// af en maaned, jf. forbrugeraftaleloven 28. Laengere binding kan ikke
// aftales gyldigt over for forbrugere, og foreninger regnes som
// forbrugere, samme praemis som momsvisningen.
// Aendres priser her, aendres de alle steder. Hardkod aldrig et beloeb
// i en side. Kilde: docs/context/smh-forretningsmodel.md afsnit 3.

export const MOMSSATS = 0.25;

export const BINDING_TEKST = "5 maaneders binding, derefter 1 maaneds varsel";

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
      "Regnskabet laves automatisk",
      "Bidrag direkte til jeres MobilePay",
      "Op til 5 hjertesager",
    ],
    fuld: [
      "Donationer via MobilePay",
      "Ubegrænset antal hjertesager",
      "CVR-validering",
      "Journalnummer pr. hjertesag",
      "Bidragsoverblik",
      "Dokumentation samlet ét sted",
    ],
  },
  samlet: {
    kort: [
      "Alt i Donationer",
      "Faste månedlige bidrag",
      "Revisor godkender digitalt",
    ],
    fuld: [
      "Alt i Donationer",
      "Faste månedlige bidrag via MobilePay",
      "Overblik over støtteaftaler",
      "Støttehistorik",
      "Supporter-overblik",
      "Månedlige rapporter",
      "Udvidet dokumentation",
      "Indsamlingsregnskab pr. hjertesag",
    ],
  },
};
