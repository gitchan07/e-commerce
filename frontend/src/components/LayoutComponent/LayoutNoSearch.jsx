import React from "react";
import Footer from "./Footer/Footer";
import HeaderNoSearch from "./Header/HeaderNoSearch";
import Cookies from "js-cookie";

const LayoutNoSearch = ({ children, className }) => {
  const role = Cookies.get('role');
  const isSeller = role === 'seller';

  return (
    <main>
      <HeaderNoSearch />
      <section className={` ${className} ${isSeller ? 'no-searchbar' : ''}`}>
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default LayoutNoSearch;
