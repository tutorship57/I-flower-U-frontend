import { api } from "./api";

export const orderService = {

    getOne: async(id: number) => await api.get(`/orders/${id}`),
    
};