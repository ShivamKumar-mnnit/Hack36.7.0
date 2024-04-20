import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchInput);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick} className="btn btn-primary">
        Search
      </button>
    </div>
  );
};

export default SearchBar;