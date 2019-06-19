export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    roles: Array<string>;
}

export const defaultUser: User = {
    _id: null,
    username: "",
    email: "",
    password: "",
    phone: "",
    roles: ["USER"]
};
