import React, { useState } from 'react';
import Layout from '@/components/LayoutComponent/Layout';
import Register from '@/components/RegisterComponent/register';
import Login from '@/components/RegisterComponent/login';

const Index = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };
  return (
    <Layout className=" bg-white">
      {isRegister ? (
        <Register onToggleForm={toggleForm} />
      ) : (
        <Login onToggleForm={toggleForm} />
      )}
    </Layout>
  );
};

export default Index;