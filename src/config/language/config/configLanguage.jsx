import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Initialize i18next
  .init({
    resources: {
      en: {
        translation: require("../country/en.json"), // Import English translations
      },
      es: {
        translation: require("../country/es.json"), // Import Spanish translations
      },
      id: {
        translation: require("../country/id.json"), // Import Spanish translations
      },
      // Add more languages here...
    },
    lng: localStorage.getItem("language"), // Set the default language
    fallbackLng: "en", // Set the fallback language
    interpolation: {
      escapeValue: false, // React already escapes the values
    },
  });

export default i18n;
