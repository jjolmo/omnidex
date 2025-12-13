import { useContext } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";

// En React un hook es un componente sin parte visual, sólo lógica, y sus nombres emiezan por "use"

type UseTranslate = {
  translate: (text: string) => string;
};

type TransType = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: TransType = {
  clean: {
    en: "clean",
    fr: "quasson",
  },
};

export default function useTranslate(): UseTranslate {
  const { language } = useContext(PreferencesContext);

  const translate = (text: string): string => {
    try {
      return translations[text.toLowerCase()][language];
    } catch {
      console.warn(
        `No hay traducción para "${text}" en el idioma "${language}"`,
      );
      return text;
    }
  };

  return {
    translate,
  };
}
