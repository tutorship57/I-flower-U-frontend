import {api} from './api';

export const userService = {
    getUser: async (userId: string) => {
        const response = await api.get(`/user/${userId}`);
        return response.data;
    },
    updateUser: async (userId: string, userData: {user_name:string}) => {
        const response = await api.put(`/user/${userId}`, userData);
        return response.data;
    },
    deleteUser: async (userId: string) => {
        const response = await api.delete(`/user/${userId}`);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/user/me');
        return response.data;
    }
}
