import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../store/profileSlice';
import { RootState } from '../../../store/store.config';
import { UserDevice } from '../../../interfaces/globalInterfaces';
import './ProfilePage.scss';
import ProfileServices from "../../../services/ProfileServices.ts";
import ModalUpdateDevice from "../../entities/ModalUpdateDevice/ModalUpdateDevice.tsx";
import ModalDisconnectDevice from "../../entities/ModalDisconnectDevice/ModalDisconnectDevice.tsx";
import ModalConnectDevice from "../../entities/ModalConnectDevice/ModalConnectDevice.tsx";
import Profile from "../../features/Profile/Profile.tsx";
import Devices from "../../features/Devices/Devices.tsx";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { profile, status, error } = useSelector((state: RootState) => state.profileReducer);
    const [updatedDevice, setUpdatedDevice] = useState<UserDevice>({
        id: '',
        name: '',
        description: '',
        starred: false,
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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');

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
        if (!updatedDevice.name || !updatedDevice.description) {
            alert('All fields are required');
            return;
        }

        await ProfileServices.updateDevice(updatedDevice.device.uniqueDeviceId, updatedDevice.name, updatedDevice.description);
        dispatch(fetchProfile());
        setActiveUpdate(false);
        setUpdatedDevice({
            ...updatedDevice,
            name: '',
            description: '',
        });
    };

    const handleDisconnectDevice = async (deviceId: string) => {
        await ProfileServices.disconnectDevice(deviceId);
        dispatch(fetchProfile());
        setActiveDisconnect(false);
    };

    const handleConnectDevice = async (deviceId: string) => {
        await ProfileServices.connectDevice(deviceId);
        dispatch(fetchProfile());
        setActiveConnect(false);
    };

    const handleStarDevice = async (deviceId: string) => {
        await ProfileServices.starDevice(deviceId);
        dispatch(fetchProfile());
    }

    const filteredDevices = profile?.userDevices.filter((device) => {
        const matchesSearch =
            device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            device.device.uniqueDeviceId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'starred' && device.starred);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="profile-page">
            {profile && <Profile
                profile={profile}
                devicesNumber={profile.userDevices.length}
            />}
            {profile &&
                <div className={'devices-side-section'}>
                    <div className={'device-menu'}>
                        <h2 className="profile-page__devices-title">Devices</h2>
                        <div className="search-filter-container">
                            <div className={"search-input-container"}>
                                <input
                                    type="text"
                                    placeholder="Search devices..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                {searchQuery && (
                                    <button
                                        className="clear-search"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="filter-dropdown"
                            >
                                <option value="all">All</option>
                                <option value="starred">Starred</option>
                            </select>
                        </div>
                        <button
                            className="profile-page__add-device"
                            onClick={() => setActiveConnect(true)}
                        >
                            Connect device
                        </button>
                    </div>
                    <hr />
                    <Devices
                        devices={filteredDevices || []}
                        setActiveUpdate={setActiveUpdate}
                        setUpdatedDevice={setUpdatedDevice}
                        setActiveDisconnect={setActiveDisconnect}
                        handleStarDevice={handleStarDevice}
                    />
                </div>
            }

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