/*import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;*/

import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce input
  const { isDarkTheme } = useContext(ThemeContext);

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
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;


/*import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setTerm(searchTerm);
    onSearch(searchTerm); // Send search term to the parent (App component)
  };

  return (
    <input
      type="text"
      value={term}
      onChange={handleChange}
      placeholder="Search products"
      className="form-control"
    />
  );
};

export default ProductSearch;*/

