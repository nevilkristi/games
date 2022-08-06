import playSvg from "./img/tools_play.svg";
import resetSvg from "./img/tools_reset.svg";
import pauseSvg from "../../../../../assets/img/tools_pause.svg";
//import "./style.css";
import "../../../../../assets/css/style.css";
import { UncontrolledTooltip } from "reactstrap";

const formatTime = (val, ...rest) => {
  let value = val.toString();
  return value.length < 3 ? value.padStart(2, "0") : value.slice(0, -1);
};

export const Watch = ({ stopWatch }) => {
  return (
    <div className="center-circle-with-icon">
      <div
        className={
          stopWatch.running ? "progress-circle breathe2" : "progress-circle"
        }
      >
        <div className="margin-zero-auto ">
          <div className="ring-animate" id="g1">
            <div
              className={stopWatch.running ? "start-ring ring-animate" : ""}
            ></div>
            <div className="start-text">
              <div className="white-text stopwatch">
                {formatTime(stopWatch.currentTimeMin)} :
                {formatTime(stopWatch.currentTimeSec)} :
                {formatTime(stopWatch.currentTimeMs, "ms")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WatchButton = ({
  stopWatch,
  startWatch,
  showButton,
  stopWatchTime,
  stopReset,
}) => {
  //const [breathe, setBreathe] = useState(false);

  return (
    <>
      <div className="">
        <div className="tab-pane fade show active">
          <div className="center-progress-circle">
            <div className="center-circle-with-icon">
              <div
                className={
                  stopWatch.running
                    ? "progress-circle breathe2"
                    : "progress-circle"
                }
              >
                <div className="margin-zero-auto ">
                  <div className="ring-animate" id="g1">
                    <div
                      className={
                        stopWatch.running ? "start-ring ring-animate" : ""
                      }
                    ></div>
                    <div className="start-text">
                      <div className="white-text stopwatch">
                        {formatTime(stopWatch.currentTimeMin)} :
                        {formatTime(stopWatch.currentTimeSec)} :
                        {formatTime(stopWatch.currentTimeMs, "ms")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pause-restore-btn">
                {!stopWatch.running && (
                  <>
                    <img
                      className="pause-circle-icon pointer "
                      src={playSvg}
                      onClick={startWatch}
                      alt="play"
                      style={{ backgroundColor: "#fff" }}
                      id="play"
                    />
                    <UncontrolledTooltip target="play">
                      <div className="tooltip-subtext">Play</div>
                    </UncontrolledTooltip>
                  </>
                )}

                {/*  */}
                {stopWatch.running && (
                  <>
                    <img
                      className="pause-circle-icon pointer"
                      id="pause"
                      src={pauseSvg}
                      onClick={stopWatchTime}
                      alt="push"
                    />
                    <UncontrolledTooltip target="pause">
                      <div className="tooltip-subtext">Pause</div>
                    </UncontrolledTooltip>
                  </>
                )}
                {showButton && (
                  <>
                    <img
                      className="restore-circle pause-circle-icon pointer"
                      id="btn-reset"
                      src={resetSvg}
                      onClick={stopReset}
                      alt="reset"
                    />
                    <UncontrolledTooltip target="btn-reset">
                      <div className="tooltip-subtext">Reset</div>
                    </UncontrolledTooltip>
                  </>
                )}
                {/* */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
