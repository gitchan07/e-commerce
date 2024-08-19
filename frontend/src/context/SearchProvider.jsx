import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryId,
        setSelectedCategoryId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
