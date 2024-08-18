import React from "react";
import AddReduceQuantityButton from "./AddReduceQuantityButton";
import { deleteItem } from "@/services/cartService";

const CartItem = ({ item, userId, onUpdate }) => {
  const handleRemoveItem = async () => {
    try {
      await deleteItem(userId, item.product_id);
      onUpdate();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  // Format the total price for the item
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  })
    .format(item.price * item.quantity)
    .replace("IDR", "Rp")
    .trim();

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <h4>{item.product_name}</h4>
        <p>Price: {formattedPrice}</p>
        <AddReduceQuantityButton
          item={item}
          userId={userId}
          onUpdate={onUpdate}
        />
      </div>
      <button onClick={handleRemoveItem} className="text-red-500">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
