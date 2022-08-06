import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import dangerPopup from "assets/img/danger.svg";
import { useDispatch } from "react-redux";
import { deleteFilter } from "store/actions";

const DeleteModalFilter = ({ show, onClose, id, filterType }) => {
  const dispatch = useDispatch();
  const handleDeleteFilter = () => {
    dispatch(deleteFilter(id, filterType));
    onClose(filterType);
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="deleteModal"
      className="modal-dialog-centered"
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
              <img src={closePopup} onClick={onClose} alt="close-Filter" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <div className="c-delete-note-content">
            <img src={dangerPopup} alt="" />
            <h6>Are you sure you want to delete this filter ?</h6>
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
              className="btn-delete-bordered cursor-pointer"
              onClick={handleDeleteFilter}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModalFilter;
