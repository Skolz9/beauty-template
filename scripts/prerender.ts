import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderRoute,
  getAllStaticRoutes,
  siteConfig,
} from "../src/entry-server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const publicDir = path.resolve(rootDir, "public");

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPageHtml(templateHtml: string, routePath: string): string {
  const { appHtml, seoData } = renderRoute(routePath);

  let html = templateHtml;

  if (seoData) {
    const safeTitle = escapeHtml(seoData.title);
    const safeDesc = escapeHtml(seoData.description);
    const fullCanonical = `${siteConfig.siteUrl}${
      seoData.canonicalPath === "/" ? "" : seoData.canonicalPath
    }`;
    const fullImage = seoData.ogImage.startsWith("http")
      ? seoData.ogImage
      : `${siteConfig.siteUrl}${seoData.ogImage}`;

    html = html.replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${safeTitle}</title>`
    );
    html = html.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${safeDesc}" />`
    );
    html = html.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${safeTitle}" />`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${safeDesc}" />`
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${safeTitle}" />`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );

    const extraHeadTags = [
      `<link rel="canonical" href="${fullCanonical}" />`,
      `<link rel="alternate" hreflang="fr" href="${fullCanonical}" />`,
      `<link rel="alternate" hreflang="ar" href="${fullCanonical}" />`,
      `<link rel="alternate" hreflang="x-default" href="${fullCanonical}" />`,
      `<meta property="og:url" content="${fullCanonical}" />`,
      `<meta property="og:image" content="${fullImage}" />`,
      `<meta name="twitter:image" content="${fullImage}" />`,
      seoData.keywords.length > 0
        ? `<meta name="keywords" content="${escapeHtml(
            seoData.keywords.join(", ")
          )}" />`
        : "",
    ]
      .filter(Boolean)
      .join("\n    ");

    html = html.replace("<!--app-head-->", extraHeadTags);
  } else {
    html = html.replace("<!--app-head-->", "");
  }

  html = html.replace("<!--app-html-->", appHtml);
  return html;
}

function generateSitemapXml(routes: string[]): string {
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = routes
    .map((route) => {
      const loc = `${siteConfig.siteUrl}${route === "/" ? "" : route}`;
      let priority = "0.8";
      let changefreq = "weekly";
      if (route === "/") {
        priority = "1.0";
        changefreq = "daily";
      } else if (route === "/reservation") {
        priority = "0.95";
        changefreq = "weekly";
      } else if (
        route.startsWith("/soins/") &&
        route.split("/").filter(Boolean).length === 2
      ) {
        priority = "0.9";
      } else if (route.startsWith("/salon-de-beaute/")) {
        priority = "0.85";
      }

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${loc}" />
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
}

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`;
}

async function run() {
  const routes = getAllStaticRoutes();

  // Always generate sitemap.xml and robots.txt in public/ so dev server also has them
  fs.mkdirSync(publicDir, { recursive: true });
  const sitemapXml = generateSitemapXml(routes);
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf-8");

  // If dist/index.html exists (after vite build), prerender all routes into dist/
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.log(
      `Generated public/sitemap.xml (${routes.length} routes) & public/robots.txt.`
    );
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, "utf-8");

  for (const route of routes) {
    const renderedHtml = buildPageHtml(templateHtml, route);
    const outPath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.slice(1), "index.html");

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, renderedHtml, "utf-8");
  }

  // Also prerender 404.html for static hosts / Vercel
  const notFoundHtml = buildPageHtml(templateHtml, "/404");
  fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8");

  // Write sitemap.xml and robots.txt to dist/ as well
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf-8");

  console.log(
    `✓ Prerendered ${routes.length} static SEO routes + 404.html + sitemap.xml + robots.txt into dist/`
  );
}

run().catch((err) => {
  console.error("Prerender error:", err);
  process.exit(1);
});
