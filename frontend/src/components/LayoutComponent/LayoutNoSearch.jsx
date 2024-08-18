import React from "react";

import Footer from "./Footer/Footer";
import HeaderNoSearch from "./Header/HeaderNoSearch";
const LayoutNoSearch = ({ children, className }) => {
  return (
    <main>
      <HeaderNoSearch />
      <section className={` ${className}`}>{children}</section>
      <Footer />
    </main>
  );
};

export default LayoutNoSearch;
