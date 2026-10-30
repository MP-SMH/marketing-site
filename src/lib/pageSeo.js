export const PRODUCTION_ORIGIN = "https://stotmedhjerte.dk";

function meta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
}

export function setPageSeo({ pathname = window.location.pathname, title, description, noindex = false, type = "website" }) {
  const isProduction = ["stotmedhjerte.dk", "www.stotmedhjerte.dk"].includes(window.location.hostname);
  const canonical = PRODUCTION_ORIGIN + (pathname === "/" ? "/" : pathname);
  const robots = isProduction && !noindex ? "index, follow" : "noindex, nofollow";
  document.title = title;
  meta('meta[name="description"]', { name: "description", content: description });
  meta('meta[name="robots"]', { name: "robots", content: robots });
  meta('meta[property="og:title"]', { property: "og:title", content: title });
  meta('meta[property="og:description"]', { property: "og:description", content: description });
  meta('meta[property="og:type"]', { property: "og:type", content: type });
  meta('meta[property="og:url"]', { property: "og:url", content: canonical });
  meta('meta[property="og:locale"]', { property: "og:locale", content: "da_DK" });
  meta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = canonical;
}
