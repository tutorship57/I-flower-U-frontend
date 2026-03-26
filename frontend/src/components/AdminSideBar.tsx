import { LayoutDashboard, Users, Store, Settings, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/shops", icon: Store, label: "Shops" },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 flex flex-col">

      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-100">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-tight">Admin Panel</h1>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Management</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <nav className="p-4 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/admin" && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-rose-500 text-white shadow-md shadow-rose-100"
                  : "text-gray-500 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Action - Back to Home */}
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
            <Home className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;