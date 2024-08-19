import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import { HandleBuy } from "@/services/cartService";
import { useRouter } from "next/router";
const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const token = Cookies.get("access_token");
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST}/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <LayoutNoSearch className="bg-white text-black py-8 px-4 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src={product.img_path}
            alt={product.title}
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-16">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-green-600 font-semibold mb-2">
            Rp.{" "}
            {product.price.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p
            className={`text-lg ${
              product.stock > 0 ? "text-gray-700" : "text-red-600"
            } mb-4`}
          >
            Stock: {product.stock > 0 ? `Sisa ${product.stock}` : "Habis"}
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <div>
            <button
              onClick={() => HandleBuy(Number(product.id))}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </LayoutNoSearch>
  );
};

export default ProductDetails;
