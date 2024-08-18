import React, { useEffect, useState } from "react";
import { updateQuantity, deleteItem } from "@/services/cartService";

const AddReduceQuantityButton = ({ item, userId, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item]);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      await updateQuantity(userId, item.product_id, newQuantity);
      onUpdate();
    } else {
      await deleteItem(userId, item.product_id);
      onUpdate();
    }
  };

  const handleAdd = () => {
    handleUpdateQuantity(quantity + 1);
  };

  const handleReduce = () => {
    handleUpdateQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleReduce}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        -
      </button>
      <p className="mx-2">{quantity}</p>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-2 py-1 rounded"
      >
        +
      </button>
    </div>
  );
};

export default AddReduceQuantityButton;
