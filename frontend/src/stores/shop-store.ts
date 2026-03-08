import { create } from "zustand";
import type { Page } from "../types/sidebar";
type SideBarState = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
};

export const useSidebarStore = create<SideBarState>((set) => ({
  currentPage: sessionStorage.getItem("shopPage") as Page | "Dashboard",
  setCurrentPage: (page) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("shopPage", page);
    }
    set({ currentPage: page });
  },
}));
