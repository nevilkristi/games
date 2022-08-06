import React from "react";
import { Modal } from "reactstrap";
import closePopUp from "assets/img/close.svg";
import dangerSvg from "assets/img/danger.svg";
import { deleteToolList } from "store/actions";
import { useDispatch } from "react-redux";

const DeleteQuestion = ({ show, onClose, item }) => {
  const dispatch = useDispatch();
  const handelDelete = () => {
    dispatch(
      deleteToolList({
        tool_list_id: item.tool_list_id,
      })
    );
    onClose(item);
  };

  return (
    <Modal
      isOpen={show}
      id="deleteModal"
      className="modal-dialog modal-dialog-centered "
    >
      <div className="modal-content ">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            onClick={onClose}
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopUp} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt-0">
          <div className="c-delete-note-content">
            <img src={dangerSvg} alt="" />
            <h6>Are you sure you want to delete this polling question?</h6>
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
              onClick={handelDelete}
            >
              DELETE
            </button>
          </div>
        </div>
        {/* <div className="modal-body add-body text-center pt-4 ">
          <img src={dangerSvg} alt="" />
          <div className="filter-modal-name mt-2">DELETE QUESTION</div>
          <p>Are you sure you want to delete?</p>
          <button
            type="button"
            className="button-primary add-pop-btn w-100"
            onClick={handelDelete}
          >
            Yes
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default DeleteQuestion;
