import { api } from "../api";
export const productColorService = {
    getColors: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/color/`);
        return response.data;
    },
    addColors: async (product_id: string,data:{color_id: string}[]) => {
        const response = await api.post(`/product/${product_id}/color`, { colors: data });
        return response.data;
    },
    deleteColor: async (colorId: string) => {
        const response = await api.delete(`/color/${colorId}`);
        return response.data;
    },
    getColorById: async (colorId: string) => {
        const response = await api.get(`/color/${colorId}`);
        return response.data;
    }
}
