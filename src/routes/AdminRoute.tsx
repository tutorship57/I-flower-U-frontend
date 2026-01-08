import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth-store'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Sidebar } from 'lucide-react';
const AdminRoute = () => {
  // const { role, loading, isLoggedIn, fetchCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const role = "admin";
  // useEffect(() => {
  //   fetchCurrentUser();       
  // }, []);

  // useEffect(() => {
  //   if (!loading && (!isLoggedIn || role !== "admin")) {
  //     navigate("/login", { replace: true });
  //     return;
  //   }
  // }, [loading, isLoggedIn, role, navigate]);

  // if (loading) {
  //   return <div>กำลังโหลด...</div>;
  // }
   
  return role === 'admin' ? (
    <div className="min-h-screen bg-gray-50">
        <Sidebar/> 
        <Outlet/>

    </div>
  ) : <Navigate to="/login" replace />; ;

}

export default AdminRoute;
