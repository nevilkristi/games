import React, { useEffect, useState } from "react";
import SortBy from "components/sideBar/SortBy";
import FilterBy from "components/sideBar/FilterBy";
import Popular from "components/sideBar/Popular";
import Custom from "components/sideBar/Custom";
import AllOther from "components/sideBar/AllOther";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilter,
  fetchFilteredGame,
  fetchIceBreaker,
  removeAllGameFilter,
  removeAllFilterBy,
  removeIcebreakerFavoriteFilter,
} from "store/actions";
import { useHistory, useParams } from "react-router-dom";
import { LeftPreloader } from "components/preloders";
import PopularIceBreaker from "components/sideBar/PopularIceBreaker";

const LeftSideBar = ({
  type,
  location,
  searchbar = true,
  callBack,
  search,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { filters, gameFilter, filterBy, sortBy, favoriteFilter } = useSelector(
    (state) => state.Dashboard
  );
  const [isLoad, setIsLoad] = useState(true);
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  const [customFilter, setCustomFilter] = useState([]);
  const [otherFilter, setOtherFilter] = useState([]);
  const [popularFilter, setPopularFilter] = useState([]);
  const dispatchCall = (payload, is_type = false) => {
    dispatch((is_type ? fetchIceBreaker : fetchFilteredGame)(payload, true));
  };

  const filterId = params.id;

  let tempFilter = [],
    tempFilterBy = [];

  console.log("leftsidebar", search);

  useEffect(() => {
    if (
      !params.id &&
      Object.keys(params).length > 0 &&
      params[0].includes("=")
    ) {
      dispatchCall({
        sort: sortBy,
        sort_order: sortBy === 6 ? "ASC" : "DESC",
        page_record: 20,
        page_no: 1,
        filter_id: filterId ? [parseInt(filterId)] : [],
        generated_game_id: [],
        filter_by: [],
        search: search,
      });
      // callBack("");
    }
  }, [params, sortBy]);

  const handleClearFilter = () => {
    dispatch(removeAllGameFilter());
    dispatch(removeAllFilterBy());
    dispatch(removeIcebreakerFavoriteFilter());
  };

  const handleSaveFilter = () => {
    gameFilter.length &&
      gameFilter.map((item) => tempFilter.push(parseInt(item.id)));
    filterBy.length &&
      filterBy.map((item) => tempFilterBy.push(parseInt(item)));
  };

  const handleApplyGameFilter = () => {
    handleSaveFilter();
    setIsButtonLoad(true);

    if (filterId) {
      if (!tempFilter.includes[parseInt(filterId)]) {
        tempFilter.push(parseInt(filterId));
      }
    }

    tempFilterBy =
      tempFilterBy.includes(1) && tempFilterBy.includes(2) ? [] : tempFilterBy;
    dispatchCall({
      sort: sortBy,
      sort_order: sortBy === 6 ? "ASC" : "DESC",
      page_record: 20,
      page_no: 1,
      filter_id: tempFilter,
      generated_game_id: [],
      filter_by: tempFilterBy,
      search: search,
    });
    // callBack("");
    setTimeout(() => {
      setIsButtonLoad(false);
    }, 1000);
  };

  const handleApplyIceBreackerFilter = (e) => {
    handleSaveFilter();
    setIsButtonLoad(true);
    dispatchCall(
      {
        filter_id: tempFilter,
        is_favourite: favoriteFilter,
        generated_icebreaker_id: [],
      },
      true
    );
    setTimeout(() => {
      setIsButtonLoad(false);
    }, 1000);
  };

  useEffect(() => {
    dispatch(removeAllGameFilter());
    dispatch(fetchFilter({ filter_type: type === "IceBreaker" ? 2 : 1 }));
  }, [dispatch, type]);

  useEffect(() => {
    if (filters.token) {
      setCustomFilter(filters.custom_filters);
      setOtherFilter(filters.others_filter);
      setPopularFilter(filters.popular_filters);
      setIsLoad(false);
    }
  }, [filters]);

  return isLoad ? (
    <LeftPreloader />
  ) : (
    <form action="" className="desktop-view-filter">
      <div className="games-filter">
        {type === "IceBreaker" && (
          <React.Fragment>
            {location !== "add" && <PopularIceBreaker />}
            {popularFilter.length > 0 && location !== "add" && (
              <Popular filter={popularFilter} />
            )}
            {(customFilter.length > 0 || location === "add") && (
              <Custom filter={customFilter} filter_type={type} />
            )}
            {otherFilter.length > 0 && (
              <AllOther filter={otherFilter} label="Icebreaker Filter" />
            )}
          </React.Fragment>
        )}

        {type === "game" && (
          <React.Fragment>
            {location !== "add" && <SortBy />}
            {location !== "add" && <FilterBy />}
            {popularFilter.length > 0 && <Popular filter={popularFilter} />}
            {(customFilter.length > 0 || location === "add") && (
              <Custom filter={customFilter} filter_type={type} />
            )}
            {otherFilter.length > 0 && (
              <AllOther filter={otherFilter} label="Game Filter" />
            )}
          </React.Fragment>
        )}

        {location === "editFilter" ? (
          <div className="filter-btn ">
            <button
              className="btn button-sm button button-primary ml-1"
              onClick={handleSaveFilter}
              type="button"
              style={{ width: "96%" }}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        ) : (
          <div className="cust-btn-flex justify-content-center mt20 filter-sticky">
            <div className="w100">
              <button
                className="btn-dull gameInfo  cust-padd-btn "
                type="button"
                onClick={handleClearFilter}
                style={{ width: "97%" }}
              >
                Clear
              </button>
            </div>
            <div className={location === "add" ? "d-none w100" : "w100"}>
              <button
                className={
                  location === "add"
                    ? "btn-primary  cust-padd-btn d-none"
                    : "btn-primary ml-1  cust-padd-btn"
                }
                onClick={
                  isButtonLoad
                    ? () => {}
                    : type === "game"
                    ? handleApplyGameFilter
                    : handleApplyIceBreackerFilter
                }
                type="button"
                style={{ width: "97%" }}
              >
                {" "}
                {isButtonLoad ? "APPLYING..." : "APPLY"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default LeftSideBar;
