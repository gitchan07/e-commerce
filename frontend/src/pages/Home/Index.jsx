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
    <Layout className="login-home bg-white">
    {isRegister ? (
      <Register onToggleForm={toggleForm} />
    ) : (
      <Login onToggleForm={toggleForm} />
    )}
    main
    <div>
      {/* tes */}
    </div>
    </Layout>
  );
};

export default Index;
