
import React, { useState,useEffect } from 'react'

import { Link } from 'react-router-dom';

import { TicketsApi } from '../services/Tickets'
import { MdShoppingCartCheckout } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiHeart } from "react-icons/ci";
import { useParams } from 'react-router-dom';
const Categories = () => {
 const {catid}=useParams()
 

 
    const [tickets,setTickets]=useState([])
    const[loading,setLoading]=useState(false)
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
        getTicketsList(catid)
      },[catid])
  return (
    <div className='ticket-listing-wrapper'>
         <ToastContainer />
       {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
            <div className="container">
              <h2 className="title-main mb-4">Find best from MMDEALS</h2>
            <div className="row">
            {tickets?.map((ticket,index)=>  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <Link to={`/tickets/${ticket?.guid}`} className="listing-item">
                        <div className="image-wrapper">
                        <img src={ticket?.images[0]?.file_url} className='image' alt='image' fill />
                           <div className="icons">
                            
                            <div className="icon">
                            <CiHeart />
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