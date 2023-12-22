import React, { useState } from "react";
// import { Link } from 'react-router-dom'
// import frem from "../categoryimg/frem.png";
import manShirt from "../categoryimg/manShirt.jpg";
import manTShirt from "../categoryimg/manTShirt.jpg";
import manNightWear from "../categoryimg/manNightWear.jpg";
import womanShirt from "../categoryimg/womanShirt.jpg";
import womanTShirt from "../categoryimg/womanTShirt.jpg";
import womanNightWear from "../categoryimg/womanNightWear.jpg";

import { Link } from "react-router-dom";

const Category = (props) => {
  
  const category = [
    {image:manShirt,title:"Man Shirt",api:"MAN-SHIRT"},
    {image:manTShirt,title:"Man T-Shirt",api:"MAN-T-SHIRT"},
    {image:manNightWear,title:"Man NightWear",api:"man_nightwear"},
    {image:womanShirt,title:"Woman Shirt",api:"GIRL-SHIRT"},
    {image:womanTShirt,title:"Woman T-Shirt",api:"GIRL-T-SHIRT"},
    {image:womanNightWear,title:"Woman NightWear",api:"woman_nightwear"},
    
  ];
  

 const handleClick = () =>{
  props.hideModel()
  
 }
  
  return (
    <div className=" bg-fff margin-auto w-100">
      <div className="catgrid gap-2 w-100 media-grid-3">
        {category.map((item, i) => (
          <Link
            className="text-center text-decoration-none w-100 d-flex flex-column gap-2"
            key={i}
            onClick={handleClick}
            to={`/list/${item.api}`}
          >
            <img src={item.image} className="category-image object-fit-contain" />
            <p className="color-blue m-0">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
