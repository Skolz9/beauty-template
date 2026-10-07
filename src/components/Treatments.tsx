import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Droplets,
  Eye,
  Feather,
  Hand,
  Zap,
  Wind,
  Flame,
  Clock,
  ChevronRight,
} from "lucide-react";
import { siteConfig, ServiceItem } from "../config";
import { useAppContext } from "../context/AppContext";

export const renderServiceIcon = (iconKey: ServiceItem["iconKey"]) => {
  const props = { className: "w-4 h-4 text-[#B8935A]", strokeWidth: 1.8 };
  switch (iconKey) {
    case "droplet":
      return <Droplets {...props} />;
    case "sparkles":
      return <Sparkles {...props} />;
    case "eye":
      return <Eye {...props} />;
    case "feather":
      return <Feather {...props} />;
    case "hand":
      return <Hand {...props} />;
    case "zap":
      return <Zap {...props} />;
    case "wind":
      return <Wind {...props} />;
    case "flame":
      return <Flame {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

export const Treatments: React.FC = () => {
  const { lang, openBookingModal } = useAppContext();
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll
    ? siteConfig.services
    : siteConfig.services.slice(0, 6);

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-[#F4EFEA] scroll-mt-16 border-b border-[#1F3A33]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Title with thin gold underline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.22em] text-[#B8935A] font-semibold mb-2">
            {lang === "ar" ? "بروتوكولات التجميل الفاخرة" : "Protocoles Sur-Mesure"}
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#182622] tracking-wide uppercase">
            {lang === "ar" ? "أشهر حصص العناية لدينا" : "Nos Soins Populaires"}
          </h2>
          <div className="w-24 h-[1.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        {/* Row of 6 cards (horizontal scroll on mobile, 3 or 6 cols on desktop) */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 overflow-x-auto no-scrollbar pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {visibleServices.map((service) => (
            <article
              key={service.slug}
              className="group shrink-0 w-[265px] sm:w-auto snap-start bg-white rounded-2xl overflow-hidden border border-[#1F3A33]/8 shadow-[0_8px_28px_-12px_rgba(31,58,51,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_-12px_rgba(31,58,51,0.16)] flex flex-col"
            >
              {/* Photo + overlapping round icon */}
              <div className="relative aspect-[4/3] bg-[#EAE2D7] overflow-visible">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.name} à ${siteConfig.city} — ${siteConfig.businessName}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Small round dark-green icon overlapping the image */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1F3A33] border-2 border-[#B8935A] flex items-center justify-center shadow-md z-10">
                  {renderServiceIcon(service.iconKey)}
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-7 pb-6 px-4 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm uppercase tracking-[0.12em] font-semibold text-[#182622] leading-snug">
                    <Link
                      to={`/soins/${service.slug}`}
                      className="hover:text-[#B8935A] transition-colors"
                    >
                      {lang === "ar" ? service.nameAr : service.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-[#5A6B65] mt-2 line-clamp-2 leading-relaxed">
                    {lang === "ar"
                      ? service.shortDescriptionAr
                      : service.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1F3A33]/8 space-y-2.5">
                  <div className="text-xs uppercase tracking-[0.1em] text-[#B8935A] font-medium">
                    {lang === "ar" ? "ابتداءً من " : "Dès "}
                    <span className="font-serif-luxury text-xl font-bold text-[#182622] tabular-nums">
                      {service.priceFrom} MAD
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openBookingModal(service.slug)}
                      className="text-xs uppercase tracking-[0.16em] font-semibold text-[#182622] border-b border-[#182622] pb-0.5 hover:text-[#B8935A] hover:border-[#B8935A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {lang === "ar" ? "احجزي الآن" : "Réserver"}
                    </button>

                    <Link
                      to={`/soins/${service.slug}`}
                      className="text-[11px] text-[#5A6B65] hover:text-[#1F3A33] inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>{lang === "ar" ? "تفاصيل الحصة" : "Fiche du soin"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Button "Voir tous les soins" */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#1F3A33] hover:bg-[#152924] text-white text-xs uppercase tracking-[0.16em] font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <span>
              {showAll
                ? lang === "ar"
                  ? "عرض أهم 6 خدمات"
                  : "Réduire l'affichage"
                : lang === "ar"
                ? "عرض جميع الخدمات والأسعار"
                : "Voir tous les soins"}
            </span>
          </button>
        </div>

        {/* Full Transparent Tarifs Table (#tarifs) */}
        <div id="tarifs" className="mt-16 pt-12 border-t border-[#1F3A33]/10 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "شفافية تامة بالدرهم المغربي" : "Carte des Soins & Tarifs"}
              </p>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#182622] mt-1">
                {lang === "ar"
                  ? "جميع خدماتنا وأسعارنا في أكادير"
                  : "L'ensemble de nos prestations esthétiques"}
              </h3>
            </div>
            <p className="text-xs text-[#5A6B65]">
              {lang === "ar"
                ? "تخفيض -10% للزبونات الجديدات على أول موعد"
                : "Remise de bienvenue -10% appliquée sur votre premier soin"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1F3A33]/10 divide-y divide-[#1F3A33]/8 overflow-hidden shadow-xs">
            {siteConfig.services.map((s, idx) => (
              <div
                key={s.slug}
                className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F4EFEA]/50 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold text-[#B8935A] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <Link
                      to={`/soins/${s.slug}`}
                      className="font-serif-luxury text-lg sm:text-xl font-semibold text-[#182622] hover:text-[#B8935A] transition-colors"
                    >
                      {lang === "ar" ? s.nameAr : s.name}
                    </Link>
                    <span className="text-xs text-[#5A6B65]">·</span>
                    <span className="text-xs text-[#5A6B65] inline-flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-[#B8935A]" />
                      {s.duration} min
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5A6B65] pl-6">
                    {lang === "ar" ? s.shortDescriptionAr : s.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pl-6 sm:pl-0 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-[#5A6B65] block">
                      {lang === "ar" ? "ابتداءً من" : "À partir de"}
                    </span>
                    <span className="font-serif-luxury text-xl font-bold text-[#1F3A33] tabular-nums">
                      {s.priceFrom} MAD
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBookingModal(s.slug)}
                    className="px-4 py-2 rounded-lg bg-[#1F3A33] hover:bg-[#152924] text-white text-xs uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {lang === "ar" ? "حجز" : "Réserver"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
