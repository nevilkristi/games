import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import heartPng from "assets/img/heart.png";
import closePopup from "assets/img/close.svg";
import {
  addUpdateFavoriteGame,
  saveFavoriteIceBreaker,
  removeFavoriteGames,
  removeFavoriteIceBreaker,
} from "store/actions";
import { useDispatch } from "react-redux";

const FavouriteModal = ({ show, onClose, gameId, isFavvourite, isType }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);

  const handleRemoveFilter = (sts) => {
    setStatus(isFavvourite);
    if (!isType) {
      dispatch(
        addUpdateFavoriteGame({
          game_id: gameId,
          is_favourite: isFavvourite,
        })
      );
      if (sts === 0) dispatch(removeFavoriteGames(gameId));
    } else {
      dispatch(
        saveFavoriteIceBreaker({
          icebreaker_id: gameId,
          is_favourite: isFavvourite,
        })
      );
      if (sts === 0) dispatch(removeFavoriteIceBreaker(gameId));
    }

    onClose();
  };
  useEffect(() => {
    setStatus(isFavvourite);
  }, [isFavvourite]);

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="favouriteModal"
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className=" modal-header justify-content-end pb-0">
          <button
            type="button"
            className="close-img  "
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={onClose}>
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body pt0">
          <div className="c-delete-note-content">
            <img src={heartPng} alt="" />
            <h6>{`Are you sure you want to remove this ${
              !isType ? "game" : "icebreaker"
            } from favorite list?`}</h6>
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
              onClick={() => handleRemoveFilter(status)}
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
      {/* <div className="modal-content custom-modal">
        <div className="close-btn">
          <button
            type="button"
            onClick={onClose}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <img src={closePopup} alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body add-body text-center pt-4">
          <img src={heartPng} alt="" />
          <div className="filter-modal-name mt-4">REMOVE FROM FAVORITES</div>
          <p>
          {
            `Are you sure you want to remove this ${!isType ? "game" :"icebreaker"} from favorite list?`
          }
          </p>

          <button
            type="button"
            onClick={() => handleRemoveFilter(status)}
            className="button-primary add-pop-btn"
          >
            Yes
          </button>
        </div>
      </div> */}
    </Modal>
  );
};

export default FavouriteModal;
