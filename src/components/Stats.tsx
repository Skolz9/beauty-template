import React, { useEffect, useRef, useState } from "react";
import { Award, Users, Cpu, Star, ShieldCheck } from "lucide-react";
import { siteConfig, StatItem } from "../config";
import { useAppContext } from "../context/AppContext";

const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({
  target,
  suffix,
}) => {
  const [count, setCount] = useState<number>(target);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1200;
            const startTime = performance.now();
            const isFloat = !Number.isInteger(target);

            const step = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const currentVal = target * eased;
              setCount(
                isFloat ? Number(currentVal.toFixed(1)) : Math.round(currentVal)
              );
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  const { lang } = useAppContext();

  const renderIcon = (iconKey: StatItem["iconKey"]) => {
    const props = { className: "w-7 h-7 text-[#B8935A] shrink-0", strokeWidth: 1.4 };
    switch (iconKey) {
      case "award":
        return <Award {...props} />;
      case "users":
        return <Users {...props} />;
      case "cpu":
        return <Cpu {...props} />;
      case "star":
        return <Star {...props} />;
      case "shield":
        return <ShieldCheck {...props} />;
    }
  };

  return (
    <section
      aria-label="Chiffres clés de la clinique"
      className="bg-[#1F3A33] text-white border-t border-b border-white/10 py-10 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 lg:divide-x lg:divide-white/15">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-3.5 lg:justify-center lg:px-4"
            >
              {renderIcon(stat.iconKey)}
              <div>
                <div className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white leading-none">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-white/85 font-medium mt-1">
                  {lang === "ar" ? stat.labelAr : stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
