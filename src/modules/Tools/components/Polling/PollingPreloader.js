import { RowPreloader } from "components/preloders";
import React from "react";

const PollingPreloader = () => {
  return (
    <div>
      <div className="desktop-view">
        <RowPreloader />
      </div>
      <div className="fullscreen-box mt-5">
        <div className="random-name white-text">
          <RowPreloader height="100px" />
          <div style={{ marginTop: "75px" }}>
            <RowPreloader height="180px" />
          </div>
          <div style={{ marginTop: "15px" }}>
            <RowPreloader height="180px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingPreloader;
