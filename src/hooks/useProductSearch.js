/*import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
import useDebounce from '../hooks/useDebounce'; // Import useDebounce

// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term

  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products for", debouncedSearchTerm);
        setLoading(true);
        const response = await fetch(`https://api.daaif.net/products?query=${debouncedSearchTerm}`);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        console.log("Fetched products:", data.products);
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]); 
  
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  return { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
  };
  
};

export default useProductSearch;

/*import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce'; // Import useDebounce

const useProductSearch = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Always fetch products, even when searchTerm is empty
    const fetchProducts = async () => {
      setLoading(true);
      setError(''); // Reset error message
      try {
        const query = searchTerm ? searchTerm : ''; // Use empty string for no search term
        console.log('Fetching products with query:', query); // Log the query

        const response = await fetch(`https://api.daaif.net/products?query=${query}`);
        if (!response.ok) throw new Error('Error fetching products');
        
        const data = await response.json();
        console.log('Fetched products:', data); // Log the API response
        
        setProducts(data.products); // Update the state with fetched products
      } catch (err) {
        setError(err.message); // Handle any errors
        console.error('Error:', err); // Log the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, [searchTerm]); // Fetch products whenever the searchTerm changes

  return (
    <div>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      {products.length === 0 && !loading && <p>No products found.</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li> // Display product names
        ))}
      </ul>
    </div>
  );
};

export default useProductSearch;*/




import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products for", debouncedSearchTerm);
        setLoading(true);
        const response = await fetch('https://api.daaif.net/products'); // Fetch all products
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Filter products based on `title`
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if search is empty
    }
  }, [debouncedSearchTerm, products]);

  return { 
    products: filteredProducts, 
    loading, 
    error
  };
};

export default useProductSearch;
