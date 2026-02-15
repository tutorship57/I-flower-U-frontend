import {api} from "./api";

export const orderItemsService = {
    getOrderItemsByOrderId: async (order_id: string) => {
        const response = await api.get(`/order/${order_id}/items`);
        return response.data;
    },
}