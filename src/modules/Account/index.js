import React, { useEffect, useState } from "react";
import AccountSideBar from "modules/Account/components/AccountSideBar";
import PlayedGame from "modules/Account/components/PlayedGame";
import MyGame from "modules/Account/components/MyGame";
import NoteTab from "modules/Account/components/NoteTab";
import MyIceBreaker from "modules/Account/components/MyIceBreaker";
import MyFilter from "modules/Account/components/MyFilter";
import MyFavorite from "modules/Account/components/MyFavroite";
import { useParams, useHistory } from "react-router-dom";
import PageNotFound from "components/common/PageNotFound";

function Account() {
  const [activeTab, setActiveTab] = useState("myGames");
  const history = useHistory();
  const params = useParams();
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
    history.push(`/accounts/${tab}`);
  };
  const tabs = [
    "myGames",
    "playedGame",
    "Notes",
    "myIcebreakers",
    "myFilter",
    "myFavorite",
  ];
  const activeTabParams = params.activeTab;

  useEffect(() => {
    if (activeTabParams === undefined) {
      setActiveTab("myGames");
    } else if (tabs.includes(activeTabParams)) {
      setActiveTab(activeTabParams);
    } else {
      setActiveTab("notFound");
    }
  }, [activeTabParams]);

  return (
    <section className="pb60 pt30 game-list-content">
      <div className="container-fluid c-plr100">
        {activeTab === "notFound" ? (
          <PageNotFound />
        ) : (
          <div className="cust-flex">
            <div className="left-side-dashboard">
              <AccountSideBar
                currentActive={activeTab}
                activeTab={handleActiveTab}
              />
            </div>
            <div className="right-side-dashboard">
              <div className="tab-content" id="v-pills-tabContent">
                {activeTab === "myGames" && <MyGame />}
                {activeTab === "playedGame" && <PlayedGame />}
                {activeTab === "Notes" && <NoteTab />}
                {activeTab === "myIcebreakers" && <MyIceBreaker />}
                {activeTab === "myFilter" && <MyFilter />}
                {activeTab === "myFavorite" && <MyFavorite />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Account;
