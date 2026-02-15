import { create } from "zustand";
type NavBarState = any;

type Page = "home" | "shop" | "cart" | "profile" | "login" | "register" | "productInfo";


export const useNavBarStore = create<NavBarState>((set) => ({
  currentPage: sessionStorage.getItem("currentPage") || "home",
  setCurrentPage: (page: Page) => {
    sessionStorage.setItem("currentPage", page);
    set({ currentPage: page });
  },
}));
