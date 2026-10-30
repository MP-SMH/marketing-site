// En offentlig testforening maa aldrig fremstaa som godkendt indsamling.
export const TESTFORENING_SLUG = 'heartland-united';

export function erTestforening(foreningsdata) {
  const slug = typeof foreningsdata === 'string' ? foreningsdata : foreningsdata?.slug;
  return slug === TESTFORENING_SLUG;
}

export function kanModtageOffentligeBidrag(foreningsdata) {
  return foreningsdata?.payment_ready === true && !erTestforening(foreningsdata);
}
