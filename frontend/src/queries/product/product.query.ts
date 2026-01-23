import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product-service/product";    

export const useProducts =()=>{ 
    return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productRes = await productService.getProducts();
      return productRes.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})};




