import React, { useEffect, useState, useRef } from "react"; //useEffect
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftSideBar from "modules/Dashboard/components/LeftSideBar";
import GamesCard from "modules/Dashboard/components/GamesCard";
import FilterTab from "modules/Dashboard/components/FilterTab";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredGame,
  setPreviousUrl,
  setGameGalleryShowItem,
  removeAllFilterBy,
  removeAllGameFilter,
} from "store/actions";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { PlaceHolderCard } from "components/preloders";

import backArrow from "assets/img/arrow-left.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "hooks/useDebounce";
const Dashboard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const filterId = params.id;
  const { FilteredGame, TotalFilteredGame, loadingGame } = useSelector(
    (state) => state.Game
  );
  const { sortBy, filterBy, gameFilter } = useSelector(
    (state) => state.Dashboard
  );
  const [generatedGames, setGeneratedGames] = useState([]);
  const [tempFilter, setTempFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({
    page_no: page,
    search: search,
    sort: sortBy,
    filter_by: +filterBy,
    page_record: 20,
    sort_order: sortBy === 6 ? "ASC" : "DESC",
    generated_game_id: generatedGames,
    filter_id: filterId ? [parseInt(filterId)] : [],
  });

  const fetchMoreData = () => {
    if (TotalFilteredGame > 0 && 20 * page >= TotalFilteredGame) {
      setHasMore(false);
    } else {
      setHasMore(true);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    let tempF = [];
    gameFilter.map((item, index) => tempF.push(item.id));
    setTempFilter(tempF);
  }, [gameFilter]);

  let tempFilterBy = [];
  useEffect(() => {
    // if (filterId !== undefined) {
    filterBy.length &&
      filterBy.map((item) => tempFilterBy.push(parseInt(item)));

    if (filterId) {
      if (!tempFilter.includes[parseInt(filterId)]) {
        tempFilter.push(parseInt(filterId));
      }
    }

    setPayload({
      page_no: page,
      search: search,
      sort: sortBy,
      filter_by: tempFilterBy,
      page_record: 20,
      sort_order: sortBy === 6 ? "ASC" : "DESC",
      generated_game_id: generatedGames,
      filter_id: tempFilter,
    });
    setHasMore(true);

    setPage(1);
    dispatch(
      fetchFilteredGame(
        {
          page_no: 1,
          search: "",
          sort: sortBy,
          filter_by: tempFilterBy,
          page_record: 20,
          sort_order: sortBy === 6 ? "ASC" : "DESC",
          generated_game_id: [],
          filter_id: tempFilter,
        },
        true
      )
    );
    setSearch("");
    // }
  }, [sortBy, dispatch]);

  useEffect(() => {
    if (filterId) {
      if (!tempFilter.includes[parseInt(filterId)]) {
        tempFilter.push(parseInt(filterId));
      }
    }
    page > 1 &&
      dispatch(
        fetchFilteredGame(
          {
            page_no: page,
            search: search,
            sort: sortBy,
            filter_by: filterBy,
            page_record: 20,
            sort_order: sortBy === 6 ? "ASC" : "DESC",
            generated_game_id: sortBy == 1 ? generatedGames : [],
            filter_id: tempFilter,
          },
          false
        )
      );
  }, [page]);

  useEffect(() => {
    if (filterId !== undefined) {
      setGeneratedGames([]);
      setHasMore(true);
      filterBy.length &&
        filterBy.map((item) => tempFilterBy.push(parseInt(item)));

      payload.page_no = 1;
      payload.generated_game_id = [];
      payload.filter_id = filterId ? [parseInt(filterId)] : tempFilter;
      payload.filter_by = tempFilterBy;
      setPage(1);

      // dispatch(removeAllFilterBy());
      setPayload(payload);

      dispatch(fetchFilteredGame(payload, true));
      dispatch(setGameGalleryShowItem(false));
    }
  }, [dispatch, filterId]);

  useEffect(() => {
    FilteredGame?.map((g) => {
      if (!generatedGames.includes(g?.game_id)) {
        setGeneratedGames((prev) => [...prev, g.game_id]);
      }
      return null;
    });
  }, [FilteredGame]);

  useEffect(() => {
    dispatch(setPreviousUrl(""));
  }, [dispatch]);

  const ref = useRef(null);

  const debouncedSearch = useDebounce(search);

  const handleClearFilter = () => {
    dispatch(removeAllGameFilter());
    dispatch(removeAllFilterBy());
  };

  useEffect(() => {
    if (filterId == undefined) {
      dispatch(
        fetchFilteredGame(
          {
            ...payload,
            filter_by: [],
            generated_game_id: [],
            page_no: 1,
            search: debouncedSearch,
          },
          true,
          (data) => {
            data.count > data.rows.length
              ? setHasMore(true)
              : setHasMore(false);
          }
        )
      );

      handleClearFilter();
      setPayload({
        ...payload,
        filter_by: [],
        generated_game_id: [],
        page_no: 1,
        search: debouncedSearch,
      });
      setHasMore(true);
      setPage(1);
      setGeneratedGames([]);
    }
  }, [debouncedSearch, filterId]);

  return (
    <section className="grow-game bg-light-gray bg-shap">
      <div className="container-fluid c-plr100">
        <div className="cust-flex pt30">
          <div className="left-side-dashboard">
            <LeftSideBar
              type="game"
              callBack={(search) => {
                setHasMore(true);
                setSearch(search);
                payload.search = search;
              }}
              search={debouncedSearch}
            />
          </div>
          <div className="right-side-dashboard" ref={ref}>
            {filterId !== undefined ? (
              <>
                <div className="c-page-title pt-0 pb-4">
                  <div className="back-arrow-title">
                    <Link to="/" className="back-arrow back-arrow-canvas">
                      <img src={backArrow} alt="" className="h20" />
                    </Link>
                    <div className="title-and-logo">
                      <div className="individual-title">
                        <h2 className="mb-0">Games</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <FilterTab />
              </>
            ) : (
              <>
                <FilterTab />
                <div className="search-area-right-dashboard mt20">
                  <h6>
                    Explore... <CountUp duration={1} end={TotalFilteredGame} />{" "}
                    {TotalFilteredGame > 1 ? " games " : " game "}
                    in our library
                  </h6>
                  <div className="input-group cust-search-right-dashboard">
                    <span className="search-main">
                      <input
                        className="form-control c-search"
                        type="search"
                        placeholder="Search"
                        id="example-search-input"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        value={search}
                      />
                    </span>
                  </div>
                </div>
              </>
            )}

            {loadingGame ? (
              <div className="row mt-3">
                <PlaceHolderCard />
              </div>
            ) : (
              <InfiniteScroll
                dataLength={FilteredGame.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  FilteredGame.length > 0 ? (
                    <div className="search-area-right-dashboard mt20 mb20 d-flex justify-content-center">
                      <h6 style={{ textAlign: "center" }}>Loading .....</h6>
                    </div>
                  ) : null
                }
                endMessage={
                  FilteredGame.length > 0 ? (
                    <div className="search-area-right-dashboard mt20 mb20 d-flex justify-content-center">
                      <h6 style={{ textAlign: "center" }}>
                        You Have Seen It All !!
                      </h6>
                    </div>
                  ) : null
                }
              >
                <GamesCard Game={FilteredGame} loading={loadingGame} />
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
