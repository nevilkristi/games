import React, { useState } from "react";
import { Modal } from "reactstrap";
import gamePopupSvg from "assets/img/game_popup.svg";
import closePopup from "assets/img/close.svg";
import { useDispatch } from "react-redux";
import { addUpdatePlayedGame, removePlayedGame } from "store/actions";

const PlayegGameModal = ({ show, onClose, gameId, isPlayed }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);

  const handleAddPlayedGame = (sts) => {
    setStatus(isPlayed);

    dispatch(
      addUpdatePlayedGame(
        {
          game_id: gameId,
          is_played: isPlayed,
        },
        "myGames"
      )
    );

    if (sts === 0) {
      dispatch(removePlayedGame(gameId));
    }
  };
  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="favouriteModal"
      className="modal-dialog modal-dialog-centered"
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
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <div className="c-delete-note-content">
            <img src={gamePopupSvg} alt="" />
            <h6>
              Are you sure you want to remove the game from played game list?
            </h6>
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
              className="btn-delete-bordered cursor-pointer"
              onClick={() => handleAddPlayedGame(status)}
            >
              REMOVE
            </button>
          </div>
        </div>
        {/* <div className="modal-body add-body text-center pt-4">
          <img src={gamePopupSvg} alt="" />
          <div className="filter-modal-name mt-4">REMOVE FROM PLAYED GAME</div>
          <p>Are you sure you want to remove the game from played game list?</p>

          <button
            type="button"
            onClick={() => handleAddPlayedGame(status)}
            className="button-primary add-pop-btn"
          >
            Yes
          </button>
        </div> */}
      </div>
    </Modal>
  );
};

export default PlayegGameModal;
