import { RowPreloader } from "components/preloders";
import React from "react";

const GamePlaceHolder = () => {
  return (
    <>
      <div
        className="cust-flex "
        style={{ width: "100%", float: "left", marginTop: "5%" }}
      >
        <div className="left-side-individual" style={{ float: "left" }}>
          <div style={{ width: "100%" }}>{<RowPreloader height="200px" />}</div>
          <div style={{ width: "100%" }}>{<RowPreloader height="40px" />}</div>
        </div>
        <div className="right-side-individual" style={{ float: "left" }}>
          <div className="">
            <div className="desktop-view">
              <div style={{ width: "100%" }}>{<RowPreloader />}</div>
              <div style={{ width: "20%" }}>
                {<RowPreloader height="10px" />}
              </div>
              <div style={{ width: "100%" }}>
                {<RowPreloader height="150px" />}
              </div>
              <hr />{" "}
            </div>
          </div>

          <div className="">
            <RowPreloader height="120px" />
            <div style={{ width: "100%", margin: "0 auto" }}>
              <RowPreloader height="20px" />
            </div>

            <div style={{ width: "40%" }}>
              <RowPreloader />
            </div>
            <div style={{ width: "100%", margin: "0 auto" }}>
              <RowPreloader height="140px" />
            </div>
            <div style={{ width: "100%", margin: "0 auto" }}>
              <RowPreloader height="80px" />
            </div>
            <div style={{ width: "100%", margin: "0 auto" }}>
              <RowPreloader height="80px" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePlaceHolder;
