import React from 'react';

const ListCardComponent = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
    </div>
  );
};

export default ListCardComponent
