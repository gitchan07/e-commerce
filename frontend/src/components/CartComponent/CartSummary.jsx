import React, { useState } from "react";

const CartSummary = ({ total, onApplyPromotion }) => {
  const [voucherCode, setVoucherCode] = useState("");

  const handleApply = () => {
    if (voucherCode) {
      onApplyPromotion(voucherCode);
    } else {
      alert("Please enter a voucher code.");
    }
  };

  const formattedTotal = total.toLocaleString("id-ID") + ",00";

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
      <button className="w-full py-2 bg-green-500 rounded">Beli</button>
    </div>
  );
};

export default CartSummary;
