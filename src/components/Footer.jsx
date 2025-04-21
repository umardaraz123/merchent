import React from 'react'

import Logo from '../../src/images/logo.png'
import Appimg from '../../src/images/app.jpg'
import Googleimg from '../../src/images/google.jpg'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container">
            <div className="inner">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mb-3">
               <Link to='/'>
               <img className='logo' src={Logo} alt="Image" /></Link>
                
                <p className="title">
                Contact
                </p>
                <p className="item">
               <span> Address:</span> 1389 Brock Road, Uxbridge, Ontario, L0C1A0
                </p>
                <p className="item">
                <span>Phone:</span> +01 2222 365 /(+91) 01 2345 6789
                </p>
                <p className="item">
                <span>Hours:</span> 10:00 - 18:00, Mon - Sat
                </p>
            </div>
            <div className="col-12 col-md-6 col-lg-2 mb-3">
                <p className="title mb-3">
                About
                </p>
                <Link to='/about'>About us</Link>
                <Link to='/advertise'>Advertise with us</Link>
                <Link to='/'>Delivery Information</Link>
                <Link to='/privacypolicy'>Privacy Policy</Link>
                <Link to='/termsandconditions'>Terms & Conditions</Link>
                <Link to='/contact-us'>Contact Us</Link>
                </div>
                <div className="col-12 col-md-6 col-lg-2 mb-3">
                <p className="title mb-3">
                My Account
                </p>
                <Link to='/login'>Sign in</Link>
                <Link to='/register'>Register</Link>
                <Link to='/cart'>View cart</Link>
                
                <Link to='/blog'>Blog</Link>
              
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-3">
                <p className="title mb-3">
                Install App
                </p>
                <p className="text">From App Store or Google Play</p>
                <div className="app-images">
                   <a className='img'>
                    <img alt="Image"  src={Appimg}/>
                   </a>
                   <a className='img'>
                    <img alt="Image"  src={Googleimg}/>
                   </a>
                </div>
                <p className="title mb-2">
                Find us on:
                </p>
                <div className="social-links">
                <a to="" className="link-item">
                <FaFacebookF /> <span>Facebook</span>
                </a>
                <a to="" className="link-item">
                <IoLogoInstagram /> <span>Instagram</span>
                </a>
                <a to="" className="link-item">
                <IoLogoYoutube /> <span>You tube</span>
                </a>
            </div>
              
                </div>

            </div>
            </div>
            <div className="copy">
            © 2024 Mega Merchand Deals. All rights reserved
            </div>
        </div>
    </div>
  )
}

export default Footer