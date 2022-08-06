import React, { useEffect, useState } from "react";
import plusSvg from "assets/img/add-new-active.svg";
import minusSvg from "assets/img/minus_circle.svg";
import resetSvg from "assets/img/restore.svg";
import fullScreenSvg from "assets/img/full-screen.svg";
import { useSelector, useDispatch } from "react-redux";
import { saveToolList, fetchToolOptions } from "store/actions";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import PageHeader from "components/pageheader/PageHeader";
import NewWindow from "react-new-window";
import { UncontrolledTooltip } from "reactstrap";
import team1Sound from "assets/Media/player1.mp3";
import team2Sound from "assets/Media/player2.mp3";

const PollingCard = ({ onStepChange, tool_list, poll }) => {
  const dispatch = useDispatch();
  const { toolOptions } = useSelector((state) => state.Tool);
  const [pollList, setPollList] = useState(toolOptions);
  const [plusIcon, setPlusIcon] = useState(0);
  const [minusIcon, setMinusIcon] = useState(0);
  const [projectorOn, setProjectorOn] = useState(false);
  const [totalResponse, setTotalResponse] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [play, setPlay] = useState();
  useEffect(() => {
    setPlay({
      audio1: new Audio(team1Sound),
      audio2: new Audio(team2Sound),
    });
  }, []);

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };

  const handleReset = () => {
    let newList = pollList.map((item) => {
      item.option_score = 0;
      return item;
    });
    setPollList(newList);
  };

  const handlePlus = (option) => {
    setPlusIcon(option.tool_option_id);
    let newList = pollList.map((item) => {
      if (item.tool_option_id === option.tool_option_id) {
        item.option_score = item.option_score + 1;
      }
      return item;
    });
    setPollList(newList);

    play.audio1.play();
    setTimeout(() => {
      setPlusIcon(0);
    }, 80);
    setTotalResponse(totalResponse + 1);
  };
  const handleMinus = (option) => {
    setMinusIcon(option.tool_option_id);
    let newList = pollList.map((item) => {
      if (item.tool_option_id === option.tool_option_id) {
        if (item.option_score > 0) {
          item.option_score = item.option_score - 1;
        }
      }

      return item;
    });

    setPollList(newList);
    play.audio2.play();
    setTimeout(() => {
      setMinusIcon(0);
    }, 80);
    setTotalResponse(totalResponse + 1);
  };

  const handleViewResult = () => {
    dispatch(
      saveToolList(
        {
          tool_list_id: +tool_list.id,
          list_name: tool_list?.name,
          tool_type: 4,
          option: pollList,
          total_response: totalResponse,
        },
        () => {
          onStepChange(
            {
              tool_list_id: tool_list.id,
              list_name: tool_list.name,
            },
            3
          );
        }
      )
    );
  };

  useEffect(() => {
    dispatch(
      fetchToolOptions({
        tool_list_id: +tool_list.id,
      })
    );
  }, [poll]);

  useEffect(() => {
    setPollList(toolOptions);
  }, [toolOptions]);

  return (
    <>
      <div className=" ">
        <PageHeader
          pageName="Polling Start"
          handleFullScreen={() => setShowFullScreen(!showFullScreen)}
          handleEquivalentScreen={handleEquivalentScreen}
          showButton={true}
          showProjectorScreen={true}
          showProjectorScreenButton={false}
          handleBack={() => {
            onStepChange(
              {
                tool_list_id: tool_list.id,
                list_name: tool_list.name,
              },
              1
            );
          }}
        />
        <div
          className="fullscreen-mode-icon desktop-view d-none"
          title="Full Screen"
        >
          <img
            src={fullScreenSvg}
            className="fullscreen-icon pointer"
            alt="Fullscreen Icon"
            onClick={() => {
              document.body.style.overflow = "hidden";
              setShowFullScreen(true);
            }}
          />
        </div>

        <div className="fullscreen-box mt-5 mobile-spacing">
          <div className={showFullScreen ? "showFull-screen" : ""}>
            {showFullScreen && (
              <button
                className="btn-close"
                onClick={() => {
                  setShowFullScreen(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <img
                  src={fullScreenExitSvg}
                  id="fullScreenExit"
                  alt="exit button"
                />
                <UncontrolledTooltip target="fullScreenExit">
                  <div className="tooltip-subtext">Exit Full Screen</div>
                </UncontrolledTooltip>
              </button>
            )}
            <div className=" polling-start-card ">
              <h5>{tool_list?.name}</h5>
              <div className="scoreboard-team">
                {pollList.map((option, index) => (
                  <div
                    className={
                      plusIcon === option.tool_option_id
                        ? "polling-start-message polling-green"
                        : minusIcon === option.tool_option_id
                        ? "polling-start-message polling-red"
                        : "polling-start-message"
                    }
                    key={index}
                  >
                    <img
                      src={minusSvg}
                      onClick={() => {
                        handleMinus(option);
                      }}
                      alt="minus_circle"
                      className={
                        option.option_score < 1
                          ? "mins-img pointer d-none"
                          : "mins-img pointer"
                      }
                    />

                    <p className="mb-0">{option.option_name}</p>
                    <img
                      src={plusSvg}
                      onClick={() => {
                        handlePlus(option);
                      }}
                      alt="Plus-circle"
                      className="pluse-icon pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="generate-number">
            <button
              className="btn-primary break-icebreak-btn"
              type="button"
              onClick={handleViewResult}
            >
              VIEW RESULT
            </button>
            <button className="restore-circle pause-circle-icon">
              <img src={resetSvg} alt="restore-img" onClick={handleReset} />
            </button>
          </div>
        </div>
      </div>

      {(
        <div className="fullscreen-box mt-5 mobile-spacing">
          <div className={showFullScreen ? "showFull-screen" : ""}>
            {showFullScreen && (
              <button
                className="btn-close"
                onClick={() => {
                  setShowFullScreen(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <img src={fullScreenExitSvg} alt="full-screen" />
              </button>
            )}
            <div className=" polling-start-card ">
              <h5>{tool_list?.name}</h5>
              <div className="scoreboard-team">
                {pollList.map((option, index) => (
                  <div className="polling-start-message" key={index}>
                    <img
                      src={minusSvg}
                      onClick={() => {
                        handleMinus(option);
                      }}
                      alt="minus_circle"
                      className="mins-img pointer"
                    />
                    <p className="mb-0">{option.option_name}</p>
                    <img
                      src={plusSvg}
                      onClick={() => {
                        handlePlus(option);
                      }}
                      alt="Plus-circle"
                      className="pluse-icon pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="generate-number">
            <button
              className="btn-primary break-icebreak-btn"
              type="button"
              onClick={handleViewResult}
            >
              VIEW RESULT
            </button>
            <button className="restore-circle pause-circle-icon">
              <img src={resetSvg} alt="restore-img" onClick={handleReset} />
            </button>
          </div>
        </div>
      ) &&
        projectorOn && (
          <NewWindow title="POLLING START" name="POLLING START">
            <div className="fullscreen-box mt-5 mobile-spacing">
              <div className={showFullScreen ? "showFull-screen" : ""}>
                {showFullScreen && (
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowFullScreen(false);
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    <img src={fullScreenExitSvg} alt="close button" />
                  </button>
                )}
                <div className=" polling-start-card ">
                  <h5>{tool_list?.name}</h5>
                  <div className="scoreboard-team">
                    {pollList.map((option, index) => (
                      <div className="polling-start-message">
                        <img
                          src={minusSvg}
                          onClick={() => {
                            handleMinus(option);
                          }}
                          alt="minus_circle"
                          className="mins-img pointer"
                        />
                        <p className="mb-0">{option.option_name}</p>
                        <img
                          src={plusSvg}
                          onClick={() => {
                            handlePlus(option);
                          }}
                          alt="Plus-circle"
                          className="pluse-icon pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </NewWindow>
        )}
    </>
  );
};

export default PollingCard;
