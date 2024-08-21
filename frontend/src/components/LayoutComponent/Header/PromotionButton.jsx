import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const PromotionButton = () => {
  const router = useRouter();

  const handlePromotion = async () => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST;
      const api = `${host}/promotions`;

      const promotionDetails = {
        voucher_code: "",
        value_discount: "", // 50%
        description: ""
      };

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("role")}`
        },
        body: JSON.stringify(promotionDetails)
      });

      const data = await response.json();

      if (response.status === 200) {
        alert("Promosi berhasil dibuat!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Promotion error:", error);
      alert("Terjadi kesalahan saat membuat promosi.");
    }
  };

  return (
    <button onClick={handlePromotion}>
      Add Promotion
    </button>
  );
};

export default PromotionButton;
