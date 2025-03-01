import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      loading: "Loading...",
      error: "Error: ",
      noProductsFound: "No products found.",
      priceLabel: "Price: ",
      prevPage: "Previous",
      nextPage: "Next",
      reload: "Reload"
    },
    fr: {
      loading: "Chargement...",
      error: "Erreur: ",
      noProductsFound: "Aucun produit trouvé.",
      priceLabel: "Prix: ",
      prevPage: "Précédent",
      nextPage: "Suivant",
      reload: "Recharger"
    }
  };

  const { 
    products, 
    loading, 
    error, 
    paginate, 
    currentPage, 
    totalPages 
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

      {/* Pagination controls */}
      <div className="pagination my-4 d-flex justify-content-center">
        <button 
          className="btn btn-secondary mx-2"
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          {translations[language].prevPage}
        </button>
        
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          className="btn btn-secondary mx-2"
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          {translations[language].nextPage}
        </button>
      </div>

      {/* Reload button */}
      <div className="d-flex justify-content-center">
        <button 
          className="btn btn-primary my-4" 
          onClick={() => window.location.reload()}
        >
          {translations[language].reload}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
