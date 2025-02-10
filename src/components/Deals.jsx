
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { TicketsApi } from '../services/Tickets';
import { MdShoppingCartCheckout } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiHeart,CiLocationOn } from "react-icons/ci";
import { FaHeart,FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { IoCartOutline } from 'react-icons/io5';

const Deals = () => {

    const { addToCart, addToWishlist, itemExistsInCart, itemExistsInWishlish, removeFromCart, removeFromWishlist } = useCart();
    const [deals,setDeals]=useState([])
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
          
             
            setDeals(result?.data?.data?.newly_added_deals?.data)
            
              
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
              <h2 className="title-main mb-4">Deals</h2>
            <div className="row">
            {deals?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <div className="listing-item">
                        <div className="image-wrapper">
                          <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                            <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
                          </Link>
                           <div className="icons">
                           
                            <div className="icon">
                            <FaEye />
                            </div>
                            <div className="icon" onClick={async () => (await itemExistsInWishlish(ticket.id)) ? removeFromWishlist(ticket.id) : addToWishlist(ticket)}>
                            <CiHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                              <div className="label">
                                  Health
                              </div>
                              <div className="title">
                                {ticket?.title}
                              </div>
                            </Link>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className={(async() => (await itemExistsInCart(ticket.id))) ? "cart-icon gb-danger" : "cart-icon"} onClick={async() => (await itemExistsInCart(ticket.id)) ? removeFromCart(ticket.id) : addToCart(ticket)}>
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

export default Deals