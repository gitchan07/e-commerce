import React from 'react';
import CategoryCardComponent from './CategoryCardComponent';

const ListCardCategory = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <CategoryCardComponent
          key={index}
          title={category.title}
          description={category.description}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
};

export default ListCardCategory;
