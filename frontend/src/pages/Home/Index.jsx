import Head from "next/head";
import Layout from "@/components/LayoutComponent/Layout";
import React, { Suspense } from "react";
import Cookies from "js-cookie";

const ProductsPage = React.lazy(() =>
  import("@/components/ProductComponent/ProductPage")
);

const SellerProductPage = React.lazy(() =>
  import("@/components/SellerProductComponent/SellerProductPage")
);

export default function Home() {
  const role = Cookies.get('role') ?? ''
  return (

    <Layout >
      <Head>
        <title>QuickBuy</title>
        <meta name="description" content="Welcome to our Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">

        <Suspense fallback={<div>Loading...</div>}>
          {role !== "" && role === 'seller' ? (
            <SellerProductPage />
          ):(
            <ProductsPage />
          )}
        </Suspense>
      </div>
    </Layout>
  );
}
