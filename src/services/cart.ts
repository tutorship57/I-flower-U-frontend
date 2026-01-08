import { api } from "./api";

export const cartService = {
  getCart: async () => {
    const res = await api.get("/cart");
    return res.data;
  },

  addItem: async (item: any) => {
    const res = await api.post("/cart", item);
    return res.data;
  },
  clear: async () => {
    const res = await api.delete("/cart");
    return res.data;
  }
};

export const cartItemService = {
  getItem: async (cart_id: string) => {
    const res = await api.get(`/cart/${cart_id}/`);
    return res.data;
  },
  addItems: async (cart_id: string, item: any) => {
    const res = await api.post(`/cart/${cart_id}/items`, item);
    return res.data;
  },
  updateItem: async (cart_id: string, item_id: string, item: any) => {
    const res = await api.put(`/cart/${cart_id}/items/${item_id}`, item);
    return res.data;
  },
  deleteItem: async (cart_id: string, item_id: string) => {
    const res = await api.delete(`/cart/${cart_id}/items/${item_id}`);
    return res.data;
  }
}