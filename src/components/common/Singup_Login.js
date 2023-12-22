import React, { useEffect, useState } from "react";
import "../common/style/singup_login.css";
import { Link, useNavigate } from "react-router-dom";
import ModelCenter from "./Components/ModelCenter";
import GetOtp from "./Components/GetOtp";
import { Form } from "react-bootstrap";
import OtpSingUp from "./Components/OtpSingUp";
import axios from "axios";
import {
  forgotPassGetOtp,
  setNewPassword,
  submiteSingIn,
  submiteSingInForm,
  singUpUserSendOtp,
  sendSingUpOTP,
  submiteSingUpForm,
} from "./service/api";
import singUpPng from "../../singUpPng.png";
import singInPng from "../../singInPng.png";
import moment from "moment";



const Singup_Login = () => {
  const [singUpThim, setSingUpThim] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  // const [checked, setChecked] = useState(false);
  // Input Object //
  const navigate = useNavigate();
  const [singUpForm, setSingUpForm] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    term_condition: false,
  });

  // Model Show //
  const [otpModel, setOtpModel] = useState(false);
  const [termModel, setTermModel] = useState(false);
  const [signUpModel, setSignUpModel] = useState(false);

  // Screen Error //
  const [invalidMobile, setInvalidMobile] = useState("");
  const [findErr, setFindErr] = useState("");
  const [blanckInput, setBlanckInput] = useState([]);
  const [diffrantPass, setDiffrantPass] = useState("");
  const [passShow, setPassShow] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [singInPass, setSingInPass] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [secretKey,setSecretKey] = useState("")
  const singIn = () => {
    if (singUpThim) {
      setSingUpThim(false);
    }
  };

  const submiteSingIn = async (e) => {
    e.preventDefault();
    try {
      const res = await submiteSingInForm(mobileNumber, singInPass);
      if (res.status === 200) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      if (error.response.status === 400) {
        setInvalidMobile(error.response.data);
        setSingInPass("");
      } else if (error.response.status === 404) {
        console.log(error);
      }
    }
  };


  const submiteSingUp = async (e) => {
    e.preventDefault();
    try {
      const res = await singUpUserSendOtp(singUpForm);
      // await submiteSingUpForm(singUpForm)
      if (res.status === 200) {
        setSecretKey(res.data)
        setSignUpModel(true);
        console.log(res)
      }
    } catch (error) {
      console.log(error);
      const findingErr = error.response.data;
      const fillError = error.response.data.errors;
      if (error.response.status === 403) {
        setFindErr(findingErr);
        setBlanckInput([]);
      } else if (error.response.status === 400) {
        const blanckErrPath = fillError?.map((item, i) => {
          return item.path;
        });
        setBlanckInput(blanckErrPath);
      }
    }
   
    // setSignUpModel(true);
  };


  

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassGetOtp(mobileNumber);
      if (res.status === 200) {
        setSecretKey(res.data);
        setOtpModel(true);
        setInvalidMobile("");
      }
    } catch (error) {
      setInvalidMobile(error.response.data);
    }
  };

  const setPassword = async () => {
    if (newPass1 === newPass2) {
      try {
        const res = await setNewPassword(secretKey, newPass2);
        if (res.status === 200) {
          setNewPass1("");
          setNewPass2("");
          setOtpSuccess(false);
          setForgetPass(false);
        }
      } catch (error) {
        setDiffrantPass(error.response.data);
      }
    } else {
      setDiffrantPass("Please Enter Sem Password");
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "mobile") {
      setSingUpForm({
        ...singUpForm,
        [name]: value.substring(0, 10),
      });
      const removeError = blanckInput?.filter((item) => item != name);
      setBlanckInput([...removeError]);
      setFindErr("");
    } else {
      setSingUpForm({
        ...singUpForm,
        [name]: value,
      });
      const removeError = blanckInput?.filter((item) => item != name);
      setBlanckInput([...removeError]);
      setFindErr("");
    }
  };

  

  return (
    <div>
      <div className={`container-singin ${singUpThim ? "sign-up-mode" : ""}`}>
        <div className="singin-forms-container">
          <div className="signin-signup">
            {otpSuccess ? (
              //  Set PassWord Form //

              <form className="z-2">
                <h2 className="title">Enter New Password</h2>
                <div
                  className={`input-field mb-2 ${diffrantPass ? "err-border" : ""}`}
                >
                  <i className="fas fa-lock"></i>
                  <input
                    type={passShow ? "text" : "password"}
                    value={newPass1}
                    onChange={(e) => setNewPass1(e.target.value)}
                    placeholder="Password"
                  />
                  <Link
                    className="text-center"
                    onClick={() => {
                      passShow ? setPassShow(false) : setPassShow(true);
                    }}
                  >
                    {passShow ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </Link>
                </div>
                <div
                  className={`input-field  ${diffrantPass ? "err-border" : ""}`}
                >
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={newPass2}
                    onChange={(e) => setNewPass2(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                {/* {passInput == "password-deffrent" ? (
                  <p className="fw-600 mb-0 text-danger">
                    Please Enter Sem Password
                  </p>
                ) : (
                  ""
                )} */}
                <p className="fw-600 mb-0 text-danger">{diffrantPass}</p>
                <input
                  type="button"
                  value={"Set Password"}
                  className="btn-singin solid"
                  onClick={setPassword}
                />
              </form>
            ) : (
              // Sing In Form //

              <form className="sign-in-form">
                <h2 className="title">
                  {!forgetPass ? "Sing In" : "Please Enter Number"}
                </h2>
                <div className="d-flex flex-column gap-2 w-100 justify-content-center align-items-center">
                <div
                  className={`input-field ${
                    invalidMobile === "" ? "" : "err-border"
                  }`}
                >
                  <i className="fas fa-phone"></i>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value.slice(0, 10));
                      setInvalidMobile("");
                    }}
                  />
                </div>
                {!forgetPass ? (
                  <div
                    className={`input-field ${
                      invalidMobile === "" ? "" : "err-border"
                    }`}
                  >
                    <i className="fas fa-lock"></i>
                    <input
                      type={passShow ? "text" : "password"}
                      value={singInPass}
                      onChange={(e) => setSingInPass(e.target.value)}
                      placeholder="Password"
                    />
                    <Link
                      className="text-center"
                      onClick={() => {
                        passShow ? setPassShow(false) : setPassShow(true);
                      }}
                    >
                      {passShow ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                </div>
                <div className="d-flex justify-content-between">
                  <Link
                    className="m-0 text-decoration-none text-end"
                    onClick={() => {
                      setForgetPass(true);
                    }}
                  >
                    {!forgetPass ? "Forget Password?" : ""}
                  </Link>
                </div>
                <p className="fw-600 mb-0 text-danger">{invalidMobile}</p>
                <button
                  type="submite"
                  className="btn-singin solid"
                  onClick={!forgetPass ? submiteSingIn : getOtp}
                >
                  {!forgetPass ? "Sing In" : "Get OTP"}
                </button>

                <ModelCenter
                  show={otpModel}
                  onHide={() => setOtpModel(false)}
                  title={"Enter OTP"}
                >
                  <GetOtp
                    secretKey={secretKey}
                    setOtpModel={setOtpModel}
                    setOtpSuccess={setOtpSuccess}
                    mobile = {mobileNumber}
                    setSecretKey={setSecretKey}
                  />
                </ModelCenter>

                {/* <p className="social-text">Or Sign in with social platforms</p>
                <div className="social-media">
                  <Link href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                  </Link>
                  <Link href="#" className="social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </div> */}
              </form>
            )}

            {/* Sing Up Form */}

            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="d-flex flex-column gap-2 w-100 justify-content-center align-items-center">
              <div className="w-100 ">
              <div
                className={`input-field mx-auto ${
                  blanckInput?.includes("fullname") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="fullname"
                  value={singUpForm.fullname}
                  placeholder="Full Name"
                  onChange={handleInput}
                />
              
              </div>
              {blanckInput?.includes("fullname") ? (
                <small className="mb-0 text-danger w-80-noimpo fw-600">
                  Please Enter Valid Full Name
                </small>
              ) : (
                ""
              )}
              </div>

              <div className="w-100 ">
              <div
                className={`input-field mx-auto ${
                  blanckInput?.includes("email") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={singUpForm.email}
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
              {blanckInput?.includes("email") ? (
                <small className="mb-0 text-danger w-80-noimpo fw-600">
                  Please Enter Valid Email
                </small>
              ) : (
                ""
              )}
              </div>

              <div className="w-100">
              <div
                className={`input-field mx-auto ${
                  blanckInput?.includes("mobile") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-phone"></i>
                <input
                  type="number"
                  name="mobile"
                  max={10}
                  value={singUpForm.mobile}
                  placeholder="Mobile Number"
                  onChange={handleInput}
                />
              </div>
              {blanckInput?.includes("mobile") ? (
                <small className="mb-0 text-danger w-80-noimpo fw-600">
                  Please Enter Valid Mobile Number
                </small>
              ) : (
                ""
              )}
              </div>

              <div className="w-100 ">
              <div
                className={`input-field mx-auto ${
                  blanckInput?.includes("password") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-lock"></i>
                <input
                  type={passShow ? "text" : "password"}
                  name="password"
                  value={singUpForm.password}
                  placeholder="Set-Password"
                  onChange={handleInput}
                  required
                />
                <Link
                  className="text-center"
                  onClick={() => {
                    passShow ? setPassShow(false) : setPassShow(true);
                  }}
                >
                  {passShow ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </Link>
              </div>
              {blanckInput?.includes("password") ? (
                <div className="mb-0 text-danger w-80-noimpo fw-600">
                  <small>
                  Password Enter Minimum 5 character
                  </small>
                </div>
              ) : (
                ""
              )}
              </div>
              </div>
              <div className="mb-0 text-danger fw-600">{findErr}</div>
              <div className="m-0 text-end d-flex align-items-center gap-2 ">
                <Form.Check
                  checked={singUpForm.term_condition}
                  onChange={(e) => {
                    setSingUpForm({
                      ...singUpForm,
                      term_condition: e.target.checked,
                    });
                    if (e.target.checked) {
                      setFindErr('')
                    }
                  }}
                />
                <Link
                  className="text-decoration-none"
                  onClick={() => setTermModel(true)}
                >
                  Term & Condition
                </Link>
                <ModelCenter
                  show={termModel}
                  onHide={() => setTermModel(false)}
                  title={"Term & Condition"}
                >
                  hellow
                </ModelCenter>
              </div>
              <button
                type="submite"
                className="btn-singin"
                onClick={submiteSingUp}
                disabled={signUpModel}
              >
                {signUpModel?<div class="spinner-border text-light" role="status">
                  <span class="sr-only">Loading...</span>
                </div>:"Sign up"}
                
              </button>
              <ModelCenter
                show={signUpModel}
                onHide={() => setSignUpModel(false)}
                title={"Verify Your Account"}
                backdrop="static"
              >
                <OtpSingUp
                  singUpForm={singUpForm}
                  secretKey={secretKey}
                  setSignUpModel={setSignUpModel}
                  setSingUpThim={setSingUpThim}
                  setSingUpForm={setSingUpForm}
                  mobile = {singUpForm.mobile}
                  setSecretKey={setSecretKey}
                />
              </ModelCenter>
              {/* <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <Link href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div> */}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                className="btn-singin transparent"
                onClick={() => {
                  setSingUpThim(true);
                }}
              >
                Sign up
              </button>
            </div>
            <img src={singUpPng} className="singin-image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn-singin transparent" onClick={singIn}>
                Sign in
              </button>
            </div>
            <img src={singInPng} className="singin-image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup_Login;
