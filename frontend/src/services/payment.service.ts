import { api } from "./api";

export const paymentService = {
    getPaymentByOrderId: async (order_id: string) => {
        const response = await api.get(`/payment/${order_id}`);
        return response.data;
    },
    getPaymentBySessionId: async (session_id: string) =>{
        const response = await api.get(`/payment?session_id=${session_id}`);
        return response.data ; 
    }
}