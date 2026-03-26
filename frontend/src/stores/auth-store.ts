// import { create } from "zustand";
// import type { Role } from "../types/role";
// import type { UserData } from "../types/user";
// import { userService } from "../services/user.service";
// import { authService } from "../services/auth";

// type AuthState = {
//     loading: boolean;
//     user_id: string | null;
//     user: string | null;  // หรืออาจจะเป็น object ที่เก็บข้อมูลผู้ใช้เพิ่มเติม
//     role: Role;
//     shop_id: string | null,
//     shop_name: string | null,
//     isLoggedIn: boolean;
//     fetchCurrentUser: () => Promise<void>;
//     logout: () => Promise<void>;
// }


// export const useAuthStore = create<AuthState>((set) => ({
//   loading: true,
//   user_id: null,
//   user: null,          // { id, role } หรือ null
//   shop_id: null,
//   shop_name: null,
//   role: "USER" as Role,
//   isLoggedIn: false,
//   fetchCurrentUser: async () => {
//     set({ loading: true });
//     try {
//       const res= await userService.getProfile();
//       const data: UserData = res.data;
//       set({
//         user: data.user_name,
//         user_id: data.user_id,
//         isLoggedIn: true,
//         loading: false,
//         shop_id: data.shops[0]?.shop_id,
//         shop_name: data.shops[0]?.shop_name,
//         role: data.role.role_name
//       });
//       set({ loading: false})
//     } catch(err) {
//       console.log(err)
//       set({ user: null,user_id:null, isLoggedIn: false, loading: false });
//     }
//   },
//   logout: async() => {
//     try {
//       await authService.logout(); // ออกจากระบบ
//       set({ user: null, isLoggedIn: false })
//     } catch (error) {
//       console.log(error)
//     }
    
//   },
// }));

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
    shop_id: string | null,
    shop_name: string | null,
    isLoggedIn: boolean;
    fetchCurrentUser: () => Promise<void>;
    logout: () => Promise<void>;
    setShop: (shop_id: string, shop_name?: string) => void; //เพิ่ม
}


export const useAuthStore = create<AuthState>((set) => ({
  loading: true,
  user_id: null,
  user: null,          // { id, role } หรือ null
  shop_id: null,
  shop_name: null,
  role: "USER" as Role,
  isLoggedIn: false,
  
  fetchCurrentUser: async () => {
    set({ loading: true });
    try {
      const res= await userService.getProfile();
      // const data: UserData = res.data;
      const data = res.data;//แทนอันบน
      const firstShop = (data && data.shops && data.shops.length > 0) ? data.shops[0] : null;
      
      // set ({
      //   user: data.user_name,
      //   user_id: data.user_id,
      //   isLoggedIn: true,
      //   loading: false,
      //   shop_id: data.shops[0]?.shop_id,
      //   shop_name: data.shops[0]?.shop_name,
      //   role: data.role.role_name
      // });
      set((state) => ({ 
      user: data.user_name,
      user_id: data.user_id,
      isLoggedIn: true,
      loading: false,
      // shop_id: data.shops?.[0]?.shop_id || state.shop_id, 
      // shop_name: data.shops?.[0]?.shop_name || state.shop_name,
      // role: data.role.role_name,

 
      shop_id: firstShop?.shop_id || firstShop?.id || null,
      shop_name: firstShop?.shop_name || firstShop?.name || null,
      role: data.role?.role_name || "GHOST_ROLE" // แก้ขัดไปก่อน

    }));

    console.log("Check Shop Data:", firstShop);
    } catch(err) {
      // console.log(err)
      // set({ user: null,user_id:null, isLoggedIn: false, loading: false });
      console.error("Fetch Profile Error:", err);
    // ❌ อย่าเพิ่งสั่ง isLoggedIn: false ตรงนี้ถ้าอยากเช็ค Error ก่อน
    set({ loading: false });
    }
  },

  //เพิ่ม
  setShop: (shop_id, shop_name) =>
  set({ shop_id, shop_name }),

  logout: async() => {
    try {
      await authService.logout(); // ออกจากระบบ
      set({
        user: null,
        user_id: null,
        shop_id: null,
        shop_name: null,
        isLoggedIn: false
      });
    } catch (error) {
      console.log(error)
    }
    
  },
}));

