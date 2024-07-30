import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children,className }) => {
  return (
      
      <main>
        <Header />
        <section className={` ${className}`}>
        {children}
        </section>
        <Footer />
      </main>
  );
};

export default Layout;
