import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteModalIcebreaker from "modules/IceBreaker/DeleteModalIcebreaker";
import FavoriteButton from "components/common/FavoriteButton";
import NoDataFound from "components/common/NoDataFound";
import { RowPreloader } from "components/preloders";
import { UncontrolledTooltip } from "reactstrap";

const IceBreakerCard = ({
  iceBreakerList,
  locationType = "my-fav",
  isModal = false,
  show = false,
}) => {
  const [iceBreakers, setIceBreakers] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    data: null,
    id: 0,
  });
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIceBreakers(iceBreakerList);
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }, [iceBreakerList]);

  const handleClose = () => {
    setDeleteModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  return (
    <>
      {isLoad ? (
        <div className="mt20">
          <RowPreloader height={"100px"} loop={4} />
        </div>
      ) : iceBreakers.length === 0 ? (
        <div className="mt-5">
          <NoDataFound />
        </div>
      ) : (
        iceBreakers.map((iceBreaker, index) => {
          return (
            <div
              key={"iceBreaker" + iceBreaker.icebreaker_id}
              className="tab-right-mylist-main mt20"
            >
              <div className="left-main-icebreakers-tab">
                <h6>{iceBreaker.icebreaker_title}</h6>
                <div className="c-flex mt20">
                  {iceBreaker?.filters?.map((filter, index) => {
                    return (
                      <Link
                        to="#"
                        key={"filter" + index}
                        className="search-list"
                        style={{ cursor: "default" }}
                      >
                        {" "}
                        {filter.name}{" "}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="right-main-icebreakers-tab">
                <FavoriteButton
                  gameId={iceBreaker.icebreaker_id}
                  isFavourite={iceBreaker.is_favourite}
                  isType={true}
                  isModal={locationType === "my-fav" ? true : null}
                />
                {iceBreaker.is_user_icebreaker === 1 && !show && (
                  <>
                    <Link
                      to={`/icebreaker/edit/${iceBreaker.icebreaker_id}`}
                      id={`iceBreakerEdit_${iceBreaker.icebreaker_id}`}
                    >
                      <div
                        className="pencil-btn-2 cursor-pointer"
                        data-target="#c-edit-icebreakers"
                      ></div>
                    </Link>

                    <UncontrolledTooltip
                      placement="bottom"
                      target={`iceBreakerEdit_${iceBreaker.icebreaker_id}`}
                    >
                      <div className="tooltip-subtext">Edit Icebreaker</div>
                    </UncontrolledTooltip>
                  </>
                )}
                {locationType !== "my-fav" && (
                  <>
                    <div
                      className="trash-btn-2 cursor-pointer"
                      onClick={() => {
                        setDeleteModal((prevState) => ({
                          ...prevState,
                          show: true,
                          id: iceBreaker.icebreaker_id,
                        }));
                      }}
                      id={`iceBreakerDelete_${iceBreaker.icebreaker_id}`}
                    ></div>
                    <UncontrolledTooltip
                      placement="bottom"
                      target={`iceBreakerDelete_${iceBreaker.icebreaker_id}`}
                    >
                      <div className="tooltip-subtext">Delete Icebreaker</div>
                    </UncontrolledTooltip>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}
      <DeleteModalIcebreaker {...deleteModal} onClose={handleClose} />
    </>
  );
};

export default IceBreakerCard;
