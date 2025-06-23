"use client";
import React, { use, useEffect, useState } from "react";
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
  const { carts, provinces } = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState({});  
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
    province: localStorage.getItem('province_name')
  });

  const [formErrors, setFormErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    // Simple validation checks for required fields
    if (!formData.first_name) errors.first_name = "First name is required";
    if (!formData.last_name) errors.last_name = "Last name is required";
    if (!formData.address_line1) errors.address_line1 = "Address Line 1 is required";
    if (!formData.phone_number) errors.phone_number = "Phone number is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.postal_code) errors.postal_code = "Postal code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // returns true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Only proceed if form is valid

    const token = localStorage.getItem('mmdeals-token');
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


      const data = await TicketsApi.checkout(datas);
      if(data.status === 200) {
        window.location.href = data.data.data.url; 
        console.log("Client Secret:", data.clientSecret);
      } else {
        // console.log('sfsdfsd ============ ', data.data);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const provinces_list = ['Alberta','British Columbia','Manitoba','Saskatchewan','Quebec','Ontario','New Brunswick','Newfoundland and Labrador','Nova Scotia','Prince Edward Island','Yukon','Northwest Territories','Nunavut','Alberta','British Columbia','Manitoba','Saskatchewan','Quebec','Ontario','New Brunswick','Newfoundland and Labrador','Nova Scotia','Prince Edward Island','Yukon','Northwest Territories','Nunavut'];

  const cartItems = [
    { image: Image1, title: "$145 for a Seven-Course Dinner for Four", price: 145 },
    { image: Image2, title: "FLASH SALE! $149.60 for One Halloween Admission", price: 120 },
    { image: Image3, title: "FLASH SALE! $149.60 for One Halloween Admission", price: 100 }
  ];

  const totalPrice = carts.reduce((total, cart) => {
    const price = cart.tickets.prices[0]?.price || 0; // fallback to 0 if no price
    return total + (price * cart.quantity);
  }, 0);


  // Function to find "Ontario" in a case-insensitive way
  const findSelectedProvince = (arr) => {
    if (!Array.isArray(arr) || !formData?.province) {
      console.warn("Missing province list or selected province");
      // return null;
    
      const selected = arr.find((province) => {
        const name = typeof province === 'string' ? province : province?.name;
        if(name && formData.province && (name?.toLowerCase() === formData.province.toLowerCase())){
          return province;
        }else{
          return null;
        }
      });

      if (!selected) {
        console.warn(`Province "${formData.province}" not found`);
      }
      return selected;
    }

    return null;
  };


    // Fetch cart and wishlist on component mount
  useEffect(() => {
    const selected_province = findSelectedProvince(provinces_list);
    setSelectedProvince(selected_province);

  }, [provinces, formData.province]);



  const serviceFee = 15;
  const finalTotal = totalPrice + serviceFee + ((selectedProvince && selectedProvince.total_rate) ? parseFloat(selectedProvince.total_rate) : 0);

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
                {/* Render form fields dynamically with error handling */}
                {[
                  { label: 'First Name', name: 'first_name', type: 'text' },
                  { label: 'Last Name', name: 'last_name', type: 'text' },
                  { label: 'Address Line 1', name: 'address_line1', type: 'text' },
                  { label: 'Address Line 2', name: 'address_line2', type: 'text' },
                  { label: 'Phone Number', name: 'phone_number', type: 'text' },
                  { label: 'City', name: 'city', type: 'text' },
                  { label: 'Postal Code', name: 'postal_code', type: 'text' }
                ].map(({ label, name, type }, index) => (
                  <div key={index} className="col-12 col-md-6 mb-4">
                    <div className="form-group">
                      <label>{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="input"
                      />
                      {formErrors[name] && <span className="error">{formErrors[name]}</span>}
                    </div>
                  </div>
                ))}
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
                      {provinces_list.map((province, index) => (
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
                              <span className="count">{ item.quantity }</span>
                              <ImageWithFallback
                                src={item.tickets.images[0]?.file_url}
                                fallbackSrc={noImage}
                                alt="image"
                              />
                            </div>
                            <Link to={`/tickets/${item?.tickets?.guid}`} className="listing-item">
                              <p className="title">{item?.tickets?.title}</p>
                            </Link>
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
              
              {
                (selectedProvince && selectedProvince.total_rate) ? 
                <div className="item"><span className="label">{selectedProvince.name}:</span> <span className="value">${parseFloat(selectedProvince.total_rate)}</span></div>
                : ''
              }
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