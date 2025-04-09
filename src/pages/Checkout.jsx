"use client";
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from "../contexts/CartContext";

import Image1 from "../../src/images/screem1.jpg";
import Image2 from "../../src/images/screem.jpg";
import Image3 from "../../src/images/screem3.jpg";
import { TicketsApi } from "../services/Tickets";
import { ImageWithFallback } from "../utils/imageUtils";
import noImage from '../images/no-image.jpg';


const Checkout = () => {
  const { carts } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Memoizing the stripePromise to prevent re-creation on every render
  const stripePromise = useMemo(() => loadStripe("pk_test_eURXcU5xwHkizTNo53OqYHcR003igbbJak"), []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let datas = {'amount': 100};
      const data = await TicketsApi.checkout(datas);
      window.location.href = data.data.data.url; 
      console.log("Client Secret:", data.clientSecret);
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cartItems = [
    { image: Image1, title: "$145 for a Seven-Course Dinner for Four", price: 145 },
    { image: Image2, title: "FLASH SALE! $149.60 for One Halloween Admission", price: 120 },
    { image: Image3, title: "FLASH SALE! $149.60 for One Halloween Admission", price: 100 }
  ];


  const totalPrice = carts.reduce((total, cart) => {
    const price = cart.tickets.prices[0]?.price || 0; // fallback to 0 if no price
    return total + (price * cart.quantity);
  }, 0);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = 15;
  const finalTotal = totalAmount + serviceFee;



  return (
    <div className="cart-wrapper-container">
      <div className="container">
        <div className="header-cart">
          <span className="title">Please fill out your address and card info</span>
          <Link to="/" className="shopping-link">
            Continue shopping <MdOutlineShoppingCartCheckout />
          </Link>
        </div>
        { console.log('11111111111111111carts ======= ', carts) }

        <div className="row">
          <div className="col-12 col-md-7">
            <div className="cart-box">
              <div className="title-med">Payment</div>
              <div className="row">
                {["First Name", "Last Name", "Address Line 1", "Address Line 2", "Phone Number", "City", "Postal Code"].map((label, index) => (
                  <div className="col-12 col-md-6 mb-4" key={index}>
                    <div className="form-group">
                      <label>{label}</label>
                      <input type="text" className="input" />
                    </div>
                  </div>
                ))}
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Country</label>
                    <select className="input">
                      <option value="">Canada</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Province</label>
                    <select className="input">
                      {["Toronto (GTA)", "Niagara", "Hamilton", "Kitchener/Cambridge", "Durham"].map((province, index) => (
                        <option key={index} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <Link to="/cart" className="return-cart">
                <IoMdArrowBack /> Return to cart
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
                    {carts.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="item-detail">
                            <div className="image-wrapper">
                              <span className="count">
                                { item.quantity }
                              </span>
                              <ImageWithFallback
                                src={item.tickets.images}
                                fallbackSrc={noImage}
                                alt="image"
                                />
                            </div>
                            <p className="title">{item.title}</p>
                          </div>
                        </td>
                        <td>
                          <span className="text">${(item?.tickets?.prices[0]?.price * item.quantity)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="item"><span className="label">Sub total:</span> <span className="value">${totalPrice}</span></div>
              <div className="item"><span className="label">Promo Code:</span> <span className="value">$0</span></div>
              <div className="item"><span className="label">Service Fee:</span> <span className="value">${serviceFee}</span></div>
              <hr className="hr my-4" />
              <p className="title mb-4">Your Total: ${finalTotal}</p>

              <button className="button" type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
