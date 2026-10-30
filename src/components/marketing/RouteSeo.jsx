import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO, SEO_BY_PATH } from "@/data/seo";
import { setPageSeo } from "@/lib/pageSeo";

export default function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = SEO_BY_PATH[pathname] || { ...DEFAULT_SEO, title: "Siden findes ikke | StøtMedHjerte", noindex: true };
    setPageSeo({ pathname, title: seo.title, description: seo.description, noindex: seo.noindex });
  }, [pathname]);
  return null;
}
