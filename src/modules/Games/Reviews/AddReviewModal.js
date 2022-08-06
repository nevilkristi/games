import React, { useState, useEffect, useRef } from "react";
import closePopup from "assets/img/close.svg";
import closeSvg from "assets/img/close.svg";
import { Modal } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { RowPreloader } from "components/preloders";
import CustomDropZone from "components/common/CustomDropzone/CustomDropZone";
import {
  deleteGameAttachment,
  fetchSingleRating,
  addUpdateRating,
} from "store/actions";
import { Rating } from "react-simple-star-rating";
import { ToastContainer } from "react-toastify";
import { imageUrl } from "services/aws";

const thumbnailUrl = (url) => {
  if (!url) return "";
  const splitted = url.split(".");
  splitted.pop();
  return (splitted.join(".") + ".jpg").replace(
    imageUrl.S3GAME_URL,
    imageUrl.GAME_THUMBNAIL_URL
  );
};
const AddReviewModal = ({ show, onClose, gameId, toast, fetchRating }) => {
  const { GameRating, GameName } = useSelector((state) => state.Rating);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [review, setReview] = useState({
    rating: 0,
    review: "",
    attachments: [],
    game_id: gameId,
  });
  const [imageArray, setImageArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  useEffect(() => {
    dispatch(fetchSingleRating(gameId));
  }, [gameId]);
  useEffect(() => {
    setReview({
      rating: GameRating.rating,
      rating_id: GameRating.rating_id,
      review: GameRating.review,
      attachments: GameRating.attachments,
      game_id: gameId,
    });

    let imageArrayUrl = [];
    let videoArrayUrl = [];
    GameRating !== undefined &&
      GameRating?.attachments?.map((item) => {
        if (item.attachment_type === 1)
          imageArrayUrl.push({
            id: item.game_attachment_id,
            url: item.attachment_url,
            game_attachment_id: item.game_attachment_id,
          });
        else if (item.attachment_type === 2)
          videoArrayUrl.push({
            id: item.game_attachment_id,
            url: item.attachment_url,
            game_attachment_id: item.game_attachment_id,
          });
        return null;
      });

    setImageArray(imageArrayUrl);
    setVideoArray(videoArrayUrl);
  }, [GameRating]);

  const handleChange = (e) => {
    setReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (rate) => {
    setReview((prevState) => ({
      ...prevState,
      rating: rate / 20,
    }));
  };
  const handleRemoveAttachment = (e) => {
    if (e.target.getAttribute("data-attachment-id") !== 0)
      dispatch(
        deleteGameAttachment(e.target.getAttribute("data-attachment-id"))
      );
    if (e.target.getAttribute("data-file-type") === "image")
      setImageArray((prevState) =>
        prevState.filter(
          (item) => item.url !== e.target.getAttribute("data-attachment-url")
        )
      );
    else if (e.target.getAttribute("data-file-type") === "video")
      setVideoArray((prevState) =>
        prevState.filter(
          (item) => item.url !== e.target.getAttribute("data-attachment-url")
        )
      );
  };
  const handleSubmit = (e) => {
    let attachmentRes = [];
    imageArray?.map((item, index) => {
      item.url &&
        attachmentRes.push({
          attachment_url: item.url,
          attachment_type: 1,
          game_attachment_id: item.game_attachment_id
            ? item.game_attachment_id
            : 0,
        });
    });
    videoArray?.map(
      (item, index) =>
        item.url &&
        attachmentRes.push({
          attachment_url: item.url,
          attachment_type: 2,
          game_attachment_id: item.game_attachment_id
            ? item.game_attachment_id
            : 0,
        })
    );
    setReview({
      ...review,
      attachments: attachmentRes,
    });

    let req = review;
    req.attachments = attachmentRes;

    if (review.rating > 0 && review.game_id) {
      dispatch(
        addUpdateRating(req, () => {
          onClose();
          fetchRating(review.game_id);
        })
      );
    } else {
      toast.error("Game Rating  is required");
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={show}
        toggle={onClose}
        id="noteModal"
        className="modal-dialog c-modal-dialog"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Rate this Game
            </h5>
            <button
              type="button"
              className="close-img"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">
                <img src={closePopup} alt="close" />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              {!GameName ? (
                <>
                  <h4
                    className="card-title placeholder-glow"
                    style={{ width: "90px" }}
                  >
                    <span className="placeholder col-12"></span>
                  </h4>
                  <RowPreloader />
                </>
              ) : (
                <>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="c-label"
                  >
                    Review
                  </label>
                  <textarea
                    name="review"
                    className="form-control c-textarea"
                    id="review"
                    rows="4"
                    value={review.review}
                    placeholder="Write review"
                    onChange={handleChange}
                  ></textarea>
                </>
              )}
            </div>
            <label htmlFor="exampleFormControlTextarea1" className="c-label">
              Ratings
            </label>
            <div className="rating-changeable">
              {!GameName ? (
                <RowPreloader />
              ) : (
                <Rating
                  onClick={handleRating}
                  allowHalfIcon="true"
                  ratingValue={review.rating * 20}
                />
              )}
            </div>
            {!GameName ? (
              <>
                <h4
                  className="card-title placeholder-glow"
                  style={{ width: "90px" }}
                >
                  <span className="placeholder col-12"></span>
                </h4>
                <RowPreloader />
              </>
            ) : (
              <>
                <CustomDropZone
                  ref={ref}
                  handleOnDrop={(url) => {
                    setImageArray((prevState) => [
                      ...prevState,
                      { id: 0, url: url },
                    ]);
                  }}
                  type="image"
                  accept="image/jpeg,image/png,image/jpg"
                  // label="Images"
                  multiple={true}
                  bucketName={`${process.env.REACT_APP_AWS_BUCKET_NAME}`}
                  folderName={`${process.env.REACT_APP_AWS_FOLDER_NAME}`}
                />
              </>
            )}
            <div className="upload-area review ml-2">
              {imageArray !== [] &&
                imageArray.map((item, index) => {
                  return (
                    item.url !== "" && (
                      <div key={index} className="box box-solid mr-3">
                        <div className="box-header with-border">
                          <div className="box-tools pull-right">
                            <button
                              type="button"
                              className="btn  btn-xs remove-preview close-upload-img pointer"
                            >
                              <img
                                src={closeSvg}
                                onClick={handleRemoveAttachment}
                                data-attachment-id={item?.id}
                                data-file-type="image"
                                data-attachment-url={item.url}
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                        <div className="box-body">
                          <img
                            className="attachmentImg"
                            alt="attachment-url"
                            src={item.url.replace(
                              imageUrl.S3GAME_URL,
                              imageUrl.GAME_DISPLAY_URL
                            )}
                          />
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            {!GameName ? (
              <>
                <h4
                  className="card-title placeholder-glow"
                  style={{ width: "90px" }}
                >
                  <span className="placeholder col-12"></span>
                </h4>
                <RowPreloader />
              </>
            ) : (
              <CustomDropZone
                ref={ref}
                handleOnDrop={(url) => {
                  setVideoArray((prevState) => [
                    ...prevState,
                    { id: 0, url: url },
                  ]);
                }}
                type="video"
                accept="video/mp4,video/mov"
                multiple={true}
                bucketName={`${process.env.REACT_APP_AWS_BUCKET_NAME}`}
                folderName={`${process.env.REACT_APP_AWS_FOLDER_NAME}`}
              />
            )}
            <div className="upload-area review ml-2">
              {videoArray !== [] &&
                videoArray.map((item, index) => {
                  return (
                    item.url !== "" && (
                      <div className="preview-zone hidden" key={index}>
                        <div className="box box-solid">
                          <div className="box-header with-border">
                            <div className="box-tools pull-right">
                              <button
                                type="button"
                                className="btn  btn-xs remove-preview close-upload-img pointer"
                              >
                                <img
                                  src={closeSvg}
                                  onClick={handleRemoveAttachment}
                                  data-file-type="video"
                                  data-attachment-url={item.url}
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                          <div className="box-body">
                            <img
                              className="attachmentImg ml-2"
                              alt="attachment-url"
                              src={thumbnailUrl(item.url)}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div className="cust-btn-flex justify-content-center mt20">
              <button
                className="btn-dull gameInfo cust-padd-bt"
                data-dismiss="modal"
                onClick={onClose}
              >
                CANCEL
              </button>
              <button
                className="btn-primary cust-padd-btn cursor-pointer"
                onClick={handleSubmit}
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddReviewModal;
