// src/hooks/useLanguage.js
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; 

const useLanguage = () => {
  const { language } = useContext(LanguageContext);

  // Debugging: Log the language to see if the context is set correctly
  console.log('Language from useLanguage hook:', language);

  if (!language) {
    throw new Error('useLanguage must be used within a LanguageContext.Provider');
  }

  return { language };
};

export default useLanguage;
