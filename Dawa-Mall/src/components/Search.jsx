import React from 'react';

const Search = ({ handleSearch, searchItem }) => {
  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search by drug category..."
        value={searchItem}
        onChange={handleSearch}
        className="p-3 border rounded-md w-full"
      />
    </div>
  );
};

export default Search;

