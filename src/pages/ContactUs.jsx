'use client'
import React, { useEffect } from 'react'

import { IoChatbubblesOutline } from "react-icons/io5";
import { BiMapPin } from "react-icons/bi";
import { MdWifiCalling1 } from "react-icons/md";
import { useLocation } from 'react-router-dom';
const ContactUs = ({ isAuthenticated, setRedirectTo }) => {
 

    const location = useLocation();
    useEffect(()=>{
        if (!isAuthenticated) {
        setRedirectTo(location.pathname);
        }
    },[isAuthenticated, location, setRedirectTo])
   
    
    
  return (
    <div className='contact-us-wrapper'>
        <div className="container">
      <div className="max-1200 inner">
        <div className="row">
            <div className="col-12 col-md-5">
           <div className="left">
           <div className="flex-item">
                <div className="icon">
                    <IoChatbubblesOutline />
                </div>
                <div className="data">
                    <p className="title">Chat to us</p>
                    <p className="subtitle">Our friendly team is here to help.</p>
                    <p className="value">
                        hi@mmdeals.com
                    </p>
                </div>
            </div>
            <div className="flex-item">
                <div className="icon">
                <BiMapPin />
                </div>
                <div className="data">
                    <p className="title">Visit us</p>
                    <p className="subtitle">Come say hello at our office HQ.</p>
                    <p className="value">
                        ajex,Toronto,Canada
                    </p>
                </div>
            </div>
            <div className="flex-item">
                <div className="icon">
                    <MdWifiCalling1 />
                </div>
                <div className="data">
                    <p className="title">Call us</p>
                    <p className="subtitle">Mon-Friday From 8:00AM to 5:00PM</p>
                    <p className="value">
                        +92304884848
                    </p>
                </div>
            </div>
           </div>
            </div>
            <div className="col-12 col-md-7">
                <div className="right">
                    <div className="title mb-4">
                    Get in Touch | MMDEALS - Friendly and inviting, suitable if the platform wants a casual tone
                    </div>
                    <div className="input">
                        <label htmlFor="">Your Name</label>
                        <input type="text" placeholder='Name' />
                    </div>
                    <div className="input">
                        <label htmlFor="">Your Email</label>
                        <input type="text" placeholder='user@gmail.com' />
                    </div>
                    <div className="input">
                        <label htmlFor="">Your Phone</label>
                        <input type="text" placeholder='+92303837773' />
                    </div>
                    <div className="input">
                        <label htmlFor="">Your Message</label>
                        <textarea name="" rows={4} placeholder='Your Message here' id=""></textarea>
                    </div>
                    <button className="button">Submit</button>
                </div>
            </div>
        </div>
      </div>
        </div>
    </div>
  )
}

export default ContactUs