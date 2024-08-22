import React, { useEffect, useState } from "react";
import CartComponents from "./CartComponent/CartComponents";
import { Plus_Jakarta_Sans } from "next/font/google";
import RegisterButton from "./RegisterButton";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import PromotionButton from "./PromotionButton";

const Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "600",
});

const HeaderNoSearch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const Route = useRouter();
  const handleHome = () => Route.push("/");

  useEffect(() => {
    const role = Cookies.get('role');
    if (role) {
      setIsLoggedIn(true);
      if (role === 'seller') {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    }
  }, []);

  return (
    <header className="flex flex-row justify-around items-center space-x-8 text-black bg-white w-full py-4">
      <button onClick={handleHome} className={`${Jakarta.className}`}>
        <img
          src="/images/vapor-vault-logo.png"
          alt="Vapor Vault Logo"
          className="rounded-lg w-16 h-16 object-contain"
        />
      </button>
      {isLoggedIn && !isSeller && <CartComponents />}
      {isLoggedIn ? (
        <>
          {isSeller ? (
            <>
              <Link href="/Seller" className="p-2 bg-indigo-600 text-white rounded">
                Seller Dashboard
              </Link>
              <PromotionButton />
            </>
          ) : (
            <Link href="/Profile" className="p-2 bg-indigo-600 text-white rounded">
              User Profile
            </Link>
          )}
          <LogoutButton />
        </>
      ) : (
        <RegisterButton />
      )}
    </header>
  );
};

export default HeaderNoSearch;
