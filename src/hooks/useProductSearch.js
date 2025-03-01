import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.daaif.net/products?page=${page}&query=${debouncedSearchTerm}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); // Set total pages if available from the API response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products initially
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm, page]); // Fetch products when searchTerm or page changes

  // Filter products based on the search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if search term is empty
    }
  }, [debouncedSearchTerm, products]);

  // Reload the products (called when user clicks the "Reload" button)
  const reloadProducts = () => {
    setPage(1); // Reset to the first page
    fetchProducts();
  };

  // Pagination functionality
  const nextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return {
    products: filteredProducts,
    loading,
    error,
    reloadProducts,
    nextPage,
    prevPage,
    page,
    totalPages,
  };
};

export default useProductSearch;
