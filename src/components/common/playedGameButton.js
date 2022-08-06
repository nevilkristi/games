import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUpdatePlayedGame, removePlayedGame } from "store/actions";
import PlayegGameModal from "modules/Account/components/PlayegGameModal";
import { UncontrolledTooltip } from "reactstrap";

const PlayedGameButton = ({
  isPlayed,
  gameId,
  isModal = false,
  toolTipText = false,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setStatus(isPlayed);
  }, [isPlayed]);

  const handleAddPlayedGame = (sts) => {
    setStatus(sts);

    dispatch(
      addUpdatePlayedGame(
        {
          game_id: gameId,
          is_played: sts,
        },
        "myGames"
      )
    );

    if (sts === 0) dispatch(removePlayedGame(gameId));
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <span className="cust-square-img">
      <div className="form-check">
        <input
          onChange={() => {
            if (!isModal) {
              handleAddPlayedGame(status ? 0 : 1);
            } else {
              setShow(true);
            }
          }}
          className="form-check-input chbox-card pointer"
          type="checkbox"
          checked={status ? true : false}
          id={`playedGameButton_${gameId}`}
        />
        <UncontrolledTooltip
          placement="left"
          target={`playedGameButton_${gameId}`}
        >
          <div className="tooltip-subtext">
            {status ? "Remove from Played Game" : "Add to Played Game"}
          </div>
        </UncontrolledTooltip>
      </div>
      {isModal && (
        <PlayegGameModal
          show={show}
          onClose={handleClose}
          gameId={gameId}
          isPlayed={status ? 0 : 1}
        />
      )}
    </span>
    //<label className="checkbox-style-one">
    //   <input
    //     onChange={() => {
    //       if (!isModal) {
    //         handleAddPlayedGame(status ? 0 : 1);
    //       } else {
    //         setShow(true);
    //       }
    //     }}
    //     type="checkbox"
    //     checked={status ? true : false}
    //   />
    //   <span className="checkmark"></span>
    // {isModal && (
    //   <PlayegGameModal
    //     show={show}
    //     onClose={handleClose}
    //     gameId={gameId}
    //     isPlayed={status ? 0 : 1}
    //   />
    // )}
    // </label>
  );
};

export default PlayedGameButton;
