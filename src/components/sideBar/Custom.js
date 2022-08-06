import React, { useState, useEffect } from "react";
import AddCustomFilter from "components/sideBar/AddCustomFilter";
import { useDispatch, useSelector } from "react-redux";
import { setGameFilter, removeGameFilter } from "store/actions";
import { useLocation } from "react-router-dom";

function Custom({ filter, filter_type }) {
  const location = useLocation();
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

  const [addCustomModal, setAddCustomModal] = useState({
    show: false,
    data: null,
  });

  const handleClose = () => {
    setAddCustomModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  return (
    <div className="filter-area">
      <div className="filter-add d-flex justify-content-between">
        <h6 className="filter-by-title">Custom</h6>

        {(location.pathname.includes("edit") ||
          location.pathname.includes("add")) && (
          <button
            type="button"
            className="add-filter custom btn-primary"
            onClick={() => {
              setAddCustomModal((prevState) => ({
                ...prevState,
                show: true,
              }));
            }}
          >
            {" "}
            Add New{" "}
          </button>
        )}
      </div>
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

      {addCustomModal.show && (
        <AddCustomFilter
          {...addCustomModal}
          filter_type={filter_type === "game" ? 1 : 2}
          onClose={handleClose}
          mode="add"
        />
      )}
    </div>
  );
}

export default Custom;
