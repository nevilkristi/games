import React from "react";
import { Modal } from "reactstrap";
import closepopup from "assets/img/close.svg";
import { saveToolList, fetchToolOptions } from "store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveBoardModal = ({
  show,
  onChange,
  scoreBoardTeams,
  data,
  onModalClose,
  onCloseSave,
  loadListButton,
}) => {
  const dispatch = useDispatch();

  const saveListHandle = (element, v) => {
    if (scoreBoardTeams.trim().length > 0 && element !== 0) {
      let newToolOptionTempArray = element;

      newToolOptionTempArray.map(
        (item, index) => delete item.temp_tool_option_id
      );

      dispatch(
        saveToolList(
          {
            tool_type: 1,
            list_name: scoreBoardTeams,
            tool_list_id: 0,
            option: element,
          },
          (status) => {
            loadListButton(true);
            onCloseSave(false);
            dispatch(
              fetchToolOptions({
                tool_list_id: status.tool_list_id,
              })
            );
          }
        )
      );
      onModalClose();
    } else {
      toast.error("Please enter list name");
    }
  };

  return (
    <Modal
      isOpen={show}
      id="saveBoardModal"
      className="modal-dialog modal-dialog-centered "
    >
      <div className="modal-content">
        <div className="modal-header ">
          <h5 className="modal-title" id="exampleModalLabel">
            Save Scoreboard
          </h5>
          <button
            type="button"
            onClick={onModalClose}
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closepopup} alt="" onClick={onModalClose} />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <textarea
            type="text"
            id="add-list-text"
            placeholder="Name your scoreboard"
            className="form-control bottom-border-input add-filter-input mb-4"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="cust-btn-flex mt20">
            <button
              className="btn-dull gameInfo cust-padd-bt"
              data-dismiss="modal"
              onClick={onModalClose}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="btn-primary cust-padd-btn"
              onClick={() => saveListHandle(data)}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SaveBoardModal;
