
import React,{useState,useEffect} from 'react'
import Slider from 'react-slick';

import { MdShoppingCartCheckout } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { TicketsApi } from '../services/Tickets';
import { FaFireAlt } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { TbCategory } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
const TicketDetail = () => {

  const { getCartDetail, addToCart, carts } = useCart();
  const navigate = useNavigate()
    const { tid } = useParams();
  const[loading,setLoading]=useState(false)
  const [ticketDetail,setTicketDetail]=useState({})

   const [quantity, setQuantity] = useState(1);
   const [isProcessing, setIsProcessing] = useState(false);
   const [actionMessage, setActionMessage] = useState('');




   const handleAddToCart = async () => {
    setIsProcessing(true);
    const result = await addToCart(ticketDetail?.id, ticketDetail?.prices[0]?.id, quantity);
    if (result.success) {
      setActionMessage('Added to cart!');
      setTimeout(() => setActionMessage(''), 3000);
    }
    setIsProcessing(false);
  };
  
  async function getTicketDetailApi() {
    setLoading(true);
  
    try {
        const result = await TicketsApi.getTicketDetailPublic(tid)
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

  useEffect(async() => {
    const fetchData = async () => {
      await getTicketDetailApi(tid);
    };
  
    await fetchData();


    console.log('carts ========= ', carts, ticketDetail);
      if (carts && carts.length > 0 && ticketDetail) {
        const qty = carts?.find(item => item.product_id === ticketDetail.id)?.quantity || 0;
        console.log('qty ========== ', qty);
        setQuantity(qty);
      }

  }, [tid]);
 
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

  const redirectToCheckout = () => {
    navigate('/checkout');
    
  }

  return (
    <div className="ticket-detail-page">
            <ToastContainer />
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
             <h2 className="title">
            
                {ticketDetail?.title}
              
             </h2>
             <div className="location">
              <CiLocationOn />  {ticketDetail?.location}

              </div>
              <div className="categories">
                <div className="cat">
                <TbCategory />  {ticketDetail?.category}
                </div>
                <div className="cat">
                <FaFireAlt />  300+ Bought
                </div>
              </div>
           

            <div className="image-slider">
              <Slider {...settings}>
                {ticketDetail?.images?.map((img, id) =>
                  <div className="image" key={id}>
                    <img alt="image" src={img?.file_url} fill />
                  </div>


                )}
              </Slider>

            </div>
           
          </div>
          <div className="col-12 col-md-5">
            <div className="cart-wrapper">
             
             
              {ticketDetail?.prices?.map((price,index)=> <div className="custom-radio" key={index}>
                <input type="radio" name="ticket" value="31"  />
                <div className="inner">
                  <div className="title">
                 {price?.title}
                  </div>
                  <div className="flex">
                    <span className="original">${price?.price}</span>
                    <span className="price">${price?.discounted_price}</span>
                    <span className="off">- {((1 - (price?.discounted_price / price?.price)) * 100).toFixed(2)}% </span>
                  </div>
                </div>
              </div>)}
              
              
               <div className="quantity_wrapper">
                  <div className="buttons">
                    <button className='btn left' onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                    <span className='count'>{quantity}</span>
                    <button  className='btn right' onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                  
                  <div className="product-actions">
                    <button 
                      onClick={handleAddToCart}
                      disabled={isProcessing}
                      className="button"
                    >
                      {isProcessing ? 'Adding...' : 'Add to Cart'}
                    </button>
                    

                  </div>
                </div>
               
              <button className="button" onClick={ () => redirectToCheckout()}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default TicketDetail