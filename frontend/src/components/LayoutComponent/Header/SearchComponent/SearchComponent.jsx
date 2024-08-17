import React, { useState, useEffect, useRef } from "react";
import useDebounce from "@/hooks/utils/useDebounce";
import useFetch from "@/hooks/utils/useFetch";

import SearchInput from "./Input";
import DropdownList from "./DropdownList";

// api ditaruh disini
const host = process.env.NEXT_PUBLIC_HOST;
const api = `${host}/products?title=`;

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, error, loading } = useFetch(
    debouncedSearchTerm ? `${api}${debouncedSearchTerm}` : null
  );
  const searchRef = useRef(null);

  const handleKeyDown = (e) => {
    if (
      e.key === "ArrowDown" &&
      data &&
      selectedIndex < data.products.length - 1
    ) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      alert(`You selected ${data.products[selectedIndex].title}`);
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="w-full sm:w-3/4 md:w-2/4 relative" ref={searchRef}>
      <SearchInput
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownVisible(true);
        }}
        onFocus={() => setIsDropdownVisible(true)}
        onKeyDown={handleKeyDown}
      />

      {isDropdownVisible && (
        <div className="absolute top-full left-0 right-0 bg-white border mt-1 z-10 max-h-[50vh] overflow-y-auto rounded-xl shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
          <DropdownList data={data} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
