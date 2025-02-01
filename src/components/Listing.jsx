
import React, { useState,useEffect } from 'react'


import { MdShoppingCartCheckout } from "react-icons/md";
import {TicketsApi} from '../services/Tickets'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart,FaEye } from "react-icons/fa";
const Listing = () => {
    const [selected,setSelected]=useState('trending')
    const[loading,setLoading]=useState(false)
  const [trendings,setTrendings]=useState([])
  const [newlyAddedTickets,setNewlyAddedTickets]=useState([])
  const [deals,setDeals]=useState([])

  //getTickets
  async function getTicketsList() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getTicketsPublic()
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
        <div className="filters-button">
            <button className={`button ${selected == 'trending' ? 'active':''}`} onClick={()=>setSelected('trending')}>
                Trending
            </button>
             <button className={`button ${selected == 'popular' ? 'active':''}`} onClick={()=>setSelected('popular')}>
                Popular
            </button>
             <button className={`button ${selected == 'newly' ? 'active':''}`} onClick={()=>setSelected('newly')}>
                Newly Added
            </button>
        </div>
            {selected =='trending' && 
           <div>
             <div className="row">
                {trendings?.slice(0, 4)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                        <div className="image-wrapper">
                        <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
                           <div className="icons">
                            <div className="icon">
                            <FaEye />
                            </div>
                            <div className="icon">
                            <FaHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                               {ticket?.category}
                            </div>
                            <div className="title">
                            {ticket?.title}
                            </div>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon">
                                <MdShoppingCartCheckout />
                            </div>
                            </div>
                          
                        </div>
                    </Link>
                </div>)}
               
             
               
            </div>
            <div className="d-flex justify-content-center mb-3">
            <Link to={`/trendings`} className="button">See All Tickets </Link>
            </div>
           </div>
            
            }
            {selected =='popular' && 
            <div>
            <div className="row">
            {deals?.slice(0, 4)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                        <div className="image-wrapper">
                        <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
                           <div className="icons">
                            <div className="icon">
                            <FaEye />
                            </div>
                            <div className="icon">
                            <FaHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                            {ticket?.category}
                            </div>
                            <div className="title">
                            {ticket?.title}
                            </div>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon">
                                <MdShoppingCartCheckout />
                            </div>
                            </div>
                          
                        </div>
                    </Link>
                </div>)}
                </div>
                <div className="d-flex justify-content-center mb-3">
            <Link to={`/new-deals`} className="button">See All Tickets </Link>
            </div>
        </div>}
            {selected =='newly' && 
            <div>
            <div className="row">
             
             {newlyAddedTickets?.slice(0, 4)?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                        <div className="image-wrapper">
                        <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
                           <div className="icons">
                            <div className="icon">
                            <FaEye />
                            </div>
                            <div className="icon">
                            <FaHeart />
                            </div>
                           </div>
                        </div>
                        <div className="content">
                            <div className="label">
                            {ticket?.category}
                            </div>
                            <div className="title">
                            {ticket?.title}
                            </div>
                            <div className="price-section">
                                <div className="price">${ticket?.prices[0]?.discounted_price}<span> ${ticket?.prices[0]?.price} </span></div>
                                <div className="cart-icon">
                                <MdShoppingCartCheckout />
                            </div>
                            </div>
                          
                        </div>
                    </Link>
                </div>)}
                </div> <div className="d-flex justify-content-center mb-3">
            <Link to={`/new-deals`} className="button">See All Tickets </Link>
            </div>
        </div>
            }
        </div>
    </div>
  )
}

export default Listing