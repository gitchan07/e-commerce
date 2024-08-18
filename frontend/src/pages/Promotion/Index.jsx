import React from 'react';
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from 'next/link';

const Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "600",
});

const PromotionPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className={`text-4xl font-bold mb-4 ${Jakarta.className}`}>Special Promotion!</h1>
        <p className="text-lg mb-6">
          Don't miss out on our exclusive offers. Enjoy up to 50% off on selected items!
        </p>
        <div className="flex justify-center">
          <Link href="/shop" legacyBehavior>
            <a className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg">Shop Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;
