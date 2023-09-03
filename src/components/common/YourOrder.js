import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRatting from "./StarRatting";
import { useNavigate } from "react-router";

const YourOrder = () => {
  const navigate = useNavigate()
  const [user,setUser] = useState('')
  const quantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const getUser = async () => {
    const userToken = await JSON.parse(localStorage.getItem("user"));
    const header = {
      "auth-token": userToken,
    };
    if (localStorage.getItem("user")) {
      await axios
        .post(`http://localhost:8080/api/user/getuser`, null, {
          headers: header,
        })
        .then((response) => {
          console.log(response.data._id);
          setUser(response.data._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/singup&login")
      console.log("please login first");
    }
  };

  useEffect(() => {
    getUser()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  // <div className="d-flex flex-column justify-content-center align-items-center">
  //   <div className="fw-900 f-12 d-flex flex-column align-items-center color-darkpink under-Line-05 border-radius-50 p-2 bg-ofwhite">
  //     <p className="m-0 f-10 text-center">Paid Amount</p>
  //     <p className="m-0">₹299</p>
  //   </div>
  // </div>;
  // https://m.media-amazon.com/images/I/719PHQMXo0S._UL1440_.jpg
  return (
    <div className="d-flex flex-column gap-3 media-mb-1rem">
      {quantity.map((item, i) => (
        <div
          key={i}
          className="bg-fff  box-shadow-1 border-radius-15 p-3 smal-screen-border-radiuse-0px"
        >
          <div className=" d-flex gap-2 justify-content-between m-auto ">
            <div className="d-flex gap-2">
              <div className="d-flex flex-column justify-content-center align-items-center smal-screen-w-45">
                <img
                  className="h-110 media-h-90px object-fit-contain smal-screen-w-45"
                  src='https://m.media-amazon.com/images/I/717kxMoZiAL._UL1500_.jpg,https://m.media-amazon.com/images/I/71EZZ1usYnL._UL1500_.jpg,https://m.media-amazon.com/images/I/71NbeYK99UL._UL1500_.jpg,https://m.media-amazon.com/images/I/71MOhqtTvWL._UL1500_.jpg,https://m.media-amazon.com/images/I/71IDd9zDAML._UL1500_.jpg,https://m.media-amazon.com/images/I/51cKYNbkEhL.jpg'
                />
                <p className="text-center m-0 w-100 bg-ofwhite">
                  ₹35
                </p>
              </div>
              <div>
                <p className="trunket-1-line m-0 f-14 fw-600 line-14 smal-screen-f-12">
                Casual Shirt for Men|| Shirt for Men|| Men Stylish
                </p>
                <StarRatting
                  size={14}
                  star={3.5}
                  startCount={125}
                />
                <div className="d-flex">
                  <div className="under-Line-05 w-05px"></div>
                  <table>
                    <tbody>
                      <tr>
                        <td className="fw-900 f-14 px-2 smal-screen-f-10">
                          M.R.P
                        </td>
                        <td className="f-14 text-decoration-line-through smal-screen-f-10">
                          :₹1224
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-900 f-12 px-2 smal-screen-f-10">
                          Quentity
                        </td>
                        <td className="smal-screen-f-10">
                          :5
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-900 f-12 px-2 smal-screen-f-10">
                          Size
                        </td>
                        <td className="smal-screen-f-10">
                          :XL
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="fw-900 f-12 d-flex flex-column align-items-center color-darkpink under-Line-05 border-radius-50 p-2 bg-ofwhite">
                  <p className="m-0 f-10 text-center">Paid Amount</p>
                  <p className="m-0">₹299</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <p className="m-0 fw-600 f-14 smal-screen-f-10">
            Expected Delivery Date :
          </p>
          <hr className="mb-0 mt-2" />
        </div>
      ))}
    </div>
  );
};

export default YourOrder;
