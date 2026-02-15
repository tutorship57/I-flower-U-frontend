import type { Role } from "./role";
export type UserData = {
    user_id: string;
    user_name: string;
    user_email: string;
    role:{
        role_id: string;
        role_name: Role;
    }
    carts:[
        {
            cart_id: string;
        }
    ]
}