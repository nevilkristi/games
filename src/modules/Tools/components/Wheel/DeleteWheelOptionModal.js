import React from "react";
import { Modal } from "reactstrap";
import closePopupSvg from "assets/img/close.svg";
import dangerSvg from "assets/img/danger.svg";
import { useDispatch } from "react-redux";
import { deleteToolOption } from "store/actions";

const DeleteWheelOptionModal = ({
  show,
  onClose,
  tool_option_id,
  tool_temp_option_id,
}) => {
  const dispatch = useDispatch();
  const deleteWheelHandle = () => {
    dispatch(
      deleteToolOption({
        tool_option_id: tool_option_id,
      })
    );
    onClose(tool_temp_option_id);
  };
  return (
    <Modal
      isOpen={show}
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
              <img src={closePopupSvg} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt-0">
          <div className="c-delete-note-content">
            <img src={dangerSvg} alt="" />
            <h6>Are you sure you want to delete this option?</h6>
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
              className="btn-delete-bordered cursor-pointer "
              onClick={() => deleteWheelHandle(tool_option_id)}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWheelOptionModal;
