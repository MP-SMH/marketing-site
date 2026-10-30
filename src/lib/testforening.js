// Visningsdata til Heartland United på beta. Ingen myndighedsgodkendelse; kun eksplicit sandboxbetaling.
export const TESTFORENING_SLUG = 'heartland-united';
export const TEST_JOURNALNUMMER = 'TEST-HU-2026-10-30';
export const TEST_HJERTESAG_SLUG = 'nye-maal-til-ungdomsafdelingen';
export const TEST_FORENING = {
  association_uuid: '8ae75046-b7d5-4948-9d98-0f250d9f3d5f',
  foreningsnavn: 'Heartland United',
  slug: TESTFORENING_SLUG,
  payment_ready: false,
  indsamlingsnaevn: { status: 'test', journal_nr: TEST_JOURNALNUMMER },
};
export const TEST_HJERTESAG = {
  slug: TEST_HJERTESAG_SLUG,
  kampagnenavn: 'Nye mål til ungdomsafdelingen',
  kort_beskrivelse: 'Vi mangler fire nye mål, så børnene kan træne på hele banen.',
};

export function erTestforening(foreningsdata) {
  const slug = typeof foreningsdata === 'string' ? foreningsdata : foreningsdata?.slug;
  return slug === TESTFORENING_SLUG;
}

export function kanModtageOffentligeBidrag(foreningsdata) {
  if (foreningsdata?.payment_ready !== true) return false;
  if (!erTestforening(foreningsdata)) return true;
  return foreningsdata?.testbetaling === true
    && typeof window !== 'undefined'
    && window.location.hostname === 'beta.stotmedhjerte.dk';
}
