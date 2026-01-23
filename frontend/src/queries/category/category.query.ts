import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../../services/category.service";

export const useCategories = ()=>{
    return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categoryResponse  = await categoryService.getCategories();
      return categoryResponse.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})};