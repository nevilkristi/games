import React, { useEffect, useState } from "react";
import fullScreenSvg from "assets/img/full-screen.svg";
import { Progress } from "reactstrap";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import PageHeader from "components/pageheader/PageHeader";
import NewWindow from "react-new-window";
import { UncontrolledTooltip } from "reactstrap";
import { getSystemConfiguration } from "store/actions";
import { useDispatch } from "react-redux";
const PollingResult = ({ tool_list, poll, onStepChange }) => {
  const dispatch = useDispatch();
  const [total_response, setTotalResponse] = useState(0);
  const [finalResult, setFinalResult] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [projectorOn, setProjectorOn] = useState(false);

  const [colors, setColors] = useState([
    {
      color_id: 1,
      color_code: "#F34334",
    },
    {
      color_id: 2,
      color_code: "#EA1E63",
    },
    {
      color_id: 3,
      color_code: "#A224B8",
    },
    {
      color_id: 4,
      color_code: "#673BB7",
    },
    {
      color_id: 5,
      color_code: "#4050B4",
    },
    {
      color_id: 6,
      color_code: "#2096F3",
    },
    {
      color_id: 7,
      color_code: "#72C5ED",
    },
    {
      color_id: 8,
      color_code: "#04BDD7",
    },
    {
      color_id: 9,
      color_code: "#029688",
    },
    {
      color_id: 10,
      color_code: "#4BAF50",
    },
    {
      color_id: 11,
      color_code: "#8CC14A",
    },
    {
      color_id: 12,
      color_code: "#CBDC36",
    },
    {
      color_id: 13,
      color_code: "#FFEA3E",
    },
    {
      color_id: 14,
      color_code: "#FBC009",
    },
    {
      color_id: 15,
      color_code: "#FE9700",
    },
  ]);

  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };

  useEffect(() => {
    dispatch(
      getSystemConfiguration(
        { site_id: 4, data_for: "mobile_application" },
        (data) => {
          data.colorList ? setColors(data.colorList) : setColors([]);
        }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    let tempPoll = poll.filter((item) => item.tool_list_id === +tool_list.id);
    let total = 0;
    tempPoll[0]?.option?.map((item) => {
      total = total + Math.abs(item.option_score);
      return item;
    });

    let newList = tempPoll[0]?.option?.map((item) => {
      item.option_percentage = Math.floor(
        (Math.abs(item.option_score) / total) * 100
      );
      return item;
    });

    setTotalResponse(total);
    setFinalResult(newList);
  }, [tool_list, poll]);

  return (
    <>
      <div className=" ">
        <PageHeader
          pageName="Polling Result"
          handleFullScreen={() => setShowFullScreen(!showFullScreen)}
          handleEquivalentScreen={handleEquivalentScreen}
          showProjectorScreen={true}
          showProjectorScreenButton={false}
          handleBack={() => {
            onStepChange(
              {
                tool_list_id: tool_list.id,
                list_name: tool_list.name,
              },
              2
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
                  alt="fullscreen"
                  id="fullScreenExit"
                />
                <UncontrolledTooltip target="fullScreenExit">
                  <div className="tooltip-subtext">Exit Full Screen</div>
                </UncontrolledTooltip>
              </button>
            )}
            <div className="polling-start-card p-0 ">
              <div className="total-heading">
                <p>{`Total Response  : ` + total_response}</p>
              </div>
              <div className="border-line"></div>
              <div className="polling-progress">
                {finalResult.map((option, index) => {
                  return (
                    <div className="progress-wrapper" key={index}>
                      <div className="progress-heading">
                        <span>{option.option_name}</span>
                        <span>
                          {option.option_percentage
                            ? option.option_percentage
                            : "0"}
                          %
                        </span>
                      </div>
                      <Progress
                        color={colors[0].color_code}
                        value={
                          option.option_percentage
                            ? option.option_percentage
                            : null
                        }
                        style={{ color: colors[0].color_code }}
                      ></Progress>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {projectorOn && (
        <NewWindow title="POLLING RESULT" name="POLLING RESULT">
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
                    alt="fullscreen"
                    id="fullScreenExit"
                  />
                </button>
              )}
              <div className="polling-start-card p-0 ">
                <div className="total-heading">
                  <p>{`Total Response  : ` + total_response}</p>
                </div>
                <div className="border-line"></div>
                <div className="polling-progress">
                  {finalResult.map((option, index) => {
                    return (
                      <div className="progress-wrapper" key={index}>
                        <div className="progress-heading">
                          <span>{option.option_name}</span>
                          <span>
                            {option.option_percentage
                              ? option.option_percentage
                              : "0"}
                            %
                          </span>
                        </div>
                        <Progress
                          color={option.color_code}
                          value={
                            option.option_percentage
                              ? option.option_percentage
                              : null
                          }
                        ></Progress>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </NewWindow>
      )}
    </>
  );
};

export default PollingResult;
