import React, { useState } from "react";
import { siteConfig } from "../config";
import { useAppContext } from "../context/AppContext";

export const About: React.FC = () => {
  const { lang, openBookingModal } = useAppContext();
  const [showTeam, setShowTeam] = useState(false);

  return (
    <section
      id="a-propos"
      className="bg-[#182622] text-white overflow-hidden scroll-mt-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left: Script-style gold small title + "À propos" + paragraph + outlined button */}
        <div className="lg:col-span-5 px-6 sm:px-10 lg:px-14 py-16 sm:py-20 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <p className="font-serif-luxury italic text-2xl sm:text-3xl text-[#B8935A]">
              {lang === "ar"
                ? `مرحباً بك في ${siteConfig.businessName}`
                : `Bienvenue chez ${siteConfig.businessName}`}
            </p>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal uppercase tracking-[0.12em] text-white">
              {lang === "ar" ? "من نحن" : "À Propos"}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {lang === "ar"
              ? `في ${siteConfig.businessName} بقلب حي فونتي في ${siteConfig.cityAr}، نقدم مجموعة واسعة من العلاجات التجميلية المتقدمة في بيئة هادئة وفاخرة مخصصة للنساء فقط. مهمتنا هي مساعدتك على الظهور والشعور بأفضل حال من خلال عناية مخصصة ونتائج استثنائية.`
              : `Chez ${siteConfig.businessName} au coeur de Founty à ${siteConfig.city}, nous proposons une gamme complète de soins dermo-esthétiques avancés et de rituels bien-être dans un environnement luxueux, apaisant et 100% dédié aux femmes. Notre mission est de révéler l'éclat naturel de votre peau grâce à un diagnostic personnalisé, une hygiène médicale rigoureuse et des résultats visibles dès la première séance.`}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setShowTeam(!showTeam)}
              className="px-6 py-3.5 rounded-lg border border-[#B8935A]/60 hover:bg-[#B8935A] hover:text-[#182622] text-xs uppercase tracking-[0.16em] font-medium text-white transition-all cursor-pointer whitespace-nowrap"
            >
              {showTeam
                ? lang === "ar"
                  ? "إخفاء فريقنا"
                  : "Masquer nos expertes"
                : lang === "ar"
                ? "تعرفي على خبيراتنا"
                : "En savoir plus sur nous"}
            </button>

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="text-xs uppercase tracking-[0.16em] text-[#B8935A] hover:text-white underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              {lang === "ar" ? "احجزي استشارتك" : "Réserver un diagnostic"}
            </button>
          </div>

          {showTeam && siteConfig.team.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#B8935A] font-semibold">
                {lang === "ar" ? "فريق الأخصائيات" : "Notre Équipe Féminine"}
              </p>
              <div className="space-y-3">
                {siteConfig.team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3.5 bg-white/5 p-3 rounded-xl border border-white/10"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-[#B8935A]/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#B8935A] truncate">
                        {lang === "ar" ? member.roleAr : member.role}
                      </p>
                      <p className="text-[11px] text-white/70 truncate">
                        {member.specialty} · {member.experienceYears} ans d'exp.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Wide interior photo of the salon */}
        <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px]">
          <img
            src={siteConfig.aboutImage}
            alt={`Intérieur de la clinique esthétique ${siteConfig.businessName} à ${siteConfig.city}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#182622]/40 via-transparent to-transparent hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
