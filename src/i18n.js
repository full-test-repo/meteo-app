import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language } from "./types/Language";
import translationEN from "./i18n/en.json";
import translationFR from "./i18n/fr.json";

let defaultLanguage = Language.FR;

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
