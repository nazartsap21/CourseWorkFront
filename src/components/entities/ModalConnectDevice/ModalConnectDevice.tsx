import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import './ModalConnectDevice.scss';
import Modal from '../../common/Modal/Modal';

interface ModalConnectDeviceProps {
    deviceId: string;
    setDeviceId: (id: string) => void;
    handleSubmit: (e: FormEvent) => void;
    headerText: string;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

const ModalConnectDevice: FC<ModalConnectDeviceProps> = ({ deviceId, setDeviceId, handleSubmit, headerText, active, setActive }) => {
    return (
        <Modal headText={headerText} active={active} setActive={setActive}>
            <form className="device-modal-form" onSubmit={handleSubmit}>
                <label htmlFor="modal-device-id">Device ID</label>
                <input
                    type="text"
                    placeholder="Enter Device ID"
                    name="modal-device-id"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                />
                <button className="submit-modal" type="submit">Connect</button>
            </form>
        </Modal>
    );
};

export default ModalConnectDevice;