import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange, placeholder }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
