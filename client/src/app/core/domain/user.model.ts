export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    created_at: string;
}

export const defaultUser: User = {
    _id: null,
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "USER",
    created_at: "",
};