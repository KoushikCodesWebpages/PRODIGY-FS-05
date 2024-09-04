import React from 'react';

const MainDiv = () => {
  return (
    <div className="flex w-full">
      {/* Limited Offer Section */}
      <div className="w-3/5 m-0 p-4 bg-red-200">
        <h2 className="text-xl font-bold mb-2">Limited Offer</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white shadow-lg rounded-md">
            <h3 className="text-lg font-semibold">Shirt</h3>
            <p className="text-gray-700">Special offer on all shirts.</p>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-md">
            <h3 className="text-lg font-semibold">Jeans</h3>
            <p className="text-gray-700">Discounted jeans for a limited time.</p>
          </div>
        </div>
      </div>

      {/* In Stock Section */}
      <div className="w-2/5 m-0 p-4 bg-blue-200">
        <h2 className="text-xl font-bold mb-2">In Stock</h2>
        <p className="text-gray-700">Browse our latest stock of products.</p>
        {/* Add more content or products here if needed */}
      </div>
    </div>
  );
};

export default MainDiv;
