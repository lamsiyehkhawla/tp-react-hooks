import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';  // Correct import
import { LanguageContext } from '../contexts/LanguageContext';  // Import LanguageContext
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce input
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);  // Get the current language from context

  // Translation object for search placeholder
  const translations = {
    en: {
      placeholder: 'Search for a product...',
    },
    fr: {
      placeholder: 'Rechercher un produit...',
    },
  };

  // Call onSearch only if there's a search term
  useEffect(() => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(debouncedSearchTerm.trim()); // Trim to remove leading/trailing spaces
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations[language].placeholder} // Use dynamic placeholder text based on language
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;
