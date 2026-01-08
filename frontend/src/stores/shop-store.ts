import { create } from "zustand";
import type { Role } from "../types/role";
type SideBarState = any;

type Page = "Dashboard" | "Products" | "Orders" | "Settings";


export const useSidebarStore = create<SideBarState>((set, get) => ({
  currentPage: localStorage.getItem("shopPage") || "home",
  setCurrentPage: (page: Page) => {
    localStorage.setItem("shopPage", page);
    set({ currentPage: page });
  },
}));
