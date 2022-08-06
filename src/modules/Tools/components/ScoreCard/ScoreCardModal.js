import React, { useState, useEffect } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import addIcon from "assets/img/add.png";
import deleteIcon from "assets/img/delete_white.svg";
import closePopup from "assets/img/close.svg";
import DeleteBoardModel from "./DeleteBoardModel";
import { clearName, fetchToolList } from "store/actions";
import { useSelector, useDispatch } from "react-redux";

const ScoreCardModal = ({
  show,
  onClose,
  toolsList,
  newBoard,
  setScoreBoard,
}) => {
  const [removeBoard, setRemoveBoard] = useState({
    show: false,
    tool_list_id: 0,
  });

  const { tools } = useSelector((state) => state.Tool);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchToolList({
        tool_type: 1,
      })
    );
  }, [dispatch]);

  const handleBoard = (e) => {
    setRemoveBoard((prevState) => ({
      ...prevState,
      show: false,
    }));
    onClose(newBoard);
  };

  const handleNewBoard = (e) => {
    dispatch(clearName());
    setScoreBoard([]);
    onClose(newBoard);
    newBoard(e);
  };

  return (
    <Modal
      isOpen={show}
      id="saveListModal"
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content custom-modal">
        <div className="modal-header justify-content-end pb-0">
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} onClick={onClose} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt-4">
          <div className="filter-modal-name text-center">CHOOSE SCOREBOARD</div>
          <ul className="choose-game-list">
            <li
              className="list-li"
              style={{ cursor: "pointer" }}
              data-tab-src="random-name"
              onClick={() => handleNewBoard(0)}
            >
              <span> Create New Scoreboard </span>
              <img src={addIcon} alt="" id="addBoard" />
              <UncontrolledTooltip target="addBoard">
                <div className="tooltip-subtext">Create New Board</div>
              </UncontrolledTooltip>
            </li>

            {tools?.map((elem, i) => {
              return (
                <li key={i} className="list-li" style={{ cursor: "pointer" }}>
                  <span onClick={() => handleNewBoard(elem.tool_list_id)}>
                    {`${elem?.list_name}    ${
                      elem?.total_count < 10
                        ? "(0" + elem?.total_count + ")"
                        : "(" + elem?.total_count + ")"
                    }
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
                    id="deleteBoard"
                  />
                  <UncontrolledTooltip target="deleteBoard">
                    <div className="tooltip-subtext">Delete Team</div>
                  </UncontrolledTooltip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <DeleteBoardModel {...removeBoard} onClose={handleBoard} />
    </Modal>
  );
};

export default ScoreCardModal;
