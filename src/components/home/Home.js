import React from "react";
import AllGrid4 from "./AllGrid4";
import Slick from "../common/Components/Slick";
import SlickPic from "../common/Components/SlickPic";
import AllGrid3 from "./AllGrid3";
import axios from "axios";

const Home = () => {

  return (
      <div className="bg-fff w-90-noimpo mx-auto">
        <AllGrid4 />
        <Slick />
        <SlickPic />
        <AllGrid3 />
      </div>
  );
};

export default Home;
