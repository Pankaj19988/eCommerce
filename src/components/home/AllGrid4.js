import React, { useEffect, useState } from 'react'
import Product4Grid from '../common/Components/Product4Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'



const AllGrid4 = () => {

  const [allData,setAllData] = useState([])

  // const [item1,setItem1] = useState ([])
  // const [item2,setItem2] = useState ([])

  const getData = async() =>{
   await axios.get('http://localhost:8080/api/product/all')
    .then((response)=>{
      setAllData(response.data)
    })
  }

  useEffect(()=>{
    getData();
  },[])
 
  const item1 = allData.filter((item)=>item.price*100/item.mrp<6)
  const heading1 = "Up to 94% off | Click And Shop Now"

  const item2 = allData.sort((a, b) => b.totleRatting - a.totleRatting);
  const heading2 = "Top Best Review Product"

  const item3 = allData.filter((item)=>item.price<30)
  const heading3 = "Up to ₹30 Deal"

  const item4 = "https://fakestoreapi.com/products"
  const heading4 = "Best Selling Product"

  return (
    <div className='grid4 p-3 justify-content-center'>
      <Link className='text-decoration-none text-dark' to={"/list/upto94"}><Product4Grid items={item1} gridHeading={heading1}/></Link>
      <Link className='text-decoration-none text-dark' to={"/list/bestReview"}><Product4Grid items={item2} gridHeading={heading2}/></Link>
      <Link className='text-decoration-none text-dark' to={"/list/uptoRS30"}><Product4Grid items={item3} gridHeading={heading3}/></Link>
      {/* <Link className='text-decoration-none text-dark' to={"/list"}><Product4Grid api={item4} gridHeading={heading4}/></Link> */}
      <div className='border-1px border-radius-5 box-shadow-1 cursor-pointer'>
        <h1>Advertise</h1>
        <img/>
      </div>
    </div>
  )
}

export default AllGrid4
