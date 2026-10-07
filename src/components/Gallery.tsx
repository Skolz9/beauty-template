import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar } from "lucide-react";
import { siteConfig, GalleryItem } from "../config";
import { useAppContext } from "../context/AppContext";

export const Gallery: React.FC = () => {
  const { lang, openBookingModal } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>("Tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "Tout",
    "Soins Visage",
    "Regard & Sourcils",
    "Onglerie & Mains",
    "Clinique & Spa",
  ];

  const filteredItems: GalleryItem[] =
    activeCategory === "Tout"
      ? siteConfig.gallery
      : siteConfig.gallery.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="galerie"
      className="py-16 sm:py-24 bg-[#F4EFEA] border-b border-[#1F3A33]/8 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
              {lang === "ar" ? "الأجواء والنتائج" : "L'Univers Maison Argana"}
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#182622]">
              {lang === "ar" ? "معرض الصور والنتائج" : "Galerie & Résultats"}
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filtrer la galerie"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-white/80 rounded-xl border border-[#1F3A33]/10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#1F3A33] text-white shadow-xs"
                    : "text-[#5A6B65] hover:text-[#182622]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-[#E5DDD3] aspect-[4/3] text-left focus:outline-none focus:ring-2 focus:ring-[#1F3A33] cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#182622] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#B8935A] font-medium">
                  {item.category}
                </p>
                <p className="font-serif-luxury text-lg font-normal text-white mt-0.5 leading-snug">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu de l'image"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          <div className="relative max-w-4xl w-full bg-[#182622] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fermer l'aperçu"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#B8935A] transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label="Image précédente"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#B8935A] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    aria-label="Image suivante"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#B8935A] transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
              <div>
                <span className="text-xs uppercase tracking-[0.16em] text-[#B8935A]">
                  {currentItem.category} · {lightboxIndex + 1} /{" "}
                  {filteredItems.length}
                </span>
                <p className="font-serif-luxury text-xl mt-0.5">
                  {currentItem.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  openBookingModal();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B8935A] hover:bg-[#a4804a] text-[#182622] text-xs uppercase tracking-[0.12em] font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver ce soin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
