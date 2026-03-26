// export default App;
import LoginPage from "./pages/user-pages/LoginPage";
import ShopProductsPage from "./pages/shop-pages/ProductsPage";
import { ToastContainer } from 'react-toastify';
import AdminRoute from "./routes/AdminRoute";
import ShopRoute from "./routes/ShopRoute";
import UserRoute from "./routes/UserRoute";
import UserProductsPage from "./pages/user-pages/ProductsPage";
import ProductInfoPage from "./pages/user-pages/ProductInfoPage";
import CartPage from "./pages/user-pages/CartPage";
import HomePage from "./pages/user-pages/HomePage";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/shop-pages/DashboardPage";
import OrdersPage from "./pages/shop-pages/OrdersPage";
import ShopSettingsPage from "./pages/shop-pages/ShopSettingsPage";
import CheckoutSuccess from "./pages/user-pages/CheckoutSuccess";
//เพิ่ม
import Recommend from "./pages/user-pages/Recommend";
import ShopRedirectRoute from "./routes/ShopRedirectRoute";
import NotfoundPage from "./pages/NotfoundPage";
import CreateStore from "./pages/user-pages/CreateStore";
import CategoriesPage from "./pages/user-pages/CategoriesPage";
import Search from "./pages/user-pages/Search";
import AboutPage from "./pages/user-pages/AboutPage";
import PaymentPage from "./pages/user-pages/PaymentPage";
import UserProfile from "./pages/user-pages/UserProfile";
import WishlistPage from "./pages/user-pages/WishlistPage";
import HistoryPage from "./pages/user-pages/HistoryPage";
import AdminSideBar from "./components/AdminSideBar";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin-pages/Admindashboard";
import AdminManageShops from "./pages/admin-pages/AdminShops";
import AdminManageUsers from "./pages/admin-pages/AdminUsers";
import PaymentSuccessPage from "./pages/user-pages/PaymentsuccessPage";




// Navigation Component

const App = () => {

  // const cartItemCount = cart.reduce((sum:any, item:any) => sum + item.quantity, 0);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<UserRoute/>}>
          <Route path="" element={<HomePage/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="search" element={<Search/>}/>
          <Route path="products" element={<UserProductsPage/>}/>
          <Route path="productInfo/:productId" element={<ProductInfoPage />}/>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="create-store" element={<CreateStore/>}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="checkout/success" element={<CheckoutSuccess/>}/>
          <Route path="payment" element={<PaymentPage />} />
          <Route path="payment/success" element={<PaymentSuccessPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="history" element={<HistoryPage />} />
          {/* เพิ่ม */}
          <Route path="recommend" element={<Recommend/>} />
          {/* <Route path="checkout" element={}/> */}
          {/* <Route path="checkout/:orderId" element={<CartPage/>}/> */}
        </Route>
        
       

        {/* <Route path="/admin/*" element={<AdminRoute/>}>

        </Route> */}
        {/* <Route path="/admin" element={<AdminRoute />}>
           <Route index element={<AdminDashboard />} />
           <Route path="users" element={<AdminManageUsers />} />
           <Route path="shops" element={<AdminManageShops />} />
         </Route> */}
         <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminManageUsers />} />
            <Route path="shops" element={<AdminManageShops />} />
          </Route>
        </Route>

        <Route path="/shop" element={<ShopRedirectRoute/>}>

          <Route path=":shopId" element={<ShopRoute/>}>
            <Route index element={<DashboardPage/>} />
            <Route path="dashboard" element={<DashboardPage/>} />
            <Route path="products" element={<ShopProductsPage/>} />
            <Route path="orders" element={<OrdersPage/>} />
            <Route path="settings" element={<ShopSettingsPage/>} />
          </Route>

        </Route>
        <Route path="*" element={<NotfoundPage/>}/>

       
      </Routes>
    </>
  )
  
};

export default App;

// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// // ─── USER PAGES ─────────────────────────
// import UserRoute from "./routes/UserRoute";
// import HomePage from "./pages/user-pages/HomePage";
// import LoginPage from "./pages/user-pages/LoginPage";
// import UserProfile from "./pages/user-pages/UserProfile";
// import UserProductsPage from "./pages/user-pages/ProductsPage";
// import ProductInfoPage from "./pages/user-pages/ProductInfoPage";
// import CategoriesPage from "./pages/user-pages/CategoriesPage";
// import AboutPage from "./pages/user-pages/AboutPage";
// import CartPage from "./pages/user-pages/CartPage";
// import PaymentPage from "./pages/user-pages/PaymentPage";
// import CheckoutSuccess from "./pages/user-pages/CheckoutSuccess";
// import CreateStore from "./pages/user-pages/CreateStore";
// import WishlistPage from "./pages/user-pages/WishlistPage";
// import Recommend from "./pages/user-pages/Recommend";
// import Search from "./pages/user-pages/Search";

// // ─── SHOP (SELLER) ──────────────────────
// import ShopRoute from "./routes/ShopRoute";
// import DashboardPage from "./pages/shop-pages/DashboardPage";
// import ShopProductsPage from "./pages/shop-pages/ProductsPage";
// import OrdersPage from "./pages/shop-pages/OrdersPage";
// import ShopSettingsPage from "./pages/shop-pages/ShopSettingsPage";

// // ─── ADMIN ──────────────────────────────
// import AdminRoute from "./routes/AdminRoute";

// // (temporary pages ก่อนทำจริง)
// const AdminDashboard = () => <div className="p-6">Admin Dashboard</div>;
// const AdminUsers = () => <div className="p-6">Manage Users</div>;
// const AdminShops = () => <div className="p-6">Manage Shops</div>;
// const AdminReviews = () => <div className="p-6">Review Moderation</div>;
// const AdminAnalytics = () => <div className="p-6">Analytics</div>;

// // ─── OTHER ──────────────────────────────
// import NotfoundPage from "./pages/NotfoundPage";

// const App = () => {
//   return (
//     <>
//       <ToastContainer />

//       <Routes>
//         {/* Not found page */}
//         <Route path="*" element={<NotfoundPage />} />

//         {/* ================= USER ================= */}
//         <Route path="/" element={<UserRoute />}>
//           <Route index element={<HomePage />} />
//           <Route path="login" element={<LoginPage />} />
//           <Route path="profile" element={<UserProfile />} />

//           <Route path="products" element={<UserProductsPage />} />
//           <Route path="productInfo/:productId" element={<ProductInfoPage />} />
//           <Route path="categories" element={<CategoriesPage />} />
//           <Route path="about" element={<AboutPage />} />

//           <Route path="cart" element={<CartPage />} />
//           <Route path="payment" element={<PaymentPage />} />
//           <Route path="checkout/success" element={<CheckoutSuccess />} />

//           <Route path="create-store" element={<CreateStore />} />
//           <Route path="wishlist" element={<WishlistPage />} />
//           <Route path="recommend" element={<Recommend />} />
//           <Route path="search" element={<Search />} />
//         </Route>

//         {/* ================= SHOP (SELLER) ================= */}
//         <Route path="/shop/:shopId" element={<ShopRoute />}>
//           <Route index element={<DashboardPage />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="products" element={<ShopProductsPage />} />
//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="settings" element={<ShopSettingsPage />} />
//         </Route>

//         {/* ================= ADMIN ================= */}
//         <Route path="/admin" element={<AdminRoute />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="shops" element={<AdminShops />} />
//           <Route path="reviews" element={<AdminReviews />} />
//           <Route path="analytics" element={<AdminAnalytics />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;