import React, { useEffect, useState } from 'react'
import Grid4upto from '../common/Components/Grid4upto'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getAllProduct } from '../common/service/api'

const Product3Grid = () => {
  const [item1,setItem1] = useState([])
  const [item2,setItem2] = useState([])



  const getData = async() =>{
    try {
     const res1 = await getAllProduct(1,4,'MAN-NIGHTDRESS');
     const res2 = await getAllProduct(1,4,'GIRL-NIGHTDRESS');
     setItem1(res1.data)
     setItem2(res2.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData();
  },[])

  const heading1 = "Man Night Wear Collection"
  const heading2 = "Woman Night Wear Collection"
  
  return (
    <div className='grid3 p-2rem media-grid1 justify-content-center'>
      <Link className='text-decoration-none hover-shadow-10' to='/list/man_nightwear'><Grid4upto item={item1} heading={heading1}/></Link>
      {/* <Grid4upto item={item2} heading={heading2}/> */}
      <div className="border-1px border-radius-5 box-shadow-1 cursor-pointer">
        <h1>Advertise</h1>
        <img/>
      </div>
      <Link className='text-decoration-none hover-shadow-10' to='/list/woman_nightwear'><Grid4upto item={item2} heading={heading2}/></Link>
    </div>
  )
}

export default Product3Grid
