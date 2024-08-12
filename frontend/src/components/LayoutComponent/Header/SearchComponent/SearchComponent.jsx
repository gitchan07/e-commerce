import React, { useState, useEffect, useRef } from 'react';
import useDebounce from '@/hooks/utils/useDebounce';
import useFetch from '@/hooks/utils/useFetch';

import SearchInput from './Input';
import DropdownList from './DropdownList';


// dummy API
const api = "http://127.0.0.1:5000/products?title=";
// http://127.0.0.1:5000/products?title=

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, error, loading } = useFetch(
    debouncedSearchTerm ? `${api}${debouncedSearchTerm}` : null
  );
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className='w-2/4 relative' ref={searchRef}>
      <SearchInput
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownVisible(true);
        }}
        onFocus={() => setIsDropdownVisible(true)}
      />

      {isDropdownVisible && (
        <div className="absolute top-full left-0 right-0 bg-white border mt-1 z-10 max-h-[50vh] overflow-y-scroll rounded-xl">
          <DropdownList data={data} loading={loading} error={error} />
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
