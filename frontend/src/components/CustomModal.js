import React from "react";
import "./Quiz.css";

const CustomModal = ({ show, onHide, title, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onHide} className="close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;