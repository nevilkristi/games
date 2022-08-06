import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilter } from "store/actions";
import DeleteModalFilter from "./DeleteModalFilter";
import AddCustomFilter from "components/sideBar/AddCustomFilter";
import RowPreloader from "components/preloders/row-preloader";
import NoDataFound from "components/common/NoDataFound";
import { UncontrolledTooltip } from "reactstrap";
const MyFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.Dashboard);
  const [tab, setTab] = useState(1);
  const [isLoad, setIsLoad] = useState(true);
  const [customFilter, setCustomFilter] = useState([]);

  useEffect(() => {
    setCustomFilter(filters.custom_filters);
    setTimeout(() => {
      setIsLoad(false);
    }, 500);
  }, [filters, tab]);

  const changeTab = (v) => {
    setTab(v);
    setIsLoad(true);

    setDeleteFilterModal((prevState) => ({
      ...prevState,
      filterType: v,
    }));
  };

  const [deleteFilterModal, setDeleteFilterModal] = useState({
    show: false,
    data: null,
    id: 0,
    filterType: tab,
  });
  const [addCustomModal, setAddCustomModal] = useState({
    show: false,
    data: null,
    id: 0,
    mode: "edit",
  });

  const handleFilterClose = () => {
    setDeleteFilterModal((prevState) => ({
      ...prevState,
      show: false,
    }));
    setAddCustomModal((prevState) => ({
      ...prevState,
      show: false,
      filter_id: 0,
    }));
  };

  useEffect(() => {
    dispatch(
      fetchFilter({
        filter_type: tab,
      })
    );
  }, [dispatch, tab]);

  const buttons = ["Games", "Icebreakers"];
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-myfilters"
        role="tabpanel"
        aria-labelledby="v-pills-myfilters-tab"
      >
        <div className="tab-right-mylist">
          <h6>My Filters</h6>
        </div>
        <div className="myfiltersTab mt20">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {buttons.map((v, i) => {
              return (
                <li className="nav-item cursor-pointer" key={i}>
                  <button
                    className={`nav-link ${tab === i + 1 ? "active" : ""}`}
                    id="myfilters-games-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="myfilters-games"
                    aria-selected="true"
                    onClick={() => changeTab(i + 1)}
                    key={i}
                  >
                    {v}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="myfilters-icebreakers"
              role="tabpanel"
              aria-labelledby="myfilters-icebreakers-tab"
            >
              <div className="tab-right-mylist-main2 mt20">
                <div className="left-main-icebreakers-tab">
                  <h6>Custom Filters</h6>
                </div>
                <div className="right-main-icebreakers-tab">
                  <button
                    className="btn-primary cursor-pointer"
                    data-toggle="modal"
                    data-target="#c-add-filters"
                    onClick={() => {
                      setAddCustomModal((prevState) => ({
                        ...prevState,
                        show: true,
                        filter_type: +tab,
                        id: 0,
                        filter_name: "",
                        mode: "add",
                      }));
                    }}
                  >
                    ADD
                  </button>
                </div>
              </div>
              {isLoad ? (
                <div className="mt20">
                  <RowPreloader loop={2} height={"35px"} />
                </div>
              ) : (
                <>
                  {customFilter?.length > 0 ? (
                    <div className="tab-main-mylist mt20">
                      {customFilter?.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="tab-right-mylist-mainn">
                              <div className="left-main-icebreakers-tab">
                                <h6>{item.name}</h6>
                              </div>
                              <div className="right-main-icebreakers-tab">
                                <div
                                  className="pencil-btn-2 cursor-pointer"
                                  data-toggle="modal"
                                  data-target="#c-edit-filters"
                                  onClick={() => {
                                    setAddCustomModal((prevState) => ({
                                      ...prevState,
                                      show: true,
                                      id: item.filter_id,
                                      filter_type: +tab,
                                      filter_name: item.name,
                                      mode: "edit",
                                    }));
                                  }}
                                  id={`filterEdit_${item.filter_id}`}
                                ></div>
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target={`filterEdit_${item.filter_id}`}
                                >
                                  <div className="tooltip-subtext">
                                    Edit Filter
                                  </div>
                                </UncontrolledTooltip>
                                <div
                                  className="trash-btn-2 cursor-pointer"
                                  data-toggle="modal"
                                  data-target="#delete-filters"
                                  onClick={() => {
                                    setDeleteFilterModal((prevState) => ({
                                      ...prevState,
                                      show: true,
                                      id: item.filter_id,
                                      filter_type: +tab,
                                    }));
                                  }}
                                  id={`filterDelete_${item.filter_id}`}
                                ></div>
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target={`filterDelete_${item.filter_id}`}
                                >
                                  <div className="tooltip-subtext">
                                    Delete Filter
                                  </div>
                                </UncontrolledTooltip>
                              </div>
                            </div>
                            <hr className="rem-margin" />
                          </>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={`${!isLoad ? "pt-5  text-align-center" : ""}`}
                    >
                      {isLoad ? (
                        <RowPreloader loop={2} />
                      ) : (
                        <div>
                          <NoDataFound />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {addCustomModal.show && (
        <AddCustomFilter {...addCustomModal} onClose={handleFilterClose} />
      )}
      <DeleteModalFilter {...deleteFilterModal} onClose={handleFilterClose} />
    </>
  );
};

export default MyFilter;
