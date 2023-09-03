import React, { useEffect, useState } from "react";
import "../common/style/singup_login.css";
import { Link, useNavigate } from "react-router-dom";
import ModelCenter from "./Components/ModelCenter";
import GetOtp from "./Components/GetOtp";
import { Form } from "react-bootstrap";
import OtpSingUp from "./Components/OtpSingUp";
import axios from "axios";

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
    password: " ",
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
  const [diffrantPass,setDiffrantPass] = useState('')

  const [passShow, setPassShow] = useState(false);

  const [profile, setProfile] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [singInPass, setSingInPass] = useState("");
  const [mactchedItem, setMactchedItem] = useState();
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");


  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[])
  const singIn = () => {
    if (singUpThim) {
      setSingUpThim(false);
    }
  };

  const getDataUserData = async () => {
    // const url = "http://localhost:3000/profile";
    // const data = await fetch(url);
    // const parsedData = await data.json();
    // console.log(parsedData);
    // setProfile(parsedData);
  };

  const submiteSingIn = async () => {
    // const findProfile = await profile.find(
    //   (item) => item.mobile == mobileNumber && item.password == singInPass
    // );
    // console.log(findProfile);
    console.log(mobileNumber)
    console.log(singInPass)
    await axios.post("http://localhost:8080/api/user/singin",({mobile:mobileNumber,password:singInPass}))
    .then((response)=>{
      console.log(response.data)
      localStorage.setItem('user',JSON.stringify(response.data))
      navigate('/')
    })
    .catch((errors)=>{
      if(errors.response.status===400){
        setInvalidMobile(errors.response.data);
        setSingInPass('')
        console.log(errors.response.data)
      }else if(errors.response.status===404){
        console.log(errors)
      }else{
        console.log("sing in successfull")
      }
    })
    // if (findProfile) {
    //   console.log("i am Sing In");
    // } else {
    //   console.log("Not Mached");
    // }
  };

  

  const submiteSingUp = async (e) => {
    e.preventDefault();
    console.log(singUpForm);
    await axios
      .post("http://localhost:8080/api/user/find", singUpForm)
      .then((response) => {
        console.log(response);
        setFindErr('')
        setSignUpModel(true);
      })
      .catch((error) => {
        const findingErr =error.response.data
        const fillError =error.response.data.errors
        if (error.response.status===403) {
          setFindErr(findingErr);
          setBlanckInput([]);
        }else if (error.response.status===400) {
          const blanckErrPath = fillError.map((item, i) => {
            return item.path;
          });
          setBlanckInput(blanckErrPath);
        }
      });
  };

  useEffect(() => {
    getDataUserData();
  }, []);

  const getOtp = async() => {
    await axios.post("http://localhost:8080/api/user/forgotpassword",({mobile:mobileNumber}))
    .then((response)=>{
      console.log(response)
      setMactchedItem(response.data._id)
      setOtpModel(true);
      setInvalidMobile("")
    }).catch((errors)=>{
        console.log(errors.response.data)
        setInvalidMobile(errors.response.data)
    })
    // const findProfile = profile.find((item) => item.mobile == mobileNumber);
    // setOtpModel(!!findProfile);
    // if (findProfile) {
    //   setMactchedItem(findProfile);
    //   setInvalidMobile(false);
    // } else {
    //   setInvalidMobile(true);
    //   console.log("Invlid Number");
    // }
  };

  const setPassword = async() => {
    if (newPass1 === newPass2) {
      let forgotId = mactchedItem;
      console.log(newPass2)
      await axios.put(`http://localhost:8080/api/user/setpassword/${forgotId}`,({password:newPass2}))
      .then((response)=>{
        getDataUserData();
      setNewPass1("");
      setNewPass2("");
      setOtpSuccess(false);
      setForgetPass(false);
      }).catch((errors)=>{
        console.log(errors.response.data)
        setDiffrantPass(errors.response.data)
      })
    }else {
       setDiffrantPass("Please Enter Sem Password")
     }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSingUpForm({
      ...singUpForm,
      [name]: value,
    });
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
                <div className={`input-field ${diffrantPass?'err-border':""}`}>
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
                <div className={`input-field  ${diffrantPass?'err-border':""}`}>
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
                <p className="fw-600 mb-0 text-danger">
                    {diffrantPass}
                  </p>
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
                <div className={`input-field ${invalidMobile===''?'':'err-border'}`}>
                  <i className="fas fa-phone"></i>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.slice(0, 10))}
                  />
                </div>
                {!forgetPass ? (
                  <div className={`input-field ${invalidMobile===''?'':'err-border'}`}>
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
                  <p className="fw-600 mb-0 text-danger">
                    {invalidMobile}
                  </p>
                <button
                  type="submite"
                  className="btn-singin solid"
                  onClick={!forgetPass ? submiteSingIn : getOtp}
                >{!forgetPass ? "Sing In" : "Get OTP"}</button>

                <ModelCenter
                  show={otpModel}
                  onHide={() => setOtpModel(false)}
                  title={"Enter OTP"}
                >
                  <GetOtp
                    mactchedItem={mactchedItem}
                    setOtpModel={setOtpModel}
                    setOtpSuccess={setOtpSuccess}
                  />
                </ModelCenter>

                <p className="social-text">Or Sign in with social platforms</p>
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
                </div>
              </form>
            )}

            {/* Sing Up Form */}

            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div
                className={`input-field ${
                  blanckInput.includes("fullname") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handleInput}
                />
              </div>
              {blanckInput.includes("fullname")?<div className="mb-0 text-danger w-80-noimpo fw-600">Please Enter Valid Full Name</div>:''}
              <div
                className={`input-field ${
                  blanckInput.includes("email") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInput}
                />
              </div>
              {blanckInput.includes("email")?<div className="mb-0 text-danger w-80-noimpo fw-600">Please Enter Valid Email</div>:''}
              <div
                className={`input-field ${
                  blanckInput.includes("mobile") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-phone"></i>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  onChange={handleInput}
                />
              </div>
              {blanckInput.includes("mobile")?<div className="mb-0 text-danger w-80-noimpo fw-600">Please Enter Valid Mobile Number</div>:''}
              <div
                className={`input-field ${
                  blanckInput.includes("password") ? "err-border" : ""
                }`}
              >
                <i className="fas fa-lock"></i>
                <input
                  type={passShow ? "text" : "password"}
                  name="password"
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
              {blanckInput.includes("password")?<div className="mb-0 text-danger w-80-noimpo fw-600">Password Enter Minimum 5 character</div>:''}
              <div className="mb-0 text-danger fw-600">{findErr}</div>
              <div className="m-0 text-end d-flex align-items-center gap-2 ">
                <Form.Check
                  checked={singUpForm.term_condition}
                  onChange={(e) => {
                    setSingUpForm({
                      ...singUpForm,
                      term_condition: e.target.checked,
                    });
                    console.log(e.target.checked);
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
              >
                Sign up
              </button>
              <ModelCenter
                show={signUpModel}
                onHide={()=>setSignUpModel(false)}
                title={"SING UP"}
              >
                <OtpSingUp
                  singUpData={singUpForm}
                  setSignUpModel={setSignUpModel}
                  setSingUpThim={setSingUpThim}
                  setSingUpData={setSingUpForm}
                  getDataUserData={getDataUserData}
                />
              </ModelCenter>
              <p className="social-text">Or Sign up with social platforms</p>
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
              </div>
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
            <img
              src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
              className="singin-image"
              alt=""
            />
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
            <img
              src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
              className="singin-image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup_Login;
