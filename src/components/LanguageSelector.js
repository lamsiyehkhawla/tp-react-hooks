// src/components/LanguageSelector.js
import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    toggleLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
