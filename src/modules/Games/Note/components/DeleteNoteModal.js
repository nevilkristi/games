import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import dangerPopup from "assets/img/danger.svg";
import { useDispatch } from "react-redux";
import { deleteNote } from "store/actions";

const DeleteNoteModal = ({ show, onClose, id, filterType }) => {
  const dispatch = useDispatch();
  const handleDeleteFilter = () => {
    dispatch(deleteNote(id));
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
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span onClick={onClose}>
              <img src={closePopup} alt="close" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <div className="c-delete-note-content">
            <img src={dangerPopup} alt="" />
            <h6>Are you sure you want to delete this note ?</h6>
          </div>
          <div className="cust-btn-flex justify-content-center mt20">
            <button
              className="btn-dull cursor-pointer"
              data-dismiss="modal"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              onClick={handleDeleteFilter}
              className="btn-delete-bordered cursor-pointer"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
