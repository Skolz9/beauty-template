import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Instagram,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl, buildTelUrl } from "../config";
import { getLiveSalonStatus } from "../utils/scheduleUtils";
import { useAppContext } from "../context/AppContext";

export const Contact: React.FC = () => {
  const { lang } = useAppContext();
  const [liveStatus, setLiveStatus] = useState(() => getLiveSalonStatus());

  useEffect(() => {
    setLiveStatus(getLiveSalonStatus(new Date()));
    const interval = setInterval(() => {
      setLiveStatus(getLiveSalonStatus(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentDayIndex = new Date().getDay();

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-[#1F3A33]/8 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
            {lang === "ar" ? "زورينا في أكادير" : "Accès & Horaires"}
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#182622]">
            {lang === "ar" ? "العنوان وأوقات العمل" : "Nous Rencontrer à Agadir"}
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Address, Direct CTAs, Live Open/Closed Status & Hours Table */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#1F3A33]/10 shadow-xs space-y-6">
            {/* Address Block */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] text-[#1F3A33] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#B8935A]" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] text-[#5A6B65] font-semibold">
                  {lang === "ar" ? "العنوان" : "Notre Adresse à Agadir"}
                </h3>
                <p className="text-sm sm:text-base font-medium text-[#182622] mt-1">
                  {siteConfig.address}
                </p>
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8935A] hover:text-[#1F3A33] mt-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>
                    {lang === "ar"
                      ? "فتح الاتجاهات على خرائط جوجل"
                      : "Itinéraire Google Maps"}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Opening Hours Table with Live "Ouvert / Fermé" indicator */}
            <div className="pt-5 border-t border-[#1F3A33]/10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B8935A]" />
                  <h3 className="text-xs uppercase tracking-[0.15em] text-[#182622] font-semibold">
                    {lang === "ar" ? "أوقات العمل" : "Horaires d'ouverture"}
                  </h3>
                </div>

                {/* Live Status Indicator with explicit text + icon/dot for accessibility */}
                <div className="inline-flex items-center gap-2 text-xs font-semibold">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      liveStatus.isOpen
                        ? "bg-emerald-600 animate-pulse"
                        : "bg-amber-600"
                    }`}
                  />
                  <span
                    className={
                      liveStatus.isOpen ? "text-emerald-800" : "text-amber-800"
                    }
                  >
                    {lang === "ar"
                      ? liveStatus.statusLabelAr
                      : liveStatus.statusLabelFr}
                  </span>
                  <span className="text-[#5A6B65] font-normal">
                    ·{" "}
                    {lang === "ar" ? liveStatus.detailAr : liveStatus.detailFr}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#1F3A33]/8 text-xs sm:text-sm">
                {siteConfig.openingHours.map((sched) => {
                  const isToday = sched.dayIndex === currentDayIndex;
                  return (
                    <div
                      key={sched.dayIndex}
                      className={`py-2.5 flex items-center justify-between ${
                        isToday
                          ? "font-semibold text-[#1F3A33] bg-[#F4EFEA]/60 px-2.5 rounded-lg"
                          : "text-[#5A6B65]"
                      }`}
                    >
                      <span>
                        {lang === "ar" ? sched.dayNameAr : sched.dayNameFr}
                        {isToday && (
                          <span className="ml-2 text-[11px] text-[#B8935A]">
                            ({lang === "ar" ? "اليوم" : "Aujourd'hui"})
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums">
                        {sched.closed
                          ? lang === "ar"
                            ? "مغلق"
                            : "Fermé"
                          : `${sched.open} – ${sched.close}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Call, WhatsApp & Instagram Action Buttons */}
            <div className="pt-5 border-t border-[#1F3A33]/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1F3A33] hover:bg-[#152924] text-white text-xs uppercase tracking-[0.1em] font-medium transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#B8935A]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={buildTelUrl()}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#1F3A33]/25 hover:border-[#1F3A33] text-[#182622] text-xs font-semibold tabular-nums transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#B8935A]" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#1F3A33]/25 hover:border-[#B8935A] text-[#182622] text-xs uppercase tracking-[0.1em] font-medium transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#B8935A]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Maps + Local Agadir Neighborhoods Hub */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#1F3A33]/10 shadow-xs aspect-[4/3] relative">
              <iframe
                title={`Carte Google Maps — ${siteConfig.businessName} ${siteConfig.city}`}
                src={siteConfig.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Neighborhoods Internal SEO Links Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#1F3A33]/10">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold mb-2">
                {lang === "ar"
                  ? "قريبة من جميع أحياء أكادير"
                  : "Accès rapide depuis tous les quartiers d'Agadir"}
              </h3>
              <p className="text-xs text-[#5A6B65] mb-4">
                {lang === "ar"
                  ? "اكتشفي صفحاتنا المخصصة لكل حي في أكادير مع أوقات الوصول والخدمات المتوفرة:"
                  : "Consultez nos guides d'accès et tarifs par quartier à Agadir :"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {siteConfig.areas.map((area) => (
                  <Link
                    key={area.slug}
                    to={`/salon-de-beaute/${area.slug}`}
                    className="p-2.5 rounded-lg bg-[#F4EFEA]/70 hover:bg-[#1F3A33] hover:text-white text-xs font-medium text-[#182622] transition-colors flex items-center justify-between"
                  >
                    <span>{lang === "ar" ? area.nameAr : area.name}</span>
                    <span className="text-[11px] opacity-75 tabular-nums">
                      {area.distanceMinutes} min
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
