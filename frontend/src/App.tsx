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





// Navigation Component

const App = () => {

  // const cartItemCount = cart.reduce((sum:any, item:any) => sum + item.quantity, 0);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotfoundPage/>}/>
        <Route path="/" element={<UserRoute/>}>
          <Route path="" element={<HomePage/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="products" element={<UserProductsPage/>}/>
          <Route path="productInfo/:productId" element={<ProductInfoPage />}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="checkout/success" element={<CheckoutSuccess/>}/>
          {/* เพิ่ม */}
          <Route path="recommend" element={<Recommend/>} />
          {/* <Route path="checkout" element={}/> */}
          {/* <Route path="checkout/:orderId" element={<CartPage/>}/> */}

        </Route>

        <Route path="/admin/*" element={<AdminRoute/>}>

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

       
      </Routes>
    </>
  )
  
};

export default App;
