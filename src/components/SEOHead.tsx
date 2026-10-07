import React, { useEffect } from "react";
import { siteConfig } from "../config";
import { PageSEOData } from "../utils/seoContentGenerator";
import { useAppContext } from "../context/AppContext";

export const SEOHead: React.FC<{ data: PageSEOData }> = ({ data }) => {
  const { ssrHeadCollector } = useAppContext();

  // During build-time SSR prerendering, record the SEO metadata synchronously
  if (ssrHeadCollector) {
    ssrHeadCollector.seoData = data;
  }

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = data.title;

    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const fullCanonical = `${siteConfig.siteUrl}${data.canonicalPath === "/" ? "" : data.canonicalPath}`;
    const fullImage = data.ogImage.startsWith("http")
      ? data.ogImage
      : `${siteConfig.siteUrl}${data.ogImage}`;

    setMeta('meta[name="description"]', "name", "description", data.description);
    setMeta('meta[name="keywords"]', "name", "keywords", data.keywords.join(", "));
    setMeta('meta[property="og:title"]', "property", "og:title", data.title);
    setMeta('meta[property="og:description"]', "property", "og:description", data.description);
    setMeta('meta[property="og:url"]', "property", "og:url", fullCanonical);
    setMeta('meta[property="og:image"]', "property", "og:image", fullImage);
    setMeta('meta[property="og:type"]', "property", "og:type", data.ogType || "website");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", data.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", data.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", fullImage);

    // Canonical link
    let canonicalEl = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", fullCanonical);
  }, [data]);

  return (
    <>
      {data.jsonLd.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
