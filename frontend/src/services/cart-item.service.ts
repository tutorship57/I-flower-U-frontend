import { api } from "./api";
import type { CreateCartItemData,UpdateCartItemData } from "../types/cart-items";

export const cartItemService = {
  getItem: async (cart_id: string) => {
    const res = await api.get(`/cart/${cart_id}/`);
    return res.data;
  },
  addItems: async (cart_id: string, data:CreateCartItemData) => {
    const res = await api.post(`/cart/${cart_id}/cart-item/`,data);
    return res.data;
  },
  updateItem: async (cart_id: string, product_id: string,data:UpdateCartItemData) => {
    const res = await api.put(`/cart/${cart_id}/cart-item/${product_id}`,data);
    return res.data;
  },
  deleteItem: async (cart_id: string, product_id: string) => {
    const res = await api.delete(`/cart/${cart_id}/cart-item/${product_id}`);
    return res.data;
  }
}