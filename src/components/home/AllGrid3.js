import React, { useEffect, useState } from 'react'
import Grid4upto from '../common/Components/Grid4upto'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product3Grid = () => {
  const [allData,setAllData] = useState([])

  const api = 'http://localhost:8080/api/product/all'

  const getData = async() =>{
    await axios.get(api)
    .then((response)=>{
      const data = response.data
      setAllData(data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getData();
  },[])

  const item1 = allData.filter((item)=>item.category=='MAN-NIGHTDRESS')
  const heading1 = "Man Night Wear Collection"
  const item2 = allData.filter((item)=>item.category=='MAN-NIGHTDRESS')
  const heading2 = "Recommended deals for you"
  const item3 = allData.filter((item)=>item.category=='GIRL-NIGHTDRESS')
  const heading3 = "Woman Night Wear Collection"
  
  return (
    <div className='grid3 p-3 media-grid1 justify-content-center'>
      <Link className='text-decoration-none hover-shadow-10' to='/list/man_nightwear'><Grid4upto item={item1} heading={heading1}/></Link>
      {/* <Grid4upto item={item2} heading={heading2}/> */}
      <div className="border-1px border-radius-5 box-shadow-1 cursor-pointer">
        <h1>Advertise</h1>
        <img/>
      </div>
      <Link className='text-decoration-none hover-shadow-10' to='/list/woman_nightwear'><Grid4upto item={item3} heading={heading3}/></Link>
    </div>
  )
}

export default Product3Grid
