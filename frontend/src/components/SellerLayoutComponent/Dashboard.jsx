import { useState } from 'react';
import ManageOrders from './ManageOrders';
import ManageProduct from '@/components/Seller/SellerProduct/ManageProduct';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
      {activeTab === 'products' && <ManageProduct />}
    </div>
  );
};

export default Dashboard;
