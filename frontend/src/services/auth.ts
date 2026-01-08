import { api } from "./api";
import type { LoginPayload, RegisterPayload } from "../types/auth";
export const authService = {
    login:async (data:LoginPayload)=>{
        const res = await api.post("/login",data)
        return res.data;
    },
    register:async (data:RegisterPayload)=>{
        const res = await api.post("/register",data)
        return res.data;    
    },
    logout:async ()=>{
        const res = await api.post("/logout",{})
        return res.data;
    }
}