import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext<PreferencesConextType | undefined>(
  undefined,
);

type PreferencesConextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

interface PreferencesProviderProps {
  children: React.Component;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [language, setLanguage] = useState("en");

  return (
    <PreferencesContext.Provider
      value={{
        language,
        setLanguage,
      }}
    ></PreferencesContext.Provider>
  );
}

// Hook para usar el contexto
export function usePreferences() {
  return useContext(PreferencesContext);
}
