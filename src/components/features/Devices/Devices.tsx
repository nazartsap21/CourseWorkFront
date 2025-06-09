import "./Devices.scss";
import {UserDevice} from "../../../interfaces/globalInterfaces.ts";
import {FC} from "react";
import Device from "../../entities/Device/Device.tsx";


interface DevicesProps {
    devices: UserDevice[];
    setActiveUpdate: (active: boolean) => void;
    setUpdatedDevice: (device: UserDevice) => void;
    setActiveDisconnect: (active: boolean) => void;
    handleStarDevice: (deviceId: string) => void;
}


const Devices: FC<DevicesProps> = ({devices, setActiveUpdate, setUpdatedDevice, setActiveDisconnect, handleStarDevice}) => {
    return (
        <div className={"devices-section"}>
            {devices.map((device) => (
                <Device
                    device={device}
                    onEdit={() => {
                        setActiveUpdate(true);
                        setUpdatedDevice({
                            ...device,
                            id: device.id,
                            name: device.name,
                            description: device.description,
                        });
                    }}
                    onDisconnect={() => {
                        setActiveDisconnect(true);
                        setUpdatedDevice({
                            ...device,
                            id: device.id,
                            name: device.name,
                            description: device.description,
                        });
                    }}
                    onStar={() => handleStarDevice(device.device.uniqueDeviceId)}
                />
            ))}
        </div>
    );
};

export default Devices;