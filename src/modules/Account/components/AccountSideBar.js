import React, { useEffect, useState } from "react";
import gameIcon from "assets/img/account_games.svg";
import noteIcon from "assets/img/account_notes.svg";
import iceBreakerIcon from "assets/img/account_icebreakers.svg";
import filterIcon from "assets/img/account_filter.svg";
import favoriteIcon from "assets/img/account_fav.svg";

const AccountSideBar = ({ currentActive, activeTab }) => {
  const [isActive, setIsActive] = useState("myGame");

  useEffect(() => {
    setIsActive(currentActive);
  }, [currentActive]);

  const handleActiveTab = (tab) => {
    activeTab(tab);
    setIsActive(tab);
  };

  const tabs = [
    {
      icon: gameIcon,
      tab: "myGames",
      title: "My Games",
      bgColor: "bg-icon-red",
    },
    {
      icon: gameIcon,
      tab: "playedGame",
      title: "Played Games",
      bgColor: "bg-icon-danger",
    },
    {
      icon: noteIcon,
      tab: "Notes",
      title: "My Notes",
      bgColor: "bg-icon-grey",
    },
    {
      icon: iceBreakerIcon,
      tab: "myIcebreakers",
      title: "My Icebreakers",
      bgColor: "bg-icon-warning",
    },
    {
      icon: filterIcon,
      tab: "myFilter",
      title: "My Filters",
      bgColor: "bg-icon-lightgreen",
    },
    {
      icon: favoriteIcon,
      tab: "myFavorite",
      title: "My Favorites",
      bgColor: "bg-icon-lightblue",
    },
  ];

  return (
    <div className="grow-game-tab2">
      <div
        className="nav flex-column nav-pills grow-nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        {tabs &&
          tabs.map((item, index) => (
            <button
              className={`nav-link ${
                isActive === item.tab ? "active" : ""
              } cursor-pointer`}
              id="v-pills-mygames-tab"
              key={index}
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-mygames"
              aria-selected="true"
              onClick={() => handleActiveTab(item.tab)}
            >
              <div className="tab-wrapper">
                <div className="icon-with-text">
                  <div
                    className={`custom-icon-new custom-icon-1 ${item.bgColor}`}
                  >
                    <img src={item.icon} alt="" className="" />
                  </div>
                  <span className="ml-2">{item.title}</span>
                </div>
                <div className="tab-arrow"></div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default AccountSideBar;
