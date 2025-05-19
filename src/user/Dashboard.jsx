import React from 'react'
import { useUser } from '../contexts/UserContext'
import { FaUserShield } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
const Dashboard = () => {
   const { user} = useUser();
  
  return (
    <div className='dashboard-content'>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="item">
            <div className="name">
              User name:
            </div>
            <div className="value">
             <FaUserShield /> {user?.name}
            </div>
          </div>
        </div>
         <div className="col-12 col-md-6">
          <div className="item">
            <div className="name">
              Joined:
            </div>
            <div className="value">
             <BsCalendar2Date  /> {user?.created_at.substring(0,10)}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="item">
            <div className="name">
              Email:
            </div>
            <div className="value">
             <MdOutlineMarkEmailRead /> {user?.email}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="item">
            <div className="name">
              Phone:
            </div>
            <div className="value">
             <CiMobile4 /> {user?.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard