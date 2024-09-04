import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const toggleSearch = () => setSearchVisible(!isSearchVisible);

  return (
    <>
      {isSearchVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      <nav className="bg-blue-700 p-3 w-full z-30 shadow-lg shadow-blue-800 fixed nerko-one-regular">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="relative flex items-center"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button onClick={toggleSearch} className="text-white flex items-center">
              <FontAwesomeIcon icon={faSearch} size="md" />
              <span className="ml-2 hidden md:inline text-white">Search</span>
            </button>
            {isTooltipVisible && (
              <div className="absolute left-0 top-full mt-2 w-max p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg">
                Click to search
              </div>
            )}
          </div>

          <h1 className="text-white text-lg">MyCompany</h1>

          <div className="text-white">
            {/* You can add more items here if needed */}
          </div>
        </div>
      </nav>

      <Search isVisible={isSearchVisible} onClose={() => setSearchVisible(false)} />
    </>
  );
};

export default Navbar;
