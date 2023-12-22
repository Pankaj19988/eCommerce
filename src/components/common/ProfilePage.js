import React, { useEffect, useState } from "react";
import Input from "./Components/Input";
import axios from "axios";
import { useNavigate } from "react-router";
import { getCartData, getOrderData, getUser, userLocationData } from "./service/api";
import Button1 from "./Components/Button1";
import logo from "../../nav-logo.png"

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    fullname: "",
    mobile: "",
  });
  const [userIpData,setUserIpData] = useState({
    city: "",
    state: "",
    country: "",
    callingcode: ""
  })
  const [orderDetail,setOrderDetail] = useState({
    totleOrder:"",
    totleAmount:""
  })
  const [zipCode,setZipCode] = useState("")
  const [cart,setCart] = useState(0)

  useEffect(() => {
    const getUserData = async () => {
      if (localStorage.getItem("user")) {
        try {
          const res = await getUser();
          if (res.status === 200) {
            const userData = res.data;
            setUser({...user,
              email: userData.email,
              fullname: userData.fullname,
              mobile: userData.mobile,
            });
            
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate("/singup&login");
      }
    };

    const getLocationData = async () => {
      try {
        const res = await userLocationData();
        if (res.status === 200) {
          const ipData = res.data;
          setUserIpData({
            city: ipData.city,
            state: ipData.region,
            country: ipData.country_name,
            callingcode: ipData.country_calling_code,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAddres = async() =>{
      if (localStorage.getItem("zipcode")) {
        const add = JSON.parse(localStorage.getItem("zipcode"))
        setZipCode(add)
      }
      
    }
    const getCart = async() =>{
      try {
        const res = await getCartData()
        if(res.status===200){
          setCart(res.data.cartitem?.length)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getOrder = async () =>{
      try {
        const res = await getOrderData()
        if (res.status===200) {
          const data = res.data.orders
          const amount = data?.map((order,i)=>{
            return order.amount
          })?.reduce((sum,item)=>sum+item,0)
          const length = data?.length
          setOrderDetail({totleOrder:length,
          totleAmount:amount})
        }
        console.log(res.data.orders)
      } catch (error) {
        
      }
    }
    getCart()
    getOrder()
    getUserData();
    getLocationData();
    getAddres();
  }, []);

  return (
    <div className="bg-fff">
      {/* <div className="w-100 bg-category color-fff f-100 text-center media-f-50 ">
        <img src={logo}/>
      </div> */}
      <div className="m-auto max-w-720px w-100 my-3">
        <div className="w-90-noimpo bg-fff d-flex flex-column align-items-center border-radius-15 box-shadow-1 p-3 p-3 mx-auto">
          {/* <p className="mb-0 text-center fw-900 mt-3">Hellow...{user.fullname}</p> */}
          {/* mt--100px media-mt--45px */}
          {/* <hr className="w-100 color-blue " /> */}
          <div className="d-flex justify-content-around w-100 mb-3">
            <div>
              <p className="mb-0 text-center fw-900">{orderDetail.totleOrder?orderDetail.totleOrder:"0"}</p>
              <p className="mb-0 text-center fw-600">Your Order</p>
            </div>
            <div className="w-025 bg-blue"></div>
            <div>
              <p className="mb-0 text-center fw-900">{cart?cart:"0"}</p>
              <p className="mb-0 text-center fw-600">Your Cart</p>
            </div>
            <div className="w-025 bg-blue"></div>
            <div>
              <p className="mb-0 text-center fw-900">₹{orderDetail.totleAmount?orderDetail.totleAmount:"0"}</p>
              <p className="mb-0 text-center fw-600">Totle Pay</p>
            </div>
          </div>
          {/* <hr className="w-100 color-blue" /> */}

          <div className="d-flex flex-column gap-3 w-100">
            <div className="w-100 d-flex flex-column align-items-start">
              <p className="mb-0  color-blue fw-900 px-2">Your Name:</p>
              <Input
                type={"text"}
                disabled={true}
                placeholder={user.fullname}
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-start">
              <p className="mb-0  color-blue fw-900 px-2">Mobile No:</p>
              <Input
                type={"number"}
                disabled={true}
                placeholder={`${userIpData.callingcode} ${user.mobile}`}
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-start">
              <p className="mb-0  color-blue fw-900 px-2">E-Mail:</p>
              <Input type={"email"} disabled={true} placeholder={user.email} />
            </div>
            <div className="w-100 d-flex flex-column align-items-start gap-3">
              {/* <div className="w-100">
                <p className="mb-0  color-blue fw-900 px-2">Adress-1:</p>
                <Input
                  type={"text"}
                  placeholder={""}
                  value={addres.address1}
                  onChange={(e)=>{
                    setAddres({...addres,address1:e.target.value})
                  }}
                />
              </div> */}
              {/* <div className="w-100">
                <p className="mb-0  color-blue fw-900 px-2">Land Mark:</p>
                <Input type={"text"}  placeholder={""} value={addres.landmark} onChange={(e)=>{
                  setAddres({...addres,landmark:e.target.value})
                }} />
              </div> */}
              <div className="w-100 d-flex gap-3">
                <div className="w-100">
                  <p className="mb-0  color-blue fw-900 px-2">City:</p>
                  <Input disabled={true} type={"text"} placeholder={userIpData.city} />
                </div>
                <div className="w-100">
                  <p className="mb-0  color-blue fw-900 px-2">ZipCode:</p>
                  <Input  type={"number"} placeholder="One Time Enter 6 Digite ZipCode" disabled={localStorage.getItem("zipcode")} value={zipCode} onChange={(e)=>{
                    const value =  e.target.value.substring(0, 6)
                    setZipCode(value)
                  }}/>
                </div>
              </div>
              <div className="w-100 d-flex gap-3">
                <div className="w-50">
                  <p className="mb-0  color-blue fw-900 px-2">State:</p>
                  <Input
                    disabled={true}
                    type={"text"}
                    placeholder={userIpData.state}
                  />
                </div>
                <div className="w-50">
                  <p className="mb-0  color-blue fw-900 px-2">Country:</p>
                  <Input disabled={true} type={"text"} placeholder={userIpData.country} />
                </div>
              </div>
              {localStorage.getItem("zipcode")?"":
              <div className="w-100">
                <Button1 onClick={()=>{
                  if (zipCode.length===6) {
                    localStorage.setItem("zipcode",JSON.stringify(zipCode))
                    window.location.reload(true)
                  }
                }}>{zipCode.length===6?<span>Submite ZipCode</span>:<span className="text-danger">Submite Valid ZipCode</span>}</Button1>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
