import { useDispatch } from "react-redux";
import {
  addUpdateFavoriteGame,
  saveFavoriteIceBreaker,
  removeFavoriteGames,
  removeFavoriteIceBreaker,
} from "store/actions";
import { useEffect, useState } from "react";
import FavouriteModal from "./FavouriteModal";
import { UncontrolledTooltip } from "reactstrap";

const FavoriteButton = ({
  isFavourite,
  gameId,
  isType = false,
  isModal = false,
  locationType = "my-fav",
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(0);

  const [isShow, setIsShow] = useState(false);
  const handleClose = () => {
    setIsShow(false);
  };
  useEffect(() => {
    setStatus(isFavourite);
  }, [isFavourite]);

  const isFev = (sts) => {
    setStatus(sts);
    if (!isType) {
      dispatch(
        addUpdateFavoriteGame({
          game_id: gameId,
          is_favourite: sts,
        })
      );
      if (sts === 0) dispatch(removeFavoriteGames(gameId));
    } else {
      dispatch(
        saveFavoriteIceBreaker({
          icebreaker_id: gameId,
          is_favourite: sts,
        })
      );
      if (sts === 0) dispatch(removeFavoriteIceBreaker(gameId));
    }
  };

  return (
    <>
      <div
        className={`${status ? "active like-btn pointer" : "like-btn pointer"}`}
        onClick={() => {
          if (!isModal) {
            isFev(status ? 0 : 1);
          } else {
            setIsShow(true);
          }
        }}
        id={`favGameButton_${gameId}`}
      >
        {isModal && (
          <FavouriteModal
            show={isShow}
            onClose={handleClose}
            gameId={gameId}
            isFavvourite={status ? 0 : 1}
            isType={isType}
          />
        )}
      </div>
      <UncontrolledTooltip placement="top" target={`favGameButton_${gameId}`}>
        <div className="tooltip-subtext">
          {status ? "Remove from Favourite" : "Add to Favourite"}
        </div>
      </UncontrolledTooltip>
    </>
  );
};

export default FavoriteButton;
