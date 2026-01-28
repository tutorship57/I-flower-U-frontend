import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search, User, Heart, Menu, X } from 'lucide-react';
import { LogOut } from "lucide-react"; //เพิ่ม
import { useNavBarStore } from '../stores/navbar-store';
import { useAuthStore } from '../stores/auth-store';
import { useCartStore } from '../stores/cart-store';
import { useNavigate } from 'react-router';



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {currentPage,setCurrentPage} = useNavBarStore();
  // const {isLoggedIn} = useAuthStore();
  const { isLoggedIn, user, logout} = useAuthStore(); //แก้จากอันบน
  const {items} = useCartStore();
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/' + (currentPage === 'home' ? '' : currentPage));
  },[currentPage])
  console.log("Cart items in Navbar:", items);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🌸</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                IFLOWERU
              </span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`${currentPage === 'home' ? 'text-rose-500' : 'text-gray-700 hover:text-rose-500'} transition`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className={`${currentPage === 'products' ? 'text-rose-500' : 'text-gray-700 hover:text-rose-500'} transition`}
            >
              Products
            </button>
            <button className="text-gray-700 hover:text-rose-500 transition">Categories</button>
            <button className="text-gray-700 hover:text-rose-500 transition">About</button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            {/* <button
              onClick={() => isLoggedIn ? setCurrentPage('profile') : setCurrentPage('login')}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button> */}

            
            {!isLoggedIn ? (
              <button
                onClick={() => setCurrentPage('login')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full hover:bg-gray-100"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {user}
                  </span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setCurrentPage("home");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-rose-700" />
                </button>
              </div>
            )}


          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Products
            </button>
            <button
              onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cart ({items.length})
            </button>
            <button
              onClick={() => { isLoggedIn ? setCurrentPage('profile') : setCurrentPage('login'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar
