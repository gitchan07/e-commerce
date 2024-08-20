import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import withAuth from "@/components/hoc/withAuth";
import ListProducts from "@/components/Seller/SellerProduct/ListProduct";
import ManageProduct from "@/components/Seller/SellerProduct/ManageProduct";

const Index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      < ManageProduct/>
      <ListProducts/>
    </LayoutNoSearch>
  );
};

export default withAuth(Index, ['seller']);
