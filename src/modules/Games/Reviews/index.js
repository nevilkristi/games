import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import profilePlaceholder from "assets/img/profile-placeholder.png";
import moment from "moment";
import cardPlaceholder from "assets/img/placeholder-card.svg";
import DummyArray from "services/dummyArray";
import CustomGallery from "../Game/components/CustomGallery";
import Slider from "react-slick";
import leftarrow from "assets/img/arrow-left.svg";
import AddReviewModal from "./AddReviewModal";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RowPreloader } from "components/preloders";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "reactstrap";
import { imageUrl } from "services/aws";
import { fetchGameRating } from "store/actions";
import NoDataFound from "components/common/NoDataFound";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
const arr = DummyArray(5);

function GameReview() {
  const dispatch = useDispatch();
  const { rating, GameName } = useSelector((state) => state.Rating);
  const params = useParams();
  const gameId = params.id;
  const [lightBox, setLightBox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaAttachment, setMediaAttachment] = useState([]);
  const [dummyArray, setDummyArray] = useState([]);
  const [addReviewModal, setAddReviewModal] = useState({
    show: false,
    gameId: 0,
  });
  const handleClose = () => {
    setAddReviewModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const thumbnailUrl = (url) => {
    if (!url) return "";
    const splitted = url.split(".");
    splitted.pop();
    return (splitted.join(".") + ".jpg").replace(
      imageUrl.S3GAME_URL,
      imageUrl.GAME_THUMBNAIL_URL
    );
  };

  const clickOpenMedia = (data) => {
    setLightBox(true);
    setMediaAttachment(data);
  };

  useEffect(() => {
    setDummyArray(arr);
  }, [GameName]);

  const fetchRating = (gameId) => {
    if (gameId !== undefined) {
      dispatch(fetchGameRating({ game_id: gameId }));
    }
  };
  useEffect(() => {
    fetchRating(gameId);
  }, [dispatch, gameId]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    arrows: true,
  };

  let gameAttachments = [];
  return (
    <>
      <section className="pb60">
        <ToastContainer />
        <div className="c-plr100">
          <div className="pt30">
            <div className="back-arrow-title">
              <Link
                to={"/game/" + gameId}
                className="back-arrow back-arrow-canvas"
              >
                <img src={leftarrow} alt="" className="h20" />
              </Link>

              <div className="title-and-logo">
                <div className="individual-title">
                  {!GameName && (
                    <div style={{ width: "30%", margin: "0 auto" }}>
                      <RowPreloader />
                    </div>
                  )}
                  <h2 className="mb-0"> {GameName ? GameName : ""}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="cust-flex pt30">
            <div className="left-side-reviews">
              <div className="search-area">
                <h6>Star Rating</h6>
                <div className="game-item-review-main">
                  <div className="game-item-review">
                    {!rating.game_name ? (
                      <div style={{ width: "150px" }}>
                        <RowPreloader />
                      </div>
                    ) : (
                      <>
                        <StarRatings
                          rating={rating?.average_rating}
                          starRatedColor="#ead74b"
                          numberOfStars={5}
                          name="rating"
                          className="single-star"
                          starDimension="25px"
                          starSpacing="2px"
                        />
                      </>
                    )}
                  </div>
                  <div className="review-out-of">
                    {!rating.game_name ? (
                      <div style={{ width: "50px" }}>
                        <RowPreloader />
                      </div>
                    ) : (
                      <>{rating?.average_rating} out of 5</>
                    )}{" "}
                  </div>
                </div>
                <p className="rating-number mt10">
                  ( {rating?.total_rating} global{" "}
                  {rating.total_rating > 1 ? "ratings " : "rating "})
                </p>
                <div className="review-bar-main row">
                  <div className="col-sm-3">
                    <h6>5 star</h6>
                  </div>
                  <div className="col-sm-6 progress-div">
                    {" "}
                    <Progress value={rating.star5} />
                  </div>
                  <div className="col-sm-3">
                    {" "}
                    <h6 className="text-right">
                      {isNaN(Number(rating?.star5).toFixed(2))
                        ? 0
                        : Number(rating?.star5).toFixed(2)}
                      {rating.star5 ? "%" : "%"}
                    </h6>
                  </div>
                </div>
                <div className="review-bar-main row">
                  <div className="col-sm-3">
                    <h6>4 star</h6>
                  </div>
                  <div className="progress-div col-sm-6">
                    <Progress value={rating.star4} />
                  </div>
                  <div className="col-sm-3">
                    <h6 className="text-right">
                      {isNaN(Number(rating?.star4).toFixed(2))
                        ? 0
                        : Number(rating?.star4).toFixed(2)}
                      {rating.star4 ? "%" : "%"}
                    </h6>
                  </div>
                </div>
                <div className="review-bar-main row">
                  <div className="col-sm-3">
                    <h6>3 star</h6>
                  </div>
                  <div className="progress-div col-sm-6">
                    <Progress value={rating.star3} />
                  </div>
                  <div className="col-sm-3">
                    <h6 className="text-right">
                      {isNaN(Number(rating?.star3).toFixed(2))
                        ? 0
                        : Number(rating?.star3).toFixed(2)}
                      {rating.star3 ? "%" : "%"}
                    </h6>
                  </div>
                </div>
                <div className="review-bar-main row">
                  <div className="col-sm-3">
                    <h6>2 star</h6>
                  </div>
                  <div className="progress-div col-sm-6">
                    <Progress value={rating.star2} />
                  </div>
                  <div className="col-sm-3">
                    <h6 className="text-right">
                      {isNaN(Number(rating?.star2).toFixed(2))
                        ? 0
                        : Number(rating?.star2).toFixed(2)}
                      {rating.star2 ? "%" : "%"}
                    </h6>
                  </div>
                </div>
                <div className="review-bar-main row">
                  <div className="col-sm-3">
                    <h6>1 star</h6>
                  </div>
                  <div className="progress-div col-sm-6">
                    <Progress value={rating.star1} />
                  </div>
                  <div className="col-sm-3">
                    <h6 className="text-right">
                      {isNaN(Number(rating?.star1).toFixed(2))
                        ? 0
                        : Number(rating?.star1).toFixed(2)}
                      {rating.star1 ? "%" : "%"}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side-reviews">
              <div className="main-right-individual-flex m-main-right-individual-flex ">
                <div className="individual-title">
                  <h2 className="">Customer Reviews</h2>
                  <p className="reviews-main-subtitle">
                    Share your thoughts with other customers
                  </p>
                </div>
                <div className="icon-individual">
                  {!GameName ? (
                    <RowPreloader />
                  ) : (
                    <div className="cust-btn-flex mprl0">
                      <button
                        className="btn-primary cust-padd-btn cursor-pointer"
                        onClick={() => {
                          setAddReviewModal((prevState) => ({
                            ...prevState,
                            show: true,
                            gameId: gameId,
                          }));
                        }}
                      >
                        Rate This Game
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!rating?.total_attachment ? (
                <>
                  <div className="mtb20">
                    <RowPreloader />
                    {dummyArray.map((i) => (
                      <img
                        key={i}
                        src={cardPlaceholder}
                        className="card-img-top"
                        alt="..."
                        style={{
                          marginRight: "20px",
                          height: "100px",
                          width: "100px",
                          borderRadius: "16px",
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : rating.total_attachment.length > 0 ? (
                <div className="mtb20 d-flex review_img_wrapper">
                  {rating?.total_attachment?.map((item, index) => {
                    return (
                      index < 4 && (
                        <div
                          key={index}
                          className={`mr-2 review_img ${
                            rating.total_attachment.length - 4 > 0 &&
                            index === 3 &&
                            "review_img_last"
                          }`}
                        >
                          <Link
                            to="#"
                            className="item review-carasole slider-carousel"
                            key={index}
                          >
                            {item.attachment_type === 1 ? (
                              <>
                                <img
                                  src={item.attachment_url.replace(
                                    imageUrl.S3GAME_URL,
                                    imageUrl.GAME_DISPLAY_URL
                                  )}
                                  className="w100 carousel-img"
                                  alt=""
                                  onClick={() => {
                                    setCurrentIndex(index);
                                    clickOpenMedia(rating.total_attachment);
                                  }}
                                />
                                {rating.total_attachment.length - 4 > 0 &&
                                  index === 3 && (
                                    <p
                                      onClick={() => {
                                        setCurrentIndex(index);
                                        clickOpenMedia(rating.total_attachment);
                                      }}
                                    >
                                      +{rating.total_attachment.length - 4}
                                    </p>
                                  )}
                              </>
                            ) : (
                              <>
                                <video
                                  preload="metadata"
                                  className="w100 carousel-video"
                                  onClick={() => {
                                    setCurrentIndex(index);
                                    clickOpenMedia(rating?.total_attachment);
                                  }}
                                >
                                  <source
                                    src={item.attachment_url + "#t=5"}
                                    type="video/mp4"
                                  />
                                </video>
                                {rating.total_attachment.length - 4 > 0 &&
                                  index === 3 && (
                                    <p
                                      onClick={() => {
                                        setCurrentIndex(index);
                                        clickOpenMedia(rating.total_attachment);
                                      }}
                                    >
                                      +{rating.total_attachment.length - 4}
                                    </p>
                                  )}
                              </>
                            )}
                          </Link>
                        </div>
                      )
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <hr className="cust-hr" />
              {!rating?.rows ? (
                <div style={{ marginTop: "50px" }}>
                  {/* PlaceHolder */}
                  <RowPreloader />
                  <div className="row" style={{ width: "200px" }}>
                    <div className="col-md-4">
                      <img
                        src={cardPlaceholder}
                        className="card-img-top"
                        alt="..."
                        style={{
                          marginRight: "20px",
                          height: "60px",
                          width: "60px",
                          borderRadius: "16px",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h4 className="card-title placeholder-glow">
                        <span className="placeholder col-12"></span>
                      </h4>
                      <h6 className="card-title placeholder-glow">
                        <span className="placeholder col-12"></span>
                      </h6>
                    </div>
                    <div
                      className="row"
                      style={{ width: "200px", marginLeft: "5px" }}
                    >
                      <div className="col-md-8">
                        <h6 className="card-title placeholder-glow">
                          <span className="placeholder col-12"></span>
                        </h6>
                      </div>
                    </div>
                    <div
                      style={{
                        paddingLeft: "10px",
                        width: "200px",
                        marginLeft: "5px",
                        display: "flex",
                      }}
                    >
                      <img
                        src={cardPlaceholder}
                        className="card-img-top"
                        alt="..."
                        style={{
                          marginRight: "20px",
                          height: "90px",
                          width: "90px",
                          borderRadius: "16px",
                        }}
                      />
                      <img
                        src={cardPlaceholder}
                        className="card-img-top"
                        alt="..."
                        style={{
                          marginRight: "20px",
                          height: "90px",
                          width: "90px",
                          borderRadius: "16px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : rating?.rows?.length > 0 ? (
                <>
                  {rating?.total_attachment?.map((attachment, index) => {
                    gameAttachments?.push({
                      src: attachment.attachment_url,
                      thumbnail: attachment.attachment_url,
                      thumbnailWidth: 10,
                      thumbnailHeight: 10,
                      caption: attachment.display_name,
                    });
                  })}
                  {rating.rows.map((row, index) => {
                    let game_attachment = [];
                    return (
                      <div
                        key={index}
                        className="ind-detail-reviews-main reviews-main-page"
                      >
                        <div className="ind-detail-reviews">
                          <div className="ind-reviews-img">
                            <img
                              src={
                                row?.profile_image
                                  ? row?.profile_image
                                  : profilePlaceholder
                              }
                              alt="profileImage"
                              className="w100"
                            />
                          </div>
                          <div className="ind-review-title">
                            <h6>{row?.username}</h6>
                            <div className="game-item-review">
                              <StarRatings
                                rating={row?.rating}
                                starRatedColor="#ead74b"
                                numberOfStars={5}
                                name="rating"
                                className="single-star"
                                starDimension="25px"
                                starSpacing="2px"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="c-reviews-date">
                          Written on{" "}
                          {moment(row?.updated_datetime).format(
                            "MM/DD/YYYY, hh:mm A "
                          )}
                        </p>
                        <p className="c-reviews-content">{row?.review}</p>
                        {row?.attachments?.map((attachment, index) => {
                          game_attachment?.push({
                            src: attachment.attachment_url,
                            thumbnail: attachment.attachment_url,
                            thumbnailWidth: 10,
                            thumbnailHeight: 10,
                            caption: attachment.display_name,
                          });
                        })}
                        <div className="c-flex c-reviews-img review-img-flow">
                          {row?.attachments?.map((attachment, index) => {
                            return (
                              attachment.attachment_url && (
                                <>
                                  {attachment.attachment_type === 1 ? (
                                    <img
                                      src={attachment.attachment_url}
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setCurrentIndex(index);
                                        clickOpenMedia(row.attachments);
                                      }}
                                    />
                                  ) : (
                                    <video
                                      preload="metadata"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setCurrentIndex(index);
                                        clickOpenMedia(row.attachments);
                                      }}
                                    >
                                      <source
                                        src={attachment.attachment_url + "#t=5"}
                                        type="video/mp4"
                                      />
                                    </video>
                                  )}
                                </>
                              )
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="row mt-5 no-data-found justify-content-center">
                  <NoDataFound />
                </div>
              )}
              <hr className="c-hr" />
            </div>
          </div>
        </div>
        {lightBox && (
          <CustomGallery
            data={mediaAttachment}
            profile={true}
            onClose={() => {
              setLightBox(false);
            }}
            index={currentIndex}
          />
        )}
        {addReviewModal.show && (
          <AddReviewModal
            {...addReviewModal}
            onClose={handleClose}
            toast={toast}
            fetchRating={fetchRating}
          />
        )}
      </section>
    </>
  );
}

export default GameReview;
