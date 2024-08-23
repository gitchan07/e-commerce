import React from "react";
import SellerProductCard from "./SellerProductCard";

const SellerProductList = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {products.map((product) => (
        <SellerProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          img_path={product.img_path}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </div>
  );
};

export default SellerProductList;
