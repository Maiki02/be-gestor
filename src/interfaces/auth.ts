
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface Payload {
    name: string;
    lastName: string;
    email: string;
    country: string;
    birthDate: string;
    photo: string;
    role: string;
    iat: number;
    exp: number;
}