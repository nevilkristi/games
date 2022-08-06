/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import LeftSideBar from "modules/Dashboard/components/LeftSideBar";
import closeSvg from "assets/img/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import {
  fetchSingleGame,
  setGameFilter,
  removeAllGameFilter,
  deleteGameAttachment,
  removeGameFilter,
  createGame,
} from "store/actions";
import CustomDropZone from "components/common/CustomDropzone/CustomDropZone";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import PlaceHolder from "./PlaceHolder";
import debounce from "lodash.debounce";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const gameId = params.id;
  const ref = useRef(null);
  const { SingleGame } = useSelector((state) => state.Game);
  const { gameFilter } = useSelector((state) => state.Dashboard);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (gameId !== undefined) dispatch(fetchSingleGame(gameId));
  }, [dispatch, gameId]);

  const [imageArray, setImageArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  const [gameDetails, setGameDetail] = useState({
    title: "",
    Description: "",
    what_to_get: "",
    what_to_prep: "",
    how_to_play: "",
    pro_tips: "",
  });
  useEffect(() => {
    dispatch(removeAllGameFilter());
    if (gameId !== undefined) {
      SingleGame?.filters?.map((item, index) =>
        dispatch(
          setGameFilter({
            id: item.filter_id,
            name: item.name,
            gi_filter_id: item.gi_filter_id,
          })
        )
      );

      if (SingleGame.length !== 0) {
        setGameDetail({
          title: SingleGame.game_title,
          Description: SingleGame.game_description,
          what_to_get: SingleGame.what_to_get,
          how_to_play: SingleGame.how_to_play,
          pro_tips: SingleGame.pro_tips,
          what_to_prep: SingleGame.what_to_prep,
        });
      } else {
        setGameDetail({
          title: "",
          Description: "",
          what_to_get: "",
          how_to_play: "",
          pro_tips: "",
          what_to_prep: "",
        });
      }

      let imageArrayUrl = [];
      let videoArrayUrl = [];
      SingleGame !== undefined &&
        SingleGame?.attachments?.map((item) => {
          if (item.attachment_type === 1)
            imageArrayUrl.push({
              id: item.game_attachment_id,
              url: item.attachment_url,
              attachmentId: item.game_attachment_id,
            });
          else if (item.attachment_type === 2)
            videoArrayUrl.push({
              id: item.game_attachment_id,
              url: item.attachment_url,
              attachmentId: item.game_attachment_id,
            });
          return null;
        });

      setImageArray(imageArrayUrl);
      setVideoArray(videoArrayUrl);
    } else {
      setGameDetail({
        title: "",
        Description: "",
        what_to_get: "",
        how_to_play: "",
        pro_tips: "",
        what_to_prep: "",
      });
    }
  }, [SingleGame]);

  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, []);

  const handleChange = (e) => {
    setGameDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = () => {
    let Filter = [];

    gameFilter !== [] &&
      gameFilter?.map((item, index) =>
        item.gi_filter_id !== undefined
          ? Filter.push({
              filter_id: item.id,
              gi_filter_id: item.gi_filter_id,
              filter_type: 1,
            })
          : Filter.push({ filter_id: item.id, filter_type: 1 })
      );

    let attachmentRes = [];

    imageArray?.map(
      (item, index) =>
        item.url !== "" &&
        attachmentRes.push({
          attachment_url: item.url,
          attachment_type: 1,
        })
    );

    videoArray?.map(
      (item, index) =>
        item.url !== "" &&
        attachmentRes.push({
          attachment_url: item.url,
          attachment_type: 2,
        })
    );

    let Data = {
      game_description: gameDetails.Description,
      game_title: gameDetails.title,
      what_to_get: gameDetails.what_to_get,
      what_to_prep: gameDetails.what_to_prep,
      how_to_play: gameDetails.how_to_play,
      pro_tips: gameDetails.pro_tips,
      filters: Filter,

      attachments: attachmentRes,
    };

    if (gameId !== undefined) {
      Data = {
        game_id: gameId,
        game_description: gameDetails.Description,
        game_title: gameDetails.title,
        what_to_get: gameDetails.what_to_get,
        what_to_prep: gameDetails.what_to_prep,
        how_to_play: gameDetails.how_to_play,
        pro_tips: gameDetails.pro_tips,
        attachments: attachmentRes,
        filters: Filter,
      };
    }

    if (
      gameDetails.title !== "" &&
      gameDetails.Description !== "" &&
      imageArray.length >= 1 &&
      attachmentRes.length > 0 &&
      Filter.length !== 0
    ) {
      dispatch(
        createGame(Data, () => {
          gameId !== undefined
            ? toast.success("Game updated successfully.")
            : toast.success("Game created successfully.");
          history.push("/accounts/myGames");
        })
      );
    } else {
      gameDetails.title.length === 0 && toast.error("Please enter game title.");
      gameDetails.Description.length === 0 &&
        toast.error("Please enter game description.");
      imageArray.length > 1 ||
        (imageArray.length === 0 &&
          toast.error("Please choose at least one image"));
      Filter.length === 0 && toast.error("Please choose at least one filter.");
    }
  };

  const handleRemoveAttachment = (e) => {
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

  const handleRemoveFilter = (v) => {
    dispatch(removeGameFilter(v));
  };

  return (
    <section className="pb60">
      <ToastContainer />
      <div className="container-fluid c-plr100">
        <div className="cust-flex pt30">
          <div className="left-side-dashboard">
            <LeftSideBar type="game" location="add" />
          </div>

          <div className="right-side-dashboard">
            {isLoad ? (
              <PlaceHolder />
            ) : (
              <>
                <div className="search-area-right-dashboard ">
                  <h6> {gameId !== undefined ? "Edit" : "Create"} Game</h6>
                </div>
                <div className="game-main-card">
                  <div className="form-group">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      Filters :
                    </label>
                    <div className="c-flex c-search-filter">
                      {/* No Filter Selected */}
                      {gameFilter.length !== 0 ? (
                        gameFilter !== [] &&
                        gameFilter.map((item, index) => (
                          <button
                            className="btn-primary fw600 mb-2"
                            key={index}
                          >
                            {item.name}
                            <img
                              src={closeSvg}
                              onClick={() => {
                                handleRemoveFilter(item.id);
                              }}
                              className="c-icebreaker-filter-close pointer"
                            />
                          </button>
                        ))
                      ) : (
                        <p className="c-label select-filter">
                          Please set atleast 1 filter.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      Title
                    </label>
                    <textarea
                      onChange={handleChange}
                      value={gameDetails?.title ? gameDetails?.title : ""}
                      className="form-control c-textarea"
                      placeholder="Type Here"
                      rows="3"
                      type="text"
                      name="title"
                    ></textarea>
                  </div>
                  <div className="form-group">
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
                      multiple={true}
                      bucketName={`${process.env.REACT_APP_AWS_BUCKET_NAME}`}
                      folderName={`${process.env.REACT_APP_AWS_FOLDER_NAME}`}
                    />
                  </div>
                  <div className="upload-area review ml-2">
                    {imageArray !== [] &&
                      imageArray.map((item, index) => {
                        return (
                          item.url !== "" && (
                            <div className="preview-zone hidden" key={index}>
                              <div
                                key={index}
                                className="box box-solid mr-3 mb-2 ml-2"
                              >
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
                                    src={item.url.replace(
                                      imageUrl.S3GAME_URL,
                                      imageUrl.GAME_DISPLAY_URL
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        );
                      })}
                  </div>
                  <div className="form-group">
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
                    <div className="upload-area review ml-2">
                      {videoArray !== [] &&
                        videoArray.map((item, index) => {
                          return (
                            item.url !== "" && (
                              <div className="preview-zone hidden" key={index}>
                                <div className="box box-solid mr-3 mb-2 ml-2">
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
                                          data-attachment-id={item?.id}
                                          data-attachment-url={item.url}
                                          alt=""
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="box-body">
                                    <img
                                      className="attachmentImg"
                                      src={thumbnailUrl(item.url)}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })}
                    </div>
                  </div>
                  <div className="form-group mt10">
                    <p
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      Description
                    </p>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "underline",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "outdent",
                          "indent",
                        ],
                      }}
                      onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                          "150px";
                      }}
                      data={
                        gameDetails.Description != null
                          ? gameDetails.Description
                          : ""
                      }
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setGameDetail((prevState) => ({
                          ...prevState,
                          Description: data,
                        }));
                      }}
                    />
                  </div>
                  <div className="form-group mt10">
                    <p
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      What to Get
                    </p>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "underline",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "outdent",
                          "indent",
                        ],
                      }}
                      onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                          "150px";
                      }}
                      data={
                        gameDetails?.what_to_get != null
                          ? gameDetails.what_to_get
                          : ""
                      }
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setGameDetail((prevState) => ({
                          ...prevState,
                          what_to_get: data,
                        }));
                      }}
                    />
                  </div>
                  <div className="form-group mt10">
                    <p
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      How to Play
                    </p>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "underline",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "outdent",
                          "indent",
                        ],
                      }}
                      onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                          "150px";
                      }}
                      data={
                        gameDetails?.what_to_prep != null
                          ? gameDetails.what_to_prep
                          : ""
                      }
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setGameDetail((prevState) => ({
                          ...prevState,
                          what_to_prep: data,
                        }));
                      }}
                    />
                    <div className="form-group mt10">
                      <p
                        htmlFor="exampleFormControlTextarea1"
                        className="c-label"
                      >
                        What to Prep
                      </p>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "underline",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "outdent",
                            "indent",
                          ],
                        }}
                        onReady={(editor) => {
                          editor.ui.view.editable.element.style.minHeight =
                            "150px";
                        }}
                        data={
                          gameDetails?.how_to_play != null
                            ? gameDetails.how_to_play
                            : ""
                        }
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setGameDetail((prevState) => ({
                            ...prevState,
                            how_to_play: data,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group mt10">
                    <p
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label"
                    >
                      Pro Tips
                    </p>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "underline",
                          "bulletedList",
                          "numberedList",
                          "|",
                          "outdent",
                          "indent",
                        ],
                      }}
                      onReady={(editor) => {
                        editor.ui.view.editable.element.style.minHeight =
                          "150px";
                      }}
                      data={
                        gameDetails?.pro_tips != null
                          ? gameDetails.pro_tips
                          : ""
                      }
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setGameDetail((prevState) => ({
                          ...prevState,
                          pro_tips: data,
                        }));
                      }}
                    />
                  </div>
                  <div className="cust-btn-flex">
                    <button className="btn-primary" onClick={handelSubmit}>
                      {gameId !== undefined ? "Update" : "Done"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateGame;
