import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import MainNav from "./MainNav";

const PublicLayout = () => {
  return (
    <div>
    <MainNav />
      <main>
        <Outlet /> {/* Nested routes will render here */}
      </main>
   <Footer />
    </div>
  )
}

export default PublicLayout