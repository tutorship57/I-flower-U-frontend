import { api } from "./api";

export const productService = {
    getProductById: async (productId: string) => {
        const response = await api.get(`/product/${productId}`);
        return response.data;
    },
    getProductByIds: async (productIds: string[]) => {
        const response = await api.post(`/product/ids`, { product_ids: productIds });
        return response.data;
    },
    getProducts: async () => {
        const response = await api.get("/product/");
        return response.data;
    },
    addProduct: async (product:{product_name: string, product_description: string, product_price: number, product_stock: number}) => {
        const response = await api.post("/product/", {data: product});
        return response.data;
    },
    deleteProduct: async (productId: string) => {
        const response = await api.delete(`/product/${productId}`);
        return response.data;
    }
}


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

export const productTagsService = {
    getProductTags: async (product_id: string) => {
        const response = await api.get(`/product/${product_id}/tag/`);
        return response.data;
    },
    getProductTagById: async (product_id: string, tagId: string) => {  
        const response = await api.get(`/product/${product_id}/tag/${tagId}`);
        return response.data;
    },
    addProductTags: async (product_id: string,tags:{tag_id: string}[]) => {
        const response = await api.post(`/product/${product_id}/tag/`, { tags });
        return response.data;
    },
    updateProductTags: async (product_id: string,tags:{tag_id: string}[]) => {
        const response = await api.put(`/product/${product_id}/tag/`, { tags });
        return response.data;
    },
    deleteProductTag: async (product_id: string, tagId: string) => {
        const response = await api.delete(`/product/${product_id}/tag/${tagId}`);
        return response.data;
    }
}