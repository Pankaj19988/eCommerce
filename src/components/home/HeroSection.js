import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'
import Carousel from "react-bootstrap/Carousel";
import mohero1 from "../../image/mohero1.JPG";
import mohero2 from "../../image/mohero2.JPG";
import mohero3 from "../../image/mohero3.JPG";
import mohero4 from "../../image/mohero4.JPG";
import cohero1 from "../../image/cohero1.JPG";
import cohero2 from "../../image/cohero2.JPG";
import cohero3 from "../../image/cohero3.JPG";
import cohero4 from "../../image/cohero4.JPG";

import commingSoon from "../../image/commingSoon.png";
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
{
  /* <Carousel.Item interval={1000}> */
}

const HeroSection = () => {
  const coImage = [cohero1, cohero2, cohero3, cohero4]
  const moImage =[mohero1, mohero2, mohero3, mohero4]
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })


  return (
    <div className="position-relative">
      <Carousel slide={false} controls={false} >
        {isBigScreen?coImage?.map((img, i) => (
          <Carousel.Item interval={2000}>
            <img src={img} className="object-fit-contain w-100" />
          </Carousel.Item>
        )):isTabletOrMobile?moImage?.map((img, i) => (
          <Carousel.Item interval={2000}>
            <img src={img} className="object-fit-contain w-100" />
          </Carousel.Item>
        )):""}
      </Carousel>
      <img
        src={commingSoon}
        className="h-55px object-fit-contain position-absolute top-3 top-0"
      />
    </div>
  );
};

export default HeroSection;
