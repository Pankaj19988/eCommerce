import React, { useEffect, useState } from "react";
import StarRatting from "../StarRatting";
import BadgeGreen from "./BadgeGreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Button1 from "./Button1";

const ListPage = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [user, setUser] = useState();
  const addtime = moment().add(+15, "days");
  const { listType } = useParams();
  const navigate = useNavigate()

  const api = "http://localhost:8080/api/product/all";

  const getPost = async () => {
    await axios
      .get(api)
      .then((response) => {
        const data = response.data;
        if (listType == "upto94") {
          const item = data.filter((item) => (item.price * 100) / item.mrp < 6);
          console.log(listType);
          setAllItems(item);
        } else if (listType == "bestReview") {
          const item = data.sort((a, b) => b.totleRatting - a.totleRatting);
          console.log(listType);
          setAllItems(item);
        } else if (listType == "uptoRS30") {
          const item = data.filter((item) => item.price < 30);
          console.log(listType);
          setAllItems(item);
        } else if (listType == "best_man_woman_shirt") {
          const filterData = data.filter(
            (item) =>
              (item.category == "MAN-SHIRT") | (item.category == "GIRL-SHIRT")
          );
          const filterPrice = filterData.filter((item) => item.price > 30);
          setAllItems(filterPrice);
        } else if (listType == "best_woman_collection") {
          const filterCategory = data.filter(
            (item) =>
              (item.category == "GIRL-SHIRT") |
              (item.category == "GIRL-T-SHIRT") |
              (item.category == "GIRL-NIGHTDRESS")
          );
          setAllItems(filterCategory);
        } else if (listType == "man_nightwear") {
          const item = data.filter((item) => item.category == "MAN-NIGHTDRESS");
          setAllItems(item);
        } else if (listType == "woman_nightwear") {
          const item = data.filter(
            (item) => item.category == "GIRL-NIGHTDRESS"
          );
          setAllItems(item);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  const addToCart = async (item) => {
    if (user) {
      await axios.post("http://localhost:8080/api/cart/add",{
        userId:user,
        productId:item._id,
        quantity:item.quantity,
        size:item.size
      })
    } else {
      navigate('/singup&login')
    }
    // console.log(item)

    // await axios.post('http://localhost:8080/api/cart/add',)
  };

  useEffect(() => {
    getPost();
    getUser();
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  // const showProduct = (i) =>{
  //   console.log(items[i]._id)
  //   localStorage.setItem('show',JSON.stringify(items[i]._id))
  //   console.log(i)
  // }
  return (
    <div className="bg-color-fff bg-fff gap-2 p-2 justify-content-center grid5 media-w-100 media-grid-2-47-47 w-90-noimpo mx-auto">
      {allItems &&
        allItems.map((item, i) => (
          <div
            key={i}
            className="bg-fff box-shadow-1 hover-shadow-10 p-2 w-20 border-radius-5 d-flex flex-column justify-content-between align-items-start"
          >
            <Link
              to={`/product/${item._id}`}
              className="text-decoration-none text-dark w-webkit"
            >
              <div className="d-flex justify-content-center">
                <img
                  src={item.image}
                  className="h-200-noimpo object-fit-contain media-h-150"
                />
              </div>
              <div className="d-flex justify-content-center align-items-start flex-column">
                <div className="text-start fw-600 text-black text-decoration-none trunket-2-line line-18 media-f-12 h-36 w-webkit">
                  {item.title}
                </div>
                <div className="display-flex media-d-block w-100 align-items-center gap-2 mb-2">
                  <StarRatting
                    size={14}
                    star={item.star}
                    startCount={item.totleRatting}
                  />
                  {item.totleRatting > 200 ? (
                    <BadgeGreen name={"Trusted"} className={"text-light"} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="display-flex gap-1 align-items-center">
                  <div className="d-flex align-items-center f-20 fw-900">
                    <i className="fas fa-indian-rupee-sign"></i>
                    <div>{item.price}/-</div>
                  </div>
                  <div className="font-w-400 d-flex align-items-center">
                    <div className="m-0">M.R.P:</div>
                    <div className="text-decoration-line-through">
                      ₹{item.mrp}
                    </div>
                  </div>
                </div>
                <div className="fw-800 text-orang media-f-12 mb-2">
                  ({Number.parseInt(100 - (100 * item.price) / item.mrp)}%OFF)
                </div>
                <div className="fw-600 media-f-12 f-14 line-14">
                  Expected delivery
                  <Moment date={addtime} className="fw-900" format="Do MM" />
                </div>
                <div className="media-f-12 mb-2 f-14 line-14">
                  FREE Delivery by <b>QeenShopy</b>
                </div>
              </div>
            </Link>
            <Button1 onClick={() => addToCart(item)}>Add To Cart</Button1>
            {/* <AddCartBtn className={'bg-danger'}/> */}
          </div>
        ))}
    </div>
  );
};

export default ListPage;
