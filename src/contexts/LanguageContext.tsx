import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nManager} from 'react-native';
import {initI18n} from '../i18n';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = async (lang: Language) => {
    await AsyncStorage.setItem('app_language', lang);
    await initI18n();
    setLanguage(lang);

    const isArabic = lang === 'ar';
    I18nManager.allowRTL(isArabic);
    I18nManager.forceRTL(isArabic);
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      const lang = (await AsyncStorage.getItem('app_language')) as Language;
      if (lang) {
        await toggleLanguage(lang);
      }
    };
    initializeLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{language, toggleLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
