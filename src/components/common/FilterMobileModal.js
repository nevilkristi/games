import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import {
  setGameFilter,
  fetchFilter,
  removeAllGameFilter,
  removeAllFilterBy,
  fetchIceBreaker,
  fetchFilteredGame,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import Popular from "components/sideBar/Popular";
import Custom from "components/sideBar/Custom";
import AllOther from "components/sideBar/AllOther";
import closePopup from "assets/img/close_popup.svg";

function FilterMobileModal({ show, onClose, filter, type = "game", game_id }) {
  let tempFilter = [],
    tempFilterBy = [];
  const dispatch = useDispatch();
  const { filters, gameFilter, filterBy, sortBy } = useSelector(
    (state) => state.Dashboard
  );
  const [customFilters, setCustomFilters] = useState([]);
  const [othersFilter, setOthersFilter] = useState([]);
  const [popularFilters, setPopularFilters] = useState([]);
  const dispatchCall = (payload, is_type = false) => {
    dispatch((is_type ? fetchIceBreaker : fetchFilteredGame)(payload, true));
  };

  useEffect(() => {
    setCustomFilters(filters.custom_filters);
    setOthersFilter(filters.others_filter);
    setPopularFilters(filters.popular_filters);

    filter?.map((item, index) =>
      dispatch(
        setGameFilter({
          id: item.filter_id,
          name: item.name,
          gi_filter_id: item.gi_filter_id,
        })
      )
    );
  }, [filters, dispatch, filter]);
  const { loadingIceBreaker } = useSelector((state) => state.IceBreaker);

  const handleSaveFilter = () => {
    gameFilter.length &&
      gameFilter.map((item) => tempFilter.push(parseInt(item.id)));
    filterBy.length &&
      filterBy.map((item) => tempFilterBy.push(parseInt(item)));
  };

  const handleApplyGameFilter = () => {
    handleSaveFilter();
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
      search: "",
    });
    onClose();
  };

  const handleApplyIceBreackerFilter = () => {
    handleSaveFilter();
    dispatchCall(
      {
        filter_id: tempFilter,
        is_favourite: 0,
        generated_icebreaker_id: [],
      },
      true
    );
  };

  const handleClearFilter = () => {
    dispatch(removeAllGameFilter());
    dispatch(removeAllFilterBy());
  };

  useEffect(() => {
    dispatch(fetchFilter({ filter_type: 1 }));
  }, [dispatch]);

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="editGameFilter"
      className="modal-dialog modal-dialog-centered modal-md"
    >
      <div className="close-btn">
        <button
          type="button"
          onClick={onClose}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <img src={closePopup} onClick={onClose} alt="" />
          </span>
        </button>
      </div>
      <div className="modal-body add-body">
        <div className="filter-modal-name">Filter</div>
        <React.Fragment>
          {popularFilters?.length > 0 && <Popular filter={popularFilters} />}
          {customFilters?.length > 0 && (
            <Custom filter={customFilters} filter_type={"game"} />
          )}
          {othersFilter?.length > 0 && <AllOther filter={othersFilter} />}
        </React.Fragment>
        <div className="filter-btn">
          <button
            className="btn outline-clear-btn button-sm button mr-1"
            type="button"
            onClick={handleClearFilter}
          >
            Clear
          </button>
          <button
            className={"btn apply-btn button-sm button button-primary ml-1"}
            onClick={
              type === "game"
                ? handleApplyGameFilter
                : handleApplyIceBreackerFilter
            }
            type="button"
          >
            {loadingIceBreaker ? "Loading..." : "Apply"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FilterMobileModal;
