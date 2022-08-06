import React, { useState, useEffect } from "react";
import LeftSideBar from "modules/Dashboard/components/LeftSideBar";
import EditWhiteSvg from "assets/img/edit_white.svg";
import DeleteSvg from "assets/img/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { createIceBreaker, removeGameFilter } from "store/actions";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  fetchSingleIceBreaker,
  fetchIceBreakerList,
  setGameFilter,
  removeAllGameFilter,
  removeIcebreakerFavoriteFilter,
} from "store/actions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { isEmptyArray } from "formik";
import PlaceHolderIce from "./PlaceHolderIce";
import debounce from "lodash.debounce";
import close from "assets/img/close.svg";
import "../../assets/css/style.css";

function CreateIceBreaker() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { singleIceBreaker } = useSelector((state) => state.IceBreaker);
  const [iceBreakerNumber, setIceBreakerNumber] = useState(0);
  const [isLoad, setIsLoad] = useState(true);
  const { gameFilter } = useSelector((state) => state.Dashboard);
  const params = useParams();
  const iceBreakerID = params.id;
  const [iceBreakerTextArea, SetIceBreakerTextArea] = useState("");
  if (iceBreakerID !== undefined) {
  }

  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, []);

  useEffect(() => {
    if (iceBreakerID !== undefined) {
      dispatch(fetchSingleIceBreaker({ icebreaker_id: iceBreakerID }));
      dispatch(fetchIceBreakerList({}));
    }
  }, [iceBreakerID]);
  useEffect(() => {
    dispatch(removeAllGameFilter());
    dispatch(removeIcebreakerFavoriteFilter());
    if (singleIceBreaker?.icebreaker_id === +iceBreakerID) {
      singleIceBreaker?.filters.map((filter) => {
        dispatch(
          setGameFilter({
            id: +filter.filter_id,
            name: filter.filters_name,
            gi_filter_id: filter.gi_filter_id,
          })
        );
        return null;
      });
      SetIceBreakerTextArea(singleIceBreaker.icebreaker_title);
    }
  }, [iceBreakerID, singleIceBreaker]);
  const [IceBreakerList, SetIceBreakerList] = useState([]);
  const SubmitForm = (e) => {
    let ice = {};
    if (iceBreakerTextArea.length > 0 && gameFilter.length > 0) {
      if (iceBreakerMode === "add") {
        dispatch(removeAllGameFilter());
        let filers = gameFilter.map((i) => ({
          filter_id: i.id,
          gi_filter_id: 0,
          name: i.name,
        }));
        SetIceBreakerList((prev) => [
          ...prev,
          {
            icebreaker_id: 0,
            icebreaker_title: iceBreakerTextArea,
            filters: filers,
          },
        ]);
        let tempFilers = gameFilter.map((i) => ({
          filter_id: i.id,
          gi_filter_id: 0,
        }));
        ice = {
          icebreaker_id: 0,
          icebreaker_title: iceBreakerTextArea,
          filters: tempFilers,
        };
        let tempResList = IceBreakerList;
        tempResList.map((temp) => {
          temp.push({ icebreaker_id: 0 });
          temp.filters.map((filter) => {
            delete filter.name;
            return null;
          });
          return null;
        });
        setIceBreakerNumber((prevState) => prevState + 1);
        SetIceBreakerTextArea("");
        let res = { ice_breaker: tempResList };

        ice && res.ice_breaker.push(ice);
        if (!isEmptyArray(res.ice_breaker)) {
          dispatch(createIceBreaker(res));
          history.push("/accounts/myIcebreakers");
        } else {
          toast.error("Please add atleast one Icebreaker");
        }
      }
    } else {
      if (isEmptyArray(IceBreakerList)) {
        iceBreakerTextArea.length === 0 &&
          toast.error("Please enter icebreaker title");
        gameFilter.length === 0 && toast.error("You need a filter to continue");
      } else {
        let res = { ice_breaker: IceBreakerList };
        let tempResList = IceBreakerList;
        tempResList.map((temp) => {
          temp.icebreaker_id = 0;
          temp.filters.map((filter) => {
            delete filter.name;
            return null;
          });
          return temp;
        });
        dispatch(createIceBreaker(res));
        history.push("/accounts/myIcebreakers");
      }
    }
  };
  const [iceBreakerMode, setIceBreakerMode] = useState("add");
  const editIceBreaker = (e) => {
    if (iceBreakerTextArea.trim().length > 0 && gameFilter.length > 0) {
      let filers = gameFilter.map((i) => ({
        filter_id: +i.id,
        gi_filter_id: i.gi_filter_id ? i.gi_filter_id : 0,
      }));
      let req = {
        ice_breaker: [
          {
            icebreaker_id: parseInt(iceBreakerID),
            icebreaker_title: iceBreakerTextArea,
            is_system: IceBreakerList.is_system,
            filters: filers,
          },
        ],
      };
      dispatch(createIceBreaker(req));
      // history.push("/accounts/myIcebreakers");

      history.goBack();
    } else {
      iceBreakerTextArea.trim().length === 0 &&
        toast.error("Please enter icebreaker title");
      gameFilter.length === 0 && toast.error("You need a filter to continue");
    }
  };
  const removeFilter = (filter) => {
    dispatch(removeGameFilter(filter.id));
  };
  const addIceBreaker = (e) => {
    if (iceBreakerTextArea.length > 0 && gameFilter.length > 0) {
      if (iceBreakerMode === "add") {
        dispatch(removeAllGameFilter());
        let filers = gameFilter.map((i) => ({
          filter_id: i.id,
          gi_filter_id: 0,
          name: i.name,
        }));
        SetIceBreakerList((prev) => [
          ...prev,
          {
            icebreaker_title: iceBreakerTextArea,
            filters: filers,
          },
        ]);
        setIceBreakerNumber((prevState) => prevState + 1);
        SetIceBreakerTextArea("");
      } else if (iceBreakerMode === "edit") {
        dispatch(removeAllGameFilter());
        let newIceBreakerList = IceBreakerList;
        let filers = gameFilter.map((i) => ({
          filter_id: i.id,
          gi_filter_id: 0,
          name: i.name,
        }));
        newIceBreakerList[iceBreakerNumber].icebreaker_title =
          iceBreakerTextArea;
        newIceBreakerList[iceBreakerNumber].filters = filers;
        SetIceBreakerList(newIceBreakerList);
        SetIceBreakerTextArea("");
        setIceBreakerMode("add");
        setIceBreakerNumber(IceBreakerList.length);
      }
    } else {
      iceBreakerTextArea.length === 0 &&
        toast.error("Please enter icebreaker title");
      gameFilter.length === 0 && toast.error("You need a filter to continue");
    }
  };
  const handleChange = (e) => {
    SetIceBreakerTextArea(e.target.value);
  };
  const handleEditIceBreaker = (index) => {
    SetIceBreakerTextArea(IceBreakerList[index].icebreaker_title);
    setIceBreakerNumber(index);
    IceBreakerList[index]?.filters.map((filter) => {
      dispatch(
        setGameFilter({
          id: +filter.filter_id,
          name: filter.name,
          gi_filter_id: filter.gi_filter_id,
        })
      );
      return null;
    });
    setIceBreakerMode("edit");
  };
  const handleDeleteIceBreaker = (icebreaker_title) => {
    let newIceBreakerList = IceBreakerList;
    newIceBreakerList = newIceBreakerList?.filter(
      (item) => item.icebreaker_title !== icebreaker_title
    );
    SetIceBreakerList((prevState) => newIceBreakerList);
    setIceBreakerNumber(IceBreakerList?.length - 1);

    dispatch(removeAllGameFilter());
    SetIceBreakerTextArea("");
  };
  return (
    <section className="pb60">
      <ToastContainer />
      <div className="container-fluid c-plr100">
        <div className="cust-flex pt30">
          <div className="left-side-dashboard">
            <LeftSideBar type="IceBreaker" location="add" searchbar={false} />
          </div>
          <div className="right-side-dashboard">
            {isLoad ? (
              // <PlaceHolder />
              <PlaceHolderIce />
            ) : (
              <>
                <div className="search-area-right-dashboard">
                  <h6>
                    {iceBreakerID !== undefined || iceBreakerMode === "edit"
                      ? "Edit Icebreaker"
                      : "Create Icebreaker"}
                    {/* {iceBreakerMode === "edit"
                      ? "Edit Icebreaker"
                      : "Create Icebreaker"}*/}
                  </h6>
                </div>
                <div className="game-main-card">
                  <div className="c-label">
                    <ol style={{ marginLeft: "-4%" }}>
                      {IceBreakerList?.map((item, index) => {
                        return (
                          <li key={index} className="fav-icebreaker-que-item">
                            <h6>
                              {index + 1}
                              {". " + item.icebreaker_title}
                              <div className="item-space">
                                {iceBreakerMode === "add" && (
                                  <img
                                    src={EditWhiteSvg}
                                    onClick={() => handleEditIceBreaker(index)}
                                    alt="edit"
                                    className="pointer"
                                  />
                                )}

                                {iceBreakerMode === "add" ? (
                                  <img
                                    src={DeleteSvg}
                                    alt="delete"
                                    onClick={() =>
                                      handleDeleteIceBreaker(
                                        item.icebreaker_title
                                      )
                                    }
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    className="pointer ml10"
                                  />
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </h6>

                            <div className="c-flex">
                              {item?.filters?.map((filter, index) => {
                                return (
                                  <Link
                                    to={"#"}
                                    key={"filter" + index}
                                    className="search-list2"
                                  >
                                    {filter.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  <div className="c-label">
                    <div>
                      <h6>Filters:</h6>
                      {gameFilter.length === 0 ? (
                        <p className="c-label select-filter">
                          Please set atleast 1 filter.
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="c-flex mt10 c-search-filter">
                      {gameFilter.length
                        ? gameFilter.map((item, index) => {
                            return (
                              <div
                                key={"game-filter" + item.id}
                                className="btn-primary mb-2 fw600"
                              >
                                {item.name}
                                <img
                                  alt="close"
                                  src={close}
                                  data-filter-id={item.id}
                                  onClick={() => {
                                    removeFilter(item);
                                  }}
                                  className="c-icebreaker-filter-close pointer"
                                ></img>
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <div className="c-label">
                    <h6>Title</h6>
                  </div>
                  <div className="form-group">
                    <textarea
                      onChange={handleChange}
                      value={iceBreakerTextArea}
                      className="form-control c-textarea"
                      id="validationTextarea"
                      placeholder="Enter Icebreaker here"
                    ></textarea>
                  </div>
                  <div className="cust-btn-flex mprl0 mt20">
                    {iceBreakerID !== undefined ? (
                      <button
                        onClick={editIceBreaker}
                        className="btn-primary add-area-btn"
                      >
                        Done
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={SubmitForm}
                          className="btn-primary cust-padd-btn mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={addIceBreaker}
                          className="btn-dull gameInfo cust-padd-btn"
                        >
                          {iceBreakerMode === "add" ? "Add More" : "Done"}
                        </button>
                      </>
                    )}
                  </div>

                  <div className="create-btn desktop-view mt-4">
                    {iceBreakerID !== undefined ? null : (
                      <button
                        type="submit"
                        onClick={SubmitForm}
                        className="d-none create-done-btn btn-primary"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default CreateIceBreaker;
