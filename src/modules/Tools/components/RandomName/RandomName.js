import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "assets/img/delete_white.svg";
import resetSvg from "../../../../assets/img/tools_reset.svg";
import DeleteNameModel from "./DeleteNameModel";
import DeleteListModel from "./DeleteListModel";
import SaveListModal from "./SaveListModal";
import RandomNameModal from "./RandomNameModal";
import ResetRandomNameModal from "./ResetRandomNameModal";
import { saveToolList, fetchToolList, fetchToolOptions } from "store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fullScreenExitSvg from "assets/img/full-screen-exit.svg";
import NewWindow from "react-new-window";
import RandomNamePreloader from "./RandomNamePreloader";
import "../../../../assets/css/style.css";
import PageHeader from "components/pageheader/PageHeader";
import { UncontrolledTooltip } from "reactstrap";
const RandomName = () => {
  const { tools, toolOptions, toolName } = useSelector((state) => state.Tool);
  const dispatch = useDispatch();
  const [nameList, setNameList] = useState("");
  const [removeName, setDeleteName] = useState({
    show: false,
    tool_option_id: 0,
  });
  const [removeList, setRemoveList] = useState({
    show: false,
    tool_list_id: 0,
  });
  const [isLoad, setIsLoad] = useState(true);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(true);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [projectorOn, setProjectorOn] = useState(false);
  const [active, setActive] = useState("randomName");
  const [randomNameGenerator, setRandomNameGenerator] = useState([]);
  const [randomName, SetRandomName] = useState([]);
  const [newNameList, setNewNameList] = useState([]);
  const [history, setHistory] = useState([]);
  const [double, setDouble] = useState(false);
  const [isName, setIsName] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const [isGenerateName, setIsGenerateName] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [loadButton, setLoadButton] = useState(true);
  const [name, setName] = useState({
    tool_option_id: 0,
    option_name: "",
  });
  const [saveList, setSaveList] = useState({
    show: false,
    tool_list_id: 0,
    list_name: "",
    tool_type: 0,
    total_responses: 0,
    option: [],
  });
  const [randomNameModal, setRandomNameModal] = useState({
    show: false,
    data: "",
  });
  const [resetModal, setResetModal] = useState({
    show: false,
  });
  useEffect(() => {
    dispatch(
      fetchToolList({
        tool_type: 2,
      })
    );
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [dispatch]);
  useEffect(() => {
    if (!randomNameModal.show) {
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
  }, [dispatch, tools]);
  const handleNewList = (id) => {
    setIsLoad(true);
    dispatch(
      fetchToolOptions(
        {
          tool_list_id: +id,
        },
        () => {
          setIsLoad(false);
        }
      )
    );
    if (id === 0) {
      setList([]);
      setIsLoad(false);
      setLoadButton(false);
    }
    let temp_Name_Tool = tools.filter((tool) => tool.tool_list_id === +id);
    setNewNameList(temp_Name_Tool);
  };
  const handleShow = () => {
    setShow(false);
  };
  useEffect(() => {
    if (tools || toolName) {
      if (!randomNameModal.show) {
        setNewNameList(tools);
        if (newNameList[0]) {
          setIsLoad(true);
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
          SetRandomName([]);
        }
      }
    }
  }, [tools]);
  useEffect(() => {
    let newToolOptionNameTempArray = toolOptions;
    newToolOptionNameTempArray?.map((item, index) => {
      item.tool_temp_option_id = index;
      return null;
    });
    SetRandomName(toolOptions);
  }, [toolOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (+name.option_name !== 0) {
      setList((prev) => [
        ...prev,
        {
          ...name,
          tool_option_id: 0,
          tool_temp_option_id: randomName.length + 1,
        },
      ]);
      setName({
        option_name: "",
        tool_temp_option_id: randomName.length + 1,
      });
      randomName.unshift(name);
    } else {
      toast.error("Please enter name.");
    }
  };
  const onClose = (id) => {
    SetRandomName(randomName.filter((item) => item.tool_temp_option_id !== id));
    setDeleteName((prevState) => ({
      ...prevState,
      show: false,
      tool_option_id: 0,
    }));
  };
  const handleList = () => {
    setRemoveList((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  const handleSave = () => {
    if (Object.keys(toolName).length !== 0 || newNameList[0]) {
      let temtoolOptions = randomName;
      temtoolOptions.map((item) => {
        delete item.tool_temp_option_id;
        if (!item.tool_option_id) {
          item.tool_option_id = 0;
        }
      });
      if (Object.keys(toolName).length) {
        temtoolOptions.forEach((newTemparr) => {
          tools.option?.forEach((option) => {
            if (newTemparr.option_name === option.option_name) {
              newTemparr.tool_option_id = option.tool_option_id;
            } else {
              newTemparr.tool_option_id = 0;
            }
          });
        });
      }

      setIsSave(true);
      dispatch(
        saveToolList(
          {
            tool_list_id: Object.keys(toolName).length
              ? toolName.tool_list_id
              : newNameList[0].tool_list_id,
            list_name: Object.keys(toolName).length
              ? toolName.list_name
              : newNameList[0].list_name,
            tool_type: 2,
            option: temtoolOptions,
          },
          () => {
            setIsSave(false);
            dispatch(
              fetchToolOptions({
                tool_list_id: Object.keys(toolName).length
                  ? toolName.tool_list_id
                  : newNameList[0].tool_list_id,
              })
            );
          }
        )
      );
      setSaveList({
        show: false,
        data: list,
      });
    } else {
      setLoadButton(false);
      setSaveList({
        show: true,
        data: list,
      });
    }
    setShow(true);
  };
  const onCloseRandomNameModal = () => {
    setRandomNameModal({
      show: false,
      data: "",
    });
    setResetModal({
      show: false,
    });
  };
  const generatName = () => {
    let rName = randomName.map((item) => item.option_name);
    setBreathe(true);
    setIsGenerateName(true);
    let arr = rName[Math.floor(Math.random() * rName.length)];

    let x;
    if (!history.includes(arr)) {
      if (rName) {
        if (!history.includes(arr)) {
          x = setInterval(() => {
            setIsName(true);
            if (x) {
              setDouble(true);
            }
            let tempIndex = Math.floor(Math.random() * rName.length);
            rName &&
              setRandomNameGenerator(rName[tempIndex]) &&
              setHistory([arr]);
          }, 100);
          setTimeout(() => {
            clearInterval(x);
            setShow(false);
            setDouble(false);
            setRandomNameGenerator(arr);
            setIsName(false);
            setBreathe(false);
            setIsGenerateName(false);
            setHistory((prev) => [...prev, arr]);
          }, 2000);
        }
      }
    } else {
      if (rName.length > history.length) {
        generatName();
      } else {
        clearInterval(x);
        setIsGenerateName(false);
        setShow(false);
        setDouble(false);
        setIsName(false);
        setBreathe(false);
        toast.error("Sorry, There is no unique name found.");
      }
    }
  };
  const handleSwitch = () => {
    if (randomName.length >= 2) {
      setTimeout(() => {
        generatName();
        setIsName(true);
      }, 1000);
      setDouble(true);
      setActive("randomNameGenerator");
      setHistory([]);
    } else {
      toast.error("Please add atleast two names");
    }
  };
  const handleNameChange = (value) => {
    setNameList(value);
  };
  const onCloseModal = () => {
    setSaveList({
      ...saveList,
      show: false,
    });
    setShow(true);
  };
  const handleReset = () => {
    setShow(true);
    SetRandomName(toolOptions);
    setRandomNameGenerator([]);
    setHistory([]);
  };
  const handleEquivalentScreen = () => {
    setProjectorOn(!projectorOn);
  };
  const onSelectSaveModal = (onSelectSaveModal) => {
    setIsSave(onSelectSaveModal);
  };
  const loadListButton = (loadListButton) => {
    setLoadButton(loadListButton);
  };

  return (
    <>
      {!!active && active === "randomNameGenerator" && (
        <>
          <ToastContainer />
          <PageHeader
            pageName="Random Name"
            handleFullScreen={() => setShowFullScreen(!showFullScreen)}
            handleEquivalentScreen={handleEquivalentScreen}
            showProjectorScreen={false}
            showProjectorScreenButton={false}
            handleBack={() => {
              setActive("randomName");
              if (projectorOn) {
                setProjectorOn(!projectorOn);
              } else {
                setProjectorOn(projectorOn);
              }
            }}
          />
          {projectorOn && (
            <NewWindow
              name="Random Name"
              title="Random Name"
              closeOnUnmount={true}
              copyStyles="true"
            >
              <div className={showFullScreen ? "showFull-screen" : ""}>
                {showFullScreen && (
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowFullScreen(false);
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    <img src={fullScreenExitSvg} alt="exit button" />
                  </button>
                )}
                <div className="centered-new-screen">
                  <div className="project-inner">
                    <div className="random-number-box">
                      <div className="ring-animate">
                        <div
                          className={
                            isName ? "start-ring ring-animate" : "ring-animate"
                          }
                        ></div>
                        <div className="center-random-number">
                          <div
                            className={
                              breathe
                                ? "progress-circle breathe2"
                                : "progress-circle"
                            }
                          >
                            <div className="start-text">
                              <div className="random-number" id="result">
                                <p className="text-overflow-long">
                                  {randomNameGenerator}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NewWindow>
          )}
          <div className={showFullScreen ? "showFull-screen" : ""}>
            {showFullScreen && (
              <button
                className="btn-close"
                onClick={() => {
                  setShowFullScreen(false);
                  document.body.style.overflow = "scroll";
                }}
              >
                <img
                  src={fullScreenExitSvg}
                  alt="full-exit-screen"
                  id="fullScreenExit"
                />
                <UncontrolledTooltip target="fullScreenExit">
                  <div className="tooltip-subtext">Exit Full Screen</div>
                </UncontrolledTooltip>
              </button>
            )}
            <div className="project-inner">
              <div className="random-number-box">
                <div className="ring-animate">
                  <div
                    className={
                      isName ? "start-ring ring-animate" : "ring-animate"
                    }
                  ></div>
                  <div className="center-random-number">
                    <div
                      className={
                        breathe ? "progress-circle breathe2" : "progress-circle"
                      }
                    >
                      <div className="start-text">
                        <div className="random-number" id="result">
                          <p className="text-overflow-long">
                            {randomNameGenerator}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!show && (
                  <div
                    className="history-card"
                    style={{ lineBreak: "anywhere" }}
                  >
                    {!show && <h5>History {""}</h5>}
                    <p className="generate-tex scroll-text">
                      {history?.map((his, index) => (
                        <span key={index} style={{ paddingRight: "10px" }}>
                          {""}
                          {his}
                          {""}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                <div className="generate-number mt-2 pt20">
                  <button
                    disabled={double}
                    type="submit"
                    className="btn btn-primary random-number-btn"
                    onClick={generatName}
                  >
                    {isGenerateName ? "Generating Name..." : "Generate Name"}
                  </button>
                  <img
                    className="restore-circle pause-circle-icon"
                    id="btn-reset"
                    src={resetSvg}
                    onClick={() => {
                      setResetModal((prev) => ({
                        ...prev,
                        show: true,
                      }));
                    }}
                    alt="reset"
                    style={{ cursor: "pointer" }}
                  />
                  <UncontrolledTooltip target="btn-reset">
                    <div className="tooltip-subtext">Reset</div>
                  </UncontrolledTooltip>
                  <ResetRandomNameModal
                    show={resetModal.show}
                    onClose={onCloseRandomNameModal}
                    reset={handleReset}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!!active && active === "randomName" && (
        <>
          {isLoad ? (
            <RandomNamePreloader />
          ) : (
            <>
              <div className="desktop-view">
                <ToastContainer />
                <PageHeader
                  pageName="Random Name"
                  handleFullScreen={() => setShowFullScreen(!showFullScreen)}
                  handleEquivalentScreen={handleEquivalentScreen}
                  showButton={true}
                  showFullScreen={true}
                  showFullScreenButton={false}
                  icon={true}
                />
                {projectorOn && (
                  <NewWindow
                    name="Random Name"
                    title="Random Name"
                    closeOnUnmount={true}
                    copyStyles="true"
                  >
                    <div className="centered-new-screen">
                      <div className="center-random-number">
                        <div
                          className={
                            breathe
                              ? "progress-circle breathe"
                              : "progress-circle"
                          }
                        >
                          <div className="start-text">
                            <div className="random-number" id="result">
                              <p className="text-overflow-long">
                                {randomNameGenerator}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NewWindow>
                )}
              </div>

              <div className={showFullScreen ? "showFull-screen" : ""}>
                {showFullScreen && (
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowFullScreen(false);
                      document.body.style.overflow = "scroll";
                    }}
                  >
                    <img
                      src={fullScreenExitSvg}
                      alt="full-exit-screen"
                      id="fullScreenExit"
                    />
                    <UncontrolledTooltip target="fullScreenExit">
                      <div className="tooltip-subtext">Exit Full Screen</div>
                    </UncontrolledTooltip>
                  </button>
                )}
                <div className="random-name white-text">
                  <div className="enter-name-box bg-dark-gray">
                    <div className="weel-card polling-card">
                      <form className="weel-option-input">
                        <input
                          type="text"
                          className="form-control option-text"
                          id="optionhere"
                          required
                          aria-describedby=""
                          placeholder="Type word/name here"
                          value={name?.option_name}
                          onChange={(e) =>
                            setName({
                              ...name,
                              ...{ option_name: e.target.value },
                            })
                          }
                        />
                        <button
                          className="btn button-primary add-btn"
                          type="submit"
                          onClick={(e) => handleSubmit(e, name)}
                        >
                          ADD
                        </button>
                      </form>
                    </div>
                  </div>
                  {randomName.length > 0 && (
                    <div>
                      <div className="add-message answer-message">
                        <div className="answer-message-inner">
                          <h5>
                            {Object.keys(toolName).length
                              ? toolName.list_name
                              : newNameList[0]?.list_name}
                          </h5>

                          <img
                            src={deleteIcon}
                            alt="delete_icon"
                            className="mr-3"
                            onClick={() => {
                              setRemoveList((prevState) => ({
                                ...prevState,
                                show: true,
                                tool_list_id: newNameList[0]?.tool_list_id,
                              }));
                            }}
                            style={{ cursor: "pointer" }}
                            id="deleteList"
                          />
                          <UncontrolledTooltip target="deleteList">
                            <div className="tooltip-subtext">Delete List</div>
                          </UncontrolledTooltip>
                        </div>
                        <ul className="mt-3 add-sub-answers" key="i">
                          {!!randomName &&
                            randomName?.map((elem, i) => {
                              return (
                                <li key={i}>
                                  <p className="mb-0" key={elem.tool_option_id}>
                                    <span>{elem.option_name}</span>
                                    {""}
                                  </p>
                                  <img
                                    src={deleteIcon}
                                    alt="delete_icon"
                                    onClick={() => {
                                      setDeleteName({
                                        show: true,
                                        tool_option_id: elem.tool_option_id,
                                        tool_temp_option_id:
                                          elem.tool_temp_option_id,
                                      });
                                    }}
                                    style={{ cursor: "pointer" }}
                                    id={"deleteName"}
                                  />
                                  <UncontrolledTooltip target="deleteName">
                                    <div className="tooltip-subtext">
                                      Delete Name
                                    </div>
                                  </UncontrolledTooltip>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="save-and-cancel">
                        <button
                          className={
                            randomName.length >= 2
                              ? "btn btn-primary random-number-btn"
                              : "btn btn-primary random-number-btn d-none"
                          }
                          onClick={handleSwitch}
                          type="button"
                          style={{ width: "325px", margin: "0 auto" }}
                        >
                          Generate Name
                        </button>
                      </div>
                      <div className="save-and-cancel">
                        {loadButton && (
                          <button
                            className="button-gray wheel-btn polling-btn btn-dull gameInfo cust-padd-bt"
                            type="button"
                            onClick={() => {
                              setIsSave(false);
                              setRandomNameModal((prev) => ({
                                ...prev,
                                show: true,
                              }));
                            }}
                          >
                            Load List
                          </button>
                        )}
                        <button
                          className="btn button-primary wheel-btn polling-btn m-0"
                          onClick={handleSave}
                          type="button"
                        >
                          {isSave ? "Saving..." : "Save"}
                        </button>
                      </div>
                      {saveList.show && (
                        <SaveListModal
                          {...saveList}
                          onClose={handleSave}
                          onCloseModal={onCloseModal}
                          randomName={randomName}
                          listName={nameList}
                          handleNameChange={handleNameChange}
                          onSelectSaveModal={onSelectSaveModal}
                          loadListButton={loadListButton}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          <DeleteNameModel {...removeName} onClose={onClose} />
          {removeList.show && (
            <DeleteListModel
              {...removeList}
              onClose={handleList}
              // reset={reset}
            />
          )}
          {randomNameModal.show && (
            <RandomNameModal
              {...randomNameModal}
              onClose={onCloseRandomNameModal}
              newList={handleNewList}
              handleShow={handleShow}
            />
          )}
        </>
      )}
    </>
  );
};
export default RandomName;
