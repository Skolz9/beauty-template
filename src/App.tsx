import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { siteConfig } from "./config";
import { getBaseLocalBusinessSchema } from "./utils/seoContentGenerator";
import { AppProvider, SSRHeadCollector } from "./context/AppContext";
import { SEOHead } from "./components/SEOHead";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Treatments } from "./components/Treatments";
import { BookingSection, BookingModal } from "./components/Booking";
import { About } from "./components/About";
import { Stats } from "./components/Stats";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ServicePage } from "./components/ServicePage";
import { AreaPage } from "./components/AreaPage";
import { BlogListPage, BlogPost } from "./components/BlogPost";
import { ReservationPage } from "./components/ReservationPage";
import { NotFoundPage } from "./components/NotFoundPage";

const HomePage: React.FC = () => {
  const allKeywords = [
    `salon de beauté ${siteConfig.city} Founty`,
    "hydrafacial prix Agadir",
    "pose de gel ongles Agadir",
    "extension de cils Agadir prix",
    "épilation laser femme Agadir",
    "hammam et gommage Agadir",
    "صالون تجميل في أكادير",
  ];

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Où se trouve le salon de beauté ${siteConfig.businessName} à ${siteConfig.city} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteConfig.businessName} est situé au ${siteConfig.address}, au coeur du quartier Founty à ${siteConfig.city}, à proximité immédiate de Sonaba, Talborjt, Hay Mohammadi et Cité Dakhla.`,
        },
      },
      {
        "@type": "Question",
        name: `Comment prendre rendez-vous chez ${siteConfig.businessName} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Vous pouvez réserver votre soin en ligne en 60 secondes via notre formulaire qui pré-remplit votre demande sur WhatsApp au ${siteConfig.phoneDisplay}. Aucun paiement en ligne n'est requis.`,
        },
      },
      {
        "@type": "Question",
        name: "Quels sont vos soins esthétiques phares et leurs tarifs à Agadir ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous proposons le soin Hydrafacial Signature (650 MAD), le Soin du Visage sur-mesure (450 MAD), l'Épilation Laser Diode (dès 350 MAD), la Manucure Russe & Gainage BIAB (250 MAD), les Extensions de Cils (400 MAD), la Restructuration des Sourcils (200 MAD), le Brushing & Botox Capillaire (200 MAD) et le Hammam Royal Privatif (500 MAD).",
        },
      },
    ],
  };

  return (
    <main>
      <SEOHead
        data={{
          title: `${siteConfig.businessName} — Salon de Beauté & Clinique Esthétique à ${siteConfig.city}`,
          description: `Clinique esthétique et salon de beauté 100% féminin à ${siteConfig.city} (Founty). Hydrafacial, soins du visage, épilation laser, extensions de cils, manucure russe BIAB et hammam royal. Réservation rapide sur WhatsApp (${siteConfig.phoneDisplay}).`,
          canonicalPath: "/",
          ogImage: siteConfig.heroImage,
          keywords: allKeywords,
          jsonLd: [getBaseLocalBusinessSchema(), homeFaqSchema],
        }}
      />

      {/* 3. Hero */}
      <Hero />

      {/* 4. Popular Treatments + Tarifs */}
      <Treatments />

      {/* 5. BOOKING SECTION (impossible to miss, right after treatments) */}
      <BookingSection sectionId="reservation" />

      {/* 6. About */}
      <About />

      {/* 7. Stats Bar with Animated Counters */}
      <Stats />

      {/* 8. Gallery with Lightbox, then Testimonials Carousel */}
      <Gallery />
      <Testimonials />

      {/* 9. Contact (Address, Live Open/Closed badge, Google Maps, Call/WhatsApp) */}
      <Contact />

      {/* Journal Beauté & Programmatic SEO Hub Preview */}
      <section className="py-14 bg-white border-b border-[#1F3A33]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
                Guides & Conseils d'Expertes
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#182622] mt-1">
                Journal Beauté & Soins par Quartier à {siteConfig.city}
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-xs uppercase tracking-[0.14em] font-semibold text-[#1F3A33] hover:text-[#B8935A] underline underline-offset-4"
            >
              Voir les 6 articles du blog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {siteConfig.blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-[#F4EFEA]/60 rounded-2xl p-5 border border-[#1F3A33]/10 hover:border-[#B8935A] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#B8935A] font-semibold">
                    {post.category} · {post.readTimeMinutes} min
                  </span>
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#182622] group-hover:text-[#B8935A] transition-colors mt-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5A6B65] mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#1F3A33] mt-4 inline-block">
                  Lire le guide →
                </span>
              </Link>
            ))}
          </div>

          {/* Matrix of Local SEO links (Service x Area) */}
          <div className="bg-[#F4EFEA]/70 rounded-2xl p-6 border border-[#1F3A33]/10">
            <h3 className="text-xs uppercase tracking-[0.16em] text-[#182622] font-semibold mb-3">
              Recherches fréquentes par quartier à {siteConfig.city} :
            </h3>
            <div className="flex flex-wrap gap-2">
              {siteConfig.services.slice(0, 6).map((service) =>
                siteConfig.areas.slice(0, 3).map((area) => (
                  <Link
                    key={`${service.slug}-${area.slug}`}
                    to={`/soins/${service.slug}/${area.slug}`}
                    className="text-xs text-[#5A6B65] hover:text-[#1F3A33] bg-white px-3 py-1.5 rounded-lg border border-[#1F3A33]/8 hover:border-[#B8935A] transition-colors"
                  >
                    {service.name} {area.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Repeated BOOKING SECTION right before the footer */}
      <BookingSection
        sectionId="reservation-footer"
        badgeText="Prête à révéler votre éclat naturel ?"
      />
    </main>
  );
};

export function AppContent({
  ssrHeadCollector,
}: {
  ssrHeadCollector?: SSRHeadCollector;
}) {
  return (
    <AppProvider ssrHeadCollector={ssrHeadCollector}>
      <div className="min-h-screen flex flex-col bg-[#F4EFEA] text-[#182622]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/soins/:serviceSlug" element={<ServicePage />} />
            <Route
              path="/soins/:serviceSlug/:areaSlug"
              element={<ServicePage />}
            />
            <Route path="/salon-de-beaute/:areaSlug" element={<AreaPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:blogSlug" element={<BlogPost />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <BookingModal />
      </div>
    </AppProvider>
  );
}

export default function App() {
  return <AppContent />;
}
