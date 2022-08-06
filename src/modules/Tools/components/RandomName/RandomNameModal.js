import React, { useState, useEffect } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import addIcon from "assets/img/add.png";
import deleteIcon from "assets/img/delete_white.svg";
import closePopup from "assets/img/close.svg";

import DeleteListModel from "./DeleteListModel";
import { fetchToolList, clearName } from "store/actions";
import { useSelector, useDispatch } from "react-redux";

const RandomNameModal = ({ show, onClose, newList }) => {
  const [removeBoard, setRemoveBoard] = useState({
    show: false,
    tool_list_id: 0,
  });
  const { tools } = useSelector((state) => state.Tool);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchToolList({
        tool_type: 2,
      })
    );
  }, [dispatch]);
  const handleBoard = () => {
    setRemoveBoard((prevState) => ({
      ...prevState,
      show: false,
    }));
    onClose(newList);
  };
  const handleNewList = (e) => {
    dispatch(clearName());
    onClose(newList);
    newList(e);
  };

  return (
    <Modal
      isOpen={show}
      id="loadModal"
      className="modal-dialog modal-dialog-centered "
    >
      <div className="modal-content ">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} alt="" onClick={onClose} />
            </span>
          </button>
        </div>
        <div className="modal-body pt-4">
          <h5 className="filter-modal-name text-center">CHOOSE NAME LIST</h5>

          <ul className="choose-game-list">
            <li
              className="list-li"
              style={{ cursor: "pointer" }}
              data-tab-src="random-name"
              onClick={() => handleNewList(0)}
            >
              <span> Create New Name List </span>
              <img src={addIcon} alt="" className="pluse-choose-img" id="add" />
              <UncontrolledTooltip target="add">
                <div className="tooltip-subtext">Create New List</div>
              </UncontrolledTooltip>
            </li>

            {tools?.map((elem, index) => {
              return (
                <li
                  className="list-li"
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  <span onClick={() => handleNewList(elem.tool_list_id)}>
                    {`${elem?.list_name}    (0${elem?.total_count})
                                `}
                  </span>
                  <img
                    src={deleteIcon}
                    onClick={() => {
                      setRemoveBoard((prevState) => ({
                        ...prevState,
                        show: true,
                        tool_list_id: elem?.tool_list_id,
                      }));
                    }}
                    alt=""
                    id="deleteList"
                  />
                  <UncontrolledTooltip target="deleteList">
                    <div className="tooltip-subtext">Delete List</div>
                  </UncontrolledTooltip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <DeleteListModel {...removeBoard} onClose={handleBoard} />
    </Modal>
  );
};

export default RandomNameModal;
