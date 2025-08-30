// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';

// import en from './en.json';
// import ar from './ar.json';

// const resources = {
//   en: {translation: en},
//   ar: {translation: ar},
// };

// const locales = RNLocalize.getLocales();
// const bestLocale = locales[0] || {languageTag: 'en', isRTL: false};

// i18n.use(initReactI18next).init({
//   resources,
//   lng: bestLocale.languageTag.startsWith('ar') ? 'ar' : 'en',
//   fallbackLng: 'en',
//   interpolation: {escapeValue: false},
// });

// export default i18n;


// src/i18n/index.ts
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import ar from './ar.json';

const resources = {
  en: {translation: en},
  ar: {translation: ar},
};

// Async init function
export const initI18n = async () => {
  const savedLang = await AsyncStorage.getItem('app_language');
  const locales = RNLocalize.getLocales();
  const deviceLang = locales[0]?.languageTag || 'en';

  const lng = savedLang || (deviceLang.startsWith('ar') ? 'ar' : 'en');

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    interpolation: {escapeValue: false},
  });

  return lng;
};

export default i18n;

