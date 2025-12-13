import { createContext, useState } from "react";

export type PreferencesConextType = {
  language: string;
  setLanguage: (lang: string) => void;
  fallbackLanguage: string;
  languages: string[];
};

interface PreferencesProviderProps {
  children: React.ReactElement;
}

const defaultValue = {
  language: "es",
  setLanguage: () => {
    return null;
  },
  fallbackLanguage: "en",
  languages: ["es", "en", "de", "fr", "it", "ja"],
};

export const PreferencesContext =
  createContext<PreferencesConextType>(defaultValue);

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [language, setLanguage] = useState(defaultValue.language);

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
        fallbackLanguage: defaultValue.fallbackLanguage,
        languages: defaultValue.languages,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
