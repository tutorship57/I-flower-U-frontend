import { create } from "zustand";
import type { Role } from "../types/role";
import type { UserData } from "../types/user";
import { userService } from "../services/user.service";
import { authService } from "../services/auth";

type AuthState = {
    loading: boolean;
    user_id: string | null;
    user: string | null;  // หรืออาจจะเป็น object ที่เก็บข้อมูลผู้ใช้เพิ่มเติม
    role: Role;
    isLoggedIn: boolean;
    fetchCurrentUser: () => Promise<void>;
    logout: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set) => ({
  loading: true,
  user_id: null,
  user: null,          // { id, role } หรือ null
  role: "guest" as Role,
  isLoggedIn: false,
  fetchCurrentUser: async () => {
    set({ loading: true });
    try {
      const res= await userService.getProfile();
      const data: UserData = res.data;
      set({
        user: data.user_name,
        user_id: data.user_id,
        isLoggedIn: true,
        loading: false,
        role: data.role.role_name
      });
    } catch(err) {
      console.log(err)
      set({ user: null,user_id:null, isLoggedIn: false, loading: false });
    }
  },
  logout: async() => {
    try {
      await authService.logout(); // ออกจากระบบ
      set({ user: null, isLoggedIn: false })
    } catch (error) {
      console.log(error)
    }
    
  },
}));

