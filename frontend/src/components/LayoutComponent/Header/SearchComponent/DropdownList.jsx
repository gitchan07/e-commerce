import React from "react";

const DropdownList = ({ data, loading, error, onSelect }) => {
  if (loading)
    return (
      <div className="p-2 flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  if (error)
    return (
      <div className="p-2 text-red-600">
        Error: {error.message}
        <button
          onClick={() => window.location.reload()}
          className="ml-2 p-1 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );

  if (data && data.products.length === 0) {
    return (
      <div className="p-2 text-gray-500">
        No products found for your search.
      </div>
    );
  }

  return (
    <ul className="list-none p-2 m-0 transition-all duration-300 ease-in-out transform scale-100">
      {data &&
        data.products.map((item) => (
          <li key={item.id}>
            <button
              className="w-full text-start p-2 border-b hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 ease-in-out cursor-pointer focus:bg-blue-100 focus:text-white"
              role="option"
              tabIndex="0"
              aria-selected="false"
              onClick={() => onSelect(item.id)} // Pass the product ID back to the parent
            >
              {item.title}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default DropdownList;
