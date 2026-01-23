import { api } from "./api";
export const tagEventService = {
    getAllTagEvents: async () => {
        const response = await api.get("/tag-event/");
        return response.data;
    },
    getTagEventById: async (tagEventId: string) => {
        const response = await api.get(`/tag-event/${tagEventId}`);
        return response.data;
    },
    addTagEvent: async (tagEvent:{tag_id:string}[]) => {
        const data = { tagEvent: tagEvent };
        const response = await api.post("/tag-event/", data);
        return response.data;
    },
    updateTagEvent: async (tagEventId: string, tagEvent: {tag_id:string}[]) => {
        const data = { tagEvent: tagEvent };
        const response = await api.put(`/tag-event/${tagEventId}`, data);
        return response.data;
    },
    deleteTagEvent: async (tagEventId: string) => {
        const response = await api.delete(`/tag-event/${tagEventId}`);
        return response.data;
    }
}