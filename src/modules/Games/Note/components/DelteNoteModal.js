import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close_popup.svg";
import popupDeleteSvg from "assets/img/popup_delete.svg";
import { useDispatch } from "react-redux";
import { deleteNote } from "store/actions";

const DeleteNoteModal = ({ show, onClose, id, onCloseModel, gameId }) => {
  const dispatch = useDispatch();
  const handleDeleteFilter = () => {
    dispatch(deleteNote(id, gameId));
    onClose();
    onCloseModel();
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="deleteModal"
      className="modal-dialog modal-dialog-centered modal-sm"
    >
      <div className="modal-content custom-modal">
        <div className="close-btn">
          <button
            type="button"
            onClick={onClose}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body add-body text-center pt-4">
          <img src={popupDeleteSvg} alt="" />
          <div className="filter-modal-name mt-4">Delete Note</div>
          <p>Are you sure you want to delete this Note?</p>

          <button
            type="button"
            onClick={handleDeleteFilter}
            className="button-primary add-pop-btn"
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
