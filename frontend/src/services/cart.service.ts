import { api } from "./api";

export const cartService = {
  getCart: async (user_id : string) => {
    const res = await api.get(`/cart/${user_id}`);
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

