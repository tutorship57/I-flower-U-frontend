import { useEffect } from "react";
import {Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/auth-store";
// import Footer from "../components/Footer";

import Footer from "../components/Footer";
import { useCartStore } from "../stores/cart-store";
const UserRoute = () => {
  const {fetchCurrentUser,loading : isUserLoading} = useAuthStore();
  const {setCart_id,isLoading : isCartLoading} = useCartStore();
  useEffect(() => {
    const init = async()=>{
      await Promise.all([
        fetchCurrentUser(),
        setCart_id()
      ]);
    }
    init();
  }, []);
  return isUserLoading || isCartLoading ? null : (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default UserRoute;
