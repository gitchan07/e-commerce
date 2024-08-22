import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Link from "next/link";
import SearchComponent from "./SearchComponent/SearchComponent";
import CartComponents from "./CartComponent/CartComponents";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";
import { Plus_Jakarta_Sans } from "next/font/google";

const Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "600",
});

const PromotionButton = () => (
  <Link href="/Promotion" className="p-2 bg-green-600 text-white rounded">
    Promotion
  </Link>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const Route = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role) {
      setIsLoggedIn(true);
      if (role === "seller") {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    }
  }, []);

  const handleHome = () => Route.push("/");

  return (
    <header className="flex flex-row justify-around items-center space-x-8 text-black bg-white w-full py-4">
      <button onClick={handleHome} className={`${Jakarta.className}`}>
        <img
          src="/images/vapor-vault-logo.png"
          alt="Vapor Vault Logo"
          className="rounded-lg w-16 h-16 object-contain"
        />
      </button>
      <SearchComponent />
      <CartComponents />
      {isLoggedIn ? (
        <>
          {isSeller ? (
            <>
              <Link
                href="/Seller"
                className="p-2 bg-indigo-600 text-white rounded"
              >
                Seller Dashboard
              </Link>
              <PromotionButton />
            </>
          ) : (
            <Link
              href="/Profile"
              className="p-2 bg-indigo-600 text-white rounded"
            >
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

export default Header;
