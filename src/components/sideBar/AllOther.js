import { isEmptyArray } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameFilter, removeGameFilter } from "store/actions";

function AllOther({ filter, label }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const { gameFilter } = useSelector((state) => state.Dashboard);

  useEffect(() => {
    setFilters(filter);
  }, [filter, gameFilter]);

  function selData(checked, value) {
    checked === true
      ? dispatch(
          setGameFilter({
            id: parseInt(value.filter_id),
            name: value.name,
          })
        )
      : dispatch(removeGameFilter(value.filter_id));
  }
  const handleSearchFilter = (e) => {
    setFilters(
      filter.filter((item) => {
        if (item.name.toUpperCase().includes(e.target.value.toUpperCase())) {
          return item.name;
        } else {
          return null;
        }
      })
    );
  };
  return (
    <div className="filter-area">
      <h6 className="filter-by-title">All Others</h6>
      <div className="search mb-3 position-relative">
        <span className="search-main">
          <input
            className="form-control c-search"
            type="search"
            placeholder={label}
            aria-label="Search"
            style={{ color: "#000" }}
            onChange={handleSearchFilter}
          />
        </span>
      </div>
      <div className="c-flex mt10 c-search-filter">
        
        {filters !== undefined && isEmptyArray(filters) ? (
          <span
            dangerouslySetInnerHTML={{ __html: "No Filter Found" }}
            className={"search-list pointer"}
          ></span>
        ) : (
          filters.map((item, index) => {
            gameFilter.map((v) => v.id).includes(parseInt(item.filter_id));
            return (
              <span
                dangerouslySetInnerHTML={{ __html: item.name }}
                key={item.filter_id}
                className={
                  gameFilter.map((v) => v.id).includes(parseInt(item.filter_id))
                    ? "search-list pointer active"
                    : "search-list pointer"
                }
                onClick={() =>
                  selData(
                    gameFilter
                      .map((v) => v.id)
                      .includes(parseInt(item.filter_id))
                      ? false
                      : true,
                    item
                  )
                }
              ></span>
            );
          })
        )}
      </div>
    </div>
  );
}
export default AllOther;
