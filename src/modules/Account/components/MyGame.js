import React, { useEffect, useState } from "react";
import GamesCard from "modules/Dashboard/components/GamesCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGame, setPreviousUrl } from "store/actions";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlaceHolderCard } from "components/preloders";
const MyGame = () => {
  const [games, setGames] = useState([]);
  const { Game, MyGameCount } = useSelector((state) => state.Game);
  const dispatch = useDispatch();
  // const [isScroll, setIsScroll] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    if (MyGameCount > 0 && 20 * page >= MyGameCount) {
      setHasMore(false);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(
    () => {
      dispatch(
        fetchMyGame(
          {
            page_record: "20",
            page_no: 1,
          },
          false
        )
      );
    },
    [dispatch],
    Game
  );
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setGames(Game);
    setIsLoad(false);
  }, [Game]);

  useEffect(() => {
    dispatch(setPreviousUrl("accounts/myGames"));
  }, [dispatch]);

  useEffect(() => {
    if (Game.length > 0) {
      setGames(Game);
      // setIsScroll(false);
    }
  }, [Game]);

  useEffect(() => {
    page !== 1 &&
      dispatch(
        fetchMyGame(
          {
            page_record: "20",
            page_no: page,
          },
          true
        )
      );
  }, [page]);

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-mygames"
        role="tabpanel"
        aria-labelledby="v-pills-mygames-tab"
      >
        <div className="tab-right-mylist">
          <h6>My Games</h6>
        </div>

        {isLoad ? (
          <div className="row mt-3">
            <PlaceHolderCard />
          </div>
        ) : Game.length >= 0 ? (
          <InfiniteScroll
            dataLength={Game.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              Game.length > 0 ? (
                <div className="search-area-right-dashboard mt20 mb20 d-flex justify-content-center">
                  <h6 style={{ textAlign: "center" }}>Loading .....</h6>
                </div>
              ) : null
            }
            endMessage={
              Game.length > 0 ? (
                <div className="search-area-right-dashboard mt20 mb20 d-flex justify-content-center">
                  <h6 style={{ textAlign: "center" }}>
                    You Have Seen It All !!
                  </h6>
                </div>
              ) : null
            }
          >
            <GamesCard location="myGames" Game={Game} loading={isLoad} />
          </InfiniteScroll>
        ) : (
          <div className="row mt-3">
            <PlaceHolderCard />
          </div>
        )}
      </div>
    </>
  );
};

export default MyGame;
