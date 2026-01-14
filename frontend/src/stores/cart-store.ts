import { create } from "zustand";
import type  { CartTemp } from "../types/cart";

type CartState = {
  items: CartTemp[];
  addItem: (item_id:{product_id: string}, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  cartItemCount: number;
  setLocalStorage: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : [],
  cartItemCount: 0 ,
  setLocalStorage: () => {
    const { items } = get();
    localStorage.setItem("cartItems", JSON.stringify(items));
  },  
  addItem: (newItem: {product_id: string},quantity: number) => {
    set((state) =>{
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.product_id === newItem.product_id
      );
      let updatedItems: CartTemp[] = [];
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        updatedItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return {
        items: existingItemIndex >= 0 ? updatedItems : [...state.items, {...newItem, quantity}],
        cartItemCount: existingItemIndex >= 0 ? state.cartItemCount : state.cartItemCount + 1,
      }
    })
    get().setLocalStorage();
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      return { items: updatedItems };
    })
    get().setLocalStorage();
  },
  removeFromCart: (productId: string) => {
    set((state) => {
      const filteredItems = state.items.filter(
        (item) => item.product_id !== productId
      );
      return { items: filteredItems, cartItemCount: filteredItems.length };
    })
    get().setLocalStorage();
  },
  clear: () => {
    set({ items: [], cartItemCount: 0 });
    localStorage.removeItem("cartItems");
  },
}));
