import React, { useState, useEffect } from "react";
import fullscreenExitSvg from "assets/img/full-screen-exit.svg";
import NewWindow from "react-new-window";
import CountUp from "react-countup";
import debounce from "lodash.debounce";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import RandomNumberPreloader from "./RandomNumberPreloader";
import resetSvg from "../../../../assets/img/tools_reset.svg";
import "../../../../assets/css/style.css";
import PageHeader from "components/pageheader/PageHeader";
import ResetRandomNameModal from "../RandomName/ResetRandomNameModal";
import { UncontrolledTooltip } from "reactstrap";
import { RowPreloader } from "components/preloders";
import Chance from "chance";
const RandomNumber = () => {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [randomNum, setRandomNum] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [numberHistory, setNumberHistory] = useState([]);
  const [tempNumHistory, setTempNumHistory] = useState([]);
  const [numberLoop, setNumberLoop] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [double, setDouble] = useState(false);
  const [show, setShow] = useState(true);
  const [projectorOn, setProjectorOn] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const [isGenerateName, setIsGenerateName] = useState(false);
  const chance = new Chance();

  // const checkNum = () => {
  //   let num = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);

  //   if (isRepeat && numberHistory.includes(num)) {
  //     continue;
  //   } else return num;
  // };
  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);
  useEffect(() => {
    LoadFalse();
  }, []);
  const handleMinChange = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }
    let min;
    if (+e.target.value === min && +e.target.value) {
      setMinVal(1);
    } else if (+e.target.value > 99998) {
      setMinVal(99999);
    } else if (e.target.value === "") {
      setMinVal("");
    } else {
      setMinVal(+e.target.value);
    }
    setRandomNum([]);
    setTempNumHistory([]);
    setNumberHistory([]);
  };
  const handleRandomNum = () => {
    setBreathe(true);
    setDouble(true);
    setIsGenerateName(true);
    let num;
    if (+minVal == "") {
      setBreathe(false);
      setIsGenerateName(false);
      setDouble(false);
      toast.error("Please enter minimun number.");
    } else if (+minVal == +maxVal) {
      setBreathe(false);
      setIsGenerateName(false);
      setDouble(false);
      toast.error("Please enter  different minimum or maximum number.");
    } else if (+minVal > +maxVal) {
      setDouble(false);
      setIsGenerateName(false);
      setBreathe(false);
      toast.error("Please enter minimum number less than maximum number.");
    } else if (isRepeat) {
      num = chance.natural({
        min: +minVal,
        max: +maxVal,
        exclude: [],
      });
      setRandomNum([num]);
      historyChange(num);
    } else if (numberHistory.length < maxVal - minVal + 1) {
      num = chance.natural({
        min: +minVal,
        max: +maxVal,
        exclude: tempNumHistory,
      });
      setNumberHistory(numberHistory);
      setRandomNum([num]);
      historyChange(num);
    } else {
      setDouble(false);
      setBreathe(false);
      setIsGenerateName(false);
      toast.error(
        "Sorry, There is no unique number found between entered range."
      );
    }
    setNumberLoop(true);
    setTimeout(() => {
      setIsGenerateName(false);
    }, 1200);
  };
  const [resetModal, setResetModal] = useState({
    show: false,
  });
  const onCloseRandomNameModal = () => {
    setRandomNum({
      show: false,
      data: "",
    });
    setResetModal({
      show: false,
    });
  };
  const handleMaxChange = (e) => {
    const { value, maxLength } = e.target;
    if (String(value).length >= maxLength) {
      e.preventDefault();
      return;
    }

    if (+e.target.value > 99999) {
      // setMaxVal(99999);
    } else if (e.target.value === "") {
      setMaxVal("");
    } else {
      setMaxVal(+e.target.value);
    }
    setRandomNum([]);
    setNumberHistory([]);
    setTempNumHistory([]);
  };
  const historyChange = debounce((x) => {
    if (randomNum && x !== undefined) {
      // let newHistory = [...numberHistory];
      // newHistory.push(x);
      setNumberHistory((prev) => [...prev, x]);
      setTempNumHistory((prev) => [...prev, x]);
      setDouble(false);
      setShow(false);
      setBreathe(false);
    }
  }, 4000);
  const handleResetNum = () => {
    setRandomNum(0);
    setRandomNum([]);
    setTempNumHistory([]);
    setNumberHistory([]);
    setShow(true);
    setDouble(false);
  };
  const handleRepeat = () => {
    setDouble(false);
    setIsRepeat(!isRepeat);
    setRandomNum([]);
    setTempNumHistory([]);
    setNumberHistory([]);
  };
  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };
  // document.addEventListener("wheel", function (event) {
  //   if (
  //     document.activeElement.type === "number" &&
  //     document.activeElement.classList.contains("noscroll")
  //   ) {
  //     document.activeElement.blur();
  //   }
  // });
  return (
    <>
      <ToastContainer />
      <div>
        <div className="desktop-view">
          {isLoad ? (
            <>
              <RowPreloader height="60px" />
            </>
          ) : (
            <>
              <PageHeader
                pageName="Random Number"
                handleFullScreen={() => setFullScreen(!fullScreen)}
                handleEquivalentScreen={handleEquivalentScreen}
                icon={true}
              />
              {projectorOn && (
                <NewWindow
                  name="Random Number"
                  title="Random Number"
                  closeOnUnmount={true}
                  copyStyles="true"
                >
                  <div className={fullScreen ? "showFull-screen" : ""}>
                    {fullScreen && (
                      <button
                        className="btn-close"
                        onClick={() => setFullScreen(false)}
                      >
                        <img src={fullscreenExitSvg} alt="exit button" />
                      </button>
                    )}
                  </div>
                  <div className="centered-new-screen">
                    <div className="center-random-number">
                      <div
                        className={
                          breathe
                            ? "progress-circle breathe2"
                            : "progress-circle"
                        }
                      >
                        <div className="start-text">
                          <div className="random-number" id="result">
                            <p>
                              <CountUp end={randomNum} duration={2} />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NewWindow>
              )}
            </>
          )}
        </div>
        <div className="tab-pane fade active show">
          {isLoad ? (
            <RandomNumberPreloader />
          ) : (
            <>
              <div
                className={
                  fullScreen ? "showFull-screen random-card" : "random-card"
                }
              >
                <div
                  className={`project-inner `}
                  // <div className={fullScreen ? "showFull-screen" : ""}>
                >
                  {fullScreen && (
                    <button
                      className="btn-close"
                      // onClick={() => setFullScreen(false)}
                      onClick={() => {
                        setFullScreen(false);
                        document.body.style.overflow = "scroll";
                      }}
                    >
                      <img
                        src={fullscreenExitSvg}
                        alt="exitFullScreen"
                        id="fullScreenExit"
                      />
                      <UncontrolledTooltip target="fullScreenExit">
                        <div className="tooltip-subtext">Exit Full Screen</div>
                      </UncontrolledTooltip>
                    </button>
                  )}
                </div>
                <div className="random-number-box ">
                  <div className="ring-animate">
                    <div
                      className={`${
                        numberLoop
                          ? " start-ring ring-animate "
                          : "ring-animate "
                      }`}
                    ></div>
                  </div>
                  <div className="random-form">
                    <div className="row">
                      <div className="form-group mr-4 mb-0">
                        <label
                          htmlFor="minimum"
                          className="random-number-control-label"
                        >
                          Min number
                        </label>
                        <input
                          type="number"
                          className="form-control text-input"
                          placeholder="Enter number here"
                          step="1"
                          value={minVal.toString()}
                          id="minimum"
                          maxLength={6}
                          onChange={handleMinChange}
                        />
                      </div>
                      <div className="form-group mb-0">
                        <label
                          htmlFor="maximum"
                          className="random-number-control-label"
                        >
                          Max number
                        </label>
                        <input
                          type="number"
                          className="form-control text-input"
                          placeholder="Enter number here"
                          maxLength="6"
                          value={maxVal.toString()}
                          id="maximum"
                          onChange={handleMaxChange}
                        />
                      </div>
                      <div className="do-not-switch mt-2">
                        <label className="switch">
                          <input
                            type="checkbox"
                            id="norepeat"
                            defaultChecked={!isRepeat}
                            onChange={handleRepeat}
                          />
                          <span className="slider round"></span>
                        </label>
                        <span>Do not Repeat</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className={fullScreen ? "showFull-screen" : ""}> */}
                  <div className="center-random-number">
                    <div
                      className={
                        breathe ? "progress-circle breathe2" : "progress-circle"
                      }
                    >
                      <div className="start-text">
                        <div className="random-number" id="result">
                          <p>
                            <CountUp
                              end={isGenerateName ? 50 : randomNum}
                              duration={2}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!show && (
                    <div className="history-card">
                      {!show && <h5>History {""}</h5>}
                      <p className="scroll-num">
                        {numberHistory.length > 0 &&
                          numberHistory.map((num) => (
                            <span key={num}> {num} </span>
                          ))}
                      </p>
                    </div>
                  )}
                  {/* </div> */}
                  <div className="generate-number mt-2 pt20">
                    <button
                      disabled={double}
                      type="submit"
                      className="btn btn-primary random-number-btn"
                      onClick={handleRandomNum}
                    >
                      {isGenerateName ? "Generating Number" : "Generate Number"}
                    </button>
                    <img
                      className="restore-circle pause-circle-icon"
                      id="btn-reset"
                      src={resetSvg}
                      onClick={() => {
                        setResetModal((prev) => ({
                          ...prev,
                          show: true,
                        }));
                      }}
                      alt="reset"
                      style={{ cursor: "pointer" }}
                    />
                    <UncontrolledTooltip target="btn-reset">
                      <div className="tooltip-subtext">Reset</div>
                    </UncontrolledTooltip>
                    <ResetRandomNameModal
                      show={resetModal.show}
                      onClose={onCloseRandomNameModal}
                      reset={handleResetNum}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default RandomNumber;
