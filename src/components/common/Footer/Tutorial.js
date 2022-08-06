import React, { useEffect, useState, useMemo } from "react";
import { getTutorial, setTutorialData } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultSvg from "assets/img/placeholder-card.png";
import NoDataFound from "../NoDataFound";
import { PlaceHolderCard } from "components/preloders";
import { imageUrl } from "services/aws";
const thumbnailUrl = (url) => {
  if (!url) return "";
  const splitted = url.split(".");
  splitted.pop();
  return (splitted.join(".") + ".jpg").replace(
    imageUrl.S3GAME_URL,
    imageUrl.GAME_THUMBNAIL_URL
  );
};

function Tutorial() {
  const dispatch = useDispatch();
  const { Tutorials, loadingTutorial } = useSelector(
    (state) => state.Miscellaneous
  );

  const [active, setActive] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getTutorial(4));
  }, [dispatch]);

  const tags = useMemo(() => {
    if (!!Tutorials && !!Tutorials?.length) {
      const data = [];
      Tutorials.forEach((i) => {
        data.push(...i.tags.map((tag) => tag.toLowerCase().trim()));
      });
      return [...new Set(data)];
    } else return [];
  }, [Tutorials]);

  const handleFilter = (value) => {
    if (!active.includes(value)) {
      setActive((old) => [...old, value]);
    } else {
      setActive(active.filter((x) => x !== value));
    }
  };

  const filteredTutorials = useMemo(
    () =>
      Tutorials.filter(
        (x) =>
          !!x.is_active &&
          (!active.length
            ? true && RegExp(`${search}`, "gi").test(x.title)
            : x.tags.some((i) => active.includes(i)) &&
              RegExp(`${search}`, "gi").test(x.title))
      ) || [],
    [Tutorials, active, search]
  );
  const getPreviewImage = (url) => {
    const data = url.split(".");
    data.pop();
    let returnUrl = `${data
      .join(".")
      .replace(".s3.us-east", "-thumbnails.s3.us-east")}.jpg`;
    return returnUrl;
  };

  return (
    <section className="pb60 main-section">
      <div className="container-fluid c-plr100 mt-3">
        <div className="extra-pages">
          <div className="search-area-right-dashboard display-block">
            <div className="main-right-individual-flex p-2">
              <div>
                <h6>Tutorial</h6>
              </div>
              <div>
                <div className="search-box">
                  <input
                    type="text"
                    className="filter-form-control"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {tags && !!tags.length && (
              <div className="p10 m10 main-filter flex-wrap">
                {tags?.map((tag) => (
                  <div
                    key={tag}
                    className={`filter-box mt-2 ${
                      active.includes(tag) ? "activeTab" : ""
                    }`}
                    onClick={() => handleFilter(tag)}
                  >
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="row">
            {!loadingTutorial ? (
              <>
                {!!filteredTutorials.length ? (
                  filteredTutorials.map((tutorial, index) => (
                    <div className="col-md-6 col-lg-4 mt20" key={index}>
                      <div className="card">
                        <div className="c-card-body">
                          <div className="card-top">
                            <img
                              src={
                                tutorial.featured_image_url
                                  ? tutorial.featured_image_url.replace(
                                      imageUrl.S3ACCOUNTS_URL,
                                      imageUrl.ACCOUNT_DISPLAY_URL
                                    )
                                  : tutorial.video_url
                                  ? getPreviewImage(
                                      tutorial.video_url.replace(
                                        imageUrl.S3GAME_URL,
                                        imageUrl.GAME_DISPLAY_URL
                                      )
                                    )
                                  : DefaultSvg
                              }
                              className="tutorial-img w100"
                              alt="img"
                            />
                          </div>
                          <div className="card-desc-main card-desc-main-tutorial">
                            <h6>{tutorial.title}</h6>
                            <p
                              dangerouslySetInnerHTML={
                                tutorial.content !== null
                                  ? { __html: tutorial.content }
                                  : null
                              }
                            ></p>
                            <div className="c-flex mt20 btn-view-details">
                              <Link
                                className="btn-bordered"
                                to={
                                  tutorial.button_link
                                    ? null
                                    : `/tutorialDetail/${tutorial.tutorial_id}`
                                }
                                onClick={() => {
                                  tutorial.button_link
                                    ? window.open(
                                        tutorial.button_link,
                                        "_blank"
                                      )
                                    : dispatch(setTutorialData(tutorial));
                                }}
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {!loadingTutorial ? (
                      <div className="w100 mt-4">
                        <NoDataFound />
                      </div>
                    ) : (
                      <PlaceHolderCard />
                    )}
                  </>
                )}
              </>
            ) : (
              <PlaceHolderCard />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tutorial;
