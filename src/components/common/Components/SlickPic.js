import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from 'axios'
import { Link } from "react-router-dom";


const SlickPic = () => {

  const [items,setItems]=useState([])
  
  const getPost = async()=>{
    await axios.get("http://localhost:8080/api/product/all")
    .then((response)=>{
      const data = response.data
      const filterCategory = data.filter((item)=>item.category=='GIRL-SHIRT' | item.category=='GIRL-T-SHIRT' | item.category=='GIRL-NIGHTDRESS')
      setItems(filterCategory.slice(0,12))
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getPost();
  },[])

  const props = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7.5,
    slidesToScroll: 5,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ]
  };

  return (
    
    <div className="bg-fff box-shadow-1 border-radius-5 mt-3  d-flex flex-column justify-content-center py-3">
      <h3 className="m-0 fw-600 text-dark media-f-14 mx-3 ">Best Woman Collection</h3>
        <Link to='/list/best_woman_collection'>
      <Slider {...props} className="pb-35">
        {
          items?.map((item,i)=>(
            <div key={i} className="d-flex justify-content-center flex-column p-2 hover-shadow-10">
          <img
            src={item.image}
            alt="image"
            className="w-100 object-fit-contain h-150px"
          />
        </div>
          ))
        }
      </Slider>
      </Link>
    </div>
  );
};

export default SlickPic;