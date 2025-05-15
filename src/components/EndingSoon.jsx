
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaEye, FaHeart, FaLongArrowAltRight } from "react-icons/fa";
import { CiHeart,CiLocationOn } from "react-icons/ci";
import {TicketsApi} from '../services/Tickets'
import { TbCategory } from "react-icons/tb";
import { useCart } from '../contexts/CartContext';
import { IoCartOutline } from 'react-icons/io5';
import noImage from '../images/no-image.jpg';
import { ImageWithFallback } from '../utils/imageUtils';



const EndingSoon = () => {

  const { addToCart, addToWishlist, itemExistsInCart, removeFromCart, removeFromWishlist } = useCart();

  const [endingSoonTickets,setEndingSoonTickets]=useState([])
  const[loading,setLoading]=useState(false)
    //getTickets
    async function getTicketsList() {
      setLoading(true);
    
      try {
          const result = await TicketsApi.getTicketsPublic()
          if(result.status == 200) {
            setLoading(false); 
            console.log(result)
          //   setList(result?.data?.data?.data)
        
           
        //   setEndingSoonTickets(result?.data?.data?.expiry_soon_tickets?.data)
           
          setEndingSoonTickets(result?.data?.data?.newly_added_tickets?.data)
          
          
            
           }
          
          
          
      } catch (error) {
          console.log(error)
      }
       
    } 
  
    useEffect(()=>{
      getTicketsList()
    },[])
   
  return (
    <div className='ticket-listing-wrapper'>
      <ToastContainer />
       {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
        <div className="container">
        <div className="mb-4 d-flex align-items-center justify-content-between" >
              <span className="title-main"> Ending Soon</span> <Link className='see-all' to="/ending-soon">See all offers <FaLongArrowAltRight /> </Link>
            </div>
            <div className="row">
            {endingSoonTickets?.slice(0, 4)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <div className="listing-item">
                        <div className="image-wrapper">
                          <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                            <ImageWithFallback
                              src={ticket?.images[0]?.file_url}
                              fallbackSrc={noImage}
                              alt="image"
                              />
                            {/* <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill /> */}
                          </Link>
                           <div className="icons">
                          
                            <div className="icon">
                            <FaEye />
                            </div>
                            <div className="icon" onClick={() => addToWishlist(ticket.id, ticket?.prices[0]?.id)}>
                            <CiHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                            <TbCategory />    {ticket?.category}
                            </div>
                            <div className="title">
                            {ticket?.title}
                            </div>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon" onClick={() => addToCart(ticket.id, ticket?.prices[0]?.id, 1)}>
                                <IoCartOutline />
                            </div>
                            </div>
                          <div className="label">
                                                                                 <CiLocationOn />  {ticket?.location}
                                                                                </div>
                        </div>
                    </div>
                </div>)}
           
        </div>
        </div>
    </div>
  )
}

export default EndingSoon