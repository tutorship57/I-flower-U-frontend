import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const ShopRoute = () => {
  const role = "seller";

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
