import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Prod_card'; // Adjust import path as needed

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page number
  const [hasNextPage, setHasNextPage] = useState(true); // Flag to determine if more pages are available
  const [hasPreviousPage, setHasPreviousPage] = useState(false); // Flag to determine if there's a previous page

  const fetchProducts = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/products/', {
        params: {
          page: pageNumber, // Pass the page number as a query parameter
          page_size: 16 // Adjust page size as needed
        }
      });
      const { results, next, previous } = response.data;

      if (pageNumber === 1) {
        // If it's the first page, replace existing products
        setProducts(results);
      } else {
        // If it's not the first page, replace existing products
        setProducts(results);
      }

      setHasNextPage(!!next); // Check if there is a next page
      setHasPreviousPage(!!previous); // Check if there is a previous page
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1); // Increment the page number to fetch the next page
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1); // Decrement the page number to fetch the previous page
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          {hasPreviousPage ? 'Previous Page' : 'No Previous Page'}
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          {hasNextPage ? 'Next Page' : 'No More Pages'}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
