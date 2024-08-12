import React, { useEffect, useState } from "react";
import orderSuccessImg from "../../confirmOrder.jpg";
import paymentFail from "../../paymentFail.jpg";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { creatOrder, paymentStatusByOrderId } from "./service/api";
import LoaderContent from "./Components/LoaderContent";

const OrderStatus = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const paramValue = queryParams.get("order_id");
  const paymentStatus = queryParams.get('status')
  const [statusImage, setStatusImage] = useState("");
  const [status, setstatus] = useState(false);
  const [orderData, setOrderData] = useState("");
  const [repeatApiCallingStop, setRepeatApiCallingStop] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(false)

  const checkPaymentStatus = async () => {
    setLoaderVisible(true)
    if (paramValue) {
      try {
        const res = await paymentStatusByOrderId(paramValue);
        setOrderData(res.data);
        if (res?.data.order_status === "PAID" && repeatApiCallingStop) {
          const response = await creatOrder(paramValue);
          if (response.status === 200) {
            setStatusImage(orderSuccessImg);
            setstatus(true);
            setRepeatApiCallingStop(false);
          }
        } else {
          setStatusImage(paymentFail);
          setstatus(false);
        }
      } catch (err) {
        console.log(err);
      }finally{
        setLoaderVisible(false)
      }
    } else {
      navigate("/");
    }
  };

  const tryAgain = () => {
    if (process.env.REACT_APP_PAYMENT_GETWAY === "razorpay") {
      return console.log('Try Again')
    }
    const cashfree = window.Cashfree({
      mode: "sandbox", // or 'production'
    });
    cashfree
      .checkout({
        paymentSessionId: orderData.payment_session_id,
        returnUrl:
          `${process.env.REACT_APP_BASE_URL}your_order_status?order_id={order_id}`, // Replace with your actual return URL
      })
      .then((result) => {
        if (result.error) {
          alert(result.error.message);
        }
        if (result.redirect) {
          console.log("Redirection");
        }
      });
  };

  const successOrder = async () => {
    try {
      await creatOrder(paramValue);
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (process.env.REACT_APP_PAYMENT_GETWAY !== "razorpay") {
      checkPaymentStatus();
    }
  }, []);

  useEffect(() => {
    if (process.env.REACT_APP_PAYMENT_GETWAY === "razorpay") {
      setLoaderVisible(true)
      if (paymentStatus === "success") {
        setStatusImage(orderSuccessImg);
        successOrder();
        setLoaderVisible(false)
      } else {
        setStatusImage(paymentFail)
        setLoaderVisible(false)
      }
    }
  }, [paymentStatus])

  return (
    <>
      {loaderVisible ? <div className="h-50vh d-flex align-items-center justify-content-center"><LoaderContent visible={loaderVisible} /></div> : <div className="d-flex flex-column align-items-center mx-auto w-fit-cont gap-4 mb-3 p-3 max-w-500px">
        <div className="text-center">
          <img src={statusImage} alt="image" className="w-100 " />
          <h1 className="text-center">
            {status === "success"
              ? "Your Order Is Confirmed!"
              : !status === "success"
                ? "Your Payment Fail Please Try Again"
                : ""}
          </h1>
        </div>

        {paymentStatus === "success" || status ? (
          <Button
            className="w-100 px-3"
            onClick={() => {
              navigate("/");
            }}
          >
            Continue Shopping
          </Button>
        ) : !paymentStatus === "success" || !status ? (
          <Button className="w-100 px-3" onClick={tryAgain}>
            Try Again
          </Button>
        ) : (
          ""
        )}
      </div>}
    </>
  );
};

export default OrderStatus;
