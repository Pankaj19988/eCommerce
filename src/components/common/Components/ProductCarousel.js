import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";



const ProductCarousel = ({images}) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  // const image = images
  // console.log(image)

  return (
    <div>
      <Carousel
        slide={false}
        activeIndex={index}
        className="m-auto w-450 media-w-100 d-flex align-items-center"
        onSelect={handleSelect}
      >
        {images && images.map((item, i) => (
          <Carousel.Item key={i}>
            <img
                className=" media-w-100 w-100 object-fit-contain cour-height"
                src={item}
              />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex gap-1 justify-content-center mt-2 overflow-auto">
        {images&&images.map((item, i) => (
          <img
            className={`${
              i == index ? "border-2px" : ""
            } w-55px hover-border-2px cursor-pointer`}
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            src={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
