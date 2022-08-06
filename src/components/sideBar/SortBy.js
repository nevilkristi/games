import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setGameSortBy } from "store/actions";

const SortBy = () => {
  const dispatch = useDispatch();
  const [sortby, setSortBy] = useState(1);

  const selData = (value) => {
    setSortBy(+value);
    dispatch(setGameSortBy(+value));
  };

  const arr = [
    { title: "Random", value: 1 },
    { title: "Most Viewed", value: 2 },
    { title: "Most Reviewed", value: 3 },
    { title: "Highest Rated", value: 4 },
    { title: "Newest First", value: 5 },
    { title: "Alphabetical", value: 6 },
  ];

  return (
    <div className="filter-area">
      <h6 className="filter-by-title">Sort By</h6>

      <div className="c-radio-btns">
        {arr.map((v, i) => (
          <p key={i}>
            <input
              type="radio"
              id={`radio` + v.value}
              name="radio-group"
              checked={sortby === v.value}
              onChange={() => selData(v.value)}
            />

            <label htmlFor={`radio` + v.value}> {v.title}</label>
          </p>
        ))}
      </div>

      <div className="hr"></div>
    </div>
  );
};

export default SortBy;
