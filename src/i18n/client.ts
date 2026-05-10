import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '../../public/locales/de/common.json';
import en from '../../public/locales/en/common.json';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      de: { common: de },
      en: { common: en },
    },
    defaultNS: 'common',
    lng: 'de',
    fallbackLng: 'de',
    initImmediate: false,
    interpolation: { escapeValue: false },
  });
}

export default i18n;
