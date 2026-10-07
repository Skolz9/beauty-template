import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { siteConfig } from "../config";
import { getBaseLocalBusinessSchema } from "../utils/seoContentGenerator";
import { SEOHead } from "./SEOHead";
import { BookingSection } from "./Booking";
import { useAppContext } from "../context/AppContext";
import { NotFoundPage } from "./NotFoundPage";

export const BlogListPage: React.FC = () => {
  const { openBookingModal } = useAppContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="bg-[#F4EFEA] min-h-screen py-12 sm:py-16">
      <SEOHead
        data={{
          title: `Journal Beauté & Conseils Esthétiques à ${siteConfig.city} | ${siteConfig.businessName}`,
          description: `Découvrez nos guides experts sur l'Hydrafacial, l'épilation laser sur peaux mates, la manucure russe BIAB, les extensions de cils et le hammam royal à ${siteConfig.city}.`,
          canonicalPath: "/blog",
          ogImage: siteConfig.heroImage,
          keywords: [
            "conseils beauté Agadir",
            "guide hydrafacial Agadir",
            "épilation laser Maroc",
            "manucure BIAB Agadir",
          ],
          jsonLd: [getBaseLocalBusinessSchema()],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
            Expertise Dermo-Esthétique
          </p>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#182622]">
            Le Journal Beauté de {siteConfig.businessName}
          </h1>
          <p className="text-sm sm:text-base text-[#5A6B65] mt-3">
            Conseils de nos praticiennes, comparatifs de soins et guides de
            tarifs pour sublimer votre peau et votre regard à {siteConfig.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[#1F3A33]/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="block aspect-[16/10] overflow-hidden bg-[#E5DDD3]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6">
                  {/* Unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-[#5A6B65] mb-2.5">
                    <span className="text-[#B8935A] font-medium">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTimeMinutes} min de lecture</span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl font-semibold text-[#182622] leading-snug">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-[#B8935A] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5A6B65] mt-2.5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#1F3A33]/8 flex items-center justify-between">
                <span className="text-xs text-[#5A6B65]">Par {post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] font-semibold text-[#1F3A33] hover:text-[#B8935A] transition-colors"
                >
                  <span>Lire l'article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#1F3A33] text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium hover:bg-[#152924] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#B8935A]" />
            <span>Réserver un soin avec nos expertes</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export const BlogPost: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const { openBookingModal } = useAppContext();

  const post = siteConfig.blogPosts.find((p) => p.slug === blogSlug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [blogSlug]);

  if (!post) {
    return <NotFoundPage />;
  }

  const relatedServices = siteConfig.services.filter((s) =>
    post.relatedServiceSlugs.includes(s.slug)
  );
  const relatedAreas = siteConfig.areas.filter((a) =>
    post.relatedAreaSlugs.includes(a.slug)
  );

  const canonicalPath = `/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.siteUrl}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.businessName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.siteUrl}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}${canonicalPath}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: siteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal Beauté",
        item: `${siteConfig.siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.siteUrl}${canonicalPath}`,
      },
    ],
  };

  return (
    <main className="bg-[#F4EFEA] min-h-screen">
      <SEOHead
        data={{
          title: `${post.title} | ${siteConfig.businessName}`,
          description: post.excerpt,
          canonicalPath,
          ogImage: post.image,
          ogType: "article",
          keywords: post.seoKeywords,
          jsonLd: [
            getBaseLocalBusinessSchema(),
            articleSchema,
            faqSchema,
            breadcrumbSchema,
          ],
        }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Fil d'Ariane"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-[#5A6B65] flex flex-wrap items-center gap-1.5"
      >
        <Link to="/" className="hover:text-[#182622] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/blog" className="hover:text-[#182622] transition-colors">
          Journal Beauté
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#182622] font-medium truncate max-w-xs">
          {post.title}
        </span>
      </nav>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6B65]">
            <span className="text-[#B8935A] font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Publié le {post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B8935A]" />
              {post.readTimeMinutes} min de lecture
            </span>
            <span aria-hidden="true">·</span>
            <span>Par {post.author}</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#182622] leading-tight text-balance">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5A6B65] leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="rounded-3xl overflow-hidden border border-[#B8935A]/30 aspect-[16/9] mb-10 bg-[#E5DDD3]">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Sections */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#1F3A33]/10 space-y-8 shadow-xs">
          {post.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#182622]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base text-[#5A6B65] leading-relaxed"
                >
                  {p}
                </p>
              ))}
              {section.bulletPoints && (
                <ul className="space-y-2 pt-2 pl-4 border-l-2 border-[#B8935A]">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-sm font-medium text-[#182622]"
                    >
                      • {bp}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Article FAQs */}
          {post.faqs.length > 0 && (
            <div className="pt-8 border-t border-[#1F3A33]/10 space-y-4">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#182622]">
                Questions fréquentes sur ce sujet
              </h2>
              {post.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-[#F4EFEA]/70 rounded-xl p-4 space-y-1.5"
                >
                  <h3 className="text-sm font-semibold text-[#182622] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#B8935A]" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6B65] pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Contextual Links to Services & Areas */}
          <div className="pt-8 border-t border-[#1F3A33]/10 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold mb-3">
                Soins associés chez {siteConfig.businessName} ({siteConfig.city}) :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedServices.map((s) => (
                  <div
                    key={s.slug}
                    className="p-4 rounded-xl bg-[#F4EFEA] border border-[#1F3A33]/10 flex items-center justify-between gap-3"
                  >
                    <div>
                      <Link
                        to={`/soins/${s.slug}`}
                        className="font-serif-luxury text-lg font-semibold text-[#182622] hover:text-[#B8935A]"
                      >
                        {s.name}
                      </Link>
                      <span className="block text-xs text-[#5A6B65] tabular-nums">
                        {s.duration} min · Dès {s.priceFrom} MAD
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openBookingModal(s.slug)}
                      className="px-3.5 py-2 rounded-lg bg-[#1F3A33] text-white text-xs font-medium hover:bg-[#152924] cursor-pointer whitespace-nowrap"
                    >
                      Réserver
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold mb-2.5">
                Accès rapide depuis nos quartiers d'{siteConfig.city} :
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedAreas.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/soins/${
                      relatedServices[0]?.slug || "hydrafacial"
                    }/${a.slug}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F4EFEA] hover:bg-[#1F3A33] hover:text-white text-xs font-medium text-[#182622] transition-colors"
                  >
                    {relatedServices[0]?.name || "Soins"} · {a.name} (
                    {a.distanceMinutes} min)
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <BookingSection
        sectionId="reservation"
        initialServiceSlug={relatedServices[0]?.slug}
      />
    </main>
  );
};
