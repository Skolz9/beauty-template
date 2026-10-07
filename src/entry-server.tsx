import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppContent } from "./App";
import { SSRHeadCollector } from "./context/AppContext";
import { getAllStaticRoutes } from "./utils/seoContentGenerator";
import { siteConfig } from "./config";

export function renderRoute(url: string) {
  const headCollector: SSRHeadCollector = {};

  const appHtml = renderToString(
    <StaticRouter location={url}>
      <AppContent ssrHeadCollector={headCollector} />
    </StaticRouter>
  );

  return {
    appHtml,
    seoData: headCollector.seoData,
  };
}

export { getAllStaticRoutes, siteConfig };
