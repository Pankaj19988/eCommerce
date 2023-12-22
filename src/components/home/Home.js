import React, { useEffect } from "react";
import AllGrid4 from "./AllGrid4";
import Slick from "../common/Components/Slick";
import SlickPic from "../common/Components/SlickPic";
import AllGrid3 from "./AllGrid3";
import HeroSection from "./HeroSection";
import moment from "moment";


const Home = (props) => {
  
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);


  return (
    <div className="bg-fff mx-auto">
      {/* <img src={cap1} className="object-fit-contain w-100"/>
      <img src={cap2} className="object-fit-contain w-100"/> */}
      <HeroSection/>
      <AllGrid4 setProgress={props.setProgress}/>
      <Slick />
      <SlickPic />
      <AllGrid3 />
    </div>
  );
};

export default Home;
