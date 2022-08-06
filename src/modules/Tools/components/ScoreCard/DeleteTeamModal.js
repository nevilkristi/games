import React from "react";
import { Modal } from "reactstrap";
import dangerSvg from "assets/img/danger.svg";
import closepopup from "assets/img/close.svg";
import { useDispatch } from "react-redux";
import { deleteToolOption } from "store/actions";

const DeleteTeamModal = ({
  show,
  onClose,
  tool_option_id,
  temp_tool_option_id,
}) => {
  const dispatch = useDispatch();
  const deleteListHandle = (id) => {
    onClose(temp_tool_option_id);
    dispatch(deleteToolOption({ tool_option_id: tool_option_id }));
  };
  return (
    <Modal isOpen={show} className="modal-dialog modal-dialog-centered">
      <div className="modal-header justify-content-end pb-0">
        <button
          type="button"
          onClick={onClose}
          className="close-img"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <img src={closepopup} alt="" />
          </span>
        </button>
      </div>
      <div className="modal-body pt-0">
        <div className="c-delete-note-content">
          <img src={dangerSvg} alt="" />
          <h6>Are you sure you want to delete this team?</h6>
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
            onClick={() => deleteListHandle(tool_option_id)}
          >
            DELETE
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTeamModal;
