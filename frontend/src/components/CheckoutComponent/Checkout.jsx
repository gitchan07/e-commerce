// components/CheckoutComponent.js
import { useState } from 'react';

const CheckoutComponent = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Shipping Info:', shippingInfo);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingChange}
              placeholder="Full Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingChange}
              placeholder="Address"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              placeholder="City"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
              placeholder="Postal Code"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              placeholder="Country"
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              placeholder="Card Number"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentChange}
              placeholder="Expiry Date (MM/YY)"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              placeholder="CVV"
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="border p-4 rounded">
            <p>Product 1: $50.00</p>
            <p>Product 2: $30.00</p>
            <p className="font-bold">Total: $80.00</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutComponent;
