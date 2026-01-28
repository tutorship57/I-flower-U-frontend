import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/auth-store";
// import Footer from "../components/Footer";

import Footer from "../components/Footer";
const UserRoute = () => {
  const {fetchCurrentUser} = useAuthStore();
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
  
};

export default UserRoute;
