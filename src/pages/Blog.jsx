"use client"
import React from 'react'
import img1 from '../../src/images/hall.jpg'
import img2 from '../../src/images/img9.jpg'
import img3 from '../../src/images/img2.jpg'
import img4 from '../../src/images/img3.jpg'
import img5 from '../../src/images/img4.jpg'
import img6 from '../../src/images/img5.jpg'
import img7 from '../../src/images/img6.jpg'
import img8 from '../../src/images/img7.jpg'
import img9 from '../../src/images/img8.jpg'
import { Link } from 'react-router-dom'
import { SiTildapublishing } from "react-icons/si";
import { IoTimeOutline } from "react-icons/io5";
const Blog = () => {
  return (
    <div className='blog-wrapper'>
        <div className="blog-header">
          <div className="data">
            <div className="inner">
                <p className="title">
                    Hey we are MMDeals. See our thoughts,stories and ideas.
                </p>
            </div>
          </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img1} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Spooktacular DIY Decor Ideas for the Perfect Halloween Vibe</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 12 March 2024</p>
                        <p className="date"><IoTimeOutline /> 5 minutes read</p>
                        </div>
                        <p className="text">
                        Start with easy DIY decorations, like eerie candle holders made from mason jars, spooky window silhouettes, and hanging ghosts. Include a mix of budget-friendly, kid-friendly, ..
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img2} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Wanderlust on a Budget: Affordable Destinations for Every Traveler</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 22 May 2024</p>
                        <p className="date"><IoTimeOutline /> 5 minutes read</p>
                        </div>
                        <p className="text">
                        iscover stunning places around the world that won’t break the bank. From hidden gems in Southeast Asia to affordable European cities, we’ve gathered top destinations where you can experience rich culture,...
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img3} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Skincare 101: Building the Perfect Routine for Every Skin Type</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 11 Jun 2024</p>
                        <p className="date"><IoTimeOutline /> 8 minutes read</p>
                        </div>
                        <p className="text">
                            Achieve glowing, healthy skin with a routine tailored just for you! From dry and sensitive skin to oily and combination, we break down the steps and product ....
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img4} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Top 10 Must-Visit Destinations for Adventure Lovers</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 23 Jun 2024</p>
                        <p className="date"><IoTimeOutline /> 12 minutes read</p>
                        </div>
                        <p className="text">
                        Calling all thrill-seekers! We’ve rounded up the best destinations for adventure travel, including breathtaking hikes, extreme sports, and unforgettable outdoor experiences. Ready for your next adrenaline-fueled journey? This list has..
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img5} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Grocery Shopping on a Budget: Save More, Spend Less</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 29 April 2024</p>
                        <p className="date"><IoTimeOutline /> 7 minutes read</p>
                        </div>
                        <p className="text">
                        Want to cut down on grocery bills without sacrificing quality? Discover tips and tricks to help you shop smart, maximize savings, and still bring home fresh, healthy ingredients....
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img6} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Weekly Meal Prep Guide: Grocery Shopping for Stress-Free Dinners</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 07 Auguts 2024</p>
                        <p className="date"><IoTimeOutline /> 11 minutes read</p>
                        </div>
                        <p className="text">
                        Take the stress out of weeknight cooking! This guide shows you how to shop for and prepare meals in advance, with grocery lists, storage tips, and easy recipes to make dinnertime a breeze. Spend less time in the kitchen and ....
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
               
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img8} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">The Ultimate Guide to Stress-Free Grocery Shopping</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 28 Auguts 2024</p>
                        <p className="date"><IoTimeOutline /> 16 minutes read</p>
                        </div>
                        <p className="text">
                        Tired of the chaos at the grocery store? This guide is packed with tips on list-making, avoiding impulse buys, and choosing the . Simplify your grocery trips with these easy-to-follow steps for a hassle-free experience ever.....
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                <Link to='/blog-detail/1' className="blog-item">
                     <div className="image">
                        <img src={img9} alt='blog' />
                     </div>
                     <div className="content">
                        <h2 className="title">Niagara Falls Adventure Guide: Must-See Attractions and Hidden Gems</h2>
                        <div className="flex-item">
                        <p className="date"><SiTildapublishing /> 17 September 2024</p>
                        <p className="date"><IoTimeOutline /> 16 minutes read</p>
                        </div>
                        <p className="text">
                        rom the iconic waterfalls to hidden trails, uncover the best that Niagara Falls has to offer! This guide covers top attractions, local dining spots, and secret scenic views to help you make the most of your trip to this natural 
                        </p>
                        
                     </div>
                    
                    </Link>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default Blog