import React, { useState } from "react";
import LayoutNoSearch from "@/components/LayoutComponent/LayoutNoSearch";
import Register from "@/components/RegisterComponent/Register";
import Login from "@/components/RegisterComponent/Login";

const Index = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <LayoutNoSearch className="login-home bg-white">
      {isRegister ? (
        <Register onToggleForm={toggleForm} />
      ) : (
        <Login onToggleForm={toggleForm} />
      )}
    </LayoutNoSearch>
  );
};

export default Index;
