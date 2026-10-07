import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, Globe } from "lucide-react";
import { siteConfig } from "../config";
import { useAppContext } from "../context/AppContext";

export const Navbar: React.FC = () => {
  const { lang, setLang, openBookingModal } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { labelFr: "Accueil", labelAr: "الرئيسية", href: "/" },
    { labelFr: "À propos", labelAr: "من نحن", href: isHome ? "#a-propos" : "/#a-propos" },
    { labelFr: "Services", labelAr: "خدماتنا", href: isHome ? "#services" : "/#services" },
    { labelFr: "Tarifs", labelAr: "الأسعار", href: isHome ? "#tarifs" : "/#tarifs" },
    { labelFr: "Galerie", labelAr: "المعرض", href: isHome ? "#galerie" : "/#galerie" },
    { labelFr: "Avis", labelAr: "آراء الزبونات", href: isHome ? "#avis" : "/#avis" },
    { labelFr: "Contact", labelAr: "اتصلي بنا", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      {/* 1. Thin announcement bar in dark green */}
      <div className="bg-[#1F3A33] text-[#F4EFEA] text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="mx-auto sm:mx-0 text-center sm:text-left tracking-wide font-medium truncate">
            <span className="text-[#B8935A] mr-1.5">✦</span>
            {lang === "ar"
              ? siteConfig.announcementBar.textAr
              : siteConfig.announcementBar.textFr}
            <span className="text-[#B8935A] ml-1.5">✦</span>
          </p>

          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <Link
              to="/blog"
              className="text-white/80 hover:text-[#B8935A] transition-colors text-xs"
            >
              {lang === "ar" ? "نصائح الجمال" : "Journal Beauté"}
            </Link>
            <span className="text-white/25">·</span>
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="inline-flex items-center gap-1 text-white/90 hover:text-[#B8935A] transition-colors cursor-pointer text-xs font-medium"
              aria-label="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#B8935A]" />
              <span>{lang === "fr" ? "العربية" : "Français"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sticky Navbar following 3-zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#F4EFEA]/95 backdrop-blur-md shadow-xs border-b border-[#1F3A33]/10 py-3"
            : "bg-[#F4EFEA] border-b border-[#1F3A33]/8 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single clean Brand Wordmark */}
          <Link
            to="/"
            className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-[0.12em] uppercase text-[#182622] whitespace-nowrap shrink-0"
          >
            {siteConfig.businessName}
          </Link>

          {/* Zone 2: Navigation links */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.14em] font-medium text-[#182622]/85"
          >
            {navItems.map((item) =>
              item.href.startsWith("/#") || item.href.startsWith("#") ? (
                <a
                  key={item.labelFr}
                  href={item.href}
                  className="hover:text-[#B8935A] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8935A] hover:after:w-full after:transition-all whitespace-nowrap"
                >
                  {lang === "ar" ? item.labelAr : item.labelFr}
                </a>
              ) : (
                <Link
                  key={item.labelFr}
                  to={item.href}
                  className="hover:text-[#B8935A] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8935A] hover:after:w-full after:transition-all whitespace-nowrap"
                >
                  {lang === "ar" ? item.labelAr : item.labelFr}
                </Link>
              )
            )}
          </nav>

          {/* Zone 3: Sticky dark green "Prendre rendez-vous" button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#1F3A33] hover:bg-[#152924] text-white text-xs uppercase tracking-[0.12em] font-medium transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B8935A]" />
              <span>{lang === "ar" ? "احجزي موعدك" : "Prendre rendez-vous"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-[#182622] hover:bg-[#1F3A33]/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F4EFEA] border-t border-[#1F3A33]/10 px-4 pt-4 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.labelFr}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-sm font-medium text-[#182622] hover:bg-[#1F3A33]/5"
                >
                  {lang === "ar" ? item.labelAr : item.labelFr}
                </a>
              ))}
              <Link
                to="/reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium text-[#B8935A] hover:bg-[#1F3A33]/5"
              >
                {lang === "ar" ? "صفحة الحجز المباشر" : "Page Réservation Directe"}
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg text-sm font-medium text-[#182622] hover:bg-[#1F3A33]/5"
              >
                {lang === "ar" ? "مدونة الجمال" : "Journal & Conseils Beauté"}
              </Link>
            </div>

            <div className="pt-3 border-t border-[#1F3A33]/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setLang(lang === "fr" ? "ar" : "fr");
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#182622] py-1.5 px-3 rounded-md bg-white border border-[#1F3A33]/15"
              >
                <Globe className="w-3.5 h-3.5 text-[#B8935A]" />
                <span>{lang === "fr" ? "النسخة العربية" : "Version Française"}</span>
              </button>

              <span className="text-xs text-[#5A6B65] tabular-nums">
                Tél : {siteConfig.phoneDisplay}
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
