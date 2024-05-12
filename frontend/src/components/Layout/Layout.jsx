import React from "react";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";
import Routers from "../../router/Routers";
const Layout = ({ cpn }) => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
