import { api } from "../api";
export const productTagsService = {
    getProductTags: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/tags/`);
        return response.data;
    },
    getProductTagById: async (product_id: string, tagId: number) => {  
        const response = await api.get(`/product/${product_id}/tags/${tagId}`);
        return response.data;
    },
    addProductTags: async (product_id: string,tags:{tag_id: number}[]) => {
        const data = { tags: tags };
        const response = await api.post(`/product/${product_id}/tags/`, data);
        return response.data;
    },
    updateProductTags: async (product_id: string,tags:{tag_id: number}[]) => {
        const data = { tags: tags };
        const response = await api.put(`/product/${product_id}/tags/`, data);
        return response.data;
    },
    deleteProductTag: async (product_id: string, tagId: string) => {
        const response = await api.delete(`/product/${product_id}/tags/${tagId}`);
        return response.data;
    }
}
