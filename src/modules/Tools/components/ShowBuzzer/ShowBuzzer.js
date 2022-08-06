import React, { useState, useRef, useEffect } from "react";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import song from "assets/Media/low_time_sound.mp3";
import debounce from "lodash.debounce";
import "../../../../assets/css/style.css";
import "../../../../assets/css/responsive.css";
import PageHeader from "components/pageheader/PageHeader";
import NewWindow from "react-new-window";
import { UncontrolledTooltip } from "reactstrap";
import ShowBuzzerPreloader from "./ShowBuzzerPreloader";
import { RowPreloader } from "components/preloders";

const ShowBuzzer = () => {
  const [songs, setSongs] = useState({});
  const [disable, setDisable] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const blueRipple = useRef(null);
  const redRipple = useRef(null);
  const [showClass, setShowClass] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [projectorOn, setProjectorOn] = useState(false);
  const [redBreathe, setRedBreathe] = useState(false);
  const [blueBreathe, setBlueBreathe] = useState(false);

  useEffect(() => {
    setSongs({ audio: new Audio(song) });
  }, []);

  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, []);

  const handleBlueButton = () => {
    setDisable(true);
    setBlueBreathe(true);
    blueRipple.current.classList.add("add-plus");
    songs.audio.play();
    setTimeout(() => {
      setDisable(false);
      setBlueBreathe(false);
      blueRipple.current?.classList.remove("add-plus");
    }, 5000);
  };

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };

  const handleRedButton = () => {
    redRipple.current.classList.add("add-plus");
    setDisable(true);
    setRedBreathe(true);
    songs.audio.play();
    setTimeout(() => {
      setDisable(false);
      setRedBreathe(false);
      redRipple.current?.classList.remove("add-plus");
    }, 5000);
  };
  return (
    <>
      {isLoad ? (
        <RowPreloader />
      ) : (
        <PageHeader
          pageName="Show Buzzer"
          handleFullScreen={() => setShowFullScreen(!showFullScreen)}
          handleEquivalentScreen={handleEquivalentScreen}
          icon={true}
          showProjectorScreen={true}
          showProjectorScreenButton={false}
        />
      )}

      {projectorOn && (
        <NewWindow
          name="ShowBuzzer"
          title="ShowBuzzer"
          closeOnUnmount={true}
          copyStyles="true"
        >
          <div className={showFullScreen ? "showFull-screen" : ""}>
            {showFullScreen && (
              <button
                style={{
                  cursor: "pointer",
                  zIndex: "1000",
                  float: "right",
                  right: "23px",
                  top: "1px",
                  border: "none",
                  background: "transparent",
                }}
                className="btn-close"
                onClick={() => setShowFullScreen(false)}
              >
                <img src={fullScreenExitSvg} alt="exit button" />
              </button>
            )}
          </div>
          <Buzzer
            blueRipple={blueRipple}
            redRipple={redRipple}
            handleBlueButton={handleBlueButton}
            handleRedButton={handleRedButton}
            disable={disable}
            showClass={showClass}
            load={isLoad}
            redBreathe={redBreathe}
            blueBreathe={blueBreathe}
          />
        </NewWindow>
      )}

      {showFullScreen ? (
        <div className="showFull-screen showBuzzer">
          <button
            style={{
              cursor: "pointer",
              zIndex: "1000",
              float: "right",
              right: "23px",
              top: "1px",
              border: "none",
              background: "transparent",
            }}
            className="btn-close"
            onClick={() => {
              setShowClass(false);
              document.body.style.overflow = "scroll";
              setShowFullScreen(false);
            }}
          >
            <img
              src={fullScreenExitSvg}
              alt="full-screen"
              id="fullScreenExit"
            />
            <UncontrolledTooltip target="fullScreenExit">
              <div className="tooltip-subtext">Exit Full Screen</div>
            </UncontrolledTooltip>
          </button>

          <Buzzer
            blueRipple={blueRipple}
            redRipple={redRipple}
            handleBlueButton={handleBlueButton}
            handleRedButton={handleRedButton}
            disable={disable}
            showClass={showClass}
            load={isLoad}
            redBreathe={redBreathe}
            blueBreathe={blueBreathe}
          />
        </div>
      ) : (
        <Buzzer
          blueRipple={blueRipple}
          redRipple={redRipple}
          handleBlueButton={handleBlueButton}
          handleRedButton={handleRedButton}
          disable={disable}
          showClass={showClass}
          load={isLoad}
          redBreathe={redBreathe}
          blueBreathe={blueBreathe}
        />
      )}
    </>
  );
};

const Buzzer = ({
  blueRipple,
  redRipple,
  handleBlueButton,
  handleRedButton,
  disable,
  showClass,
  load,
  redBreathe,
  blueBreathe,
}) => {
  return (
    <>
      <div className="tab-pane fade active show">
        {load ? (
          <ShowBuzzerPreloader />
        ) : (
          <>
            <div className="show-buzzer">
              <div className="two-buzzer ">
                <div className="ripple" ref={blueRipple}>
                  <div
                    className="center-random-number pointer"
                    onClick={() => {
                      !disable && handleBlueButton();
                    }}
                  >
                    <div
                      className={
                        blueBreathe
                          ? "progress-circle blueBreathe"
                          : "progress-circle"
                      }
                      style={{ backgroundColor: "#2096f3" }}
                    >
                      <div className="start-text"></div>
                    </div>
                  </div>
                </div>
                <div className="ripple" ref={redRipple}>
                  <div
                    className="center-random-number pointer"
                    onClick={() => {
                      !disable && handleRedButton();
                    }}
                  >
                    <div
                      className={
                        redBreathe
                          ? "progress-circle redBreathe"
                          : "progress-circle"
                      }
                      style={{ backgroundColor: "#f34334" }}
                    >
                      <div className="start-text"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShowBuzzer;
