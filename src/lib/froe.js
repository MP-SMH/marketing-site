// Froet bestemmer raekkefoelgen paa hjertesagsoversigten. Det gemmes for
// besoeget, saa listen ikke hopper ved genindlaesning eller filtrering,
// og fornys ved naeste besoeg. Serveren sorterer paa
// hashtext(hjertesag_uuid || froe), se smh-app migration 43c4f7f og
// smh-api public/hjertesager-liste-route.js.
export function hentFroe() {
  const noegle = "smh_hjertesager_froe";
  try {
    const gemt = sessionStorage.getItem(noegle);
    if (gemt) return gemt;
    const nyt = Math.random().toString(36).slice(2, 12);
    sessionStorage.setItem(noegle, nyt);
    return nyt;
  } catch {
    // sessionStorage kan vaere blokeret. Siden skal stadig virke.
    return Math.random().toString(36).slice(2, 12);
  }
}
