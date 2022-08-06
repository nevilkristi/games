import React from "react";
import { RowPreloader } from "components/preloders";
const WheelPreloader = () => {
  return (
    <div>
      <div className="desktop-view">
        <RowPreloader />
      </div>
      <div className="fullscreen-box mt-5">
        <div>
          <RowPreloader height="100px" />
          <div style={{ marginTop: "75px" }}>
            <RowPreloader height="130px" />
          </div>

          <div
            className="random-name-generator-btn"
            style={{ width: "340px", margin: "0 auto", paddingTop: "10px" }}
          >
            <RowPreloader height="50px" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <div className="" style={{ width: "340px" }}>
              <RowPreloader height="50px" />
            </div>
            {/* <div className="ml-2" style={{width:"16%"}}>
              <RowPreloader height="50px" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelPreloader;
