import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIcebreakerFavoriteFilter,
  removeIcebreakerFavoriteFilter,
} from "store/actions";

const PopularIceBreaker = () => {
  const dispatch = useDispatch();
  const { favoriteFilter } = useSelector((state) => state.Dashboard);

  function selData(e) {
    e.target.checked === true
      ? dispatch(setIcebreakerFavoriteFilter())
      : dispatch(removeIcebreakerFavoriteFilter());
  }

  return (
    <div className="filter-area">
      <h6 className="filter-by-title">Popular</h6>
      <label className="c-flex mt10">
        <input
          hidden
          type="checkbox"
          value={favoriteFilter}
          onChange={selData}
          checked={favoriteFilter ? "checked" : ""}
        />
        <span
          className={
            favoriteFilter
              ? "checked search-list pointer active "
              : "search-list pointer"
          }
          onChange={selData}
        >
          Favorites
        </span>
      </label>
    </div>
  );
};

export default PopularIceBreaker;
