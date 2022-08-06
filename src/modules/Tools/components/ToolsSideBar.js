import React from "react";
import toolStopWatchSVg from "assets/img/tools_stopwatch.svg";
import toolTimerSVg from "assets/img/tools_timer.svg";
import toolScoreBoard from "assets/img/tools_scoreboard.svg";
import toolSteps from "assets/img/tools_steps.svg";
import toolWheel from "assets/img/tools_wheel.svg";
import toolPoll from "assets/img/tools_poll.svg";
import toolShowBuzzer from "assets/img/show_buzzer.png";
import toolRandomName from "assets/img/tools_random_names.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearStore } from "../store/actions";

const ToolsLeftSideBar = ({ activeTab = "stopwatch" }) => {
  const dispatch = useDispatch();

  const toolsList = [
    {
      id: 1,
      title: "stopwatch",
      img: toolStopWatchSVg,
    },
    {
      id: 2,
      title: "chess-clock",
      img: toolTimerSVg,
    },
    {
      id: 3,
      title: "scoreboard",
      img: toolScoreBoard,
    },
    {
      id: 5,
      title: "random-number",
      img: toolSteps,
    },
    {
      id: 6,
      title: "random-name",
      img: toolRandomName,
    },
    {
      id: 7,
      title: "wheel",
      img: toolWheel,
    },
    {
      id: 8,
      title: "polling",
      img: toolPoll,
    },
    {
      id: 9,
      title: "show-buzzer",
      img: toolShowBuzzer,
    },
  ];

  const resetStore = () => {
    dispatch(clearStore());
  };
  return (
    <div className="grow-game-tab">
      <div className="nav flex-column nav-pills grow-nav-pills">
        {toolsList.map((i) => (
          <Link
            key={i.id}
            className={`nav-link grow-nav-link ${
              activeTab === i.title ? "active" : ""
            }`}
            onClick={resetStore}
            to={`/tool/${i.title}`}
          >
            <div className="tab-wrapper">
              <div className="icon-with-text">
                <div className="custom-icon teach">
                  <img
                    src={i.img}
                    alt=""
                    className="tools-nav-img"
                    data-src={i.title}
                    data-id={i.id}
                  />
                </div>
                <span className="ml-2">{i.title.replace("-", " ")}</span>
              </div>

              <div className="tab-arrow">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsLeftSideBar;
