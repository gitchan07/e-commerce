import React, { useState } from "react";
import Layout from "@/components/LayoutComponent/Layout";
import UserProfile from "@/components/UserComponent/UserProfile";

const Index = () => {
  return (
    <div className="login-home bg-white">
      <UserProfile />
    </div>
  );
};

export default Index;
