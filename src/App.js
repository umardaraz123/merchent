import React, { useEffect, useState } from "react";
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
import Advertise from "./pages/Advertise";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import OrderDetails from "./components/OrderDetails";
import './App.css';
//User orders
import Orders1 from "./user/Orders";
import Dashboard1 from "./user/Dashboard";
//admind imports
import AdminLayout from "./components/AdminLayout";
import Orders from "./admin/Orders";
import Dashboard from "./admin/Dashboard";
import Tickets from "./admin/Tickets";
import AdminTicketDetail from "./admin/AdminTicketDetail";
import CreateTicket from "./admin/CreateTicket";
import UpdateTicket from "./admin/UpdateTicket";
import CreateBlog from "./admin/CreateBlog";
import Support from "./admin/Support";
import LocationSearch from "./pages/LocationSearch";
import ProductCard from "./pages/ProductCard";
import CartPage from "./pages/CartPage";
import { checkAndSave, getFromCookies } from "./utils/cookieUtils";
import AuthMiddleware from "./middleware/AuthMiddleware";
import UserLayout from "./components/UserLayout";
function App() {


  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [permissionState, setPermissionState] = useState("checking");

  const saveToLocalStorage = (lat, lng) => {
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);
  };

  const sendCoordinatesInHeader = (lat, lng) => {
    // axios.get("/api/your-endpoint", {
    //   headers: {
    //     "X-Latitude": lat,
    //     "X-Longitude": lng,
    //   },
    // }).then((res) => {
    //   console.log("API response:", res.data);
    // }).catch((err) => {
    //   console.error("API call failed", err);
    // });
  };

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        saveToLocalStorage(latitude, longitude);
        sendCoordinatesInHeader(latitude, longitude);
        setError("");
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Permission denied. Please allow location access.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setPermissionState("unsupported");
      setError("Geolocation not supported by this browser.");
      return;
    }

    checkAndSave();
   


    const storedLat = localStorage.getItem("latitude");
    const storedLng = localStorage.getItem("longitude");

    if (storedLat && storedLng) {
      // Already has permission and location
      setLocation({ latitude: storedLat, longitude: storedLng });
      sendCoordinatesInHeader(storedLat, storedLng);
      return;
    }

    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        setPermissionState(status.state);

        if (status.state === "granted") {
          getGeolocation(); // No prompt
        } else if (status.state === "prompt") {
          getGeolocation(); // Will prompt user
        } else if (status.state === "denied") {
          setError("Location access denied. Change settings to allow.");
        }

        // React to permission changes
        status.onchange = () => {
          setPermissionState(status.state);
          if (status.state === "granted") {
            getGeolocation();
          }
        };
      }).catch(() => {
        getGeolocation(); // Fallback if Permissions API fails
      });
    } else {
      getGeolocation(); // Fallback for older browsers
    }

    
  }, []);

  return (
    <div className="App">
          {/* <div>
      <h3>Geolocation Manager</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        !error && <p>Fetching location...</p>
      )}
    </div> */}


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
           <Route path="/advertise" element={<Advertise />} />
           <Route path="/privacypolicy" element={<PrivacyPolicy />} />
           <Route path="/termsandconditions" element={<TermsAndConditions />} />
           <Route path="/contact-us" element={<ContactUs />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/blog" element={<Blog />} />
           <Route path="/blog-detail/:blogid" element={<BlogDetail />} />

           <Route path="/payment-success" element={<PaymentSuccess />} />
           <Route path="/payment-cancel" element={<PaymentCancel />} />
           <Route path="/location-search" element={<LocationSearch />} />

           <Route path="/product-card" element={<ProductCard />} />
           <Route path="/cart-page" element={<CartPage />} />
            
           
          {/* <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />  */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AuthMiddleware allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard1 />} />
             <Route path="/admin/dashboard" element={<Dashboard1 />} />
            <Route path="/admin/tickets" element={<Tickets />} />
            <Route path="/admin/ticket-detail/:tidd" element={<AdminTicketDetail />} />
            <Route path="/admin/create-ticket" element={<CreateTicket />} />
            <Route path="/admin/update-ticket/:tcid" element={<UpdateTicket />} />
            <Route path="/admin/order-details/:oid" element={<OrderDetails />} />
            <Route path="/admin/create-blog" element={<CreateBlog />} />
            <Route path="/admin/support" element={<Support />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
            
        </Route>
          <Route element={<AuthMiddleware allowedRoles={['customer']} />}>
         <Route path="/user" element={<UserLayout />}>
            <Route index element={<Dashboard1 />} />
             <Route path="/user/order-details/:oid" element={<OrderDetails />} />
           <Route path="/user/dashboard" element={<Dashboard1 />} />
            <Route path="/user/orders" element={<Orders1 />} />
             <Route path="/user/order-details/:oid" element={<OrderDetails />} />
          </Route>
          </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
