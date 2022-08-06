import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
const ResetBoardModal = ({ show, onClose, toolsList, resetScore }) => {
  return (
    <Modal
      isOpen={show}
      id="resetModal"
      className="modal-dialog modal-dialog-centered "
    >
      <div className="modal-content">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} onClick={onClose} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt-0">
          <div className="c-delete-note-content">
            <h6>Confirm Reset</h6>
          </div>
          <p className="mb-4 gray-text text-center">
            Are you sure you want to reset?
          </p>
          <div className="cust-btn-flex justify-content-center mt20">
            <button
              className="btn-dull cursor-pointer"
              data-dismiss="modal"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              className="btn-delete-bordered cursor-pointer "
              onClick={() => resetScore()}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResetBoardModal;
