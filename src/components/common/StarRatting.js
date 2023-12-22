import ReactStars from "react-rating-stars-component";
import React, { useEffect, useState } from "react";

const StarRatting = (props) => {
  const countStar = props.star
//   const [countStar,setCountStar] = useState(0)

//   const star = async() =>{
//     const start = await props.star
//     setCountStar(start)
//   }
// useEffect(()=>{
//   star()
// },[countStar])
  const ratingChanged = (value) => {
    console.log(value);
  };

  return (
    <div>
    {countStar?<div className="d-flex align-items-center gap-1">
      <ReactStars        
        value={countStar}
        edit={false}
        count={5}
        onChange={ratingChanged}
        size={props.size}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        filledIcon={<i className="fa fa-star"></i>}
        activeColor="#388e3c"
      /><p className={`m-0 f-star-${props.size} line-star-${props.size}`} style={{color:'#388e3c'}}>{props.startCount}</p>
    </div>:""}
    </div>
  );
};

export default StarRatting;
