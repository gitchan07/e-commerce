import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import CreateProduct from "@/components/ProductComponent/CreateProduct";
import withAuth from "@/components/hoc/withAuth";

const Index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      <CreateProduct />
    </LayoutNoSearch>
  );
};

export default withAuth(Index, ["seller"]);
