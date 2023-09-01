import React, { useState } from "react";
// import { Link } from 'react-router-dom'
// import frem from "../categoryimg/frem.png";
import manshirt from "../categoryimg/manshirt.png";
import mantshirt from "../categoryimg/mantshirt.png";
import manjeans from "../categoryimg/manjeans.png";
import girltshirt from "../categoryimg/girltshirt.png";
import girljeans from "../categoryimg/girljeans.png";
import girlnightdress from "../categoryimg/girlnightdress.png";
import mobileaccessories from "../categoryimg/mobileaccessories.png";
import mobilecover from "../categoryimg/mobilecover.png";
import mobileglass from "../categoryimg/mobileglass.png";
import watch from "../categoryimg/watch.png";
import { Link } from "react-router-dom";

const Category = () => {
  const category = [
    {image:manshirt,title:"Man Shirt"},
    {image:manjeans,title:"Man Jeans"},
    {image:girltshirt,title:"Girl T-Shirt"},
    {image:girljeans,title:"Girl Jeans"},
    {image:girlnightdress,title:"Girl Nightdress"},
    {image:mobileaccessories,title:"Mobile Accessories"},
    {image:mobilecover,title:"Mobile Cover"},
    {image:mobileglass,title:"Mobile Glass"},
    {image:watch,title:"Watch"}
  ];
  

  const handelClick = (i) =>{
  
  }
  
  return (
    <div className=" bg-fff margin-auto">
      <div className="catgrid gap-4 media-grid-3">
        {category.map((item, i) => (
          <Link
            className="text-center text-decoration-none d-flex flex-column gap-2"
            key={i}
            onClick={handelClick(i)}
          >
            {/* <img src={frem} className="imgcate object-fit-contain" /> */}
            <img src={item.image} className="w-100 h-100 object-fit-contain" />
            <p className="color-blue m-0">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
