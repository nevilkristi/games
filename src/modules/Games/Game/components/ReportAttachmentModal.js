import React from "react";
import { Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import popupDeleteSvg from "assets/img/warning.svg";
import { useDispatch } from "react-redux";
import { reportAttachment, fetchGameRating } from "store/actions";
import { useParams } from "react-router-dom";

const ReportAttachmentModal = ({
  show,
  onClose,
  id,
  filterType,
  redirect = false,
}) => {
  const params = useParams();
  const gameId = params.id;
  const dispatch = useDispatch();
  const handleDeleteFilter = () => {
    dispatch(
      reportAttachment(
        {
          game_attachment_id: id,
          gameId: gameId,
        },
        (id) => {
          dispatch(fetchGameRating({ game_id: id }));
          onClose(true);
        }
      )
    );
    onClose(id);
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="reportModal"
      className="modal-dialog modal-dialog-centered "
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
              <img src={closePopup} alt="" />{" "}
            </span>
          </button>
        </div>
        <div className="modal-body pt-0">
          <div className="c-delete-note-content">
            <img src={popupDeleteSvg} alt="" />
            <h6>Are you sure you want to report this attachment?</h6>
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
              onClick={handleDeleteFilter}
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportAttachmentModal;
