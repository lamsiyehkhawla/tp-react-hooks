import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Number of products per page

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if search is empty
    }
  }, [debouncedSearchTerm, products]);

  // Calculate products to display based on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return { 
    products: currentProducts, 
    loading, 
    error,
    paginate, 
    currentPage, 
    totalPages: Math.ceil(filteredProducts.length / productsPerPage)
  };
};

export default useProductSearch;
