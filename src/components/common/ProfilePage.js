import React, { useEffect, useState } from "react";
import Input from "./Components/Input";
import axios from "axios";

const ProfilePage = () => {

  const [user,setUser] = useState({})
  const getUser = async () => {
    const userToken = await JSON.parse(localStorage.getItem("user"));
   const  header = { 
      'auth-token': userToken
    }
    if (localStorage.getItem("user")) {
      await axios
        .post(`http://localhost:8080/api/user/getuser`,null,{headers:header})
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("please login first");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-fff">
      <div className="w-100 bg-category color-fff f-100 text-center media-f-50 py-4rem">
        Queen Shopy
      </div>
      <div className="m-auto max-w-720px w-100 ">
        <div className="w-90-noimpo bg-fff  d-flex flex-column align-items-center border-radius-15 box-shadow-1 px-3 pb-3 mx-auto mt--125px media-mt--70">
          {/* <div className="h-100 translate-y--50">
            <img
              className="h-200 w-200px object-fit-contain border-radius-50  bg-fff  under-Line-05 media-h-90px media-w-90px"
              src="https://m.media-amazon.com/images/I/71rXy+I4sWL._UL1500_.jpg"
            />
            
          </div> */}
          <p className="mb-0 text-center fw-900 mt-3">Hellow...{user.fullname}</p>
          {/* mt--100px media-mt--45px */}
          <hr className="w-100 color-blue " />
          <div className="d-flex justify-content-around w-100">
            <div>
              <p className="mb-0 text-center fw-900">5</p>
              <p className="mb-0 text-center fw-600">Your Order</p>
            </div>
            <div className="w-025 bg-blue"></div>
            <div>
              <p className="mb-0 text-center fw-900">2</p>
              <p className="mb-0 text-center fw-600">Your Cart</p>
            </div>
            <div className="w-025 bg-blue"></div>
            <div>
              <p className="mb-0 text-center fw-900">₹299</p>
              <p className="mb-0 text-center fw-600">Totle Pay</p>
            </div>
          </div>
          <hr className="w-100 color-blue" />

          <div className="d-flex flex-column gap-3 w-100">
          <div className="w-100 d-flex flex-column align-items-start">
            <p className="mb-0  color-blue fw-900 px-2">mobile</p>
            <Input type={"number"} disabled={true} placeholder={user.mobile}/>
          </div>
          <div className="w-100 d-flex flex-column align-items-start">
            <p className="mb-0  color-blue fw-900 px-2">E-Mail</p>           
            <Input type={"email"} disabled={true} placeholder={user.email}/>
          </div>
          <div className="w-100 d-flex flex-column align-items-start gap-3">
            <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Adress-1</p>
            <Input type={"text"} disabled={true} placeholder={"A-143,shyam soci."}/>
            </div>
            <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Land Mark</p>
            <Input type={"text"} disabled={true} placeholder={"katargam"}/>
            </div>
            <div className="w-100 d-flex gap-3">
              <div className="w-100">
                <p className="mb-0  color-blue fw-900 px-2">City</p>
                <Input disabled={true} type={"text"} placeholder={"Surat"}/>
              </div>
              <div className="w-100">
                <p className="mb-0  color-blue fw-900 px-2">ZipCode</p>
                <Input disabled={true} type={"number"} placeholder={395004}/>
              </div>
            </div>
            <div className="w-100 d-flex gap-3">
              <div className="w-50">
                <p className="mb-0  color-blue fw-900 px-2">State</p>
                <Input disabled={true} type={"text"} placeholder={"Gujarat"}/>
              </div>
              <div className="w-50">
                <p className="mb-0  color-blue fw-900 px-2">Country</p>              
                <Input disabled={true} type={"text"} placeholder={"India"}/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
