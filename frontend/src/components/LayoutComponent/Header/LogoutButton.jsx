import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const host = process.env.NEXT_PUBLIC_HOST;
      const api = `${host}/users/logout`;

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("access_token")}`
        }
      });

      const data = await response.json();

      if (response.status === 200) {
        Cookies.remove('role');
        Cookies.remove('access_token');
        Cookies.remove('user_id');
        router.push('/Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    } 
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
