import { Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'lucide-react';
const AdminRoute = () => {
  const role = "admin";
   
  return role === 'admin' ? (
    <div className="min-h-screen bg-gray-50">
        <Sidebar/> 
        <Outlet/>

    </div>
  ) : <Navigate to="/login" replace />; ;

}

export default AdminRoute;
