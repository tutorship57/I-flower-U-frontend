import { api } from "../api";

export const productCategoryService = {
    getCategories: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/category/`);
        return response.data;
    },
    
    getCategoryById: async (product_id: string, categoryId: string) => {
        const response = await api.get(`/product/${product_id}/category/${categoryId}`);
        return response.data;
    },
    addCategory: async (product_id: string, category: {category_id: string}[]) => {
        const response = await api.post(`/product/${product_id}/category/`,{ categories: category });
        return response.data;
    },
    deleteCategory: async (product_id: string, categoryId: string) => {
        const response = await api.delete(`/product/${product_id}/category/${categoryId}`);
        return response.data;
    }
}

