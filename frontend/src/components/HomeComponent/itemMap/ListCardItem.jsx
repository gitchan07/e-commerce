import React from 'react';
import ItemCardComponent from './ItemCardComponent';

const ListCardItem = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-6 lg:p-8">
      {products.map((product) => (
        <ItemCardComponent
          key={product.id}
          id={product.id}
          title={product.title}
          img_path={product.img_path}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ListCardItem;
