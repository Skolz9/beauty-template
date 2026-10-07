import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { siteConfig } from "../config";
import { SEOHead } from "./SEOHead";
import { useAppContext } from "../context/AppContext";

export const NotFoundPage: React.FC = () => {
  const { openBookingModal } = useAppContext();

  return (
    <main className="bg-[#F4EFEA] min-h-[70vh] flex items-center justify-center px-4 py-16">
      <SEOHead
        data={{
          title: `Page introuvable (404) | ${siteConfig.businessName}`,
          description: `La page demandée n'existe pas. Découvrez nos soins esthétiques et réservez votre rendez-vous chez ${siteConfig.businessName} à ${siteConfig.city}.`,
          canonicalPath: "/404",
          ogImage: siteConfig.heroImage,
          keywords: [],
          jsonLd: [],
        }}
      />

      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#1F3A33]/10 shadow-sm space-y-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#B8935A] font-semibold">
          Erreur 404
        </p>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#182622]">
          Page introuvable
        </h1>
        <p className="text-sm text-[#5A6B65] leading-relaxed">
          La page que vous recherchez semble avoir été déplacée. Retrouvez tous
          nos soins esthétiques à {siteConfig.city} ou réservez directement votre
          créneau.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F3A33] text-white text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#152924] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#B8935A]" />
            <span>Retour à l'accueil</span>
          </Link>

          <button
            type="button"
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#1F3A33]/25 text-[#182622] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#F4EFEA] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#B8935A]" />
            <span>Prendre rendez-vous</span>
          </button>
        </div>
      </div>
    </main>
  );
};
