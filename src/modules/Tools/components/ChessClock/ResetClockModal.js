import React from "react";
import closepopup from "assets/img/close.svg";
import { Modal } from "reactstrap";

const ResetClockModal = ({ show, onClose, reset }) => {
  const resetClock = (e) => {
    onClose(reset);
    reset(e);
  };
  return (
    <Modal
      isOpen={show}
      id="resetModal"
      className="modal-dialog modal-dialog-centered "
    >
      {/* <div className="modal-dialog modal-dialog-centered modal-sm"> */}
      <div className="modal-content">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closepopup} alt="" onClick={onClose} />
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
              onClick={resetClock}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResetClockModal;
