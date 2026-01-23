import { useQuery } from "@tanstack/react-query";
import { colorService } from "../../services/color.service";
export const useColors = ()=>{
    return useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const ColorResponse = await colorService.getColors();
      return ColorResponse.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})
}