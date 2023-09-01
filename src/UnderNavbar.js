import React from "react";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router";

const UnderNavbar = () => {
  return (
    <>
      <div className='position-sticky top-0 z-2'>
        <NavBar/>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default UnderNavbar;
