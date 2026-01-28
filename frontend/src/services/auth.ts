import { api } from "./api";
import type { LoginPayload, RegisterPayload } from "../types/auth";
export const authService = {
    login:async (data:LoginPayload)=>{
        const res = await api.post("/auth/login",data)
        return res.data;
    },
    register:async (data:RegisterPayload)=>{
        const res = await api.post("/auth/register",data)
        return res.data;    
    },
    logout:async ()=>{
        const res = await api.post("/auth/logout")
        return res.data;
    }
}