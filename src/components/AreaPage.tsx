import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Calendar,
  MessageCircle,
  ChevronRight,
  HelpCircle,
  Navigation,
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl } from "../config";
import {
  getBaseLocalBusinessSchema,
  buildAreaPageContent,
} from "../utils/seoContentGenerator";
import { SEOHead } from "./SEOHead";
import { BookingSection } from "./Booking";
import { useAppContext } from "../context/AppContext";
import { NotFoundPage } from "./NotFoundPage";

export const AreaPage: React.FC = () => {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const { openBookingModal } = useAppContext();

  const area = siteConfig.areas.find((a) => a.slug === areaSlug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [areaSlug]);

  if (!area) {
    return <NotFoundPage />;
  }

  const content = buildAreaPageContent(area);

  const pageTitle = `Salon de Beauté & Clinique Esthétique ${area.name} (${siteConfig.city}) | ${siteConfig.businessName}`;
  const pageDescription = `Votre salon de beauté et clinique esthétique pour femmes à ${area.distanceMinutes} min de ${area.name}, ${siteConfig.city}. Hydrafacial, soin du visage, épilation laser, manucure gel et hammam. Réservation WhatsApp au ${siteConfig.phoneDisplay}.`;
  const canonicalPath = `/salon-de-beaute/${area.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.localizedFaqs.map((f) => ({
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
        name: `Salon de beauté ${area.name} ${siteConfig.city}`,
        item: `${siteConfig.siteUrl}${canonicalPath}`,
      },
    ],
  };

  return (
    <main className="bg-[#F4EFEA] min-h-screen">
      <SEOHead
        data={{
          title: pageTitle,
          description: pageDescription,
          canonicalPath,
          ogImage: siteConfig.aboutImage,
          keywords: [...area.localKeywords.fr, ...area.localKeywords.ar],
          jsonLd: [getBaseLocalBusinessSchema(), faqSchema, breadcrumbSchema],
        }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Fil d'Ariane"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-[#5A6B65] flex items-center gap-1.5"
      >
        <Link to="/" className="hover:text-[#182622] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#182622] font-medium">
          Salon de beauté {area.name} ({siteConfig.city})
        </span>
      </nav>

      {/* Hero Section for Neighborhood */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Quartier {area.name} ({area.nameAr}) · À {area.distanceMinutes} min
              de la clinique
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[52px] leading-[1.1] font-normal text-[#182622] text-balance">
              {content.h1}
            </h1>

            <p className="text-base sm:text-lg text-[#5A6B65] leading-relaxed">
              {area.customIntro}
            </p>

            <p className="text-sm text-[#5A6B65] leading-relaxed">
              {area.customSkinClimateNote}
            </p>

            {/* Landmarks & Access Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#1F3A33]/10 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#1F3A33] font-semibold">
                <Navigation className="w-4 h-4 text-[#B8935A]" />
                <span>
                  Accès depuis {area.name} ({area.distanceMinutes} min)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A6B65]">
                {area.transportNote}
              </p>
              <div className="text-xs text-[#182622] pt-1">
                <strong>Points de repère proches :</strong>{" "}
                {area.landmarks.join(" · ")}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="px-7 py-4 rounded-xl bg-[#1F3A33] hover:bg-[#152924] text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#B8935A]" />
                <span>Prendre rendez-vous</span>
              </button>

              <a
                href={buildWhatsAppUrl(
                  `Bonjour ${siteConfig.businessName}, je réside à ${area.name} et je souhaite réserver un soin.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl border border-[#1F3A33]/25 hover:border-[#1F3A33] bg-white text-[#182622] text-xs sm:text-sm uppercase tracking-[0.12em] font-medium transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp ({siteConfig.phoneDisplay})</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#B8935A]/30 shadow-xl aspect-[4/3] bg-[#E5DDD3]">
              <img
                src={siteConfig.aboutImage}
                alt={content.h1}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Services Available for this Neighborhood (links to /soins/[service]/[area]) */}
      <section className="py-16 bg-white border-t border-b border-[#1F3A33]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
              Carte des Soins & Tarifs MAD
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#182622]">
              Nos soins esthétiques pour les clientes de {area.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.services.map((service) => (
              <article
                key={service.slug}
                className="bg-[#F4EFEA]/60 rounded-2xl overflow-hidden border border-[#1F3A33]/10 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-[#E5DDD3]">
                    <img
                      src={service.image}
                      alt={`${service.name} ${area.name} ${siteConfig.city}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif-luxury text-xl font-semibold text-[#182622]">
                      <Link
                        to={`/soins/${service.slug}/${area.slug}`}
                        className="hover:text-[#B8935A] transition-colors"
                      >
                        {service.name} — {area.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#5A6B65] mt-1.5 line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#1F3A33]/8 flex items-center justify-between">
                  <div>
                    <span className="font-serif-luxury text-lg font-bold text-[#1F3A33] tabular-nums block">
                      Dès {service.priceFrom} MAD
                    </span>
                    <span className="text-[11px] text-[#5A6B65] inline-flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-[#B8935A]" />
                      {service.duration} min
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openBookingModal(service.slug)}
                      className="px-3.5 py-2 rounded-lg bg-[#1F3A33] text-white text-xs font-medium hover:bg-[#152924] transition-colors cursor-pointer"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
            Questions Fréquentes — {area.name}
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#182622]">
            Vos questions sur notre institut près de {area.name}
          </h2>
        </div>

        <div className="space-y-4">
          {content.localizedFaqs.map((faq, idx) => (
            <details
              key={idx}
              open={idx === 0}
              className="group bg-white rounded-xl p-5 border border-[#1F3A33]/10"
            >
              <summary className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#182622] cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#B8935A] shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <span className="text-[#B8935A] text-sm group-open:rotate-90 transition-transform">
                  →
                </span>
              </summary>
              <p className="text-sm text-[#5A6B65] leading-relaxed mt-3 pl-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection
        sectionId="reservation"
        badgeText={`Réservation prioritaire — Clientes de ${area.name}`}
      />

      {/* Nearby Areas Internal Links */}
      <section className="py-12 bg-white border-t border-[#1F3A33]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#B8935A] font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Autres quartiers desservis à {siteConfig.city} :</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {siteConfig.areas
              .filter((a) => a.slug !== area.slug)
              .map((otherArea) => (
                <Link
                  key={otherArea.slug}
                  to={`/salon-de-beaute/${otherArea.slug}`}
                  className="p-3.5 rounded-xl bg-[#F4EFEA] hover:bg-[#1F3A33] hover:text-white transition-colors text-xs font-medium text-[#182622]"
                >
                  <span className="block font-semibold">
                    Salon de beauté {otherArea.name}
                  </span>
                  <span className="block opacity-75 mt-0.5 tabular-nums">
                    À {otherArea.distanceMinutes} min · {otherArea.nameAr}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};
