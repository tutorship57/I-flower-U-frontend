import { create } from "zustand";
import type { Role } from "../types/role";
type NavBarState = any;

type Page = "home" | "shop" | "cart" | "profile" | "login" | "register" | "productInfo";


export const useNavBarStore = create<NavBarState>((set, get) => ({
  currentPage: localStorage.getItem("currentPage") || "home",
  setCurrentPage: (page: Page) => {
    localStorage.setItem("currentPage", page);
    set({ currentPage: page });
  },

}));
