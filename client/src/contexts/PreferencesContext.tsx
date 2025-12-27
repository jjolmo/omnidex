import { createContext, useEffect, useState } from "react";

interface PreferencesProviderProps {
  children: React.ReactElement;
}
// Lo del children es una movida que hay que hacer para luego poder hacer esto:
//  <PreferencesProvider>
//    <App />
//  </PreferencesProvider>
// Es para que se pueda anidar dentro lo que se quiera y luego simplemente se dibuje

export type PreferencesContextType = {
  language: string;
  //setLanguage: (lang: string) => void;
  changeLanguage: (lang: string) => void;
  fallbackLanguage: string;
  languages: string[];
  theme: string;
  themes: string[];
  //setTheme: (theme: string) => void;
  changeTheme: (theme: string) => void;
};

const defaultValue: PreferencesContextType = {
  language: "es",
  changeLanguage: () => {
    return null;
  },
  fallbackLanguage: "en",
  languages: ["es", "en", "de", "fr", "it", "ja"],
  theme: "light",
  themes: ["light", "dark"],
  changeTheme: () => {
    return null;
  },
};

export const PreferencesContext =
  createContext<PreferencesContextType>(defaultValue);

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [language, setLanguage] = useState(defaultValue.language);
  const [theme, setTheme] = useState(defaultValue.theme);

  // recuerda que un useEffect con el array de dependencias vacío, se ejecuta una única vez al cargar la aplicación
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const changeLanguage = (lang: string): void => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const changeTheme = (theme: string): void => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <PreferencesContext.Provider
      value={{
        languages: defaultValue.languages,
        language,
        changeLanguage,
        fallbackLanguage: defaultValue.fallbackLanguage,
        themes: defaultValue.themes,
        theme,
        changeTheme,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
