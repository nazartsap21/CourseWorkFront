import $api from "../http";
import { AxiosResponse } from "axios";

export default class DeviceService {
    static async getDevice(deviceId: string): Promise<AxiosResponse> {
        return $api.get(`/devices/${deviceId}`);
    }
}