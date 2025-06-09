import React from 'react';
import './Device.scss';
import 'react-circular-progressbar/dist/styles.css';
import { UserDevice } from '../../../interfaces/globalInterfaces';
import { GaugeComponent } from 'react-gauge-component';
import {Link} from "react-router-dom";
import more from "./more.svg";
import update from "./update.svg";
import disconnect from "./disconnected.svg";

interface DeviceProps {
    device: UserDevice;
    onEdit: () => void;
    onDisconnect: () => void;
    onStar: () => void;
}

const Device: React.FC<DeviceProps> = ({ device, onEdit, onDisconnect, onStar}) => {
    return (
        <div
            className={`device`}
        >
            <div className="air-quality-circle">
                <GaugeComponent
                    arc={{
                        subArcs: [
                            {
                                limit: 20,
                                color: '#EA4228',
                                showTick: true
                            },
                            {
                                limit: 40,
                                color: '#F58B19',
                                showTick: true
                            },
                            {
                                limit: 60,
                                color: '#F5CD19',
                                showTick: true
                            },
                            {
                                limit: 100,
                                color: '#5BE12C',
                                showTick: true
                            },
                        ]
                    }}
                    value={Number(device.device.airQuality)}
                />
                <p style={{ marginTop: '-14px', fontSize: '16px', color: '#333', justifySelf: "center"}}>
                    Air Quality
                </p>
            </div>

            <div className="device-details">
                <p><strong>ID:</strong> {device.device.uniqueDeviceId}</p>
                <p><strong>Name:</strong> {device.name}</p>
                <p><strong>Description:</strong> {device.description}</p>
                <p><strong>Last Data Received:</strong> {device.device.lastDataReceived}</p>
            </div>

            <div className="device-actions">
                <button onClick={() => {onStar()}} className="star-button">
                    {device.starred ? <span>★</span> : <span>☆</span>}
                </button>
                <button onClick={() => onEdit()}>
                    <img src={update} alt={"edit device"} style={{width: "30px", height: "30px"}}/>
                </button>
                <button onClick={() => onDisconnect()}>
                    <img src={disconnect} alt={"disconnect device"} style={{width: "30px", height: "30px"}}/>
                </button>
                <Link
                    to={`/profile/device/${device.device.uniqueDeviceId}`}
                >
                    <img src={more} alt={"more about device"} style={{width: "30px", height: "30px"}}/>
                </Link>
            </div>
        </div>
    );
};

export default Device;