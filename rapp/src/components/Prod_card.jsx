// ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  const { image, title, description, price, stock } = product;

  // Construct the full URL using the base URL and the image path
  const baseUrl = 'http://localhost:8000/media/product_images/';
  const imageUrl = `${baseUrl}${image}`; // No need to replace slashes, it's straightforward now
  
 // Logs the filename, e.g., 'img_2.jpg'
 // Logs the full URL, e.g., 'http://localhost:8000/media/product_images/img_2.jpg'
  
  return (
    <div className="bg-white shadow-md overflow-hidden max-w-sm mx-auto">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">${price}</span>
          <span
            className={`px-2 py-1 text-white text-xs rounded ${
              stock > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
