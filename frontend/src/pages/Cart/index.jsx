import React, { useState } from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import Cart from "@/components/CartComponent/Cart";
import CartSummary from "@/components/CartComponent/CartSummary";
import Cookies from "js-cookie";
import withAuth from "@/components/hoc/withAuth";
const Index = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const userId = Cookies.get("user_id");

  return (
    <LayoutNoSearch className="h-screen bg-blue-700 grid grid-cols-3 gap-4 p-4 text-black">
      <div className="col-span-2 bg-white rounded p-4">
        <Cart setCartTotal={setCartTotal} userId={userId} />
      </div>
      <div className="bg-white rounded p-4">
        <CartSummary total={cartTotal} userId={userId} onUpdate={() => {}} />
      </div>
    </LayoutNoSearch>
  );
};

export default withAuth(Index, ["buyer"]);
