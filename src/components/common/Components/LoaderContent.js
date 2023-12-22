import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const LoaderContent = ({visible}) => {
  return (
    <div><ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#2874f0" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent:"center",alignItems: 'center'}}
    visible={visible}
     /></div>
     
  )
}

export default LoaderContent