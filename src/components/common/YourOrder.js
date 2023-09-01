import React, { useState } from "react";

import { Button, Dropdown } from "react-bootstrap";
import StarRatting from "./StarRatting";

const YourOrder = () => {
  const [selectQuantity, setSelectQuantity] = useState("1");
  const quantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <div className="p-3 d-flex align-items-center flex-column gap-3 bg-fff">
      {quantity.map((item,i)=>(
        <div key={i} className="p-3 bg-fff media-w-100 box-shadow-1 border-radius-15 w-max-cont">
        <div className=" d-flex gap-2 m-auto  justify-content-center media-w-100">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              className="h-110 media-w-90px media-h-90px object-fit-contain"
              src="https://m.media-amazon.com/images/I/719PHQMXo0S._UL1440_.jpg"
            />
            <p className="text-center m-0 w-100 bg-ofwhite">₹35</p>
          </div>
          <div>
            <p className="trunket-2-line m-0 f-14 fw-600 line-14">
              Dennis Lingo Men's Solid Slim Fit Cotton Casual Shirt with Spread
              Collar & Full Sleeves
            </p>
            <StarRatting size={14} star={3} startCount={199} />
            
            <div className="d-flex">
              <div className="under-Line-05 w-05px"></div>
              <table>
                <tbody>
                  <tr>
                    <td className="fw-900 f-12 px-2">Quentity</td>
                    <td className="f-12">:2</td>
                  </tr>
                  <tr>
                    <td className="fw-900 f-12 px-2">Size</td>
                    <td className="f-12">:XXl</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="fw-900 f-12 d-flex flex-column align-items-center color-darkpink under-Line-05 border-radius-50 p-2 bg-ofwhite">
              <p className="m-0 f-10 text-center">Paid Amount</p>
              <p className="m-0">₹299</p>
            </div>
          </div>
        </div>
        <hr className="my-2"/>
        <p className="m-0 f-14 fw-600">Your Order Arrive Date : 26/08/2023</p>
        <hr className="mb-0 mt-2"/>
      </div>
      ))}
    </div>
  );
};

export default YourOrder;
