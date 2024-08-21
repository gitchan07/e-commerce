import React from 'react';
import { useRouter } from 'next/router';

const PromotionButton = () => {
  const router = useRouter();

  const handlePromotion = () => {
    router.push('/Promotion');
  };

  return (
    <button onClick={handlePromotion} className="p-2 bg-green-600 text-white rounded">
      Add Promotion
    </button>
  );
};

export default PromotionButton;
