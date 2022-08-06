import React, { useState } from "react";
import reseticon from "assets/img/reset-icon.svg";
import fullscreen from "assets/img/full-screen.svg";
import closepopup from "assets/img/close_popup.svg";
import { useSelector } from "react-redux";
import { handleRandomName } from "store/actions";
import { useDispatch } from "react-redux";

const RandomNameGenerator = (props) => {
  const { randomName } = useSelector((state) => state.Tool);
  const [list, setList] = useState(randomName);
  const dispatch = useDispatch();

  const getRandomName = (e) => {
    dispatch(
      handleRandomName({
        tool_list_id: 1,
      })
    );

    setList(
      randomName.rows[0].gg_tool_options[
        Math.floor(Math.random() * randomName.rows[0].gg_tool_options.length)
      ].option_name
    );
  };

  return (
    <>
      <div className="desktop-view">
        <div
          className="breadcrumb-title white-text border-line pb-3"
          id="breadcrumb"
        >
          Random Name
        </div>
      </div>
      <div className="fullscreen-mode-icon desktop-view" title="Full Screen">
        <img
          src={fullscreen}
          className="fullscreen-icon"
          alt="Fullscreen Icon"
        />
      </div>
      <div className="fullscreen-box mt-5 mobile-spacing">
        <div className="project-inner">
          <div className="random-number-box">
            <div className="ring-animate">
              <div className="start-ring ring-animate"></div>
              <div className="start-text">
                <div className="random-number" id="result">
                  {list}
                </div>
              </div>
            </div>
            <div className="random-number-history white-text mt-4">
              <div className="random-number-align">
                <p className="small">History</p>
                <ul className="ml-3">
                  <li>
                    <h5>{list}</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="create-btn desktop-view mt-2">
            <button
              type="submit"
              className="create-done-btn button-primary Generate-btn"
              onClick={getRandomName}
            >
              Generate Name
            </button>
            <button
              type="reset"
              className="button-primary ml-3 Generate-resetbtn"
              data-toggle="modal"
              data-target="#resetModal"
              // onClick={() => getRandomName(setList([]))}
            >
              <img src={reseticon} alt="" />
            </button>
            <div
              className="modal fade"
              id="resetModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content custom-modal">
                  <div className="close-btn">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">
                        <img src={closepopup} alt="" />
                      </span>
                    </button>
                  </div>
                  <div className="modal-body add-body text-center pt-4">
                    <div className="filter-modal-name mt-4">Confirm Reset</div>
                    <p className="mb-4 gray-text">
                      Are you sure you want to reset?
                    </p>
                    <button
                      type="button"
                      className="button-primary add-pop-btn"
                      // onClick={() => getRandomName(setList([]))}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RandomNameGenerator;
