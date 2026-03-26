export type AuthFlags = {
    login: boolean;
    register: boolean;
};
export type ChatFlags = {
    private: boolean;
    groups: boolean;
};
export type FriendsLists = {
    name: string;
    id: string;
};
export type Flags = AuthFlags | ChatFlags;
export type Subcommand = 'auth' | 'chat';
export interface ResponseUser {
    id: string;
    name: string;
    created_at: Date;
    email: string;
    isRed: boolean;
}
export interface authData {
    email: string;
    password: string;
}
export interface CusError {
    message: string;
    code: number;
    originalError?: any;
}
export interface AuthToken {
    token: string;
    refresh_token: string;
}
export interface RequestUser {
    name: string;
    email: string;
    password: string;
}
export interface NormalError {
    error: string;
}
export declare const apiRoute = "localhost:8080/";
