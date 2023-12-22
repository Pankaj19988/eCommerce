import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRatting from "./StarRatting";
import ModelCenter from "./Components/ModelCenter";
import AddressFill from "./AddressFill";
import Button1 from "./Components/Button1";
import Form from "react-bootstrap/Form";
import Moment from "react-moment";
import moment from "moment";
import { deleteCartItem, getCartData, updateCartQuantity, updateCartSize } from "./service/api";
import cart_logo from "../../cart_empty_logo.png"

import { Button, Spinner } from "react-bootstrap";
import LoaderContent from "./Components/LoaderContent";
const YourCart = (props) => {
  const navigate = useNavigate();
  const addtime = moment().add(+15, "days");
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const size = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const [adressModalShow, setAdressModalShow] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [totleMrp, setTotleMrp] = useState("");
  const [totlePrice, setTotlePrice] = useState("");
  const [products,setProducts] = useState([])
  const [spinner,setSpinner] = useState('')
  const [loaderVisible,setLoaderVisible] = useState(true)

 
  const cartData = async ()=>{
    setLoaderVisible(true)
    try {
      const res = await getCartData()
      if (res.status===200) {
        setCartProduct(res.data.cartitem)
      }
    } catch (error) {
     console.log(error) 
    }
    setLoaderVisible(false)
  }

  const deleteCart = async(cartItemId) =>{
    setSpinner(cartItemId)
    try {
      const res = await deleteCartItem(cartItemId);
      console.log(res)
      cartData();
      if (props.cart==="") {
        props.setCart("1")
      } else {
        props.setCart("")
      }
    } catch (error) {
      console.log(error)
    }
    setSpinner('')
  }
 
  const updateQuantity = async (e) => {
    const quantity = e.target.value
    const cartobjectid = e.target.id
    try {
      await updateCartQuantity(quantity,cartobjectid)  
    } catch (error) {
      console.log(error)
    }
    }
      
  const updateSize = async (e) => {
    const size = e.target.value
    const cartobjectid = e.target.id
    try {
      await updateCartSize(size,cartobjectid)
    } catch (error) {
      console.log(error)
    }
  };

  const getOrderedProduct = ()=>{
    const data = cartProduct?.map((item,i)=>{
      return {
        productid:item.productId,
        quantity:item.quantity,
        size:item.size,
        price:item.product.price,
        title:item.product.title,
        image:item.product.image[0]
      }
    })
    setProducts(data)
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      cartData();
    }else{
      navigate("/singup&login")
    }
  }, []);

  useEffect(() => {
    const mrpSum = cartProduct?.reduce((sum,item)=>{
      return sum + (item.product.mrp*item.quantity)
    },0)
    setTotleMrp(mrpSum)
    
    const priceSum = cartProduct?.reduce((sum,item)=>{
      return sum + (item.product.price * item.quantity)
    },0)
    setTotlePrice(priceSum);
  
  }, [cartProduct]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  
  return (
    <div>
      {cartProduct?.length>0?<div className="display-flex gap-3 padding-3 m-auto bg-fff justify-content-center smal-screen-py-3">
      <div className=" d-flex flex-column gap-3 media-mb-1rem w-100 ">
        {cartProduct?.map((item, i) => (
          <div
            key={i}
            className="bg-fff  box-shadow-1 border-radius-15 p-3 smal-screen-border-radiuse-0px"
          >
            <div className=" d-flex gap-2 justify-content-between m-auto ">
              <div className="d-flex gap-2">
                <Link to={`/product/${item.productId}`} className="text-decoration-none d-flex flex-column justify-content-center align-items-center smal-screen-w-45">
                  <img
                    className="h-110 media-h-90px object-fit-contain smal-screen-w-45"
                    src={item.product.image}
                  />
                  <p className="text-center m-0 w-100 bg-dark-orange color-fff">
                    ₹{item.product.price}
                  </p>
                </Link>
                <div>
                  <Link to={`/product/${item.productId}`} className="text-decoration-none text-dark trunket-1-line m-0 f-14 fw-600 line-14 smal-screen-f-12">
                    {item.product.title}
                  </Link>
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
                          <td className="fw-900 f-14 px-2 smal-screen-f-10">
                            M.R.P
                          </td>
                          <td className="f-14 text-decoration-line-through">
                            :₹{item.product.mrp * item.quantity}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-900 f-12 px-2 smal-screen-f-10">
                            Quentity
                          </td>
                          <td>
                            <Form.Select
                              size="sm"
                              className="f-12 w-fit-cont w-100 smal-screen-p-t-b-l-0 "
                              id={item._id}
                              defaultValue={item.quantity}
                              onChange={updateQuantity}
                            >
                              {quantity?.map((quantity, i) => (
                                <option
                                key={i}
                                  value={quantity}
                                  className="text-center"
                                >
                                  {quantity}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-900 f-12 px-2 smal-screen-f-10">
                            Size
                          </td>
                          <td>
                            <Form.Select
                              size="sm"
                              className="f-12 w-fit-cont smal-screen-p-t-b-l-0"
                              id={item._id}
                              defaultValue={item.size}
                              onChange={updateSize}
                            >
                              {size?.map((size, i) => (
                                <option key={i} value={size} className="text-center">
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
                  {spinner===item._id?<Spinner size="sm" animation="grow" variant="danger" />:<Link onClick={() => deleteCart(item._id)}>
                    <i className="fas color-darkpink fa-xmark"></i>
                  </Link>}
                </div>
                <div className="fw-900 f-12 d-flex flex-column align-items-center w-max-cont smal-screen-f-10 color-green">
                  <p className="m-0">Pay Amount</p>
                  <p className="m-0">₹{item.quantity * item.product.price}</p>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <p className="m-0 fw-600 f-14 smal-screen-f-10">
              Expected Delivery Date :
              <Moment date={addtime} className="fw-900" format="Do MM" />
            </p>
            <hr className="mb-0 mt-2" />
          </div>
        ))}
      </div>

      <div className="position-sticky media-bottom--317 top-87px h-100 max-w-500px w-100 box-shadow-1">
        <div className="bg-fff px-3 py-3 w-100  height-wabkit position-sticky top-87px border-top-radius-5 border-bottom-radius-0">
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
            <p className="m-0 color-green">Free</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="m-0">Payable Amount</p>
            <p className="m-0">₹{totlePrice ? totlePrice : "0.00"}</p>
          </div>
        </div>
        <div className=" media-bottom-0 position-sticky bg-fff media-pb-3">
        <Button1
          className={
            "w-100 border-bottom-radius-5 border-top-radius-0"
          }
          onClick={() =>{ 
            if (cartProduct) {
              setAdressModalShow(true);
              getOrderedProduct(); 
            }else{
              navigate("/")
            }
          }}
        >
          Chack Out Now
        </Button1>
        </div>
        <ModelCenter
          show={adressModalShow}
          onHide={() => setAdressModalShow(false)}
          title={"Fill Out Your Details"}
        >
          <AddressFill quantity={quantity} products={products} setAdressModalShow={setAdressModalShow} cart={true}/>
          
          
        </ModelCenter>
      </div>
      </div>:loaderVisible?<div className="h-50vh d-flex align-items-center justify-content-center"><LoaderContent visible={loaderVisible}/></div>:<div className="d-flex flex-column align-items-center mx-auto w-fit-cont gap-4 mb-3 p-3">
      <div>
      <img src={cart_logo} alt="image" className="w-100"/>
      <h1 className="text-center">Your Cart Is Empty</h1>
      <p className="text-center"><small >I Think Blue Button Below Is Very Important <br/>Because Please Minimum 1 Item Add To Cart!</small></p>
      </div>
      <Button className="w-100 px-3" onClick={()=>{
          navigate("/")
        }}>Continue Shopping</Button>
      </div>
      
      
     }
       

      {/* Cart Summary */}

      {/* {cartProduct?.length===0?"":} */}
    </div>
  );
};

export default YourCart;
