import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import dangerPopup from "assets/img/danger.svg";
import { useDispatch } from "react-redux";
import { deleteIceBreaker } from "store/actions";

const DeleteModalIcebreaker = ({ show, onClose, id }) => {
  const dispatch = useDispatch();
  const handleDeleteIceBreaker = () => {
    dispatch(deleteIceBreaker({ icebreaker_id: id }));
    onClose();
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="deleteModal"
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            onClick={onClose}
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <div className="c-delete-note-content">
            <img src={dangerPopup} alt="" />
            <h6>Are you sure you want to delete this icebreaker ?</h6>
          </div>
          <div className="cust-btn-flex justify-content-center mt20">
            <button
              onClick={() => {
                onClose();
              }}
              className="btn-dull cursor-pointer"
              data-dismiss="modal"
            >
              CANCEL
            </button>
            <button
              className="btn-delete-bordered cursor-pointer"
              onClick={handleDeleteIceBreaker}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModalIcebreaker;
