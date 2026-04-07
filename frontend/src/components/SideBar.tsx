// import { BarChart3, Package, ShoppingCart, Settings, Store } from 'lucide-react';
// import { useSidebarStore } from '../stores/shop-store';
// import type { Page } from '../types/sidebar';
// import { useAuthStore } from '../stores/auth-store';
// import { useNavigate, useParams } from 'react-router';
// const SideBar = () => {
//     const menuItems = [
//       { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
//       { id: 'products', icon: Package, label: 'Products' },
//       { id: 'orders', icon: ShoppingCart, label: 'Orders' },
//       { id: 'settings', icon: Settings, label: 'Shop Settings' }
//     ];
//     const { currentPage, setCurrentPage } = useSidebarStore();
//     const { shop_name } = useAuthStore()
//     const navigate = useNavigate();
//     const {shopId} = useParams()

//     return (
//       <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
//               <Store className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="font-bold text-lg text-gray-900">{shop_name === null  ? 'Bloom Market' :`${shop_name} `}</h1>
//               <p className="text-xs text-gray-600">Seller Management</p>
//             </div>
//           </div>
//         </div>

//         <nav className="p-4 space-y-1">
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 const nextPage = item.id 
//                 setCurrentPage(item.id as Page)
//                 navigate(`/shop/${shopId}/${nextPage}`);
//               }}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                 currentPage === item.id
//                   ? 'bg-rose-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
//     );
//   };

// export default SideBar;


// import { BarChart3, Package, ShoppingCart, Settings, Store, Home } from 'lucide-react';
// import { useSidebarStore } from '../stores/shop-store';
// import type { Page } from '../types/sidebar';
// import { useAuthStore } from '../stores/auth-store';
// import { useNavigate, useParams } from 'react-router';
// import { useShopInfo } from '../queries/shop/shop-info.query';

// const SideBar = () => {
//     const menuItems = [
//       { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
//       { id: 'products', icon: Package, label: 'Products' },
//       { id: 'orders', icon: ShoppingCart, label: 'Orders' },
//       { id: 'settings', icon: Settings, label: 'Shop Settings' }
//     ];
    
//     const { currentPage, setCurrentPage } = useSidebarStore();
//     const { shop_name } = useAuthStore();
//     const navigate = useNavigate();
//     const { shopId } = useParams();

//     return (
//       <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 flex flex-col">
        
//         {/* Header Section */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
//               <Store className="w-5 h-5 text-white" />
//             </div>
//             <div className="overflow-hidden">
//               <h1 className="font-bold text-base text-gray-900 truncate">
//                 {shop_name === null ? 'Bloom Market' : shop_name}
//               </h1>
//               <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Seller Panel</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="p-4 space-y-1 flex-1">
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setCurrentPage(item.id as Page);
//                 navigate(`/shop/${shopId}/${item.id}`);
//               }}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                 currentPage === item.id
//                   ? 'bg-rose-500 text-white shadow-md shadow-rose-100'
//                   : 'text-gray-500 hover:bg-rose-50 hover:text-rose-600'
//               }`}
//             >
//               <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-white' : 'text-gray-400'}`} />
//               <span className="font-semibold text-sm">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//          {/* Bottom Action - Back to Home */}
//       <div className="p-4 border-t border-gray-50">
//         <button
//           onClick={() => navigate("/")}
//           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all group"
//         >
//           <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
//             <Home className="w-4 h-4" />
//           </div>
//           <span className="font-bold text-sm">Back to Home</span>
//         </button>
//       </div>
//     </div>
//     );
//   };

// export default SideBar;

import { BarChart3, Package, ShoppingCart, Settings, Store, Home } from 'lucide-react';
import { useSidebarStore } from '../stores/shop-store';
import type { Page } from '../types/sidebar';
import { useNavigate, useParams } from 'react-router';
import { useShopInfo } from '../queries/shop/shop-info.query'; // นำเข้า Query มาใช้ดึงข้อมูลปัจจุบัน

const SideBar = () => {
    const menuItems = [
      { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
      { id: 'products', icon: Package, label: 'Products' },
      { id: 'orders', icon: ShoppingCart, label: 'Orders' },
      { id: 'settings', icon: Settings, label: 'Shop Settings' }
    ];
    
    const { currentPage, setCurrentPage } = useSidebarStore();
    const navigate = useNavigate();
    const { shopId } = useParams();

    // ดึงข้อมูลร้านค้าจาก React Query Cache (ตัวเดียวกับที่หน้า Settings ใช้)
    // เมื่อข้อมูลที่ Server เปลี่ยน Query จะทำการ re-fetch และ Update ให้ Sidebar เปลี่ยนตามอัตโนมัติ
    const { data: shopInfo } = useShopInfo(shopId || "");

    return (
      <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 flex flex-col">
        
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-base text-gray-900 truncate">
                {/* ถ้ามีข้อมูลให้แสดง shop_name ถ้าไม่มีให้แสดง Default */}
                {shopInfo?.shop_name || 'Bloom Market'}
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Seller Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 flex-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id as Page);
                navigate(`/shop/${shopId}/${item.id}`);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-100'
                  : 'text-gray-500 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-white' : 'text-gray-400'}`} />
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
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

export default SideBar;