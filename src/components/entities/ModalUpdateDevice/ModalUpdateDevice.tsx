import  {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import './ModalUpdateDevice.scss';
import Modal from "../../common/Modal/Modal";
import {UserDevice} from "../../../interfaces/globalInterfaces.ts";


interface ModalUpdateDeviceProps {
    device: UserDevice,
    setDevice: (device: UserDevice) => void,
    handleSubmit: (e: FormEvent) => void,
    headerText: string,
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
}

const ModalUpdateDevice: FC<ModalUpdateDeviceProps> = ({ device, setDevice, handleSubmit, headerText, active, setActive }) => {
    return (
        <Modal headText={headerText} active={active} setActive={setActive}>
            <form className='device-modal-form' onSubmit={handleSubmit}>
                <label htmlFor={"modal-name"}>Name</label>
                <input
                    type={"text"}
                    placeholder={"Name"}
                    name={"modal-name"}
                    value={device.name}
                    onChange={(e) => setDevice({...device, name: e.target.value})}
                />
                <label htmlFor={"modal-location"}>Location</label>
                <textarea
                    placeholder={"Location"}
                    rows={5}
                    name={"modal-name"}
                    value={device.location}
                    onChange={(e) => setDevice({...device, location: e.target.value})}
                ></textarea>
                <button className={'submit-modal'} type={'submit'}>Submit</button>
            </form>
        </Modal>
    );
};

export default ModalUpdateDevice;