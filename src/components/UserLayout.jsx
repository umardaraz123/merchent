import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../../src/admin.css'
import Sidebar from "./Sidebar";

const UserLayout = () => {
  return (
    <div className="admin-container">
    <div className="siderbar-wrapper">
            <Sidebar />
          </div>
      <main className="admin-content">
        <Outlet />
      </main>
  
    </div>
  )
}

export default UserLayout