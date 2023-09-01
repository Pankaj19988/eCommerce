import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Product4Grid = ({items,gridHeading}) => {
  // const [items,setItems]=useState([""])
  // const[item,setItem]=useState(props.items)
  // const item = props.items
  // const api = props.api
  const [newItem,setNewItem] = useState([])
  

  useEffect(()=>{
    if(items){
    const data =  items.slice(0,4)
    setNewItem(data)
    }
  },[items])
 

  const handelClick = () =>{
    // navigate("/productList")
  }
  
  return (
    <div className="border-1px border-radius-5 box-shadow-1 cursor-pointer h-100 d-flex flex-column justify-content-between" onClick={handelClick}>
      <h2 className="f-20 fw-600 w-auto">{gridHeading}</h2>
      <div className="grid-2">
        {
           newItem && newItem.map((item,i)=>(
            <div key={i}>
          <img
            src={item.image}
            alt="image"
            className="w-100 object-fit-contain h-150px"
          />
          <p className="f-12 fw-600 text-center m-0 ellipsis trunket m-auto">{item.title}</p>
        </div>
           ))
        }
      </div>
      <div className="text-decoration-none f-15 cursor-pointer hover-bo-light fw-600 color-darkpink">See More</div>
    </div>
  );
};

export default Product4Grid;
