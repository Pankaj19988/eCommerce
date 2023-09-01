import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Input from "./Input";
import { Button } from "react-bootstrap";

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
    border: "3px solid red",
    borderRadius: "8px",
    width: "100%",
    height: "54px",
    fontSize: "20px",
    color: "#000",
    fontWeight: "600",
    caretColor: "blue",
  };
  const [otp, setOtp] = useState("");
  const [randomOtp, setRandomOtp] = useState("");
  const [otpBox, setOtpBox] = useState(normalOtp);
  

  // Random OTP Generate
  function generateOTP() {
    var code = "";
    for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    console.log(code);
    setRandomOtp(code);
  }
  useEffect(() => {
    generateOTP();
  }, []);
  // ///////////////////////

  const submiteOtp = () => {
    if (randomOtp === otp) {
      setOtpBox(successOtp);
      props.setOtpModel(false)
      props.setOtpSuccess(true)      
    } else {
      setOtpBox(failOtp);
    }
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center gap-3">
      <div>{randomOtp}</div>
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
      <Button onClick={submiteOtp}>Submite OTP</Button>
    </div>
  );
};

export default GetOtp;
