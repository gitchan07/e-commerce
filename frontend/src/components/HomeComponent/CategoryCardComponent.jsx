import React from 'react';

const CategoryCardComponent = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:transform hover:scale-105 transition-transform duration-300">
          <img src={category.image} alt={category.title} className="w-full h-auto object-cover mb-4 rounded-t-lg" />
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h2>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>
      ))}
    </>
  );
  
};

export default CategoryCardComponent;
