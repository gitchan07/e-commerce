import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('role');
    Cookies.remove('access_token');
    Cookies.remove('user_id');
    router.push('/Login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
