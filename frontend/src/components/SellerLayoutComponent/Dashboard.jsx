import { useState } from 'react';
import ManageOrders from './ManageOrders';
import ManageProduct from '@/components/Seller/SellerProduct/ManageProduct';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
      <div className="flex mb-6">
        <button
          className={`mr-4 p-2 ${activeTab === 'products' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('products')}
        >
          Create Products
        </button>
        <button
          className={`mr-4 p-2 ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          Manage Orders
        </button>
      </div>
      {activeTab === 'products' && <ManageProduct />}
      {activeTab === 'orders' && <ManageOrders />}
    </div>
  );
};

export default Dashboard;
