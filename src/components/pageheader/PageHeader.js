import React from "react";
import twoScreenComputerSvg from "assets/img/new-browser.svg";
import fullScreenSvg from "assets/img/full-screen.svg";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import arrowLeftsvg from "assets/img/arrow-left.svg";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

const PageHeader = ({
  pageName,
  handleFullScreen,
  handleEquivalentScreen,
  showFullScreen,
  showProjectorScreen,
  showProjectorScreenButton = true,
  showFullScreenButton = true,
  showButton = true,
  icon = false,
  handleBack,
}) => {
  return (
    <div className="">
      <div className="stopwatch-wrapper">
        <div className="back-arrow-title">
          {!icon && (
            <>
              <Link to="#" className="back-arrow back-arrow-canvas">
                <img
                  src={arrowLeftsvg}
                  alt=""
                  className="h20"
                  onClick={handleBack}
                />
              </Link>
            </>
          )}
          <div className={!icon ? "ml10" : "ml0"}>
            <div className="slide-title canvas-title ">
              <h2>{pageName}</h2>
            </div>
          </div>
        </div>

        {showButton && (
          <div className="browser pointer">
            {showProjectorScreenButton && (
              <>
                <img
                  id="twoScreenComputer"
                  src={twoScreenComputerSvg}
                  alt="Equivalent Screen"
                  className={
                    showProjectorScreen
                      ? "new-browser-img d-none"
                      : "new-browser-img "
                  }
                  style={{ cursor: "pointer" }}
                  onClick={handleEquivalentScreen}
                />

                <UncontrolledTooltip target="twoScreenComputer">
                  <div className="tooltip-subtext">Projector Screen</div>
                </UncontrolledTooltip>
              </>
            )}
            {showFullScreenButton && (
              <>
                <img
                  id="fullScreen"
                  src={fullScreenSvg}
                  className={
                    showFullScreen
                      ? "new-browser-img d-none"
                      : "new-browser-img"
                  }
                  alt="Fullscreen"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    document.body.style.overflow = "hidden";
                    handleFullScreen(true);
                  }}
                />
                <UncontrolledTooltip target="fullScreen">
                  <div className="tooltip-subtext">Full Screen</div>
                </UncontrolledTooltip>
                <img
                  id="fullScreenExit"
                  src={fullScreenExitSvg}
                  className={
                    showFullScreen
                      ? "new-browser-img"
                      : "new-browser-img d-none"
                  }
                  alt=" Exit Fullscreen"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    document.body.style.overflow = "scroll";
                    handleFullScreen(false);
                  }}
                />
                <UncontrolledTooltip target="fullScreenExit">
                  <div className="tooltip-subtext">Exit Full Screen</div>
                </UncontrolledTooltip>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
