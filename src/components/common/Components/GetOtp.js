import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Input from "./Input";
import { Button,Spinner } from "react-bootstrap";
import { forgotPassGetOtp, singUpOtpVerify } from "../service/api";
import { Link } from "react-router-dom";

const GetOtp = (props) => {
  const normalOtp = {    
    border: "2px solid black",
    borderRadius: "8px",
    width: "100%",
    height: "54px",
    fontSize: "20px",
    fontWeight: "600",
    caretColor: "blue",
  };
  const successOtp = {
    border: "2px solid green",
    borderRadius: "8px",
    width: "100%",
    height: "54px",
    fontSize: "20px",
    color: "#000",
    fontWeight: "600",
    caretColor: "blue",
  };
  const failOtp = {
    border: "2px solid red",
    borderRadius: "8px",
    width: "100%",
    height: "54px",
    fontSize: "20px",
    color: "#000",
    fontWeight: "600",
    caretColor: "blue",
  };
  const [otp, setOtp] = useState("");
  const [otpBox, setOtpBox] = useState(normalOtp);
  const [loader,setLoader] = useState(false)
  

  // Random OTP Generate
  
  // ///////////////////////

  const submiteOtp = async() => {
    const data = {
      secretKey:props.secretKey,
      otp:otp
    }
    if (otp.length===6) {
      try {
        const res = await singUpOtpVerify(data)
        if (res.data===props.secretKey){
          setOtpBox(successOtp);
        props.setOtpModel(false)
        props.setOtpSuccess(true) 
        } 
      } catch (error) {
        setOtpBox(failOtp);
      }
    } else {
      setOtpBox(failOtp);
    }
    
  };

  const reSendOtp = async() =>{
    setLoader(true)
    try {
      const res = await forgotPassGetOtp(props.mobile)
      if (res.status===200) {
        props.setSecretKey(res.data)
        setRemainingTime(60)
      }
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }
  const [remainingTime, setRemainingTime] = useState(0.50 * 60); // 5 minutes in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Convert remaining time to minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="w-100 d-flex flex-column justify-content-center gap-3">
      <h3 className="text-center media-f-18 mb-0">Enter OTP Sent To Your Mobile Number</h3>
      <p className="text-center mb-0 mt--1rem"><strong>+91******{props.mobile.substring(6)}</strong></p>
      <div className="w-90-noimpo mx-auto">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus={true}
          inputType="number"
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={otpBox}
          focusStyle={{
            borderBottom: "1px solid transparent",
            // outline: "none",
          }}
        />
      </div>
      {remainingTime===0?(loader?<span className="text-center"><Spinner animation="border" variant="primary" /></span>:<Link className=" h-36 text-center" onClick={reSendOtp}><strong>Resend OTP</strong></Link>):<div className="text-center">Resend OTP in <strong>{String(seconds).padStart(2, '0')}<span className="f-12">S</span></strong></div>}
      <Button onClick={submiteOtp}>Submite OTP</Button>
    </div>
  );
};

export default GetOtp;
