import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language if user language is not available
    fallbackLng: 'pt',

    // Supported languages
    supportedLngs: ['pt', 'en', 'de', 'es', 'fr'],

    // Disable console warnings in production
    debug: false,

    // Detection options
    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator'],
      // Cache user language preference
      caches: ['localStorage'],
      // localStorage key name
      lookupLocalStorage: 'i18nextLng',
    },

    // Backend options
    backend: {
      // Path to translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolation options
    interpolation: {
      // React already escapes values
      escapeValue: false,
    },

    // Default namespace
    defaultNS: 'common',

    // Namespaces to load
    ns: ['common', 'home', 'quartos', 'atividades', 'redondezas', 'localizacao', 'galeria'],

    // React options
    react: {
      // Use Suspense for loading translations
      useSuspense: true,
    },
  });

export default i18n;
