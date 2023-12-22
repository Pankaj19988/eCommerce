import React, { useEffect, useState } from "react";
import "./style/NavBar1.css";
import { Nav } from "react-bootstrap";
import { Bag, Cart2, Grid, HouseDoor, BoxArrowRight,Person,Search } from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModelCenter from "./Components/ModelCenter";
import Category from "./Category";
import Badge from 'react-bootstrap/Badge';
import navLogo from '../../nav-logo.png'
import { getUser,getCartData, getOrderData } from "./service/api";
import Button from 'react-bootstrap/Button';
import Input from "./Components/Input";
import Button1 from "./Components/Button1";



const NavBar = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [logOutModel,setLogOutModel] = useState(false)
  const [user, setUser] = useState(null);
  const [cartLength,setCartLength] = useState("")
  const [orderLength,setOrderLength] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  const categoryHide = () => {
    setModalShow(false);
  };

  const logOutModelHide = () =>{
    setLogOutModel(false)
  }


  useEffect(() => {
    const user = async () =>{
      const res = await getUser();
      setUser(res)
    };
    user();
  }, []);

useEffect(()=>{
  if (user) {
    const order = async () =>{
      try {
        const res = await getOrderData()
      if(res.status===200){
        setOrderLength(res.data.orders?.length)
      }
      } catch (error) {
        console.log(error)
      }
      
    }
    const cart = async () =>{
      try {
        const res = await getCartData();
      if(res.status===200){
        setCartLength(res.data.cartitem?.length)
      }
      } catch (error) {
        console.log(error)
      }
    }
    order()
    cart();
    getOrderData()
  }
},[user,props.cart])
  

  return (
    <div className="bg-color-blue color-fff py-2 px-2 w-100 media-top--62 top-0 position-sticky z-2">
      <Nav className="d-flex align-items-center justify-content-between min-h-55 container p-0">
        <Link
          className="media-w-100 text-center color-fff"
          to={"/"}
        >
         <img src={navLogo} alt="QueenShopy" className="h-55px"/>
        </Link>
        <div className="display-flex align-items-center position-relative w-100 max-w-500px media-d-none">
          <Input className='mb-0'/>
          <span className="position-absolute right-10">
          <Search className="f-25 search_icon cursor-pointer" onClick={() => {
                  setModalShow(true);
                }}/>
          </span>
          {/* <Button1 className=''>Search</Button1> */}
          
        </div>
        <div className="navigation w-100 max-w-nav-300 media-mt-8px">
          <ul className="d-flex mb-0 px-0 justify-content-around align-items-center gap-3-noimpo small-media-gap-4px w-100 " style={{listStyle:"none"}}>
            <li>
              <Link to="/" className="d-flex flex-column gap-1">
                <span className=" d-flex justify-content-center align-items-center">
                  <HouseDoor className={`f-25 color-fff hover-icon ${location.pathname=='/' ? "active" : ""}`} />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Home</div>
              </Link>
            </li>
            <li className="media-d-block display-none">
              <Link
                onClick={() => {
                  setModalShow(true);
                }}
                className="d-flex flex-column gap-1"
              >
                <span className="icon d-flex justify-content-center align-items-center">
                  {/* <Grid className="f-25 color-fff hover-icon" /> */}
                  <Search className="f-25 color-fff hover-icon"/>
                </span>
                <div className="text-light text-center f-12 line-12 fw-700">Category</div>
              </Link>
              
            </li>
            <ModelCenter
                show={modalShow}
                onHide={categoryHide}
                title={"All Category"}
              >
                <Category  hideModel={categoryHide}/>
              </ModelCenter>
            <li>
              <Link to={"/yourOrder"} className="d-flex flex-column gap-1 ">
                <span className="icon d-flex justify-content-center align-items-center position-relative">
                  <Bag className={`f-25 hover-icon color-fff  ${location.pathname=='/yourOrder' ? "active" : ""}`} />
                  <Badge pill bg="danger" className="f-10 position-absolute t-3-r-5">{orderLength}</Badge>
                </span>
                <div className="text-light text-center f-12 line-12 fw-700 ">Orders</div>
              </Link>
            </li>
            <li>
              <Link to={"/yourCart"} className="d-flex flex-column gap-1">
                <span className="icon d-flex justify-content-center align-items-center position-relative">
                  <Cart2 className={`f-25 hover-icon color-fff ${location.pathname == '/yourCart' ? "active" : ""}`}/>
                  <Badge pill bg="danger" className="f-10 position-absolute t-3-r-5">{cartLength}</Badge>
                </span>
                <div className="text-light text-center f-12 line-12 fw-700 ">Carts</div>
              </Link>
            </li>
            <li
            >
              <Link to={user ? "profile" : "/singup&login"} className="d-flex flex-column gap-1" >
                <span className="icon d-flex justify-content-center align-items-center">
                  <Person className={`f-25 hover-icon color-fff ${location.pathname== '/profile'
               ? "active " : ""}`} />
                </span>
                <div className="text-light text-center f-12 line-12 fw-700 ">{localStorage.getItem("user")?"Profile":"LogIn/SingUp"}</div>
              </Link>
            </li>
            <ModelCenter
            show={logOutModel}
            onHide={logOutModelHide}
            title={"Log Out"}
            >
              <p className="m-0 text-dark fw-600">Are you sure you want to log-off?</p>
              <hr/>
              <div className="d-flex gap-3">
              <Button variant="danger" className="w-100" onClick={()=>{
                localStorage.removeItem("user")
                navigate("/")
                window.location.reload(true)
              }}>Log Out</Button>
              <Button variant="success" className="w-100" onClick={()=>setLogOutModel(false)}>Continue Shopping</Button>
              </div>
            </ModelCenter>
            {localStorage.getItem("user")?<li>
              <Link className="d-flex flex-column gap-1">
              <span className="icon d-flex justify-content-center align-items-center">
              <BoxArrowRight className="f-25 hover-icon color-fff" onClick={()=>{setLogOutModel(true)}}/>
               </span>
               <div className="text-light text-center f-12 line-12 fw-700 ">LogOut</div>
              </Link>
            </li>:""}
          </ul>
        </div>
      </Nav>
    </div>
  );
};

export default NavBar;

