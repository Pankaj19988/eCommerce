import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Input from "./Input";
import { Button } from "react-bootstrap";
import axios from "axios";

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

  const singUp =async () => {
    const data = props.singUpData
    if (randomOtp === otp) {
      setOtpBox(successOtp);
      console.log(data)
     await axios.post("http://localhost:8080/api/user/creat",data)
      .then( (response)=> {
        console.log(response);
        props.setSignUpModel(false)
        props.setSingUpThim(false)
      })
      .catch( (error)=> {
        console.log(error.response.data);
      });
       
      // fetch("http://localhost:8080/api/user/creat", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json ; charset=UTF-8",
      //   },
      // }); 
      
      props.setSingUpData({
        fullname: "",
        email: "",
        mobile: "",
        password: " "
      })
      props.getDataUserData();
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
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />
      </div>
      <Button onClick={singUp}>Sing up</Button>
    </div>
  );
};

export default OtpSingUp;
