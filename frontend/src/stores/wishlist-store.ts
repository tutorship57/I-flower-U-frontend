import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductSchema2 } from "../types/product";

type WishlistState = {
  items: ProductSchema2[];
  addItem: (product: ProductSchema2) => void;
  removeItem: (product_id: string) => void;
  toggleItem: (product: ProductSchema2) => void;
  isWishlisted: (product_id: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.find((i) => i.product_id === product.product_id);
        if (!exists) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (product_id) => {
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== product_id),
        }));
      },

      toggleItem: (product) => {
        const exists = get().items.find((i) => i.product_id === product.product_id);
        if (exists) {
          get().removeItem(product.product_id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (product_id) => {
        return !!get().items.find((i) => i.product_id === product_id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "ifloweru-wishlist", // localStorage key
    }
  )
);