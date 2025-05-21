import {FormEvent, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProfile} from '../../../store/profileSlice';
import { RootState } from '../../../store/store.config';
import { UserDevice } from '../../../interfaces/globalInterfaces';
import './ProfilePage.scss';
import ProfileServices from "../../../services/ProfileServices.ts";
import ModalUpdateDevice from "../../entities/ModalUpdateDevice/ModalUpdateDevice.tsx";
import ModalDisconnectDevice from "../../entities/ModalDisconnectDevice/ModalDisconnectDevice.tsx";
import ModalConnectDevice from "../../entities/ModalConnectDevice/ModalConnectDevice.tsx";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector((state: RootState) => state.profileReducer);
    const [updatedDevice, setUpdatedDevice] = useState<UserDevice>({
        id: '',
        name: '',
        location: '',
        device: {
            id: '',
            uniqueDeviceId: '',
            airQuality: '',
            lastDataReceived: '',
        },
    });
    const [activeUpdate, setActiveUpdate] = useState<boolean>(false);
    const [activeDisconnect, setActiveDisconnect] = useState<boolean>(false);
    const [activeConnect, setActiveConnect] = useState<boolean>(false);
    const [deviceId, setDeviceId] = useState<string>('');


    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (status === 'loading') {
        return <div className="profile-page">Loading...</div>;
    }

    if (status === 'failed') {
        return <div className="profile-page">Error: {error}</div>;
    }

    const handleUpdatedDevice = async (e: FormEvent) => {
        e.preventDefault();
        if (!updatedDevice.name || !updatedDevice.location) {
            alert('All fields are required');
            return;
        }

        await ProfileServices.updateDevice(updatedDevice.device.uniqueDeviceId, updatedDevice.name, updatedDevice.location);
        dispatch(fetchProfile());
        setActiveUpdate(false);
        setUpdatedDevice({
            ...updatedDevice,
            name: '',
            location: '',
        });
    }

    const handleDisconnectDevice = async (deviceId: string) => {
        await ProfileServices.disconnectDevice(deviceId);
        dispatch(fetchProfile());
        setActiveDisconnect(false);
    }

    const handleConnectDevice = async (deviceId: string) => {
        await ProfileServices.connectDevice(deviceId);
        dispatch(fetchProfile());
        setActiveConnect(false);
    }

    return (
        <div className="profile-page">
            <h1>Profile</h1>
            {profile && (
                <div className="profile-details">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Name:</strong> {profile.lastName} {profile.firstName}</p>
                    <button className={"connect-button"} onClick={() => setActiveConnect(true)}>Connect Device</button>
                    <h2>Devices</h2>
                    <ul>
                        {profile.userDevices.map((device) => (
                            <li key={device.id}>
                                <p><strong>Name:</strong> {device.name}</p>
                                <p><strong>Location:</strong> {device.location}</p>
                                <p><strong>Device ID:</strong> {device.device.uniqueDeviceId}</p>
                                <p><strong>Air Quality:</strong> {device.device.airQuality}</p>
                                <p><strong>Last Data Received:</strong> {device.device.lastDataReceived}</p>
                                <button className={"update-button"} onClick={() => {
                                    setActiveUpdate(true);
                                    setUpdatedDevice({
                                        ...device,
                                        id: device.id,
                                        name: device.name,
                                        location: device.location,
                                    });
                                }}>Update</button>
                                <button className={"disconnect-button"} onClick={() => {
                                    setActiveDisconnect(true);
                                    setUpdatedDevice({
                                        ...device,
                                        id: device.id,
                                        name: device.name,
                                        location: device.location,
                                    });
                                }}>Disconnect</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ModalUpdateDevice
                device={updatedDevice}
                setDevice={setUpdatedDevice}
                handleSubmit={handleUpdatedDevice}
                headerText="Update device"
                active={activeUpdate}
                setActive={setActiveUpdate}
            />
            <ModalDisconnectDevice
                active={activeDisconnect}
                setActive={setActiveDisconnect}
                handleConfirm={() => handleDisconnectDevice(updatedDevice.id)}
            />
            <ModalConnectDevice
                deviceId={deviceId}
                setDeviceId={setDeviceId}
                handleSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    handleConnectDevice(deviceId);
                }}
                headerText={"Connect device"}
                active={activeConnect}
                setActive={setActiveConnect}
            />
        </div>
    );
};

export default ProfilePage;