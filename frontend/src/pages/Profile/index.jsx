import React, { useState } from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import UserProfile from "@/components/UserComponent/UserProfile";

const Index = () => {
  return (
    <LayoutNoSearch className="login-home bg-white">
      <UserProfile />
    </LayoutNoSearch>
  );
};

export default Index;
