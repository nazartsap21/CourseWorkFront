import $api from "../http";
import { AxiosResponse } from "axios";

export default class AuthService {
    static async register(email: string, password: string, firstName: string, lastName: string): Promise<AxiosResponse<{ data: string }>> {
        return $api.post('/auth/register', {
            email,
            password,
            firstName,
            lastName
        });
    }

    static async login(email: string, password: string): Promise<AxiosResponse<{ data: string }>> {
        return $api.post('/auth/login', {
            email,
            password
        });
    }

    static async logout(): Promise<AxiosResponse<{ data: string }>> {
        return $api.post('/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<{ data: string }>> {
        return $api.post('/auth/check-token');
    }
}