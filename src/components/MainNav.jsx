import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Logo from '../../src/images/logo.png';
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
const MainNav = () => {
  return (
    <div className='main-search-wrapper'>
      
    <div className="container">
        <div className="inner">
            <Link to='/'  className="logo">
                <img alt="Image"  src={Logo} />
            </Link >
            <div className="search-fields">
            <select className='input' >
            <option value="Toronto (GTA)" >Toronto (GTA)</option>
            <option value="Niagara" >Niagara</option>
            <option value="Hamilton" >Hamilton</option>
            <option value="Kitchener/Cambridge" >Kitchener/Cambridge</option>
            <option value="Durham" >Durham</option>
  </select>
  <div className="search-wrapper">
    <IoIosSearch />
    <input type="text" className='input' placeholder='Search for items' />
  </div>
            </div>
            <div className="cart-icon">
                <div className="count">3</div>
            <IoCartOutline />
            </div>
            <button className="user-auth">
      <AiOutlineUser  />
      <Link to='/login' className="name">Login/Signup</Link>
        </button>
        </div>
    </div>
</div>
  )
}

export default MainNav