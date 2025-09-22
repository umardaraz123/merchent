'use client'
import React, { useEffect } from 'react'

import image1 from '../../src/images/img1.jpg';
import image2 from '../../src/images/img2.jpg';
import image3 from '../../src/images/img3.jpg';
import image4 from '../../src/images/img4.jpg';
import image5 from '../../src/images/img5.jpg';
import image6 from '../../src/images/img6.jpg';
import image7 from '../../src/images/img7.jpg';
import image8 from '../../src/images/img8.jpg';
import image9 from '../../src/images/img9.jpg';
import image10 from '../../src/images/img10.jpg';
import image11 from '../../src/images/img11.jpg';
import image12 from '../../src/images/img12.jpg';
import aimImage from '../../src/images/aim.png';
import { useLocation } from 'react-router-dom';
const AboutUs = ({ isAuthenticated, setRedirectTo }) => {
 
    const location = useLocation();
    useEffect(()=>{
        if (!isAuthenticated) {
            setRedirectTo(location.pathname);
        }
    },[isAuthenticated, location, setRedirectTo])

        const categories = [
            {
            name:'Activities & Events',
            link:'beauty-and-wellness',
            image : image1,
        },
        {
            name:'Beauty & Wellness',
            link:'beauty-and-wellness',
            image :image2,
        },
        {
            name:'Family',
            link:'beauty-and-wellness',
            image :image3,
        },
        {
            name:'Restaurants',
            link:'beauty-and-wellness',
            image :image4,
        },
        {
            name:'Groceries',
            link:'beauty-and-wellness',
            image :image5,
        },
        {
            name:'Home & Autos',
            link:'beauty-and-wellness',
            image :image6,
        },
        {
            name:'Shopping',
            link:'beauty-and-wellness',
            image :image7,
        },
        {
            name:'Niagara',
            link:'beauty-and-wellness',
            image :image8,
        },
        {
            name:'Travel',
            link:'beauty-and-wellness',
            image :image9,
        },
        {
            name:'Things To Do',
            link:'beauty-and-wellness',
            image :image10,
        },
        {
            name:'Popular',
            link:'beauty-and-wellness',
            image :image11,
        },
        {
            name:'Home Services',
            link:'beauty-and-wellness',
            image :image12,
        },
       
    
    ]
   
    
    
  return (
    <div className='about-us-wrapper'>
        <div className="container">
        <div className="max-1000">
        <h2 className="title mb-3">
        About Us
        </h2>
        <h2 className="subtitle mb-3">
        What is MMDEALS?
        </h2>
        <p className="text mb-5">
        MMDEALS is an online deal community where Canadians and their families can find great savings on things they need and love. MMDEALS connects you with quality products and services at great discounts from national brands you know and love and notable businesses found right in your neighbourhood. We are committed to helping you try new things, discover new passions, and find new ways to save every day.
        </p>
        <div className="subtitle text-center mb-4">
        We Have All Kinds of Deals
        </div>
        <div className="categories-wrapper mb-5">
        <div className="categories">
            {categories?.map((cat,index)=> <div className="category" key={index}>
              <img src={cat?.image} alt="Image"/>
              <div className="text">{cat?.name}</div>
            </div> )}
        </div>
        </div>
       <div className="our-mission py-5">
       <div className="row align-items-center">
            <div className="col-12 col-md-7">
                <p className="subtitle mb-2">Our Mission</p>
                <p className="text">
                To provide deal-seeking Canadians and their families with discounts on high quality products and services from reputable merchants. MMDEALS strives to be the most respected deal company in the industry and aims to accomplish this through superior customer service, careful selection of partners, a unique combination of local businesses and large brand names, and a friendly user experience for both our customers and business partners.
                </p>
                
            </div>
            <div className="col-12 col-md-5">
            <div className="image-wrapper">
                <img src={aimImage} alt="Image" />
            </div>
            </div>
        </div>
       </div>
       <div className="py-5">
        <h2 className="subtitle mb-4">
        The MMDEALS Family

        </h2>
        <p className="text mb-3">
        At MMDEALS we are savvy shoppers with jam-packed social calendars. Just like you, we love to get a great deal and share the excitement of a great deal with friends and family. That’s why we strive to help you discover new ways to save every day and inspire you to try new things and find new passions.

        </p>
        <p className="text mb-3">
        We fill our time seeking out fun and interesting products and services available across Canada and delivering them to you at great prices and excellent value. This way you can spend your time enjoying more of the things you love with those you care about. That’s the magic of a great deal.
        </p>
        <p className="text mb-3">
        MMDEALS welcomes and encourages applications from people with disabilities. Accommodations are available on request for candidates taking part in all aspects of the selection process.
        </p>
       </div>
       <div className="py-5">
        <p className="subtitle mb-4">
        Statement of Commitment to Accessibility
        </p>
        <p className="text mb-3">
        At MMDEALS, we are committed to ensuring accessibility for persons with disabilities by identifying, removing and preventing barriers to promote the rights of all persons and to build and create an inclusive and accessible working environment. MMDEALS supports the intent of the AODA and its goal of achieving accessibility for Ontarians with disabilities with respect to customer service, information communication and employment.
        </p>
       </div>
       <div className="py-5">
        <p className="subtitle mb-4">
        Join the MMDEALS Family
        </p>
        <p className="text mb-3">
        We are always looking for energetic and intelligent people who are up for a challenge.
        </p>
       </div>
        </div>
        </div>
    </div>
  )
}

export default AboutUs