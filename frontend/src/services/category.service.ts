import {api} from "./api";

export const categoryService = {
    getCategories: async () => {
        const response = await api.get(`/category/`);
        return response.data;
    },
    getCategoryById: async (categoryId: string) => {
        const response = await api.get(`/category/${categoryId}`);
        return response.data;
    },
    addCategory: async (name: string) => {
        const response = await api.post(`/category/`, { category_name: name });
        return response.data;
    },
    updateCategory: async (categoryId: string, name: string) => {
        const response = await api.put(`/category/${categoryId}`, { category_name: name });
        return response.data;
    },
    deleteCategory: async (categoryId: string) => {
        const response = await api.delete(`/category/${categoryId}`);
        return response.data;
    }
}