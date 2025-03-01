import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import useDebounce from '../hooks/useDebounce';
import useLocalStorage from '../hooks/useLocalStorage'; // Import useLocalStorage

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', ''); // Use localStorage
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce input
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    en: { placeholder: 'Search for a product...' },
    fr: { placeholder: 'Rechercher un produit...' },
  };

  // Call onSearch only if there's a search term
  useEffect(() => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(debouncedSearchTerm.trim());
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translations[language].placeholder}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;
