// ProductList.js
import React, { useEffect, useState } from 'react';
import { getProductById } from '../APIs/Api'; // Adjust import path as needed
import ProductCard from './Prod_card'; // Make sure the import path matches

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByIds = async () => {
      const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // List of product IDs you want to fetch
      try {
        const productPromises = productIds.map(id => getProductById(id));
        const productData = await Promise.all(productPromises);
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductsByIds();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
