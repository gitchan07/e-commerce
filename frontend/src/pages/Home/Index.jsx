import Head from "next/head";
import Layout from "@/components/LayoutComponent/Layout";
import CategoryFilter from "@/components/CategoryComponent/CategoryFilter";
import React, { Suspense } from "react";

const ProductsPage = React.lazy(() =>
  import("@/components/ProductComponent/ProductPage")
);

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Vape Shop</title>
        <meta name="description" content="Welcome to our Vape Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <CategoryFilter />

        <Suspense fallback={<div>Loading products...</div>}>
          <ProductsPage />
        </Suspense>
      </div>
    </Layout>
  );
}
