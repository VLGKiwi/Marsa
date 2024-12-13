// components/Modal.tsx
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal_close} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
