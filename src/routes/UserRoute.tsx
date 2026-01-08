import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import Footer from "../components/Footer";
const UserRoute = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
  
};

export default UserRoute;
