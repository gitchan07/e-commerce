import React from "react";

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <h4>{item.product_name}</h4>
        <p>Price: Rp{item.price.toLocaleString("id-ID")},00</p>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded p-1"
        />
      </div>
      <button onClick={onDelete} className="text-red-500">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
