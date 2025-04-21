
import React, { useState } from 'react'
import Select from 'react-select';
import { TicketsApi } from '../services/Tickets';

import aimImage from '../../src/images/aim.png';
const Advertise = () => {
    const [loading,setLoading]=useState(false)
    const [businessName,setBusinessName] =useState('')
    const [businessAddress,setBusinessAddress] =useState('')
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [phone,setPhone] =useState('')
    const [typeOfBusiness,setTypeOfBusiness] =useState('')
    const [website,setWebsite] =useState('')
    const [facebookLink,setFacebookLink] =useState('')
    const [instagramLink,setInstagramLink] =useState('')
    const[offers,setOffers]=useState([])
    const [duration,setDuration] =useState('')
    const [message,setMessage] =useState('')
    const [isAgreed,setIsAgreed] =useState(false)
   
 
    const OfferOptions = [
        { label: "Percentage discount", value: "Percentage discount" },
        { label: "Fixed price deal", value: "Fixed price deal" },
        { label: "Free gift with purchase", value: "Free gift with purchase" },
        { label: "Buy one get one free", value: "Buy one get one free" },
        { label: "Other", value: "Other" },
        // Add more options as needed
      ];
      const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
      };
      async function submitInquiry() {
        setLoading(true);
        const formData = new FormData();
        if (businessName) {
          formData.append('business_name', businessName);
        }
        if (businessAddress) {
            formData.append('business_address', businessAddress);
          }
          if (name) {
            formData.append('name', name);
          }
        if (email) {
          formData.append('email', email);
        }
        if (phone) {
          formData.append('phone', phone);
        }
        
       
          if (typeOfBusiness) {
            formData.append('type_of_business', typeOfBusiness);
          }

          if (website) {
            formData.append('website', website);
          }
          if (facebookLink) {
            formData.append('facebook_link', facebookLink);
          }
          
         
            if (instagramLink) {
              formData.append('instagram_link', instagramLink);
            }

            if (duration) {
                formData.append('duration', duration);
              }
              if (message) {
                formData.append('message', message);
              }
              
             
                if (isAgreed) {
                  formData.append('is_agree', isAgreed);
                }

      
        if (offers.length > 0) {
          offers.forEach(item => formData.append('offers[]', item.value));
        }
        
    
        try {
          const result = await TicketsApi.enquiryApi(formData)
    
    
          if (result.status == 200) {
          
            setEmail('');
            setPhone('');
            setIsAgreed(null)
            setBusinessAddress('')
            setBusinessName('')
            setOffers([]);
            setName('')
            setTypeOfBusiness('')
            setWebsite('')
            setFacebookLink('')
            setInstagramLink('')
            
           setDuration('')
           setMessage('')
            
            
     
            alert("Enquiry sent successfuly")
    
          }
          setLoading(false);
    
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
    
      }
    
    
  return (
    <div className='about-us-wrapper'>
           {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
        <div className="main-header">
            <div className="data">
            <h2 className="title">
            Promote Your Business on Mega Merchant
            </h2>
            <p className="text">
            Reach thousands of new customers through exclusive deals and offers. List your business today — it's fast, easy, and risk-free!
            </p>
            <p className="fill">
                Fill out form below to reach us
            </p>
            </div>
        </div>
        <div className="container">
        <div className="max-1000">
        <h2 className="text-center subtitle mb-3">
        Please fill out form below
        </h2>
       <div className="form-wrapper">
        <div className="row">
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Business Name</label>
            <input type="text" value={businessName} onChange={(e)=>setBusinessName(e.target.value)} className='input' />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Business Address</label>
            <input type="text" className='input' value={businessAddress} onChange={(e)=>setBusinessAddress(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor=""> Name</label>
            <input type="text" className='input' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            </div>

            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Email</label>
            <input type="text" className='input' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Phone Number</label>
            <input type="text" className='input' value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Type of Business</label>
            <select name="" id="" className="input" value={typeOfBusiness} onChange={(e)=>setTypeOfBusiness(e.target.value)}>
                <option value="">Select Below</option>
                <option value="Retail Store">Retail Store</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              
            </select>
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Website Link (Optional)</label>
            <input type="text" className='input' value={website} onChange={(e)=>setWebsite(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Facebook Link (Optional)</label>
            <input type="text" className='input' value={facebookLink} onChange={(e)=>setFacebookLink(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Instagram Link (Optional)</label>
            <input type="text" className='input' value={instagramLink} onChange={(e)=>setInstagramLink(e.target.value)} />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Types of offer you'd like to promote</label>
            <Select
      isMulti
      options={OfferOptions}
      value={offers}
      onChange={setOffers}
      className="input auto"
    />
            </div>
            </div>
            <div className="col-12 col-md-6">
            <div className="input-wrapper">
            <label htmlFor="">Preferred Deal Duration</label>
            <select name="" id="" className="input" value={duration} onChange={(e)=>setDuration(e.target.value)}>
                <option value="">Select Below</option>
                <option value="1 Week">1 Week</option>
                <option value="2 Weeks">2 Weeks</option>
                <option value="1 Month">1 Month</option>
                <option value="Custom">Custom</option>
              
            </select>
            </div>
            </div>
            <div className="col-12 col-md-12">
            <div className="input-wrapper">
            <label htmlFor="">Tell us more about your business or the deal you'd like to offer.</label>
            <textarea name="" id="" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
            </div>
            </div>
            <div className="col-12">
                <div className="agreement">
                    <input type="checkbox" checked={isAgreed}
          onChange={handleCheckboxChange} id="agree" />
                    <label htmlFor="agree" className="label">
                        I agree to be contacted by Mega Merchant regarding my listing and promotional oppurtunities.
                    </label>
                </div>
            </div>
            <div className="col-12">
                <div className="d-flex justify-content-center">
                    <button className="button" style={{width:'max-content',padding:'10px 50px'}} onClick={()=>{submitInquiry()}}>Submit</button>
                </div>
            </div>
        </div>
       </div>
       
       
        </div>
        </div>
    </div>
  )
}

export default Advertise