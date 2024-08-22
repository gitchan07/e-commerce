import Head from "next/head";
import Layout from "@/components/LayoutComponent/Layout";
import CategoryFilter from "@/components/CategoryComponent/CategoryFilter";
import React, { Suspense } from "react";
import { useRouter } from "next/router";
import withAuth from "@/components/hoc/withAuth";

const ProductsPage = React.lazy(() =>
  import("@/components/ProductComponent/ProductPage")
);

const SellerProductPage = React.lazy(() =>
  import("@/components/SellerProductComponent/SellerProductPage")
);

const ProtectedSellerProductPage = withAuth(SellerProductPage, ['seller']);

export default function Home() {
  const router = useRouter();
  const isSellerRoute = router.pathname.includes("/seller");

  return (
    <Layout>
      <Head>
        <title>Vape Shop</title>
        <meta name="description" content="Welcome to our Vape Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <CategoryFilter />

        <Suspense fallback={<div>Loading...</div>}>
          {isSellerRoute ? <ProtectedSellerProductPage /> : <ProductsPage />}
        </Suspense>
      </div>
    </Layout>
  );
}
