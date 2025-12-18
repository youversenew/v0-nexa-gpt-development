"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
} from "react";
import { translations, type Language, type TranslationKey } from "@/lib/i18n";
import { useAuth } from "./auth-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("uz");
  const { user, isLoading: isAuthLoading } = useAuth();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    // Auth yuklanishini kutamiz
    if (!isAuthLoading && user) {
      const loadLanguage = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("language")
          .eq("id", user.id)
          .single();
        if (data?.language) {
          setLanguageState(data.language as Language);
        }
      };
      loadLanguage();
    }
  }, [user, isAuthLoading, supabase]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      await supabase.from("profiles").update({ language: lang }).eq("id", user.id);
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.uz[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "uz" as Language,
      setLanguage: () => {},
      t: (key: TranslationKey) => translations.uz[key] || key,
    };
  }
  return context;
}