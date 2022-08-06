import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayedGame, setPreviousUrl } from "store/actions";
import GamesCard from "modules/Dashboard/components/GamesCard";

const PlayedGame = () => {
  const dispatch = useDispatch();
  const { PlayedGame, loadingPlayedGame } = useSelector((state) => state.Game);
  // const [isLoad, setIsLoad] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    dispatch(
      fetchPlayedGame({
        page_record: "100",
        page_no: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setGames(PlayedGame);
    // setIsLoad(false);
  }, [PlayedGame]);

  useEffect(() => {
    dispatch(setPreviousUrl("accounts/playedGame"));
  }, [dispatch]);

  // window.onscroll = debounce(() => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //     ) {
  //       setIsScroll(true)
  //       if (MyGameCount > games.length){
  //         setIsPage(isPage+1)
  //         let temp = {
  //             page_record: "20",
  //             page_no: isPage
  //         }
  //         dispatch(fetchPlayedGame(temp, true));
  //       }
  //     }
  // }, 1000);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-playedgames"
        role="tabpanel"
        aria-labelledby="v-pills-playedgames-tab"
      >
        <div className="tab-right-mylist">
          <h6>Played Games</h6>
        </div>
        <GamesCard
          Game={games}
          location="playedGame"
          loading={loadingPlayedGame}
        />
      </div>
    </>
  );
};

export default PlayedGame;
