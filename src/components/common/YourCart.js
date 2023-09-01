import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatting from "./StarRatting";
import ModelCenter from "./Components/ModelCenter";
import AddressFill from "./AddressFill";
import Button1 from "./Components/Button1";

const YourCart = () => {
  
  const [selectQuantity, setSelectQuantity] = useState("1");
  const [quantity, setQuantity] = useState([]);
  const [adressModalShow,setAdressModalShow] = useState(false)
  useEffect(() => {
    setQuantity(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  }, []);
  return (
    
      
    <div className="display-flex gap-3 p-3 m-auto bg-fff justify-content-center">
      <div className=" d-flex flex-column gap-3 media-mb-1rem ">
        {quantity.map((item, i) => (
          <div key={i} className="bg-fff p-3 box-shadow-1 border-radius-15">
            <div className=" d-flex gap-2  m-auto ">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                className="h-110 media-w-90px media-h-90px object-fit-contain"
                src="https://m.media-amazon.com/images/I/719PHQMXo0S._UL1440_.jpg"
              />
              <p className="text-center m-0 w-100 bg-ofwhite">₹35</p>
            </div>
            <div>
              <p className="trunket-1-line m-0 f-14 fw-600 line-14">
                Dennis Lingo Men's Solid Slim Fit Cotton Casual Shirt with
                Spread Collar & Full Sleeves
              </p>
              <StarRatting size={14} star={3} startCount={199} />
              <div className="d-flex">
                <div className="under-Line-05 w-05px"></div>
                <table>
                  <tbody>
                    <tr>
                      <td className="fw-900 f-14 px-2">M.R.P</td>
                      <td className="f-14 text-decoration-line-through">
                        :₹599
                      </td>
                    </tr>
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
            <div className="d-flex flex-column justify-content-between align-items-center">
              <div className="d-flex gap-3 align-items-center height-fit-content">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                    className="w-55px media-w-45 f-12 p-0"
                  >
                    {selectQuantity}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-55px">
                    {quantity.map((item, i) => (
                      <Dropdown.Item
                      key={i}
                      className="f-12"
                        variant="outline-secondary"
                        onClick={() => {
                          setSelectQuantity(item);
                        }}
                        
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Link
                  onClick={() => {
                    console.log(quantity[i]);
                    const arr = [...quantity];
                    arr.splice(i, 1);
                    setQuantity([...arr]);
                  }}
                >
                  <i className="fas color-darkpink fa-xmark"></i>
                </Link>
              </div>
              <div className="fw-900 f-12 d-flex flex-column align-items-center color-darkpink ">
                <p className="m-0">Pay Amount</p>
                <p className="m-0">₹299</p>
              </div>
            </div>
          </div>
          <hr className="my-2"/>
          <p className="m-0 fw-600 f-14">Expected Delivery Date : 26/08/2023</p>
          <hr className="mb-0 mt-2"/>
          </div>
        ))}
      </div>
      <div className="position-sticky media-bottom--317 top-87px h-100 max-w-500px w-100 box-shadow-1">
        <div className="bg-fff px-3 pt-3 w-100  height-wabkit position-sticky top-87px border-top-radius-5 border-bottom-radius-0">
          <h3>Order summary</h3>
          <div className="d-flex justify-content-between">
            <p className="m-0">Item</p>
            <p className="m-0">10</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">M.R.P</p>
            <p className="m-0">₹99.00</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">Discount</p>
            <p className="m-0">₹5.00</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">Delivery Charge</p>
            <p className="m-0">₹8.32</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="">Payable Amount</p>
            <p className="m-0">₹112.32</p>
          </div>
        </div>
        {/* <button className="custom-btn btn-6 w-100 media-bottom-0  position-sticky py-3 border-bottom-radius-5 border-top-radius-0"><span>Chack Out Now</span></button> */}
        <Button1 className={"w-100 media-bottom-0 position-sticky border-bottom-radius-5 border-top-radius-0"} onClick={()=>setAdressModalShow(true)}>Chack Out Now</Button1>
        <ModelCenter show={adressModalShow} onHide={()=>setAdressModalShow(false)} title={"Fill Out Your Details"} >
        <AddressFill quantity={quantity}/>
        </ModelCenter>
        
      </div>
    </div>
    
  );
};

export default YourCart;
