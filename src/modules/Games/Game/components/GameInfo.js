import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import DOMPurify from "dompurify";
import AddEditNote from "modules/Games/Note/components/AddEditNotes";
import { useDispatch, useSelector } from "react-redux";
import editSvg from "assets/img/edit_green.svg";
import FilterEditModal from "./FilterEditModal";
import CountUp from "react-countup";
import FavoriteButton from "components/common/FavoriteButton";
import ShareModal from "components/common/ShareModal";
import {
  resetRattingData,
  removeAllGameFilter,
  fetchGameRating,
  fetchSingleGame,
} from "store/actions";
import PageNotFound from "components/common/PageNotFound";
import GameInfoSlider from "./GameInfoSlider";
import moment from "moment";
import AddReviewModal from "modules/Games/Reviews/AddReviewModal";

import { ToastContainer, toast } from "react-toastify";
import GamePlaceHolder from "./GamePlaceHolder";

import profilePlaceholder from "assets/img/profile-placeholder.png";
import { UncontrolledTooltip } from "reactstrap";

function GameInfo({ singleGame }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { GalleryShow, loadingSingleGame } = useSelector((state) => state.Game);
  const [isLoad, setIsLoad] = useState(true);
  const [isGame, setIsGame] = useState([]);
  const [addReviewModal, setAddReviewModal] = useState({
    show: false,
    gameId: 0,
  });

  const { rating } = useSelector((state) => state.Rating);

  useEffect(() => {
    if (singleGame.game_id !== undefined) {
      dispatch(fetchGameRating({ game_id: singleGame.game_id }));
      // dispatch(fetchGameRating({ game_id: gameId }));
    }
  }, []);

  useEffect(() => {
    // dispatch(resetRattingData());
    if (singleGame?.game_id) {
      setIsGame(singleGame);
      // setIsLoad(false);
    }
  }, [singleGame]);

  const fetchRating = (gameId) => {
    if (gameId !== undefined) {
      dispatch(fetchGameRating({ game_id: gameId }));
      dispatch(fetchSingleGame(gameId, false));
    }
  };

  useEffect(() => {
    setIsLoad(loadingSingleGame);
  }, [loadingSingleGame]);

  const [addEditNoteModal, setAddEditNoteModal] = useState({
    show: false,
    data: null,
  });
  const [filterEditModal, setFilterEditModal] = useState({
    show: false,
    filter: [],
  });
  const [shareModal, setShareModal] = useState({
    show: false,
    data: null,
    url: process.env.REACT_APP_REDIRECT_URL + location.pathname,
    name: "",
  });

  const [textChangeGameInfo, setTextChangeGameInfo] = useState("Add Notes");

  useEffect(() => {
    if (isGame?.note === "") {
      setTextChangeGameInfo("Add Notes");
    } else {
      setTextChangeGameInfo("Edit Notes");
    }
  }, [textChangeGameInfo, isGame?.game_note_id]);

  const handleClose = () => {
    setAddEditNoteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const handleCloseReview = () => {
    setAddReviewModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const handleCloseShare = () => {
    setShareModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const handleCloseEdit = () => {
    setFilterEditModal((prevState) => ({
      ...prevState,
      show: false,
    }));
    dispatch(removeAllGameFilter());
  };

  const handleStatusChange = (status) => {
    return status;
  };

  const sections = ["what_to_get", "what_to_prep", "how_to_play", "pro_tips"];

  return isLoad ? (
    <GamePlaceHolder />
  ) : (
    !GalleryShow &&
      (Object.keys(singleGame).length === 0 || singleGame.no_data ? (
        <div className="col-12 col-lg-12">
          {singleGame.no_data && <PageNotFound />}
        </div>
      ) : (
        <div className="cust-flex">
          <ToastContainer />
          <div className="left-side-individual">
            <GameInfoSlider attachments={singleGame.attachments} />
          </div>
          <div className="right-side-individual">
            <div className="main-right-individual-flex">
              <div className="individual-title">
                <h2 className="mb-0">{singleGame?.game_title}</h2>
              </div>
              <div className="icon-individual">
                <div
                  id="share"
                  className="share-btn"
                  onClick={() => {
                    setShareModal((prev) => ({
                      ...prev,
                      show: true,
                      name: isGame?.game_title,
                    }));
                  }}
                >
                  <UncontrolledTooltip target="share">
                    <div className="tooltip-subtext">Share</div>
                  </UncontrolledTooltip>
                </div>
                {/* <div className="like-btn-new"></div> */}
                <FavoriteButton
                  handleStatusChange={handleStatusChange}
                  gameId={singleGame.game_id}
                  isFavourite={singleGame.is_favourite}
                  isModal={location === "favoriteGame" ? true : false}
                />
              </div>
            </div>
            <h6 className="ind-author-name-main">
              by <span className="ind-author-name">{singleGame?.author} </span>
              (Author)
            </h6>
            <div className="game-item-review game-item-review2">
              {singleGame !== undefined && (
                <StarRatings
                  rating={isGame?.rating}
                  starRatedColor="#ead74b"
                  numberOfStars={5}
                  name="rating"
                  className="single-star"
                  starDimension="45px"
                  starSpacing="2px"
                />
              )}

              <span className="rating-count ml-2 ">
                {isGame?.rating?.toFixed(1)}
                <span className="rating-number">
                  {" ("}
                  <CountUp duration={2} end={isGame?.total_rating} />
                  {isGame.total_rating > 1 ? " Ratings " : " Rating"})
                </span>
              </span>
            </div>
            <div className="ind-desc">
              <h6>Game Description</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(singleGame?.game_description),
                }}
              ></p>
            </div>
            <div className="cust-btn-flex mprl0 mt20">
              {isGame.slide_link !== "" && (
                <Link
                  // to={isGame?.slide_link}
                  to={{
                    pathname: isGame?.slide_link,
                  }}
                  target="_blank"
                  className="btn-dull gameInfo cust-padd-bt"
                >
                  Download Slides
                </Link>
              )}

              {isGame?.is_user_game === 1 ? (
                <Link
                  to={"/game/edit/" + isGame?.game_id}
                  className="btn-primary cust-padd-btn"
                >
                  EDIT THIS GAME
                </Link>
              ) : (
                <Link
                  to="#"
                  className="btn-primary cust-padd-btn"
                  onClick={() => {
                    setAddReviewModal((prevState) => ({
                      ...prevState,
                      show: true,
                      gameId: isGame?.game_id,
                    }));
                  }}
                >
                  RATE THIS GAME
                </Link>
              )}
            </div>
            <hr className="c-hr" />
            {isGame &&
              sections.map((s, i) => {
                const keys = Object.keys(isGame);
                if (keys.includes(s) && isGame[s]) {
                  let t = s;
                  return (
                    <div key={i} className="ind-desc mt0">
                      <h6 style={{ textTransform: "capitalize" }}>
                        {t.replace(/[_]/g, " ")}
                      </h6>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(isGame[s]),
                        }}
                      ></p>
                    </div>
                  );
                }
                return null;
              })}

            <div className="ind-desc mt0">
              <h6 style={{ textTransform: "capitalize" }}>
                Note
                {/* <p> */}
                <span
                  className="c-ind-span ml-3"
                  onClick={() => {
                    setAddEditNoteModal((prevState) => ({
                      ...prevState,
                      show: true,
                    }));
                  }}
                >
                  {isGame?.game_note_id ? (
                    <>
                      <img className="pointer" alt="edit-img" src={editSvg} />
                    </>
                  ) : (
                    <i
                      className={
                        isGame?.game_note_id
                          ? "fa fa-pencil-square-o pointer"
                          : "fa fa-plus pointer"
                      }
                      aria-hidden="true"
                      id="note"
                    >
                      <UncontrolledTooltip target="note">
                        <div className="tooltip-subtext">Add Note</div>
                      </UncontrolledTooltip>
                    </i>
                  )}
                </span>
              </h6>
              {isGame.note !== "" && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      isGame.note === ""
                        ? "No Note You can add Your Notes"
                        : isGame.note
                    ),
                  }}
                ></p>
              )}
            </div>

            <div className="ind-desc filter-title-flex filter-right-img">
              <h6>
                Filters
                <img
                  onClick={() => {
                    setFilterEditModal({
                      show: true,
                      filter: isGame?.filters,
                    });
                  }}
                  alt="edit-img"
                  src={editSvg}
                  id="filters"
                />
                <UncontrolledTooltip target="filters">
                  <div className="tooltip-subtext">Add Filters</div>
                </UncontrolledTooltip>
              </h6>
            </div>
            <div className="c-flex mt-1">
              {isGame?.filters?.map((item, index) => {
                return (
                  <span
                    className="search-list2"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.name),
                    }}
                    key={index}
                  ></span>
                );
              })}
            </div>
            <hr className="c-hr" />

            {rating?.rows?.length > 0 && (
              <>
                <div className="ind-desc">
                  <h6>Review this Game</h6>
                  <p>Share your thoughts with other customers</p>
                </div>
                {rating?.rows?.slice(0, 2)?.map((item, index) => {
                  return (
                    <div key={index} className="ind-detail-reviews-main">
                      <div className="ind-detail-reviews">
                        <div className="ind-reviews-img">
                          <img
                            src={
                              item?.profile_image
                                ? item?.profile_image
                                : profilePlaceholder
                            }
                            alt="edit-img"
                            className="w100"
                          />
                        </div>
                        <div className="ind-review-title">
                          <h6>{item.username}</h6>
                          <div className="game-item-review">
                            <StarRatings
                              rating={item?.rating}
                              starRatedColor="#ead74b"
                              numberOfStars={5}
                              name="rating"
                              className="single-star"
                              starDimension="20px"
                              starSpacing="1px"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="c-reviews-date">
                        Written on{" "}
                        {moment(item.updated_datetime).format(
                          "DD/MM/YYYY, hh:MM A"
                        )}
                      </p>
                      <p className="c-reviews-content">{item?.review}</p>
                    </div>
                  );
                })}

                <hr className="c-hr" />

                <div className="cust-btn-flex mt40 mprl0">
                  <Link
                    to={"/reviews/" + singleGame?.game_id}
                    className="btn-dull gameInfo cust-padd-btn"
                    onClick={() => {
                      dispatch(resetRattingData());
                    }}
                  >
                    VIEW ALL REVIEWS
                  </Link>
                </div>
              </>
            )}
          </div>
          {addEditNoteModal.show && (
            <AddEditNote
              {...addEditNoteModal}
              onClose={handleClose}
              gameId={isGame?.game_id}
              noteId={isGame?.game_note_id}
              note={isGame?.note}
              mode={isGame?.game_note_id ? "Edit" : "Add"}
            />
          )}
          {filterEditModal.show && (
            <FilterEditModal
              show={filterEditModal.show}
              onClose={handleCloseEdit}
              filter={filterEditModal.filter}
              is_user={isGame?.is_user_game}
              game_id={isGame?.game_id}
            />
          )}
          {shareModal.show && (
            <ShareModal
              show={shareModal.show}
              url={shareModal.url}
              name={shareModal.name}
              gameId={isGame?.game_id}
              onClose={handleCloseShare}
            />
          )}
          {addReviewModal.show && (
            <AddReviewModal
              {...addReviewModal}
              onClose={handleCloseReview}
              toast={toast}
              fetchRating={fetchRating}
            />
          )}
        </div>
      ))
  );
}

export default GameInfo;
