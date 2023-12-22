import React, { useEffect, useMemo, useState } from "react";
import StarRatting from "../StarRatting";
import BadgeGreen from "./BadgeGreen";
import { Link, useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import Button1 from "./Button1";
import { addToCartOneItem, getAllProduct } from "../service/api";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderContent from "./LoaderContent";

const ListPage = (props) => {
  const addtime = moment().add(+15, "days");
  const { listType } = useParams();
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1); 

  const getData = async () => {
    const listTypeMap = {
      'upto94':{query:"94%OFF"},
      'bestReview':{query:"BESTREVIEW"},
      'uptoRS30':{priceKey:"LT30"},
      'best_man_woman_shirt':{query:"MAN-SHIRT,GIRL-SHIRT",priceKey:"GT30"},
      'best_woman_collection':{query:"GIRL-SHIRT,GIRL-T-SHIRT,GIRL-NIGHTDRESS"},
      'man_nightwear':{query:'MAN-NIGHTDRESS'},
      'woman_nightwear':{query:'GIRL-NIGHTDRESS'},
      'MAN-SHIRT':{query:'MAN-SHIRT'},
      'MAN-T-SHIRT':{query:'MAN-T-SHIRT'},
      'GIRL-SHIRT':{query:'GIRL-SHIRT'},
      'GIRL-T-SHIRT':{query:'GIRL-T-SHIRT'}
    }
    try {
      if (listTypeMap[listType]) {
        const res = await getAllProduct(page,20,listTypeMap[listType]?.query,listTypeMap[listType]?.priceKey);
        const newData = await res?.data
        console.log(res)
        if (newData?.length>0) {
          setAllItems(prevData => [...prevData, ...newData]); // Append new data to existing data
          setPage(prevPage => prevPage + 1); // Increment page for the next fetch
        } else {
          setHasMore(false); // No more data available
        }
      } 
      
    } catch (error) {
      console.log(error);
    }
  };
 

  const addToCart = async (item) => {
    if (localStorage.getItem('user')) {
      const cartItem = {
        productId: item._id,
        quantity: item.quantity,
        size: item.size,
      }
      try {
        const res = await addToCartOneItem(cartItem)
        if (res.status===200) {
          props.cart===""?props.setCart('1'):props.setCart("")
        }
      } catch (error) {
        
      }
    } else {
      navigate("/singup&login");
    }
  };

  useMemo(()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setPage(1)
  },[listType])

  useEffect(() => {
    props.setProgress(50);
    setHasMore(true)
    setAllItems([])
    getData();
    props.setProgress(100);
  }, [listType]);

  // useEffect(() => {
  //   document.body.scrollTop = 0;
  //   document.documentElement.scrollTop = 0;
    
  // }, []);

  return (
    <>
    {allItems?.length>0?<InfiniteScroll
  dataLength={allItems.length} //This is important field to render the next data
  next={getData}
  hasMore={hasMore}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>No More Product Found!</b>
    </p>
  }   
>
    <div className="bg-color-fff bg-fff gap-2 padding-2 justify-content-center grid5 media-w-100 media-grid-2-47-47 w-90-noimpo mx-auto  smal-screen-py-3">
      {allItems &&
        allItems.map((item, i) => (
          <div
            key={i}
            className="bg-fff box-shadow-1 hover-shadow-10 p-2 w-20 border-radius-5 d-flex flex-column justify-content-between align-items-start smal-screen-border-radiuse-0px"
          >
            <Link
              to={`/product/${item._id}`}
              className="text-decoration-none text-dark w-webkit"
              onClick={() => props.setProgress(100)}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={item.image}
                  className="h-200-noimpo object-fit-contain media-h-150 w-webkit"
                />
              </div>
              <div className="d-flex justify-content-center align-items-start flex-column">
                <div className="text-start fw-600 text-black text-decoration-none trunket-2-line line-18 media-f-12 h-36 w-webkit">
                  {item.title}
                </div>
                <div className="display-flex media-d-block w-100 align-items-center gap-2">
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
                <div className="fw-800 color-green media-f-12 mb-2">
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
            <Button1 onClick={() => addToCart(item)}>
              <i class="fas fa-cart-plus"></i>Add To Cart
            </Button1>
          </div>
        ))}
    </div>
    </InfiniteScroll>:<div className="h-50vh d-flex align-items-center justify-content-center"><LoaderContent visible={true}/></div>}
    </>
  );
};

export default ListPage;
