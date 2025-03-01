import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';  // Correct import
import { LanguageContext } from '../contexts/LanguageContext';  // Import LanguageContext
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);  // Get current language from context

  // Translation object
  const translations = {
    en: {
      loading: "Loading...",
      error: "Error: ",
      noProductsFound: "No products found.",
      priceLabel: "Price: ",
      reload: "Reload",
      next: "Next",
      prev: "Previous",
    },
    fr: {
      loading: "Chargement...",
      error: "Erreur: ",
      noProductsFound: "Aucun produit trouvé.",
      priceLabel: "Prix: ",
      reload: "Recharger",
      next: "Suivant",
      prev: "Précédent",
    },
  };

  const { 
    products, 
    loading, 
    error, 
    reloadProducts, 
    nextPage, 
    prevPage, 
    page, 
    totalPages,
  } = useProductSearch(searchTerm);

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{translations[language].loading}</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {translations[language].error} {error}
    </div>
  );

  // Filter products by title (case-insensitive match)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col">
              <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
                {product.thumbnail && (
                  <img 
                    src={product.thumbnail} 
                    className="card-img-top" 
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>{translations[language].priceLabel}</strong>
                    {product.price}€
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">{translations[language].noProductsFound}</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between my-4">
        <button className="btn btn-secondary" onClick={prevPage} disabled={page === 1}>
          {translations[language].prev}
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className="btn btn-secondary" onClick={nextPage} disabled={page === totalPages}>
          {translations[language].next}
        </button>
      </div>

      {/* Reload Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={reloadProducts}>
          {translations[language].reload}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
