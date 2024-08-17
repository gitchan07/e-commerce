import React, { useState, useContext, useRef } from "react";
import useDebounce from "@/hooks/utils/useDebounce";
import useFetch from "@/hooks/utils/useFetch";
import { SearchContext } from "@/context/SearchProvider";
import SearchInput from "./Input";
import DropdownList from "./DropdownList";

const host = process.env.NEXT_PUBLIC_HOST;

const SearchComponent = () => {
  const { setSearchTerm, setSelectedProductId } = useContext(SearchContext);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 500);
  const { data, error, loading } = useFetch(
    debouncedSearchTerm ? `${host}/products?title=${debouncedSearchTerm}` : null
  );
  const searchRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(debouncedSearchTerm); // Set the search term in context
      setSelectedProductId(null); // Reset selected product
      setIsDropdownVisible(false);
    }
  };

  const handleProductSelect = (id) => {
    setSelectedProductId(id); // Set the selected product ID in context
    setSearchTerm(""); // Clear the search term
    setIsDropdownVisible(false);
  };

  return (
    <div className="w-full sm:w-3/4 md:w-2/4 relative" ref={searchRef}>
      <SearchInput
        value={localSearchTerm}
        onChange={(e) => {
          setLocalSearchTerm(e.target.value);
          setIsDropdownVisible(true);
        }}
        onFocus={() => setIsDropdownVisible(true)}
        onKeyDown={handleKeyDown}
      />

      {isDropdownVisible && (
        <div className="absolute top-full left-0 right-0 bg-white border mt-1 z-10 max-h-[50vh] overflow-y-auto rounded-xl shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
          <DropdownList
            data={data}
            loading={loading}
            error={error}
            onSelect={handleProductSelect} // Pass the product selection handler
          />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
