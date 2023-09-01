import React, { useEffect, useState } from "react";
import "./style/NavBar1.css";
import { Nav } from "react-bootstrap";
import { Bag, Cart2, Grid, HouseDoor, Person } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import ModelCenter from "./Components/ModelCenter";
import Category from "./Category";
import axios from "axios";


const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation()
  const categoryHide = () => {
    setModalShow(false);
  };
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
    <div className="bg-color-4 color-fff py-2 px-2 w-100">
      <Nav className="d-flex align-items-center justify-content-around min-h-55">
        <Link
          className="media-w-100 text-center f-30 fw-800 text-decoration-none color-fff media-pb-15"
          to={"/"}
        >
          QueenShopy
        </Link>
        <div className="navigation">
          <ul className="d-flex mb-0 px-0 justify-content-between align-items-center gap-3">
            <li
              className={`list ${location.pathname=='/' ? "active" : ""}`}
            >
              <Link to="/" className="d-flex flex-column gap-1">
                <span className="icon d-flex justify-content-center align-items-center">
                  <HouseDoor className="f-20 " />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Home</div>
              </Link>
            </li>
            <li
              className={`list `}
            >
              <Link
                onClick={() => {
                  setModalShow(true);
                }}
                className="d-flex flex-column gap-1"
              >
                <span className="icon d-flex justify-content-center align-items-center">
                  <Grid className="f-20 " />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Category</div>
              </Link>
              <ModelCenter
                show={modalShow}
                onHide={categoryHide}
                title={"All Category"}
              >
                <Category />
              </ModelCenter>
            </li>

            <li
              className={`list  ${location.pathname=='/yourOrder' ? "active" : ""}`}
              // onClick={() => setActive("order")}
            >
              <Link to={"/yourOrder"} className="d-flex flex-column gap-1">
                <span className="icon d-flex justify-content-center align-items-center f-25">
                  <Bag className="f-20" />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Orders</div>
              </Link>
            </li>
            <li
              className={`list  ${location.pathname == '/yourCart' ? "active" : ""}`}
            >
              <Link to={"/yourCart"} className="d-flex flex-column gap-1">
                <span className="icon d-flex justify-content-center align-items-center">
                  <Cart2 className="f-20" />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Carts</div>
              </Link>
            </li>
            <li
              className={`list  ${location.pathname== '/profile'
               ? "active" : ""}`}
            >
              <Link to={user ? "profile" : "/singup&login"} className="d-flex flex-column gap-1">
                <span className="icon d-flex justify-content-center align-items-center">
                  <Person className="f-20" />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Profile</div>
              </Link>
            </li>
            {/* {active?<div className="indicator"></div>:''} */}
          </ul>
        </div>
      </Nav>
    </div>
  );
};

export default NavBar;
