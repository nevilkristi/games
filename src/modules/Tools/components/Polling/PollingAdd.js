import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveToolList, deleteToolOption, getPollList } from "store/actions";
import deleteWhiteSvg from "assets/img/delete_white.svg";
import closePollSvg from "assets/img/close_poll.svg";
import addNewSvg from "assets/img/add-new.svg";

import DeleteQuestion from "./DeleteQuestion";
import PollingPreloader from "./PollingPreloader";
import debounce from "lodash.debounce";
import PageHeader from "components/pageheader/PageHeader";
import { UncontrolledTooltip } from "reactstrap";

const colors = {
  1: "pomegranate",
  2: "ruby",
  3: "purple",
  4: "purpleheart",
  5: "darkblue",
  6: "blue",
  7: "lightblue",
  8: "skyblue",
  9: "limeade",
  10: "green",
  11: "lightgreen",
  12: "yellow",
  13: "lime",
  0: "orange",
};

const PollingAdd = ({ poll, onStepChange }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [pollList, setPollList] = useState([]);
  const [deleteQuestionModal, setDeleteQuestionModal] = useState({
    show: false,
    item: 0,
  });
  const [option, setOption] = useState("");
  const [cardActive, setCardActive] = useState(0);
  const [isLoad, setIsLoad] = useState(true);
  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, []);

  useEffect(() => {
    setPollList(poll !== undefined ? poll : []);
  }, [poll]);

  const handlePolling = (e) => {
    e.preventDefault();
    if (input.trim().length == "") {
      toast.error("Please enter question");
    } else {
      setPollList((prev) => [...prev, { list_name: input, option: [] }]);
      setInput("");
    }
  };

  const handleAddOptions = (e, index) => {
    e.preventDefault();
    if (option.trim().length == 0) {
      toast.error("Please enter answer.");
    } else {
      pollList.filter(
        (v, j) =>
          j === index &&
          v.option?.push({
            tool_option_id: 0,
            option_score: 0,
            option_name: option,
            color_code: "",
          })
      );
      setPollList(pollList);
      setOption("");
      handleAddPolling(index);
    }
  };

  const handleDeleteOption = (tool_list_index, tool_option_index) => {
    let optionId = 0;
    setPollList(
      pollList.map((v, j) => {
        if (j === tool_list_index) {
          let tempOptions = v.option;
          optionId = tempOptions[tool_option_index].tool_option_id;
          tempOptions.splice(tool_option_index, 1);
          v.option = tempOptions;
          return v;
        } else {
          return v;
        }
      })
    );
    dispatch(deleteToolOption({ tool_option_id: optionId }));
  };

  const handleAddPolling = (index, start = false) => {
    let newRes = pollList[index];
    let optionRes = [];
    newRes?.option.map((v, i) => {
      optionRes.push({
        tool_option_id: v.tool_option_id ? v.tool_option_id : 0,
        option_name: v.option_name,
        option_score: v.option_score,
        color_code: colors[i + 1],
      });
      return null;
    });

    dispatch(
      saveToolList(
        {
          tool_list_id: newRes.tool_list_id ? newRes.tool_list_id : 0,
          list_name: newRes.list_name,
          tool_type: 4,
          option: optionRes,
        },
        () => {
          start
            ? onStepChange(
                {
                  tool_list_id: newRes.tool_list_id ? newRes.tool_list_id : 0,
                  list_name: newRes.list_name,
                },
                2
              )
            : dispatch(getPollList());
        }
      )
    );
  };

  const onClose = (id) => {
    setDeleteQuestionModal({ show: false, item: 0 });
    let newListPolling = pollList.filter(
      (item) => item.list_name !== id.list_name
    );
    setPollList(newListPolling);
  };

  const handleDeletePolling = (item) => {
    setDeleteQuestionModal({ show: true, item: item });
  };

  return (
    <>
      <ToastContainer />
      {isLoad ? (
        <PollingPreloader />
      ) : (
        <>
          <div className="">
            <PageHeader
              pageName="Polling Start"
              handleFullScreen={() => {}}
              handleEquivalentScreen={() => {}}
              showButton={false}
              icon={true}
            />
          </div>

          <div className="fullscreen-box mobile-spacing">
            <div className="polling-wrap white-text">
              <div className="weel-card polling-card">
                <h5 className="option-text">Questions</h5>
                <form className="weel-option-input">
                  <input
                    type="text"
                    className="form-control option-text"
                    id="optionhere"
                    aria-describedby=""
                    placeholder="Type question here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button
                    className="btn button-primary add-btn"
                    type="submit"
                    onClick={(e) => handlePolling(e)}
                  >
                    ADD
                  </button>
                </form>
              </div>

              <div className="random-name-generate"></div>
              <div className="questions-list-div">
                <div className="random-name-text"></div>
                {pollList?.map((item, i) => {
                  return (
                    <div className="polling mt-3" key={i}>
                      <div className="add-message answer-message">
                        <div className="answer-message-inner">
                          <p className=""> {item?.list_name}</p>
                          <img
                            src={deleteWhiteSvg}
                            alt="delete-btn"
                            className="delete-btn"
                            data-item={item}
                            onClick={() => {
                              handleDeletePolling(item);
                            }}
                            id="deleteList"
                          />
                          <UncontrolledTooltip target="deleteList">
                            <div className="tooltip-subtext">
                              Delete Question
                            </div>
                          </UncontrolledTooltip>
                        </div>

                        <ul className="white-text add-sub-answers mb-3">
                          {item?.option?.map((op, j) => (
                            <li key={j}>
                              <span>{op.option_name}</span>
                              <img
                                src={closePollSvg}
                                alt="delete-question"
                                className="pointer"
                                onClick={() => handleDeleteOption(i, j)}
                                id={`delete${j}`}
                              />
                              <UncontrolledTooltip target={`delete${j}`}>
                                <div className="tooltip-subtext">
                                  Delete Answer
                                </div>
                              </UncontrolledTooltip>
                            </li>
                          ))}
                        </ul>

                        <div className="add-delete-btn">
                          <input
                            type="text"
                            className="form-control option-text answer-text"
                            id="optionhere"
                            aria-describedby=""
                            placeholder="Enter answer here"
                            value={cardActive === i ? option : ""}
                            onChange={(e) => {
                              setOption(e.target.value);
                              setCardActive(i);
                            }}
                          />
                          <img
                            src={addNewSvg}
                            alt="add-1"
                            className="adds-btn"
                            onClick={(e) => handleAddOptions(e, i)}
                          />
                        </div>
                      </div>
                      {item?.option.length > 0 && (
                        <div className="save-and-cancel">
                          <button
                            className="btn button-primary wheel-btn polling-btn m-0"
                            onClick={() => {
                              handleAddPolling(i, true);
                            }}
                            type="button"
                          >
                            Start
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
      <DeleteQuestion {...deleteQuestionModal} onClose={onClose} />
    </>
  );
};

export default PollingAdd;
