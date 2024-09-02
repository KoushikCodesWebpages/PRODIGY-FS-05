import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Toggle the search input visibility
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <>
      {/* Darkening Overlay */}
      {isSearchVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      <nav className="bg-blue-700 p-3 w-full z-30 shadow-lg shadow-blue-800 fixed nerko-one-regular">
        <div className="container mx-auto flex justify-between items-center">
          {/* Search Icon on the Left */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button onClick={toggleSearch} className="text-white flex items-center">
              <FontAwesomeIcon icon={faSearch} size="md" />
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
          <h1 className="text-white text-lg ">MyCompany</h1>

          {/* Placeholder for Right Side Items */}
          <div>
          <h1 className="text-white text-lg">MyCompany</h1>
          </div>
        </div>
      </nav>

      {/* Search Component */}
      <Search isVisible={isSearchVisible} onClose={() => setSearchVisible(false)} />
    </>
  );
};

export default Navbar;
