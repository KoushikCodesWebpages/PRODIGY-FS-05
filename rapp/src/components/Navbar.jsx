import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Toggle the search input visibility
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  // Fetch search results from API
  const fetchSearchResults = async (query) => {
    if (query.length > 2) { // Only fetch results for queries longer than 2 characters
      try {
        const response = await fetch(`/api/search/?query=${query}`);
        const data = await response.json();
        setSearchResults(data.results); // Assuming your API returns an object with a 'results' property
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Update search results when query changes
  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  // Close search input if clicked outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  // Add and clean up event listeners for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Darkening Overlay */}
      {isSearchVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      <nav className="bg-blue-600 p-3 relative z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Search Icon on the Left */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button onClick={toggleSearch} className="text-white flex items-center">
              <FontAwesomeIcon icon={faSearch} size="lg" />
              <span className="ml-2 hidden md:inline text-white">Search</span>
            </button>

            {/* Tooltip */}
            {isTooltipVisible && (
              <div className="absolute left-0 top-full mt-2 w-max p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                Click to search
              </div>
            )}
          </div>

          {/* Company Name in the Center */}
          <h1 className="text-white text-xl font-bold">MyCompany</h1>

          {/* Placeholder for Right Side Items */}
          <div></div>
        </div>
      </nav>

      {/* Search Input */}
      {isSearchVisible && (
        <div
          ref={searchRef}
          className="fixed top-14 left-0 right-0 container mx-auto mt-3 p-4 bg-white shadow-lg rounded-md z-50"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* Search Results */}
          {searchQuery && (
            <div className="mt-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                    {item.name} {/* Adjust based on the structure of your API response */}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
