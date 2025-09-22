
import React, { useState,useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom';

import { TicketsApi } from '../services/Tickets'
import { MdShoppingCartCheckout } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiHeart } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaEye, FaHeart } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { ImageWithFallback } from '../utils/imageUtils';
import noImage from '../images/no-image.jpg';

const Categories = ({ isAuthenticated, setRedirectTo }) => {

  const { addToCart, addToWishlist, itemExistsInCart, removeFromCart, removeFromWishlist } = useCart();

 const {catid}=useParams()
 

 
    const [tickets,setTickets]=useState([])
    const[loading,setLoading]=useState(false)


    const location = useLocation();

      //getTickets
      async function getTicketsList() {
        setLoading(true);
      
        try {
            const result = await TicketsApi.getTicketsPublicByCategory(catid)
            if(result.status == 200) {
              setLoading(false); 
              console.log(result)
            //   setList(result?.data?.data?.data)
          
             
            setTickets(result?.data?.data?.tickets?.data)
            
              
             }
             else {
              setLoading(false); 
             }
            
            
            
        } catch (error) {
            console.log(error)
            setLoading(false); 
        }
         
      } 
      
    
      useEffect(()=>{
        if (!isAuthenticated) {
          setRedirectTo(location.pathname);
        }
        getTicketsList(catid)
      },[catid, isAuthenticated, location, setRedirectTo])

  return (
    <div className='ticket-listing-wrapper'>
         <ToastContainer />
       {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
            <div className="container">
              <h2 className="title-main mb-4">Find best from MMDEALS</h2>
            <div className="row">
            {tickets?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
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
                            <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                              <div className="label">
                                  {ticket?.category}
                              </div>
                              <div className="title">
                                {ticket?.title}
                              </div>
                            </Link>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon" onClick={() => addToCart(ticket.id, ticket?.prices[0]?.id, 1)}>
                                <IoCartOutline />
                            </div>
                            </div>
                          
                        </div>
                    </div>
                </div>)}
           {(tickets?.length == 0 && !loading) && <h2 className="title-main my-4 text-center">No Record found <br></br>
            <br></br>
            <br></br>
             <Link to='/' >Find more here</Link>
           </h2>}
        </div>
        </div>
</div>
  )
}

export default Categories