import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { fetchCartItems } from "@/services/cartService";

const Cart = ({ setCartTotal, userId }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCartItems = async () => {
    try {
      const data = await fetchCartItems(userId);

      if (
        !data.transaction ||
        data.transaction.transaction_status !== "pending"
      ) {
        setItems([]);
        setCartTotal(0);
      } else {
        setItems(data.transaction_details || []);
        setCartTotal(parseFloat(data.transaction.total_price_all)); // Use the total_price_all from transaction data
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleCheckoutUpdate = () => {
    setItems([]);
    setCartTotal(0);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div className="flex-grow p-4 bg-white rounded shadow">
      {items.length > 0 ? (
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            userId={userId}
            onUpdate={loadCartItems}
          />
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
