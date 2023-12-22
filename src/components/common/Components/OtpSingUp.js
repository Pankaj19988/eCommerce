import React, { useEffect, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import { Button, Spinner } from "react-bootstrap";
import { forgotPassGetOtp, singUpOtpVerify } from "../service/api";
import { Link } from "react-router-dom";

const OtpSingUp = (props) => {
  const normalOtp = {
    borderBottom: "2px solid blacke",
    borderRadius: "8px",
    width: "100%",
    height: "54px",
    fontSize: "20px",
    color: "#000",
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
  
  useMemo(()=>{
    setOtpBox(normalOtp)
  },[otp])

  const singUp =async () => {
    const data = {
      secretKey:props.secretKey,
      otp:otp
    }
    if (otp.length) {
      try {
        const res = await singUpOtpVerify(data)
        if (res.data===props.secretKey) {
          setOtpBox(successOtp)
          props.setSignUpModel(false);
          props.setSingUpThim(false);
          props.setSingUpForm({
            fullname: "",
            email: "",
            mobile: "",
            password: "",
            term_condition: false,
          })
        }
      } catch (error) {
        setOtpBox(failOtp)
      } 
    } else {
      setOtpBox(failOtp)
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
  const [remainingTime, setRemainingTime] = useState(0.50 * 60); //Second Count

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
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />
      </div>
      {remainingTime===0?(loader?<span className="text-center"><Spinner animation="border" variant="primary" /></span>:<Link className=" h-36 text-center" onClick={reSendOtp}><strong>Resend OTP</strong></Link>):<div className="text-center">Resend OTP in <strong>{String(seconds).padStart(2, '0')}<span className="f-12">S</span></strong></div>}
      {/* {String(minutes).padStart(2, '0')} */}
      <Button type="submite" onClick={singUp}>Sing up</Button>
    </div>
  );
};

export default OtpSingUp;
