import { create } from "zustand";
import type { Page } from "../types/sidebar";
type SideBarState = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
};

export const useSidebarStore = create<SideBarState>((set) => ({
  currentPage: "Dashboard",
  setCurrentPage: (page) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopPage", page);
    }
    set({ currentPage: page });
  },
}));
