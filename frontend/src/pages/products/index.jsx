import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import withAuth from "@/components/hoc/withAuth";
import ListProducts from "@/components/Seller/ListProduct";
import ManageProduct from "@/components/Seller/ManageProduct";

const Index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      < ManageProduct/>
      <ListProducts/>
    </LayoutNoSearch>
  );
};

export default withAuth(Index, ['seller']);
