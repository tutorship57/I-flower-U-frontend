import { useQuery } from "@tanstack/react-query";
import { orderItemsService } from "../../services/orderItem.service";

export const useOrderItemsQuery = (order_id: string) => {
  return useQuery({
    queryKey: ["orderItems", order_id],
    queryFn: async () => {
      const data = await orderItemsService.getOrderItemsByOrderId(order_id);
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};