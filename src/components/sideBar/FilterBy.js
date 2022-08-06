import { isEmptyArray } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterBy, removeFilterBy } from "store/actions";

function FilterBy() {
  const dispatch = useDispatch();
  const { filterBy } = useSelector((state) => state.Dashboard);
  const [checkedId, setCheckedId] = useState([]);
  function selData(e) {
    if (e.target.checked === true) {
      dispatch(setFilterBy(e.target.value));
      setCheckedId((prevState) => [...prevState, parseInt(e.target.value)]);
    } else {
      dispatch(removeFilterBy(e.target.value));
      setCheckedId((prevState) =>
        prevState.filter((item) => item !== parseInt(e.target.value))
      );
    }
  }

  useEffect(() => {
    filterBy.map((item, index) => {
      setCheckedId((prevState) => [...prevState, parseInt(item)]);
      return null;
    });
    isEmptyArray(filterBy) && setCheckedId([]);
  }, [filterBy]);

  return (
    <div className="filter-area">
      <h6>Filter By</h6>
      <div className="form-group my-1 c-scroll-filter">
        <div className="form-check">
          <input
            className="form-check-input chbox pointer"
            onChange={selData}
            value={1}
            checked={checkedId.includes(1)}
            type="checkbox"
            id="chbox1"
          />
          <label
            className="form-check-label c-label-pos pointer"
            htmlFor="chbox1"
          >
            Played
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input chbox pointer"
            onChange={selData}
            value={2}
            checked={checkedId.includes(2)}
            type="checkbox"
            id="chbox2"
          />
          <label
            className="form-check-label c-label-pos pointer"
            htmlFor="chbox2"
          >
            Unplayed
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input chbox pointer"
            onChange={selData}
            value={3}
            checked={checkedId.includes(3)}
            type="checkbox"
            id="chbox3"
          />
          <label
            className="form-check-label c-label-pos pointer"
            htmlFor="chbox3"
          >
            User Created
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBy;
