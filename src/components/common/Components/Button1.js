import React from 'react'

const Button1 = (props) => {
  return (
    <button className={`custom-btn-5 btn-5 ${props.className}`} onClick={props.onClick}><span>{props.children}</span></button>
  )
}

export default Button1