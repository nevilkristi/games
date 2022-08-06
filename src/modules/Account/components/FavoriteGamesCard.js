import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteSVG from "assets/img/delete.svg";
import DeleteModalGame from "modules/Games/Game/components/DeleteModalGame";
import DOMPurify from "dompurify";
import FavoriteButton from "components/common/FavoriteButton";
import PlayedGameButton from "components/common/playedGameButton";
import NoDataFound from "components/common/NoDataFound";
import { PlaceHolderCard } from "components/preloders";
import StarRatings from "react-star-ratings";
import CountUp from "react-countup";
import DefaultSvg from "assets/img/placeholder-card.png";
import { videoExtensions } from "constants/fileType";

const FavoriteGamesCard = ({ Game, location }) => {
  const [gamesData, setGameData] = useState([]);
  const [issLoad, setIsLoad] = useState(true);

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    data: null,
    id: 0,
  });

  useEffect(() => {
    setGameData(Game);
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [Game]);

  const handleClose = () => {
    setDeleteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  return (
    <>
      {issLoad ? (
        <div className="row">
          <PlaceHolderCard />
        </div>
      ) : gamesData.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="row">
          {gamesData.map((game, index) => (
            <div className="screenView  col-sm-12 col-md-6 col-lg-4">
              <div className="item card" key={"fav" + game?.game_id}>
                <div className="card-body game-item">
                  <div className="game-item-content">
                    <Link
                      to={
                        game.redirect_keyword
                          ? `/${game.redirect_keyword}`
                          : `/game/${game.game_id}`
                      }
                      className="d-flex align-items-center"
                      key={index}
                    >
                      <div className="game-item-img">
                        {videoExtensions.includes(
                          game?.attachment_url.split(".")[5]
                        ) ? (
                          <video
                            width={98}
                            height={98}
                            style={{ borderRadius: "9px" }}
                            preload="metadata"
                            className="video-thumb"
                          >
                            <source
                              src={game?.attachment_url + "#t=5"}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <img
                            src={
                              game.attachment_url
                                ? game.attachment_url
                                : DefaultSvg
                            }
                            alt="img"
                          />
                        )}
                      </div>
                      <div className="game-item-text">{game.game_title}</div>
                    </Link>

                    <div
                      className="game-description gray-text mt-3 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(game.game_description),
                      }}
                    />

                    <div className="feature-item-filters">
                      {game.filters !== undefined &&
                        game.filters.map((filter, index) => {
                          return (
                            <Link
                              to={"/games/filter/" + filter.filter_id}
                              key={"filterPlay" + index}
                              className="custom-badge"
                            >
                              {filter.name}
                            </Link>
                          );
                        })}
                    </div>

                    <hr />
                    <div
                      className={
                        game.is_user_game
                          ? "d-flex justify-content-end game-item-review-fav"
                          : "game-item-review-fav"
                      }
                    >
                      {!game.is_user_game && (
                        <div className="game-item-review">
                          <StarRatings
                            rating={game.rating}
                            starRatedColor="#ead74b"
                            numberOfStars={5}
                            name="rating"
                            className="single-star"
                            starDimension="16px"
                            starSpacing="2px"
                          />
                          <span className="rating-count ml-2 gray-text">
                            {game?.rating.toFixed(1)} (
                            <CountUp
                              duration={2}
                              end={game.total_rating}
                            />{" "}
                            {game.total_rating > 1 ? "Ratings " : "Rating "} )
                          </span>
                        </div>
                      )}
                      <div className="game-item-fav">
                        {game.is_user_game ? (
                          <div className="pos-rel">
                            <img
                              src={deleteSVG}
                              alt=""
                              onClick={() => {
                                setDeleteModal((prevState) => ({
                                  ...prevState,
                                  show: true,
                                  id: game?.game_id,
                                }));
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}

                        <FavoriteButton
                          gameId={game.game_id}
                          isFavourite={game?.is_favourite}
                          isModal={true}
                        />

                        <div className="ml-3">
                          <PlayedGameButton
                            gameId={game.game_id}
                            isPlayed={game.is_played}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <DeleteModalGame {...deleteModal} onClose={handleClose} />
        </div>
      )}
    </>
  );
};

export default FavoriteGamesCard;
