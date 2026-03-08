import { api } from "./api";

export const shopService = {
  getShopById: async (shopId:string) => {
    try {
        const response = await api.get(`/shop/${shopId}`)
        console.log("this is response",response)
        return response.data ;
    } catch (error) {
        console.log(error)
    }
   
  },
  createShop: async () => {},
  updateShop: async () => {},
  deleteShop: async () => {},
};
