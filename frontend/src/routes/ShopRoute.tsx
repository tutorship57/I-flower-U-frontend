import {useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const ShopRoute = () => {
  const {shopId} = useParams()
  return  (
    <div className="min-h-screen   bg-gray-50">
      <SideBar />
      <div className="ml-64 p-6">
       <Outlet context= {shopId} />
      </div>
    </div>
  ) 

};

export default ShopRoute;
