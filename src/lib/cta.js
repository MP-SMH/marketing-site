/**
 * CTA-STANDARD FOR HELE BETA. Laast S91, 5. august 2026.
 *
 * ALLE knapper paa alle sider importerer herfra. Skriv ALDRIG et af tallene
 * direkte i en komponent. Staar tallet to steder, driver de fra hinanden.
 *
 * ------------------------------------------------------------------------
 * TRE STOERRELSER
 * ------------------------------------------------------------------------
 *   STOR   52px   sidens hovedhandling. HOEJST EEN per skaerm.
 *                 Fx "Stoet denne sag" og "Opret forening" paa landingssider.
 *   MEDIUM 44px   topbjaelke, sekundaere knapper, formularhandlinger,
 *                 OG ALT I ET BETALINGSKORT uden undtagelse.
 *   LILLE  36px   inline-handlinger i lister og tabeller.
 *
 * ------------------------------------------------------------------------
 * DEN ENE UFRAVIGELIGE REGEL
 * ------------------------------------------------------------------------
 * I et betalingskort, hvor MobilePay-knappen staar, er MEDIUM loftet.
 * Vipps' egen regel: deres knap maa aldrig vaere mindre end knapperne ved
 * siden af. Deres knap er 44px og KAN IKKE SKALERES.
 *
 * MAALT 5/8 2026: font-size 22px paa vaertselementet giver
 * getComputedStyle 22px paa vaerten, men den indre knap i skyggeroden
 * bliver paa 18,5px og 44px. Vipps' eget stilark saetter tallet i faste
 * pixels, saa det arves ikke. Deres dokumentation paastaar det modsatte.
 * PROEV DET IKKE IGEN.
 *
 * ------------------------------------------------------------------------
 * HVORFOR FAST HOEJDE OG IKKE MINIMUM
 * ------------------------------------------------------------------------
 * minHeight er et MINIMUM. Indholdet kan skubbe knappen hoejere, og saa
 * bliver den stoerre end MobilePays uden at nogen har besluttet det.
 * Maalt fejl i S91: padding 14px plus 18,5px tekst gav 50px paa en knap
 * der stod til 44. Brug ALTID hoejde plus CTA_PADDING.
 *
 * ------------------------------------------------------------------------
 * TYPOGRAFI
 * ------------------------------------------------------------------------
 * Tallene er maalt paa Vipps' egen knap, saa vores staar som soeskende og
 * ikke som et sammentraef. Skrifttypen kan IKKE matches: Vipps bruger deres
 * egen. Farven maa ikke: en knap i MobilePay-blaa ville vaere en selvtegnet
 * MobilePay-knap, som er forbudt.
 *
 * Sekundaere knapper beholder 14px. Ellers raaber de lige saa hoejt som
 * den primaere.
 */

export const CTA_STOR = 52;
export const CTA_MEDIUM = 44;
export const CTA_LILLE = 36;

export const CTA_RADIUS = 999;

// Vipps' egen boks: padding-block 0, padding-inline 24.
export const CTA_PADDING = '0 24px';
export const CTA_PADDING_LILLE = '0 18px';

export const CTA_SKRIFT = 18.5;
export const CTA_SKRIFT_SEKUNDAER = 14;
export const CTA_VAEGT = 700;
export const CTA_SPAERRING = '-0.2px';

/**
 * Grundformen alle knapper deler. Farve, kant og skygge laegges paa
 * kaldestedet, saa primaer og sekundaer kan se forskellige ud uden at
 * kunne komme til at have forskellig hoejde.
 *
 * Brug: style={{ ...ctaBoks(CTA_STOR), background: 'var(--brand)' }}
 */
export function ctaBoks(hoejde = CTA_MEDIUM) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: hoejde,
    padding: hoejde === CTA_LILLE ? CTA_PADDING_LILLE : CTA_PADDING,
    borderRadius: CTA_RADIUS,
    fontFamily: 'inherit',
    fontSize: hoejde === CTA_STOR ? CTA_SKRIFT : CTA_SKRIFT_SEKUNDAER,
    fontWeight: CTA_VAEGT,
    letterSpacing: CTA_SPAERRING,
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };
}
