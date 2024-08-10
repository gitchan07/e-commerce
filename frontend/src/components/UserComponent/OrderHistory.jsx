// UserComponent/OrderHistory.jsx
import { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order history from an API or database
    const fetchOrders = async () => {
      const data = await fetch('/api/orders').then((res) => res.json());
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">Order #{order.id}</h3>
            <p>Date: {order.date}</p>
            <p>Total: {order.total}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
