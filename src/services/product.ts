import { api } from "./api";

export const productService = {
    getProductById: async (productId: string) => {
        const response = await api.get(`/product/${productId}`);
        return response.data;
    },
    getProducts: async () => {
        const response = await api.get("/product");
        return response.data;
    },
    addProduct: async (product: any) => {
        const response = await api.post("/product", product);
        return response.data;
    },
    deleteProduct: async (productId: string) => {
        const response = await api.delete(`/product/${productId}`);
        return response.data;
    }
}


export const categoryService = {
    getCategories: async () => {
        const response = await api.get("/category");
        return response.data;
    },
    addCategory: async (category: any) => {
        const response = await api.post("/category", category);
        return response.data;
    },
    deleteCategory: async (categoryId: string) => {
        const response = await api.delete(`/category/${categoryId}`);
        return response.data;
    },
    getCategoryById: async (categoryId: string) => {
        const response = await api.get(`/category/${categoryId}`);
        return response.data;
    }
}

export const tagService = {
    getTags: async () => {
        const response = await api.get("/tag");
        return response.data;
    },
    addTag: async (tag: any) => {
        const response = await api.post("/tag", tag);
        return response.data;
    },
    deleteTag: async (tagId: string) => {
        const response = await api.delete(`/tag/${tagId}`);
        return response.data;
    },
    getTagById: async (tagId: string) => {
        const response = await api.get(`/tag/${tagId}`);
        return response.data;
    }
}


export const colorService = {
    getColors: async () => {
        const response = await api.get("/color");
        return response.data;
    },
    addColor: async (color: any) => {
        const response = await api.post("/color", color);
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

export const imageService = {
    getImages: async () => {
        const response = await api.get("/image");
        return response.data;
    },
    addImage: async (image: any) => {
        const response = await api.post("/image", image);
        return response.data;
    },
    deleteImage: async (imageId: string) => {
        const response = await api.delete(`/image/${imageId}`);
        return response.data;
    },
    getImageById: async (imageId: string) => {
        const response = await api.get(`/image/${imageId}`);
        return response.data;
    }
}