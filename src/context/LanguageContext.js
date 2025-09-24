import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ];

  useEffect(() => {
    // Check if language preference is stored
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage && translations[storedLanguage]) {
      setCurrentLanguage(storedLanguage);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem('preferredLanguage', languageCode);
      
      // Update document lang attribute
      document.documentElement.lang = languageCode;
      
      // Add appropriate font class to body
      document.body.className = document.body.className.replace(/\b\w+-font\b/g, '');
      if (languageCode === 'hi') {
        document.body.classList.add('hindi-font');
      } else if (languageCode === 'bn') {
        document.body.classList.add('bengali-font');
      } else if (languageCode === 'ta') {
        document.body.classList.add('tamil-font');
      }
    }
  };

  const t = (key, fallback = key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || translations.en[key] || fallback;
  };

  const getCurrentLanguage = () => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  };

  const isRTL = () => {
    return ['ar', 'ur', 'fa'].includes(currentLanguage);
  };

  const value = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    t,
    getCurrentLanguage,
    isRTL,
    direction: isRTL() ? 'rtl' : 'ltr'
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={value.direction}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};