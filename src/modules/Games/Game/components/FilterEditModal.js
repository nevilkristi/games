/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import {
  setGameFilter,
  fetchFilter,
  fetchAssignedFilter,
  removeAllGameFilter,
  editAssignFilter,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import Popular from "components/sideBar/Popular";
import Custom from "components/sideBar/Custom";
import AllOther from "components/sideBar/AllOther";
import closePopup from "assets/img/close.svg";
import { ToastContainer, toast } from "react-toastify";

function FilterEditModal({ show, onClose, filter, is_user, game_id }) {
  const dispatch = useDispatch();
  const { filters, gameFilter } = useSelector((state) => state.Dashboard);
  const [customFilters, setCustomFilters] = useState([]);
  const [othersFilter, setOthersFilter] = useState([]);
  const [popularFilters, setPopularFilters] = useState([]);

  useEffect(() => {
    setCustomFilters(filters.custom_filters);
    setOthersFilter(filters.others_filter);
    setPopularFilters(filters.popular_filters);

    dispatch(removeAllGameFilter());
    filter?.map((item, index) =>
      dispatch(
        setGameFilter({
          id: item.filter_id,
          name: item.name,
          gi_filter_id: item.gi_filter_id,
        })
      )
    );
  }, [filters]);

  const handleSaveAssignFilter = () => {
    let filers = gameFilter.map((i) => ({
      filter_id: +i.id,
      gi_filter_id: i.gi_filter_id ? i.gi_filter_id : 0,
      filter_type: 1,
    }));
    let req = {
      game_id: game_id,
      filters: filers,
    };

    if (is_user && filers.length > 0) {
      toast.success("Filters updated successfully");

      onClose();
      dispatch(editAssignFilter(req));
    } else {
      toast.error("Please select atleast one filter");
    }
  };

  useEffect(() => {
    is_user
      ? dispatch(fetchFilter({ filter_type: 1 }))
      : dispatch(fetchAssignedFilter({ game_id: game_id }));
  }, [dispatch, is_user]);

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="editGameFilter"
      className="modal-dialog modal-dialog-centered "
    >
      <ToastContainer />
      <div className="modal-header justify-content-end">
        <button
          type="button"
          onClick={onClose}
          className="close-img"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <img src={closePopup} onClick={onClose} alt="" />
          </span>
        </button>
      </div>
      <div className="modal-body ">
        <div className="filter-modal-name text-center">Assign Filter</div>
        <React.Fragment>
          {popularFilters?.length > 0 && <Popular filter={popularFilters} />}
          {customFilters?.length > 0 && (
            <Custom filter={customFilters} filter_type={"game"} />
          )}
          {othersFilter?.length > 0 && <AllOther filter={othersFilter} />}
        </React.Fragment>
        <button
          className="button-primary add-pop-btn mt-3"
          onClick={handleSaveAssignFilter}
          type="button"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default FilterEditModal;
