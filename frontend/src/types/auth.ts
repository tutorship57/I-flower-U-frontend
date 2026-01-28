export type LoginPayload = {
    user_email: string;
    user_password: string;
}

export type LoginResponse = {
    user: {
        user_id: string;
        user_username: string;
        user_email: string;
        Role: {
            role_id: string;
            role_name: string;
        }
    }
}

export type RegisterPayload = {
    user_username: string;
    user_email: string;
    user_password: string;
}

export type RegisterResponse = {
    message: string;
}
