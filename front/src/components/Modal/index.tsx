import React from 'react'

import './styles.css'
import Close from '../../assets/close.png'

interface ModalProps {
    onClose(): void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    return (
        <div className="modal" >
            <div className="content-modal">
                <button onClick={onClose}>
                     <img src={Close} alt="close" />
                </button>
                <div className="separador"></div>
                {children}
            </div>
        </div>
    )
}