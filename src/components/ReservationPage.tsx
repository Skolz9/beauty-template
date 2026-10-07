import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { siteConfig } from "../config";
import { getBaseLocalBusinessSchema } from "../utils/seoContentGenerator";
import { SEOHead } from "./SEOHead";
import { BookingFormCard } from "./Booking";
import { useAppContext } from "../context/AppContext";

export const ReservationPage: React.FC = () => {
  const { lang } = useAppContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main className="bg-[#F4EFEA] min-h-screen py-10 sm:py-16">
      <SEOHead
        data={{
          title: `Prendre Rendez-vous en Ligne — ${siteConfig.businessName} ${siteConfig.city}`,
          description: `Réservez votre soin esthétique chez ${siteConfig.businessName} à ${siteConfig.city} (Founty) en 1 minute : Hydrafacial, soin du visage, épilation laser, manucure gel, cils et hammam. Confirmation WhatsApp au ${siteConfig.phoneDisplay}.`,
          canonicalPath: "/reservation",
          ogImage: siteConfig.bookingImage,
          keywords: [
            "réservation salon de beauté Agadir",
            "prendre rendez-vous esthéticienne Agadir",
            "réserver hydrafacial Agadir",
          ],
          jsonLd: [getBaseLocalBusinessSchema()],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Fil d'Ariane"
          className="pb-6 text-xs text-[#5A6B65] flex items-center gap-1.5"
        >
          <Link to="/" className="hover:text-[#182622] transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#182622] font-medium">
            Prendre rendez-vous
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Info & Reassurance */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
                {lang === "ar"
                  ? "حجز مباشر عبر واتساب"
                  : "Lien de Réservation Direct"}
              </p>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#182622] leading-tight">
                {lang === "ar"
                  ? `احجزي موعدك في ${siteConfig.businessName}`
                  : `Réservez votre soin chez ${siteConfig.businessName}`}
              </h1>
              <p className="text-sm sm:text-base text-[#5A6B65] mt-3 leading-relaxed">
                {lang === "ar"
                  ? "اختاري العناية واليوم والساعة المناسبة لك، وأكدي طلبك مباشرة عبر واتساب بدون أي دفع مسبق."
                  : "Sélectionnez votre prestation, votre praticienne et votre créneau horaire. Votre demande pré-remplie est envoyée directement à notre réception sur WhatsApp pour une validation prioritaire."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#1F3A33]/10 space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#B8935A] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#182622]">
                    Offre Nouvelles Clientes :{" "}
                    {siteConfig.announcementBar.badgeDiscount}
                  </h2>
                  <p className="text-xs text-[#5A6B65] mt-0.5">
                    Bénéficiez automatiquement de{" "}
                    {siteConfig.announcementBar.badgeDiscount} sur votre premier
                    soin en réservant via cette page.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#1F3A33]/8">
                <ShieldCheck className="w-5 h-5 text-[#B8935A] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#182622]">
                    Aucun acompte en ligne
                  </h2>
                  <p className="text-xs text-[#5A6B65] mt-0.5">
                    Le règlement s'effectue directement au salon après votre
                    prestation (espèces ou carte bancaire).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#1F3A33]/8">
                <Clock className="w-5 h-5 text-[#B8935A] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#182622]">
                    Ponctualité & Intimité 100% Féminine
                  </h2>
                  <p className="text-xs text-[#5A6B65] mt-0.5">
                    Votre cabine est préparée exclusivement pour vous à l'heure
                    exacte de votre rendez-vous à Founty, {siteConfig.city}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Reusable BookingFormCard */}
          <div className="lg:col-span-7">
            <BookingFormCard />
          </div>
        </div>
      </div>
    </main>
  );
};
