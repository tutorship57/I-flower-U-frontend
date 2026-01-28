import { create } from "zustand";
import type { Role } from "../types/role";
import { userService } from "../services/user";
type AuthState = {
    loading: boolean;
    user: string | null;  // หรืออาจจะเป็น object ที่เก็บข้อมูลผู้ใช้เพิ่มเติม
    role: Role;
    isLoggedIn: boolean;
    fetchCurrentUser: () => Promise<void>;
}

type UserData = {
    user_id: string;
    user_username: string;
    user_email: string;
    role:{
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
      const res= await userService.getProfile();
      const data: UserData = res.data;
      console.log(data);
      set({
        user: data.user_username,
        isLoggedIn: true,
        loading: false,
        role: data.role.role_name
      });
      console.log("Active session found");
    } catch(err) {
      console.log(err)
      console.log("No active session");
      set({ user: null, isLoggedIn: false, loading: false });
    }
  },
}));

