import React, { useState, useEffect } from "react";
import { Modal, UncontrolledTooltip } from "reactstrap";
import closePopupSvg from "assets/img/close.svg";
import deleteIcon from "assets/img/delete_white.svg";
import addIcon from "assets/img/add.png";
import DeleteWheelModal from "./DeleteWheelModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchToolList, clearName } from "store/actions";

const WheelLoadModal = ({ show, onClose, newWheel }) => {
  const [removeWheel, setRemoveWheel] = useState({
    show: false,
    tool_list_id: 0,
  });
  const { tools } = useSelector((state) => state.Tool);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchToolList({
        tool_type: 3,
      })
    );
  }, [dispatch]);
  const handleWheel = () => {
    setRemoveWheel((prev) => ({
      ...prev,
      show: false,
    }));
    onClose(newWheel);
  };
  const handleNewWheel = (item) => {
    dispatch(clearName());
    newWheel(item);
    onClose(newWheel);
  };
  return (
    <Modal
      isOpen={show}
      id="loadModal"
      className="modal-dialog modal-dialog-centered "
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
              <img src={closePopupSvg} alt="" onClick={onClose} />
            </span>
          </button>
        </div>
        <div className="modal-body pt-4">
          <div className="filter-modal-name text-center">CHOOSE NAME LIST</div>

          <ul className="choose-game-list">
            <li
              className="list-li pointer"
              data-tab-src="random-name"
              onClick={() => handleNewWheel(0)}
            >
              <span> Create New Name List </span>
              <img src={addIcon} alt="" id="addWheel" />
              <UncontrolledTooltip target="addWheel">
                <div className="tooltip-subtext">Create New Wheel</div>
              </UncontrolledTooltip>
            </li>

            {tools?.map((elem, i) => {
              return (
                <li className="list-li pointer" key={i}>
                  <span onClick={() => handleNewWheel(elem.tool_list_id)}>
                    {`${elem?.list_name}    (0${elem?.total_count})
                                `}
                  </span>
                  <img
                    src={deleteIcon}
                    onClick={() => {
                      setRemoveWheel((prevState) => ({
                        ...prevState,
                        show: true,
                        tool_list_id: elem?.tool_list_id,
                      }));
                    }}
                    alt=""
                    id="deleteWheel"
                  />
                  <UncontrolledTooltip target="deleteWheel">
                    <div className="tooltip-subtext">Delete Wheel</div>
                  </UncontrolledTooltip>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <DeleteWheelModal {...removeWheel} onClose={handleWheel} />
    </Modal>
  );
};

export default WheelLoadModal;
