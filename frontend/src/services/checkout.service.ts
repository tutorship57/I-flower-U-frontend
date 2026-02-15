import { api } from "./api";

type CheckoutData = {
    cart_id : string ,
    user_id : string 
}

export const checkoutService = {
    getCheckout: async (checkoutData: CheckoutData) => {
        const response = await api.post(`/checkout`, checkoutData);
        return response.data;
    }
}