"use client";
import React, { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

import Image1 from "../../src/images/screem1.jpg";
import Image2 from "../../src/images/screem.jpg";
import Image3 from "../../src/images/screem3.jpg";
import { TicketsApi } from "../services/Tickets";
import { ImageWithFallback } from "../utils/imageUtils";
import noImage from '../images/no-image.jpg';

const Checkout = ({ isAuthenticated, setRedirectTo }) => {
  const { carts, provinces } = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);  
  const [provincesLoading, setProvincesLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    phone_number: '',
    city: '',
    postal_code: '',
    country: 'Canada',
    province: localStorage.getItem('province_name') || 'Ontario'
  });

  const [formErrors, setFormErrors] = useState({});

  // Handle province change separately for immediate tax calculation
  const handleProvinceChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Immediately find and update the selected province for tax calculation
    if (provinces && provinces.length > 0) {
      const selected_province = findSelectedProvince(value, provinces);
      console.log('Province changed to:', value, 'Tax rate:', selected_province?.total_rate);
      setSelectedProvince(selected_province);
    }
  };

  // Handle other form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'province') {
      handleProvinceChange(e); // Use special handler for province
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.first_name) errors.first_name = "First name is required";
    if (!formData.last_name) errors.last_name = "Last name is required";
    if (!formData.address_line1) errors.address_line1 = "Address Line 1 is required";
    if (!formData.phone_number) errors.phone_number = "Phone number is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.postal_code) errors.postal_code = "Postal code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use provinces from context if available, otherwise use default list
  const provinces_list = provinces && provinces.length > 0 
    ? provinces.map(province => province.name) 
    : ['Alberta','British Columbia','Manitoba','Saskatchewan','Quebec','Ontario','New Brunswick','Newfoundland and Labrador','Nova Scotia','Prince Edward Island','Yukon','Northwest Territories','Nunavut'];

  const totalPrice = carts.reduce((total, cart) => {
    const price = cart.tickets.prices[0]?.discounted_price || 0;
    return total + (price * cart.quantity);
  }, 0);

  // Function to find the selected province
  const findSelectedProvince = (provinceName, provincesArray) => {
    if (!Array.isArray(provincesArray) || !provinceName) {
      console.warn("Missing province list or selected province");
      return null;
    }

    const selected = provincesArray.find((province) => {
      // Handle province object with name property
      const name = province?.name || province;
      return name && provinceName && (name.toLowerCase() === provinceName.toLowerCase());
    });

    return selected || null;
  };

  // Calculate amounts based on current state
  const calculateAmounts = () => {
    const serviceFeeAmount = parseFloat(totalPrice * (15 / 100));
    
    // Get tax rate from selected province
    let taxRate = 0;
    if (selectedProvince) {
      taxRate = selectedProvince.total_rate || 0;
    }
    
    const taxAmount = parseFloat(totalPrice * (taxRate / 100));
    const finalTotal = parseFloat(totalPrice + serviceFeeAmount + taxAmount).toFixed(2);

    console.log('Calculating amounts - Tax Rate:', taxRate, 'Tax Amount:', taxAmount, 'Total:', finalTotal);

    return {
      serviceFeeAmount,
      taxAmount,
      taxRate,
      finalTotal
    };
  };

  const { serviceFeeAmount, taxAmount, taxRate, finalTotal } = calculateAmounts();

  // Initialize selected province on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectTo(location.pathname);
      return;
    }

    if (provinces && provinces.length > 0) {
      const selected_province = findSelectedProvince(formData.province, provinces);
      console.log('Initializing province:', selected_province);
      setSelectedProvince(selected_province);
      setProvincesLoading(false);
    }
  }, [provinces, isAuthenticated, location, setRedirectTo]);

  // Save province to localStorage when it changes
  useEffect(() => {
    if (formData.province) {
      localStorage.setItem('province_name', formData.province);
    }
  }, [formData.province]);

  // Debug logging
  useEffect(() => {
    console.log('Provinces from context:', provinces);
    console.log('Selected province object:', selectedProvince);
    console.log('Current form province:', formData.province);
  }, [provinces, selectedProvince, formData.province]);

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
             
             <div className="mobile-show">
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
                          <span className="text">${(item?.tickets?.prices[0]?.discounted_price * item.quantity).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="item"><span className="label">Sub total:</span> <span className="value">${totalPrice.toFixed(2)}</span></div>
              <div className="item"><span className="label">Promo Code:</span> <span className="value">$0.00</span></div>
              {carts && carts.length > 0 ? <>
              <div className="item"><span className="label">Service Fee:</span> <span className="value">15% (${serviceFeeAmount.toFixed(2)})</span></div>
              {selectedProvince && taxRate > 0 && (
                <div className="item">
                  <span className="label">Tax ({selectedProvince.name}):</span> 
                  <span className="value">{taxRate}% (${taxAmount.toFixed(2)})</span>
                </div>
              )}
              <hr className="hr my-4" />
              <p className="title mb-4">Your Total: ${finalTotal}</p>
              </>
              : ''
              }
             </div>

              <div className="title-med">Payment</div>
              <div className="row">
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
                    {provincesLoading && <span className="loading-text">Loading tax rates...</span>}
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
             <div className="mobile-hide">
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
                          <span className="text">${(item?.tickets?.prices[0]?.discounted_price * item.quantity).toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="item"><span className="label">Sub total:</span> <span className="value">${totalPrice.toFixed(2)}</span></div>
              <div className="item"><span className="label">Promo Code:</span> <span className="value">$0.00</span></div>
              {carts && carts.length > 0 ?
              <div className="item"><span className="label">Service Fee:</span> <span className="value">15% (${serviceFeeAmount.toFixed(2)})</span></div>
              : '' 
              }
              
              {!provincesLoading ? (
                taxRate > 0 ? (
                  <div className="item">
                    <span className="label">Tax ({selectedProvince?.name || formData.province}):</span> 
                    <span className="value">{taxRate}% (${taxAmount.toFixed(2)})</span>
                  </div>
                ) : (
                  <div className="item">
                    <span className="label">Tax:</span> 
                    <span className="value">0% ($0.00)</span>
                  </div>
                )
              ) : (
                <div className="item">
                  <span className="label">Tax:</span> 
                  <span className="value">Calculating...</span>
                </div>
              )}
              <hr className="hr my-4" />
              {carts && carts.length > 0 ?
              <p className="title mb-4">Your Total: ${finalTotal}</p>
              : '' 
              }
             </div>
              {carts && carts.length > 0 ?
              <button className="button" type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Complete Order"}
              </button>
              : 
              <button className="button" type="button" disabled={true}>
                Complete Order
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;