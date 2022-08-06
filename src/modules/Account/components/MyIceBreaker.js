import React, { useEffect, useState } from "react";
import IceBreakerCard from "./IceBreakerCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchIceBreakerList } from "store/actions";
import { RowPreloader } from "components/preloders";

const MyIceBreaker = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [iceBreakers, setIceBreakers] = useState([]);

  const { iceBreakerList } = useSelector((state) => state.IceBreaker);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIceBreakerList({}));
  }, [dispatch]);

  useEffect(() => {
    if (iceBreakerList.length >= 0) {
      setIceBreakers(iceBreakerList);
      setIsLoad(false);
    }
  }, [iceBreakerList]);

  return (
    <>
      <div
        className="tab-pane fade active show"
        id="v-pills-myicebreakers"
        role="tabpanel"
        aria-labelledby="v-pills-myicebreakers-tab"
      >
        <div className="tab-right-mylist">
          <h6>My Icebreakers</h6>
        </div>
        {isLoad ? (
          <RowPreloader loop={2} height={"90px"} />
        ) : (
          <IceBreakerCard locationType="my-ice" iceBreakerList={iceBreakers} />
        )}
      </div>
    </>
  );
};

export default MyIceBreaker;
