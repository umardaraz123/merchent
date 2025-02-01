"use client";
import React, { useState } from "react";
import Slider from "react-slick";

import Image1 from "../../src/images/screem1.jpg";
import Image2 from "../../src/images/screem.jpg";
import Image3 from "../../src/images/screem3.jpg";
import Image4 from "../../src/images/screem2.jpg";
import Image5 from "../../src/images/screem4.jpg";
import { IoMdArrowBack } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdShoppingCartCheckout } from "react-icons/md";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';



const stripePromise = loadStripe("pk_test_eURXcU5xwHkizTNo53OqYHcR003igbbJak");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const { data } = await axios.post("https://udigify-api.himalayatool.com/api/create-payment-intent", {
        amount: 10, 
      });

      const clientSecret = data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentResult.error) {
        setMessage(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        const confirmResponse = await axios.post("https://udigify-api.himalayatool.com/api/confirm-payment", {
          payment_intent_id: paymentResult.paymentIntent.id,
        });

        if (confirmResponse.data.success) {
          setMessage("Payment successful!");
        } else {
          setMessage("Payment not confirmed. Please check.");
        }
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};


const Checkout = () => {

  return (
    <div className="cart-wrapper-container">
      <div className="container">
        <div className="header-cart">
          <span className="title">
            Please fill out your address and card info
          </span>
          <Link to="/" className="shopping-link">
            Continue shopping <MdOutlineShoppingCartCheckout />
          </Link>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="form-group mb-4">
              <label htmlFor="">Contact</label>
              <input type="text" className="input" />
            </div>

            <div className="cart-box">
              <div className="title-med">Payment</div>
              <div className="row">
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Address Line 1</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Address Line 1 (Optional)</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Card Number</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Country</label>
                    <select className="input">
                      <option value="">Canads</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">City</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-mb-4">
                <div className="form-group">
                <label htmlFor="">Province</label>
                <select className='input' >
                <option value="Toronto (GTA)" >Toronto (GTA)</option>
                <option value="Niagara" >Niagara</option>
                <option value="Hamilton" >Hamilton</option>
                <option value="Kitchener/Cambridge" >Kitchener/Cambridge</option>
                <option value="Durham" >Durham</option>
                </select>
                </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="">Postal Code</label>
                    <input type="text" className="input"  />
                  </div>
                </div>
              </div>
              <Link to="/cart" className="return-cart">
            < IoMdArrowBack  />  Return to cart
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="cart-box">
              <p className="title">Order Summary</p>
              <hr className="hr my-2" />
              <div className="custom-table small table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="item-detail">
                          <div className="image-wrapper">
                            <span className="count">1</span>
                            <img src={Image1} alt="Image" />
                          </div>
                          <p className="title">
                            $145 for a Seven-Course Prix-Fixe Teppanyaki Dinner
                            for Four
                          </p>
                        </div>
                      </td>

                      <td>
                        <span className="text">$145</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="item-detail">
                          <div className="image-wrapper">
                            <span className="count">1</span>
                            <img src={Image2} alt="Image" />
                          </div>
                          <p className="title">
                            FLASH SALE! $149.60 for One Halloween Weekend
                            Admission (a $56.44 Value)
                          </p>
                        </div>
                      </td>

                      <td>
                        <span className="text">$120</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="item-detail">
                          <div className="image-wrapper">
                            <span className="count">1</span>
                            <img src={Image3} alt="Image" />
                          </div>
                          <p className="title">
                            FLASH SALE! $149.60 for One Halloween Weekend
                            Admission (a $56.44 Value)
                          </p>
                        </div>
                      </td>

                      <td>
                        <span className="text">$100</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="item">
                <span className="label">Sub total:</span>
                <span className="value">$345</span>
              </div>
              <div className="item">
                <span className="label">Promo Code:</span>
                <span className="value">$0</span>
              </div>
              <div className="item">
                <span className="label">Service Fee:</span>
                <span className="value">$15</span>
              </div>
              <hr className="hr my-4" />
              <p className="title mb-4">Your Total: $360</p>
              <button className="button">Complete Order</button>

               {/* Stripe Elements Wrapper */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
