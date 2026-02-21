import { create } from "zustand";
import type  { CartTemp } from "../types/cart";
import { userService } from "../services/user.service";
import type { UserData } from "../types/user";
type CartState = {
  cart_id: string | null;
  items: CartTemp[];
  isLoading: boolean;
  addItem: (item_id:{product_id: string}, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  cartItemCount: number;
  setLocalStorage: () => void;
  setCart_id: () =>  Promise<void> ;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart_id:null,
  isLoading: true,
  items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : [],
  cartItemCount: 0 ,
  setLocalStorage: () => {
    const { items } = get();
    localStorage.setItem("cartItems", JSON.stringify(items));
  },  
  setCart_id: async () : Promise<void> => {
    try {
          const res= await userService.getProfile();
          const data: UserData = res.data;
          set({ cart_id: data.carts[0].cart_id });
          set({ isLoading: false });
        } catch(err) {
          console.log(err)
          set({ isLoading: false });
        }
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
      
      if (quantity < 1) {
        const updatedItems = state.items.filter((item) => item.product_id !== productId);
        return { items: updatedItems };
      }

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
