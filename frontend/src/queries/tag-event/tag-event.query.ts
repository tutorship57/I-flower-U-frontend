import { useQuery } from "@tanstack/react-query";
import { tagEventService } from "../../services/tag-event.service";

export const useTagEvents =()=>{ 
    return useQuery({
    queryKey: ["tagEvents"],
    queryFn: async () => {
      const tagEventResponse = await tagEventService.getAllTagEvents(); 
      return tagEventResponse.data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0 ,
    gcTime: 0
})};