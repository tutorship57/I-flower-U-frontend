import type { NavigateFunction } from "react-router";
import type { Page } from "../types/navbar";
export const useNavBarDesktop = (setCurrentPage: (page: Page) => void,navigate: NavigateFunction,logout:()=>void) =>{
    const handleClickToLogin = ()=>{
    setCurrentPage('profile')
    navigate('/login');
  }

  const handleClicktoHome = ()=>{
    setCurrentPage('home');
    navigate('/');
  }

  const handleClickToProfile = ()=>{
    setCurrentPage('profile');
    navigate('/profile');
  }

  const handleClickToProducts = ()=>{
    setCurrentPage('products');
    navigate('/products');
  }

  const handleClickToCart = ()=>{
    setCurrentPage('cart');
    navigate('/cart');
  }

  const handleClickToLogout = ()=>{
    logout();
    setCurrentPage('home');
    navigate('/');
  }

  const handleClickToCategory = ()=>{
    setCurrentPage('categories');
    navigate('/categories');
  }

  const handleClickToAbout = ()=>{
    setCurrentPage('about');
    navigate('/about');
  }

   const handleClickToHistory = ()=>{
    setCurrentPage('history');
    navigate('/history');
  }

  return {
    handleClickToLogin,
    handleClicktoHome,
    handleClickToProfile,
    handleClickToProducts,
    handleClickToCart,
    handleClickToLogout,
    handleClickToCategory,
    handleClickToAbout,
    handleClickToHistory
  }
}