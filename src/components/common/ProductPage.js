import React, { useEffect, useState } from "react";
import StarRatting from "./StarRatting";
import { ShieldLockFill } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCartBtn from "./Components/AddCartBtn";
import Dropdown from "react-bootstrap/Dropdown";
import Moment from "react-moment";
import moment from "moment";
import BadgeGreen from "./Components/BadgeGreen";
import ProductCarousel from "./Components/ProductCarousel";
import axios from "axios";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import Button1 from "./Components/Button1";

const ProductPage = () => {
  const navigate= useNavigate()
  const { productId } = useParams();
  const [items, setItems] = useState({});
  const [slickItems, setSlickItems] = useState([]);
  const [category, setCategory] = useState("");
  const [user,setUser] = useState("")
  const [selectSize, setSelectSize] = useState("Select");
  const [selectQuantity, setSelectQuantity] = useState("1");
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const size = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const addtime = moment().add(+15, "days");
  const pops = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7.5,
    slidesToScroll: 5,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
  };

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

  const getData = async (productId) => {
    if (productId) {
      const api = `http://localhost:8080/api/product/${productId}`;
      await axios
        .post(api)
        .then((response) => {
          const data = response.data;
          setItems(data);
          setCategory(data.category);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const slickData = async () => {
    const api = "http://localhost:8080/api/product/all";
    await axios
      .get(api)
      .then((response) => {
        const data = response.data;
        const filterData = data.filter((item)=>item.category===category)
        console.log(filterData)
        setSlickItems(filterData.slice(0,12));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData(productId);
    slickData();
    getUser()
  }, [category]);

  const addToCart =async () => {
    const cartItem = {
      userId:user,
      productId: items._id,
      quantity: items.quantity,
      size: items.size,
    };
    if(user){
      await axios.post('http://localhost:8080/api/cart/add',cartItem)
    }else{
      navigate("/singup&login")
    }
   
    console.log(cartItem);
  };

  return (
    <div>
      <div className="display-flex bg-fff media-d-block gap-3 p-3">
        <div className="display-flex box-shadow-1 media-d-block gap-3 bg-fff ">
          <div className="w-50-noimp media-w-100">
            <ProductCarousel images={items.image} />
          </div>
          <div className=" bg-fff p-3">
            <p className="m-0 color-darkpink">CATEGORY:{items.category}</p>
            <h3 className="text-dark  f-20 fw-700">{items.title}</h3>
            {/* <div className="under-Line-05"></div> */}
            <hr className="mb-0" />
            <div className="mb-3 d-flex align-items-center gap-3">
              <StarRatting
                size={16}
                startCount={items.totleRatting}
                star={items.star}
              />
              {items.totleRatting > 200 ? (
                <BadgeGreen name={"Trusted"} className={"text-light"} />
              ) : (
                ""
              )}
            </div>
            <div>
              <div className="display-flex gap-1 align-items-center">
                <div className="d-flex line-30">
                  <div className="d-flex align-items-center f-30 fw-500">
                    <div>₹{items.price}/-</div>
                  </div>
                  <div className="font-w-400 d-flex align-items-center">
                    <div className="m-0">M.R.P:</div>
                    <div className="text-decoration-line-through">
                      ₹{items.mrp}
                    </div>
                  </div>
                </div>
              </div>
              <div className="fw-500 text-orang mb-3 ">
                ({Number.parseInt(100 - (100 * items.price) / items.mrp)}%OFF)
              </div>
            </div>

            <div className="d-flex m-auto justify-content-around gap-3 mb-3">
              <div className="w-100">
                <p className="m-0 fw-600">Quentity</p>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                    className="w-100 p-0 f-20 py-1 px-3 color-darkpink"
                  >
                    {items.quantity}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {quantity.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        className="f-14"
                        variant="outline-secondary"
                        onClick={() => {
                          const tempItem = { ...items };
                          tempItem.quantity = item;
                          setItems({ ...tempItem });
                          setSelectQuantity(item);
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="w-100">
                <p className="m-0 fw-600">Size</p>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                    className="w-100 p-0 px-1 f-20 py-1 color-darkpink"
                  >
                    {items.size}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {size.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        className="f-14"
                        variant="outline-secondary"
                        onClick={() => {
                          const tempItem = { ...items };
                          tempItem.size = item;
                          setItems({ ...tempItem });
                          setSelectSize(item);
                        }}
                      >
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="fw-600 ">
              Expected delivery
              <Moment date={addtime} className="fw-900" format="Do MM" />
            </div>
            <div className="">
              FREE Delivery by <b>QeenShopy</b>
            </div>
            <div className="d-flex flex-column justify-content-between">
              <hr className="mt-0" />
              <div className="d-flex justify-content-around">
                <div className="w-100 d-flex flex-column align-items-center">
                  <Link className="p-2 h-55px w-55px border-radius-50 media-h-45 media-w-45 bg-icon d-flex justify-content-center align-items-center text-decoration-none text-dark">
                    <i className="fas fa-truck-fast f-30 media-f-22 "></i>
                  </Link>
                  <div className="text-center f-12 fw-700 media-f-9">
                    Fast Delivery
                  </div>
                </div>
                <div className="w-100 d-flex flex-column align-items-center">
                  <Link className="p-2 h-55px w-55px border-radius-50 media-h-45 media-w-45 bg-icon d-flex justify-content-center align-items-center text-decoration-none text-dark">
                    <ShieldLockFill className="f-30 media-f-22" />
                  </Link>
                  <div className="text-center f-12 fw-700 media-f-9">
                    Secuire Payment
                  </div>
                </div>
                <div className="w-100 d-flex flex-column align-items-center">
                  <Link className="p-2 h-55px w-55px border-radius-50 media-h-45 media-w-45 bg-icon d-flex justify-content-center align-items-center text-decoration-none text-dark">
                    <i className="fas fa-people-carry-box f-30 media-f-22"></i>
                  </Link>
                  <div className="text-center f-12 fw-700 media-f-9">
                    Easy Return
                  </div>
                </div>
                <div className="w-100 d-flex flex-column align-items-center">
                  <Link className="p-2 h-55px w-55px border-radius-50 media-h-45 media-w-45 bg-icon d-flex justify-content-center align-items-center text-decoration-none text-dark">
                    <i className="fas fa-trophy f-30 media-f-22"></i>
                  </Link>
                  <div className="text-center f-12 fw-700 media-f-9">
                    Good Brand
                  </div>
                </div>
              </div>

              <hr />
            </div>

            <div className="d-flex w-100 position-sticky bottom-0 bg-fff gap-2">
              <Button1 onClick={addToCart}>Add To Cart</Button1>
              {/* <AddCartBtn className={"p-4 rounded-0 rounded-end w-100"} /> */}
              <Button1>Buy Now</Button1>
            </div>
            <hr />
            <div>
              <h5>Product Details</h5>
              <ul className="mb-0">
                {items.description &&
                  items.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="advertice"></div>
      </div>
      <div className="bg-fff box-shadow-1">
        <Slider {...pops} className="pb-35">
          {slickItems?.map((item, i) => (
            <Link
              key={i}
              className="d-flex justify-content-center flex-column p-2 text-decoration-none hover-shadow-10"
              to={`/product/${item._id}`}
              onClick={() => {
                getData(item._id);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
              }}
            >
              <img
                src={item.image}
                alt="image"
                className="m-auto w-100 object-fit-contain h-150px"
              />
              <div>
                <p className="mb-0 f-14 ellipsis media-f-10 fw-600 text-dark">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductPage;
