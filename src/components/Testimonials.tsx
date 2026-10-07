import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { siteConfig } from "../config";
import { useAppContext } from "../context/AppContext";

export const Testimonials: React.FC = () => {
  const { lang } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = siteConfig.testimonials;

  useEffect(() => {
    if (typeof window === "undefined" || isPaused) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const current = items[activeIndex] || items[0];

  return (
    <section
      id="avis"
      className="py-16 sm:py-24 bg-white border-b border-[#1F3A33]/8 scroll-mt-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B8935A] font-semibold mb-2">
            {lang === "ar" ? "تقييم 4.9/5 على جوجل" : "Note 4.9/5 · +340 Avis Google"}
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#182622]">
            {lang === "ar"
              ? "ماذا تقول زبوناتنا في أكادير"
              : "Ce que disent nos clientes"}
          </h2>
          <div className="w-20 h-[1.5px] bg-[#B8935A] mx-auto mt-4" />
        </div>

        {/* Main Featured Carousel Card + Side Preview Cards on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-[#F4EFEA] rounded-2xl p-6 sm:p-10 border border-[#1F3A33]/10 relative">
            <Quote className="w-10 h-10 text-[#B8935A]/30 mb-4" />

            {/* 5 Gold Stars */}
            <div
              className="flex items-center gap-1 mb-4"
              aria-label={`Note de ${current.rating} sur 5`}
            >
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#B8935A] text-[#B8935A]"
                />
              ))}
            </div>

            <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#182622] leading-relaxed italic">
              « {current.text} »
            </blockquote>

            <div className="mt-6 pt-5 border-t border-[#1F3A33]/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[#182622]">
                  {current.name}
                </div>
                <div className="text-xs text-[#5A6B65] mt-0.5">
                  <span>{current.neighborhood}</span>
                  <span className="mx-1.5">·</span>
                  <span>{current.service}</span>
                  <span className="mx-1.5">·</span>
                  <span>{current.source}</span>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((activeIndex - 1 + items.length) % items.length)
                  }
                  aria-label="Avis précédent"
                  className="w-9 h-9 rounded-full bg-white border border-[#1F3A33]/15 hover:bg-[#1F3A33] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
                  aria-label="Avis suivant"
                  className="w-9 h-9 rounded-full bg-white border border-[#1F3A33]/15 hover:bg-[#1F3A33] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Selector list of verified clients */}
          <div className="lg:col-span-5 space-y-3">
            {items.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#1F3A33] text-white border-[#1F3A33] shadow-sm"
                      : "bg-[#F4EFEA]/50 text-[#182622] border-[#1F3A33]/10 hover:border-[#B8935A]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span
                      className={`text-xs ${
                        isSelected ? "text-[#B8935A]" : "text-[#5A6B65]"
                      }`}
                    >
                      {item.neighborhood}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      isSelected ? "text-white/80" : "text-[#5A6B65]"
                    }`}
                  >
                    {item.service} — « {item.text} »
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
