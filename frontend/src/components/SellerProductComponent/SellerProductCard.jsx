import React from "react";
import { useRouter } from "next/router";

const SellerProductCard = ({ id, title, img_path, price, stock }) => {
  const router = useRouter();

  const handleEditProduct = (product_id) => {
    router.push(`/EditProduct/${product_id}`);
  };

  return (
    <div
      key={id}
      className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          className="w-full h-full object-cover"
          src={img_path}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-2xl mb-3 text-gray-900">{title}</h2>
        <div className="text-gray-900 font-bold text-xl mb-4">Rp.{price}</div>
        <div className="text-gray-600 font-bold text-lg mb-4">Stock: {stock}</div>
        <div className="flex justify-between">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={() => handleEditProduct(id)}
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
