export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface Payload {
    email: string;
    name: string;
    lastName: string;
    role: string;
    iat: number;
    exp: number;
    
}