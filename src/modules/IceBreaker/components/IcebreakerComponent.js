import { React, useState, useEffect } from "react";
import {
  fetchIceBreaker,
  removeAllGameFilter,
  saveFavoriteIceBreaker,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import ice_white from "assets/img/ice_white.svg";
import broken_ice from "assets/img/broke_ice.svg";
import favBlankSVG from "assets/img/fav-blank.svg";
import favSvg from "assets/img/fav.svg";
import { IcebreakerPreloader } from "components/preloders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isEmptyArray } from "formik";
import "../../../assets/css/style.css";

const IcebreakerComponent = () => {
  const dispatch = useDispatch();
  const { iceBreaker } = useSelector((state) => state.IceBreaker);
  const { gameFilter, favoriteFilter } = useSelector(
    (state) => state.Dashboard
  );
  const [iceBreakerLoop, setIceBreakerLoop] = useState(false);
  const [question, setQuestion] = useState("");
  const [filter, setFilter] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const [isFavorite, setIsFavorite] = useState("");
  const [generatedIceBreacker, setGeneratedIceBreacker] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const [shake, setShake] = useState(false);
  const [breathe, setBreathe] = useState(false);

  let Filter = [];

  gameFilter !== [] &&
    gameFilter.map((item, index) => {
      Filter.push(item.id);
      return null;
    });

  useEffect(() => {
    dispatch(removeAllGameFilter());
    Filter = [];
  }, []);

  const IceBreaker = iceBreaker === undefined ? [] : iceBreaker;
  useEffect(() => {
    dispatch(
      fetchIceBreaker(
        {
          generated_icebreaker_id: generatedIceBreacker,
          filter_id: Filter,
          is_favourite: favoriteFilter,
        },
        (status) => {
          if (status) {
            setIsLoad(false);
          }
        }
      )
    );
  }, [dispatch, generatedIceBreacker]);

  const handleIceBreak = () => {
    if (!isEmptyArray(IceBreaker)) {
      let element = document.getElementById("whiteIce");
      element.classList.remove("d-none");
      element.classList.add("shake-img");

      document.getElementById("brokenIce")?.classList.remove("d-block");
      document.getElementById("brokenIce")?.classList.add("d-none");
      setQuestion("");
      setIceBreakerLoop(true);
      //setShake(true);

      let interval = setInterval(() => {
        let item = IceBreaker[Math.floor(Math.random() * IceBreaker.length)];
        setQuestionId(item?.icebreaker_id);
        setQuestion(item?.icebreaker_title);
        setFilter([item?.filters[0]]);
        setShake(true);
        setBreathe(true);
      }, 110);

      setTimeout(() => {
        setIceBreakerLoop(false);
        element.classList.remove("shake-img");
        element.classList.add("d-none");
        document.getElementById("brokenIce")?.classList.remove("d-none");
        document.getElementById("brokenIce")?.classList.add("d-block");
        clearInterval(interval);

        let item = IceBreaker[Math.floor(Math.random() * IceBreaker.length)];
        setQuestionId(item?.icebreaker_id);
        setGeneratedIceBreacker((prev) => [...prev, item?.icebreaker_id]);
        setQuestion(item?.icebreaker_title);
        setIsFavorite(item?.is_favourite);
        setFilter(item?.filters);
        setShake(false);
        setBreathe(false);
      }, 3000);
    } else {
      toast.error("Sorry,There is no further Icebreaker found.");
    }
  };

  const handleAddFavoriteIceBreak = () => {
    dispatch(
      saveFavoriteIceBreaker({
        icebreaker_id: questionId,
        is_favourite: isFavorite ? 0 : 1,
      })
    );
    setIsFavorite(isFavorite ? 0 : 1);
  };

  return isLoad ? (
    <IcebreakerPreloader />
  ) : (
    <>
      <ToastContainer />
      <div className="">
        <div className="search-area-right-dashboard">
          <h6>Icebreakers</h6>
        </div>

        <div className="c-icebreaker-main">
          <div className="icebreaker-icon-wrapper-main">
            <div
              className={
                breathe
                  ? "icebreaker-icon-wrapper breathe "
                  : "icebreaker-icon-wrapper"
              }
            >
              <div>
                <div className="icebreaker-icon-wrapperchild">
                  <img
                    src={ice_white}
                    alt="ice-icon"
                    id="whiteIce"
                    className={
                      shake ? "icebreak-icon d-none shake" : "icebreak-icon"
                    }
                  />
                  <img
                    src={broken_ice}
                    alt=""
                    id="brokenIce"
                    className={
                      shake ? "icebreak-icon shake" : "icebreak-icon d-none"
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="icebreaker-wrapper-desc">
            {" "}
            <h6>Icebreaker</h6>{" "}
          </div>

          <div style={{ height: "120px" }}>
            <div
              className="icebreaker-wrapper-desc"
              style={{ flexDirection: "row" }}
            >
              {filter?.map(
                (item, index) =>
                  item !== undefined && (
                    <span
                      key={index}
                      className={
                        index > 0
                          ? "search-list pointer"
                          : "search-list pointer"
                      }
                    >
                      {item?.name !== undefined && item?.name}
                    </span>
                  )
              )}
            </div>
            <p id="center-desc">{question}</p>
          </div>

          <div
            className=""
            style={{ display: "flex", justifyContent: "center", margin: "0" }}
          >
            {questionId && (
              <button
                type="submit"
                className={
                  iceBreakerLoop ? "btn-bordered d-none" : "btn-bordered "
                }
                onClick={handleAddFavoriteIceBreak}
              >
                <img
                  className="mr-2"
                  src={isFavorite ? favSvg : favBlankSVG}
                  alt=""
                />

                <span className={iceBreakerLoop ? "d-none" : ""}>
                  {isFavorite ? "REMOVE FROM FAVORITE" : "ADD TO FAVORITE"}
                </span>
              </button>
            )}
            <button
              type="submit"
              onClick={!shake ? handleIceBreak : () => {}}
              // className=" btn-primary break-icebreak-btn"
              className={
                !shake
                  ? "btn-primary break-icebreak-btn"
                  : "btn-dull gameInfo  cust-padd-btn "
              }
            >
              BREAK THE ICE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IcebreakerComponent;
