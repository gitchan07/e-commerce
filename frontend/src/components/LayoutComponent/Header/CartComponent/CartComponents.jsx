import { useRouter } from 'next/router';
import React from 'react';

const CartComponents = () => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push('/Cart');
  };

  return (
    <button onClick={handleCartClick} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-xl hover:bg-gradient-to-r hover:from-yellow-700 hover:to-yellow-500 shadow-lg transition-transform transform hover:scale-105">
      Cart
    </button>
  );
};

export default CartComponents;
