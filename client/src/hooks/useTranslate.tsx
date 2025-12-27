import { useContext } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";
import translations, {
  AvailableLanguages,
  WordDictionary,
} from "../translations"; // Ajusta la ruta según tu estructura de proyecto

// los custom hooks (se llaman useAlgo) en React se utilizan para gestionar lógica sin parte visual, es decir, sin ser un componente

export default function useTranslate() {
  const { language } = useContext(PreferencesContext);

  const translate = (originalText: string): string => {
    if (language === "en") {
      return originalText;
    }

    const textTranslations: WordDictionary =
      translations[originalText.toLowerCase()];

    if (!textTranslations) {
      console.warn(`There are no translations for "${originalText}"`);
      return originalText;
    }

    const translatedText = textTranslations[language as AvailableLanguages];

    if (!translatedText) {
      console.warn(
        `There is no translation in ${language.toUpperCase()} for "${originalText}"`,
      );
      return originalText;
    }

    const formatedTranslatedText = applyCaseFormat(
      originalText,
      translatedText,
    );

    return formatedTranslatedText;
  };

  return {
    translate,
  };
}

function applyCaseFormat(sourceText: string, targetText: string): string {
  if (sourceText.length < 2) return targetText;

  const first = sourceText[0];
  const second = sourceText[1];

  const isLetter = (ch: string) => ch.toUpperCase() !== ch.toLowerCase(); // works for ñ/á/etc.
  const isUpper = (ch: string) => isLetter(ch) && ch === ch.toUpperCase();
  const isLower = (ch: string) => isLetter(ch) && ch === ch.toLowerCase();

  // Upper + lower => Capitalize
  if (isUpper(first) && isLower(second)) {
    if (targetText.length === 0) return targetText;
    return targetText[0].toUpperCase() + targetText.slice(1).toLowerCase();
  }

  // Upper + upper => UPPERCASE
  if (isUpper(first) && isUpper(second)) {
    return targetText.toUpperCase();
  }

  // Lower + lower => lowercase
  if (isLower(first) && isLower(second)) {
    return targetText.toLowerCase();
  }

  // Otherwise, unchanged
  return targetText;
}
