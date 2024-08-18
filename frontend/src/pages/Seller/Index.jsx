import Head from "next/head";
import Dashboard from "../../components/SellerComponent/Dashboard";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
export default function Seller() {
  return (
    <div>
      <Head>
        <title>Seller Dashboard</title>
        <meta name="description" content="Seller dashboard page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <Dashboard />
      </main>
    </div>
  );
}
