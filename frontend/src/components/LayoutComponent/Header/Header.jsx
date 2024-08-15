import React from "react";
import SearchComponent from "./SearchComponent/SearchComponent";
import CartComponents from "./CartComponent/CartComponents";
import { Plus_Jakarta_Sans } from "next/font/google";
import RegisterButton from "./RegisterButton";
import { useRouter } from "next/router";
import Image from "next/image";

const Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "600",
});

const Header = () => {
  const Route = useRouter();
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
      <RegisterButton />
    </header>
  );
};

export default Header;
