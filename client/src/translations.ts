// translations.js

export type AvailableLanguages = "es" | "ja" | "en" | "fr" | "de" | "it";

export type WordDictionary = {
  [key in AvailableLanguages]?: string;
};

type Translation = {
  [text: string]: WordDictionary;
};

// Usa siempre "_" en lugar de "-" para separar palabras
const translations: Translation = {
  about: {
    es: "acerca de",
  },
  "loading...": {
    es: "cargando...",
    fr: "chargement...",
    de: "wird geladen...",
    it: "caricamento...",
    ja: "ロード中...",
  },
  "no results": {
    es: "sin resultados",
  },
  "type to search": {
    es: "escribe para buscar",
  },
  clear: {
    es: "vaciar",
    fr: "effacer",
    de: "leeren",
    it: "svuota",
  },
  hello: {
    es: "hola",
    fr: "bonjour",
    de: "hallo",
    it: "ciao",
    ja: "こんにちは",
  },
  goodbye: {
    es: "adiós",
    fr: "au revoir",
    de: "tschüss",
    it: "arrivederci",
    ja: "さようなら",
  },
};

export default translations;
