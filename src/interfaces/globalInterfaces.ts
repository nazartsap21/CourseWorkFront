interface Device {
    id: string;
    uniqueDeviceId: string;
    airQuality: string;
    lastDataReceived: string;
}

export interface UserDevice {
    id: string;
    name: string;
    description: string;
    starred: boolean;
    device: Device;
}

export interface UserUpdateDevice {
    id: string;
    name: string;
    description: string;
    device: Device;
}

export interface Profile {
    email: string;
    firstName: string;
    lastName: string;
    userDevices: UserDevice[];
}

export interface ProfileState {
    profile: Profile | null;
    status: string;
    error: string | null;
}


export interface DeviceData {
    id: number;
    datetime: Date;
    uniqueDeviceId: string;
    tempMin: number;
    tempMax: number;
    tempAvg: number;
    humidityMin: number;
    humidityMax: number;
    humidityAvg: number;
    ppmMin: number;
    ppmMax: number;
    ppmAvg: number;
    airQuality: number;
}