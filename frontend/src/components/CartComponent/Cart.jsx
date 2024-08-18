import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CartItem from "./CartItem";
import { useRouter } from "next/router";

const Cart = ({ setCartTotal, api }) => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${api}/transactions`, {
        headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
      });
      setItems(response.data.details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [api]);

  useEffect(() => {
    if (items) {
      const total = items.reduce((sum, item) => sum + item.total_price_item, 0);
      setCartTotal(total);
    }
  }, [items, setCartTotal]);

  const handleUpdateQuantity = async (
    transaction_id,
    detail_id,
    new_quantity
  ) => {
    try {
      await axios.put(
        `${api}/transactions/${transaction_id}/details/${detail_id}`,
        { quantity: new_quantity },
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      fetchCartItems(); // Refresh cart items after updating
    } catch (error) {
      console.error("Error updating quantity", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handleDeleteItem = async (transaction_id, detail_id) => {
    try {
      await axios.delete(
        `${api}/transactions/${transaction_id}/details/${detail_id}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      fetchCartItems(); // Refresh cart items after deletion
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  const handleApplyPromotion = async (transaction_id, voucher_code) => {
    try {
      await axios.put(
        `${api}/transactions/${transaction_id}/apply-promotion`,
        { voucher_code },
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      alert("Promotion applied successfully!");
      fetchCartItems(); // Refresh cart items after applying promotion
    } catch (error) {
      console.error("Error applying promotion", error);
      alert("Failed to apply promotion. Please try again.");
    }
  };

  const handleCheckout = async (transaction_id) => {
    try {
      await axios.put(
        `${api}/transactions/${transaction_id}/checkout`,
        {},
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      alert("Checkout successful!");
      fetchCartItems(); // Refresh cart items after checkout
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Failed to checkout. Please try again.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error: {error.message}</p>;

  return (
    <div className="flex-grow p-4 bg-white rounded shadow">
      {items && items.length > 0 ? (
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(new_quantity) =>
              handleUpdateQuantity(item.transaction_id, item.id, new_quantity)
            }
            onDelete={() => handleDeleteItem(item.transaction_id, item.id)}
          />
        ))
      ) : (
        <p>Cart is empty</p>
      )}
      <button
        onClick={() => handleCheckout(items[0]?.transaction_id)}
        className="w-full py-2 bg-green-500 rounded mt-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
