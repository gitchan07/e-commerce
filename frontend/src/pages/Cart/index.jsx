import React, { useState } from "react";
import Layout from "@/components/LayoutComponent/Layout";
import Cart from "@/components/CartComponent/Cart";
import CartSummary from "@/components/CartComponent/CartSummary";

const Index = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const api = "";
  return (
    <Layout className="h-screen bg-blue-700 grid grid-cols-3 gap-4 p-4">
      <div className="col-span-2 bg-white rounded p-4">
        <Cart setCartTotal={setCartTotal} api={api} />
      </div>
      <div className="bg-white rounded p-4">
        <CartSummary total={cartTotal} />
      </div>
    </Layout>
  );
};

export default Index;
