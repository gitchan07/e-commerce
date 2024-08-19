import React from "react";
import CartComponents from "./CartComponent/CartComponents";
import { Plus_Jakarta_Sans } from "next/font/google";
import RegisterButton from "./RegisterButton";
import { useRouter } from "next/router";
import Image from "next/image";

const Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "600",
});

const HeaderNoSearch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get('role');
    if (role) {
      setIsLoggedIn(true);
      setIsSeller(role === 'seller');
    }
  }, []);

  const handleHome = () => router.push("/");

  return (
    <header className="flex flex-row justify-around items-center space-x-8 text-black bg-white w-full py-4">
      <button onClick={handleHome} className={`${Jakarta.className}`}>
        <Image
          src="/images/vapor-vault-logo.png"
          alt="Vapor Vault Logo"
          className="rounded-lg w-16 h-16 object-contain"
          width={64}
          height={64}
        />
      </button>
      {!isSeller && <SearchComponent />}
      <CartComponents />
      {isLoggedIn ? (
        <>
          {isSeller ? (
            <Link href="/Seller" className="p-2 bg-indigo-600 text-white rounded">
              Seller Dashboard
            </Link>
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
