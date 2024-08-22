import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import withAuth from "@/components/hoc/withAuth";
import ListProducts from "@/components/Seller/SellerProduct/ListProduct";
import ManageProduct from "@/components/Seller/SellerProduct/ManageProduct";
import SellerProductPage from "@/components/SellerProductComponent/SellerProductPage";

const Index = () => {
  return (
    <LayoutNoSearch className="create-product-page bg-white">
      < ManageProduct/>
      <SellerProductPage/>
    </LayoutNoSearch>
  );
};

export default withAuth(Index, ['seller']);
