import React from "react";

const CategoryButton = ({ data = [], setId }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => setId(category.id)}
          className="category-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
