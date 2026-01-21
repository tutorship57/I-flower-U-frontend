import { api } from "../api";

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
        const response = await api.post("/product/", {product});
        return response.data;
    },
    deleteProduct: async (productId: string) => {
        const response = await api.delete(`/product/${productId}`);
        return response.data;
    }
}

