import { api } from "../api";

export const productImageService = {
    getImages: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/image`);
        return response.data;
    },
    addImages: async (product_id: string, images: File[]) => {
        const response = await api.post(`/product/${product_id}/image`, images);
        return response.data;
    },
    deleteImage: async (product_id: string, imageId: string) => {
        const response = await api.delete(`/product/${product_id}/image/${imageId}`);
        return response.data;
    },
    getImageById: async (product_id: string, imageId: string) => {
        const response = await api.get(`/product/${product_id}/image/${imageId}`);
        return response.data;
    }
}
