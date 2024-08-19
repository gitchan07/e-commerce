import React, { useEffect, useState } from "react";
import { fetchTotalPrice } from "@/services/cartService";
import Cookies from "js-cookie";

const Index = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const userId = Cookies.get("user_id");

  const loadTotalPrice = async (userId) => {
    try {
      const data = await fetchTotalPrice(userId);
      console.log("Total Price:", data);
      setTotalPrice(data.total_price);
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

  useEffect(() => {
    loadTotalPrice(userId);
  }, [userId]);

  return (
    <div>
      {totalPrice !== null ? `Total Price: ${totalPrice}` : "Loading..."}
    </div>
  );
};

export default Index;
