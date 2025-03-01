import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import { ThemeContext } from './contexts/ThemeContext'; // Import ThemeContext
import LanguageProvider from './contexts/LanguageContext'; // Import LanguageProvider
import LanguageSelector from './components/LanguageSelector'; // Import LanguageSelector

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <LanguageProvider> {/* Wrap your application with LanguageProvider */}
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
              <LanguageSelector /> {/* Add LanguageSelector here */}
            </div>
          </header>
          <main>
            <ProductSearch onSearch={handleSearch} />
            <ProductList searchTerm={searchTerm} />
          </main>
        </div>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
};

export default App;
