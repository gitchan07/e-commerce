import React from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import Next.js useRouter hook

const ItemCardComponent = ({ id, title, img_path, description, price }) => {
  const router = useRouter(); // Initialize the router for navigation

  const host = process.env.NEXT_PUBLIC_HOST;
  const api = `${host}/transactions/`;
  const HandleBuy = async (product_id) => {
    try {
      await axios.post(api, {
        product_id: product_id,
      });
      alert("Added to cart!");
    } catch (error) {
      console.error("Error making the purchase", error);

      // Check if the error response exists and has a status code
      if (error.response) {
        if (error.response.status === 401) {
          // If the status is 401 Unauthorized, redirect to login page
          alert("Session expired or sign in needed Redirecting to login.");
          router.push("/Login");
        } else {
          // Handle other status codes if necessary
          alert(`Failed to add to cart! (${error.response.status})`);
        }
      } else {
        // Handle any other errors that don't have a response
        alert("Failed to add to cart! Please try again.");
      }
    }
  };
  return (
    <div
      key={id}
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          className="w-full object-cover"
          src={img_path}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold text-lg">Rp.{price}</span>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        // onClick={() => console.log(id)}
        onClick={() => HandleBuy(id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCardComponent;
