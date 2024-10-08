import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../APIs/Api';

const Search = ({ isVisible, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  const fetchSearchResults = async (query) => {
    if (query.length > 2) {
      try {
        const searchResults = await searchProducts(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible) return null;
  const baseUrl = 'http://localhost:8000/media/product_images/';
  return (
    <div
      ref={searchRef}
      className="fixed top-14 left-0 right-0 container mx-auto mt-3 p-4 bg-white shadow-lg rounded-md z-50"
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {query && (
        <div className="mt-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg">
          {results.length > 0 ? (
            results.map((item) => (
              <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.title}
                  className="inline-block w-10 h-10 mr-2 object-cover"
                />
                <span>{item.title}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
