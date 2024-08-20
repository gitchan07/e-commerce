import React, { useEffect, useState } from "react";
import { getSellerProducts } from "@/services/productService";

const Index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getSellerProducts({});
        if (response && Array.isArray(response.products)) {
          setProducts(response.products);
        }
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <p>{product.category_id}</p>
            <p>{product.title}</p>
            <p>{product.title}</p>
          </div>
        ))
      ) : (
        <p>Product doesn't exist</p>
      )}
    </div>
  );
};

export default Index;
