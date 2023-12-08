import React, { FC } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-11/12 max-w-5xl">
        <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {children}
      </div>

      <style jsx>{`
        .modal {
          flex: 1;
          display: none;
          justify-content: center;
          align-items: center;
        }

        .modal.modal-open {
          display: flex;
        }

        .modal-box {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Modal;











