import { useRouter } from 'next/router';
import React from 'react';

const CartComponents = () => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push('/Cart');
  };

  return (
    <button onClick={handleCartClick}>
      Cart
    </button>
  );
};

export default CartComponents;
