import React from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import ProductEditForm from "@/components/Seller/SellerProduct/ProductEdit";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <LayoutNoSearch className="create-product-page bg-white">
      {id ? <ProductEditForm productId={id} /> : <p>Loading...</p>}
    </LayoutNoSearch>
  );
};

export default Index;
