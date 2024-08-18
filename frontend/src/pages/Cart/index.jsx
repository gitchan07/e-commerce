import React, { useState } from "react";

import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import Cart from "@/components/CartComponent/Cart";
import CartSummary from "@/components/CartComponent/CartSummary";

const Index = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const api = `${process.env.NEXT_PUBLIC_HOST}/transactions`;

  const handleApplyPromotion = async (voucherCode) => {
    const transactionId = ""; // Retrieve the current transaction ID
    try {
      await axios.put(
        `${api}/${transactionId}/apply-promotion`,
        { voucher_code: voucherCode },
        {
          headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
        }
      );
      alert("Promotion applied successfully!");
    } catch (error) {
      console.error("Error applying promotion", error);
      alert("Failed to apply promotion. Please try again.");
    }
  };

  return (
    <LayoutNoSearch className="h-screen bg-blue-700 grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2 bg-white rounded p-4">
        <Cart setCartTotal={setCartTotal} api={api} />
      </div>
      <div className="bg-white rounded p-4">
        <CartSummary
          total={cartTotal}
          onApplyPromotion={handleApplyPromotion}
        />
      </div>
    </LayoutNoSearch>
  );
};

export default Index;
