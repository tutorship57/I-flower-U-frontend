
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar อยู่คงที่ทางซ้าย */}
      <AdminSidebar />

      {/* Content Area */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;