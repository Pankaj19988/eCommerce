import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { getOrderData } from "./service/api";
import orderEmpty from "../../order_empty.png"
import { Button } from "react-bootstrap";
import LoaderContent from "./Components/LoaderContent";

const YourOrder = () => {
  const navigate = useNavigate()
  const [userOrders, setUserOrders] = useState();
  const [loaderVisible,setLoaderVisible] = useState(false)

  const getOrders = async () => {
    setLoaderVisible(true)
    try {
      const res = await getOrderData();
      if (res.status === 200) {
        setUserOrders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoaderVisible(false)
  };

  const totleQuantity = (array) => {
    const totle = array.reduce((sum, element) => {
      return sum + element.quantity;
    }, 0);
    return totle;
  };

  
    useEffect(() => {
      if (localStorage.getItem("user")) {
        getOrders();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }else{
        navigate("/singup&login")
      }
    }, []);
  
    
   


  return (
    <>
    
    {userOrders?.orders?.length>0?<div className="d-flex flex-column gap-3 media-mb-1rem w-50-noimp media-w-100 mx-auto padding-3 smal-screen-py-3">
      {userOrders?.orders?.map((item, i) => (
        <div
          key={i}
          className="bg-fff  box-shadow-1 border-radius-15 p-3 smal-screen-border-radiuse-0px"
        >
          <div className="d-flex justify-content-center gap-1 w-100 height-fit-content flex-wrap ">
            {item.products.map((item, i) => (
              <Link
                className="text-decoration-none"
                to={`/product/${item.productid}`}
              >
                <Card className="media-max-w-100px max-w-160">
                  <Card.Body className="p-1">
                    <Card.Title className="trunket-1-line f-14 fw-600 mb-0 text-center w-100 pe-2 color-nav-blue">
                      {item.titel}
                    </Card.Title>
                    <Card.Text className="text-center mb-0">
                      <img
                        className="h-40 object-fit-contain my-1 "
                        src={item.image}
                      />
                    </Card.Text>
                    <Card.Text className="d-flex bg-dark-orange w-100 color-fff align-items-center">
                      <p className="m-0 color-fff  text-center f-14 line-15 w-100">
                        Q:{item.quantity}{" "}
                      </p>
                      <div className="under-Line-05 h-20 border-color-yellow"></div>
                      <p className="m-0 color-fff  text-center f-14 line-15 w-100">
                        <b></b>₹{item.price}{" "}
                      </p>
                      <div className="under-Line-05 h-20 border-color-yellow"></div>
                      <p className="m-0 color-fff  text-center f-14 line-15 w-100">
                        <b></b>
                        {item.size}{" "}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
          <hr className="my-1 color-nav-blue" />
          <div className=" d-flex gap-2 justify-content-between m-auto ">
            <div className="d-flex gap-2">
              <div>
                <div className="d-flex">
                  <table>
                    <tbody>
                      <tr>
                        <td className="fw-900 f-12 px-2 line-10 smal-screen-f-10">
                          Totle Items
                        </td>
                        <td className="f-12 line-10 smal-screen-f-10 ">
                          :{item.products.length}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-900 f-12 line-10 px-2 smal-screen-f-10">
                          Totle Quentity
                        </td>
                        <td className="smal-screen-f-10 f-12 line-12">
                          :{totleQuantity(item.products)}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-900 f-12 px-2 smal-screen-f-10">
                          Details
                        </td>
                        <td className="smal-screen-f-10 line-10 f-10">
                          <b>Name</b>:-{item.address.name}
                          <br />
                          <b>Mobile</b>:-{item.address.mobile}
                          <br />
                          <b>Address</b>:-{item.address.address1}...
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="fw-900 f-12 d-flex flex-column align-items-center color-green under-Line-05 border-color-green border-radius-50 p-2 bg-ofwhite">
                  <p className="m-0 f-10 text-center">Paid Amount</p>
                  <p className="m-0">₹{item.amount}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-2 color-nav-blue" />
          <p className="m-0 fw-600 f-14 smal-screen-f-10">
            Expected Delivery Date :
          </p>
          <hr className="mb-0 mt-2 color-nav-blue" />
        </div>
      ))}
    </div>:loaderVisible?<div className="h-50vh d-flex align-items-center justify-content-center"><LoaderContent visible={loaderVisible}/></div>
    :<div className="d-flex flex-column align-items-center mx-auto w-fit-cont gap-4 mb-3 p-3">
       <div>
       <img src={orderEmpty} alt="image" className="w-100"/>
       <h1 className="text-center">Your Order Is Empty</h1>
       <p className="text-center"><small >I Think Blue Button Below Is Very Important <br/> Please Minimum 1 Order Confirm!</small></p>
       </div>
       <Button className="w-100 px-3" onClick={()=>{
           navigate("/")
         }}>Back To Home</Button>
     </div>} 
    </>
  );
};

export default YourOrder;
