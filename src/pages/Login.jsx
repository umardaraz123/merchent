
import React, { useState,useEffect } from 'react'

import aimImage from '../../src/images/dark1.jpg';
import Logo from '../../src/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../services/Auth'; 
import { ToastContainer, toast } from 'react-toastify';

import { useUser } from '../contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const { user, login } = useUser();
    const navigate =useNavigate()

    useEffect(()=>{
    if(user && user?.role ==='customer') {
      navigate('/user')
    }
    else if(user && user?.role ==='admin') {
      navigate('/admin')
    }
    },[user])
    console.log('umar',user)
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
    async function loginFunction() {
        setLoading(true);
        const formData = new FormData();
       
        if(email){
            formData.append('email', email);
        }
       
        if(password){
            formData.append('password', password);
        }
       
        try {
            const result = await Auth.login(formData)
            if(result.status == 200) {
                localStorage.setItem('email', result?.data?.data?.email);
                localStorage.setItem('phone', result?.data?.data?.hone);
                localStorage.setItem('name', result?.data?.data?.name);
                localStorage.setItem('isAdmin', result?.data?.data?.is_admin);
                localStorage.setItem('role', result?.data?.data?.role);
                localStorage.setItem('mmdeals-token', result?.data?.data?.token);
                localStorage.setItem('mmdeals-user', JSON.stringify(result?.data?.data));
                login(result?.data?.data)
                // router.push('/login')
                if(result?.data?.data?.role == 'admin') {
                    navigate('/admin')
                }
                else if(result?.data?.data?.role == 'customer') {
                    navigate('/user')
                }
                else {
                    navigate('/')
                }
                console.log(result?.data?.data?.name)
                     
            }
            setLoading(false);  
            
        } catch (error) {
            console.log(error)
        }
         
      } 
  return (
    <div className='login-wrapper'>
        <ToastContainer />
         {loading && <div className='main-loader'>
            <div className="spinner"></div>
            </div>}
        <div className="inner">
           <div className="left">
            <img src={aimImage} alt='Image' />
            <div className="title">
            Explore the World Without Breaking the Bank , Cheap Tickets Here!

            </div>
           </div>
           <div className="right">
            <div className="logo mb-4">
            <img src={Logo} alt='Logo' />
            </div>
            <p className="title mb-4">
                Login to your account
            </p>
            <div className="input">
                <label htmlFor="" >Email</label>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'  />
            </div>
            <div className="input">
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </div>
            <button className="button" onClick={loginFunction}>
                Login
            </button>
            <div className="or">
                <span>
                    Or
                </span>
            </div>
            <Link className="button-link" to={`/register`} >Signup</Link>
           </div>
        </div>
    </div>
  )
}

export default Login