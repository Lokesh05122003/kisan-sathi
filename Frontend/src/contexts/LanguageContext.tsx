
import React, { createContext, useState, useContext } from 'react';

export type Language = 'en' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    weather: 'Weather Forecast',
    disease: 'Crop Disease Prediction',
    soil: 'Soil Parameters',
    market: 'Market Prices',
    schemes: 'Scheme Notifications',
    chatbot: 'Chatbot',
    knowledge: 'Crop Knowledge Hub',
    login: 'Login',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    apply: 'Apply',
    reset: 'Reset',
    loading: 'Loading...',
    
    // Language
    languageSelector: 'Language',
    english: 'English',
    hindi: 'Hindi',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    weather: 'मौसम पूर्वानुमान',
    disease: 'फसल रोग पहचान',
    soil: 'मृदा मापदंड',
    market: 'बाज़ार मूल्य',
    schemes: 'योजना सूचनाएँ',
    chatbot: 'चैटबॉट',
    knowledge: 'फसल ज्ञान केंद्र',
    login: 'लॉगिन',
    
    // Common
    search: 'खोज',
    filter: 'फ़िल्टर',
    apply: 'लागू करें',
    reset: 'रीसेट',
    loading: 'लोड हो रहा है...',
    
    // Language
    languageSelector: 'भाषा',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations,
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
