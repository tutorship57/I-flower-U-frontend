import { api } from "../api";

export const productImageService = {
  getImages: async (product_id: string) => {
    const response = await api.get(`/product/${product_id}/images/`);
    return response.data;
  },
  addImages: async (product_id: string, images: File[]) => {
    const data = new FormData();
    images.forEach((file) => {
      data.append("product_images", file);
    });

    const response = await api.post(`/product/${product_id}/images/`, data,
        
    );
    return response.data;
  },
  deleteImage: async (product_id: string, imageId: string) => {
    const response = await api.delete(
      `/product/${product_id}/images/${imageId}`
    );
    return response.data;
  },
  getImageById: async (product_id: string, imageId: string) => {
    const response = await api.get(`/product/${product_id}/images/${imageId}`);
    return response.data;
  },
};
