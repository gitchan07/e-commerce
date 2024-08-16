import React, { useState } from 'react';
import Layout from '@/components/LayoutComponent/Layout';
import UserProfile from '@/components/UserComponent/UserProfile';

const Index = () => {

  return (
    <Layout className="login-home bg-white">
      <UserProfile />
    </Layout>
  );
};

export default Index;
