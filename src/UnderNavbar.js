import React, { useState } from "react";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router";


const UnderNavbar = (props) => {

  return (
    <>
      <NavBar cart={props.cart} />
      <Outlet />
      <Footer />
    </>
  );
};

export default UnderNavbar;
