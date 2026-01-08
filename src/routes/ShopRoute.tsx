import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
const ShopRoute = () => {
  // const { role, loading, isLoggedIn, fetchCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const role = "seller";
  // useEffect(() => {
  //   fetchCurrentUser(); // โหลด session ตอนเข้า
  // }, []);

  // useEffect((): void => {
  //   const invalidUser = !loading && (!isLoggedIn || role !== "seller")  
  //   if (invalidUser) {
  //     navigate("/login", { replace: true });
  //     return ;
  //   }
  // }, [loading, isLoggedIn, role, navigate]);

  // if (loading) {
  //   return <div>กำลังโหลด...</div>;
  // }

  return role ==='seller' ? (
    <div className="min-h-screen   bg-gray-50">
      <SideBar />
      <div className="ml-64 p-6">
       <Outlet />
        
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );

};

export default ShopRoute;
