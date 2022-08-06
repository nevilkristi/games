import React from "react";
import { Modal } from "reactstrap";
import closepopup from "assets/img/close.svg";
import { saveToolList, fetchToolOptions } from "store/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveListModal = ({
  show,
  data,
  listName,
  randomName,
  handleNameChange,
  onCloseModal,
  onSelectSaveModal,
  loadListButton,
}) => {
  const dispatch = useDispatch();
  const saveListHandle = (element) => {
    if (listName !== "" && element !== 0) {
      let newToolOptionNameTempArray = randomName;

      newToolOptionNameTempArray?.map((item, index) => {
        delete item.tool_temp_option_id;
        item.tool_option_id = 0;
      });

      onSelectSaveModal(true);
      dispatch(
        saveToolList(
          {
            tool_list_id: 0,
            tool_type: 2,
            list_name: listName,
            option: randomName,
          },
          (status) => {
            if (status) {
              onSelectSaveModal(false);
              loadListButton(true);
              dispatch(
                fetchToolOptions({
                  tool_list_id: status.tool_list_id,
                })
              );
            }
          }
        )
      );
      onCloseModal(data);
    } else {
      toast.error("Please enter list name.");
    }
  };

  return (
    <Modal
      isOpen={show}
      id="saveListModal"
      className="modal-dialog modal-dialog-centered "
    >
      <div className="modal-content">
        <div className="modal-header ">
          <h5 className="modal-title" id="exampleModalLabel">
            Save Name List
          </h5>
          <button
            type="button"
            onClick={onCloseModal}
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closepopup} alt="" onClick={onCloseModal} />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <textarea
            type="text"
            id="add-list-text"
            placeholder="Name your list"
            className="form-control bottom-border-input add-filter-input mb-4"
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <div className="cust-btn-flex mt20">
            <button
              className="btn-dull gameInfo cust-padd-bt "
              data-dismiss="modal"
              onClick={onCloseModal}
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

export default SaveListModal;
