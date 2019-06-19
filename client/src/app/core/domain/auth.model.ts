export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    email: string;
    phone: string;
}

export interface Auth extends LoginCredentials {
    token: string;
}

export interface AuthResponse {
    accessToken: string;
}
