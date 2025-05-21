interface Device {
    id: string;
    uniqueDeviceId: string;
    airQuality: string;
    lastDataReceived: string;
}

export interface UserDevice {
    id: string;
    name: string;
    location: string;
    device: Device;
}

interface Profile {
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