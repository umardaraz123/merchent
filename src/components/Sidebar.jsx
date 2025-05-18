
import { useEffect, useState } from 'react';

import { RxDashboard } from "react-icons/rx";
import { SiHelpscout, SiReaddotcv } from "react-icons/si";
import { IoTicketSharp } from "react-icons/io5";
import { CgFileAdd } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LuTickets } from "react-icons/lu";
import { useUser } from '../contexts/UserContext';
const Sidebar = () => {
    const { user, login,logout } = useUser();
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
   
  useEffect(() => {
   
   



    if (!user) {
        navigate('/login');
    }
  }, []);

  const logoutFunction = () => {
   logout()
   navigate('/login')
  };

  return (
    <div className="sidebar">
      {user?.role === 'admin' ? <ul>
        <li>
          <Link to="/admin/dashboard" className={pathname === '/admin' ? 'active' : ''}>
            <RxDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/support" className={pathname === '/admin/support' ? 'active' : ''}>
            <SiHelpscout /> Support
          </Link>
        </li>
         <li>
          <Link to="/admin/orders" className={pathname === '/admin/orders' ? 'active' : ''}>
            <LuTickets /> Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/tickets" className={pathname === '/admin/tickets' ? 'active' : ''}>
            <SiReaddotcv /> Tickets
          </Link>
        </li>
        <li>
          <Link to="/admin/create-ticket" className={pathname === '/admin/create-ticket' ? 'active' : ''}>
            <CgFileAdd /> Create Ticket
          </Link>
        </li>
        <li>
          <Link to="/admin/create-blog" className={pathname === '/admin/create-blog' ? 'active' : ''}>
            <ImBlog /> Create Blog
          </Link>
        </li>
        <li>
          <button className='logout' onClick={logoutFunction}>
            <FiLogOut /> Logout
          </button>
        </li>
      </ul> : <ul>
        <li>
          <Link to="/user/dashboard" className={pathname === '/user' ? 'active' : ''}>
            <RxDashboard /> Dashboard
          </Link>
        </li>
        
         <li>
          <Link to="/user/orders" className={pathname === '/user/orders' ? 'active' : ''}>
            <LuTickets /> Orders
          </Link>
        </li>
        
        <li>
          <button className='logout' onClick={logoutFunction}>
            <FiLogOut /> Logout
          </button>
        </li>
      </ul>}
      
    </div>
  );
};

export default Sidebar;
