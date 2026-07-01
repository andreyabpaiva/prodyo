import { createContext, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import type { LanguageContextValue } from "./types";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const toggle = useCallback(() => {
    i18n.changeLanguage(i18n.language === "en" ? "pt-BR" : "en");
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ language: i18n.language, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
