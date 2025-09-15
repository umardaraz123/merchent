import React, { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Logo from '../../src/images/logo.png';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../contexts/CartContext";
import { FaHeart,FaEye } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import ShoppingCart from './ShoppingCart';
import { useUser } from '../contexts/UserContext';
import { FaUserGear } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
const MainNav = () => {
  const { user, login,logout } = useUser();

  const { wishlist, carts } = useCart();
const [showMenu,setShowMenu] = useState(false)
const [showSetting,setShowSetting] = useState(false)
const navigate = useNavigate()
const logoutFunction = ()=>{
  logout()
  navigate('/login')
}
  return (
    <div className='main-search-wrapper'>
     {showMenu &&  <div className="mobile-menu-wrapper">
       <div className="close-icon" onClick={()=>setShowMenu(false)}>
        <IoCloseCircleOutline />
       </div>
       <h2 className="title">
        About
       </h2>
       <Link to='/about'  onClick={()=>setShowMenu(false)}>About us</Link>
                       <Link to='/advertise'  onClick={()=>setShowMenu(false)}>Advertise with us</Link>
                        <Link to='/merchant'  onClick={()=>setShowMenu(false)}>Merchant</Link>
                       <Link to='/'  onClick={()=>setShowMenu(false)}>Delivery Information</Link>
                       <Link to='/privacypolicy'  onClick={()=>setShowMenu(false)}>Privacy Policy</Link>
                       <Link to='/termsandconditions'  onClick={()=>setShowMenu(false)}>Terms & Conditions</Link>
                       <Link to='/contact-us'  onClick={()=>setShowMenu(false)}>Contact Us</Link>
                       <h2 className="title">
       My Account
       </h2>
        <Link to='/login'  onClick={()=>setShowMenu(false)}>Sign in</Link>
                       <Link to='/register'  onClick={()=>setShowMenu(false)}>Register</Link>
                       <Link to='/cart'  onClick={()=>setShowMenu(false)}>View cart</Link>
                       
                       <Link to='/blog'  onClick={()=>setShowMenu(false)}>Blog</Link>
      </div>}
      
    <div className="container">
        <div className="inner">
           <div className='mobile-menu-con'>
            <div className="mobile-menu" onClick={()=>setShowMenu((prev)=> !prev)}>
          <CiMenuFries />
        </div>
            <Link to='/'  className="logo">
                <img alt="Image"  src={Logo} />
            </Link >
           </div>
            
            <div className='right_side'>
            {/* <div className="cart-icon">
                <div className="count">
                  { (wishlist && wishlist.length) ? wishlist.length : 0 }
                </div>
            <CiHeart />
            </div> */}
            <Link to='/checkout' className="name">
              <div className="cart-icon">
                <ShoppingCart  carts={carts} />
               
                <IoCartOutline />
              </div>
            </Link>
            
            {user ? <div className="user-authed" title={user?.name}  onClick={()=>setShowSetting((prev)=> !prev)}> 
          <FaUserGear />
          <span className="text">
            {user?.name}
          </span>
          {showSetting && <div className="setting">
            {user?.role === "customer" ?  <Link className="link" to="user/" >
<LuLayoutDashboard /> Dashboard
            </Link> :  <Link className="link" to="/admin" >
<LuLayoutDashboard /> Dashboard
            </Link>}
            
            <div className="link" onClick={logoutFunction}>
<HiOutlineLogout /> Logout
            </div>
            
          </div>}
          

            </div> : <Link  to='/login' className="user-auth">
      <AiOutlineUser  />
      <span  className="name">Login/Signup</span>
        </Link>} 
            
       
            </div>
           
        </div>
    </div>
</div>
  )
}

export default MainNav