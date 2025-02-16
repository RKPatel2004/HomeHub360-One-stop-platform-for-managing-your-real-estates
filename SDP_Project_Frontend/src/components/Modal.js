// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button
            onClick={onClose}
            className="modal-button modal-button-cancel"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="modal-button modal-button-confirm"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;