import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl, buildTelUrl } from "../config";
import { useAppContext } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { lang, openBookingModal } = useAppContext();

  return (
    <>
      <footer className="bg-[#142420] text-white/85 pt-16 pb-24 sm:pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand + short text + social icons */}
            <div className="lg:col-span-4 space-y-4">
              <Link
                to="/"
                className="inline-block font-serif-luxury text-3xl font-semibold tracking-[0.14em] uppercase text-white"
              >
                {siteConfig.businessName}
              </Link>
              <p className="text-xs uppercase tracking-[0.18em] text-[#B8935A]">
                {siteConfig.businessSubname} · {siteConfig.city}
              </p>
              <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                {lang === "ar"
                  ? siteConfig.heroDescriptionAr
                  : siteConfig.heroDescription}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8935A] text-white hover:text-[#182622] transition-colors flex items-center justify-center"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8935A] text-white hover:text-[#182622] transition-colors flex items-center justify-center text-xs font-bold"
                >
                  f
                </a>
                <a
                  href={siteConfig.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8935A] text-white hover:text-[#182622] transition-colors flex items-center justify-center text-xs font-bold"
                >
                  TT
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B8935A] text-white hover:text-[#182622] transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Liens rapides */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "روابط سريعة" : "Liens rapides"}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    {lang === "ar" ? "الرئيسية" : "Accueil"}
                  </Link>
                </li>
                <li>
                  <a href="/#a-propos" className="hover:text-white transition-colors">
                    {lang === "ar" ? "من نحن" : "À propos"}
                  </a>
                </li>
                <li>
                  <a href="/#tarifs" className="hover:text-white transition-colors">
                    {lang === "ar" ? "الأسعار" : "Tarifs MAD"}
                  </a>
                </li>
                <li>
                  <Link
                    to="/reservation"
                    className="hover:text-white transition-colors"
                  >
                    {lang === "ar" ? "حجز موعد" : "Prendre rendez-vous"}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition-colors">
                    {lang === "ar" ? "مدونة الجمال" : "Blog & Conseils"}
                  </Link>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-white transition-colors">
                    {lang === "ar" ? "اتصلي بنا" : "Contact & Accès"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Nos soins (linking to service pages) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "خدمات التجميل" : "Nos soins"}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                {siteConfig.services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/soins/${service.slug}`}
                      className="hover:text-[#B8935A] transition-colors flex items-center justify-between gap-2"
                    >
                      <span>{lang === "ar" ? service.nameAr : service.name}</span>
                      <span className="text-[11px] text-white/45 tabular-nums">
                        {service.priceFrom} MAD
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Quartiers d'Agadir */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "معلومات الاتصال" : "Contact"}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-white/75">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <a
                    href={buildTelUrl()}
                    className="hover:text-white transition-colors tabular-nums font-medium"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp : {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <span>{siteConfig.address}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B8935A] shrink-0 mt-0.5" />
                  <span>Lun – Sam : 09h30 – 20h00 · Dim : Fermé</span>
                </li>
              </ul>

              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-white/45 mb-2">
                  Quartiers desservis à {siteConfig.city} :
                </p>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/70">
                  {siteConfig.areas.map((area, i) => (
                    <React.Fragment key={area.slug}>
                      <Link
                        to={`/salon-de-beaute/${area.slug}`}
                        className="hover:text-[#B8935A] transition-colors"
                      >
                        {area.name}
                      </Link>
                      {i < siteConfig.areas.length - 1 && (
                        <span className="text-white/30">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright + Made by WebAtlass credit */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
            <p>
              © {new Date().getFullYear()} {siteConfig.businessName} —{" "}
              {siteConfig.city}, Maroc. Tous droits réservés.
            </p>
            <p className="flex items-center gap-3">
              <a
                href="/sitemap.xml"
                className="hover:text-white transition-colors"
              >
                Plan du site (Sitemap)
              </a>
              <span>·</span>
              <span className="text-white/75 font-medium">
                Made by <span className="text-[#B8935A]">WebAtlass</span>
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* 11. Floating WhatsApp Button (Fixed bottom-right on desktop/tablet) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2">
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contacter ${siteConfig.businessName} sur WhatsApp (${siteConfig.phoneDisplay})`}
          className="group flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-[#1F3A33] hover:bg-[#152924] text-white shadow-xl border border-[#B8935A]/50 transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <MessageCircle className="w-5 h-5 text-[#B8935A]" />
          <span className="text-xs uppercase tracking-[0.12em] font-semibold whitespace-nowrap">
            WhatsApp Direct
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar with two buttons: "Réserver" and "WhatsApp" */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F4EFEA]/95 backdrop-blur-md border-t border-[#1F3A33]/15 px-3 py-2 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="py-2.5 px-3 rounded-lg bg-[#1F3A33] text-white text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B8935A]" />
            <span>{lang === "ar" ? "احجزي الآن" : "Réserver"}</span>
          </button>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-lg bg-white border border-[#1F3A33]/25 text-[#182622] text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};
