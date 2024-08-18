import React, { useState } from "react";
import { applyPromotion, checkout } from "@/services/cartService";

const CartSummary = ({ total, userId, onUpdate }) => {
  const [voucherCode, setVoucherCode] = useState("");

  const handleApply = async () => {
    if (voucherCode) {
      try {
        await applyPromotion(userId, voucherCode);
        alert("Promotion applied successfully!");
        onUpdate(); // Refetch items to see the updated total
      } catch (error) {
        console.error("Error applying promotion", error);
        alert("Failed to apply promotion. Please try again.");
      }
    } else {
      alert("Please enter a voucher code.");
    }
  };

  const handleCheckout = async () => {
    try {
      const result = await checkout(userId);

      if (result && result.transaction) {
        alert("Checkout successful!");
        onUpdate();
        window.location.reload();
      } else {
        alert("There are no items in your cart.");
      }
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Failed to checkout. Please try again.");
    }
  };

  const formattedTotal = total + ",00";

  return (
    <div className="p-4 bg-white text-black rounded shadow">
      <h3 className="font-semibold text-lg mb-4">Ringkasan Belanja</h3>
      <p className="font-semibold text-gray-700 mb-2">
        Total: Rp{formattedTotal}
      </p>
      <input
        type="text"
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
        placeholder="Voucher Code"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleApply}
        className="w-full py-2 bg-blue-500 rounded mb-2"
      >
        Apply Promotion
      </button>
      <button
        onClick={handleCheckout}
        className="w-full py-2 bg-green-500 rounded"
      >
        Beli
      </button>
    </div>
  );
};

export default CartSummary;
