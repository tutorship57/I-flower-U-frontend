// import { api } from "./api";

// export const orderService = {

//     getOne: async(id: number) => await api.get(`/orders/${id}`),
    
// };

import { api } from "./api";

export const orderItemsService = {
  getOrderItemsByOrderId: async (order_id: string) => {
    const response = await api.get(`/order/${order_id}/items/`);
    return response.data; 
  },
  getOrdersByShopId: async (shopId: string) => {
  const response = await api.get(`/shop/${shopId}/orders`); 
  return response.data;
}
};