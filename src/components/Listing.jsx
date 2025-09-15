
import React, { useState,useEffect } from 'react'
import { MdShoppingCartCheckout } from "react-icons/md";
import {TicketsApi} from '../services/Tickets'
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TbCategory } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";

import 'react-toastify/dist/ReactToastify.css';
import { CiHeart } from "react-icons/ci";
import { FaHeart,FaEye } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';

import noImage from '../images/no-image.jpg';
import { ImageWithFallback } from '../utils/imageUtils';


const Listing = ({ search, location }) => {
    const [selected,setSelected]=useState('trending')
    const[loading,setLoading]=useState(false)
    const [trendings,setTrendings]=useState([])
    const [newlyAddedTickets,setNewlyAddedTickets]=useState([])
    const [deals,setDeals]=useState([])
    const [searchParams] = useSearchParams();
    const searchQuery = search || searchParams.get('search') || '';
    const locationQuery = location || searchParams.get('location') || '';

    const { addToCart, addToWishlist, itemExistsInCart, removeFromCart, removeFromWishlist } = useCart();

    
  //getTickets
  async function getTicketsList(search = '', location = '') {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getTicketsPublic(search, location)
        if(result.status == 200) {
          setLoading(false); 
          console.log(result)
        //   setList(result?.data?.data?.data)
        setTrendings(result?.data?.data?.trending_tickets?.data)
         
        setDeals(result?.data?.data?.newly_added_deals?.data)
        setNewlyAddedTickets(result?.data?.data?.newly_added_tickets?.data)
          
         }
        
        
        
    } catch (error) {
        console.log(error)
    }
     
  } 

  const handleCartClick = (ticketId, priceId, isInCart) => {
    if (isInCart) {
      removeFromCart(ticketId);
    //   toast.info('Removed from cart');
    } else {
      addToCart(ticketId, priceId, 1);
    //   toast.success('Added to cart');
    }
  };

  useEffect(()=>{
    getTicketsList(searchQuery, locationQuery)
  },[searchQuery, locationQuery, search, location])
  return (
    <div className='ticket-listing-wrapper'>
             <ToastContainer />
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
       
        <div className="container">
        {/* <div className="filters-button">
            <button className={`button ${selected == 'trending' ? 'active':''}`} onClick={()=>setSelected('trending')}>
                Trending
            </button>
             <button className={`button ${selected == 'popular' ? 'active':''}`} onClick={()=>setSelected('popular')}>
                Popular
            </button>
             <button className={`button ${selected == 'newly' ? 'active':''}`} onClick={()=>setSelected('newly')}>
                Newly Added
            </button>
        </div> */}
           <div className="mb-4 d-flex align-items-center justify-content-between"><span className="title-main"> Trending </span>  <Link to={`/trendings`} className="see-all">See All   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path></svg> </Link> </div>
             <div className="row">
                {trendings?.slice(0, 3)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                <div className="listing-item">
                        <div className="image-wrapper">
                        <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                            <ImageWithFallback
                                src={ticket?.images[0]?.file_url}
                                fallbackSrc={noImage}
                                alt="image"
                                />
                        </Link>
                           <div className="icons">
                            
                            
                            <div className="icon" onClick={() => addToWishlist(ticket.id, ticket?.prices[0]?.id)}>
                                <CiHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                             <TbCategory />  {ticket?.category}
                            </div>
                            <Link to={`/tickets/${ticket?.guid}`} className="title">
                            {ticket?.title}
                            </Link>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>

                                <div className="cart-icon" onClick={() => handleCartClick(ticket.id, ticket?.prices[0]?.id, itemExistsInCart(ticket.id, ticket?.prices[0]?.id))}>
                                    {itemExistsInCart(ticket.id, ticket?.prices[0]?.id) ? (
                                    <IoCartSharp /> // Show remove icon if in cart
                                    ) : (
                                    <IoCartOutline /> // Show add icon if not in cart
                                    )}
                                </div>
                            </div>
                            <div className="label">
                             <CiLocationOn />  {ticket?.location}
                            </div>
                        </div>
                    </div>
                </div>)}
               
             
               
            </div>
            <div className="d-flex justify-content-center mb-3">
           
            </div>
           
           <div className="mb-4 d-flex align-items-center justify-content-between"><span className="title-main"> Popular </span>  <Link to={`/new-deals`} className="see-all">See All   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path></svg> </Link> </div>
            <div className="row">
            {deals?.slice(0, 3)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
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
                            
                            
                            <div className="icon" onClick={() => addToWishlist(ticket.id, ticket?.prices[0]?.id)}>
                            <CiHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                            <TbCategory />  {ticket?.category}
                            </div>
                             <Link to={`/tickets/${ticket?.guid}`} className="title">
                            {ticket?.title}
                            </Link>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon" onClick={() => handleCartClick(ticket.id, ticket?.prices[0]?.id, itemExistsInCart(ticket.id, ticket?.prices[0]?.id))}>
                                    {itemExistsInCart(ticket.id, ticket?.prices[0]?.id) ? (
                                    <IoCartSharp /> // Show remove icon if in cart
                                    ) : (
                                    <IoCartOutline /> // Show add icon if not in cart
                                    )}
                                </div>
                            </div>
                               <div className="label">
                                                                                                             <CiLocationOn />  {ticket?.location}
                                                                                                            </div>
                          
                        </div>
                    </div>
                </div>)}
                </div>
              
       <div className="mb-4 d-flex align-items-center justify-content-between"><span className="title-main"> Newly Added </span>  <Link to={`/new-deals`} className="see-all">See All   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path></svg> </Link> </div>
          
            <div className="row">
             
             {newlyAddedTickets?.slice(0, 3)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
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
                            
                            
                            <div className="icon" onClick={() => addToWishlist(ticket.id, ticket?.prices[0]?.id)}>
                            <CiHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                            <TbCategory />   {ticket?.category}
                            </div>
                            <Link to={`/tickets/${ticket?.guid}`} className="title">
                            {ticket?.title}
                            </Link>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon" onClick={() => handleCartClick(ticket.id, ticket?.prices[0]?.id, itemExistsInCart(ticket.id, ticket?.prices[0]?.id))}>
                                    {itemExistsInCart(ticket.id, ticket?.prices[0]?.id) ? (
                                    <IoCartSharp /> // Show remove icon if in cart
                                    ) : (
                                    <IoCartOutline /> // Show add icon if not in cart
                                    )}
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

export default Listing