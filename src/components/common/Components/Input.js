import React from "react";

const Input = (props) => {
  return (
    <div className="w-100">
      <input
        type={props.type}
        className={`${props.className} margin-b-3 fw-600 under-Line-05 border-radius-15px border-color-transparent p-2 w-100 bg-ofwhite`}
        placeholder={props.placeholder}
        disabled={props.disabled ? props.disabled : false}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        maxLength={props.maxLength}
      />
    </div>
  );
};

export default Input;
