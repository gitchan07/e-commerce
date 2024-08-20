import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import CreateProduct from "@/components/ProductComponent/CreateProduct";
const index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      <CreateProduct />
    </LayoutNoSearch>
  );
};

export default index;
