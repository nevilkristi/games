import ChessClock from "modules/Tools/components/ChessClock/ChessClock";
import Stopwatch from "modules/Tools/components/StopWatch/Stopwatch";
import RandomNumber from "modules/Tools/components/RandomNumber/RandomNumber";
import ToolsLeftSideBar from "modules/Tools/components/ToolsSideBar";
import React, { useEffect, useState } from "react";
import RandomName from "modules/Tools/components/RandomName/RandomName";
import ScoreCard from "modules/Tools/components/ScoreCard/ScoreCard";
import FingerChooser from "modules/Tools/components/FingerChooser/FingerChooser";
import Wheel from "modules/Tools/components/Wheel/Wheel";
import Polling from "modules/Tools/components/Polling/Polling";
import ShowBuzzer from "modules/Tools/components/ShowBuzzer/ShowBuzzer";
import { ToolPreloader } from "components/preloders";
import { useParams } from "react-router-dom";
import PageNotFound from "components/common/PageNotFound";

const Tool = () => {
  const [activeTab, setActiveTab] = useState("stopwatch");
  const [isLoad, setIsLoad] = useState(true);
  const params = useParams();
  const activeTabParams = params.activeTab;

  const tabs = [
    "stopwatch",
    "chess-clock",
    "scoreboard",
    "random-number",
    "random-name",
    "wheel",
    "polling",
    "show-buzzer",
  ];
  useEffect(() => {
    if (activeTabParams === undefined) {
      setActiveTab("stopwatch");
    } else if (tabs.includes(activeTabParams)) {
      setActiveTab(activeTabParams);
    } else {
      setActiveTab("notFound");
    }
  }, [activeTabParams]);

  useEffect(() => {
    setIsLoad(false);
  }, [isLoad]);

  return (
    <section className="pb60 pt30 game-tool-content">
      <div className="container-fluid c-plr100">
        {activeTab === "notFound" ? (
          <PageNotFound />
        ) : (
          <div className="row">
            <div className="col-lg-3 desktop-view">
              <ToolsLeftSideBar activeTab={activeTabParams} />
            </div>

            <div className="col-lg-9">
              {isLoad ? (
                <ToolPreloader />
              ) : (
                <div className="fullscreen-box">
                  {activeTab === "stopwatch" && <Stopwatch />}
                  {activeTab === "chess-clock" && <ChessClock />}
                  {activeTab === "random-number" && <RandomNumber />}
                  {activeTab === "random-name" && <RandomName />}
                  {activeTab === "scoreboard" && <ScoreCard />}
                  {activeTab === "finger-chooser" && <FingerChooser />}
                  {activeTab === "wheel" && <Wheel />}
                  {activeTab === "polling" && <Polling />}
                  {activeTab === "show-buzzer" && <ShowBuzzer />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tool;
