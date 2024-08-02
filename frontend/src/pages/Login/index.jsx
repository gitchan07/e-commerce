import React, { useState } from 'react';
import Layout from '@/components/LayoutComponent/Layout';
import Register from '@/components/RegisterComponent/Register';
import Login from '@/components/RegisterComponent/Login';

const Index = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <Layout className="login-home bg-white">
      {isRegister ? (
        <Register onToggleForm={toggleForm} />
      ) : (
        <Login onToggleForm={toggleForm} />
      )}
    </Layout>
  );
};

export default Index;
