import { api } from "./api";

export const colorService = {
    getColors: async () => {
        const response = await api.get(`/color/`);
        return response.data;
    },
    getColorById: async (colorId: string) => {
        const response = await api.get(`/color/${colorId}`);
        return response.data;
    },
    addColor: async (name: string, hexCode: string) => {
        const data = { color_name: name, hex_code: hexCode };
        const response = await api.post(`/color/`, data);
        return response.data;
    },
    updateColor: async (colorId: string, name: string, hexCode: string) => {
        const data = { color_name: name, hex_code: hexCode };
        const response = await api.put(`/color/${colorId}`, data);
        return response.data;
    },
    deleteColor: async (colorId: string) => {
        const response = await api.delete(`/color/${colorId}`);
        return response.data;
    }
    
}