import { create } from "zustand";
import type  { CartTemp } from "../types/cart";
import { userService } from "../services/user.service";
import type { UserData } from "../types/user";
import type { ProductSchema2 } from "../types/product";
import { cartService } from "../services/cart.service";
import { cartItemService } from "../services/cart-item.service"

type CartState = {
  cart_id: string | null;
  items: CartTemp[];
  isLoading: boolean;
  addItem: (item_id:ProductSchema2, quantity: number) => void;
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
  // setCart_id: async () : Promise<void> => {
  //   try {
  //         const res= await userService.getProfile();
  //         const data: UserData = res.data;
  //         console.log("🛒 carts from profile:", data.carts)
  //         console.log("🛒 cart_id:", data.carts?.[0]?.cart_id)
  //         // set({ cart_id: data.carts[0].cart_id });
  //         set({ cart_id: data.carts?.[0]?.cart_id || null }); //แทนอันบน
  //         set({ isLoading: false });
  //       } catch(err) {
  //         console.log(err)
  //         set({ isLoading: false });
  //       }
  // },
  setCart_id: async () : Promise<void> => {
    try {
      const res = await userService.getProfile();
      const data: UserData = res.data;
      
      let cartId = data.carts?.[0]?.cart_id || null;

      // ถ้าไม่มี cart ให้สร้างใหม่เลย
      if (!cartId) {
        console.log("🛒 ไม่มี cart สร้างใหม่...")
        const newCart = await cartService.addItem({user_id: data.user_id}) // สร้าง cart ใหม่
        console.log("🛒 full response:", JSON.stringify(newCart))
        cartId = newCart.data?.cart_id || null
        console.log("🛒 cart ใหม่:", cartId)
      }
      // เพิ่ม sync items จาก localStorage ขึ้น database
      if (cartId) {
        const currentItems = get().items
        for (const item of currentItems) {
          try {
            await cartItemService.addItems(cartId, {
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.product_price
            })
          } catch (err) {
            console.log("sync item error:", err)
          }
        }
      }

      set({ cart_id: cartId, isLoading: false });
    } catch(err) {
      console.log(err)
      set({ isLoading: false });
    }
  },

  addItem: (newItem: ProductSchema2,quantity: number) => {
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
