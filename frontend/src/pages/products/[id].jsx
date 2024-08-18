import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // Import js-cookie to get the token

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        try {
          const token = Cookies.get("access_token"); // Get the JWT token from cookies
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_HOST}/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token in the authorization header
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
    <div>
      <h1>{product.title}</h1>
      <img src={product.img_path} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: Rp.{product.price}</p>
    </div>
  );
};

export default ProductDetails;
