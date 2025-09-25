
import React, { useState,useEffect } from 'react'

import aimImage from '../../src/images/dark1.jpg';
import Logo from '../../src/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../services/Auth'; 
import { ToastContainer, toast } from 'react-toastify';

import { useUser } from '../contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({isAuthenticated, setIsAuthenticated, redirectTo}) => {
    const { user, login } = useUser();
    const navigate =useNavigate()

    useEffect(()=>{
        console.log('redirectTo ======= ', redirectTo);
    if(user && user?.role ==='customer') {
        navigate(`${redirectTo ? redirectTo : `/`}`);
    //   navigate('/')
    }
    else if(user && user?.role ==='admin') {
        navigate(`${redirectTo ? redirectTo : `/admin`}`);
    //   navigate('/admin')
    }
    },[user])
   
    const [loading,setLoading]=useState(false)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
    async function loginFunction() {
        setLoading(true);

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const result = await Auth.login(formData);

            // ✅ Check HTTP status
            if (result.status === 200 && result?.data?.success) {
            const data = result.data.data;

            localStorage.setItem('email', data?.email || '');
            localStorage.setItem('phone', data?.phone || '');
            localStorage.setItem('name', data?.name || '');
            localStorage.setItem('isAdmin', data?.is_admin || '');
            localStorage.setItem('role', data?.role || '');
            localStorage.setItem('mmdeals-token', data?.token || '');
            localStorage.setItem('mmdeals-user', JSON.stringify(data));
            login(data);
            
            setIsAuthenticated(true);

            if (data?.role === 'admin') {
                console.log(' -============== redirectTo ', redirectTo);
                navigate(`${redirectTo ? redirectTo : `/admin`}`);
            } else {
                navigate(`${redirectTo ? redirectTo : `/`}`);
            }
            } else {
            // Backend response error (e.g. not authorized or validation failed)
            const errorMessage =
                result?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
            }

        } catch (error) {
            // ❗ Network or server error
            console.error("Login error: ", error);

            if (error?.response?.data?.message) {
            toast.error(error.response.data.message); // From backend
            } else if (error?.message?.includes('Network')) {
            toast.error("Network error. Please check your connection.");
            } else {
            toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
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
            <div className="forgot-password-wrapper">
                <Link to="/forgot-password" className="forgot-password-link">
                    Forgot your password?
                </Link>
            </div>
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