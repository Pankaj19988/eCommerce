import React, { useEffect, useRef, useState } from "react";
import StarRatting from "./StarRatting";
import { ShieldLockFill } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Moment from "react-moment";
import moment from "moment";
import BadgeGreen from "./Components/BadgeGreen";
import ProductCarousel from "./Components/ProductCarousel";
import axios from "axios";
import Slider from "react-slick";
import Button1 from "./Components/Button1";
import { toast } from "react-toastify";
import { addToCartOneItem, getAllProduct, getOneProductById } from "./service/api";
import ModelCenter from "./Components/ModelCenter";
import AddressFill from "./AddressFill";
import LoaderContent from "./Components/LoaderContent";

const ProductPage = (props) => {
  const navigate = useNavigate();

  const sliderRef = useRef(null);
  const [reachedFirstSlide, setReachedFirstSlide] = useState(false);

  const { productId } = useParams();
  const [items, setItems] = useState({});
  const [slickItems, setSlickItems] = useState([]);
  const [category, setCategory] = useState("");
  const [adressModalShow,setAdressModalShow] = useState(false)
  const [products,setProducts] = useState([])
  const [loaderVisible,setLoaderVisible] =useState(false)
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

  const getData = async (productId) => {
    
    if (productId) {
      setLoaderVisible(true)
      try {
        const res = await getOneProductById(productId)
        if (res.status===200) {
          const data = res.data;
          setItems(data);
          setCategory(data.category);
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      } catch (error) {
        console.log(error);
      }
      setLoaderVisible(false)
    }
  };

  const slickData = async () => {
    try {
      const res = await getAllProduct(1,12,category)
      if (res.status===200) {
        const data = res.data
        setSlickItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(productId);
    slickData();
  }, [category]);

  const addToCart = async () => {
    const cartItem = {
      productId: items._id,
      quantity: items.quantity,
      size: items.size,
    };
    if (localStorage.getItem('user')) {
      try {
        const res = await addToCartOneItem(cartItem)
        console.log(res)
        if (res.status===200) {
          props.cart===""?props.setCart("1"):props.setCart("")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate("/singup&login");
    }  
  };

  const buyNow = async() =>{
    const productData=[{ 
      productid:items._id,
    quantity:items.quantity,
    size:items.size,
    price:items.price,
    title:items.title,
    image:items.image[0]
  }]
  if (localStorage.getItem('user')) {
    setProducts(productData)
    setAdressModalShow(true)
  } else {
    navigate('/singup&login ')
  }
  }



  useEffect(() => {
    setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);
  }, []);

  return (
    <>
    {loaderVisible?<div className="h-50vh d-flex align-items-center justify-content-center"><LoaderContent visible={loaderVisible}/></div>:<div>
      <div className="display-flex bg-fff media-d-block gap-3 p-3">
        <div className="display-flex box-shadow-1 media-d-block gap-3 bg-fff w-60-noimp media-w-100">
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
              <div className="fw-500 color-green mb-3 ">
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
                          toast.info(`Your Selected Quantity : ${item}`)
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
                          toast.info(`Your Selected Size : ${item}`)
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

              <hr className="mb-0"/>
            </div>

            <div className="d-flex w-100 position-sticky bottom-0 bg-fff gap-2 py-3">
              <Button1 onClick={addToCart}><i class="fas fa-cart-plus"></i>Add To Cart</Button1>
              <Button1 onClick={buyNow}><i class="fas fa-bolt-lightning"></i>Buy Now</Button1>
            </div>
            <hr className="mt-0"/>
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

      {/* Slick */}

      <div className="bg-fff box-shadow-1">
        <Slider {...pops} className="pb-35" ref={sliderRef}>
          {slickItems?.map((item, i) => (
            <Link
              key={i}
              className="d-flex justify-content-center flex-column p-2 text-decoration-none hover-shadow-10"
              to={`/product/${item._id}`}
              onClick={() => {
                getData(item._id);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                props.setProgress(100);
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

      <ModelCenter
          show={adressModalShow}
          onHide={() => setAdressModalShow(false)}
          title={"Fill Out Your Details"}
        >
          <AddressFill quantity={quantity} products={products} setAdressModalShow={setAdressModalShow} cart={false}/>
          
          
        </ModelCenter>
    </div>}
    </>
  );
};

export default ProductPage;
