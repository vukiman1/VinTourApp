import React from "react";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";

const Layout = ({ cpn }) => {
  return (
    <>
      <Header />
      {cpn}
      <Footer />
    </>
  );
};

export default Layout;
