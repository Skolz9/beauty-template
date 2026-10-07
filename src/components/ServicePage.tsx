import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  MapPin,
  Calendar,
  MessageCircle,
  ChevronRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl } from "../config";
import {
  getBaseLocalBusinessSchema,
  buildServiceAreaContent,
} from "../utils/seoContentGenerator";
import { SEOHead } from "./SEOHead";
import { BookingSection } from "./Booking";
import { useAppContext } from "../context/AppContext";
import { NotFoundPage } from "./NotFoundPage";

export const ServicePage: React.FC = () => {
  const { serviceSlug, areaSlug } = useParams<{
    serviceSlug: string;
    areaSlug?: string;
  }>();
  const { openBookingModal } = useAppContext();

  const service = siteConfig.services.find((s) => s.slug === serviceSlug);
  const area = areaSlug
    ? siteConfig.areas.find((a) => a.slug === areaSlug)
    : undefined;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [serviceSlug, areaSlug]);

  if (!service || (areaSlug && !area)) {
    return <NotFoundPage />;
  }

  const areaContent = area ? buildServiceAreaContent(service, area) : null;

  const pageH1 = areaContent
    ? areaContent.h1
    : `${service.name} à ${siteConfig.city} — Protocole & Prix en MAD`;

  const pageTitle = area
    ? `${service.name} ${area.name} (${siteConfig.city}) — Dès ${service.priceFrom} MAD | ${siteConfig.businessName}`
    : `${service.name} à ${siteConfig.city} — Tarif ${service.priceFrom} MAD & Réservation | ${siteConfig.businessName}`;

  const pageDescription = area
    ? `${service.name} près de ${area.name} à ${siteConfig.city} (${area.distanceMinutes} min). ${service.shortDescription} Séance de ${service.duration} min dès ${service.priceFrom} MAD. Réservation sur WhatsApp au ${siteConfig.phoneDisplay}.`
    : `${service.name} chez ${siteConfig.businessName} à ${siteConfig.city} (Founty). ${service.shortDescription} Durée ${service.duration} min, dès ${service.priceFrom} MAD. Prenez rendez-vous en ligne.`;

  const canonicalPath = area
    ? `/soins/${service.slug}/${area.slug}`
    : `/soins/${service.slug}`;

  const faqsToDisplay = areaContent ? areaContent.localizedFaqs : service.faqs;

  const keywords = areaContent
    ? areaContent.combinedKeywords
    : [...service.seoKeywords.fr, ...service.seoKeywords.ar];

  // JSON-LD: LocalBusiness + Service + FAQPage + BreadcrumbList
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pageH1,
    description: pageDescription,
    provider: {
      "@id": `${siteConfig.siteUrl}/#beautysalon`,
    },
    areaServed: {
      "@type": "Place",
      name: area ? `${area.name}, ${siteConfig.city}` : siteConfig.city,
    },
    offers: {
      "@type": "Offer",
      price: String(service.priceFrom),
      priceCurrency: "MAD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.siteUrl}${canonicalPath}`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsToDisplay.map((f) => ({
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
        name: service.name,
        item: `${siteConfig.siteUrl}/soins/${service.slug}`,
      },
      ...(area
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: `${service.name} ${area.name}`,
              item: `${siteConfig.siteUrl}${canonicalPath}`,
            },
          ]
        : []),
    ],
  };

  const waCustomMessage = `Bonjour ${siteConfig.businessName}, je souhaite réserver une séance de ${service.name} (${service.priceFrom} MAD)${
    area ? ` — je viens du quartier ${area.name}` : ""
  }.`;

  return (
    <main className="bg-[#F4EFEA] min-h-screen">
      <SEOHead
        data={{
          title: pageTitle,
          description: pageDescription,
          canonicalPath,
          ogImage: service.image,
          keywords,
          jsonLd: [
            getBaseLocalBusinessSchema(),
            serviceSchema,
            faqSchema,
            breadcrumbSchema,
          ],
        }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Fil d'Ariane"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-xs text-[#5A6B65] flex flex-wrap items-center gap-1.5"
      >
        <Link to="/" className="hover:text-[#182622] transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/soins/${service.slug}`}
          className="hover:text-[#182622] transition-colors"
        >
          {service.name}
        </Link>
        {area && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#182622] font-medium">
              Quartier {area.name} ({siteConfig.city})
            </span>
          </>
        )}
      </nav>

      {/* Hero Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              {service.category} · {service.nameAr}
              {area ? ` · ${area.name} (${area.nameAr})` : ` · ${siteConfig.city}`}
            </div>

            {/* Single H1 per page */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[54px] leading-[1.1] font-normal text-[#182622] text-balance">
              {pageH1}
            </h1>

            <p className="text-base sm:text-lg text-[#5A6B65] leading-relaxed">
              {areaContent ? areaContent.leadParagraph : service.longDescription}
            </p>

            {/* Price & Duration Block in MAD */}
            <div className="bg-white rounded-2xl p-5 border border-[#1F3A33]/10 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#5A6B65] block">
                    Tarif du soin
                  </span>
                  <span className="font-serif-luxury text-3xl font-bold text-[#1F3A33] tabular-nums">
                    Dès {service.priceFrom} MAD
                  </span>
                </div>
                <div className="h-10 w-[1px] bg-[#1F3A33]/10" />
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#5A6B65] block">
                    Durée en cabine
                  </span>
                  <span className="text-base font-semibold text-[#182622] inline-flex items-center gap-1.5 tabular-nums mt-0.5">
                    <Clock className="w-4 h-4 text-[#B8935A]" />
                    {service.duration} minutes
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#B8935A] font-medium">
                ✦ {siteConfig.announcementBar.badgeDiscount} sur votre 1er soin
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => openBookingModal(service.slug)}
                className="px-7 py-4 rounded-xl bg-[#1F3A33] hover:bg-[#152924] text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#B8935A]" />
                <span>Réserver ce soin ({service.priceFrom} MAD)</span>
              </button>

              <a
                href={buildWhatsAppUrl(waCustomMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl border border-[#1F3A33]/25 hover:border-[#1F3A33] bg-white text-[#182622] text-xs sm:text-sm uppercase tracking-[0.12em] font-medium transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Question sur WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-[#B8935A]/30 shadow-xl aspect-[4/3] bg-[#E5DDD3]">
              <img
                src={service.image}
                alt={pageH1}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Local Context Section */}
      <section className="py-14 bg-white border-t border-b border-[#1F3A33]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
              Pourquoi choisir ce protocole
            </p>
            <h2 className="font-serif-luxury text-3xl text-[#182622]">
              Les bienfaits du {service.name}
              {area ? ` pour nos clientes de ${area.name}` : ""}
            </h2>
            <p className="text-sm sm:text-base text-[#5A6B65] leading-relaxed">
              {areaContent
                ? areaContent.climateAndLocalSection
                : service.longDescription}
            </p>
            {areaContent && (
              <div className="p-4 rounded-xl bg-[#F4EFEA] border border-[#B8935A]/25 text-xs sm:text-sm text-[#182622] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8935A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">
                    Accès rapide depuis {area?.name} ({area?.distanceMinutes} min) :
                  </strong>
                  <span className="text-[#5A6B65]">{areaContent.accessParagraph}</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-[#F4EFEA] rounded-2xl p-6 sm:p-8 border border-[#1F3A33]/10 space-y-4">
              <h3 className="font-serif-luxury text-2xl text-[#182622] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B8935A]" />
                <span>Résultats visibles dès la 1ère séance</span>
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-[#182622]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1F3A33] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[#1F3A33]/10 text-xs text-[#5A6B65]">
                <strong>Idéal pour :</strong> {service.idealFor}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Treatment Works (3 Steps) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
            Déroulement en cabine privée
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#182622]">
            Comment se déroule votre séance de {service.name} ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.processSteps.map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl p-6 border border-[#1F3A33]/10 shadow-xs space-y-2.5"
            >
              <h3 className="font-serif-luxury text-xl font-semibold text-[#1F3A33]">
                {step.title}
              </h3>
              <p className="text-sm text-[#5A6B65] leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Local FAQ Section (4 to 6 Q&As) */}
      <section className="py-16 bg-white border-t border-b border-[#1F3A33]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
              Questions Fréquentes
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#182622]">
              Tout savoir sur le {service.name}
              {area ? ` près de ${area.name}` : ` à ${siteConfig.city}`}
            </h2>
          </div>

          <div className="space-y-4">
            {faqsToDisplay.map((faq, index) => (
              <details
                key={index}
                open={index === 0}
                className="group bg-[#F4EFEA]/70 rounded-xl p-5 border border-[#1F3A33]/10"
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
        </div>
      </section>

      {/* Embedded Reusable Booking Section with this service preselected */}
      <BookingSection
        sectionId="reservation"
        initialServiceSlug={service.slug}
        badgeText={`Réserver votre ${service.name} (${service.priceFrom} MAD)`}
      />

      {/* Internal Programmatic SEO Links: Nearby Areas for this Service + Other Services */}
      <section className="py-12 bg-white border-t border-[#1F3A33]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#B8935A] font-semibold mb-3">
              {service.name} par quartier à {siteConfig.city} :
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {siteConfig.areas.map((a) => {
                const isCurrent = area?.slug === a.slug;
                return (
                  <Link
                    key={a.slug}
                    to={`/soins/${service.slug}/${a.slug}`}
                    className={`p-3 rounded-xl text-xs font-medium border transition-colors ${
                      isCurrent
                        ? "bg-[#1F3A33] text-white border-[#1F3A33]"
                        : "bg-[#F4EFEA]/60 text-[#182622] border-[#1F3A33]/10 hover:border-[#B8935A]"
                    }`}
                  >
                    <span className="block font-semibold">{service.name}</span>
                    <span className="block opacity-80 mt-0.5">
                      {a.name} ({a.distanceMinutes} min)
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[#1F3A33]/10">
            <h2 className="text-xs uppercase tracking-[0.18em] text-[#B8935A] font-semibold mb-3">
              Découvrir nos autres soins esthétiques à {siteConfig.city} :
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {siteConfig.services
                .filter((s) => s.slug !== service.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    to={
                      area
                        ? `/soins/${other.slug}/${area.slug}`
                        : `/soins/${other.slug}`
                    }
                    className="px-4 py-2 rounded-lg bg-[#F4EFEA] hover:bg-[#1F3A33] hover:text-white text-xs font-medium text-[#182622] transition-colors"
                  >
                    {other.name} · Dès {other.priceFrom} MAD
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
