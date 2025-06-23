import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import { CiLocationOn } from 'react-icons/ci';
import { TbCategory } from 'react-icons/tb';
import { FaFireAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { TicketsApi } from '../services/Tickets';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

const TicketDetail = () => {
  const { tid } = useParams();
  const navigate = useNavigate();
  const { addToCart, carts, updateCartItem, removeFromCart } = useCart();

  const [ticketDetail, setTicketDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(0);
  const [priceId, setPriceId] = useState(0);
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      setLoading(true);
      try {
        const res = await TicketsApi.getTicketDetailPublic(tid);
        if (res.status === 200) {
          const detail = res.data?.data;
          setTicketDetail(detail);

          const existingCartItem = carts.find(item => item.product_id === detail.id);
          setCartId(existingCartItem?.id || 0);
          setPriceId(existingCartItem?.price_id || 0);
          setQuantity(existingCartItem?.quantity || 1);
          setSelectedPriceId(existingCartItem?.price_id);

          toast.success('Record fetched successfully!', {
            autoClose: 1000,
            pauseOnHover: true,
            draggable: true
          });
        }
      } catch (error) {
        console.error('Failed to fetch ticket detail', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetail();
  }, [tid, carts]);


    // Handle the radio button change
    const handleRadioChange = (event) => {
      setSelectedPriceId(event.target.value);  // Set the selected priceId
    };


   // Function to handle quantity change and API call
   const handleQuantityChange = async (newQuantity) => {
    if (newQuantity <= 0) {
      toast.error("Quantity must be at least 1");
      return; // Prevents making API call if quantity is invalid
    }

    setLoading(true);
    try {
      // Call the API to update the cart
      const response = await updateCartItem(cartId, newQuantity, priceId);
      
      // Check if the update was successful
      if (response.status === 200) {
        setQuantity(newQuantity);
        toast.success("Quantity updated successfully!");
      }
      //  else {
        // toast.error("Failed to update quantity");
      // }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!ticketDetail?.prices?.[0]) return;

    setIsProcessing(true);
    const result = await addToCart(ticketDetail.id, ((priceId && priceId !== 0) ? priceId : ticketDetail.prices[0].id), quantity);

    if (result.success) {

      setCartId(ticketDetail.id);

      toast.success('Remove from cart!', {
        autoClose: 1500,
        pauseOnHover: true
      });
    }

    setIsProcessing(false);
  };

  const handleRemoveToCart = async () => {
    if (!ticketDetail?.prices?.[0]) return;

    setIsProcessing(true);
    const result = await removeFromCart(ticketDetail.id);

    if (result.success) {

      setCartId(ticketDetail.id);

      toast.success('Added to cart!', {
        autoClose: 1500,
        pauseOnHover: true
      });
    }

    setIsProcessing(false);
  };

  const redirectToCheckout = () => navigate('/checkout');

  const sliderSettingsMain = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { dots: true } },
      { breakpoint: 600, settings: { initialSlide: 1 } },
      { breakpoint: 480 }
    ]
  };

  const sliderSettingsSecondary = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 480 }
    ]
  };

  if (loading || !ticketDetail) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="ticket-detail-page">
      <ToastContainer />

      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <h2 className="title">{ticketDetail.title}</h2>
            <div className="location">
              <CiLocationOn /> {ticketDetail.location}
            </div>
            <div className="categories">
              <div className="cat">
                <TbCategory /> {ticketDetail.category}
              </div>
              <div className="cat">
                <FaFireAlt /> 300+ Bought
              </div>
            </div>

            <div className="image-slider">
              <Slider {...sliderSettingsMain}>
                {ticketDetail.images?.map((img, id) => (
                  <div className="image" key={id}>
                    <img alt="ticket" src={img?.file_url} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="cart-wrapper">
              {ticketDetail.prices?.map((price, index) => (
                <div className={`custom-radio ${price.id === priceId ? 'active' : ''}`}  key={index}  onClick={() => setPriceId(price.id)}>
                  <input type="radio" name="ticket" value={price.id} />
                  <div className="inner">
                    <div className="title">{price.title}</div>
                    <div className="flex">
                      <span className="original">${price.price}</span>
                      <span className="price">${price.discounted_price}</span>
                      <span className="off">
                        -{((1 - price.discounted_price / price.price) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="quantity_wrapper">
                { cartId ? 
                <div className="buttons">
                   <button
                      className="btn left"
                      onClick={() => handleQuantityChange(Math.max(1, quantity - 1))} // Prevent going below 1
                      disabled={loading}
                    >
                      -
                    </button>
                    <span className="count">{quantity}</span>
                    <button
                      className="btn right"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                </div>
                : '' }

                { cartId ? 
                <div className="product-actions">
                  <button
                    onClick={handleRemoveToCart}
                    disabled={isProcessing}
                    className="button"
                  >
                    {isProcessing ? 'Removing...' : 'Remove from Cart'}
                  </button>
                </div>

               
                : 
                 <div className="product-actions">
                  <button
                    onClick={handleAddToCart}
                    disabled={isProcessing}
                    className="button"
                  >
                    {isProcessing ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
                }

              </div>

              <button className="button" onClick={redirectToCheckout}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;