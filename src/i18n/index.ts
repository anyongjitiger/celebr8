import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as localize from 'react-native-localize';
import en from './translations/en.json';
import zh from './translations/zh.json';

const languages = {
  EN: 'en',
  // ZH: 'zh',
};

const languageCodes = localize.getLocales().map(locale => locale.languageCode);
const { languageTag }: any = localize.findBestAvailableLanguage(languageCodes);
const defaultLanguage = languageTag;

// console.log('default language =====> ', languageTag, 'languageCodes ==> ', languageCodes);

i18n.use(initReactI18next).init({
  resources: {
    [languages.EN]: { translation: en },
    [languages.ZH]: { translation: zh },
  },
  lng: defaultLanguage,
  fallbackLng: languages.EN,
  react: {
    useSuspense: true,
    nsMode: 'default',
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  nsSeparator: false,
  keySeparator: false,
  debug: false,
});

export default i18n;
