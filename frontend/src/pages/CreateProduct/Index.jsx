import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import CreateProduct from "@/components/ProductComponent/CreateProduct";
const Index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      <CreateProduct />
    </LayoutNoSearch>
  );
};

export default Index;
