import React from 'react';
import CategoryCardComponent from './CategoryCardComponent';

const ListCardCategory = ({ categories }) => {
  return (
    <div className="flex flex-wrap justify-around gap-6 p-6">
      {categories.map((category) => (
        <CategoryCardComponent key={category.id} category={category} />
      ))}
    </div>
  );
};

export default ListCardCategory;

