import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Grid4upto = ({item,heading}) => {
  const [items,setItems]=useState([])
  
  useEffect(()=>{
    if(item){
      const newData = item.slice(0,4)
      setItems(newData)
    }
  },[item])
  
  return (
    <div className="border-1px border-radius-5 box-shadow-1 cursor-pointer">
      <h2 className="f-20 fw-600">{heading}</h2>
      <div className="grid-2">
        {
          items?.map((item,i)=>(
            <div key={i}>
          <img
            src={item.image}
            alt="image"
            className="w-100 object-fit-contain h-150px"
          />
          <div>
            <div className="display-flex flex-column gap-1  justify-content-center">
              <div className="text-decoration-none bg-darkpink color-fff p-5px f-12 height-wabkit border-radius-5 line-13 w-max-cont">
                Up to 80% Off
              </div>
              <p className="color-darkpink f-14 fw-600 mb-0 line-14 w-max-cont">Deal of the day</p>
            </div>
          </div>
        </div>
          ))
        }
      </div>
      <div className="text-decoration-none f-15 cursor-pointer hover-bo-light fw-600 color-darkpink">See More</div>
    </div>
  );
};

export default Grid4upto;
