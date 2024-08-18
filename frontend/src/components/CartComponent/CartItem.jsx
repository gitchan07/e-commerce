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

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <h4>{item.product_name}</h4>
        <p>Price: Rp{item.price * item.quantity},00</p>
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
