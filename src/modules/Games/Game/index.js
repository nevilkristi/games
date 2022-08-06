import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GameInfo from "modules/Games/Game/components/GameInfo";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleGame, viewGame, getPageDetails } from "store/actions";
import PageNotFound from "components/common/PageNotFound";
import GamePlaceHolder from "./components/GamePlaceHolder";
import { isEmptyArray } from "formik";
import backArrow from "assets/img/arrow-left.svg";
import Policy from "components/common/Footer/Policy";

const Game = ({ dataId }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [gameId, setGameID] = useState(params.id);
  const [pageType, setPageType] = useState(1);
  const [data, setData] = useState(null);
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    if (params.name !== undefined) {
      if (gameName !== params.name) {
        setData(null);
        setPageType(1);
        setGameName(params.name);
        let data = { keyword: params.name, site_id: 4 };
        dispatch(
          getPageDetails(data, (data) => {
            if (data.link_type === 3) {
              setPageType(1);
              dispatch(fetchSingleGame(data.data_id));
              dispatch(
                viewGame({
                  game_id: data.data_id,
                })
              );
            } else {
              setData(data);
              setPageType(0);
            }
          })
        );
      }
    }
  }, [params.name]);

  const { SingleGame, historyUrl, loadingSingleGame } = useSelector(
    (state) => state.Game
  );
  const { notes } = useSelector((state) => state.Note);
  const { pageDetails } = useSelector((state) => state.Miscellaneous);

  useEffect(() => {
    if (gameId !== undefined) {
      if (pageDetails === 0) {
        setGameID(params.id);
      }
      dispatch(fetchSingleGame(gameId));
      dispatch(
        viewGame({
          game_id: gameId,
        })
      );
    }
  }, [dispatch, gameId]);

  return (
    <section className="pb60 main-section">
      {pageType === 1 ? (
        <div className="container-fluid c-plr100">
          {SingleGame.length === 0 ? (
            <>
              {loadingSingleGame ? (
                <div className="cust-flex pt30">
                  <GamePlaceHolder />
                </div>
              ) : (
                <div className="col-12" style={{ textAlign: "center" }}>
                  {isEmptyArray(SingleGame) && <PageNotFound />}
                </div>
              )}
            </>
          ) : (
            <div>
              {SingleGame?.game_title !== undefined && (
                <div className="c-page-title pt30 pb-3">
                  <div className="back-arrow-title">
                    <Link
                      to={`/` + historyUrl}
                      className="back-arrow back-arrow-canvas"
                    >
                      <img src={backArrow} alt="" className="h20" />
                    </Link>
                    <div className="title-and-logo">
                      <div className="individual-title">
                        <h2 className="mb-0">
                          {SingleGame?.game_title !== undefined &&
                            SingleGame?.game_title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loadingSingleGame ? (
                <div className="cust-flex pt30">
                  <GamePlaceHolder />
                </div>
              ) : (
                <GameInfo singleGame={SingleGame} notes={notes} />
              )}
            </div>
          )}
        </div>
      ) : data === 0 ? (
        <PageNotFound />
      ) : (
        <Policy {...data} site_id={4} />
      )}
    </section>
  );
};

export default Game;
