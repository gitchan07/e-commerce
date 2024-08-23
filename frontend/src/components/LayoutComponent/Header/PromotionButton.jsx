import React from 'react';
import { useRouter } from 'next/router';

const PromotionButton = () => {
  const router = useRouter();

  const handlePromotion = () => {
    router.push('/Promotion');
  };

  return (
    <button onClick={handlePromotion} className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl hover:bg-gradient-to-r hover:from-green-700 hover:to-green-500 shadow-lg transition-transform transform hover:scale-105">
      Add Promotion
    </button>
  );
};

export default PromotionButton;
