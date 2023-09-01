import React from "react";
import "../style/addcartbtn.css";
import { useState } from "react";

const AddCartBtn = (props) => {
const [click,setClick] = useState(false)
  return (
    
      <button className={`cart-button ${props.className} w-100 ${click?'clicked':''}`}>
        <div className={`w-100 p-8px ${!click?"add-to-cart":"added"}`} onClick={()=>{setClick(true);props.addToCart()}}>{!click?"Add To Cart":"Added"}</div>
        <i className="fas fa-shopping-cart"></i>
        <i className="fas fa-box"></i>
      </button>
    
  );
};

export default AddCartBtn;
