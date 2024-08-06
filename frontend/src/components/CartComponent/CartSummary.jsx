import React from 'react';

const CartSummary = ({ total }) => {
  const formattedTotal = total.toLocaleString('id-ID') + ',00';

  return (
    <div className="p-4 bg-white text-black rounded shadow">
      <h3 className="font-semibold text-lg mb-4">Ringkasan Belanja</h3>
      <p className="font-semibold text-gray-700 mb-2">Total: Rp{formattedTotal}</p>
      <button className="w-full py-2 bg-green-500  rounded">Beli</button>
    </div>
  );
};

export default CartSummary;
