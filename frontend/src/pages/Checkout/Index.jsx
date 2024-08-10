import Head from 'next/head';
import CheckoutComponent from '../../components/CheckoutComponent';

export default function Checkout() {
  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <CheckoutComponent />
      </main>
    </div>
  );
}
