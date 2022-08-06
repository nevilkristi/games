import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteGame } from "store/actions";
import { fetchFavoriteIceBreaker, setPreviousUrl } from "store/actions";
import IceBreakerCard from "./IceBreakerCard";
import GamesCard from "modules/Dashboard/components/GamesCard";

const MyFavorite = () => {
  const dispatch = useDispatch();
  const { iceBreakerListFavorite } = useSelector((state) => state.IceBreaker);
  const { FavoriteGame } = useSelector((state) => state.Game);

  const [iceBreakers, setIceBreakers] = useState([]);
  const [games, setGames] = useState([]);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    tab === 1
      ? dispatch(
          fetchFavoriteGame({
            page_record: 50,
            page_no: 1,
          })
        )
      : dispatch(fetchFavoriteIceBreaker({}));
  }, [tab, dispatch]);

  useEffect(() => {
    dispatch(setPreviousUrl("accounts/myFavorite"));
  }, [dispatch]);

  const changeTab = (v) => setTab(v);

  useEffect(() => {
    setGames(FavoriteGame);
  }, [FavoriteGame]);
  useEffect(() => {
    setIceBreakers(iceBreakerListFavorite);
  }, [iceBreakerListFavorite]);
  const buttons = ["Games", "Icebreakers"];

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-myfavorites"
        role="tabpanel"
        aria-labelledby="v-pills-myfavorites-tab"
      >
        <div className="tab-right-mylist">
          <h6>My Favorites</h6>
        </div>
        <div className="myfiltersTab mt20">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {buttons.map((v, i) => (
              <li className="nav-item">
                <button
                  className={`nav-link  ${
                    tab === i + 1 ? "active" : ""
                  } cursor-pointer`}
                  id="myfavorites-games-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="myfilters-games"
                  aria-selected="true"
                  onClick={() => changeTab(i + 1)}
                >
                  {v}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="myTabContent">
            {tab === 1 ? (
              <GamesCard Game={games} location="favoriteGame" />
            ) : (
              <IceBreakerCard
                iceBreakerList={iceBreakers}
                locationType="my-fav"
                show={true}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFavorite;
