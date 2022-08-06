import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameFilter, removeGameFilter } from "store/actions";

const Popular = ({ filter }) => {
  const dispatch = useDispatch();
  const { gameFilter } = useSelector((state) => state.Dashboard);
  const [filters, setFilters] = useState([]);

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

  return (
    <div className="filter-area">
      <h6 className="filter-by-title">Popular</h6>
      <div className="c-flex mt10">
        {filters !== undefined &&
          filters.map((item, index) => {
            return (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: item.name }}
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
          })}
      </div>
    </div>
  );
};

export default Popular;
