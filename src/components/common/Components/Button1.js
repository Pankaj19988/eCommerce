import React from 'react'

const Button1 = (props) => {
  return (
    <button className={`custom-btn-5 btn-5 d-flex justify-content-center ${props.className}`} onClick={props.onClick}><span className='d-flex align-items-center gap-2'>{props.children}</span></button>
  )
}

export default Button1