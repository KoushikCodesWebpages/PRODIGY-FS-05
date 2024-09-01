// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    const toggleSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/?search=${query}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error("Error fetching search results", error);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleSearch}
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                className="text-white flex items-center"
            >
                <FontAwesomeIcon icon={faSearch} size="lg" />
                <span className="ml-2 hidden md:inline text-white">Search</span>
            </button>
            
            {isSearchVisible && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={handleSearch}
                        className="w-full p-2 border-b border-gray-300"
                    />
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id} className="p-2 hover:bg-gray-100">
                                {result.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
