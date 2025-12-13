import { useContext } from "react";
import { PreferencesContext } from "../contexts/PreferencesContext";
import translations from "../translations"; // Ajusta la ruta según tu estructura de proyecto

export default function useTranslate() {
  const { language } = useContext(PreferencesContext);

  const translate = (text) => {
    if (language === "en") {
      return text;
    }

    try {
      const translatedText = applyCaseFormat(
        text,
        translations[text.toLowerCase()][language],
      );
      if (translatedText !== undefined) {
        return translatedText;
      }
    } catch {
      return text;
    }

    return text;
  };

  return {
    translate,
  };
}

function applyCaseFormat(sourceText, targetText) {
  if (typeof sourceText !== "string" || typeof targetText !== "string")
    return targetText;

  if (sourceText.length < 2) return targetText;

  const first = sourceText[0];
  const second = sourceText[1];

  const isLetter = (ch) => ch.toUpperCase() !== ch.toLowerCase(); // works for ñ/á/etc.
  const isUpper = (ch) => isLetter(ch) && ch === ch.toUpperCase();
  const isLower = (ch) => isLetter(ch) && ch === ch.toLowerCase();

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
