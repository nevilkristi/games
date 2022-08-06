import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeleteModalGame from "modules/Games/Game/components/DeleteModalGame";
import StarRatings from "react-star-ratings";
import DOMPurify from "dompurify";
import FavoriteButton from "components/common/FavoriteButton";
import PlayedGameButton from "components/common/playedGameButton";
import CountUp from "react-countup";
import NoDataFound from "components/common/NoDataFound";
import { PlaceHolderCard } from "components/preloders";
import DefaultSvg from "assets/img/placeholder-card.png";
import { videoExtensions } from "constants/fileType";
import { imageUrl } from "services/aws";

function GamesCard({ location = "dashboard", Game = [], loading = false }) {
  const [games, setGames] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const history = useHistory();

  const TextAbstract = (text, length) => {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  };

  useEffect(() => {
    if (Game.length > 0) {
      const timer = setTimeout(() => {
        setIsLoad(false);
      }, 1000);
      setGames(Game);
      return () => {
        clearTimeout(timer);
      };
    } else if (Game.length === 0) {
      const timer = setTimeout(() => {
        setIsLoad(false);
      }, 1000);
      setGames([]);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [Game, loading]);

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    data: null,
    id: 0,
  });

  const handleClose = () => {
    setDeleteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const handleStatusChange = (status) => status;
  return (
    <React.Fragment>
      {isLoad ? (
        <div className="row mt-3">
          <PlaceHolderCard />
        </div>
      ) : games?.length === 0 ? (
        <div className="mt-5">
          <NoDataFound />
        </div>
      ) : (
        <div className="row" style={{ marginBottom: "30px" }}>
          {games !== undefined &&
            games.map((game, index) => {
              return (
                <div
                  className="c-col-xl-6 col-sm-12 col-md-6 col-lg-4 mt20"
                  key={index}
                >
                  <div className="card c-card-right-dashboard ">
                    <div className="card-body cursor-default c-card-body">
                      <div
                        className="card-top pointer"
                        onClick={() => {
                          history.push(
                            game.redirect_keyword
                              ? `/${game.redirect_keyword}`
                              : `/game/${game.game_id}`
                          );
                        }}
                      >
                        {videoExtensions?.includes(
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
                                ? game.attachment_url.replace(
                                    imageUrl.S3GAME_URL,
                                    imageUrl.GAME_DISPLAY_URL
                                  )
                                : DefaultSvg
                            }
                            className="w100 card-img-max"
                            alt="img"
                          />
                        )}
                      </div>
                      <PlayedGameButton
                        handleStatusChange={handleStatusChange}
                        gameId={game.game_id}
                        isPlayed={game.is_played}
                        isModal={location === "playedGame" ? true : false}
                        toolTipText={true}
                      />

                      <div className="card-desc-main">
                        <div
                          className="c-flex"
                          style={{
                            maxHeight: "85px",
                            overflow: "hidden",
                          }}
                        >
                          {game.filters !== undefined &&
                            game.filters.map((filter, index) => {
                              return (
                                <Link
                                  to={"/games/filter/" + filter.filter_id}
                                  key={index}
                                  className="mb-2"
                                >
                                  <span
                                    className="search-list"
                                    dangerouslySetInnerHTML={
                                      filter.name !== null
                                        ? { __html: filter.name }
                                        : null
                                    }
                                  ></span>
                                </Link>
                              );
                            })}
                        </div>
                        <div
                          className="pointer"
                          onClick={() => {
                            history.push(
                              game.redirect_keyword
                                ? `/${game.redirect_keyword}`
                                : `/game/${game.game_id}`
                            );
                          }}
                        >
                          <h6 className="mt20">{game.game_title}</h6>
                          <div
                            className="game-descriptions"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                TextAbstract(game.game_description, 170),
                                TextAbstract
                              ),
                            }}
                          ></div>{" "}
                        </div>
                        <div className="game-item-review align-items-start">
                          <Link to={`/reviews/${game.game_id}`}>
                            <StarRatings
                              rating={game?.rating}
                              starRatedColor="#ead74b"
                              numberOfStars={5}
                              name="rating"
                              className="single-star"
                              starDimension="24px"
                              starSpacing="2px"
                            />

                            <span className="rating-count ml-2 ">
                              <span style={{ lineHeight: "21px" }}>
                                {game?.rating.toFixed(1)}
                              </span>
                              <span className="rating-number">
                                (
                                <CountUp
                                  duration={2}
                                  end={game.total_rating}
                                />{" "}
                                {game.total_rating > 1 ? "Ratings" : "Rating"})
                              </span>
                            </span>
                          </Link>
                        </div>
                        <div className="c-flex mt20 btn-view-details">
                          {location === "myGames" ? (
                            <>
                              <Link
                                to={`/game/edit/${game.game_id}`}
                                className="btn-bordered"
                                style={{ marginBottom: "10px" }}
                              >
                                Edit Game
                              </Link>
                              <Link
                                data-toggle="modal"
                                data-target="#deletegame"
                                className="btn-delete fs13 cursor-pointer"
                                to="#"
                                onClick={() => {
                                  setDeleteModal((prevState) => ({
                                    ...prevState,
                                    show: true,
                                    id: game.game_id,
                                  }));
                                }}
                                style={{ marginBottom: "10px" }}
                              >
                                Delete
                              </Link>
                            </>
                          ) : (
                            <Link
                              to={
                                game.redirect_keyword
                                  ? `/${game.redirect_keyword}`
                                  : `/game/${game.game_id}`
                              }
                              className="btn-bordered-game"
                            >
                              View Details
                            </Link>
                          )}

                          <FavoriteButton
                            handleStatusChange={handleStatusChange}
                            gameId={game.game_id}
                            isFavourite={game.is_favourite}
                            isModal={location === "favoriteGame" ? true : false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <DeleteModalGame {...deleteModal} onClose={handleClose} />
        </div>
      )}
    </React.Fragment>
  );
}

export default GamesCard;
