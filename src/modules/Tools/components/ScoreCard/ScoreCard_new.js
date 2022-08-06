import PageHeader from "components/pageheader/PageHeader";
import React, { useState, useEffect } from "react";
import {
  saveToolList,
  fetchToolList,
  fetchToolOptions,
  getSystemConfiguration,
} from "store/actions";
import { UncontrolledTooltip } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import plusSvg from "assets/img/add-new-active.svg";
import minusSvg from "assets/img/minus_circle.svg";
import deleteWhiteSvg from "assets/img/delete_black.svg";
import repeat from "assets/img/repeat.svg";
import editBlack from "assets/img/edit-icon-black.svg";
import tickPng from "assets/img/right-tick.svg";
import gridIcon from "assets/img/grid-black1.svg";
import list from "assets/img/list.svg";
import team1Sound from "assets/Media/player1.mp3";
import team2Sound from "assets/Media/player2.mp3";
import { ToastContainer, toast } from "react-toastify";
import ScoreCardModal from "./ScoreCardModal";
import SaveBoardModal from "./SaveBoardModal";

const ScoreCard = () => {
  const dispatch = useDispatch();
  const [scoreList, setScoreList] = useState([]);
  const [toolOptionList, setToolOptionList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [gridButton, setGridButton] = useState(true);
  const [toggleButton, setToggleButton] = useState(true);
  const [removeTeam, setDeleteTeam] = useState({
    show: false,
    tool_option_id: 0,
  });
  const [scoreCardModal, setScoreCardModal] = useState({
    show: false,
    data: "",
  });
  const [play, setPlay] = useState();
  const [resetModal, setResetModal] = useState({
    show: false,
  });
  const [removeBoard, setRemoveBoard] = useState({
    show: false,
    tool_list_id: 0,
  });
  const [isSave, setIsSave] = useState(false);
  const [loadButton, setLoadButton] = useState(true);
  const { tools, toolOptions, toolName, colorList } = useSelector(
    (state) => state.Tool
  );
  const [saveScoreCard, setSaveScoreCard] = useState({
    show: false,
    tool_list_id: 299,
    list_name: "",
    tool_type: 0,
    total_response: 0,
    option: [],
  });

  const onCloseSaveModal = () => {
    setSaveScoreCard({
      ...saveScoreCard,
      show: false,
    });
  };

  const onCloseSave = (onCloseSave) => {
    setIsSave(onCloseSave);
  };

  const loadListButton = (loadListButton) => {
    setLoadButton(loadListButton);
  };

  const handleNameChange = (value) => {
    setScoreList(value);
  };

  const handleNewBoard = (id) => {
    dispatch(
      fetchToolOptions({
        tool_list_id: +id,
      })
    );
    if (+id === 0) {
      setToolOptionList([]);
      setLoadButton(false);
      setToggleButton(true);
    }
    let temp_Tool = tools.filter((tool) => tool.tool_list_id === +id);
    setToolList(temp_Tool);
  };

  const onCloseScoreCardModal = () => {
    setScoreCardModal({
      show: false,
      data: "",
    });
  };

  const handleSave = () => {
    let newTemparr = [];
    if (Object.keys(toolName).length !== 0 || toolList[0]) {
      let newToolOptionTempArray = toolOptionList;
      newToolOptionTempArray.map((item, index) => {
        delete item.tool_option_id;
        delete item.temp_id;
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
              : toolList[0].tool_list_id,
            list_name: Object.keys(toolName).length
              ? toolName.list_name
              : toolList[0].list_name,
            tool_type: 1,
            option: newToolOptionTempArray,
          },
          () => {
            setIsSave(false);
            dispatch(
              fetchToolOptions({
                tool_list_id: Object.keys(toolName).length
                  ? toolName.tool_list_id
                  : toolList[0].tool_list_id,
              })
            );
          }
        )
      );
      setSaveScoreCard({
        show: false,
        data: toolOptionList,
      });
    } else {
      setLoadButton(false);
      setIsSave(true);
      setSaveScoreCard({
        show: true,
        data: toolOptionList,
      });
    }
  };

  const getColor = (i) => {
    let color = colorList[(i + 1) % 14]?.color_code;
    return color;
  };

  useEffect(() => {
    let newToolOptionTempArray = toolOptions;

    newToolOptionTempArray.map((item, index) => {
      item.temp_id = index;
      return item;
    });

    setToolOptionList(newToolOptionTempArray);
  }, [toolOptions]);

  useEffect(() => {
    setPlay({
      audio1: new Audio(team1Sound),
      audio2: new Audio(team2Sound),
    });
    dispatch(
      getSystemConfiguration({ site_id: 4, data_for: "mobile_application" })
    );
    dispatch(
      fetchToolList(
        {
          tool_type: 1,
        },
        (data) => {
          setToolList(data);
          dispatch(
            fetchToolOptions({
              tool_list_id: data.rows[0].tool_list_id,
            })
          );
        }
      )
    );
  }, []);

  const handleScoreIncrement = (temp_id) => {
    let tempScore = [...toolOptionList];
    let scoreIndex = tempScore.findIndex((x) => temp_id === x.temp_id);

    tempScore[scoreIndex].option_score = tempScore[scoreIndex].option_score + 1;
    setToolOptionList([...tempScore]);
    play.audio1.play();
  };
  const handleScoreDecrement = (temp_id) => {
    let tempScore = [...toolOptionList];
    let scoreIndex = tempScore.findIndex((x) => temp_id === x.temp_id);
    tempScore[scoreIndex].option_score = tempScore[scoreIndex].option_score - 1;
    setToolOptionList([...tempScore]);
    play.audio2.play();
  };

  const handleScoreList = (e) => {
    e.preventDefault();
    if (+scoreList.option_name !== 0) {
      toolOptionList.push(scoreList);

      setScoreList({
        option_name: "",
        option_score: 0,
        color_code: "",
        tool_option_id: 0,
      });
      setToolOptionList(toolOptionList);
    } else {
      toast.error("Please Enter Team");
    }
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

  return (
    <div>
      <PageHeader
        pageName="Score Board"
        // handleFullScreen={() => setFullScreen(!fullScreen)}
        // handleEquivalentScreen={handleEquivalentScreen}
        icon={true}
      />

      <div className="scoreboard-team">
        <div className="weel-card polling-card ">
          <form className="weel-option-input">
            <input
              type="text"
              className="form-control option-text"
              id="optionhere"
              aria-describedby=""
              placeholder="Type team name here"
              onChange={(e) => {
                setScoreList({
                  ...{ option_name: e.target.value },
                  ...{ color_code: "#tasdad" },
                  ...{ tool_option_id: 0 },
                  ...{ option_score: 0 },
                  ...{ temp_id: toolOptionList.length + 1 },
                });
              }}
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
        <h5>
          {Object.keys(toolName).length
            ? toolName.list_name
            : toolList[0]?.list_name}
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
                    tool_list_id: toolOptionList[0]?.tool_list_id,
                  });
                }}
                style={{ cursor: "pointer" }}
                id="deleteTeam"
              />
              <UncontrolledTooltip target="deleteTeam">
                <div className="tooltip-subtext">Delete Team</div>
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
                <div className="tooltip-subtext">Grid View</div>
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
                <div className="tooltip-subtext">List View</div>
              </UncontrolledTooltip>
            </>
          )}
        </div>
        <div className="item-align">
          <div className={!gridButton ? "grid-scoreCard" : ""}>
            {!!toolOptionList &&
              toolOptionList?.map((it, index) => {
                return (
                  <div
                    key={index}
                    className={!gridButton ? "item-size" : "item"}
                  >
                    <div className="mt-3 white-text">
                      <div className="team-item polling-start-message ">
                        {toggleButton && (
                          <img
                            src={minusSvg}
                            alt="Minus Member"
                            className=" mins-img score-mins-icon cursor-pointer"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleScoreDecrement(it.temp_id)}
                          />
                        )}

                        <div className="team-label">
                          <p className="scoreText" key={it.tool_list_id}>
                            {it.option_name}
                          </p>
                          <div
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
                            onClick={() => handleScoreIncrement(it.temp_id)}
                          />
                        )}
                        {!toggleButton && (
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
                                tool_option_id: it.tool_option_id,
                                tool_option_id: it.tool_option_id,
                              }))
                            }
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

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
      </div>
      {scoreCardModal.show && (
        <ScoreCardModal
          show={scoreCardModal.show}
          onClose={onCloseScoreCardModal}
          setScoreBoard={setToolOptionList}
          newBoard={handleNewBoard}
        />
      )}

      <SaveBoardModal
        {...saveScoreCard}
        onClose={handleSave}
        onModalClose={onCloseSaveModal}
        scoreBoardTeams={scoreList}
        onChange={handleNameChange}
        onCloseSave={onCloseSave}
        loadListButton={loadListButton}
      />
    </div>
  );
};

export default ScoreCard;
