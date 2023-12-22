import React, { useState } from "react";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router";


const UnderNavbar = (props) => {
  
  return (
    <>
      {/* <div className='position-sticky top-0 z-2'> */}
        <NavBar cart={props.cart}/>
      {/* </div> */}
      <Outlet />
      
      <Footer />
    </>
  );
};

export default UnderNavbar;
