import React from "react";

const CategoryButton = ({ data, setId }) => {
  return (
    <div>
      {data.map((category) => (
        <button
          key={category.id}
          onClick={() => setId(category.id)}
          className="category-button"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
