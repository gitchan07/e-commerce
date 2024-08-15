import React from 'react';

const ItemCardComponent = ({ id, title, img_path, description, price }) => {
  return (
    <div
      key={id}
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img className="w-full object-cover" src={img_path} alt={title} loading="lazy" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold text-lg">${price}</span>
      </div>
    </div>
  );
};

export default ItemCardComponent;
