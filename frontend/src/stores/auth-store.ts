import { create } from "zustand";
import axios from "axios";
import type { Role } from "../types/role";
type AuthState = any 

type UserData = {
    user_id: string;
    user_username: string;
    user_email: string;
    Role:{
        role_id: string;
        role_name: Role;
    }
}


export const useAuthStore = create<AuthState>((set) => ({
  loading: true,
  user: null,          // { id, role } หรือ null
  role: "guest" as Role,
  isLoggedIn: false,
  fetchCurrentUser: async () => {
    set({ loading: true });
    try {
      const res= await axios.get("/api/me", { withCredentials: true });
      const data: UserData = res.data;
      set({
        user: data.user_username,
        isLoggedIn: true,
        loading: false,
        role: data.Role.role_name
      });
    } catch {
      set({ user: null, isLoggedIn: false, loading: false });
    }
  },
}));

