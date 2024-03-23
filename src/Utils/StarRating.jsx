import React from "react";
import ReactDOM from "react-dom";
import StarRating from "../Utils/StarRating"; // Import the StarRating component


const Modal = ({ onClose, children, rating }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay bg-black opacity-50 fixed inset-0"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white rounded-lg shadow-lg z-50 relative">
        {" "}
        {/* Added relative positioning */}
        <div className="modal-content p-4">
          <button
            className="modal-close absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
          {rating && (
            <div className="modal-rating mt-2">
              <StarRating rating={rating} />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
