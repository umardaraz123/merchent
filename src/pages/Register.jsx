
import React, { useState } from 'react'

import aimImage from '../../src/images/dark1.jpg';
import Logo from '../../src/images/logo.png';
import { Auth } from '../services/Auth'; 
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';


const Register = () => {
    const [loading,setLoading]=useState(false)
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const navigate = useNavigate()
     const { user, login } = useUser();
    //Register function

    async function registerFunction() {
        setLoading(true);
        const formData = new FormData();
        if(userName){
            formData.append('name', userName);
        }
        if(email){
            formData.append('email', email);
        }
        if(phone){
            formData.append('phone', phone);
        }
        if(password){
            formData.append('password', password);
        }
        if(confirmPassword){
            formData.append('confirm_password', confirmPassword);
        }
        try {
            const result = await Auth.register(formData)
            if(result.status == 200) {
                   localStorage.setItem('mmdeals-token', result?.data?.data?.token);
                localStorage.setItem('mmdeals-user', JSON.stringify(result?.data?.data));
                login(result?.data?.data)
                navigate('/login')
                     
            }
            setLoading(false);  
            
        } catch (error) {
            console.log(error)
        }
         
      } 
  return (
    <div className='login-wrapper'>
        {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
        <div className="inner">
           <div className="left">
            <img src={aimImage} alt='Image' />
            <div className="title">
            Sign Up for Exclusive Access to Our Ticketing Platform

            </div>
           </div>
           <div className="right">
            <div className="logo mb-4">
            <img src={Logo} alt='Logo' />
            </div>
            <p className="title mb-4">
            Unlock Your Access: Register for Exclusive Tickets
            </p>
            <div className="input">
                <label htmlFor="">User Name</label>
                <input type="text" placeholder='Full Name' value={userName} onChange={(e)=>setUserName(e.target.value)} />
            </div>
           
            <div className="input">
                <label htmlFor="">Email</label>
                <input type="text" placeholder='mmdels@info.com'  value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input">
                <label htmlFor="">Phone</label>
                <input type="text" placeholder='+923014157766' value={phone} onChange={(e)=>setPhone(e.target.value)}  />
            </div>
            <div className="input">
                <label htmlFor="">Password</label>
                <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <div className="input">
                <label htmlFor="">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
            </div>
            <button className="button" onClick={registerFunction}>
                Register
            </button>
           <div className="or">
                <span>
                    Or
                </span>
            </div>
            <Link to={`/login`} className="button-link">Login</Link>
           </div>
        </div>
    </div>
  )
}

export default Register