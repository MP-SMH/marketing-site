// Foreningstypen gemmes som ASCII-slug i databasen, fx fodbold eller
// kano_og_kajak, ikke som dansk etiket. Den fulde liste med 161 typer og
// deres etiketter findes i CD-admin-prototypen og kommer ind i koden, naar
// admin konverteres.
//
// Indtil da bruges en simpel omskrivning: understregninger bliver
// mellemrum, og foerste bogstav bliver stort. Den daekker de fleste typer.
// Nogle faa vil se forkerte ud, fx typer med egennavne.
export function visForeningstype(slug) {
  if (typeof slug !== "string" || slug.trim().length === 0) return "";
  const medMellemrum = slug.replace(/_/g, " ");
  return medMellemrum.charAt(0).toUpperCase() + medMellemrum.slice(1);
}

// Dansk CVR skrives i par: 45 40 74 38.
export function visCvr(nummer) {
  if (typeof nummer !== "string") return "";
  const cifre = nummer.replace(/\D/g, "");
  if (cifre.length !== 8) return nummer;
  return cifre.replace(/(\d{2})(?=\d)/g, "$1 ");
}
