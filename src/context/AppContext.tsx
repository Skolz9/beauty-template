import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig } from "../config";
import { PageSEOData } from "../utils/seoContentGenerator";

export interface SSRHeadCollector {
  seoData?: PageSEOData;
}

interface AppContextValue {
  lang: "fr" | "ar";
  setLang: (lang: "fr" | "ar") => void;
  isBookingModalOpen: boolean;
  preselectedServiceSlug: string;
  openBookingModal: (serviceSlug?: string) => void;
  closeBookingModal: () => void;
  ssrHeadCollector?: SSRHeadCollector;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
  ssrHeadCollector?: SSRHeadCollector;
}> = ({ children, ssrHeadCollector }) => {
  const [lang, setLang] = useState<"fr" | "ar">(siteConfig.language);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceSlug, setPreselectedServiceSlug] = useState<string>(
    siteConfig.services[0]?.slug || "hydrafacial"
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      // Sync CSS variables from siteConfig.theme
      const root = document.documentElement;
      root.style.setProperty("--color-bg", siteConfig.theme.background);
      root.style.setProperty("--color-primary", siteConfig.theme.primary);
      root.style.setProperty("--color-accent", siteConfig.theme.accent);
      root.style.setProperty("--color-card", siteConfig.theme.card);
      root.style.setProperty("--color-text", siteConfig.theme.textDark);
      root.style.setProperty("--color-muted", siteConfig.theme.textMuted);
    }
  }, [lang]);

  const openBookingModal = (serviceSlug?: string) => {
    if (serviceSlug) {
      setPreselectedServiceSlug(serviceSlug);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        isBookingModalOpen,
        preselectedServiceSlug,
        openBookingModal,
        closeBookingModal,
        ssrHeadCollector,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return ctx;
}
