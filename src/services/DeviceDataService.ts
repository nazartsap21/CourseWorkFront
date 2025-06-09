import $api from "../http";
import { AxiosResponse } from "axios";

export default class DeviceDataService {
    static async getDeviceData(deviceId: string): Promise<AxiosResponse> {
        return $api.get(`/device-data/${deviceId}`);
    }
}