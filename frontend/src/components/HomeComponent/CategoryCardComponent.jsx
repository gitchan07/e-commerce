import React from 'react';

const CategoryCardComponent = ({ category }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-2">{category.name}</h2>
      <p className="text-gray-700">{category.description}</p>
    </div>
  );
};

export default CategoryCardComponent
