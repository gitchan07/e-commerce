import React, { useState, useEffect } from 'react';
import Layout from '@/components/LayoutComponent/Layout';
import Register from '@/components/RegisterComponent/Register';
import Login from '@/components/RegisterComponent/Login';
import UserDashboard from '@/components/UserDashboardComponent/UserDashboard';
import Cookies from 'js-cookie';

const Index = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    // Check if user is logged in
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Layout className="login-home bg-white">
      {user ? (
        <UserDashboard user={user} />
      ) : (
        isRegister ? (
          <Register onToggleForm={toggleForm} />
        ) : (
          <Login onToggleForm={toggleForm} />
        )
      )}
    </Layout>
  );
};

export default Index;
