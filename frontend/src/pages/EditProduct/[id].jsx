import React from "react";
import ProductEditForm from "@/components/Seller/SellerProduct/ProductEdit";
import { useRouter } from "next/router";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import withAuth from "@/components/hoc/withAuth";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  return (
    <div>
      <LayoutNoSearch>
        <ProductEditForm productId={id} />
      </LayoutNoSearch>
    </div>
  );
};

export default withAuth(EditProductPage, ["seller"]);
// const updateProduct = async (id,formikdata, imagefile )=>{
//   try{
//     const result = await updateProduct(id,productData,abc.jpg)
//   }
//     catch (err) {
//     console.err(err)
//   }

// }
