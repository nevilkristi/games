import React, { useEffect, useState } from "react";
import deleteWhiteSvg from "assets/img/delete_white.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStore,
  fetchToolList,
  fetchToolOptions,
  getSystemConfiguration,
  saveToolList,
} from "store/actions";
import DeleteWheelModal from "./DeleteWheelModal";
import DeleteWheelOptionModal from "./DeleteWheelOptionModal";
import WheelLoadModal from "./WheelLoadModal";
import SaveWheelListModal from "./SaveWheelListModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SpinWheel from "components/wheel/wheel";
import WheelPreloader from "./component/WheelPreloader";
import PageHeader from "components/pageheader/PageHeader";
import { UncontrolledTooltip } from "reactstrap";
const Wheel = () => {
  const { tools, toolOptions, toolName, colorList } = useSelector(
    (state) => state.Tool
  );
  const dispatch = useDispatch();
  const [wheel, setWheel] = useState([]);
  const [input, setInput] = useState({
    tool_option_id: 0,
    option_name: "",
  });
  const [segments, setSegments] = useState([]);
  const [wheelShow, setWheelShow] = useState(false);
  const [projectorOn, setProjectorOn] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [newWheel, setNewWheel] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [onSave, setOnSave] = useState("");
  const [loadButton, setLoadButton] = useState(true);
  const [removeOption, setRemoveOption] = useState({
    show: false,
    tool_option_id: 0,
  });
  const [removeWheel, setRemoveWheel] = useState({
    show: false,
    tool_list_id: 0,
  });
  const [loadWheel, setLoadWheel] = useState({
    show: false,
    data: "",
  });
  const [saveWheel, setSaveWheel] = useState({
    show: false,
    tool_list_id: 300,
    list_name: "",
    tool_type: 0,
    total_response: 0,
    option: [],
  });
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(colorList);
  }, [colorList]);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    dispatch(clearStore());
    dispatch(
      getSystemConfiguration({ site_id: 4, data_for: "mobile_application" })
    );
    dispatch(
      fetchToolList({
        tool_type: 3,
      })
    );
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [dispatch]);
  useEffect(() => {
    if (!loadWheel.show) {
      if (tools[0]) {
        setIsLoad(true);
        dispatch(
          fetchToolOptions(
            {
              tool_list_id: tools[0]?.tool_list_id,
            },
            () => {
              setIsLoad(false);
            }
          )
        );
      }
    }
  }, [tools, dispatch]);
  const handleNewWheel = (id) => {
    setSegments([]);
    // setIsLoad(true);
    dispatch(
      fetchToolOptions(
        {
          tool_list_id: +id,
        }
        // () => {
        //   setIsLoad(false);
        // }
      )
    );
    if (id === 0) {
      setSegments([]);
      setLoadButton(false);
      setIsLoad(false);
    }
    let temp_Wheel_Tool = tools.filter((tool) => tool.tool_list_id === +id);
    setNewWheel(temp_Wheel_Tool);
  };
  useEffect(() => {
    if (tools || toolName) {
      if (!loadWheel.show) {
        setNewWheel(tools);
        if (newWheel[0]) {
          dispatch(
            fetchToolOptions({
              tool_list_id: Object.keys(toolName).length
                ? toolName.tool_list_id
                : tools[0]?.tool_list_id,
            })
          );
          setTimeout(() => {
            setIsLoad(false);
          }, 1000);
        } else {
          setWheel([]);
        }
      }
    }
  }, [tools, dispatch]);
  useEffect(() => {
    let newToolOptionNameTempArray = toolOptions;
    newToolOptionNameTempArray?.map((item, index) => {
      item.tool_temp_option_id = index;
      return item;
    });
    setWheel(toolOptions);
  }, [toolOptions]);
  // useEffect(() => {
  //   if (newWheel.length < 0 || wheel.length < 0) {
  //     setIsLoad(false);
  //   }
  // }, [newWheel, wheel, dispatch]);
  const handdleSegments = (e) => {
    e.preventDefault();
    if (wheel.length < 20) {
      if (+input.option_name !== 0) {
        setSegments((prev) => [
          ...prev,
          {
            ...input,
            tool_option_id: 0,
            // tool_temp_option_id: toolOptions.length + 1,
          },
        ]);
        setInput({
          option_name: "",
          // tool_temp_option_id: toolOptions.length + 1,
        });
        wheel.unshift(input);
      } else {
        toast.error("Please enter option");
      }
    } else {
      toast.error("Wheel option limit reached.");
    }
  };

  const handleSavewheel = () => {
    // setIsSave(true);
    if (Object.keys(toolName).length !== 0 || newWheel[0]) {
      let temToolOptions = wheel;
      temToolOptions = temToolOptions.map((item) => {
        delete item.tool_temp_option_id;
        if (!item.tool_option_id) {
          item.tool_option_id = 0;
        }
        return item;
      });
      if (Object.keys(toolName).length) {
        temToolOptions.forEach((newTemparr) => {
          toolName.option.forEach((option) => {
            if (newTemparr.option_name === option.option_name) {
              newTemparr.tool_option_id = option.tool_option_id;
            }
          });
        });
      }

      dispatch(
        saveToolList(
          {
            tool_list_id: Object.keys(toolName).length
              ? toolName.tool_list_id
              : newWheel[0].tool_list_id,
            list_name: Object.keys(toolName).length
              ? toolName.list_name
              : newWheel[0].list_name,
            tool_type: 3,
            option: temToolOptions,
          },
          () => {
            setWheelShow(true);
            dispatch(
              fetchToolOptions({
                tool_list_id: Object.keys(toolName).length
                  ? toolName.tool_list_id
                  : newWheel[0].tool_list_id,
              })
            );
          }
        )
      );
      setSaveWheel({
        show: false,
        data: segments,
      });
    } else {
      setLoadButton(false);
      setSaveWheel({
        show: true,
        data: segments,
      });
    }
  };
  const handelDelete = (e) => {
    setWheel(wheel?.filter((item) => item.tool_temp_option_id !== e));
    setRemoveOption((prev) => ({
      ...prev,
      show: false,
    }));
  };
  const handleNameChange = (value) => {
    setSaveName(value);
  };
  const handleDeleteWheel = () => {
    setRemoveWheel((prev) => ({
      ...prev,
      show: false,
    }));
  };
  const onCloseModals = () => {
    setSaveWheel({
      ...saveWheel,
      show: false,
      data: "",
    });
    setLoadWheel({
      show: false,
    });
  };
  const spinWheel = () => {
    if (wheel.length >= 2) {
      handleSavewheel();
      // setWheelShow(true);
    } else {
      toast.error("Please add atleast two options.");
    }
  };
  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
    projectorOn &&
      window.open(
        `${process.env.REACT_APP_REDIRECT_URL}/tool/wheel1`,
        "",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=600,height=720"
      );
  };
  useEffect(() => {
    if (wheel.length > 0) {
      let x = wheel.map((v, i) => ({
        color: colors[i >= 15 ? i - 14 : i]?.color_code,
        label: v.option_name,
      }));
      setSectors(x);
    }
  }, [wheel, colors]);
  const onCloseSave = (onCloseSave) => {
    setIsSave(onCloseSave);
  };
  const handleOnSave = (handleOnSave) => {
    setOnSave(handleOnSave);
  };
  const loadListButton = (loadListButton) => {
    setLoadButton(loadListButton);
  };
  const handleSpinWheel = (spinWheel) => {
    setWheelShow(spinWheel);
  };

  return (
    <React.Fragment>
      {!wheelShow && (
        <div>
          {isLoad ? (
            <WheelPreloader />
          ) : (
            <>
              <div className="desktop-view">
                <ToastContainer />
                <div className="">
                  <PageHeader
                    pageName="Wheel"
                    handleFullScreen={() => setShowFullScreen(!showFullScreen)}
                    handleEquivalentScreen={handleEquivalentScreen}
                    showButton={false}
                    icon={true}
                  />
                </div>
              </div>
              <div className="fullscreen-box mt-5 mobile-spacing">
                <div className="random-name white-text">
                  {/* <div className="enter-name-box bg-dark-gray mb-5 p-4">
                    <div className="d-flex input-without-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type option here"
                        value={input.option_name}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            ...{ option_name: e.target.value },
                            ...{ tool_temp_option_id: wheel.length + 1 },
                          })
                        }
                      />
                      <button
                        onClick={handdleSegments}
                        className="btn button-primary ml-3"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                  </div> */}
                  <div className="weel-card polling-card">
                    <form className="weel-option-input">
                      <input
                        type="text"
                        className="form-control option-text"
                        id="optionhere"
                        aria-describedby=""
                        placeholder="Type option here"
                        value={input.option_name}
                        onChange={(e) =>
                          e.target.value.length < 19 &&
                          setInput({
                            ...input,
                            ...{ option_name: e.target.value },
                            ...{ tool_temp_option_id: wheel.length + 1 },
                          })
                        }
                        // onKeyPress={input.option_name.length !==0 && handleKyeyPress }
                      />
                      <button
                        className="btn button-primary add-btn"
                        // onClick={() => handlePolling()}
                        type="submit"
                        onClick={handdleSegments}
                        // onClick={() => handleSubmit(name)}
                      >
                        ADD
                      </button>
                    </form>
                  </div>
                  {wheel.length > 0 && (
                    <div>
                      <div className="add-message answer-message">
                        <div className="answer-message-inner">
                          <h5>
                            {/* {" "}
                            {newWheel[0]?.list_name
                              ? newWheel[0]?.list_name
                              : onSave} */}
                            {Object.keys(toolName).length
                              ? toolName.list_name
                              : newWheel[0]?.list_name}
                          </h5>
                          <img
                            src={deleteWhiteSvg}
                            alt="Delete"
                            className="mr-3 pointer"
                            onClick={() => {
                              setRemoveWheel((prev) => ({
                                ...prev,
                                show: true,
                                tool_list_id: newWheel[0]?.tool_list_id,
                              }));
                            }}
                            id="deleteList"
                          />
                          <UncontrolledTooltip target="deleteList">
                            <div className="tooltip-subtext">Delete Wheel</div>
                          </UncontrolledTooltip>
                        </div>
                        <ul className="mt-3 add-sub-answers">
                          {!!wheel &&
                            wheel.map((item, i) => (
                              <li key={i}>
                                <p className="mb-0" key={item.tool_option_id_}>
                                  {item.option_name}
                                </p>
                                <img
                                  src={deleteWhiteSvg}
                                  className="pointer"
                                  alt="delete_icon"
                                  data-item={item}
                                  onClick={() => {
                                    setRemoveOption((prev) => ({
                                      ...prev,
                                      show: true,
                                      tool_option_id: item.tool_option_id,
                                      tool_temp_option_id:
                                        item.tool_temp_option_id,
                                    }));
                                  }}
                                  id="delete"
                                />
                                <UncontrolledTooltip target="delete">
                                  <div className="tooltip-subtext">
                                    Delete Option
                                  </div>
                                </UncontrolledTooltip>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div className="save-and-cancel">
                        <button
                          type="submit"
                          className="btn btn-primary submit-btn"
                          onClick={spinWheel}
                          style={{ width: "325px" }}
                        >
                          Spin The Wheel
                        </button>
                      </div>
                      <div className="save-and-cancel">
                        {loadButton && (
                          <button
                            type="submit"
                            className="button-gray wheel-btn polling-btn-wheel btn-dull gameInfo cust-padd-bt ml-4"
                            onClick={() => {
                              setLoadWheel((prev) => ({
                                ...prev,
                                show: true,
                              }));
                            }}
                          >
                            {!isSave ? "Load Wheel" : ""}
                          </button>
                        )}
                        {loadWheel.show && (
                          <WheelLoadModal
                            {...loadWheel}
                            onClose={onCloseModals}
                            newWheel={handleNewWheel}
                          />
                        )}
                        {/* <button
                          type="submit"
                          className="btn button-primary wheel-btn polling-btn m-0"
                          onClick={handleSavewheel}
                        >
                          {isSave ? "Saving..." : "Save"}
                        </button> */}
                        {onSave === "" && (
                          <SaveWheelListModal
                            {...saveWheel}
                            onCloseModal={onCloseModals}
                            onClose={handleSavewheel}
                            wheelName={saveName}
                            handleNameChange={handleNameChange}
                            segments={segments}
                            onCloseSave={onCloseSave}
                            onSave={handleOnSave}
                            loadListButton={loadListButton}
                            spinWheel={handleSpinWheel}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <DeleteWheelModal {...removeWheel} onClose={handleDeleteWheel} />
          <DeleteWheelOptionModal {...removeOption} onClose={handelDelete} />
        </div>
      )}
      {wheelShow && (
        <div className="text-align-center">
          <PageHeader
            pageName="Wheel"
            handleFullScreen={() => setShowFullScreen(!showFullScreen)}
            handleEquivalentScreen={handleEquivalentScreen}
            showButton={true}
            showFullScreen={true}
            showFullScreenButton={false}
            handleBack={() => {
              setWheelShow(false);
            }}
          />
          <div
            className="polling-start-card"
            id="WheelSpin"
            style={{ padding: "0% 23%" }}
          >
            {sectors && (
              <SpinWheel segments={sectors} width={500} height={500} />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default Wheel;
