import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatting from "./StarRatting";
import ModelCenter from "./Components/ModelCenter";
import AddressFill from "./AddressFill";
import Button1 from "./Components/Button1";
import axios from "axios";
import Form from "react-bootstrap/Form";

const YourCart = () => {
  const [selectQuantity, setSelectQuantity] = useState("1");
  // const [quantity, setQuantity] = useState([]);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const size = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const [adressModalShow, setAdressModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [cartProduct, setCartProduct] = useState([]);
  const [totleMrp, setTotleMrp] = useState("");
  const [totlePrice, setTotlePrice] = useState("");

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
      console.log("please login first");
    }
  };

  const getCartData = async () => {
    await axios
      .post(`http://localhost:8080/api/product/user_cart/${user}`)
      .then((response) => {
        console.log(response.data.cartitem);
        setCartProduct(response.data.cartitem);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCartItem = async (cartItemId) => {
    console.log(cartItemId);
    await axios
      .delete(`http://localhost:8080/api/cart/delete/${cartItemId}`)
      .then((response) => {
        console.log(response);
        getCartData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateQuantity = async (e) => {
    await axios
      .put("http://localhost:8080/api/cart/update", {
        quantity: e.target.value,
        cartobjectid: e.target.id,
        userid: user,
      })
      .then((response) => {
        console.log(response);
        getCartData();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(e.target.value);
    console.log(e.target.id);
    console.log(user);
  };

  const updateSize = async () => {};

  useEffect(() => {
    getUser();
    getCartData();
  }, [user]);

  useEffect(() => {
    const mrpArray = cartProduct?.map((item, i) => {
      return item.product.mrp * item.quantity;
    });
    const priceArray = cartProduct?.map((item, i) => {
      return item.product.price * item.quantity;
    });

    let mrpSum = 0;
    if (mrpArray) {
      for (let i = 0; i < mrpArray.length; i++) {
        mrpSum += mrpArray[i];
      }
      setTotleMrp(mrpSum);
    }

    let priceSum = 0;
    if (priceArray) {
      for (let i = 0; i < priceArray.length; i++) {
        priceSum += priceArray[i];
      }
      setTotlePrice(priceSum);
    }
  }, [cartProduct]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className="display-flex gap-3 p-3 m-auto bg-fff justify-content-center">
      <div className=" d-flex flex-column gap-3 media-mb-1rem ">
        {cartProduct?.map((item, i) => (
          <div key={i} className="bg-fff p-3 box-shadow-1 border-radius-15">
            <div className=" d-flex gap-2 justify-content-between m-auto ">
              <div className="d-flex gap-2">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    className="h-110 media-w-90px media-h-90px object-fit-contain"
                    src={item.product.image}
                  />
                  <p className="text-center m-0 w-100 bg-ofwhite">
                    ₹{item.product.price}
                  </p>
                </div>
                <div>
                  <p className="trunket-1-line m-0 f-14 fw-600 line-14">
                    {item.product.title}
                  </p>
                  <StarRatting
                    size={14}
                    star={item.product.star}
                    startCount={item.product.totleRatting}
                  />
                  <div className="d-flex">
                    <div className="under-Line-05 w-05px"></div>
                    <table>
                      <tbody>
                        <tr>
                          <td className="fw-900 f-14 px-2">M.R.P</td>
                          <td className="f-14 text-decoration-line-through">
                            :₹{item.product.mrp * item.quantity}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-900 f-12 px-2">Quentity</td>
                          <td className="f-12">:{item.quantity}</td>
                        </tr>
                        <tr>
                          <td className="fw-900 f-12 px-2">Size</td>
                          <td className="f-12">:{item.size}</td>
                        </tr>
                       <tr>
                        <td >
                          <Form.Select
                            size="sm"
                            className="f-12 w-fit-cont w-100"
                            id={item._id}
                            onChange={updateQuantity}
                          >
                            {quantity?.map((quantity, i) => (
                              <option value={quantity} className="text-center">
                                {quantity}
                              </option>
                            ))}
                          </Form.Select>
                          </td>
                          <td>
                          <Form.Select
                            size="sm"
                            className="f-12 w-fit-cont"
                            id={item._id}
                            onChange={updateSize}
                          >
                            {size?.map((size, i) => (
                              <option value={size} className="text-center">
                                {size}
                              </option>
                            ))}
                          </Form.Select>
                          </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center height-fit-content">
                  {/* <Dropdown>
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
                  </Dropdown> */}

                  <Link onClick={() => deleteCartItem(item._id)}>
                    <i className="fas color-darkpink fa-xmark"></i>
                  </Link>
                </div>
                <div className="fw-900 f-12 d-flex flex-column align-items-center color-darkpink ">
                  <p className="m-0">Pay Amount</p>
                  <p className="m-0">₹{item.quantity * item.product.price}</p>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <p className="m-0 fw-600 f-14">
              Expected Delivery Date : 26/08/2023
            </p>
            <hr className="mb-0 mt-2" />
          </div>
        ))}
      </div>

      {/* Cart Summary */}

      <div className="position-sticky media-bottom--317 top-87px h-100 max-w-500px w-100 box-shadow-1">
        <div className="bg-fff px-3 pt-3 w-100  height-wabkit position-sticky top-87px border-top-radius-5 border-bottom-radius-0">
          <h3>Order summary</h3>
          <div className="d-flex justify-content-between">
            <p className="m-0">Item</p>
            <p className="m-0">{cartProduct ? cartProduct.length : 0}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">M.R.P</p>
            <p className="m-0">₹{totleMrp ? totleMrp : "0.00"}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">Discount</p>
            <p className="m-0">₹{totleMrp ? totleMrp - totlePrice : "0.00"}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">Delivery Charge</p>
            <p className="m-0">₹0.00</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="">Payable Amount</p>
            <p className="m-0">₹{totlePrice ? totlePrice : "0.00"}</p>
          </div>
        </div>
        {/* <button className="custom-btn btn-6 w-100 media-bottom-0  position-sticky py-3 border-bottom-radius-5 border-top-radius-0"><span>Chack Out Now</span></button> */}
        <Button1
          className={
            "w-100 media-bottom-0 position-sticky border-bottom-radius-5 border-top-radius-0"
          }
          onClick={() => setAdressModalShow(true)}
        >
          Chack Out Now
        </Button1>
        <ModelCenter
          show={adressModalShow}
          onHide={() => setAdressModalShow(false)}
          title={"Fill Out Your Details"}
        >
          <AddressFill quantity={quantity} />
        </ModelCenter>
      </div>
    </div>
  );
};

export default YourCart;
