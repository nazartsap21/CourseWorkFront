import { Dispatch, FC, SetStateAction } from 'react';
import './ModalDisconnectDevice.scss';
import Modal from '../../common/Modal/Modal';

interface ModalDisconnectDeviceProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void;
}

const ModalDisconnectDevice: FC<ModalDisconnectDeviceProps> = ({ active, setActive, handleConfirm }) => {
    return (
        <Modal headText="Disconnect Device" active={active} setActive={setActive}>
            <div className="disconnect-modal-content">
                <p>Do you really want to disconnect this device?</p>
                <div className="disconnect-modal-buttons">
                    <button className="confirm-button" onClick={handleConfirm}>Yes</button>
                    <button className="cancel-button" onClick={() => setActive(false)}>No</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalDisconnectDevice;