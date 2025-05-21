import React, {Dispatch, FC, SetStateAction} from 'react';
import './Modal.scss';
import close from './reset.svg';

interface ModalProps {
    headText: string,
    active:boolean,
    setActive:Dispatch<SetStateAction<boolean>>,
    children:React.ReactNode
}


const Modal: FC<ModalProps> = ({headText, active, setActive, children}) => {
    return (
        <div className={`modal ${active && 'active'}`} onClick={() => setActive(false)}>
            <div className={`modal-content ${active && 'active'}`} onClick={e => e.stopPropagation()}>
                <div>
                    <div className='modal-head'>
                        <div>
                            <h3>{headText}</h3>
                        </div>
                        <img src={close} alt={'close'} onClick={() => setActive(false)}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;