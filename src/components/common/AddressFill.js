import React, { useEffect, useState } from "react";
import Input from "./Components/Input";
import { Button } from "react-bootstrap";
import { cashfreeCreatOrder } from "./service/api";

const AddressFill = (props) => {
  const [form, setForm] = useState({
    name:"",
    mobile: "",
    address1: "",
    landmark: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
  });
  const [totleAmount,setTotleAmount] = useState(0)
  const [errors,setErrors] =useState({
    name:"",
    mobile: "",
    address1: "",
    landmark: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
  })

  const validateEmptyCheck = (tempErrors, keys) => {
    keys.forEach((key) => {
      if(!form[key]){
        tempErrors[key] = "This Field is required";
      }
    });

    return tempErrors;
  }
 
  const cashfreeCheckoutRedairect = (session_id) =>{
    const PATH_BASE_URL = process.env.REACT_APP_BASE_URL;
    const cashfree = window.Cashfree({
      mode: 'sandbox', // or 'production'
    });
    cashfree.checkout({
      paymentSessionId:session_id,
      returnUrl: `${PATH_BASE_URL}your_order_status?order_id={order_id}`, // Replace with your actual return URL
    }).then((result) => {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log('Redirection');
      }
    });
  }

  const handleSubmite = async() => {
    // const requiredFields = ['name', 'mobile', 'address1', 'landmark', 'city', 'zipcode','state', 'country'];
    // const tempErrors = validateEmptyCheck({}, requiredFields);

    // if(Object.keys(tempErrors)?.length > 0){
    //   setErrors({...tempErrors});
    //   return;
    // }

    if (props.cart===true) {
      const orederDetails = {products:props.products,address:form,amount:totleAmount,cart:true}
      console.log(orederDetails)
    try {
      const res = await cashfreeCreatOrder(orederDetails)
      if (res.status===200) {
        cashfreeCheckoutRedairect(res.data)
      props.setAdressModalShow(false)
      }
    } catch (error) {
      console.log(error)
    }
    } else {
      const orederDetails = {products:props.products,address:form,amount:totleAmount,cart:false}
      console.log(orederDetails)
    try {
      const res = await cashfreeCreatOrder(orederDetails)
      if (res.status===200) {
        cashfreeCheckoutRedairect(res.data)
      props.setAdressModalShow(false)
      }
    } catch (error) {
      console.log(error)
    }
    }
    
  };

  console.log(errors)


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({...errors,[name]: ""})
  };

  useEffect(()=>{
    const amount = props.products?.reduce((sum,item)=>{
      return sum + (item.quantity*item.price)
    },0)
    setTotleAmount(amount)
    console.log(amount)
  },[])
  return (
    <div className="d-flex flex-column gap-3">     
      <form className="d-flex flex-column w-100 p-0">
      <div className="w-100 d-flex flex-column align-items-start">
          <p className="mb-0  color-blue fw-900 px-2">Name</p>
          <Input
            type={"text"}
            placeholder={"Full Name"}
            value={form.name}
            name="name"
            onChange={handleChange}
            className={errors.name!=""?"err-border mb-0":""}
          />
          <p className="mb-0 text-danger f-14">{errors.name}</p>
        </div>
        <div className="w-100 d-flex flex-column align-items-start">
          <p className="mb-0  color-blue fw-900 px-2">Mobile</p>
          <Input
            type={"number"}
            placeholder={"Mobile No"}
            value={form.mobile}
            name="mobile"
            onChange={handleChange}
            className={errors.mobile!=""?"err-border mb-0":""}
          />
          <p className="mb-0 text-danger f-14">{errors.mobile}</p>
        </div>
        <div className="w-100 d-flex flex-column align-items-start">
          <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Adress</p>
            <Input
              type={"text"}
              placeholder={"Plot No,Society,Area"}
              value={form.address1}
              name={"address1"}
              onChange={handleChange}
              className={errors.address1?"err-border mb-0":""}
            />
            <p className="mb-0 text-danger f-14">{errors.address1}</p>
          </div>
          <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Land Mark</p>
            <Input
              type={"text"}
              placeholder={"Landmark"}
              value={form.landmark}
              name={"landmark"}
              onChange={handleChange}
              className={errors.landmark?"err-border mb-0":""}
            />
            <p className="mb-0 text-danger f-14">{errors.landmark}</p>
          </div>
          <div className="w-100 d-flex gap-3">
            <div className="w-100">
              <p className="mb-0  color-blue fw-900 px-2">City</p>
              <Input
                type={"text"}
                placeholder={"City"}
                value={form.city}
                name={"city"}
                onChange={handleChange}
                className={errors.city?"err-border mb-0":""}
              />
              <p className="mb-0 text-danger f-14">{errors.city}</p>
            </div>
            <div className="w-100">
              <p className="mb-0  color-blue fw-900 px-2">ZipCode</p>
              <Input
                type={"number"}
                placeholder={123456}
                value={form.zipcode}
                name={"zipcode"}
                onChange={handleChange}
                className={errors.zipcode?"err-border mb-0":""}
              />
              <p className="mb-0 text-danger f-14">{errors.zipcode}</p>
            </div>
          </div>
          <div className="w-100 d-flex gap-3">
            <div className="w-50">
              <p className="mb-0  color-blue fw-900 px-2">State</p>
              <Input
                type={"text"}
                placeholder={"State"}
                value={form.state}
                name={"state"}
                onChange={handleChange}
                className={errors.state?"err-border mb-0":""}
              />
              <p className="mb-0 text-danger f-14">{errors.state}</p>
            </div>
            <div className="w-50">
              <p className="mb-0  color-blue fw-900 px-2">Country</p>
              <Input
                type={"text"}
                placeholder={"Country"}
                value={form.country}
                name={"country"}
                onChange={handleChange}
                className={errors.country?"err-border mb-0":""}
              />
              <p className="mb-0 text-danger f-14">{errors.country}</p>
            </div>
          </div>
        </div>
        <div className="w-100">
          <hr className="mt-0" />
          <Button className="w-100" onClick={handleSubmite}>
            Pay Now ₹{totleAmount}
          </Button>
          <hr className="mb-0" />
        </div>
      </form>
    </div>
  );
};

export default AddressFill;
