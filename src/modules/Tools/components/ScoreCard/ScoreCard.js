import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import tickPng from "assets/img/right-tick.svg";
import list from "assets/img/list.svg";
import deleteWhiteSvg from "assets/img/delete_black.svg";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  saveToolList,
  fetchToolList,
  fetchToolOptions,
  getSystemConfiguration,
} from "store/actions";
import SaveBoardModal from "./SaveBoardModal";
import DeleteBoardModel from "./DeleteBoardModel";
import DeleteTeamModel from "./DeleteTeamModal";
import ResetBoardModal from "./ResetBoardModal";
import team1Sound from "assets/Media/player1.mp3";
import team2Sound from "assets/Media/player2.mp3";
import ScoreCardModal from "./ScoreCardModal";
import NewWindow from "react-new-window";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import ScoreCardLoader from "./ScoreCardLoader";
import plusSvg from "assets/img/add-new-active.svg";
import minusSvg from "assets/img/minus_circle.svg";
import repeat from "assets/img/repeat.svg";
import editBlack from "assets/img/edit-icon-black.svg";
import gridIcon from "assets/img/grid-black1.svg";
import { UncontrolledTooltip } from "reactstrap";
import PageHeader from "components/pageheader/PageHeader";

const ScoreCard = () => {
  const [scoreList, setScoreList] = useState("");
  const [teamList, setTeamList] = useState([]);
  const [scoreBoardTeams, setScoreBoardTeam] = useState([]);
  const [scoreBoard, setScoreBoard] = useState([]);
  const [gridButton, setGridButton] = useState(true);
  const [projectorOn, setProjectorOn] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [play, setPlay] = useState();
  const [loadButton, setLoadButton] = useState(true);
  const [removeTeam, setDeleteTeam] = useState({
    show: false,
    tool_option_id: 0,
  });

  const [toolListName, setToolListName] = useState("");
  const [removeBoard, setRemoveBoard] = useState({
    show: false,
    tool_list_id: 0,
  });

  const [saveScoreCard, setSaveScoreCard] = useState({
    show: false,
    tool_list_id: 299,
    list_name: "",
    tool_type: 0,
    total_response: 0,
    option: [],
  });
  const [scoreCardModal, setScoreCardModal] = useState({
    show: false,
    data: "",
  });
  const [resetModal, setResetModal] = useState({
    show: false,
  });
  const [isLoad, setIsLoad] = useState(true);
  const { tools, toolOptions, toolName, colorList } = useSelector(
    (state) => state.Tool
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchToolList({
        tool_type: 1,
      })
    );
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [dispatch]);
  useEffect(() => {
    if (!scoreCardModal.show) {
      if (tools[0]) {
        dispatch(
          fetchToolOptions(
            {
              tool_list_id: tools[0].tool_list_id,
            },
            () => {
              setIsLoad(false);
            }
          )
        );
      }
    }
  }, [tools]);
  useEffect(() => {
    dispatch(
      getSystemConfiguration({ site_id: 4, data_for: "mobile_application" })
    );
  }, []);
  const handleNewBoard = (id) => {
    dispatch(
      fetchToolOptions({
        tool_list_id: +id,
      })
    );
    if (+id === 0) {
      setScoreBoard([]);
      setLoadButton(false);
      setToggleButton(true);
    }
    let temp_Tool = tools.filter((tool) => tool.tool_list_id === +id);
    setScoreBoardTeam(temp_Tool);
  };
  useEffect(() => {
    if (tools || toolName) {
      if (!scoreCardModal.show) {
        setScoreBoardTeam(tools);
        if (scoreBoardTeams[0]) {
          setIsLoad(true);
          dispatch(
            fetchToolOptions({
              tool_list_id: Object.keys(toolName).length
                ? toolName.tool_list_id
                : tools[0]?.tool_list_id,
            })
          );
          setTimeout(() => {
            setIsLoad(false);
          }, 1000);
        } else {
          setTeamList([]);
        }
      }
    }
  }, [tools]);
  useEffect(() => {
    let newToolOptionTempArray = toolOptions;
    newToolOptionTempArray.map(
      (item, index) => (item.temp_tool_option_id = index)
    );
    setTeamList(toolOptions);
  }, [toolOptions]);
  const onCloseSaveModal = () => {
    setIsSave(false);
    setSaveScoreCard({
      ...saveScoreCard,
      show: false,
    });
  };
  useEffect(() => {
    setPlay({
      audio1: new Audio(team1Sound),
      audio2: new Audio(team2Sound),
    });
  }, []);
  const handleSave = () => {
    let newTemparr = [];
    if (Object.keys(toolName).length !== 0 || scoreBoardTeams[0]) {
      let newToolOptionTempArray = teamList;
      newToolOptionTempArray.map((item, index) => {
        delete item.temp_tool_option_id;
        return item;
      });
      if (Object.keys(toolName).length) {
        newToolOptionTempArray.forEach((newTemparr) => {
          toolName.option.forEach((option) => {
            if (newTemparr.option_name === option.option_name) {
              newTemparr.tool_option_id = option.tool_option_id;
            }
          });
        });
      }
      setIsSave(true);
      dispatch(
        saveToolList(
          {
            tool_list_id: Object.keys(toolName).length
              ? toolName.tool_list_id
              : scoreBoardTeams[0].tool_list_id,
            list_name: Object.keys(toolName).length
              ? toolName.list_name
              : scoreBoardTeams[0].list_name,
            tool_type: 1,
            option: newToolOptionTempArray,
          },
          () => {
            setIsSave(false);

            dispatch(
              fetchToolOptions({
                tool_list_id: Object.keys(toolName).length
                  ? toolName.tool_list_id
                  : scoreBoardTeams[0].tool_list_id,
              })
            );
          }
        )
      );
      setSaveScoreCard({
        show: false,
        data: teamList,
      });
    } else {
      setLoadButton(false);
      setIsSave(true);
      setSaveScoreCard({
        show: true,
        data: teamList,
      });
    }
  };
  const handleClose = (id) => {
    setTeamList(teamList.filter((item) => item.temp_tool_option_id !== id));
    setDeleteTeam((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  const handleCloseReset = () => {
    setResetModal({
      show: false,
    });
  };
  const handleBoard = (e) => {
    setRemoveBoard((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  const handleScoreList = (e) => {
    e.preventDefault();

    if (+scoreList.option_name !== 0) {
      setScoreBoard((elem) => [...elem, { ...scoreList, tool_option_id: 0 }]);
      //   toolOptions.push(scoreList);
      teamList.push(scoreList);
      setScoreList({
        option_name: "",
        option_score: 0,
        color_code: "",
        tool_option_id: 0,
      });
      setTeamList(teamList);
    } else {
      toast.error("Please enter team name.");
    }
  };
  const handleScoreIncrement = (temp_tool_option_id) => {
    let tempScore = [...teamList];
    let scoreIndex = tempScore.findIndex(
      (x) => temp_tool_option_id === x.temp_tool_option_id
    );
    tempScore[scoreIndex].option_score = tempScore[scoreIndex].option_score + 1;
    setScoreBoard([...tempScore]);
    play.audio1.play();
  };
  const handleScoreDecrement = (temp_tool_option_id) => {
    let tempScore = [...teamList];
    let scoreIndex = tempScore.findIndex(
      (x) => temp_tool_option_id === x.temp_tool_option_id
    );
    tempScore[scoreIndex].option_score = tempScore[scoreIndex].option_score - 1;
    setScoreBoard([...tempScore]);
    play.audio2.play();
  };
  const resetScore = (tool_option_id) => {
    let tempScore = [...teamList];
    tempScore.map((x) => (x.option_score = 0));
    handleCloseReset();
    // setScoreBoard([...tempScore]);
    // let newToolOptionTempArray = teamList;
    // newToolOptionTempArray.map(
    //   (item, index) => delete item.temp_tool_option_id
    // );
    // dispatch(
    //   saveToolList({
    //     tool_list_id: scoreBoardTeams[0].tool_list_id,
    //     list_name: scoreBoardTeams[0].list_name,
    //     tool_type: 1,
    //     option: newToolOptionTempArray,
    //   })
    // );
  };
  const handleToggleButton = (e) => {
    e.preventDefault();
    setToggleButton(false);
  };
  const handleToggleButtonTick = (e) => {
    e.preventDefault();
    setToggleButton(true);
  };
  const handleToggleGrid = (e) => {
    e.preventDefault();
    setGridButton(false);
  };
  const handleToggleList = (e) => {
    e.preventDefault();
    setGridButton(true);
  };
  const handleNameChange = (value) => {
    // setScoreList((prevState) => ({
    //   ...prevState,
    //   option_name: value,
    // }));
    // const [toolListName, setToolListName] = useState("");
    setToolListName(value);
  };
  const onCloseScoreCardModal = () => {
    setScoreCardModal({
      show: false,
      data: "",
    });
  };

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };
  const onCloseSave = (onCloseSave) => {
    setIsSave(onCloseSave);
  };
  const getColor = (i) => {
    let color = colorList[(i + 1) % 14]?.color_code;
    return color;
  };

  const loadListButton = (loadListButton) => {
    setLoadButton(loadListButton);
  };

  return (
    <>
      <div>
        <ToastContainer />
        {isLoad ? (
          <>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="card-title placeholder-glow">
                  <span className="placeholder col-12"></span>
                </h1>
              </div>
            </div>
          </>
        ) : (
          <PageHeader
            pageName="Score Board"
            handleFullScreen={() => setShowFullScreen(!showFullScreen)}
            handleEquivalentScreen={handleEquivalentScreen}
            icon={true}
          />
        )}

        <div className="tab-content scoreboard-team" id="v-pills-tabContent">
          {isLoad ? (
            <ScoreCardLoader />
          ) : (
            <>
              <div
                className="tab-pane fade"
                id="v-pills-wheel"
                role="tabpanel"
                aria-labelledby="v-pills-wheel-tab"
              ></div>
              <div
                className="tab-pane fade show active"
                id="v-pills-polling"
                role="tabpanel"
                aria-labelledby="v-pills-polling-tab"
              >
                <div className="weel-card polling-card ">
                  <form className="weel-option-input">
                    <input
                      type="text"
                      className="form-control option-text"
                      id="optionhere"
                      aria-describedby=""
                      placeholder="Type team name here"
                      onChange={(e) =>
                        setScoreList({
                          ...{ option_name: e.target.value },
                          ...{ color_code: getColor(teamList.length + 1) },
                          ...{ temp_tool_option_id: teamList.length + 1 },
                          ...{ option_score: 0 },
                          ...{ tool_option_id: 0 },
                        })
                      }
                      value={scoreList?.option_name}
                    />
                    <button
                      className="btn button-primary add-btn"
                      type="submit"
                      onClick={(e) => handleScoreList(e)}
                    >
                      ADD
                    </button>
                  </form>
                </div>
                {teamList.length > 0 && (
                  <div
                    className={
                      showFullScreen
                        ? "showFull-screen scoreBoard-screen"
                        : "scoreBoard-screen"
                    }
                  >
                    {showFullScreen && (
                      <button
                        className="btn-close"
                        onClick={() => {
                          document.body.style.overflow = "scroll";
                          setShowFullScreen(false);
                        }}
                      >
                        <img
                          src={fullScreenExitSvg}
                          id="fullScreenExit"
                          alt=""
                        />
                        <UncontrolledTooltip target="fullScreenExit">
                          <div className="tooltip-subtext">
                            Exit Full Screen
                          </div>
                        </UncontrolledTooltip>
                      </button>
                    )}
                    <div
                      className={`polling-start-card 
                    `}
                    >
                      <div className="p-1">
                        <div
                          className={
                            showFullScreen
                              ? "scoreCard-inner d-none"
                              : "scoreCard-inner"
                          }
                        >
                          <h5>
                            {Object.keys(toolName).length
                              ? toolName.list_name
                              : scoreBoardTeams[0]?.list_name}
                          </h5>
                          <div className="scoreCard-icon">
                            {!toggleButton && (
                              <>
                                <img
                                  src={deleteWhiteSvg}
                                  alt=""
                                  className="scoreCard-repeat cursor-pointer"
                                  onClick={(e, prevState) => {
                                    e.preventDefault();
                                    setRemoveBoard({
                                      ...prevState,
                                      show: true,
                                      tool_list_id:
                                        scoreBoardTeams[0]?.tool_list_id,
                                    });
                                  }}
                                  style={{ cursor: "pointer" }}
                                  id="deleteBoard"
                                />
                                <UncontrolledTooltip target="deleteBoard">
                                  <div className="tooltip-subtext">
                                    Delete Board
                                  </div>
                                </UncontrolledTooltip>
                              </>
                            )}
                            {toggleButton && (
                              <>
                                <img
                                  id="reset"
                                  src={repeat}
                                  alt="repeat-img"
                                  className="scoreCard-repeat cursor-pointer"
                                  onClick={(e) => {
                                    setResetModal({
                                      show: true,
                                    });
                                  }}
                                />
                                <UncontrolledTooltip target="reset">
                                  <div className="tooltip-subtext">Reset</div>
                                </UncontrolledTooltip>
                              </>
                            )}
                            {toggleButton && (
                              <>
                                <img
                                  id="edit"
                                  src={editBlack}
                                  alt="edit-icon-img"
                                  className="scoreCard-repeat cursor-pointer"
                                  onClick={handleToggleButton}
                                />
                                <UncontrolledTooltip target="edit">
                                  <div className="tooltip-subtext">Edit</div>
                                </UncontrolledTooltip>
                              </>
                            )}
                            {!toggleButton && (
                              <>
                                {/* // <p onClick={handleToggleButtonTick}> tick</p> */}
                                <img
                                  id="done"
                                  src={tickPng}
                                  alt=""
                                  className="scoreCard-repeat cursor-pointer"
                                  onClick={handleToggleButtonTick}
                                />
                                <UncontrolledTooltip target="done">
                                  <div className="tooltip-subtext">Done</div>
                                </UncontrolledTooltip>
                              </>
                            )}
                            {gridButton && (
                              <>
                                <img
                                  id="grid"
                                  onClick={handleToggleGrid}
                                  src={gridIcon}
                                  alt="grids-img1"
                                  className="cursor-pointer"
                                />
                                <UncontrolledTooltip target="grid">
                                  <div className="tooltip-subtext">
                                    Grid View
                                  </div>
                                </UncontrolledTooltip>
                              </>
                            )}
                            {!gridButton && (
                              <>
                                <img
                                  id="list"
                                  src={list}
                                  alt="grids-img1"
                                  className="cursor-pointer"
                                  onClick={handleToggleList}
                                />
                                <UncontrolledTooltip target="list">
                                  <div className="tooltip-subtext">
                                    List View
                                  </div>
                                </UncontrolledTooltip>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="item-align">
                          <div className={!gridButton ? "grid-scoreCard" : ""}>
                            {!!teamList &&
                              teamList?.map((it, index) => {
                                return (
                                  <div
                                    className={
                                      !gridButton ? "item-size" : "item"
                                    }
                                    key={index}
                                  >
                                    <div className="mt-3 white-text">
                                      <div className="team-item polling-start-message ">
                                        {toggleButton && (
                                          <img
                                            src={minusSvg}
                                            alt="Minus Member"
                                            className=" mins-img score-mins-icon cursor-pointer"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleScoreDecrement(
                                                it.temp_tool_option_id,
                                                it.option_score
                                              )
                                            }
                                          />
                                        )}

                                        <div className="team-label">
                                          <p
                                            className="scoreText"
                                            key={it.tool_list_id}
                                          >
                                            {it.option_name}
                                          </p>
                                          <div
                                            // className={`member-count ${
                                            //   colors[(i + 1) % 14]
                                            // }`}
                                            style={{
                                              background: getColor(index),
                                            }}
                                            className="score-badge"
                                          >
                                            {it.option_score}
                                          </div>
                                        </div>

                                        {toggleButton && (
                                          <img
                                            src={plusSvg}
                                            alt="Plus Member"
                                            className="team-plus"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleScoreIncrement(
                                                it.temp_tool_option_id
                                              )
                                            }
                                          />
                                        )}
                                        {!toggleButton && (
                                          <>
                                            <img
                                              src={deleteWhiteSvg}
                                              alt=""
                                              className="ml-3 delete-team-icon "
                                              data-toggle="modal"
                                              data-target="#deleteModal"
                                              onClick={() =>
                                                setDeleteTeam((prevState) => ({
                                                  ...prevState,
                                                  show: true,
                                                  tool_option_id:
                                                    it.tool_option_id,
                                                  temp_tool_option_id:
                                                    it.temp_tool_option_id,
                                                }))
                                              }
                                              style={{ cursor: "pointer" }}
                                              id="deleteTeam"
                                            />
                                            <UncontrolledTooltip target="deleteTeam">
                                              <div className="tooltip-subtext">
                                                Delete Team
                                              </div>
                                            </UncontrolledTooltip>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                        {/* <div className={`${!gridButton ? "grid-scoreCard" : ""}`}>
                        {!!teamList &&
                          teamList?.map((it, index) => {
                            return (
                              <div className="mb-3" key={index}>
                                <div
                                  className={`polling-start-message ${
                                    !gridButton ? "mr-3" : ""
                                  }`}
                                >
                                  {!toggleButton && (
                                    <>
                                      <img
                                        id="deleteScore"
                                        src={deleteWhiteSvg}
                                        alt=""
                                        className="score-delete cursor-pointer"
                                        onClick={() =>
                                          setDeleteTeam((prevState) => ({
                                            ...prevState,
                                            show: true,
                                            tool_option_id: it.tool_option_id,
                                            temp_tool_option_id:
                                              it.temp_tool_option_id,
                                          }))
                                        }
                                      />
                                      <UncontrolledTooltip target="deleteScore">
                                        <div className="tooltip-subtext">
                                          Delete Score
                                        </div>
                                      </UncontrolledTooltip>
                                    </>
                                  )}
                                  {toggleButton && (
                                    <img
                                      src={minusSvg}
                                      alt="mins-img"
                                      className="mins-img score-mins-icon cursor-pointer"
                                      onClick={() =>
                                        handleScoreDecrement(
                                          it.temp_tool_option_id,
                                          it.option_score
                                        )
                                      }
                                    />
                                  )}
                                  <div style={{ display: "grid" }} key={index}>
                                    {" "}
                                    <p className="scoreText">
                                      {it.option_name}
                                    </p>
                                    <div
                                      style={{ background: getColor(index) }}
                                      className={`score-badge`}
                                    >
                                      {it.option_score}{" "}
                                    </div>
                                  </div>
                                  {toggleButton && (
                                    <img
                                      src={plusSvg}
                                      alt="add-1"
                                      className="pluse-icon score-pluse-icon cursor-pointer"
                                      onClick={() =>
                                        handleScoreIncrement(
                                          it.temp_tool_option_id
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div> */}
                        <div
                          className={
                            showFullScreen
                              ? "generate-number d-none"
                              : "generate-number"
                          }
                        >
                          {loadButton && (
                            <button
                              type="submit"
                              className="button-gray wheel-btn btn-dull gameInfo cust-padd-bt mr-2"
                              onClick={() => {
                                setScoreCardModal((prev) => ({
                                  ...prev,
                                  show: true,
                                }));
                              }}
                              style={{ borderRadius: "10px" }}
                            >
                              Load Scoreboard
                            </button>
                          )}
                          <button
                            className="btn button-primary random-number-btn m-0"
                            type="button"
                            onClick={handleSave}
                          >
                            {isSave ? "Saving..." : "Save"}
                          </button>
                          {/* <a
                      className="restore-circle pause-circle-icon mr-0 cursor-pointer"
                      onClick={(e) => {
                        setResetModal({
                          show: true,
                        });
                      }}
                    >
                      <img src={resetSvg} alt="restore-img" />
                    </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {projectorOn && (
                  <NewWindow>
                    {/* <div className={!gridButton ? "grid-scoreCard" : ""}> */}
                    <div
                      className={
                        !gridButton
                          ? "grid-scoreCard  polling-start-card scoreBoard-screen"
                          : "polling-start-card scoreBoard-screen h-100"
                      }
                      // className="polling-start-card scoreBoard-screen h-100"
                    >
                      {!!teamList &&
                        teamList?.map((it, index) => {
                          return (
                            <div
                              className="polling-start-message ml-2"
                              style={{ height: "83px" }}
                              key={index}
                            >
                              <p className="scoreText" key={index}>
                                {it.option_name}
                              </p>
                              <div
                                style={{ background: getColor(index) }}
                                className={`score-badge`}
                              >
                                {it.option_score}{" "}
                              </div>
                            </div>
                            // </div>
                          );
                        })}
                    </div>
                    {/* </div> */}
                  </NewWindow>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <SaveBoardModal
        {...saveScoreCard}
        onClose={handleSave}
        onModalClose={onCloseSaveModal}
        scoreBoardTeams={toolListName}
        onChange={handleNameChange}
        onCloseSave={onCloseSave}
        loadListButton={loadListButton}
      />
      <ResetBoardModal
        show={resetModal.show}
        resetScore={resetScore}
        onClose={handleCloseReset}
      />
      {scoreCardModal.show && (
        <ScoreCardModal
          show={scoreCardModal.show}
          onClose={onCloseScoreCardModal}
          setScoreBoard={setScoreBoard}
          newBoard={handleNewBoard}
        />
      )}
      <DeleteTeamModel {...removeTeam} onClose={handleClose} />
      <DeleteBoardModel {...removeBoard} onClose={handleBoard} />
    </>
  );
};
export default ScoreCard;
