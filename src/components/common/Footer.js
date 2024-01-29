import React from 'react'
import '../common/style/footer.css'
import { Link } from 'react-router-dom'
import logo from '../../nav-logo.png'

const Footer = () => {

  return (
    <footer class="footer-section">
    {/* <div class="container">
        <div class="footer-cta pt-5 ">
            <div class="row">
                <div class="col-xl-4 col-md-4 mb-30">
                    <div class="single-cta">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="cta-text">
                            <h4>Find us</h4>
                            <span>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016 </span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 mb-30">
                    <div class="single-cta">
                        <i class="fas fa-phone"></i>
                        <div class="cta-text">
                            <h4>Call us</h4>
                            <span>+91 1234567890</span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-4 mb-30">
                    <div class="single-cta">
                        <i class="far fa-envelope-open"></i>
                        <div class="cta-text">
                            <h4>Mail us</h4>
                            <span>contact@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-content">
            <div class="row">
                <div class="col-xl-4 col-lg-4 mb-50">
                    <div class="footer-widget">
                        <div class="footer-logo">
                            <Link to="index.html"><img src={logo} class="img-fluid" alt="logo" /></Link>
                        </div>
                        <div class="footer-text">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                    <div class="footer-widget">
                        <div class="footer-widget-heading">
                            <h3>Useful Links</h3>
                        </div>
                        <ul>
                            <li><Link to={"/"}>Our Team</Link></li>
                            <li><Link to={"/"}>About Us</Link></li>
                            <li><Link to={"/"}>Our Gallery</Link></li>
                            <li><Link to={"/"}>Selection Process</Link></li>
                            <li><Link to={"/"}>FAQ</Link></li>
                            <li><Link to={"/"}>Sponsorship</Link></li>
                            <li><Link to={"/"}>Our Policies</Link></li>
                            <li><Link to={"/"}>Our Team</Link></li>
                            <li><Link to={"/"}>Contact us</Link></li>
                        </ul>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                    <div class="footer-widget">
                        <div class="footer-widget-heading">
                            <h3>Subscribe</h3>
                        </div>
                        <div class="footer-text mb-25">
                            <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                        </div>
                        <div class="subscribe-form">
                            <form action={"/"}>
                                <input type="text" placeholder="Email Address" />
                                <button><i class="fab fa-telegram-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
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
                            <li><Link to={"/"}>Terms</Link></li>
                            <li><Link to={"/"}>Privacy</Link></li>
                            <li><Link to={"/"}>Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer
