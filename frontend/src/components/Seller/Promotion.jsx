import { useState } from 'react';

const SellerPromotionInput = () => {
  const [promotions, setPromotions] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [valueDiscount, setValueDiscount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPromotion = () => {
    const newPromotion = {
      voucher_code: voucherCode,
      value_discount: valueDiscount,
      description: description,
    };
    setPromotions([...promotions, newPromotion]);
    setVoucherCode('');
    setValueDiscount('');
    setDescription('');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Add Promotion</h3>
      <div className="mb-4">
        <label className="block mb-2">Voucher Code</label>
        <input
          type="text"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Value Discount (%)</label>
        <input
          type="number"
          value={valueDiscount}
          onChange={(e) => setValueDiscount(e.target.value)}
          className="border p-2 rounded w-full"
          min="1"
          max="100"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleAddPromotion}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Promotion
      </button>

      <h3 className="text-xl font-semibold mt-6 mb-4">Promotions</h3>
      <ul>
        {promotions.map((promo, index) => (
          <li key={index} className="border p-4 rounded mb-4">
            <pre>{JSON.stringify(promo, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPromotionInput;
