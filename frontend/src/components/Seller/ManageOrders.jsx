import { useState } from 'react';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', total: '$100.00', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', total: '$50.00', status: 'Shipped' },
  ]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Manage Orders</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="border p-2 rounded mb-2">
            <h5 className="font-bold">Order #{order.id}</h5>
            <p>Customer: {order.customer}</p>
            <p>Total: {order.total}</p>
            <p>Status: {order.status}</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
