import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus cookie atau token yang digunakan untuk autentikasi
    Cookies.remove('role');
    // Redirect ke halaman login atau halaman utama
    router.push('/Login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
