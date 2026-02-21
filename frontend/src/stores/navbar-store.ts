import { create } from "zustand";
import type { Page } from "../types/navbar";

interface NavBarState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}



export const useNavBarStore = create<NavBarState>((set) => ({
  currentPage: sessionStorage.getItem("currentPage") as Page || "home",
  setCurrentPage: (page: Page) => {
    sessionStorage.setItem("currentPage", page);
    set({ currentPage: page });
  },
}));
