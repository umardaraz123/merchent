import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// public imports 
import PublicLayout from "./components/PublicLayout";
import TicketDetail from "./pages/TicketDetail";
import Categories from "./pages/Categories";
import Trendings from "./pages/Trendings";
import NewDeals from "./components/NewDeals";
import Deals from "./components/Deals";
import EndingSoonTickets from "./components/EndingSoonTickets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import './App.css';
//admind imports
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Tickets from "./admin/Tickets";
import AdminTicketDetail from "./admin/AdminTicketDetail";
import CreateTicket from "./admin/CreateTicket";
import UpdateTicket from "./admin/UpdateTicket";
import CreateBlog from "./admin/CreateBlog";
import Support from "./admin/Support";
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
           <Route index element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/tickets/:tid" element={<TicketDetail />} />
           <Route path="/categories/:catid" element={<Categories />} />
           <Route path="/trendings" element={<Trendings />} />
           <Route path="/new-deals" element={<NewDeals />} />
           <Route path="/deals" element={<Deals />} />
           <Route path="/ending-soon" element={<EndingSoonTickets />} />
           <Route path="/about" element={<AboutUs />} />
           <Route path="/privacypolicy" element={<PrivacyPolicy />} />
           <Route path="/termsandconditions" element={<TermsAndConditions />} />
           <Route path="/contact-us" element={<ContactUs />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/blog" element={<Blog />} />
           <Route path="/blog-detail/:blogid" element={<BlogDetail />} />

           <Route path="/payment-success" element={<PaymentSuccess />} />
           <Route path="/payment-cancel" element={<PaymentCancel />} />
          {/* <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />  */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/tickets" element={<Tickets />} />
          <Route path="/admin/ticket-detail/:tidd" element={<AdminTicketDetail />} />
          <Route path="/admin/create-ticket" element={<CreateTicket />} />
          <Route path="/admin/update-ticket/:tcid" element={<UpdateTicket />} />
          <Route path="/admin/create-blog" element={<CreateBlog />} />
          <Route path="/admin/support" element={<Support />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
