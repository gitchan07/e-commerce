import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { HandleBuy } from "@/services/cartService";
const ItemCardComponent = ({ id, title, img_path, price }) => {
  const router = useRouter();

  const host = process.env.NEXT_PUBLIC_HOST;
  const api = `${host}/transactions/`;

  const HandleBuy = async (product_id) => {
    try {
      await axios.post(
        api,
        {
          product_id: product_id,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      alert("Added to cart!");
    } catch (error) {
      console.error("Error making the purchase", error);
      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired or sign in needed. Redirecting to login.");
          router.push("/Login");
        } else {
          alert(`Failed to add to cart! (${error.response.status})`);
        }
      } else {
        alert("Failed to add to cart! Please try again.");
      }
    }
  };

  const handleViewDetails = (product_id) => {
    router.push(`/products/${product_id}`);
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
        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => HandleBuy(id)}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            onClick={() => handleViewDetails(id)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCardComponent;
