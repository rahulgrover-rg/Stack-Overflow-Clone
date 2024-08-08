import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es', 'hi', 'pt', 'zh', 'fr'],
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage','cookie'],
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
    react : {
      wait : true ,
    }
  });

export default i18n;
