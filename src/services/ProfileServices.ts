import $api from "../http";
import { AxiosResponse } from "axios";

export default class ProfileServices {
    static async getProfile(): Promise<AxiosResponse> {
        return $api.get('/user/profile');
    }

    static async connectDevice(deviceId: string): Promise<AxiosResponse> {
        return $api.post('/user/connect-device', { deviceId });
    }

    static async disconnectDevice(deviceId: string): Promise<AxiosResponse> {
        return $api.post('/user/disconnect-device', { deviceId });
    }

    static async updateDevice(
        deviceId: string,
        name: string,
        description: string
    ): Promise<AxiosResponse> {
        return $api.post('/user/update-device', { deviceId, name, description });
    }

    static async starDevice(deviceId: string): Promise<AxiosResponse> {
        return $api.post('/user/star-device', { deviceId });
    }

    static async changePassword(newPassword: string): Promise<AxiosResponse> {
        return $api.post('/user/change-password', { newPassword });
    }

    static async forgotPassword(email: string, newPassword: string): Promise<AxiosResponse> {
        return $api.post('/user/forgot-password', { email, newPassword });
    }
}