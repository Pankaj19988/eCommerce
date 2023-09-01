import React, { useState } from "react";
import Input from "./Components/Input";
import { Button } from "react-bootstrap";

const AddressFill = (props) => {
  const [form, setForm] = useState({
    mobile: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
  });

  const handleSubmite = () => {
    console.log(form);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="d-flex flex-column gap-3">     
      <form className="d-flex flex-column gap-3 w-100">
        <div className="w-100 d-flex flex-column align-items-start">
          <p className="mb-0  color-blue fw-900 px-2">Mobile</p>
          <Input
            type={"number"}
            placeholder={7878439634}
            value={form.mobile}
            name="mobile"
            onChange={handleChange}
          />
        </div>
        <div className="w-100 d-flex flex-column align-items-start">
          <p className="mb-0  color-blue fw-900 px-2">E-Mail</p>
          <Input
            type={"email"}
            placeholder={"queenshopy@gmail.com"}
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="w-100 d-flex flex-column align-items-start gap-3">
          <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Adress-1</p>
            <Input
              type={"text"}
              placeholder={"Address-1"}
              value={form.adress}
              name={"address"}
              onChange={handleChange}
            />
          </div>
          <div className="w-100">
            <p className="mb-0  color-blue fw-900 px-2">Land Mark</p>
            <Input
              type={"text"}
              placeholder={"Address-2"}
              value={form.landmark}
              name={"landmark"}
              onChange={handleChange}
            />
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
              />
            </div>
            <div className="w-100">
              <p className="mb-0  color-blue fw-900 px-2">ZipCode</p>
              <Input
                type={"number"}
                placeholder={123456}
                value={form.zipcode}
                name={"zipcode"}
                onChange={handleChange}
              />
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
              />
            </div>
            <div className="w-50">
              <p className="mb-0  color-blue fw-900 px-2">Country</p>
              <Input
                type={"text"}
                placeholder={"India"}
                value={form.country}
                name={"country"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-100">
          <hr className="mt-0" />
          <Button className="w-100" onClick={handleSubmite}>
            Pay Now ₹270
          </Button>
          <hr className="mb-0" />
        </div>
      </form>
    </div>
  );
};

export default AddressFill;
