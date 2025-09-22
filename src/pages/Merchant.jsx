'use client'
import React, { useEffect } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

import image111 from '../../src/images/user1.jpg';
import image22 from '../../src/images/user2.jpg';
import image33 from '../../src/images/user3.jpg';
import image44 from '../../src/images/user4.jpg';
import image55 from '../../src/images/user5.jpg';
import { useLocation } from 'react-router-dom';

const Merchant = ({ isAuthenticated, setRedirectTo }) => {

    const location = useLocation();
    useEffect(()=>{
        if (!isAuthenticated) {
            setRedirectTo(location.pathname);
        }
    },[isAuthenticated, location, setRedirectTo])

    const reviews = [
            {
            name:'Michael Johnson',
            description: 'Excellent platform for selling event tickets. Increased my sales by 300% in just two months.',
            review: 5,
            date: 'March 15, 2024',
            image : image111,
        },
        {
            name:'David Smith',
            description: 'Amazing customer support and easy listing process. Highly recommend for all business owners.',
            review: 5,
            date: 'February 28, 2024',
            image :image22,
        },
        {
            name:'James Wilson',
            description: 'Great exposure for my travel packages. The platform brings quality customers consistently.',
            review: 4,
            date: 'January 10, 2024',
            image :image33,
        },
        {
            name:'Robert Brown',
            description: 'User-friendly interface and secure payments. My restaurant bookings doubled within three weeks.',
            review: 5,
            date: 'December 5, 2023',
            image :image44,
        },
        {
            name:'Christopher Davis',
            description: 'Perfect for grocery delivery services. Easy management tools and reliable payment system works.',
            review: 4,
            date: 'November 20, 2023',
            image :image55,
        },
    ];
   
    const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,  // Auto-scroll
    autoplaySpeed: 2000,  // Time in milliseconds for auto-scroll
    arrows: false,  // Hides arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      
    ]
  };
 

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
        Why List With Us
        </h2>
        <h2 className="subtitle mb-3">
        Reach More Customers, Grow Your Business
        </h2>
        <p className="text mb-5">
        Join thousands of successful merchants who trust our platform to showcase their tickets and experiences. Whether you're hosting live shows, organizing travel packages, running shopping events, or offering unique experiences, we connect you with eager customers actively searching for what you offer. Our platform is designed to maximize your visibility and boost your sales.
        </p>
        
        <div className="benefits-section mb-5">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="benefit-card">
                        <h4 className="benefit-title">Wide Audience Reach</h4>
                        <p className="benefit-text">Access our growing community of ticket buyers and experience seekers across multiple categories.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="benefit-card">
                        <h4 className="benefit-title">Easy Listing Process</h4>
                        <p className="benefit-text">Simple, user-friendly tools to create and manage your listings with professional presentation.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="benefit-card">
                        <h4 className="benefit-title">Secure Transactions</h4>
                        <p className="benefit-text">Built-in payment processing and buyer protection that builds trust with your customers.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="subtitle text-center mb-4">
        Perfect For All Types of Events & Experiences
        </div>
        <div className="categories-wrapper mb-5">
        <div className="categories">
            {categories?.map((cat,index)=> <div className="category" key={index}>
              <img src={cat?.image} alt="Image"/>
              <div className="text">{cat?.name}</div>
            </div> )}
        </div>
        </div>
      <div className="subtitle text-center mb-4">
        What Our Merchants Say
        </div>
        <div className="reviews-wrapper">
            <Slider {...settings}>
                {reviews?.map((review, index) => (
                    <div className="review-card" key={index}>
                       <div className="image">
                         <img src={review?.image} alt="User" />
                       </div>
                        <div className="review-content">
                            <h5 className="reviewer-name">{review?.name}</h5>
                            <p className="review-date">{review?.date}</p>
                            <p className="review-text">{review?.description}</p>
                            <div className="review-rating">
                                {Array.from({ length: review?.review }, (_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>  
        </div>
        </div>
    </div>
  )
}

export default Merchant