
import React from 'react'
import Slider from 'react-slick';

import Image1 from '../../src/images/screem1.jpg'
import Image2 from '../../src/images/screem.jpg'
import Image3 from '../../src/images/screem3.jpg'
import Image4 from '../../src/images/screem2.jpg'
import Image5 from '../../src/images/screem4.jpg'



import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaHeart,FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
const Cart = () => {
  const navigate = useNavigate()
  const moveCheckout = ()=> {
 
    navigate('/checkout')
  }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,  // Auto-scroll
        autoplaySpeed: 2000,  // Time in milliseconds for auto-scroll
        arrows: false,  // Hides arrows
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
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
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className="cart-wrapper-container">
        <div className="container">
          <div className="header-cart">
            <span className="title">
                My Shopping Cart
            </span>
            <Link to='/' className="shopping-link">
               Continue shopping <MdOutlineShoppingCartCheckout /> 
            </Link>
          </div>
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="custom-table  table-responsive">
              <table className="table">
  <thead>
    <tr>
      <th >Items</th>
      <th >Quantity</th>
      <th >Price</th>
      <th >Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div className="item-detail">
          <img src={Image1} alt="Image" />
          <p className="title">
            
            $145 for a Seven-Course Prix-Fixe Teppanyaki Dinner for Four 
        </p>
        </div>
        
      </td>
      <td>
        <div className="quantity">
        <button className="button min">
                -
            </button>
            <input type="text" className="input"  />
            <button className="button max">
                +
            </button>
        </div>
      </td>
      <td>
        <span className="text">
            $145
        </span>
      </td>
      <td>
        <span className="text">
            $145
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <div className="item-detail">
          <img src={Image2} alt="Image" />
          <p className="title">
          FLASH SALE! $149.60 for One Halloween Weekend Admission (a $56.44 Value)
        </p>
        </div>
        
      </td>
      <td>
        <div className="quantity">
        <button className="button min">
                -
            </button>
            <input type="text" className="input"  />
            <button className="button max">
                +
            </button>
        </div>
      </td>
      <td>
        <span className="text">
            $120
        </span>
      </td>
      <td>
        <span className="text">
            $120
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <div className="item-detail">
          <img src={Image3} alt="Image" />
          <p className="title">
          FLASH SALE! $149.60 for One Halloween Weekend Admission (a $56.44 Value)
        </p>
        </div>
        
      </td>
      <td>
        <div className="quantity">
        <button className="button min">
                -
            </button>
            <input type="text" className="input"  />
            <button className="button max">
                +
            </button>
        </div>
      </td>
      <td>
        <span className="text">
            $100
        </span>
      </td>
      <td>
        <span className="text">
            $100
        </span>
      </td>
    </tr>
  </tbody>
</table>
              </div>
              <p className="title-med">
              Add other Items to your cart
              </p>
              <div className='ticket-listing-wrapper'>
              <Slider {...settings}>
                
                <div className="listing-item">
                    <div className="image-wrapper">
                       <img alt="Image"  src={Image4}  />
                       <div className="icons">
                        <div className="icon">
                        <FaEye />
                        </div>
                        <div className="icon">
                        <CiHeart />
                        </div>
                       </div>
                    </div>
                    <div className="content">
                        <div className="label"> Beauty & Wellness</div>
                        <div className="title">
                            
                           
        Up to 70% Off Entry in Scary world tour             
                        </div>
                        <div className="price-section">
                            <div className="price">$30<span>$50</span></div>
                            <div className="cart-icon">
                            <IoCartOutline />
                        </div>
                        </div>
                      
                    </div>
                </div>
            
            
                <div className="listing-item">
                    <div className="image-wrapper">
                       <img alt="Image"  src={Image1}  />
                       <div className="icons">
                        <div className="icon">
                        <FaEye />
                        </div>
                        <div className="icon">
                        <CiHeart />
                        </div>
                       </div>
                    </div>
                    <div className="content">
                        <div className="label"> Activities & Events</div>
                        <div className="title">
                            
                           
        Up to 32% Off Admission and Unlimited Rides at BooFest in Vaughan                
                        </div>
                        <div className="price-section">
                            <div className="price">$230<span>$440</span></div>
                            <div className="cart-icon">
                            <IoCartOutline />
                        </div>
                        </div>
                      
                    </div>
                </div>
            
            
                <div className="listing-item">
                    <div className="image-wrapper">
                       <img alt="Image"  src={Image3} />
                       <div className="icons">
                        <div className="icon">
                        <FaEye />
                        </div>
                        <div className="icon">
                        <CiHeart />
                        </div>
                       </div>
                    </div>
                    <div className="content">
                        <div className="label">
                        Activities & Events
                        </div>
                        <Link to={`/tickets/${1}`} className="title">
                            
                        FLASH SALE! Up to 35% Off Admission to SCREEMERS at Assembly Park 
                        </Link>
                        <div className="price-section">
                            <div className="price">$110 <span>$300</span></div>
                            <div className="cart-icon">
                            <IoCartOutline />
                        </div>
                        </div>
                      
                    </div>
                </div>
            
            
                <div className="listing-item">
                    <div className="image-wrapper">
                       <img alt="Image"  src={Image4} />
                       <div className="icons">
                        <div className="icon">
                        <FaEye />
                        </div>
                        <div className="icon">
                        <CiHeart />
                        </div>
                       </div>
                    </div>
                    <div className="content">
                        <div className="label">
                          Activities
                        </div>
                        <div className="title">
                           
       
                        $40 Off on Tour to Dark world             
                        </div>
                        <div className="price-section">
                            <div className="price">$160 <span>$190</span></div>
                            <div className="cart-icon">
                            <IoCartOutline />
                        </div>
                        </div>
                      
                    </div>
                </div>
            
            
                <div className="listing-item">
                    <div className="image-wrapper">
                       <img alt="Image"  src={Image5} />
                       <div className="icons">
                        <div className="icon">
                        <FaEye />
                        </div>
                        <div className="icon">
                        <CiHeart />
                        </div>
                       </div>
                    </div>
                    <div className="content">
                        <div className="label">
                            MMD Product
                        </div>
                        <div className="title">
                            
        Lorem ispum Scary worl title 70% Off         
                        </div>
                        <div className="price-section">
                            <div className="price">$90 <span>$130</span></div>
                            <div className="cart-icon">
                            <IoCartOutline />
                        </div>
                        </div>
                      
                    </div>
                </div>
        
            
        </Slider>
        </div>
            </div>
            <div className="col-12 col-md-4">
                 <div className="cart-box">
                   <p className="title">
                    Cart Summary
                   </p>
                   <div className="item">
                    <span className="label">
                        Sub total:
                    </span>
                    <span className="value">
                        $345
                    </span>
                   </div>
                   <div className="item">
                    <span className="label">
                    Promo Code:
                    </span>
                    <span className="value">
                        $0
                    </span>
                   </div>
                   <div className="item">
                    <span className="label">
                    Service Fee:
                    </span>
                    <span className="value">
                        $15
                    </span>
                   </div>
                   <hr className="hr my-4" />
                   <p className="title mb-4">
                   Your Total: $360
                   </p>
                   <button className="button" onClick={moveCheckout}>
                    Proceed to Chechout
                   </button>
                 </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default Cart