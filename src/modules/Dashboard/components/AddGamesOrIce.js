import React from "react";
import { Modal } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import closePopup from "assets/img/close.svg";
import gameIcon from "assets/img/game.svg";
import gameWhiteIcon from "assets/img/games.svg";

import iceIcon from "assets/img/ice.svg";
import iceWhiteIcon from "assets/img/ice_white.svg";

function AddGamesOrIce({ show, onClose }) {
  const history = useHistory();

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="gameModal"
      className="modal-dialog modal-dialog-centered modal-md"
    >
      <div className="modal-content custom-modal">
        <div className="modal-header">
          <h5 className="modal-title">Add</h5>
          <button
            type="button"
            onClick={onClose}
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body ">
          <div className="add-new-modal-flex">
            <div
              className="add-icebreaker"
              onClick={() => {
                history.push("/game/add");
                onClose();
              }}
            >
              <Link to="/game/add" className="add-new-button ">
                <img
                  src={gameIcon}
                  alt=""
                  className="dark-img"
                  style={{ width: "59px" }}
                />
                <img
                  src={gameWhiteIcon}
                  alt=""
                  className="white-img"
                  style={{ marginLeft: "11px" }}
                />
                <h6>Games</h6>
              </Link>
            </div>
            <div
              className="add-icebreaker"
              onClick={() => {
                history.push("/icebreaker/add");
                onClose();
              }}
            >
              <Link to="#" className="add-new-button ml-2">
                <img
                  src={iceIcon}
                  alt=""
                  className="dark-img"
                  style={{ width: "57px" }}
                />
                <img
                  src={iceWhiteIcon}
                  alt=""
                  className="white-img"
                  style={{ width: "57px", marginLeft: "32px" }}
                />
                <h6>Icebreaker</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddGamesOrIce;
