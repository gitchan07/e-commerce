import React from 'react';
import Layout from '@/components/LayoutComponent/Layout';

const UserDashboard = ({ user }) => {
  return (
    <Layout className="user-dashboard bg-white">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow shadow-slate-400 rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Welcome, {user.name}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Profile</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="p-4 bg-emerald-100 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Actions</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li><a href="/products" className="text-emerald-600 hover:underline">View Products</a></li>
              <li><a href="/orders" className="text-emerald-600 hover:underline">View Orders</a></li>
              <li><a href="/settings" className="text-emerald-600 hover:underline">Account Settings</a></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
