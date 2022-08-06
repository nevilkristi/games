import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

import { getTutorialById } from "store/actions";
import arrowLeftsvg from "assets/img/arrow-left.svg";
import DefaultSvg from "assets/img/placeholder-card.png";
import DefaultPlaySvg from "assets/img/video-placeholder.png";
import { imageUrl } from "services/aws";

function TutorialDetail() {
  const { Tutorial } = useSelector((state) => state.Miscellaneous);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTutorialById(params.id));
  }, [dispatch, params.id]);

  const history = useHistory();
  return (
    <section className="pb60 main-section">
      <div className="container-fluid c-plr100 mt-3">
        <div className="extra-pages">
          <div className="search-area-right-dashboard ">
            <div className="back-arrow-title">
              <Link to="/tutorial" className="back-arrow back-arrow-canvas">
                <img
                  src={arrowLeftsvg}
                  alt=""
                  className="h20"
                  onClick={() => history.goBack}
                />
              </Link>
              <div className="ml10">
                <div className="slide-title canvas-title">
                  <h6>
                    {Tutorial.tutorial_id ? Tutorial.title : "Tutorial Details"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="tutorial-detail-main-card">
            <div className="card-top">
              {Tutorial.video_url ? (
                <video
                  src={Tutorial.video_url}
                  controls
                  className="video"
                ></video>
              ) : Tutorial.featured_image_url ? (
                <img
                  alt=""
                  src={Tutorial.featured_image_url}
                  className="w50 m-auto tutorial-detail-img"
                />
              ) : (
                <img
                  alt=""
                  src={Tutorial.video_url ? DefaultPlaySvg : DefaultSvg}
                  className="w50 m-auto tutorial-detail-img"
                />
              )}
            </div>
            <div className="card-desc-tutorial-details">
              <h6 className="tutorials-details-title"> {Tutorial?.title}</h6>
              <p
                className="tutorials-details-desc"
                dangerouslySetInnerHTML={
                  Tutorial.content !== null
                    ? { __html: Tutorial.content }
                    : null
                }
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TutorialDetail;
