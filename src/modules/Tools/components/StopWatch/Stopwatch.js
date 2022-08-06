/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import { Watch, WatchButton } from "./watch/watch";
import NewWindow from "react-new-window";
import { ToolPreloader } from "components/preloders";
import "assets/css/style.css";
import "../../../../assets/css/responsive.css";
import PageHeader from "components/pageheader/PageHeader";
import { UncontrolledTooltip } from "reactstrap";

const Stopwatch = () => {
  const [interval, setIntervalState] = useState("");
  const [stopWatch, setStopWatch] = useState({
    running: false,
    currentTimeMs: 0,
    currentTimeSec: 0,
    currentTimeMin: 0,
  });
  const [showButton, setShowButton] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [projectorOn, setProjectorOn] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLoad(false);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const startWatch = () => {
    if (!stopWatch.running) {
      setStopWatch((prevState) => ({
        ...prevState,
        running: true,
      }));
      setIntervalState(setInterval(pace, 10));
    }
    setShowButton(true);
  };

  const pace = () => {
    setStopWatch((prevState) => {
      if (prevState.currentTimeSec >= 60) {
        return {
          ...prevState,
          currentTimeMin: prevState.currentTimeMin + 1,
          currentTimeSec: 0,
        };
      }
      if (prevState.currentTimeMs >= 990) {
        return {
          ...prevState,
          currentTimeSec: prevState.currentTimeSec + 1,
          currentTimeMs: 0,
        };
      }

      return {
        ...prevState,
        currentTimeMs:
          prevState.currentTimeMs >= 990 ? 0 : prevState.currentTimeMs + 10,
      };
    });
  };

  const stopWatchTime = () => {
    setStopWatch((prevState) => ({
      ...prevState,
      running: false,
    }));
    clearInterval(interval);
  };

  const stopReset = () => {
    stopWatchTime();

    setStopWatch((prevState) => ({
      ...prevState,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    }));
    setShowButton(false);
  };

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };

  return isLoad ? (
    <ToolPreloader />
  ) : (
    <>
      <PageHeader
        pageName="Stopwatch"
        handleFullScreen={() => setShowFullScreen(!showFullScreen)}
        handleEquivalentScreen={handleEquivalentScreen}
        icon={true}
      />

      {projectorOn && (
        <NewWindow
          name="Stopwatch"
          title="Stopwatch"
          closeOnUnmount={true}
          copyStyles="true"
        >
          <div className={showFullScreen ? "showFull-screen" : ""}>
            {showFullScreen && (
              <button
                className="btn-close"
                onClick={() => setShowFullScreen(false)}
              >
                <img src={fullScreenExitSvg} />
              </button>
            )}
            <div className="centered-new-screen">
              <Watch stopWatch={stopWatch} />
            </div>
          </div>
        </NewWindow>
      )}

      <div className={showFullScreen ? "showFull-screen" : ""}>
        {showFullScreen && (
          <button
            className="btn-close"
            onClick={() => {
              document.body.style.overflow = "scroll";
              setShowFullScreen(false);
            }}
          >
            <img src={fullScreenExitSvg} id="fullScreenExit" />
            <UncontrolledTooltip target="fullScreenExit">
              <div className="tooltip-subtext">Exit Full Screen</div>
            </UncontrolledTooltip>
          </button>
        )}

        <WatchButton
          stopWatch={stopWatch}
          startWatch={startWatch}
          showButton={showButton}
          stopWatchTime={stopWatchTime}
          stopReset={stopReset}
        />
      </div>
    </>
  );
};

export default Stopwatch;
