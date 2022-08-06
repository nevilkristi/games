import React, { useState, useEffect } from "react";
import chessClockResetSvg from "assets/img/chess_clock_reset.svg";
import toolsPauseSvg from "assets/img/tools_pause.svg";
import toolSettingSvg from "assets/img/tools_setting.svg";
import TimmerOptions from "./ChessClockSettings";
import soundfile from "assets/Media/player2.mp3";
import NewWindow from "react-new-window";
import ResetClockModal from "./ResetClockModal";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import debounce from "lodash.debounce";
import ChessPreLoader from "./ChessPreLoader";
import PageHeader from "components/pageheader/PageHeader";
import "../../../../assets/css/responsive.css";
import "assets/css/style.css";
import { UncontrolledTooltip } from "reactstrap";

const ChessClock = () => {
  const [audio] = useState(new Audio(soundfile));
  const [chessClock, setChessClock] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [playerOne, setPlayerOne] = useState(0);
  const [playerTwo, setPlayerTwo] = useState(0);
  const [isSide, setIsSide] = useState(true);
  const [defaultTime, setDefaultTime] = useState(5);
  const [settingPageActive, setSettingPageActive] = useState(false);
  const [resetButton, setResetButton] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [projectorOn, setProjectorOn] = useState(false);
  const [resetModal, setResetModal] = useState({
    show: false,
  });
  const [isLoad, setIsLoad] = useState(true);

  const [playerOneTime, setPlayerOneTime] = useState({
    currentTimeSec: 0,
    currentTimeMin: 0,
  });

  const [playerTwoTime, setPlayerTwoTime] = useState({
    currentTimeSec: 0,
    currentTimeMin: 0,
  });

  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, []);

  useEffect(() => {
    setPlayerOneTime({
      currentTimeSec: 0,
      currentTimeMin: defaultTime,
    });
    setPlayerTwoTime({
      currentTimeSec: 0,
      currentTimeMin: defaultTime,
    });
  }, [defaultTime]);

  const startChessClockWatch = (activeSide = false) => {
    if (playerOne === 0 && playerTwo === 0) {
      activeSide = !activeSide;
    }
    setChessClock(true);
    setIsSide(!activeSide);

    clearInterval(activeSide ? playerOne : playerTwo);
    clearInterval(!activeSide ? playerOne : playerTwo);

    setShowButton(true);
    setResetButton(false);
    (activeSide ? setPlayerOne : setPlayerTwo)(
      setInterval(activeSide ? pacePlayerOne : pacePlayerTwo, 1000),
      activeSide
    );
  };

  const pacePlayerTwo = () => {
    setPlayerTwoTime((prevState) => {
      if (prevState.currentTimeSec <= 0) {
        if (prevState.currentTimeMin <= 0) {
          pauseHandler();
          return {
            ...prevState,
            currentTimeMin: 0,
            currentTimeSec: 0,
          };
        }
        return {
          ...prevState,
          currentTimeMin: prevState.currentTimeMin - 1,
          currentTimeSec: 59,
        };
      }

      return {
        ...prevState,
        currentTimeSec: prevState.currentTimeSec - 1,
      };
    });
  };

  const pacePlayerOne = () => {
    setPlayerOneTime((prevState) => {
      if (prevState.currentTimeSec <= 0) {
        if (prevState.currentTimeMin <= 0) {
          pauseHandler();
          return {
            ...prevState,
            currentTimeMin: 0,
            currentTimeSec: 0,
          };
        }
        return {
          ...prevState,
          currentTimeMin: prevState.currentTimeMin - 1,
          currentTimeSec: 59,
        };
      }
      return {
        ...prevState,
        currentTimeSec: prevState.currentTimeSec - 1,
      };
    });
  };

  const pauseHandler = () => {
    clearInterval(playerOne);
    clearInterval(playerTwo);
    setShowButton(false);
    setResetButton(true);
  };

  const resetHandler = (time = false) => {
    setChessClock(false);
    setPlayerOneTime({
      currentTimeSec: 0,
      currentTimeMin: defaultTime.toString().padStart(2, "0"),
    });
    setPlayerTwoTime({
      currentTimeSec: 0,
      currentTimeMin: defaultTime.toString().padStart(2, "0"),
    });
    clearInterval(playerOne);
    clearInterval(playerTwo);
    setPlayerOne(0);
    setPlayerTwo(0);
    setShowButton(false);
    setResetButton(false);
  };

  const handleTimmerOptions = () => {
    setSettingPageActive(!settingPageActive);
  };

  const isOption = (option) => {
    if (option > 0) {
      setDefaultTime(option);
      setSettingPageActive(false);
      // resetHandler(option)
    }
  };

  const onCloseResetClockModal = () => {
    setResetModal(false);
  };

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };

  return (
    <>
      {isLoad ? (
        <ChessPreLoader />
      ) : (
        <>
          <PageHeader
            pageName="Chess Clock"
            handleFullScreen={() => setIsFullscreen(!isFullscreen)}
            handleEquivalentScreen={handleEquivalentScreen}
            icon={settingPageActive ? false : true}
            handleBack={() => {
              setSettingPageActive(false);
            }}
          />

          <div
            className={`${
              isFullscreen ? "fullscreen-chess-screen" : "normal-chess-screen"
            }`}
          >
            {/* Select timer options */}
            {settingPageActive && (
              <>
                <img
                  id="fullScreenExit"
                  src={fullScreenExitSvg}
                  className="fullscreen-icon-exit pointer"
                  alt="Fullscreen"
                  onClick={() => {
                    setIsFullscreen(false);
                    document.body.style.overflow = "scroll";
                  }}
                />
                <TimmerOptions isOption={isOption} defaultTime={defaultTime} />
              </>
            )}

            {/* Chess clock */}
            {!settingPageActive && (
              <>
                <img
                  id="fullScreenExit"
                  src={fullScreenExitSvg}
                  className="fullscreen-icon-exit pointer"
                  alt="Fullscreen"
                  onClick={() => {
                    setIsFullscreen(false);
                    document.body.style.overflow = "scroll";
                  }}
                />
                <UncontrolledTooltip target="fullScreenExit">
                  <div className="tooltip-subtext">Exit Full Screen</div>
                </UncontrolledTooltip>

                <div className="chess-clock fullscreen">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "contents",
                    }}
                    className={!chessClock ? "active-off" : ""}
                  >
                    {/* P1 */}
                    <div
                      className={`black-field chess-clock-field ${
                        chessClock && !isSide ? "active" : "un-active"
                      }`}
                      onClick={() => {
                        // if (!isSide) {
                        audio.play();
                        startChessClockWatch(false);
                        // }
                      }}
                    >
                      <span className="clock-time">
                        {playerOneTime.currentTimeMin
                          .toString()
                          .padStart(2, "0")}
                        :
                        {playerOneTime.currentTimeSec
                          .toString()
                          .padStart(2, "0")}
                      </span>
                      {!showButton && !resetButton && <p>Tap to start</p>}
                      {!isSide &&
                        !showButton &&
                        resetButton &&
                        playerOneTime.currentTimeSec !== 0 &&
                        playerOneTime.currentTimeMin !== 0 && (
                          <p className="resume-text">Tap to resume</p>
                        )}
                    </div>

                    {/* P2 */}
                    <div
                      className={`white-field chess-clock-field ${
                        chessClock && isSide ? "active" : "un-active"
                      }`}
                      onClick={() => {
                        // if (isSide) {
                        audio.play();
                        startChessClockWatch(true);
                        // }
                      }}
                    >
                      <span className="clock-time">
                        {playerTwoTime.currentTimeMin
                          .toString()
                          .padStart(2, "0")}
                        :{""}
                        {playerTwoTime.currentTimeSec
                          .toString()
                          .padStart(2, "0")}
                      </span>
                      {!showButton && !resetButton && <p>Tap to start</p>}
                      {isSide &&
                        !showButton &&
                        resetButton &&
                        playerTwoTime.currentTimeSec !== 0 &&
                        playerTwoTime.currentTimeMin !== 0 && (
                          <p className="resume-text">Tap to resume</p>
                        )}
                    </div>
                  </div>

                  {/* Button for Chess Clock Settings & reset clock */}
                  <div
                    className={`chess-clock-toolbar ${
                      chessClock
                        ? isSide
                          ? "white-active"
                          : "black-active"
                        : ""
                    }`}
                  >
                    <div
                      className={`chess-clock-setting ${
                        resetButton ? "chess-clock-setting-along-reset" : ""
                      }`}
                    >
                      {!showButton && (
                        <>
                          <img
                            id="settings"
                            src={toolSettingSvg}
                            alt="Settings"
                            className={`chess-clock-icon setting-btn ${
                              resetButton ? "setting-btn-reset" : ""
                            }`}
                            onClick={handleTimmerOptions}
                          />
                          <UncontrolledTooltip target="settings">
                            <div className="tooltip-subtext">Settings</div>
                          </UncontrolledTooltip>
                        </>
                      )}

                      {showButton && (
                        <>
                          <img
                            id="pause"
                            src={toolsPauseSvg}
                            alt="Pause"
                            className="pause-btn chess-clock-icon"
                            onClick={pauseHandler}
                          />
                          <UncontrolledTooltip target="pause">
                            <div className="tooltip-subtext">Pause</div>
                          </UncontrolledTooltip>
                        </>
                      )}

                      {resetButton && (
                        <>
                          <img
                            id="reset"
                            src={chessClockResetSvg}
                            alt=""
                            onClick={() => {
                              setResetModal((prev) => ({
                                ...prev,
                                show: true,
                              }));
                            }}
                            className="reset-btn chess-clock-icon"
                          />
                          <UncontrolledTooltip target="reset">
                            <div className="tooltip-subtext">Reset</div>
                          </UncontrolledTooltip>
                        </>
                      )}
                      <ResetClockModal
                        show={resetModal.show}
                        onClose={onCloseResetClockModal}
                        reset={resetHandler}
                      />
                    </div>
                  </div>
                  {/* END Button for Chess Clock Settings & reset clock */}
                </div>
              </>
            )}
          </div>

          {projectorOn && (
            <NewWindow title="Chess Click" name="Chess Click">
              <div className="chessClock">
                {/* P1 */}
                <div
                  style={{ width: "100%" }}
                  className={`black-field chess-clock-field ${
                    chessClock && !isSide ? "active" : ""
                  }`}
                  onClick={() => {
                    // if (!isSide) {
                    audio.play();
                    startChessClockWatch(false);
                    // }
                  }}
                >
                  <span className="clock-time">
                    {playerOneTime.currentTimeMin.toString().padStart(2, "0")} :
                    {playerOneTime.currentTimeSec.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* P2 */}
                <div
                  style={{ width: "100%" }}
                  className={`white-field chess-clock-field ${
                    chessClock && isSide ? "active" : ""
                  }`}
                  onClick={() => {
                    // if (isSide) {
                    audio.play();
                    startChessClockWatch(true);
                    // }
                  }}
                >
                  <span className="clock-time">
                    {playerTwoTime.currentTimeMin.toString().padStart(2, "0")} :
                    {""}
                    {playerTwoTime.currentTimeSec.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </NewWindow>
          )}
        </>
      )}
    </>
  );
};

export default ChessClock;
