// pages/index.jsx
import Head from "next/head";
import Layout from "@/components/LayoutComponent/Layout";
import ProductsPage from "@/components/ProductComponent/ProductPage";
import CategoryFilter from "@/components/CategoryComponent/CategoryFilter";
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
        <ProductsPage />
      </div>
    </Layout>
  );
}
