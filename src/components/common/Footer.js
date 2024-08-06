import React from 'react'
import '../common/style/footer.css'
import { Link } from 'react-router-dom'
import logo from '../../nav-logo.png'
import ModelCenter from './Components/ModelCenter'
import { useState } from 'react'
import PointShow from './PointShow'

const Footer = () => {
const [modalShow,setModalShow]=useState(false)
const [title,setTitle]=useState("")
const [pointsName,setPointsName]=useState("")
const openModal = (title,pointsName)=>{
    setTitle(title)
    setPointsName(pointsName)
    setModalShow(true)

}
    return (
        <footer class="footer-section">
            <div class="copyright-area">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                            <div class="copyright-text">
                                <p className='color-fff'>Copyright &copy; 2023, All Right Reserved</p>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                            <div class="footer-menu">
                                <ul>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link onClick={()=>openModal("Term&Condition","terms")}>Terms&Condition</Link></li>
                                    <li><Link onClick={()=>openModal("CustomerPrivacy","privacy")}>CustomerPrivacy</Link></li>
                                    <li><Link onClick={()=>openModal("Return&Refund Policy","policy")}>Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModelCenter show={modalShow} onHide={()=>setModalShow(false)} title={title} ><PointShow name={pointsName}/></ModelCenter>
                
        </footer>
    )
}

export default Footer
