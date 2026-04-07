import { useQuery } from "@tanstack/react-query"; 
import { shopService } from "../../services/shop.service";

export const useShopInfo = (shopId: string) => {
  return useQuery({
    queryKey: ["shop", shopId],
    queryFn: async () => {
      const response = await shopService.getShopById(shopId);
      return response.data ;
    },
    enabled: !!shopId, 
  });
};