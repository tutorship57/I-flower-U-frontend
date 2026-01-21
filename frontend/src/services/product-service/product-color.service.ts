import { api } from "../api";
export const productColorService = {
    getColors: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/colors/`);
        return response.data;
    },
    addColors: async (product_id: string,colors:{color_id: number}[]) => {
        const data = { colors: colors };
        const response = await api.post(`/product/${product_id}/colors/`, data);
        return response.data;
    },
    deleteColor: async (colorId: string) => {
        const response = await api.delete(`/colors/${colorId}`);
        return response.data;
    },
    getColorById: async (colorId: string) => {
        const response = await api.get(`/colors/${colorId}`);
        return response.data;
    }
}
