"use client"
import React,{useState,useEffect} from 'react'
import Slider from 'react-slick';
// import Image from 'next/image';
import { MdShoppingCartCheckout } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { TicketsApi } from '../services/Tickets';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminTicketDetail = () => {
  const[loading,setLoading]=useState(false)
  const [ticketDetail,setTicketDetail]=useState({})

 const {tidd}=useParams()
  async function getTicketDetailApi() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getTicketDetailPublic(tidd)
        if(result.status == 200) {
          setLoading(false); 
          setTicketDetail(result?.data?.data)
          toast.success("Record fetched successfuly",{
            autoClose:1000,
            pauseOnHover:true,
            draggable:true,
            
          });
           
          
         }
        
        
        
    } catch (error) {
        console.log(error)
    }
     
  } 

  useEffect(()=>{
    getTicketDetailApi()
  },[])
 
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,  // Auto-scroll
    autoplaySpeed: 2000,  // Time in milliseconds for auto-scroll
    arrows: true,  // Hides arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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


  const settings1 = {
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
    <div className="ticket-detail-page">
            <ToastContainer />
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="image-slider">
              <Slider {...settings}>
                {ticketDetail?.images?.map((img, id) =>
                  <div className="image" key={id}>
                    <img alt="image" src={img?.file_url} fill />
                  </div>


                )}
              </Slider>

            </div>
            <div className="included">
              <p className="title">What You Get</p>
              <p className="text">
                Receive admission for one to SCREEMERS, Canadas #1 haunted scream park.
              </p>
            </div>
            <div className="title-med">
              Ticket Description
            </div>
            <div className="ticket-description">
            <div dangerouslySetInnerHTML={{ __html: ticketDetail?.description}} />
            </div>
            <div className="list-items">
           
              <hr className="hr my-4" />
              <p className="title-med">
                What You Need To Know
              </p>
              <div className="ticket-description">
            <div dangerouslySetInnerHTML={{ __html: ticketDetail?.special_instructions}} />
            </div>
              <hr className="hr my-4" />
              <p className="title-med">
              {ticketDetail?.location}
              </p>
              <div className="location-box">
                <p className="title mb-1">
                Assembly Park
                </p>
                <p className="text mb-1">
                80 Interchange Way
              
                </p>
                <p className="text mb-1">
              
                Vaughan, Ontario, L4K 5C3, Canada
                </p>
                <a className="flex-item">
              <GrMapLocation />   See Location
                </a>

              </div>
              <hr className="hr" />
            
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="cart-wrapper">
              <p className="title">
                {ticketDetail?.title}
              </p>
              <p className="location">
                {ticketDetail?.location}

              </p>
              <p className="location">
                <span> 186</span> Bought
              </p>
              {ticketDetail?.prices?.map((price,index)=> <div className="custom-radio" key={index}>
                <input type="radio" name="ticket" value="31"  />
                <div className="inner">
                  <div className="title">
                 {price?.title}
                  </div>
                  <div className="flex">
                    <span className="original">${price?.price}</span>
                    <span className="price">${price?.discounted_price}</span>
                    <span className="off">{((1 - (price?.discounted_price / price?.price)) * 100).toFixed(2)}% Off</span>
                  </div>
                </div>
              </div>)}
              
         
              {/* <button className="button">
                BUY NOW
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTicketDetail