import React, { useEffect, useState } from 'react'
import Product4Grid from '../common/Components/Product4Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getAllProduct } from '../common/service/api'



const AllGrid4 = (props) => {

  const [item1,setItem1] = useState([])
  const [item2,setItem2] = useState([])
  const [item3,setItem3] = useState([])

  
  const heading1 = "Up to 94% off | Click And Shop Now"
  const heading2 = "Top Best Review Product"
  const heading3 = "Up to ₹30 Deal"  

  const getData = async() =>{
    try {
     const res1 = await getAllProduct(1,4,"94%OFF");
     const res2 = await getAllProduct(1,4,"BESTREVIEW");
     const res3 = await getAllProduct(1,4,"","LT30");
     setItem1(res1.data)
     setItem2(res2.data)
     setItem3(res3.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData();
  },[])
 
   


  return (
    <div className='grid4 p-3 justify-content-center'>
      <Link className='text-decoration-none text-dark hover-shadow-10' to={"/list/upto94"} onClick={()=>props.setProgress(100)}><Product4Grid items={item1} gridHeading={heading1}/></Link>
      <Link className='text-decoration-none text-dark hover-shadow-10' to={"/list/bestReview"}><Product4Grid items={item2} gridHeading={heading2}/></Link>
      <Link className='text-decoration-none text-dark hover-shadow-10' to={"/list/uptoRS30"}><Product4Grid items={item3} gridHeading={heading3}/></Link>
      {/* <Link className='text-decoration-none text-dark' to={"/list"}><Product4Grid api={item4} gridHeading={heading4}/></Link> */}
      <div className='border-1px border-radius-5 box-shadow-1 cursor-pointer'>
        <h1>Advertise</h1>
        <img/>
      </div>
    </div>
  )
}

export default AllGrid4
