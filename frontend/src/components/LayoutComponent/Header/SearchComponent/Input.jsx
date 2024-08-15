import React from 'react';

const SearchInput = ({ value, onChange, onFocus, onKeyDown }) => {
  return (
    <input
      type="text"
      placeholder="🔎   Search..."
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      className="justify-center border p-2 text-lg w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-shadow duration-300"
      aria-label="Search input"
    />
  );
};

export default SearchInput;
