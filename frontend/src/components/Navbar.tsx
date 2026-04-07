import { useState } from "react";
import {
  ShoppingCart,
  User,
  Store,
  Menu,
  X,
  Clock7,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavBarStore } from "../stores/navbar-store";
import { useAuthStore } from "../stores/auth-store";
import { useCartStore } from "../stores/cart-store";
import { useNavigate } from "react-router";
import { useNavBarDesktop } from "../hooks/useHandleNavbarDesktop";
import SearchBar from "../pages/user-pages/Search";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { currentPage, setCurrentPage } = useNavBarStore();
  const {clear} = useCartStore()
  const { isLoggedIn, user, logout, shop_id, role,fetchCurrentUser } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();

  const isAdmin = role === "ADMIN";

  const {
    handleClickToCart,
    handleClickToLogin,
    handleClickToLogout,
    handleClickToProfile,
    handleClickToProducts,
    handleClicktoHome,
    handleClickToCategory,
    handleClickToAbout,
    handleClickToHistory,
  } = useNavBarDesktop(setCurrentPage, navigate, ()=>{
    logout()
    clear()
  });

  // ────────────────────────────────────────────

  // const handleStoreClick = () => {
  //   if (!isLoggedIn) {
  //     alert("Please log in to access your store.");
  //     handleClickToLogin();
  //     return;
  //   }

  //   if (!shop_id) {
  //     navigate("/create-store");
  //     return;
  //   }

  //   setCurrentPage("shop");
  //   navigate(`/shop/${shop_id}/dashboard`);
  // };

  //2
//   const handleStoreClick = () => {
//   console.log("Current Auth State:", { isLoggedIn, shop_id, role }); // <--- ใส่บรรทัดนี้เพื่อดูค่า

//   if (!isLoggedIn) {
//     navigate("/login");
//     return;
//   }

//   // ถ้ามี shop_id แล้ว ให้ไป dashboard เลย
//   if (shop_id) {
//     navigate(`/shop/${shop_id}/dashboard`);
//     return;
//   }

//   // ถ้ายังไม่มี shop_id ถึงจะไปหน้าสร้างร้าน
//   navigate("/create-store");
// };

//3
const handleStoreClick = async () => { // เพิ่ม async
  if (!isLoggedIn) {
    alert("Please log in to access your store.");
    handleClickToLogin();
    return;
  }

  // 🔥 จุดสำคัญ: ถ้าใน Store ยังไม่มี shop_id ให้ลองสั่ง fetch ใหม่หนึ่งรอบเผื่อข้อมูลเพิ่งมา
  if (!shop_id) {
    console.log("Shop ID not found in store, fetching latest profile...");
    await fetchCurrentUser(); 
  }

  // ดึงค่าล่าสุดจาก Store อีกครั้ง (ใช้ค่าจาก useAuthStore.getState() หรือเช็คซ้ำ)
  const latestShopId = useAuthStore.getState().shop_id;

  if (latestShopId) {
    setCurrentPage("shop");
    navigate(`/shop/${latestShopId}/dashboard`);
  } else {
    // ถ้า fetch ใหม่แล้วยังไม่มีจริงๆ ถึงค่อยไปหน้าสร้างร้าน
    navigate("/create-store");
  }
};
  // ──────────────────────────────────────────────

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─── Top Bar ───────────────── */}
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <button onClick={handleClicktoHome} className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/logo_ifloweru.png" alt="logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              IflowerU
            </span>
          </button>

          {/* ─── Desktop Menu ───────────────── */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleClicktoHome}
              className={`${currentPage === "home" ? "text-rose-500" : "text-gray-700 hover:text-rose-500"}`}
            >
              Home
            </button>

            <button
              onClick={handleClickToProducts}
              className={`${currentPage === "products" ? "text-rose-500" : "text-gray-700 hover:text-rose-500"}`}
            >
              Products
            </button>

            <button
              onClick={handleClickToCategory}
              className={`${currentPage === "categories" ? "text-rose-500" : "text-gray-700 hover:text-rose-500"}`}
            >
              Categories
            </button>

            <button
              onClick={handleClickToAbout}
              className={`${currentPage === "about" ? "text-rose-500" : "text-gray-700 hover:text-rose-500"}`}
            >
              About
            </button>
          </div>

          {/* ─────────────────────Right ───────────────── */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />

            {/* Store */}
            {!isAdmin && (
              <button onClick={handleStoreClick} className="p-2 hover:bg-gray-100 rounded-full">
                <Store className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {/* History */}
            {!isAdmin && (
              // <button className="p-2 hover:bg-gray-100 rounded-full">
              //   <Clock7 className="w-5 h-5 text-gray-700" />
              // </button>
              <button onClick={handleClickToHistory} className="p-2 hover:bg-gray-100 rounded-full">
                <Clock7 className="w-5 h-5 text-gray-700" />
              </button>
            )}

            {/* Cart */}
            {!isAdmin && (
              <button onClick={handleClickToCart} className="p-2 relative hover:bg-gray-100 rounded-full">
                <ShoppingCart
                  className={`w-5 h-5 ${currentPage === "cart" ? "text-rose-500" : "text-gray-700"}`}
                />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            )}

            {/* Auth */}
            {!isLoggedIn ? (
              <button onClick={handleClickToLogin} className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={handleClickToProfile} className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">{user}</span>

                  {isAdmin && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-bold">
                      Admin
                    </span>
                  )}
                </button>

                <button onClick={handleClickToLogout} className="p-2 hover:bg-gray-100 rounded-full">
                  <LogOut className="w-5 h-5 text-rose-700" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ─── Mobile Menu ───────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">

            <button onClick={() => { setCurrentPage("home"); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Home
            </button>

            <button onClick={() => { setCurrentPage("products"); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Products
            </button>

            {/* Store */}
            {!isAdmin && (
              <button
                onClick={() => {
                  handleStoreClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Store
              </button>
            )}

            {/* Cart */}
            {!isAdmin && (
              <button
                onClick={() => {
                  setCurrentPage("cart");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cart ({items.length})
              </button>
            )}

            {/* Auth */}
            <button
              onClick={() => {
                isLoggedIn ? handleClickToLogout() : handleClickToLogin();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
