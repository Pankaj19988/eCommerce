import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from 'axios'
import { getAllProduct } from "../service/api";
import LoaderContent from "./LoaderContent";

const   Slick = () => {

  const [items,setItems]=useState([])
  
  const getPost = async()=>{
    try {
      const res = await getAllProduct(1,12,"MAN-SHIRT,GIRL-SHIRT","GT30")
      const data = res.data
      if (res.status===200) {
        setItems(data?.slice(0,12))
      }
    } catch (error) {
      console.log(error)
    }
    
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
    ],
  };

  return (
    <div className="bg-fff box-shadow-1 border-radius-5  d-flex flex-column justify-content-center py-3">
      <h2 className="m-0 fw-600 text-dark media-f-14 mx-3 ">Best Man & Woman Shirt High Quality</h2>
      {items.length===0?<LoaderContent visible={true}/>:<Link to='/list/best_man_woman_shirt'>
      <Slider {...props} className="pb-35">
        {
          items?.map((item,i)=>(
            <div key={i} className="d-flex justify-content-center flex-column p-2 hover-shadow-10">
          <img
            src={item.image}
            alt="image"
            className="m-auto w-100 object-fit-contain h-150px"
          />
          <div>
            <div className="display-flex gap-1 align-items-center">
              <div className="bg-darkpink text-decoration-none color-fff p-3px f-8 height-wabkit border-radius-5 w-max-cont">
                Up to ₹50
              </div>
              <p className="color-darkpink f-10 fw-600 mb-0">Deal of the day</p>
            </div>
            <p className="mb-0 f-14 ellipsis media-f-10 fw-600 text-dark">{item.title}</p>
          </div>
        </div>
          ))
        }
      </Slider>
      </Link>}
    </div>
  );
};

export default Slick;
