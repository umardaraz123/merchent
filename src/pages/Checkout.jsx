"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
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
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    phone_number: '',
    city: '',
    postal_code: '',
    country: 'Canada',
    province: 'Toronto (GTA)'
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    const token = localStorage.getItem('token');
  
    if (!token) {
        navigate('/login');
    }

    setLoading(true);
    try {

           
      const datas = {
        amount: finalTotal,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        phone_number: formData.phone_number,
        city: formData.city,
        postal_code: formData.postal_code,
        country: formData.country,
        province: formData.province
      };

      console.log('datas ========= ', datas);
      
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
  const finalTotal = totalPrice + serviceFee;



  return (
    <div className="cart-wrapper-container">
      <div className="container">
        <div className="header-cart">
          <span className="title">Please fill out your address and card info</span>
          <Link to="/" className="shopping-link">
            Continue shopping <MdOutlineShoppingCartCheckout />
          </Link>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="cart-box">
              <div className="title-med">Payment</div>
              <div className="row">
                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input
                      type="text"
                      name="address_line1"
                      value={formData.address_line1}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      name="address_line2"
                      value={formData.address_line2}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-4">
                  <div className="form-group">
                    <label>Province</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="input"
                    >
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
                                src={item.tickets.images[0]?.file_url}
                                fallbackSrc={noImage}
                                alt="image"
                                />
                            </div>
                            <p className="title">{item?.tickets?.title}</p>
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
