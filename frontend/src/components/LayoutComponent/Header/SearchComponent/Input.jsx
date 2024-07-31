import React from 'react';

const SearchInput = ({ value, onChange, onFocus }) => {
  return (
    <input
      type="text"
      placeholder="🔎   Search..."
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className="justify-center border p-2 text-lg w-full"
    />
  );
};

export default SearchInput;
