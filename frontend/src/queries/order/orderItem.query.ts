import { useQuery } from "@tanstack/react-query";
import { orderItemsService } from "../../services/orderItem.service";

export const useOrderItemsQuery = (order_id : string)=>{
    return useQuery({
    queryKey: ["orderItems"],
    queryFn: async () => {
      const OrderItemsResponse = await orderItemsService.getOrderItemsByOrderId(order_id);
      return OrderItemsResponse.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})
}