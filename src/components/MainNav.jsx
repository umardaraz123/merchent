import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Logo from '../../src/images/logo.png';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useCart } from "../contexts/CartContext";
import { FaHeart,FaEye } from "react-icons/fa";



const MainNav = () => {

  const { wishlist, cart } = useCart();


  return (
    <div className='main-search-wrapper'>
      
    <div className="container">
        <div className="inner">
            <Link to='/'  className="logo">
                <img alt="Image"  src={Logo} />
            </Link >
            <div className="search-fields">
              <div className="search-btn">
              <IoIosSearch />
              </div>
            
            <div className="search-wrapper">
              <IoIosSearch />
              <input type="text" className='input' placeholder='Search for items' />
            </div>
            <select className='input' >
              <option value="Toronto (GTA)" >Toronto (GTA)</option>
              <option value="Niagara" >Niagara</option>
              <option value="Hamilton" >Hamilton</option>
              <option value="Kitchener/Cambridge" >Kitchener/Cambridge</option>
              <option value="Durham" >Durham</option>
            </select>
            </div>
            <div className='right_side'>
            <div className="cart-icon">
                <div className="count">
                  { (wishlist && wishlist.length) ? wishlist.length : 0 }
                </div>
            <CiHeart />
            </div>
            <div className="cart-icon">
                <div className="count">
                  {cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0}
                </div>
            <IoCartOutline />
            </div>
            <button className="user-auth">
      <AiOutlineUser  />
      <Link to='/login' className="name">Login/Signup</Link>
        </button>
            </div>
           
        </div>
    </div>
</div>
  )
}

export default MainNav