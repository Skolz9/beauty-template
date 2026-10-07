import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Sparkles,
  ShieldCheck,
  Heart,
  Clock,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "../config";
import { getNextAvailableSlotBadge } from "../utils/scheduleUtils";
import { useAppContext } from "../context/AppContext";

export const Hero: React.FC = () => {
  const { lang, openBookingModal } = useAppContext();
  const [slotBadge, setSlotBadge] = useState(() => getNextAvailableSlotBadge());

  useEffect(() => {
    setSlotBadge(getNextAvailableSlotBadge(new Date()));
    const interval = setInterval(() => {
      setSlotBadge(getNextAvailableSlotBadge(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderTrustIcon = (iconKey: string) => {
    switch (iconKey) {
      case "user-check":
        return <UserCheck className="w-5 h-5 text-[#B8935A]" strokeWidth={1.6} />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#B8935A]" strokeWidth={1.6} />;
      case "shield-check":
        return <ShieldCheck className="w-5 h-5 text-[#B8935A]" strokeWidth={1.6} />;
      default:
        return <Heart className="w-5 h-5 text-[#B8935A]" strokeWidth={1.6} />;
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F4EFEA] pt-8 pb-16 sm:py-20 lg:py-24 border-b border-[#1F3A33]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Gold Uppercase Label */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[#B8935A] font-semibold">
              {lang === "ar" ? siteConfig.taglineAr : siteConfig.tagline}
            </p>

            {/* Main H1 with Key Highlight in Gold Serif */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-[64px] leading-[1.08] font-normal text-[#182622] tracking-tight text-balance">
              {lang === "ar" ? (
                siteConfig.heroTitleAr
              ) : (
                <>
                  {siteConfig.heroTitlePrefix}{" "}
                  <span className="text-[#B8935A] italic font-normal block sm:inline">
                    {siteConfig.heroTitleHighlight}
                  </span>
                </>
              )}
            </h1>

            {/* Short Paragraph */}
            <p className="text-base sm:text-lg text-[#5A6B65] max-w-xl leading-relaxed">
              {lang === "ar"
                ? siteConfig.heroDescriptionAr
                : siteConfig.heroDescription}
            </p>

            {/* Live Next Available Slot Animated Indicator */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#1F3A33] font-medium py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <Clock className="w-4 h-4 text-[#B8935A] shrink-0" />
              <span className="tabular-nums">
                {lang === "ar" ? slotBadge.ar : slotBadge.fr}
              </span>
            </div>

            {/* Two Buttons: Solid Green + Outlined */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="px-7 py-4 rounded-lg bg-[#1F3A33] hover:bg-[#152924] text-white text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-all shadow-sm flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[#B8935A]" />
                <span>
                  {lang === "ar" ? "احجزي موعدك" : "Prendre rendez-vous"}
                </span>
              </button>

              <a
                href="#services"
                className="px-7 py-4 rounded-lg border border-[#182622]/30 hover:border-[#1F3A33] hover:bg-[#1F3A33]/5 text-[#182622] text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>{lang === "ar" ? "اكتشفي خدماتنا" : "Voir les soins"}</span>
                <ArrowRight className="w-4 h-4 text-[#B8935A]" />
              </a>
            </div>

            {/* 4 Small Trust Icons Row */}
            <div className="pt-8 border-t border-[#1F3A33]/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {siteConfig.trustPillars.map((pillar) => (
                <div key={pillar.title} className="space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-white/80 border border-[#B8935A]/30 flex items-center justify-center">
                    {renderTrustIcon(pillar.iconKey)}
                  </div>
                  <h2 className="text-xs uppercase tracking-[0.08em] font-semibold text-[#182622]">
                    {pillar.title}
                  </h2>
                  <p className="text-[11px] text-[#5A6B65] leading-snug">
                    {pillar.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Large Rounded Portrait with Overlapping Dark-Green Discount Seal */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_-15px_rgba(31,58,51,0.18)] border border-[#B8935A]/25 bg-[#E8E0D5] aspect-[3/4]">
                <img
                  src={siteConfig.heroImage}
                  alt={`${siteConfig.businessName} — Salon de beauté et clinique esthétique à ${siteConfig.city}`}
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
              </div>

              {/* Overlapping Round Dark-Green Badge "-10% / Premier soin" */}
              <button
                type="button"
                onClick={() => openBookingModal()}
                aria-label="Profiter de -10% sur le premier soin"
                className="group absolute -bottom-5 -left-3 sm:-left-6 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#1F3A33] text-white shadow-xl border-2 border-[#B8935A]/60 flex flex-col items-center justify-center text-center p-3 transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#B8935A] font-medium">
                  ✦ {siteConfig.announcementBar.badgeSublabel}
                </span>
                <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white leading-none my-1 tabular-nums">
                  {siteConfig.announcementBar.badgeDiscount}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-white/90">
                  {siteConfig.announcementBar.badgeLabel}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
